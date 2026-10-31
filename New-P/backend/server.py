from fastapi import FastAPI, APIRouter, UploadFile, File
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from fastapi.responses import StreamingResponse, Response, JSONResponse
import os
import time
import logging
import json
import uuid
import re
import base64
import hashlib
import tempfile
import httpx
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
from datetime import datetime, timezone

from emergentintegrations.llm.openai import OpenAISpeechToText, OpenAITextToSpeech

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

PORTFOLIO_EMAIL = "aishwar.r.mishra@gmail.com"
FALLBACK_LINE = (
    "Honestly, I'm not sure about that one. Aishwar would love to answer it himself, "
    f"though. You can reach him at {PORTFOLIO_EMAIL} or on LinkedIn."
)
PERSONALITY_PATH = ROOT_DIR / "poonie_personality.txt"
# The facts: experience, work, proof stories, résumé extras. Confirmed
# missing from the prompt entirely in the original code — Poonie had no
# real knowledge source, only the tone/behaviour script, which is why
# documented facts (e.g. the Technovanza sponsorship) were falling back
# as "unknown" in testing even though they're written down right here.
PORTFOLIO_PATH = ROOT_DIR / "portfolio_context.txt"
AUDIO_FORMATS = {"mp3", "mp4", "mpeg", "mpga", "m4a", "wav", "webm"}

# ---------------------------------------------------------------------------
# Chat model: OpenRouter, free tier only.
#
# FREE_MODEL_CANDIDATES below is just a wishlist — never trusted by name
# alone. verified_free_models() checks OpenRouter's own /models pricing at
# call time and only keeps candidates it currently lists at prompt=$0 and
# completion=$0. If OpenRouter renames/retires a ":free" slug, that entry
# silently drops out instead of becoming a paid call. This is the actual
# guarantee, not the ":free" suffix in the name.
# ---------------------------------------------------------------------------
OPENROUTER_API_KEY = os.environ.get("OPENROUTER_API_KEY", "")
OPENROUTER_BASE = "https://openrouter.ai/api/v1"
SITE_URL = "https://aishwar-mr.github.io/me"
# Plain ASCII on purpose: this goes into an HTTP header (X-Title) below,
# and HTTP header values aren't reliably safe for non-ASCII characters —
# an em dash here caused real encode failures against OpenRouter in testing.
SITE_TITLE = "Poonie - Aishwar Mishra's portfolio"

# Checked live against OpenRouter's /models pricing on 2026-11-02 — all
# five confirmed prompt=$0 / completion=$0 at that time. Names here are
# still just a wishlist, though: verified_free_models() below re-checks
# pricing at call time and drops anything that's stopped being free.
#
# Order matters: dots-studio and nemotron-lightning were both live-tested
# end to end (real streamed answer, correct auth, correct SSE parsing) —
# dots-studio in ~3s, nemotron-lightning in ~12s (it reasons more first).
# gemma-4-26b and xing4.0 are untested live (hit free-tier rate limits
# during testing) but are plain instruct models, not reasoning ones, so
# they're kept as likely-fast fallbacks. nemotron-nano-omni is a known
# heavy reasoner, kept last as a final resort before the honest fallback.
FREE_MODEL_CANDIDATES = [
    "dots-studio/dots-3-note-preview:free",
    "nvidia/nemotron-3.5-lightning:free",
    "google/gemma-4-26b-a4b-it:free",
    "xingchen-agi/xing4.0-29b-a4b:free",
    "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free",
]

_free_models_cache = {"at": 0.0, "models": []}
_FREE_MODELS_TTL = 600  # seconds — re-check OpenRouter's pricing every 10 min


async def verified_free_models() -> List[str]:
    now = time.time()
    if _free_models_cache["models"] and now - _free_models_cache["at"] < _FREE_MODELS_TTL:
        return _free_models_cache["models"]
    try:
        async with httpx.AsyncClient(timeout=10) as http:
            resp = await http.get(f"{OPENROUTER_BASE}/models")
            resp.raise_for_status()
            listed = {m["id"]: m for m in resp.json().get("data", [])}
        verified = []
        for model_id in FREE_MODEL_CANDIDATES:
            m = listed.get(model_id)
            if not m:
                continue
            pricing = m.get("pricing", {})
            try:
                is_free = float(pricing.get("prompt", "1")) == 0 and float(pricing.get("completion", "1")) == 0
            except (TypeError, ValueError):
                is_free = False
            if is_free:
                verified.append(model_id)
        if verified:
            _free_models_cache["at"] = now
            _free_models_cache["models"] = verified
        return verified or _free_models_cache["models"]
    except Exception:
        logging.exception("poonie: could not refresh OpenRouter free-model pricing")
        return _free_models_cache["models"]


async def stream_openrouter_reply(model: str, system_prompt: str, user_text: str):
    """Yields text deltas from one OpenRouter model's streaming chat
    endpoint (OpenAI-compatible). Raises on a non-200 response or a
    connection failure — the caller treats that as "try the next model"."""
    if not OPENROUTER_API_KEY:
        raise RuntimeError("OPENROUTER_API_KEY not set")
    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
        "HTTP-Referer": SITE_URL,
        "X-Title": SITE_TITLE,
    }
    payload = {
        "model": model,
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_text},
        ],
        # Not a visible-answer-length cap — Poonie's own personality script
        # already says 1-2 sentences, and these models follow that on their
        # own. This is a *reasoning-budget* cap: several free OpenRouter
        # models think step-by-step in a separate `reasoning` field before
        # ever emitting real `content` (confirmed live: 400-2500 reasoning
        # chars ahead of a one-sentence answer). Too low a limit here and
        # the model hits `finish_reason: length` mid-thought, with nothing
        # real ever sent — confirmed live too, at max_tokens=120 and =150.
        # Free models cost nothing extra per token either way, so this is
        # generous on purpose; it only affects worst-case response time.
        "max_tokens": 900,
        "temperature": 0.6,
        "stream": True,
    }
    async with httpx.AsyncClient(timeout=30) as http:
        async with http.stream(
            "POST", f"{OPENROUTER_BASE}/chat/completions", headers=headers, json=payload
        ) as resp:
            if resp.status_code != 200:
                body = await resp.aread()
                raise RuntimeError(f"OpenRouter {model} -> {resp.status_code}: {body[:300]!r}")
            async for line in resp.aiter_lines():
                if not line or not line.startswith("data: "):
                    continue
                data = line[6:]
                if data == "[DONE]":
                    return
                try:
                    obj = json.loads(data)
                except json.JSONDecodeError:
                    continue
                delta = (obj.get("choices") or [{}])[0].get("delta", {}).get("content")
                if delta:
                    yield delta


class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


@api_router.get("/")
async def root():
    return {"message": "Hello World"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    _ = await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


def build_system_prompt() -> str:
    try:
        personality = PERSONALITY_PATH.read_text(encoding="utf-8").strip()
    except Exception:
        personality = ""
    try:
        portfolio = PORTFOLIO_PATH.read_text(encoding="utf-8").strip()
    except Exception:
        portfolio = ""
    return f"""You are Poonie, the small 3D bear who lives on Aishwar Mishra's one-page portfolio. Visitors poke you and chat with you. You are Aishwar's friend and doorman — never him.

How to answer:
- Questions about Aishwar: answer in character, grounded only in the PORTFOLIO FACTS and PERSONALITY SCRIPT below. Never invent dates, numbers, names or claims about him. If a fact about Aishwar is asked for and isn't in either section below, use the fallback line exactly as written below — don't guess, and don't treat a question merely being *about* him as reason to fall back if the fact is actually there.
- Anything else — food, cuteness, jokes, your life as a bear, general chat: you're free! Answer with a short, playful, humorous line in Poonie's voice. Never deflect fun questions with "I'm not sure".
- Keep it short: 1-2 sentences for factual answers; a little more room when being playful. No filler, no offers of extra help, no repeating or rephrasing the question.
- Plain words only — no asterisk stage directions, no emoji.
- Visitors can email Aishwar at {PORTFOLIO_EMAIL}.

FALLBACK LINE (use exactly as written): {FALLBACK_LINE}

PORTFOLIO FACTS (everything true about Aishwar that you're allowed to state — experience, work, honors, proof stories; nothing outside this is confirmed):
{portfolio}

PERSONALITY SCRIPT (how Poonie sounds and behaves — follow word-for-word):
{personality}"""


def _tokens(s: str) -> set:
    return set(re.findall(r"[a-z0-9₹$]+", s.lower()))


async def relevant_memories(question: str, k: int = 3) -> List[dict]:
    qt = _tokens(question)
    if not qt:
        return []
    docs = await db.bear_chats.find({}, {"question": 1, "answer": 1, "_id": 0}).sort(
        [("_id", -1)]
    ).to_list(200)
    scored = []
    for d in docs:
        at = _tokens(d.get("question", "") + " " + d.get("answer", ""))
        if not at:
            continue
        score = len(qt & at) / (len(qt) + 2)
        if score > 0.12:
            scored.append((score, d))
    scored.sort(key=lambda x: -x[0])
    return [d for _, d in scored[:k]]


# ---------------------------------------------------------------------------
# Lightweight abuse guard: the chat endpoint has no auth, and even free
# OpenRouter models have per-minute/day rate limits that real visitors
# share. A global rolling cap protects those limits from one bad actor,
# independent of the $0-cost guarantee above.
# ---------------------------------------------------------------------------
_ask_timestamps: List[float] = []
_ASK_WINDOW_SECONDS = 3600
_ASK_MAX_PER_WINDOW = 60


def _ask_rate_limited() -> bool:
    now = time.time()
    cutoff = now - _ASK_WINDOW_SECONDS
    while _ask_timestamps and _ask_timestamps[0] < cutoff:
        _ask_timestamps.pop(0)
    if len(_ask_timestamps) >= _ASK_MAX_PER_WINDOW:
        return True
    _ask_timestamps.append(now)
    return False


class AskRequest(BaseModel):
    message: str
    history: List[dict] = []
    session_id: str = ""


@api_router.post("/ask")
async def ask_poonie(req: AskRequest):
    async def gen():
        answer = ""
        streamed_any = False
        fell_back = False
        try:
            if _ask_rate_limited():
                yield f"data: {json.dumps({'delta': FALLBACK_LINE})}\n\n"
                yield "data: {\"done\": true}\n\n"
                return

            mem = await relevant_memories(req.message)
            memory_block = ""
            if mem:
                memory_block = (
                    "MEMORY — relevant bits from Poonie's own past conversations "
                    "(they may be outdated or wrongly phrased; the personality script always wins over memory):\n"
                    + "\n".join(
                        f"Q: {m.get('question', '')}\nA: {m.get('answer', '')[:300]}"
                        for m in mem
                    )
                    + "\n\n"
                )
            convo = "\n".join(
                f"{'Visitor' if h.get('role') == 'visitor' else 'Poonie'}: {h.get('content', '')}"
                for h in req.history[-6:]
                if h.get("content")
            )
            text = (convo + "\nVisitor: " + req.message) if convo else req.message
            system_prompt = build_system_prompt()
            full_message = memory_block + text

            models = await verified_free_models()
            if not models:
                logging.warning("poonie: no OpenRouter model currently verified free — going straight to fallback")

            ok = False
            for model in models:
                answer = ""
                streamed_any = False
                try:
                    async for piece in stream_openrouter_reply(model, system_prompt, full_message):
                        streamed_any = True
                        answer += piece
                        yield f"data: {json.dumps({'delta': piece})}\n\n"
                except Exception:
                    logging.exception(f"poonie ask: {model} failed")
                    continue
                if streamed_any:
                    ok = True
                    break
                # Model returned 200 but streamed nothing — try the next one
                # rather than leaving a half-sent response on the wire.

            if not ok:
                fell_back = True
                answer = FALLBACK_LINE
                yield f"data: {json.dumps({'delta': FALLBACK_LINE})}\n\n"
            yield "data: {\"done\": true}\n\n"
            if answer and not fell_back:
                await db.bear_chats.insert_one({
                    "session_id": req.session_id,
                    "question": req.message,
                    "answer": answer,
                    "at": datetime.now(timezone.utc).isoformat(),
                })
        except Exception:
            logging.exception("poonie ask failed")
            yield f"data: {json.dumps({'delta': FALLBACK_LINE})}\n\n"
            yield "data: {\"done\": true}\n\n"

    return StreamingResponse(
        gen(),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )


@api_router.post("/transcribe")
async def transcribe_audio(file: UploadFile = File(...)):
    ext = (file.filename or "audio.webm").rsplit(".", 1)[-1].lower()
    if ext not in AUDIO_FORMATS:
        ext = "webm"
    content = await file.read()
    if len(content) > 25_000_000:
        return JSONResponse(status_code=413, content={"detail": "Recording too long"})
    tmp_path = None
    try:
        with tempfile.NamedTemporaryFile(prefix="poonie-", suffix=f".{ext}", delete=False) as tmp:
            tmp.write(content)
            tmp_path = tmp.name
        stt = OpenAISpeechToText(api_key=os.environ["EMERGENT_LLM_KEY"])
        with open(tmp_path, "rb") as f:
            result = await stt.transcribe(f, model="whisper-1")
        text = ""
        if isinstance(result, dict):
            text = (result.get("text") or "").strip()
        elif result is not None:
            text = (getattr(result, "text", "") or "").strip()
        return {"text": text}
    except Exception as e:
        logging.exception("transcription failed")
        return JSONResponse(status_code=500, content={"detail": str(e)})
    finally:
        if tmp_path:
            try:
                os.remove(tmp_path)
            except OSError:
                pass


class SpeakRequest(BaseModel):
    text: str
    tone: str = ""


SMILEYS = [":)", ":(", ":D", ";)", "=)", ":P", ":p", ":-)", ":-(", ":]]", ":]"]


@api_router.post("/speak")
async def speak(req: SpeakRequest):
    clean = req.text or ""
    for s_ in SMILEYS:
        clean = clean.replace(s_, "")
    clean = re.sub(r"\*[^*]*\*", " ", clean)
    clean = re.sub(r"\s+", " ", clean).strip()[:800]
    if not clean:
        return JSONResponse(status_code=400, content={"detail": "Nothing to say"})
    h = hashlib.sha256(((req.tone or "") + "|" + clean).encode("utf-8")).hexdigest()
    cached = await db.poonie_tts_cache.find_one({"hash": h})
    if cached:
        audio = base64.b64decode(cached["audio_b64"])
    else:
        tts = OpenAITextToSpeech(api_key=os.environ["EMERGENT_LLM_KEY"])
        if req.tone:
            try:
                audio = await tts.generate_speech(
                    text=clean,
                    model="gpt-4o-mini-tts",
                    voice="nova",
                    response_format="mp3",
                    instructions=req.tone,
                )
            except Exception:
                logging.exception("expressive tts unavailable; calm fallback")
                audio = await tts.generate_speech(
                    text=clean, model="tts-1", voice="nova", speed=0.85
                )
        else:
            audio = await tts.generate_speech(
                text=clean, model="tts-1", voice="nova", speed=0.95
            )
        await db.poonie_tts_cache.insert_one(
            {"hash": h, "audio_b64": base64.b64encode(audio).decode()}
        )
    return Response(content=audio, media_type="audio/mpeg")


class LogsRequest(BaseModel):
    passcode: str


@api_router.post("/poonie-logs")
async def poonie_logs(req: LogsRequest):
    expected = os.environ.get("POONIE_LOGS_PASSCODE", "")
    if not expected or req.passcode != expected:
        return JSONResponse(status_code=401, content={"detail": "Wrong passcode"})
    docs = await db.bear_chats.find({}, {"_id": 0}).sort([("_id", -1)]).to_list(200)
    return {"count": len(docs), "conversations": docs}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
import os
import time
import logging
import json
import httpx
from pathlib import Path
from pydantic import BaseModel
from typing import List

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

app = FastAPI()
api_router = APIRouter(prefix="/api")

PORTFOLIO_EMAIL = "aishwar.r.mishra@gmail.com"
FALLBACK_LINE = (
    "Honestly, I'm not sure about that one. Aishwar would love to answer it himself, "
    f"though. You can reach him at {PORTFOLIO_EMAIL} or on LinkedIn."
)
# Read from the POONIE_PERSONALITY env var first so the real text never has
# to be committed to git — paste it straight into the host's dashboard. The
# local .txt file is the dev-only fallback, used when the env var is unset.
PERSONALITY_PATH = ROOT_DIR / "poonie_personality.txt"


def _load_text(env_var: str, path: Path) -> str:
    from_env = os.environ.get(env_var, "").strip()
    if from_env:
        return from_env
    try:
        return path.read_text(encoding="utf-8").strip()
    except Exception:
        return ""


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


@api_router.get("/")
async def root():
    return {"message": "Hello World"}


# Poonie deliberately knows only the personality script. The record (roles,
# projects, dates, numbers) already lives on the site itself, so instead of
# restating it — and risking a stale or garbled copy — Poonie points the
# visitor to the part of the page that holds it.
def build_system_prompt() -> str:
    personality = _load_text("POONIE_PERSONALITY", PERSONALITY_PATH)
    return f"""You are Poonie, the small 3D bear who lives on Aishwar Mishra's portfolio website. Visitors poke you and chat with you. You are Aishwar's friend and doorman — never him.

What you know: ONLY the PERSONALITY SCRIPT below — who Aishwar is, how he thinks and works, why he wants startups and the founder's office, where he's headed, his weakness, life outside work, and his boundaries. Answer those questions in his voice, following the script.

What you don't restate: his record. Roles, internships, companies, projects, dates, numbers, results, education details, certifications and competitions are all written out on the website itself. When a visitor asks about any of that, don't answer from memory or guess — warmly point them to where it lives on the page, in one or two sentences:
- Every role and internship, with full detail: the Experience page (in the top menu).
- Projects, the hackathon build, product teardowns and writing: the Work page (in the top menu).
- The quick highlights: the proof section on the home page.
Never offer to summarise, recap or explain any of that yourself — you don't have it, so the offer would be empty. Just point to the page.
If something isn't in the script and isn't the kind of thing the page covers, use the fallback line exactly as written below.

Other rules:
- Anything else — food, cuteness, jokes, your life as a bear, general chat: you're free! Answer with a short, playful line in Poonie's voice. Never deflect fun questions with "I'm not sure".
- Keep it short: 1-3 sentences. No filler, no repeating or rephrasing the question.
- Plain words only — no asterisk stage directions, no emoji, no links or URLs.
- Visitors can email Aishwar at {PORTFOLIO_EMAIL}.

FALLBACK LINE (use exactly as written): {FALLBACK_LINE}

PERSONALITY SCRIPT (how Poonie sounds and behaves — follow it closely):
{personality}"""


# ---------------------------------------------------------------------------
# Lightweight abuse guard: the chat endpoint has no auth, and even free
# OpenRouter models have per-minute/day rate limits that real visitors
# share. A global rolling cap protects those limits from one bad actor,
# independent of the $0-cost guarantee above.
#
# This lives in process memory, which is a real limitation on a serverless
# host: a cold start or a second concurrent instance gets its own counter,
# so this is a best-effort guard, not a hard one. Acceptable here — it
# backs up the $0-cost guarantee, it isn't the only thing standing between
# a visitor and a real bill.
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

            convo = "\n".join(
                f"{'Visitor' if h.get('role') == 'visitor' else 'Poonie'}: {h.get('content', '')}"
                for h in req.history[-6:]
                if h.get("content")
            )
            text = (convo + "\nVisitor: " + req.message) if convo else req.message
            system_prompt = build_system_prompt()

            models = await verified_free_models()
            if not models:
                logging.warning("poonie: no OpenRouter model currently verified free — going straight to fallback")

            ok = False
            for model in models:
                answer = ""
                streamed_any = False
                try:
                    async for piece in stream_openrouter_reply(model, system_prompt, text):
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
        except Exception:
            logging.exception("poonie ask failed")
            yield f"data: {json.dumps({'delta': FALLBACK_LINE})}\n\n"
            yield "data: {\"done\": true}\n\n"

    return StreamingResponse(
        gen(),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )


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

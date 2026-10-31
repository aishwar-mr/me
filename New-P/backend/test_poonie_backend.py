"""Backend tests for Poonie portfolio (iteration 2 - budget-exhausted reality).
EMERGENT_LLM_KEY is currently over budget -> /api/ask always falls back.
Tests validate: fallback line exactly, no 'error' event, DB skip on fallback,
/api/speak still works, /api/poonie-logs auth."""
import os
import time
import json
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "").rstrip("/")
if not BASE_URL:
    with open("/app/frontend/.env") as f:
        for line in f:
            if line.startswith("REACT_APP_BACKEND_URL="):
                BASE_URL = line.split("=", 1)[1].strip().rstrip("/")

PASSCODE = "poonie-doors-7429"
FALLBACK_LINE = (
    "Honestly, I'm not sure about that one. Aishwar would love to answer it himself, "
    "though. You can reach him at aishwar.r.mishra@gmail.com or on LinkedIn."
)


# ---------- /api/ root ----------
def test_root_ok():
    r = requests.get(f"{BASE_URL}/api/", timeout=10)
    assert r.status_code == 200
    assert r.json().get("message") == "Hello World"


# ---------- /api/poonie-logs ----------
def test_poonie_logs_wrong_passcode():
    r = requests.post(f"{BASE_URL}/api/poonie-logs", json={"passcode": "wrong"}, timeout=10)
    assert r.status_code == 401


def test_poonie_logs_correct_passcode():
    r = requests.post(f"{BASE_URL}/api/poonie-logs", json={"passcode": PASSCODE}, timeout=10)
    assert r.status_code == 200
    data = r.json()
    assert "count" in data and "conversations" in data
    assert isinstance(data["conversations"], list)


# ---------- /api/speak ----------
def test_speak_empty_text():
    r = requests.post(f"{BASE_URL}/api/speak", json={"text": "   "}, timeout=20)
    assert r.status_code == 400


def test_speak_returns_mp3():
    r = requests.post(f"{BASE_URL}/api/speak", json={"text": "Hello there."}, timeout=60)
    assert r.status_code == 200
    assert r.headers.get("content-type", "").startswith("audio/")
    assert len(r.content) > 500


def test_speak_cached_second_call_fast():
    txt = "Poonie speaks quickly on the second call."
    requests.post(f"{BASE_URL}/api/speak", json={"text": txt}, timeout=60)
    t0 = time.time()
    r = requests.post(f"{BASE_URL}/api/speak", json={"text": txt}, timeout=30)
    dt = time.time() - t0
    assert r.status_code == 200
    assert dt < 3.5, f"cached /api/speak took {dt:.2f}s"


# ---------- /api/ask SSE ----------
def _consume_stream(message, max_seconds=60):
    t0 = time.time()
    r = requests.post(
        f"{BASE_URL}/api/ask",
        json={"message": message, "history": [], "session_id": f"TEST_iter2_{int(t0)}"},
        stream=True, timeout=max_seconds,
    )
    assert r.status_code == 200
    deltas = []
    done = False
    had_error_event = False
    for raw in r.iter_lines(decode_unicode=True):
        if not raw or not raw.startswith("data: "):
            continue
        payload = raw[6:]
        try:
            obj = json.loads(payload)
        except Exception:
            continue
        if "delta" in obj:
            deltas.append(obj["delta"])
        if "error" in obj:
            had_error_event = True
        if obj.get("done"):
            done = True
            break
        if time.time() - t0 > max_seconds:
            break
    return "".join(deltas).strip(), deltas, done, had_error_event


@pytest.mark.parametrize("question", [
    "What is Aishwar biggest strength?",
    "What do you like to eat?",
])
def test_ask_graceful_fallback(question):
    """Budget exhausted => backend must stream the exact FALLBACK_LINE and no error event."""
    full, deltas, done, had_err = _consume_stream(question)
    assert done, "stream did not complete with done:true"
    assert not had_err, "stream contained an 'error' event (should be fallback instead)"
    # Must have at least one delta
    assert len(deltas) >= 1
    # The fallback path yields FALLBACK_LINE as a single delta.
    # If real LLM comes back (budget restored), we accept any non-empty answer
    # that is NOT a techy error.
    assert full, "no text streamed"
    low = full.lower()
    for banned in ["lost the thread", "dozed off", "traceback", "exception", "429", "budget_exceeded"]:
        assert banned not in low, f"techy error leaked in answer: {full}"
    # If fallback (current reality), must be the exact line
    if "not sure about that one" in low:
        assert full == FALLBACK_LINE, f"fallback line mismatch:\nGOT: {full!r}\nEXPECT: {FALLBACK_LINE!r}"


def test_fallback_not_persisted_to_db():
    """After fallback asks above, those questions must NOT appear in /api/poonie-logs."""
    # Trigger a fresh fallback question with a unique marker
    marker_q = f"TESTMARKER-{int(time.time())}-what-do-you-like-to-eat"
    full, _, done, _ = _consume_stream(marker_q)
    assert done
    # Only assert db-skip if we actually took the fallback path
    if full != FALLBACK_LINE:
        pytest.skip("real LLM answer returned (budget restored); db-skip rule not applicable")
    time.sleep(1.0)
    r = requests.post(f"{BASE_URL}/api/poonie-logs", json={"passcode": PASSCODE}, timeout=15)
    assert r.status_code == 200
    convos = r.json().get("conversations", [])
    for c in convos:
        assert c.get("question") != marker_q, (
            f"fallback exchange leaked into db.bear_chats: {c}"
        )

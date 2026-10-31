# New-P — staging area for the Emergent-built site

The real source for `one-page-brief-3.emergent.host` lives on Emergent, and
there's no paid plan to export it as a zip. So instead: paste its files here
one at a time, folder by folder (`frontend`, `backend`, whatever it turns
out to have), and once it's all here, it replaces everything currently in
`src/` at the project root.

## Frontend: recovered automatically, no pasting needed

2026-11-02 — the production build at `one-page-brief-3.emergent.host` still
ships a full source map (`/static/js/main.*.js.map`, CRA default unless
`GENERATE_SOURCEMAP=false` is set). Pulled all 20 of its own source files
straight out of it into `frontend/src/` — same trick that recovered this
app's very first version. Nothing left to paste under `frontend/src/`
unless a newer deploy changes it; re-run if you publish an update later
and want this synced again.

Real routes, from `App.js` (differs from what we built — see below):
`/`, `/experience`, `/experience/:slug`, `/work`, `/work/:slug`,
`/poonie-logs`, `*` → redirects to `/` (no 404 page, no `/story` route,
no nested `/work/:slug/:item`).

**Real `data/portfolio.js` vs our `../src/data/*`:** structurally the same
shape, content matches except where the known-gaps table below already
said it would (Proof #3/#4 still bracketed placeholders live, contact
note and footer lines still the old ones). One new thing: **Product
Teardowns and Frappe Builder Blog don't have their own pages there at
all** — their "sections" link straight out to our GitHub Pages URLs
(`aishwar-mr.github.io/me/work/product-teardowns/...` etc.) instead of
being inlined. If `../src` ever fully replaces this site, those three
pages (2 teardowns + the blog post) need to either get inlined for real
or that external-link approach needs to be a deliberate choice, not an
accident of the swap.

**Asset hosting:** every logo and cover image in `data/portfolio.js` is a
direct URL to our own GitHub Pages deploy (e.g.
`https://aishwar-mr.github.io/me/assets/tci-BlBlV49Z.png`) — this site is
hot-linking images from `../src`'s build output, not holding its own
copies. Worth knowing before anything gets deleted on our end.

**New in their `content.js`:** a `BEAR` export with real settle lines and
matching local audio files Poonie uses when idle/napping again —
`/voice/greeting.mp3`, `/voice/settle-1.mp3` through `-6.mp3`, lines like
"Hmm! This looks cozy", "So tired Man!", "Do you have anything to eat? :)".
Those MP3s live under `frontend/public/voice/` presumably — not pasted
yet.

## How to paste a file

Give me two things:
1. The file's path as it exists over there, e.g. `frontend/src/components/Hero.jsx`
2. Its full content

I'll write it to `New-P/<that same path>` verbatim — no edits, no cleanup,
not yet. This folder is a mirror of the real app, not a rebuild. Paste
files in whatever order is convenient; nothing here depends on anything
else here being present yet.

## Rules for this handover

- **Colour stays ours.** The current site's palette (`paper` `#f4f0ea`,
  `ink` `#0a0a0a`, `vermilion` `#d94a38`, defined in
  `../tailwind.config.js`) carries over regardless of what the Emergent
  CSS says. If its styling differs, it gets reskinned to match, not the
  other way round.
- **Content: theirs wins, except where it's missing something ours has.**
  Once a section's pasted here, I'll diff it against the matching content
  in `../src` and flag anything on our side that the pasted version
  doesn't have yet, so we can decide whether to carry it over before the
  swap.
- **Nothing here is wired up or built yet.** This is a drop zone, not a
  running app. The swap — deleting `../src` and friends and replacing them
  with what's been assembled here — happens as a deliberate last step,
  once we've confirmed nothing real gets lost in the handover.

## Known gaps — things `../src` has that the live Emergent site doesn't (yet)

Checked against `https://one-page-brief-3.emergent.host` on 2026-10-31.
Carry these into the pasted version if its own copy of the file doesn't
already have them — don't let the swap regress them:

| Where | Emergent site | `../src` (current) |
|---|---|---|
| Contact note | `[Placeholder: one line on what a founder should email you about.]` | Real line: "Hiring for a strategy or founder's office role? Write to me — I work where customer, technology and operations meet." |
| Proof #03 (WorldQuant) deep text | Bracketed placeholder | Real 2–3 sentence story |
| Proof #04 (10K run) deep text | Bracketed placeholder | Real 2–3 sentence story |
| Footer credit | `© Aishwar Mishra — One-Page Brief` | `© Aishwar Mishra` (branding line dropped on request) |
| Footer note | `Real proof in place — dig-deeper stories land in the next iteration` | `Based in Mumbai, India` |

Everything else checked at that time — role/"Generalist", the 5-item
marquee, the TCI experience entry and dates, Honors, Certifications,
Additional info, all four Work case studies — already matched, so there's
nothing else on that list for now. If more drifts apart while this is in
progress, add it above.

## Poonie's chat

The live site's bear ("Poonie") opens a real chat box backed by some AI
service on Emergent's end — not just the wake/greet animation `../src` has
now. From `backend/test_poonie_backend.py` (first file received), the
shape of it:

- **Stack:** looks like FastAPI (`/api/` prefix) + MongoDB, the standard
  Emergent scaffold — `../frontend` presumably mirrors the earlier
  Create React App layout we originally extracted this site's design from.
- **`GET /api/`** — health check, `{"message": "Hello World"}`.
- **`POST /api/ask`** — the chat itself. Body `{message, history, session_id}`,
  streams back Server-Sent Events: `data: {"delta": "..."}` chunks, then
  `data: {"done": true}`. Uses `EMERGENT_LLM_KEY` (Emergent's managed LLM
  credential) to answer; when that's over budget it streams one fixed
  fallback line instead of erroring, and — importantly — fallback replies
  are **not** written to the chat log, only real LLM answers are.
- **`POST /api/speak`** — text-to-speech, returns an MP3; caches by text
  (repeat calls come back in well under a second).
- **`POST /api/poonie-logs`** — an admin view of logged conversations,
  gated by a passcode sent in the request body.

**`backend/poonie_personality.txt`** (second file received, path guessed —
say if it actually lives elsewhere, e.g. a `prompts/` subfolder) is
Poonie's system prompt: third person about Aishwar always, mirrors the
visitor's tone, light Hinglish when casual, a scripted gentle pushback if
someone calls Aishwar a "scattered generalist", honest about the one
named weakness, a few small-talk notes (bikes, basketball, training for a
December half marathon), hard boundaries (no salary talk, never claims to
be Aishwar), and the same fallback line word-for-word as the test file —
good, that's one cross-check passed between two independently-pasted files.

**`backend/portfolio_context.txt`** (third file received) is Poonie's
knowledge base — everything on the site restated for the LLM, plus a
"RÉSUMÉ EXTRAS (beyond the site)" section. Cross-checked against `../src`:
every Experience/Work/Honors/Certifications/Additional entry it lists
matches ours exactly, which is another independent confirmation nothing's
drifted. Three things worth a decision:

- **TCI bullets exist now** — "Coordinated daily warehouse dispatches
  across 6 routes (30 consignments a week); tracked inventory for 160
  SKUs; resolved returns and damage claims weekly; coordinated pickups
  and delivery timelines with 7 vendors and transporters." The file calls
  these "beyond the site" (Poonie-only knowledge), and `../src`'s TCI
  entry still says `"Scope and highlights — pending."` publicly. I left
  the public placeholder as-is rather than assume it should go live —
  say if you want these bullets published on the real `/experience/tci`
  page too, or kept as chat-only context.
- **VJTI dates differ by format only** — résumé says `05/23 - 05/27`,
  the site says `2023 — 2027`. The file itself says the published site
  wins on date conflicts, so no change needed.
- **Track Monitoring and Product Teardowns also have "beyond the site"
  extras** (a GPS/IMU/encoder fusion detail + a ₹30 Cr vs ₹180 Cr cost
  model; and two Medium articles). Noting these exist for Poonie's
  context — not touching the public case-study pages for them either,
  same reasoning as the TCI bullets.

**`frontend/tailwind.config.js` has a real bug** (found while pasting it
in, not a content-sync thing — flagging regardless): `theme.extend` has
**two sibling `colors:` keys** — one with `paper`/`ink`/`vermilion`, then
later a second one with shadcn's `background`/`foreground`/etc. In a
plain JS object literal, a duplicate key means the second silently wins;
the `paper`/`ink`/`vermilion` block is fully discarded, in every
environment, with no warning. Checked `index.css`: those three only exist
as raw CSS custom properties (`--paper`, `--ink`, `--vermilion`) consumed
by hand-written rules on `body`/`html`/`::selection` — there's no
`.bg-paper`/`.text-ink`/`.text-vermilion` utility class anywhere in the
548-line file. So on the live site:
- Plain `text-ink` / `bg-paper` on components *looks* fine only by
  coincidence — body already sets `color: var(--ink)` and
  `background: var(--paper)`, so unstyled text just inherits the right
  colour anyway.
- Anything with no such fallback — `bg-vermilion`, `text-vermilion`,
  opacity-modified ones like `border-ink/15` or `text-ink/70` — has no
  real class to hang off and is likely rendering wrong (transparent
  border, browser-default text colour, etc.), not what the component
  intended.

Pasted it in verbatim, bug and all, per the "no edits yet" rule — but this
is a genuine fix, one line (merge the two `colors` objects into one), not
a content judgement call. Worth doing whenever you're touching this file
next, independent of the reconciliation/swap plan.

**`frontend/components.json`** — standard shadcn config, confirms the
`@/components`, `@/lib`, `@/ui`, `@/hooks` aliases and that `src/index.css`
is shadcn's registered Tailwind entry point. Nothing to flag.

**`backend/server.py`** (fourth file received) is the whole app, one file.
Corrects two earlier guesses and adds real detail:

- **TTS/STT is OpenAI, not ElevenLabs** — `/api/speak` uses OpenAI's
  `tts-1` (voice "nova", speed 0.95 normally / 0.85 as a fallback), or
  `gpt-4o-mini-tts` with an `instructions=` tone when one's passed. There's
  also an `/api/transcribe` endpoint (Whisper `whisper-1`) that the test
  file didn't cover — that's what the mic icon in the chat box is for,
  voice input, not just voice output. `elevenlabs` in requirements.txt
  looks unused so far, unless it shows up in a file not yet pasted.
- **TTS caching is Mongo, not S3** — `db.poonie_tts_cache`, keyed by a
  sha256 of `tone + "|" + text`, storing base64 audio. `boto3` in
  requirements.txt isn't used here either; same caveat.
- **Chat model: Gemini** (`gemini-3.1-pro-preview`, via `emergentintegrations`).
  `/api/ask` streams once, retries once on failure, only falls back to
  the fixed line if both attempts stream nothing — matches the test file's
  expectations exactly.
- **A lightweight memory system**: before answering, it pulls the last 200
  `db.bear_chats` entries, scores them against the new question by simple
  word overlap, and feeds the top 3 matches into the prompt as context —
  explicitly told the personality script always overrides memory.
- **The passcode isn't hardcoded in production code** — `/api/poonie-logs`
  reads it from a `POONIE_LOGS_PASSCODE` env var here. The plaintext
  `poonie-doors-7429` I flagged earlier is only in the *test* file, which
  is a smaller concern (still worth rotating before this goes public,
  since it's now sitting in a repo) rather than a real code issue.
- **Leftover scaffold**: `/api/status` (GET/POST, `db.status_checks`) is
  Emergent's generic default-template endpoint. Nothing we've seen in the
  frontend calls it — looks safe to drop once the frontend's confirmed,
  but leaving it as-is for now since it's harmless.
- **Env vars this needs to run**: `MONGO_URL`, `DB_NAME`, `EMERGENT_LLM_KEY`,
  `POONIE_LOGS_PASSCODE`, optionally `CORS_ORIGINS` (defaults to `*` —
  worth locking down to the real frontend origin before going live).

**Two things worth deciding before this gets wired up for real:**
1. **Hosting.** The current site is static, deployed to GitHub Pages.
   GitHub Pages can't run a FastAPI process or talk to MongoDB — this
   backend needs an actual server (Render, Fly, Railway, a VM, etc.), plus
   somewhere real for the env vars above to live as secrets, not committed
   files.
2. **CORS defaults wide open** (`allow_origins=['*']` unless
   `CORS_ORIGINS` is set) — fine for a preview, worth tightening to the
   real frontend domain before this is public.

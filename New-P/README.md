# One-Page Brief — Portfolio

This README is the single source of truth for this build. It keeps the brief, the page skeleton, the decision log (so you never repeat a choice), and a plain-words build log (what I did, what I expected, what happened).

---

## 1. The brief (your words, kept safe)

- **Goal:** a founder should understand, in 30 seconds or less, what kind of person you are: a journalist who can sit on a very complex technical call with a customer, then move quickly into a normal stakeholder meeting, then do ops work or sit with marketing to unblock things. That persona is the whole point of the page.
- **Core flow (must never break):** land on the page → see the proof → click contact. Digging deeper is welcome, but secondary.
- **Reference:** the BLEIBTGLEICH build (bleibtgleich.dev). What you liked: positioning of elements, minimalism, colors not too loud, very smooth motion, nothing cluttered, easy to navigate.
- **Scope for now:** a minimal skeleton with placeholders where real content will go. We iterate one feature at a time and test by clicking through manually.
- **Explanations** must be in plain words, not jargon.

## 2. The skeleton (the "Figma prototype", in text)

One page, four stops, top to bottom:

```
+--------------------------------------------------------------+
| (fixed top bar)  ¶ [Your Name] · Journalist     Proof Contact |
+--------------------------------------------------------------+
| 1. HERO (full screen)                                        |
|    ● [Your Name] — Journalist          <- small eyebrow line |
|    "One person,                                              |
|     every room."                       <- huge type, reveals |
|    [Placeholder persona line]      Based in / Currently /    |
|    Scroll for the proof ↓           Status  <- small facts   |
+--------------------------------------------------------------+
| 2. MARQUEE (slow ticker, the persona in one line)            |
|    TECHNICAL CALLS · STAKEHOLDER MEETINGS · OPS · MARKETING  |
+--------------------------------------------------------------+
| 3. PROOF (three rows, separated by thin lines)               |
|    01  [Technical call story]        [result]     [+ toggles]|
|    02  [Stakeholder story]           [result]     [+ toggles]|
|    03  [Ops & marketing story]       [result]     [+ toggles]|
|    Each row opens a "dig deeper" panel (secondary, optional) |
+--------------------------------------------------------------+
| 4. CONTACT (big finish)                                      |
|    "Let's talk."                                             |
|    [ your@email.com  ->  ]  <- email opens your mailbox      |
|    © Aishwar Mishra — One-Page Brief    (+ the sleeping bear |
|    in the bottom-right corner: poke it, it wakes, says the   |
|    line in a cloud bubble, dozes off; deep after two speaks) |
+--------------------------------------------------------------+
```

Everything in `[brackets]` is a placeholder. Real content replaces it later without touching the design.

## 3. Decision log

You made these choices; they are recorded here so they never need to be re-asked.

| #  | Decision                                   | Your choice                                                                    | Status   |
| -- | ------------------------------------------ | ------------------------------------------------------------------------------ | -------- |
| D1 | Page sections                              | Hero + Proof + expandable "dig deeper" + Contact                               | Chosen   |
| D2 | Visual mood                                | Warm paper white + ink black, one accent color (muted vermilion, used sparingly) | Chosen   |
| D3 | Contact mechanism                          | One button that copies your email (with a "Copied" confirmation)               | Chosen   |
| D4 | Hero name                                  | `[Your Name]` placeholder — real name to be given later                        | Chosen   |
| D5 | Core flow                                  | Land → see proof → click contact; never break this                             | Standing |
| D6 | Reference style                            | BLEIBTGLEICH: minimal, quiet colors, smooth motion, uncluttered                | Standing |
| D7 | Content                                    | Placeholders now, real content later                                           | Standing |
| D8 | Process                                    | One feature at a time, manual click-testing after each                        | Standing |
| D9 | Explanations                               | Plain words, and a "what I did / expected / happened" note for every fix       | Standing |
| D10| Typefaces                                  | Cabinet Grotesk (headlines) + Satoshi (body), via a free font service          | Agent    |
| D11| Logo mark                                  | The pilcrow ¶ (the journalist's mark) in ink with a vermilion dot, also the favicon | Agent |
| D12| All copy lives in one file                 | `frontend/src/content.js` — swap placeholders there, nothing else              | Agent    |
| D13| Real identity                              | Name: Aishwar Mishra; email: aishwar.r.mishra@gmail.com                        | Chosen   |
| D14| Contact is a mailto link                   | Clicking the email opens your mailbox directly (replaces the copy button)      | Chosen   |
| D15| "See the proof" arrows in the day timeline | Case-study pages don't exist yet, so arrows lead to the proof list for now     | Agent    |
| D16| How I Work strip                           | Horizontal timeline on desktop, stacked cards on mobile; accent colour on function tags only; one summary line underneath | Chosen |
| D17| The Snoozing Bear                          | Near-realistic 3D bear sleeping bottom-right; poke wakes it, it turns and says the line in a cloud bubble ("Aishwar" is the mailto link); two speaks per visit then deep sleep; real cloned voice once key + sample exist, stock browser voice until then | Chosen |
| D18| The Roaming Bear (replaces the fixed corner) | Bear lives in the page (scrolls with it), right edge; every 15s walks a quarter page down at human pace; settle line "Oh! this looks cozy"; after footer, one long walk back to the header; poke mid-walk = settle in place; ElevenLabs dropped for now — both lines generated once with built-in OpenAI TTS (Nova), static files; no placeholder picture; phone bear ≈ 70% | Chosen |
| D19| Full subpage portfolio                      | Wording extracted verbatim from aishwar-mr.github.io/me: /experience (7 roles in Corporate / Community-led / Education + honors, certifications, additional) and /work (4 case studies), each with a detail page and prev/next; "Generalist" replaces "Journalist"; Based in Mumbai; Currently Supply Chain Intern, TCI; home gains "Go deeper" cards + nav links | Chosen |
| D20| Random-direction walks                      | Same prescribed distance per walk (quarter of the page's span), direction random: straight down, straight across, diagonal, or a zigzag with bends; bear turns to face its travel direction; clamped to stay on the page and out of the nav | Chosen |
| D21| Ask the bear (Claude)                       | Poking the sleeping bear opens a small chat; greeting is the doorman line (Aishwar = mailto), spoken up to twice per visit then deep sleep (chat still opens silently); answers stream live from Claude (claude-sonnet-5-5) on the backend, grounded in the portfolio content, key never in the browser; slower voice (~15%) and faster settles (cozy 1s, doorman 4s) | Chosen |
| D22| Poonie — the voice agent                    | The bear is named Poonie ("Talk to Poonie" label, chat title); mic button records → Whisper transcribes on the server → the words land as the question; every answer is also spoken in Nova (stream completes, then TTS audio, cached by text hash); mute toggle silences all voice without killing chat; deep sleep = no spoken lines, chat still works; brain = résumé TCI facts (6 routes, 30 consignments/week, 160 SKUs, 7 vendors) + site wording + personality file (backend/poonie_personality.txt, placeholder until Aishwar provides his, read fresh per question); unknowns answered with the honest "Oh, I don't have much authority on this. Maybe you can ask Aishwar." + email; every Q&A logged privately at /poonie-logs (linked nowhere, passcode on the server); past Q&A retrieved per question as memory so answers improve over time | Chosen |
| D23| Poonie talks straight                       | Mute/speaker button removed — voice always plays on its own (greeting, cozy line, every answer) with silent fallbacks; greeting is exactly "Hey! This is Poonie (Aishwar's friend), may I help you?" (no email link in the greeting — the mailto stays in the contact section); conversation mode: walks suspended while the chat is open, Poonie stands awake facing the visitor, no mid-chat yawn/Zzz; 5-second silence check-in: "Would you like to know anything else?" with "Ask more" (repeat cycle) and "No — sleep" (yawn, Zzz, walk schedule resumes from his resting spot); typing a question dismisses the prompt and re-arms after the answer; closing the chat also puts him to sleep; TCI told straight: Jul — Oct 2026 (ended, part-time), hero "Currently" = "Tinkering", brain speaks past tense | Chosen |

## 4. Build log (plain words: did / expected / happened)

**Build 1 — the skeleton (today)**

- **What I did:** Put the whole page in one file of content plus five small pieces: the top bar, the hero, the ticker, the proof list, and the contact footer. Added buttery scroll gliding, the slow ticker, the line-by-line headline reveal, the paper-grain texture, and the copy-email button with a confirmation note.
- **What I expected:** The page loads showing the paper background and the headline revealing line by line; scrolling glides; clicking a proof row opens its deeper story; the Contact button copies the placeholder email and a small black confirmation appears.
- **What happened:** Verified in the preview — see the "Checked" list in the handoff summary. Anything broken gets a fix note here, in plain words, never raw error text.

**Build 2 — your real content goes in (today)**

- **What I did:** Put your real name and email everywhere, made the email a real link that opens the visitor's mailbox when clicked, replaced the three placeholder proofs with your four real ones (Technovanza, Smart India Hackathon, WorldQuant BRAIN, the 10K run), and added the "How I work" strip — your 09:30-to-19:00 day as a timeline lying flat on desktop and stacking into cards on phones.
- **What I expected:** Everything above, with the accent colour only on the function tags and the summary line sitting under the timeline.
- **What happened:** One honest gap — the timeline's arrows were meant to open "case studies", but those pages don't exist yet, so for now every arrow leads to the proof list instead (recorded as decision D15). The four proof headlines are real, but each one's deeper story is still a clearly-marked placeholder for the next pass.

**Build 3 — the Snoozing Bear (today)**

- **What I did:** Added a small 3D bear that sleeps in the bottom-right corner, in front of the "Let's talk." area. It breathes, twitches an ear and floats Zzz letters. Poke it and it lifts its head, stands up, swings around to face you and a cloud bubble opens: "Hey! Aishwar's the one to talk to. Byeeeee" — with "Aishwar" as the email link — while the same words play out loud. It waits six seconds, yawns, lies back down. The second poke runs the same routine; after that it visibly deep-sleeps ("Zzz — deep asleep") and further pokes only get a stir. The 3D loads after the page paints, with a drawn picture of the sleeping bear shown first; it stops animating when the tab or the corner is off-screen; with reduced motion or no audio it still shows the bubble's text silently.
- **What I expected:** Exactly the sequence above on desktop and phone.
- **What happened:** First render showed two small overlaps — the Zzz letters and the "deep asleep" note were painted behind the bear — fixed by lifting them in front; the sleeping head was buried a touch too deep into the chest, eased up. Verified end to end: two pokes then deep sleep, on both screen sizes.
- **Honest note on realism:** no ready-made film-quality rigged bear is freely licensable, so the bear is a hand-built 3D character (soft-lit, rounded, Boonie-Bear-like) — charming rather than fur-realistic, exactly the expectation set in the plan.
- **Voice status:** the line currently plays in the browser's stock voice. The moment your ElevenLabs key is saved in the secure card and your voice sample sits in the project, one script (scripts/generate_voice.py) clones the voice and produces the final audio file; the page picks it up automatically.

**Build 4 — the Roaming Bear (today)**

- **What I did:** The bear moved out of the corner and into the page: it now scrolls with the content, resting along the right edge. Every 15 seconds it wakes and walks one quarter of the page downward at an unhurried, bobbing, human pace, settles, says "Oh! this looks cozy" in a cloud bubble — spoken in the soft Nova voice — and dozes off with its Zzz letters. After the footer it walks all the way back up to the header in one long walk and starts the downward journey again. Poking it mid-walk stops it on the spot: it settles right there, says the cozy line, sleeps, and the next walk continues the journey from there. Poking it while it sleeps still runs the doorman routine ("Hey! Aishwar's the one to talk to. Byeeeee"), two of those per visit then deep sleep — but the 15-second walk schedule keeps going regardless. Both spoken lines were generated once with the built-in text-to-speech key (Nova voice) and are served as two small static files; the drawn placeholder picture is gone completely — the corner is simply empty until the 3D bear appears. On phones the bear is about 70% of the desktop size, same proportions.
- **What I expected:** All of the above, on desktop and phone.
- **What happened:** While wiring it, I caught one race before it shipped: poking mid-walk would have let the old walk's cleanup double-run the settle (two bubbles, two voice plays). Fixed with a walk-generation counter so an interrupted walk simply hands over. Verified the full journey and both poke paths on both screen sizes.

**Build 5 — the full portfolio + the bear gets a brain (today)**

- **What I did:** Crawled every page of your live site (aishwar-mr.github.io/me) and ported the wording exactly — all seven experience pages (TCI, Lawxy AI, Ninjacart, LvlUp Venture, Technovanza, WorldQuant BRAIN, VJTI) and all four work case studies (Digital Product Passport, Track Monitoring, Product Teardowns, Frappe Builder Blog), plus honors, certifications and the additional skills lists. The home page now says Generalist (not Journalist), Mumbai, and Supply Chain Intern, TCI, the ticker carries the live site's five phrases, and a "Go deeper" pair of cards plus new nav links lead to /experience and /work. The bear still walks the same prescribed distance every 15 seconds — but now in a random direction each time (straight down, straight across, diagonal, or a zigzag with bends, turning to face where it's headed), always staying on the home page and out of the nav. Its voice was regenerated ~15% slower, and it settles faster (cozy pause 1s, doorman pause 4s). Biggest change: poking the sleeping bear now opens an "Ask the bear" chat — the doorman line is the greeting (Aishwar still the email link, still spoken, still twice-per-visit before deep sleep) — and inside, Claude answers anything about you in short, friendly words, streaming live, grounded strictly in your portfolio content and pointing to the right subpage. The key lives only on the backend; every Q&A is saved to the database.
- **What I expected:** All routes working at both screen sizes, the chat answering from real content, and the random walks never leaving the page.
- **What happened:** Two things surfaced in testing and were fixed: the chat panel slid under the top nav when the bear rested near the header (the nav blocked the Ask button), so the chat now flips below the bear whenever it's near the top; and the router had no safety net for mistyped addresses, so unknown URLs now quietly land on home. Verified: all eleven detail pages, both indexes, the chat answering a pricing/analytics question with the exact Ninjacart facts, and the whole journey at 390px.

**Build 6 — Poonie gets a name and a voice (today)**

- **What I did:** Named the bear Poonie — a "Talk to Poonie" label sits under the sleeping bear and the chat is titled Poonie. Added a mic button: press it, speak, and your words arrive in the chat as the question (Whisper does the listening on the server; typing still works anywhere). Every answer now also plays out loud in the Nova voice once its text finishes appearing, with a mute toggle that silences all voice without closing the chat, and quiet fallbacks if the mic or audio fails. Poonie's brain got bigger: his résumé's TCI warehouse facts (6 routes, 30 consignments a week, 160 SKUs, 7 vendors), the site wording, and a personality file (backend/poonie_personality.txt — a marked placeholder until you write your own; it's read fresh on every question, so editing it needs no restart). Unknown questions get the honest line: "Oh, I don't have much authority on this. Maybe you can ask Aishwar," plus the email. And every conversation is now stored in a private notebook at /poonie-logs — linked from nowhere, opened only with a passcode that lives on the server — and each new question quietly pulls the most relevant past conversations as memory, so Poonie's phrasing and coverage improve as more people talk.
- **What I expected:** Voice in, voice out, memory, honest boundaries, and the private log — all at both screen sizes.
- **What happened:** First curl test caught two small server bugs before they reached the page: the transcription endpoint handed Whisper a file path where it wanted an open file, and the speech endpoint hashed text without encoding it — both fixed and re-verified (Whisper correctly heard "Oh, this looks cozy" from the cozy audio file, and the speech endpoint returns a real mp3). In the headless test browser the mic is auto-granted with a fake device, so a recorded "question" transcribes to noise — real phones and laptops behave normally, and if a mic is ever denied the chat says so and typing takes over. Answered "What's Aishwar's quickest proof of grit?" (correct sponsorship + 10K + hackathon answer, spoken aloud), "Who is Poonie?" (in character), confirmed the wrong passcode is refused and the right one opens 5 logged conversations.

**Build 7 — Poonie talks straight (today)**

- **What I did:** Removed the mute/speaker button — his voice now simply plays on its own: the greeting, the settling "cozy" line, and every answer once its text finishes appearing; if a browser ever blocks the audio, the chat text quietly carries the conversation. The greeting is now exactly "Hey! This is Poonie (Aishwar's friend), may I help you?" — said aloud and shown in the chat (the email link stays only in the contact section), and the spoken-greeting audio file was regenerated to match. The big change is conversation mode: the moment the chat opens, the 15-second walk schedule is suspended — Poonie stands awake and faces you for the whole conversation, no yawn, no dozing mid-chat. After 5 seconds of silence he asks "Would you like to know anything else?" with two buttons: "Ask more" keeps him up and re-arms the 5-second check; "No — sleep" makes him yawn, lie down, bring back the Zzz letters and resume the walks from wherever he rested. Typing a question instead dismisses the prompt and re-arms it after the answer; closing the chat does the same. And the site now tells the truth about the present: the TCI entry reads July to October 2026 (ended, part-time), the hero's "Currently" line says "Tinkering", and Poonie's brain answers TCI questions in the past tense. Along the way I also caught the memory loop injecting stale answers as fact — the brain now treats its own past chat as maybe-outdated, with the portfolio content always winning.
- **What I expected:** All of the above at both screen sizes.
- **What happened:** Verified end to end — the greeting appears and is spoken, the mute button is gone, the bear never moved during a full conversation, the check-in fired 5 seconds after the greeting and again after an answer, "Ask more" and a typed question both dismissed it correctly, "No — sleep" closed the chat with the Zzz back, and the first walk only resumed after he fell asleep (his position changed to a new resting spot). The corrected TCI answer, in Poonie's own words: "No, that one's wrapped up. His part-time Supply Chain Intern stint at TCI ran July to October 2026, and these days he's tinkering and open to work."

**Fix 1 — the page showed an error card on load**

- **What I did:** When reformatting the analytics snippet that ships with the template, one closing bracket got lost, so that small script crashed and the preview showed an error card over the page.
- **Expected:** Fix the bracket, page loads clean. **Happened:** First try it still showed the old error — the preview was serving a saved copy from before the fix, so I restarted the page server once and the error was gone.

**Fix 2 — the copy-email button said "couldn't copy" inside the preview**

- **What I did:** Browsers block the modern clipboard shortcut when a site is shown inside a frame (like the preview panel), so I added a fallback that uses the older, always-allowed copy method.
- **Expected:** Button copies and confirms in both a normal tab and the preview frame. **Happened:** Confirmed — the black "Email copied" note appears now.

**How to swap in real content later:** open `frontend/src/content.js`. Name, email, hero line, the three proof stories, the contact note — all in that one file, clearly labelled. Nothing else needs touching.

## 5. Roadmap (each is one future feature)

1. Real proof stories — the four proof titles are real now; each dig-deeper panel still holds a marked placeholder for the full 3-4 sentence story.
2. Real case-study pages — then retarget the day-timeline arrows from the proof list to each function's own case study.
3. Remaining placeholders — hero meta (city, current role, status) and the contact note line.
4. Polish pass on motion timing and mobile spacing once real copy changes the text lengths.

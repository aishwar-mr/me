/* MARS ask endpoint.
 *
 * Answers free-form questions about Aishwar, grounded strictly in facts.json.
 * It does NOT screen roles: the fit verdict is computed in the browser by
 * screener.js against rubric.json, and no model is involved in it. This
 * Worker only handles the "ask me something else" path.
 *
 * Deploy:  see worker/README.md
 */

const SITE = 'https://aishwar-mr.github.io/me';
const MODEL = 'claude-haiku-4-5';

/* The only hrefs the model is allowed to send anyone to. A link outside this
   list is dropped rather than rendered: an invented URL is a broken promise. */
const PAGES = {
  en: {
    'index.html': 'Home',
    'my-story.html': 'My Story',
    'impact-delivered.html': 'Impact Delivered',
    'worldquant.html': 'WorldQuant alpha research',
    'track-monitoring.html': 'Track Monitoring System',
    'screener.html': 'How the screener works',
    'contact.html': 'Contact'
  },
  es: {
    'index.es.html': 'Inicio',
    'my-story.es.html': 'Mi Historia',
    'impact-delivered.es.html': 'Impacto Logrado',
    'worldquant.es.html': 'Investigación de alfas en WorldQuant',
    'track-monitoring.es.html': 'Sistema de Monitoreo de Vía',
    'screener.es.html': 'Cómo funciona el evaluador',
    'contact.es.html': 'Contacto'
  }
};

/* At ~3.5K input tokens per question (facts.json rides along in the system
   prompt) Haiku costs about $0.004 a question. 800 caps the worst case near
   $3.30 a month, which is well above realistic portfolio traffic. */
const LIMITS = {
  perIpPerDay: 15,
  perMonthGlobal: 800,
  maxQuestionChars: 600,
  maxTokens: 400
};

/* An Origin is scheme + host + port, never a path. Sending back
   "https://aishwar-mr.github.io/me" would fail every CORS preflight, so the
   allowlist holds real origins. Localhost is included for local testing. */
const ALLOWED_ORIGINS = [
  'https://aishwar-mr.github.io',
  'http://localhost:8080',
  'http://127.0.0.1:8080',
  'http://localhost:5500',
  'http://127.0.0.1:5500'
];

function cors(request) {
  const origin = request.headers.get('Origin') || '';
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Origin'
  };
}

function json(body, status = 200, request = null) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...(request ? cors(request) : {})
    }
  });
}

/* facts.json is the single source of truth about Aishwar and lives in the
   site repo, so it is fetched rather than duplicated here. Editing the file
   and pushing is all it takes to change what MARS knows. */
async function loadFacts() {
  const res = await fetch(`${SITE}/facts.json`, { cf: { cacheTtl: 900, cacheEverything: true } });
  if (!res.ok) throw new Error('facts unavailable');
  return res.json();
}

function systemPrompt(facts, lang) {
  const pages = Object.entries(PAGES[lang])
    .map(([href, label]) => `  ${href} — ${label}`).join('\n');

  return `You are MARS, Aishwar Mishra's AI clone, embedded on his portfolio site.
You answer questions from visitors, most of them founders or hiring managers.

GROUNDING, and this is absolute:
- FACTS below is the only thing you know about Aishwar. Never state anything
  about him that is not in it.
- Never inflate. Read the "not_claims" list and obey every line of it.
- The "limits" list matters as much as the achievements. Volunteer it when
  it is relevant rather than waiting to be asked.
- If you do not know, say so plainly and point to the contact page. A useful
  "I don't know, ask him directly" beats a confident guess every time.
- Never invent numbers, dates, employers, or technologies.

STYLE:
- ${lang === 'es' ? 'Answer in Spanish.' : 'Answer in English.'}
- Under 80 words. Plain sentences. No bullet lists, no headings.
- Speak about Aishwar in the third person. You are his clone, not him.
- No em dashes.

SCOPE:
- You do not decide whether he fits a role. The screener does that, in the
  visitor's own browser, against a published rubric. If someone asks whether
  he is a fit, tell them to run the screener and offer screener.html.

LINKING: when a page answers the question better than you can, set "link".
Only these hrefs exist:
${pages}

Reply with JSON only, no prose around it:
{"answer": "...", "link": {"href": "...", "label": "..."} }
Omit "link" entirely when no page is relevant.

FACTS:
${JSON.stringify(facts)}`;
}

async function rateLimit(env, ip) {
  // Fail closed. Without KV there is no abuse protection, and an unprotected
  // endpoint calling a paid API is a bill waiting to happen.
  if (!env.MARS_KV) return { ok: false, reason: 'misconfigured' };

  const day = new Date().toISOString().slice(0, 10);
  const month = day.slice(0, 7);
  const ipKey = `ip:${ip}:${day}`;
  const monthKey = `month:${month}`;

  const [ipRaw, monthRaw] = await Promise.all([
    env.MARS_KV.get(ipKey), env.MARS_KV.get(monthKey)
  ]);
  const ipCount = Number(ipRaw || 0);
  const monthCount = Number(monthRaw || 0);

  if (monthCount >= LIMITS.perMonthGlobal) return { ok: false, reason: 'capped' };
  if (ipCount >= LIMITS.perIpPerDay) return { ok: false, reason: 'rate_limited' };

  await Promise.all([
    env.MARS_KV.put(ipKey, String(ipCount + 1), { expirationTtl: 172800 }),
    env.MARS_KV.put(monthKey, String(monthCount + 1), { expirationTtl: 5356800 })
  ]);
  return { ok: true };
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') return new Response(null, { headers: cors(request) });
    if (request.method !== 'POST') return json({ error: 'method' }, 405, request);

    let body;
    try { body = await request.json(); } catch { return json({ error: 'bad_json' }, 400, request); }

    const lang = body.lang === 'es' ? 'es' : 'en';
    const q = String(body.q || '').trim().slice(0, LIMITS.maxQuestionChars);
    if (!q) return json({ error: 'empty' }, 400, request);

    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    const gate = await rateLimit(env, ip);
    if (!gate.ok) return json({ error: gate.reason }, gate.reason === 'misconfigured' ? 500 : 429, request);

    let facts;
    try { facts = await loadFacts(); } catch { return json({ error: 'facts' }, 503, request); }

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: LIMITS.maxTokens,
        temperature: 0,
        system: systemPrompt(facts, lang),
        messages: [
          ...(Array.isArray(body.history) ? body.history.slice(-6) : []),
          { role: 'user', content: q }
        ]
      })
    });

    if (!res.ok) return json({ error: 'upstream', status: res.status }, 502, request);
    const data = await res.json();
    const raw = (data.content || []).map(b => b.text || '').join('').trim();

    // The model was told to return JSON. If it did not, the text is still a
    // usable answer, so degrade to that rather than showing an error.
    let out;
    try {
      out = JSON.parse(raw.replace(/^```(?:json)?\s*|\s*```$/g, ''));
    } catch {
      out = { answer: raw };
    }

    // Drop any link the model invented. Only real pages survive.
    if (out.link && !PAGES[lang][out.link.href]) delete out.link;
    if (out.link) out.link.label = PAGES[lang][out.link.href];

    return json({
      answer: String(out.answer || '').slice(0, 1200),
      link: out.link || null,
      usage: data.usage || null
    }, 200, request);
  }
};

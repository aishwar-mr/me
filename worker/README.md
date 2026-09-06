# MARS ask endpoint

Answers free-form questions about Aishwar. It does **not** screen roles: the fit
verdict is computed in the browser by `screener.js` against `rubric.json`, with
no model involved. This Worker only powers the "ask me something else" path.

## Deploy

```bash
npm install -g wrangler
wrangler login

cd worker

# 1. KV namespace for rate limiting. Paste the printed id into wrangler.toml.
wrangler kv namespace create MARS_KV

# 2. The API key. Never commit it.
wrangler secret put ANTHROPIC_API_KEY

# 3. Ship it
wrangler deploy
```

Then put the deployed URL into `mars.js`:

```js
var ENDPOINT = 'https://mars-ask.<your-subdomain>.workers.dev';
```

With `ENDPOINT` empty the site still works: the screener runs as normal and the
ask option simply does not appear.

## Cost and abuse

- `claude-haiku-4-5`, `max_tokens: 400`, temperature 0.
- 15 questions per IP per day, 800 per month globally, both in KV.
- At ~3.5K input tokens per question that is roughly $3.30 a month worst case.
- **Rate limiting fails closed.** With no KV binding the Worker returns 500 and
  never reaches the API, because an unprotected public endpoint calling a paid
  API is a bill waiting to happen.
- Set an account-level spend limit in the Anthropic console as a second line of
  defence behind the Worker cap.

## Grounding

`facts.json` is fetched from the live site and cached for 15 minutes, so it is
never duplicated here. To change what MARS knows, edit `facts.json` and push.

The system prompt forbids any claim not in that file, requires obedience to its
`not_claims` list, and instructs the model to volunteer the `limits`. Links are
validated against a hardcoded page list, so an invented URL is dropped rather
than shown.

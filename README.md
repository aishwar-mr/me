# aishwar-mishra

Portfolio site. Next.js (App Router) + TypeScript + Tailwind CSS, built as
a static export and deployed to GitHub Pages under `/me/`.

**Status:** Separate-page architecture with a cinematic, scroll-driven
hero animation. `/`, `/info`, `/work`, `/contact`, and two case-study
routes are all genuinely distinct pages (not anchors) with full SEO
metadata, zero automated accessibility violations, and Lighthouse
scores of 98–100 across performance/accessibility/best practices/SEO.
See `docs/PRD.md` for the full, current specification — it supersedes
the original `writing-block.md` draft. Real photography, résumé, and
case-study content are still pending — see "What's still a
placeholder" below.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000/me/](http://localhost:3000/me/) — the
`/me` prefix matches the production basePath configured in
`next.config.ts`.

## Build

```bash
npm run build
```

Outputs a static export to `out/` — `index.html`/`[slug]/index.html`
per route, plus `sitemap.xml` and `robots.txt`. `public/.nojekyll` is
required so GitHub Pages doesn't drop the underscore-prefixed
`_next/` asset folder during Jekyll processing.

## Deploy

`.github/workflows/deploy.yml` builds and publishes `out/` to GitHub
Pages automatically on every push to `main`, via the official
`actions/deploy-pages` flow (no `gh-pages` branch, no manual step).

One-time setup: repo **Settings → Pages → Source → GitHub Actions**
(not "Deploy from a branch" — that's the old static-HTML-era setting
and will conflict with this workflow).

`lib/content.ts` assumes the site is served at
`https://aishwar-mr.github.io/me` (derived from the GitHub handle in
`site.socials.github`) — update `siteUrl` there if a custom domain is
added later, since it feeds `metadataBase`, the sitemap, and
`robots.txt`.

## Content

Site copy, nav links, capabilities, and project data (including
case-study section text) live in `lib/content.ts`, kept separate from
the layout components in `components/`.

## SEO & accessibility

- Per-page metadata (title, description, Open Graph, Twitter card) via
  each route's `metadata`/`generateMetadata` export.
- `app/sitemap.ts` and `app/robots.ts` generate `sitemap.xml` and
  `robots.txt` at build time.
- Person JSON-LD on the homepage.
- Skip-to-content link, semantic landmarks, and focus-visible states
  throughout.
- Zero violations against axe-core's WCAG 2.0/2.1 A+AA rule set,
  verified across all routes, mobile, and the mobile-menu-open state.

## What's still a placeholder

- Hero collage images and all project covers are flat-colour tiles
  marked "Placeholder" / "— case study pending" — no real photography
  is wired in yet.
- Digital Product Passport is shown as work in progress (Result pending).
  Track Monitoring and the two Product Teardowns are published
  (Problem / Approach / Solution / Result); Feedback sections are
  waiting on real feedback.
- The Product Teardowns cover is a third-party diagram — swap for your own.
- `/info` carries the résumé content, but there is no downloadable résumé link yet; "My story" text is pending.
- The contact form renders but isn't connected to a submission
  endpoint; submitting shows an explicit "not connected yet" message
  rather than faking success.
- `public/favicon.ico` is still the default Next.js icon.

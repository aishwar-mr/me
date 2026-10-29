# One-Page Brief

A standalone personal site for Aishwar Mishra. The home page is a tight,
one-screen-at-a-time brief; two inner sections — **Experience** and **Work**
— go deeper, each with its own detail pages. This project is self-contained:
nothing on it links to or depends on any other project or localhost.

Originally recovered from an Emergent-built preview (see `reference/` and the
"Original extraction" section below), then extended with routing and the
owner's full background.

## Run it

```bash
npm install
npm run dev      # http://localhost:5174 (configured in package.json/vite.config.js)
npm run build    # static output in dist/
```

## Site map

| Route | What it is |
|---|---|
| `/` | The one-page brief: hero, proof strip, "How I work" timeline, a "Go deeper" bridge |
| `/story` | Short bio + portrait |
| `/experience` | Every role — Corporate, Community-led/Collegiate, Education — plus Honors, Certifications, Additional info |
| `/experience/:slug` | One role in full (logo, scope, dates, bullets), with prev/next |
| `/work` | Project index: Track Monitoring, Product Teardowns, Frappe Builder Blog, Digital Product Passport |
| `/work/:slug` | One project's case study (Problem/Approach/Solution/Result-style sections) |
| `/work/:slug/:item` | A nested write-up under a project (e.g. a teardown, the full blog post) |

## What's here

| Path | What it is |
|---|---|
| `src/App.js` | Route table + shared chrome (nav, noise overlay, contact footer) |
| `src/pages/*.jsx` | One file per route above |
| `src/components/*.jsx` | Shared UI: `Reveal`, `PageHero`, `PageNav`, `CaseStudySection`, `ProjectCard`, `OrgLogo`, `InProgressTile`, etc. |
| `src/data/background.js` | Experience, education, honors, certifications, additional info, "My story" |
| `src/data/work.js` | Projects and their case-study sections |
| `src/content.js` | Home-page-specific copy: hero, proof items, "How I work" timeline |
| `src/assets/` | Portrait, organisation logos, project images |

Background and work content was ported from the owner's main portfolio
project so this site carries the same information independently — the data
files above are plain JS copies, not a live dependency on that project.

## Notes

- **Routing:** client-side via `react-router-dom`, `BrowserRouter`. The dev
  and preview servers both fall back to `index.html` for unknown paths, so
  deep links work locally; a production static host needs the same SPA
  fallback configured.
- **Tailwind:** real Tailwind (not just the original's compiled-CSS snapshot)
  is configured in `tailwind.config.js`, with `paper` / `ink` / `vermilion`
  (plus a darker `vermilion-text` for small red text, which needed it to
  clear 4.5:1 contrast) as the custom colours.
- **Logos without a source file** (none currently) would fall back to an
  initials tile — see `OrgLogo.jsx`.

## Original extraction

The home page's code was originally recovered from a live Emergent preview
(`https://one-page-brief-3--4qcqvs6z.preview.emergentagent.com/`, a Create
React App). That preview served a development bundle with a full source map,
so the original `src/App.js`, `src/motion.js`, `src/content.js` and the
components under `src/components/` were recovered as written, not decompiled.
`reference/rendered-snapshot.html` and `reference/original-full-page.png` are
kept from that extraction for reference. The original used Create React App
+ craco; this project uses Vite with the same `@` → `src` alias and JSX-in-
`.js` support, so those recovered files needed no changes.

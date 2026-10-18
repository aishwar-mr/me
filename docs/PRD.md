# PRODUCT REQUIREMENTS DOCUMENT
## Aishwar Mishra — Personal Portfolio Website

**Version:** 2.0 — supersedes the original v1.0 draft (`writing-block.md`)
**Status:** Describes the implementation as it actually exists in this repository
**Stack:** Next.js (App Router) + TypeScript + Tailwind CSS v4 + Motion, static-exported for GitHub Pages under `/me`

---

## 0. What changed from v1.0, and why

v1.0 specified anchor-based navigation for Info and Contact ("Use anchor navigation for Info and Contact on the homepage, with dedicated project pages for detailed content"). That is what was originally built: `/`, `/work`, `/work/[slug]`, with INFO and CONTACT as same-page anchors.

A later correction reversed that decision: **INFO, WORK, and CONTACT must each be genuinely separate routes**, matching the information architecture of the live Framer reference (`aishwarme.framer.ai`), which has distinct `/`, `/info`, `/work-page`, `/contact` pages. This version documents that corrected architecture, plus a scroll-driven hero animation that v1.0 did not specify in implementable detail.

Two things that did **not** change: the monochrome design system (§4 below) and the placeholder-content discipline (no fabricated metrics, clients, or images) — both carry over unchanged from v1.0.

---

## 1. PRODUCT OBJECTIVE

Build a premium personal portfolio establishing a distinctive professional identity as a product & strategy generalist — pricing models, programs, GTM, AI evaluation, computer vision — for international recruiters and hiring managers.

The site must:
1. Capture attention in the first 5–10 seconds through a cinematic opening.
2. Demonstrate capability through case studies (pending real content — see §12).
3. Make it trivial to review background and get in touch.

Must not resemble a résumé template, SaaS landing page, or generic card grid.

---

## 2. SITEMAP AND ROUTING (as implemented)

| Route | File | Status |
|---|---|---|
| `/` | `app/page.tsx` | Live |
| `/info` | `app/info/page.tsx` | Live |
| `/work` | `app/work/page.tsx` | Live |
| `/work/digital-product-passport` | `app/work/[slug]/page.tsx` | Live, placeholder content |
| `/work/analytics` | `app/work/[slug]/page.tsx` | Live, placeholder content |
| `/work/[project-slug]` | `app/work/[slug]/page.tsx` | Reusable; add an entry to `lib/content.ts`'s `projects` array to publish a new one |
| `/contact` | `app/contact/page.tsx` | Live |
| 404 | `app/not-found.tsx` | Custom-styled, links to `/` and `/work` |
| `sitemap.xml` / `robots.txt` | `app/sitemap.ts` / `app/robots.ts` | Generated at build time |

Every route is a real Next.js page producing its own static HTML file (`output: "export"` in `next.config.ts`). Direct navigation, hard refresh, and browser back/forward all work against the static build — verified (§9) by requesting each route cold against the exported `out/` directory and reloading it, not just via client-side router navigation.

Global navigation (`lib/content.ts` → `navLinks`, consumed by `SiteHeader` and `FullScreenNav`) uses `next/link` throughout — not `<a>` — so the `/me` basePath resolves correctly in production. This was a real bug caught during build: plain anchor tags would have 404'd on GitHub Pages.

### Page responsibilities

- **Homepage (`/`)**: cinematic hero with scroll-driven artifact animation, full-screen nav block, one concise intro statement, 2 real + 1 "coming soon" featured-work preview, footer. No full capabilities grid, no contact form — those live on their own pages.
- **Info (`/info`)**: the same intro statement, the full capabilities grid, and an "Education & experience" section (placeholder — see §12).
- **Work (`/work`)**: heading, intro line, full project grid (same cards as the homepage preview, no filtering — too few projects to justify it yet).
- **Project pages**: one case study per route, via the shared template in §8.
- **Contact (`/contact`)**: headline, email/phone/socials, contact form (visually complete, not wired to a submission endpoint — see §12).

---

## 3. GLOBAL DESIGN SYSTEM

Unchanged from v1.0. Colour tokens, type scale, spacing, and component list are defined in `app/globals.css` and `components/*`. Monochrome interface; project imagery may carry colour (currently flat-colour placeholder tiles, see `components/PlaceholderTile.tsx`).

---

## 4. HOMEPAGE HERO — CINEMATIC COMPOSITION

`components/Hero.tsx` + `components/HeroCollage.tsx` + `components/FloatingImage.tsx`.

- White canvas, oversized black "AISHWAR" wordmark (`clamp(3.5rem, 11vw, 9rem)`), tagline "PRODUCT & STRATEGY EXPERT — TECHNICAL GENERALIST" bottom-left, `© {year}` bottom-right.
- 6 asymmetrically-placed rectangular tiles (4 on mobile — 2 hidden via `hideOnMobile`), each a distinct flat colour from a 6-value palette, individually sized/rotated/positioned.
- **Entrance sequence**: wordmark reveals via a clip/mask slide (`translateY(110%) → 0%`, 900ms, custom ease-out-expo cubic-bezier) rather than a plain fade. Tiles fade/scale/translate in with staggered per-tile delays (0–600ms) and a `cubic-bezier(0.16,1,0.3,1)` curve. Tagline fades in last (300ms delay). Total sequence settles within ~1.3s.
- **Idle/pointer motion**: fine-pointer devices get subtle parallax (each tile offsets toward the cursor, strength varies per tile 0.5–1.0×), rAF-throttled, disabled on touch and under reduced motion.

---

## 5. CINEMATIC WORK-ARTIFACT TRANSFORMATION ANIMATION

This is the core animation requirement and the thing that was missing before this revision.

### 5.1 Mechanism

`Hero.tsx`'s `<section>` is `h-[220vh]` with `position: relative`; its visual content lives in a child `div` that is `position: sticky; top: 0; h-screen`. `motion/react`'s `useScroll({ target: containerRef, offset: ["start start", "end end"] })` produces a `scrollYProgress` MotionValue that runs 0 → 1 exactly across the 120vh of scroll distance the extra section height provides (220vh section − 100vh pinned viewport). This value is passed down to `HeroCollage` → each `FloatingImage`.

Each tile computes four independent `useTransform(scrollYProgress, [0,1], [start, end])` mappings — scale, opacity, x, y — plus a small rotation delta, using **per-tile** `[start, end]` pairs defined in `HeroCollage.tsx`'s `TILES` array. Because these are reactive MotionValues (not a one-shot animation or IntersectionObserver trigger), the transformation **is inherently reversible**: scrolling back up re-evaluates the same mapping at the new (lower) progress value with no special-case logic required. Verified in testing (§9) by scrolling forward then backward and confirming tiles regrow/re-saturate smoothly.

Hero typography (`<h1>`, tagline) is **not** part of this transform chain — it stays fully static and readable through the entire pinned region, per spec.

### 5.2 Initial / transition / final states (as implemented)

| Tile | Scale 0→1 | Opacity 0→1 | Travel (x, y px) | Rotate Δ |
|---|---|---|---|---|
| a | 1 → 0.45 | 1 → 0.25 | (0,0) → (−120,−90) | −10° |
| b | 1 → 0.50 | 1 → 0.30 | (0,0) → (140,−70) | +8° |
| c | 1 → 0.35 | 1 → 0.20 | (0,0) → (160,40) | −6° |
| d | 1 → 0.50 | 1 → 0.30 | (0,0) → (−100,110) | +9° |
| e | 1 → 0.40 | 1 → 0.25 | (0,0) → (110,130) | −8° |
| f | 1 → 0.55 | 1 → 0.35 | (0,0) → (−60,−120) | +7° |

These sit inside the v1.0 draft's calibration targets (late-transition scale 0.35–0.5, opacity 0.2–0.4) and deliberately vary per tile — different end-scale, different travel direction/distance, different rotation sign — so the composition reads as composed rather than mechanically uniform. On mobile, translate distances are scaled ×0.4 (`travelScale` in `FloatingImage.tsx`) so cards don't fly across a narrow viewport; scale/opacity ranges are unchanged since those are resolution-independent.

A small scroll-cue dot at the bottom of the hero fades out over the first 8% of scroll progress, since it's no longer relevant once the visitor has started scrolling.

### 5.3 Reduced motion

`useReducedMotion()` (a `useSyncExternalStore`-based hook watching `prefers-reduced-motion`) gates the **style object** passed to each tile's `motion.div`, not the `useTransform` range arguments. This distinction matters and was a real bug caught in testing: Motion's `useTransform` output range is effectively fixed at hook-creation time, so branching the range itself on a flag that can resolve after first paint (as `useSyncExternalStore`'s client value does) silently fails — the tile kept animating with scroll regardless of the reduced-motion flag. The fix was to always compute the full animated MotionValues, then choose at render time whether `motion.div` receives them (`{ scale, opacity, x, y, rotate }`) or static literals (`{ scale: 1, opacity: 1, x: 0, y: 0, rotate: 0 }`). Verified by reading computed `opacity` directly from the DOM at three scroll depths under emulated reduced motion — confirmed constant at `1` throughout.

---

## 6. FULL-SCREEN NAV, INTRO, SELECTED WORK (homepage)

Unchanged in spirit from v1.0: a near-black full-screen section with large INFO/WORK/CONTACT links (now real `next/link`s to `/info`, `/work`, `/contact`) and a pointer-follow circle (`position: absolute; top-0 left-0` + `translate()`, fixed in this revision after an earlier bug where the circle's own flex-centered static position was compounding with the translate offset); one concise intro statement; a 3-card Selected Work preview (2 real placeholder projects + 1 honest "more work coming soon" tile, no fabricated third project) linking to `/work`.

---

## 7. INFO, WORK, CONTACT PAGES

- **`/info`**: `IntroStatement` + `CapabilitiesSection` (real, previously-approved services list) + an explicitly-labelled "Education & experience" pending section.
- **`/work`**: heading, one-line intro, full project grid (`ProjectCard` × projects + the "coming soon" tile).
- **`/contact`**: `ContactSection` — headline, email/phone/socials, a visually complete form that explicitly tells the visitor it isn't wired to a submission endpoint yet rather than faking a success state.

---

## 8. CASE STUDY TEMPLATE (`/work/[slug]`)

`ProjectHero` (title, category, summary, year/role/status, cover placeholder) → six `CaseStudySection`s (Context, Problem & objective, Approach, Execution, Results & findings, Reflection) → `ProjectNavigation` (back to all work, prev/next, hidden at list boundaries).

Both live case studies (DPP, Analytics) have every section populated with an explicit, specific "Pending: …" statement naming exactly what's needed — not generic placeholder text — per the no-fabrication rule in §12.

---

## 9. MOTION TECHNOLOGY CHOICE

**Motion** (`motion/react`, the React-first package formerly known as Framer Motion) was chosen over GSAP/ScrollTrigger because:

- The project is already idiomatic React + Tailwind; Motion's hook-based API (`useScroll`, `useTransform`) fits that model directly, whereas GSAP's timeline/selector-based API would introduce a second, non-React paradigm.
- The required effect — per-element scale/opacity/translate driven linearly by scroll progress — is exactly what `useTransform` is for; no timeline sequencing, pinning helpers beyond CSS `position: sticky`, or complex easing curves across multiple elements were needed.
- Bundle cost is small and tree-shakeable; confirmed via Lighthouse (§11) that adding it did not regress performance.

No second animation library was added. CSS transitions (existing `Reveal` component, entrance states) continue to handle one-shot, non-scroll-linked motion; Motion owns only the scroll-linked hero transformation and the scroll-cue fade.

---

## 10. RESPONSIVE & REDUCED-MOTION BEHAVIOUR

- **Desktop**: full 6-tile collage, full travel distances, pointer parallax.
- **Mobile (<768px)**: 4 tiles (2 hidden), travel distances ×0.4, pointer parallax disabled (no fine pointer), no horizontal overflow (verified).
- **Reduced motion**: hero tiles render in their settled, fully-visible state regardless of scroll position (§5.3); all CSS transitions collapse to ~0 via a global `@media (prefers-reduced-motion: reduce)` rule in `globals.css`; the `Reveal` component's IntersectionObserver path is skipped entirely in favour of an immediately-true state.

---

## 11. PERFORMANCE & ACCESSIBILITY (verified, not aspirational)

Lighthouse against the production static export (not dev mode):

| Page | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| `/` | 98 | 100 | 100 | 100 |
| `/info` | 99 | 100 | 100 | 100 |
| `/contact` | 98 | 100 | 100 | 100 |
| `/work` | 98 | 100 | 100 | 100 |
| `/work/digital-product-passport` | 100 | 100 | 100 | 100 |

CLS = 0 on every page measured (the tall pinned hero does not cause layout shift). axe-core (WCAG 2.0/2.1 A+AA) returns **zero violations** across all six routes, mobile viewport, the open-mobile-menu state, and the reduced-motion state.

---

## 12. CONTENT STATUS AND REQUIRED OWNER INPUTS

No fabricated metrics, clients, findings, or images exist anywhere in the codebase. Current placeholders, and exactly what's needed to replace them:

- **Hero collage / all project covers**: flat-colour tiles. Need real photography/screenshots.
- **DPP case study**: each section (`lib/content.ts` → `projects[0].sections`) states precisely what's pending — industry context, problem statement, methodology, the actual work product, verified results, personal contribution.
- **Analytics case study**: same structure — which project this actually is, dataset, methodology, findings, business implications.
- **A third project**: intentionally not invented. Per the original brief, "the owner may later add a textile engineering project, sustainability study, retail analysis, automation project, or another piece of relevant work" — add it to `lib/content.ts`'s `projects` array and it will automatically get a route, a card, and prev/next navigation.
- **Résumé**: no file in the repo yet; `/info` has a labelled placeholder for the eventual link.
- **Contact form endpoint**: form is fully built but submission shows an explicit "not connected yet" message rather than a fake success state. Needs a Formspree (or equivalent) account.
- **Favicon**: still the default Next.js icon.

---

## 13. ACCEPTANCE CRITERIA

1. ✅ INFO, WORK, CONTACT each open a distinct URL — not anchors.
2. ✅ Project cards open individual project pages.
3. ✅ Direct access + hard refresh works on every route (verified against the static export, not just dev-mode client routing).
4. ✅ Browser back/forward works (standard Next.js `<Link>` behaviour, no custom history interception).
5. ✅ No duplicated full-page content on the homepage (Capabilities and Contact now live only on their own pages).
6. ✅ Hero has an intentional, staggered entrance sequence.
7. ✅ Work artifacts visibly shrink, travel, and fade as the visitor scrolls through the hero.
8. ✅ The transformation reverses naturally on scroll-up (verified, not assumed, by screenshotting both directions).
9. ✅ Different tiles have non-identical motion profiles (scale/opacity/direction/rotation all vary per tile).
10. ✅ Reduced-motion preference is honestly respected (verified by reading computed styles, not just code inspection — this caught a real bug, see §5.3).
11. ✅ Mobile: fewer tiles, reduced travel, no horizontal overflow.
12. ✅ Zero console/page errors across all routes, both motion states, both viewports (verified via Playwright).
13. ✅ Lighthouse 90+ across performance/accessibility/best-practices/SEO on every page (actual: 98–100).
14. ✅ Zero axe-core WCAG A/AA violations across all routes and states.
15. ⬜ Real imagery, résumé, case-study content, contact-form endpoint — pending owner input, see §12.
16. ⬜ Actual GitHub Pages deployment of this revision — built and verified locally; not yet pushed/deployed as of this document's writing.

---

## 14. TESTING PERFORMED

All of the following were run against the actual built/running site, not inferred from source:

- `tsc --noEmit`, `eslint`, `next build` (static export) — all clean.
- Direct HTTP request + hard reload of every route against the exported `out/` directory, served with the correct `/me` path structure — all 200, correct `<title>`, no console errors.
- Scroll-animation verification: screenshotted the hero at 9 evenly-spaced scroll positions forward, then 5 positions scrolling back up, confirmed shrink/fade/travel in one direction and smooth regrowth in the other.
- Reduced-motion verification: read computed `opacity` from the DOM (not just screenshots) at three scroll depths, confirmed constant.
- Mobile (390×844): scroll-animation screenshot sequence, horizontal-overflow check (`scrollWidth === clientWidth`), mobile-menu open/close with Escape-key handling.
- axe-core WCAG A/AA audit on all 6 routes, reduced-motion state, mobile, and the open-mobile-menu state — 0 violations throughout.
- Lighthouse (performance/accessibility/best-practices/SEO) against the production build on 5 representative pages.

Not yet tested: real cross-browser (Safari/Firefox) verification — only Chromium was available in this environment; real-device mobile testing (only viewport emulation was used).

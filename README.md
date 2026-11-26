# Aishwar Mishra | Portfolio

Personal portfolio site: a home page, a projects index with case studies, and an About
page.

**Live site:** https://aishwar-mr.github.io/me/

## Pages

| Route | What it is |
|---|---|
| `/` | Home: hero, intro, how I work, selected work, a photo pile and contact |
| `/projects` | Project index, with floating cards that pause on click |
| `/projects/:id` | One project's case study: key facts, screenshots or photos, process steps and results |
| `/about` | Portrait and intro, experience, education, certifications, honors and toolkit |
| `*` | Not-found page |

## Projects featured

| Route | Project |
|---|---|
| `/projects/1` | Track Monitor: contactless track inspection for Indian Railways (Smart India Hackathon 2025) |
| `/projects/2` | Startup Intelligence: scores how crowded a startup idea's market is |
| `/projects/3` | Frappe Builder: a self-initiated technical blog, product marketing track |
| `/projects/4` | Nearshore Siting Agent: screens candidate industrial sites on water, power, cost and logistics |

## Features

- **Scroll line:** a line that draws itself down the page with a basketball at its tip, and
  retraces when you scroll back.
- **Hero portrait:** a glitch effect, with eyes that follow the cursor.
- **Drawn portrait:** a vector line drawing that sketches itself in on the About page.
- **Photo pile:** drag the photos around, or click one to open it in a lightbox.
- **Formula grid:** spreadsheet functions light up under the cursor on the home footer, the
  About toolkit and footer, and the projects index.
- **Light and dark themes:** the site follows the system setting.
- **Responsive layout:** the desktop design scales with the viewport and restacks on phones.
- **Reduced motion:** animations are turned off or toned down when the system asks for it.
- **Page transitions:** project photos carry across from card to case study in browsers that
  support the View Transitions API.

The cursor effects need a mouse or trackpad.

## Built with

React 19 · Vite 6 · React Router 7 · Tailwind CSS 3

Animation is hand-written with CSS, SVG, canvas and `requestAnimationFrame`. Fonts (Inter,
Instrument Serif and JetBrains Mono) load from Google Fonts.

## Run it locally

Requires Node.js 20 or later.

```bash
npm install
npm run dev       # Vite prints the local URL (under /me/)
npm run build     # static output in dist/
npm run preview   # serve the production build locally
```

## Project layout

| Path | What it is |
|---|---|
| `index.html` | Page title, social preview tags, theme colour and font links |
| `src/index.js` | Entry point and router setup |
| `src/App.js` | Route table and scroll handling |
| `src/index.css` | Theme colours, responsive scaling and animation styles |
| `src/pages/` | One file per route: `Home`, `Projects`, `ProjectDetail`, `About`, `NotFound` |
| `src/components/` | Shared UI: hero, selected work, photo pile, footer, scroll line, formula grid, reveal animations |
| `src/data/projects.js` | Projects and their case-study sections |
| `src/data/formulas.js` | Function names used by the formula grid |
| `src/data/portraitInk.js` | Vector paths for the drawn portrait |
| `src/data/eyeGeometry.js` | Eye positions for the hero portrait |
| `src/hooks/` | `useReveal`, `useViewTransitionNavigate` |
| `src/assets/` | Portraits, eye layers, logos, project and life images |
| `public/` | Favicon and social preview image |

## Editing content

| To change | Edit |
|---|---|
| Projects | `src/data/projects.js` |
| About page: bio, experience, education, toolkit | `src/pages/About.jsx` |
| Home page text | `src/components/` (`Hero`, `About`, `Approach`, `SiteFooter`) |
| Photo pile images and captions | `src/components/WorkBelt.jsx` |
| Email and social links | `src/components/FooterBar.jsx` |

The layout assumes four projects. To add a fifth, also update:

- `CARD_MOTION` and `VT_NAME` in `src/pages/Projects.jsx`
- `TITLES`, `VT_NAME`, `VT_INDEX` and the `/ 04` counter in `src/pages/ProjectDetail.jsx`

## Notes

- **Base path:** the site is served from `/me/` on GitHub Pages. `vite.config.js` sets
  `base` and `src/index.js` sets the router `basename` to match. For a root-path deploy,
  set `VITE_BASE=/` when building, update the `basename`, and change the social preview
  image URLs in `index.html`.
- **Deployment:** `.github/workflows/deploy.yml` builds on every push to `main` and
  publishes `dist/` to GitHub Pages. It also copies `index.html` to `404.html`, so direct
  links and refreshes on client-side routes still load (the
  [spa-github-pages](https://github.com/rafgraph/spa-github-pages) approach).
- **Colours:** a custom Tailwind palette (`paper`, `ink`, `line`, greys and `vermilion`)
  defined as CSS variables with separate light and dark values. The accent,
  `vermilion-text` (`#B83323` light, `#EC6450` dark), colours the scroll line, basketball,
  text selection and focus ring. It is darker in light mode so small text keeps readable
  contrast.

## Origin

I started from a one-page prototype made with Emergent (Create React App) and rebuilt it
on Vite, adding routing, Tailwind, the case-study pages and my own content.

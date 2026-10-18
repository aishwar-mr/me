# aishwar-mishra

Portfolio site. Five pages (Home, Info, Work, Project, Contact), generated
from one content file, deployed as static HTML on GitHub Pages.

## Editing content

Everything — copy, images, the project list — lives in `content.json`.
To change anything on the site:

1. Edit `content.json`.
2. Run `python3 build.py`.
3. Commit and push.

Adding a project means adding one object to `content.json`'s `projects`
array and dropping its images in `/assets`; no HTML or CSS needs to
change. The build script reads the file, writes `index.html`, `info.html`,
`work.html`, `contact.html` at the repo root, and one
`work/<slug>/index.html` per project.

### Placeholder images

Any project without a `cover`, or a media entry with `"type": "placeholder"`,
gets a flat-colour SVG tile naming what belongs there instead of a broken
image. Replace the file at that path (or fill in `cover`/`src` in
`content.json` and rerun the build) once you have the real photo — the
build script won't overwrite a path you've pointed at a real image.

### Contact form

The form in `contact.html` posts to Formspree. Create a free form at
[formspree.io](https://formspree.io), then replace `YOUR_FORM_ID` in the
`action` attribute (in `build.py`'s `build_contact()`) with your form's ID
and rerun the build. Until then the form won't submit.

## Stack

Static HTML/CSS/JS, no framework, no build tooling beyond `build.py`
(Python 3, standard library only). Motion runs on
[GSAP](https://gsap.com) + ScrollTrigger and [Lenis](https://lenis.darkroom.engineering)
smooth scroll, both loaded from a CDN. All motion is skipped when the
visitor's OS has reduced motion turned on, and cursor-driven effects
(the home hero's cursor spawn, the footer's image trail) are skipped on
touch devices.

## Local preview

Any static file server works, e.g.:

```bash
python3 -m http.server 8000
```

then open `http://localhost:8000`. Opening `index.html` directly from
disk also works for everything except the Lenis smooth scroll, which
some browsers restrict on `file://`.

## Deploy

Pushes to `main` are what GitHub Pages serves — turn on Pages for this
repo under Settings → Pages → Deploy from a branch → `main` → `/ (root)`,
if it isn't already. The site is served under `/me/`, not the domain
root (there's no custom domain configured), which is why every link and
asset path in the generated HTML is relative rather than absolute.

## What's still a placeholder

- Photography for Ninjacart, Lawxy AI, Newton School and the agent
  teardowns — those projects shipped as text, not screenshots, so their
  covers and media are flat-colour tiles naming what should replace them.
- The Formspree form ID.
- The four Home hero images and the fifth Info sequence image, also
  colour tiles — add real photos to `content.json`'s `heroImages` and
  `info.sequenceImages`.

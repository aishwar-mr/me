#!/usr/bin/env python3
"""Build the site from content.json.

Reads content.json and writes static HTML to the repo root and
/work/<slug>/index.html. Run this after any edit to content.json:

    python3 build.py

No other step is needed; GitHub Pages serves the generated files directly.
All links are written relative to each page (this repo has no custom
domain, so it is served under a /me/ subpath, not the domain root).
"""
import json
import os
import html

ROOT = os.path.dirname(os.path.abspath(__file__))
CONTENT = json.load(open(os.path.join(ROOT, "content.json")))
SITE = CONTENT["site"]

ROOT_BASE = ""        # pages at the repo root
PROJECT_BASE = "../../"  # pages at /work/<slug>/index.html


def esc(s):
    return html.escape(s, quote=True)


def write(path, text):
    full = os.path.join(ROOT, path)
    os.makedirs(os.path.dirname(full), exist_ok=True)
    with open(full, "w", encoding="utf-8") as f:
        f.write(text)
    print("wrote", path)


# ---- placeholder images --------------------------------------------------
# Flat-colour SVG tiles standing in for photography the owner has not
# supplied yet. Each one names what belongs there, so it reads as an
# unfinished slot, not a fake screenshot.
PLACEHOLDER_PALETTE = ["#1F6E43", "#2B2E83", "#C1521E", "#1E4B6B", "#0E4D4A", "#6E1B3D", "#8A8A8A"]


def make_placeholder(path, label, colour, ratio="4:5"):
    w, h = (800, 1000) if ratio == "4:5" else (1600, 900)
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}">
  <rect width="{w}" height="{h}" fill="{colour}"/>
  <text x="{w/2}" y="{h/2}" fill="#ffffff" fill-opacity="0.85" font-family="Helvetica, Arial, sans-serif"
        font-size="{w*0.032}" font-weight="700" text-anchor="middle" dominant-baseline="middle"
        letter-spacing="1">{esc(label.upper())}</text>
</svg>'''
    write(path, svg)


def ensure_placeholders():
    i = 0
    for src in CONTENT["heroImages"]:
        if "placeholders/hero-" in src:
            make_placeholder(src, f"Hero photo {i+1}", PLACEHOLDER_PALETTE[i % len(PLACEHOLDER_PALETTE)], "4:5")
            i += 1
    for src in CONTENT["info"]["sequenceImages"]:
        if "placeholders/sequence-" in src:
            make_placeholder(src, "Info sequence photo", "#8A8A8A", "4:5")
    for p in CONTENT["projects"]:
        if not p["cover"]:
            p["_cover"] = f"assets/placeholders/{p['slug']}-cover.svg"
            make_placeholder(p["_cover"], p["title"], p["colour"], "16:9")
        else:
            p["_cover"] = p["cover"]
        for m in p["media"]:
            if m["type"] == "placeholder":
                make_placeholder(m["src"], m["caption"][:40], p["colour"], "16:9")


ensure_placeholders()


# ---- shared chrome ---------------------------------------------------------
# Every href/src below is written relative to `base`, so the same markup
# works whether the page sits at the repo root (base="") or one level
# inside /work/<slug>/ (base="../../").

def nav_header(base):
    return f'''<header class="bar" data-bar>
  <a class="bar-name" href="{base}index.html">{esc(SITE["name"])}</a>
  <button class="bar-menu" id="menu-open" type="button" aria-haspopup="true" aria-expanded="false" aria-controls="menu">Menu</button>
</header>'''


def menu_overlay(base):
    return f'''<div class="menu" id="menu" aria-hidden="true">
  <button class="menu-close" id="menu-close" type="button">Close</button>
  <nav class="menu-links" aria-label="Primary">
    <a href="{base}info.html">Info</a>
    <a href="{base}work.html">Work</a>
    <a href="{base}contact.html">Contact</a>
  </nav>
  <div class="menu-foot">
    <a class="menu-email" href="mailto:{esc(SITE["email"])}">{esc(SITE["email"])}</a>
    <div class="menu-socials">
      <a href="{esc(SITE["socials"]["linkedin"])}" target="_blank" rel="noopener">LinkedIn</a>
      <a href="{esc(SITE["socials"]["github"])}" target="_blank" rel="noopener">GitHub</a>
      <a href="{esc(SITE["socials"]["x"])}" target="_blank" rel="noopener">X</a>
    </div>
    <a class="menu-phone" href="tel:{esc(SITE["phone"].replace(" ", ""))}">{esc(SITE["phone"])}</a>
  </div>
</div>'''


def footer(base):
    return f'''<footer class="site-foot" data-trail-zone>
  <p class="foot-name">{esc(SITE["name"])}</p>
  <a class="foot-cta" href="{base}contact.html">Get in touch ↗</a>
  <p class="foot-tagline">{esc(SITE["footerTagline"])}</p>
  <div class="foot-row">
    <div class="foot-socials">
      <a href="{esc(SITE["socials"]["linkedin"])}" target="_blank" rel="noopener">LinkedIn</a>
      <a href="{esc(SITE["socials"]["github"])}" target="_blank" rel="noopener">GitHub</a>
      <a href="{esc(SITE["socials"]["x"])}" target="_blank" rel="noopener">X</a>
    </div>
    <div class="foot-legal">
      <span>Privacy</span>
      <span>Terms</span>
      <span>&copy; 2026</span>
    </div>
  </div>
</footer>'''


def page(title, description, body, base):
    return f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{esc(title)}</title>
<meta name="description" content="{esc(description)}">
<link rel="icon" href="{base}favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@500;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="{base}css/styles.css">
<script>document.documentElement.classList.add('js');</script>
</head>
<body data-base="{base}">
<div class="page-wipe" data-wipe aria-hidden="true"></div>
{nav_header(base)}
{menu_overlay(base)}
{body}
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/lenis@1.1.18/dist/lenis.min.js"></script>
<script src="{base}js/main.js"></script>
</body>
</html>'''


def work_card(p, base):
    is_svg = p["_cover"].endswith(".svg")
    return f'''<a class="work-card reveal" href="{base}work/{p["slug"]}/">
      <div class="work-card-frame" style="--brand:{p["colour"]}">
        <img src="{base}{p["_cover"]}" alt="" loading="lazy" {'class="is-tint"' if is_svg else ""}>
      </div>
      <div class="work-card-meta">
        <span class="work-card-title">{esc(p["title"])}</span>
        <span class="work-card-sub">{esc(p["subtitle"])}</span>
      </div>
    </a>'''


# ---- Home ------------------------------------------------------------------
def build_home():
    base = ROOT_BASE
    hero_imgs = "\n".join(
        f'<img class="hero-img" data-hero-img src="{base}{src}" alt="" loading="lazy" style="--i:{i}">'
        for i, src in enumerate(CONTENT["heroImages"])
    )
    body = f'''<main class="home" data-reduce-cursor>
  <div class="home-stage" id="home-stage" data-hero-stage>
    <h1 class="home-name">{esc(SITE["name"])}</h1>
    {hero_imgs}
  </div>
  <div class="home-row">
    <a class="home-email" href="mailto:{esc(SITE["email"])}">{esc(SITE["email"])}</a>
    <p class="home-tagline">{esc(SITE["tagline"])}</p>
    <span class="home-year">&copy; 2026</span>
  </div>
</main>'''
    write("index.html", page(f"{SITE['name']} — {SITE['tagline']}",
          "Aishwar Mishra: product and strategy. I turn ambiguity into decisions.", body, base))


# ---- Info --------------------------------------------------------------------
def build_info():
    base = ROOT_BASE
    seq_imgs = "\n".join(
        f'<img data-seq-img src="{base}{src}" alt="" loading="lazy">' for src in CONTENT["info"]["sequenceImages"]
    )
    services = "\n".join(f"<li>{esc(s)}</li>" for s in CONTENT["info"]["services"])
    companies = "\n".join(f"<li>{esc(c)}</li>" for c in CONTENT["info"]["companies"])
    body = f'''<main class="info">
  <div class="info-image" data-seq>
    {seq_imgs}
  </div>
  <p class="info-statement reveal">{esc(CONTENT["info"]["statement"])}</p>
  <div class="info-grid">
    <div class="info-col reveal">
      <p class="label">Services</p>
      <ul>{services}</ul>
    </div>
    <div class="info-col reveal">
      <p class="label">Companies</p>
      <ul>{companies}</ul>
    </div>
    <div class="info-col reveal">
      <p class="label">Contact</p>
      <ul>
        <li><a href="mailto:{esc(SITE["email"])}">{esc(SITE["email"])}</a></li>
        <li><a href="tel:{esc(SITE["phone"].replace(" ", ""))}">{esc(SITE["phone"])}</a></li>
      </ul>
    </div>
    <div class="info-col reveal">
      <p class="label">Social</p>
      <ul>
        <li><a href="{esc(SITE["socials"]["linkedin"])}" target="_blank" rel="noopener">LinkedIn ↗</a></li>
        <li><a href="{esc(SITE["socials"]["github"])}" target="_blank" rel="noopener">GitHub ↗</a></li>
        <li><a href="{esc(SITE["socials"]["x"])}" target="_blank" rel="noopener">X ↗</a></li>
      </ul>
    </div>
  </div>
</main>
{footer(base)}'''
    write("info.html", page(f"Info — {SITE['name']}", "Services, companies and how to reach Aishwar Mishra.", body, base))


# ---- Work --------------------------------------------------------------------
def build_work():
    base = ROOT_BASE
    cards = "".join(work_card(p, base) for p in CONTENT["projects"])
    body = f'''<main class="work">
  <div class="work-grid">
    {cards}
  </div>
</main>
{footer(base)}'''
    write("work.html", page(f"Work — {SITE['name']}", "Selected work: ops, strategy, AI evaluation and fundraising.", body, base))


# ---- Project template ----------------------------------------------------
def clean_stale_projects(slugs):
    """Remove work/<slug>/ for any project no longer in content.json, so a
    renamed or deleted project doesn't leave its old page live."""
    work_dir = os.path.join(ROOT, "work")
    if not os.path.isdir(work_dir):
        return
    for name in os.listdir(work_dir):
        if name not in slugs and os.path.isdir(os.path.join(work_dir, name)):
            import shutil
            shutil.rmtree(os.path.join(work_dir, name))
            print("removed stale work/" + name)


def build_projects():
    base = PROJECT_BASE
    slugs = [p["slug"] for p in CONTENT["projects"]]
    clean_stale_projects(slugs)
    for idx, p in enumerate(CONTENT["projects"]):
        media_blocks = "".join(f'''<figure class="media-block reveal">
      <img src="{base}{m["src"]}" alt="{esc(m["caption"])}" loading="lazy">
      <figcaption class="label">{esc(m["caption"])}</figcaption>
    </figure>''' for m in p["media"])

        meta_rows = [("Services", p["services"]), ("Industry", p["industry"]), ("Year", p["year"])]
        meta_html = "\n".join(f'<div><p class="label">{esc(k)}</p><p>{esc(v)}</p></div>' for k, v in meta_rows)
        if p["liveUrl"]:
            meta_html += f'<div><p class="label">Live project</p><p><a href="{esc(p["liveUrl"])}" target="_blank" rel="noopener">Visit ↗</a></p></div>'

        others = [slugs[(idx + 1) % len(slugs)], slugs[(idx + 2) % len(slugs)]]
        other_cards = "".join(
            work_card(next(x for x in CONTENT["projects"] if x["slug"] == s), base) for s in others
        )

        body = f'''<main class="project" style="--brand:{p["colour"]}">
  <section class="project-hero">
    <h1>{esc(p["title"])}</h1>
    <p class="project-sub">{esc(p["subtitle"])}</p>
    <img class="project-hero-img reveal" src="{base}{p["_cover"]}" alt="" loading="eager">
  </section>
  <section class="project-body">
    <p class="project-desc reveal">{esc(p["description"])}</p>
    <div class="project-meta reveal">
      {meta_html}
    </div>
    <div class="project-media">
      {media_blocks}
    </div>
  </section>
  <section class="more-works">
    <p class="label reveal">More works</p>
    <div class="work-grid work-grid-2">
      {other_cards}
    </div>
    <a class="all-work reveal" href="{base}work.html">All work ↗</a>
  </section>
</main>
{footer(base)}'''
        write(f"work/{p['slug']}/index.html", page(
            f"{p['title']} — {SITE['name']}", p["description"][:150], body, base
        ))


# ---- Contact -----------------------------------------------------------------
def build_contact():
    base = ROOT_BASE
    body = f'''<main class="contact-page">
  <h1 class="reveal">Get in touch</h1>
  <div class="contact-grid">
    <div class="contact-left reveal">
      <div>
        <p class="label">Email</p>
        <a href="mailto:{esc(SITE["email"])}">{esc(SITE["email"])}</a>
      </div>
      <div>
        <p class="label">Phone</p>
        <a href="tel:{esc(SITE["phone"].replace(" ", ""))}">{esc(SITE["phone"])}</a>
      </div>
      <div>
        <p class="label">Social</p>
        <div class="contact-socials">
          <a href="{esc(SITE["socials"]["linkedin"])}" target="_blank" rel="noopener">LinkedIn ↗</a>
          <a href="{esc(SITE["socials"]["github"])}" target="_blank" rel="noopener">GitHub ↗</a>
          <a href="{esc(SITE["socials"]["x"])}" target="_blank" rel="noopener">X ↗</a>
        </div>
      </div>
    </div>
    <div class="contact-right reveal">
      <p class="label">Send a message</p>
      <form class="contact-form" id="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
        <label>Full name<input type="text" name="name" required></label>
        <label>Email<input type="email" name="email" required></label>
        <label>Phone<input type="tel" name="phone"></label>
        <label>Message<textarea name="message" rows="4" required></textarea></label>
        <button class="submit-btn" type="submit">Submit</button>
        <p class="form-note" id="form-note" role="status" hidden>Thanks — I'll get back to you shortly.</p>
      </form>
    </div>
  </div>
</main>
{footer(base)}'''
    write("contact.html", page(f"Contact — {SITE['name']}", "Send Aishwar Mishra a message.", body, base))


build_home()
build_info()
build_work()
build_projects()
build_contact()
print("done")

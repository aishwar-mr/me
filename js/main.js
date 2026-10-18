(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var touch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
  var hasGSAP = typeof window.gsap !== 'undefined';
  /* Root-relative base for this page (repo root, or "../../" one level
     into /work/<slug>/). Set per page by build.py, since GitHub Pages
     serves this site under a subpath, not the domain root. */
  var base = document.body.dataset.base || '';
  if (hasGSAP && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  /* ---- Lenis smooth scroll (desktop, motion allowed) ------------------- */
  var lenis = null;
  if (!reduce && !touch && typeof window.Lenis !== 'undefined') {
    lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    var raf = function (t) { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    if (hasGSAP && window.ScrollTrigger) lenis.on('scroll', ScrollTrigger.update);
  }

  /* ---- scroll reveal: fade + rise, once ------------------------------- */
  var reveals = document.querySelectorAll('.reveal');
  if (reduce || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        io.unobserve(e.target);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---- menu overlay ------------------------------------------------------
     Slides down from the top; hovering a link fades the others. */
  var menu = document.getElementById('menu');
  var openBtn = document.getElementById('menu-open');
  var closeBtn = document.getElementById('menu-close');
  if (menu && openBtn) {
    var setMenu = function (open) {
      if (open) menu.classList.add('is-open');
      openBtn.setAttribute('aria-expanded', String(open));
      menu.setAttribute('aria-hidden', String(!open));
      document.body.style.overflow = open ? 'hidden' : '';
      if (lenis) open ? lenis.stop() : lenis.start();
      var tween = { y: open ? '0%' : '-100%', duration: reduce ? 0 : 0.6, ease: 'power3.' + (open ? 'out' : 'in') };
      if (hasGSAP) {
        gsap.to(menu, Object.assign({ onComplete: function () { if (!open) menu.classList.remove('is-open'); } }, tween));
      } else {
        menu.style.transform = 'translateY(' + (open ? '0%' : '-100%') + ')';
        if (!open) menu.classList.remove('is-open');
      }
    };
    openBtn.addEventListener('click', function () { setMenu(true); });
    closeBtn.addEventListener('click', function () { setMenu(false); });
    menu.querySelectorAll('.menu-links a').forEach(function (a) {
      a.addEventListener('mouseenter', function () { menu.classList.add('menu-hovering'); });
      a.addEventListener('mouseleave', function () { menu.classList.remove('menu-hovering'); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) setMenu(false);
    });
  }

  /* ---- page transition: a dark panel wipes up on navigation ------------- */
  var wipe = document.querySelector('[data-wipe]');
  if (wipe && !reduce) {
    if (hasGSAP) gsap.fromTo(wipe, { y: '0%' }, { y: '-100%', duration: 0.7, ease: 'power3.inOut', delay: 0.05 });
    document.querySelectorAll('a[href]').forEach(function (a) {
      var href = a.getAttribute('href');
      if (!href || href.charAt(0) === '#' || a.target === '_blank' || href.indexOf('mailto:') === 0 || href.indexOf('tel:') === 0) return;
      a.addEventListener('click', function (e) {
        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
        e.preventDefault();
        if (hasGSAP) {
          gsap.to(wipe, { y: '0%', duration: 0.6, ease: 'power3.inOut', onComplete: function () { window.location.href = href; } });
        } else {
          window.location.href = href;
        }
      });
    });
  }

  /* ======================================================================
     Home: images spawn around the name, hold briefly, fade out. Extra
     images spawn near the cursor on desktop.
     ====================================================================== */
  var stage = document.querySelector('[data-hero-stage]');
  if (stage) {
    var imgs = Array.prototype.slice.call(stage.querySelectorAll('[data-hero-img]'));
    var spawn = function (img, atCursor) {
      var r = stage.getBoundingClientRect();
      var w = img.offsetWidth || 160, h = img.offsetHeight || 200;
      var x, y;
      if (atCursor) {
        x = lastX - w / 2; y = lastY - h / 2;
      } else {
        x = Math.random() * (r.width - w);
        y = Math.random() * (r.height - h);
      }
      var tilt = (Math.random() - 0.5) * 16;
      if (hasGSAP && !reduce) {
        gsap.killTweensOf(img);
        gsap.set(img, { x: x, y: y, rotate: tilt, scale: 0.6, opacity: 0, zIndex: Math.round(Math.random() * 3) });
        var hold = 1500 + Math.random() * 1000;
        gsap.timeline()
          .to(img, { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' })
          .to(img, { opacity: 0, scale: 0.85, duration: 0.6, ease: 'power1.in', delay: hold / 1000 })
          .call(cycle, [img]);
      } else if (!reduce) {
        img.style.transform = 'translate(' + x + 'px,' + y + 'px) rotate(' + tilt + 'deg)';
        img.style.opacity = '1';
      }
    };
    var cycle = function (img) { spawn(img, false); };

    if (!reduce) {
      imgs.forEach(function (img, i) { setTimeout(function () { spawn(img, false); }, i * 350); });
    }

    var lastX = 0, lastY = 0, lastSpawn = 0;
    if (!touch && !reduce) {
      stage.addEventListener('pointermove', function (e) {
        lastX = e.clientX; lastY = e.clientY;
        var now = performance.now();
        if (now - lastSpawn < 600) return;
        lastSpawn = now;
        var img = imgs[Math.floor(Math.random() * imgs.length)];
        spawn(img, true);
      });
    }
  }

  /* ======================================================================
     Info: image sequence swaps as the page scrolls; statement rises after.
     ====================================================================== */
  var seq = document.querySelector('[data-seq]');
  if (seq && hasGSAP && window.ScrollTrigger && !reduce) {
    var frames = Array.prototype.slice.call(seq.querySelectorAll('img'));
    frames[0] && frames[0].classList.add('is-active');
    ScrollTrigger.create({
      trigger: document.querySelector('.info'),
      start: 'top top',
      end: '+=' + (frames.length * 220),
      scrub: true,
      onUpdate: function (self) {
        var i = Math.min(frames.length - 1, Math.floor(self.progress * frames.length));
        frames.forEach(function (f, idx) { f.classList.toggle('is-active', idx === i); });
      }
    });
    gsap.to(seq, {
      yPercent: -40, opacity: 0, ease: 'none',
      scrollTrigger: { trigger: seq, start: 'top 20%', end: 'bottom top', scrub: true }
    });
  } else if (seq) {
    var first = seq.querySelector('img');
    if (first) first.classList.add('is-active');
  }

  /* ---- project hero image: rises slightly as you scroll past it -------- */
  var heroImg = document.querySelector('.project-hero-img');
  if (heroImg && hasGSAP && window.ScrollTrigger && !reduce) {
    gsap.to(heroImg, {
      yPercent: -8, ease: 'none',
      scrollTrigger: { trigger: heroImg, start: 'top bottom', end: 'bottom top', scrub: true }
    });
  }

  /* ---- media blocks: scale in slightly as they enter view --------------- */
  if (hasGSAP && window.ScrollTrigger && !reduce) {
    document.querySelectorAll('.media-block').forEach(function (el) {
      gsap.fromTo(el, { scale: 0.92 }, {
        scale: 1, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 85%' }
      });
    });
  }

  /* ======================================================================
     Footer: an image trail follows the cursor (desktop only).
     ====================================================================== */
  var trailZone = document.querySelector('[data-trail-zone]');
  if (trailZone && !touch && !reduce) {
    var trailSrcs = [
      base + 'assets/aishwar.jpg', base + 'assets/sih-prototype.png',
      base + 'assets/sih-detection.png', base + 'assets/WorldQuant-GC.png'
    ];
    var tLast = 0;
    trailZone.addEventListener('pointermove', function (e) {
      var now = performance.now();
      if (now - tLast < 140) return;
      tLast = now;
      var r = trailZone.getBoundingClientRect();
      var img = document.createElement('img');
      img.className = 'trail-img';
      img.src = trailSrcs[Math.floor(Math.random() * trailSrcs.length)];
      img.alt = '';
      document.body.appendChild(img);
      var x = e.clientX - 70, y = e.clientY - 87;
      var tilt = (Math.random() - 0.5) * 20;
      if (hasGSAP) {
        gsap.set(img, { x: x, y: y, rotate: tilt, scale: 0.9, opacity: 1 });
        gsap.to(img, {
          scale: 0.6, opacity: 0, duration: 1, ease: 'power1.out',
          onComplete: function () { img.remove(); }
        });
      } else {
        img.style.transform = 'translate(' + x + 'px,' + y + 'px) rotate(' + tilt + 'deg)';
        img.style.opacity = '1';
        setTimeout(function () { img.remove(); }, 1000);
      }
    });
  }

  /* ---- contact form: inline success message, no page reload ------------ */
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      if (form.action.indexOf('YOUR_FORM_ID') !== -1) return; // not configured yet
      e.preventDefault();
      var note = document.getElementById('form-note');
      fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
        .then(function (res) {
          if (res.ok) { form.reset(); note.hidden = false; }
          else { note.textContent = 'Something went wrong — email me directly instead.'; note.hidden = false; }
        })
        .catch(function () {
          note.textContent = 'Something went wrong — email me directly instead.';
          note.hidden = false;
        });
    });
  }
})();

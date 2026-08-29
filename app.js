/* Site behaviour. No dependencies.
   Motion is IntersectionObserver-driven; no scroll listeners. */

(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- scroll reveal -------------------------------------------------
     Communicates reading order: sections resolve as you arrive at them. */
  var targets = document.querySelectorAll('.reveal');
  if (reduce || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(targets, function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        io.unobserve(e.target);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    Array.prototype.forEach.call(targets, function (el) { io.observe(el); });
  }

  /* ---- work rail ------------------------------------------------------ */
  var rail = document.getElementById('rail');
  if (rail) {
    var step = function () {
      var card = rail.querySelector('.work-card');
      if (!card) return rail.clientWidth;
      var gap = parseFloat(getComputedStyle(rail).columnGap || '0');
      return card.offsetWidth + gap;
    };
    document.querySelectorAll('[data-rail]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var dir = btn.dataset.rail === 'prev' ? -1 : 1;
        rail.scrollBy({ left: dir * step(), behavior: reduce ? 'auto' : 'smooth' });
      });
    });

    /* Disable arrows at the ends so they never look broken. */
    var sync = function () {
      var max = rail.scrollWidth - rail.clientWidth - 2;
      document.querySelectorAll('[data-rail]').forEach(function (btn) {
        var atEnd = btn.dataset.rail === 'prev'
          ? rail.scrollLeft <= 2
          : rail.scrollLeft >= max;
        btn.disabled = atEnd;
        btn.style.opacity = atEnd ? '.4' : '';
      });
    };
    rail.addEventListener('scroll', sync, { passive: true });
    sync();
  }

  /* ---- header search --------------------------------------------------
     Static host, so this hands off to a scoped web search. */
  var form = document.getElementById('search');
  if (form) {
    var toggle = document.getElementById('search-toggle');
    var input = form.querySelector('.search-input');

    toggle.addEventListener('click', function () {
      var open = form.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      if (open) { input.focus(); } else { form.reset(); }
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var q = input.value.trim();
      if (!q) return;
      var scope = location.hostname + location.pathname.replace(/\/[^/]*$/, '/');
      window.open('https://duckduckgo.com/?q=' + encodeURIComponent('site:' + scope + ' ' + q),
                  '_blank', 'noopener');
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && form.classList.contains('open')) {
        form.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        form.reset();
        toggle.focus();
      }
    });
  }

  /* ---- theme toggle --------------------------------------------------
     Three states: no stored value follows the OS; an explicit choice wins. */
  var themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    var root = document.documentElement;
    var systemDark = window.matchMedia('(prefers-color-scheme: dark)');

    var current = function () {
      return root.getAttribute('data-theme') ||
             (systemDark.matches ? 'dark' : 'light');
    };
    var label = function () {
      themeBtn.setAttribute('aria-label',
        current() === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    };
    label();

    themeBtn.addEventListener('click', function () {
      var next = current() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
      label();
    });

    /* With no explicit choice stored, keep following the OS. */
    systemDark.addEventListener('change', function () {
      try { if (!localStorage.getItem('theme')) label(); } catch (e) { label(); }
    });
  }

  /* ---- language menu: close on outside click / Escape ---------------- */
  var closeMenus = function (except) {
    document.querySelectorAll('details.lang[open]').forEach(function (d) {
      if (d !== except) d.removeAttribute('open');
    });
  };
  document.addEventListener('click', function (e) {
    var open = document.querySelector('details.lang[open]');
    if (open && !open.contains(e.target)) closeMenus();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenus();
  });
})();

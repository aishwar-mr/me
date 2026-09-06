/* MARS: the floating fit screener.
 *
 * A chat-shaped front end over screener.js. It asks one question at a time,
 * but it decides nothing: every verdict still comes from scoreRole() against
 * the published rubric. This file is presentation only.
 *
 * Depends on screener.js and rubric.json.
 */

(function () {
  'use strict';

  /* The ask endpoint. Empty until worker/ is deployed, and the site is fully
     functional without it: the screener never touches the network, so with no
     endpoint MARS simply does not offer the ask option. See worker/README.md */
  var ENDPOINT = '';

  var LANG = document.documentElement.lang === 'es' ? 'es' : 'en';
  var ES = LANG === 'es';

  var T = ES ? {
    name: 'MARS',
    open: 'Hablar con MARS',
    close: 'Cerrar',
    restart: 'Empezar de nuevo',
    intro: [
      'Hola, soy MARS, el clon de IA de Aishwar.',
      'Te haré unas preguntas sobre tu puesto y luego te diré con honestidad si encaja. Puedo decir que no, y a veces lo hago.'
    ],
    start: 'Evaluar un puesto',
    askBtn: 'Preguntar otra cosa',
    askPlaceholder: 'Escribe tu pregunta',
    backToScreen: 'Seguir con la evaluación',
    startScreen: 'Evaluar un puesto',
    askIntro: '\u00bfQu\u00e9 quieres saber? Respondo solo con lo que est\u00e1 documentado sobre Aishwar. Si no lo s\u00e9, lo digo.',
    askErr: 'No he podido responder ahora mismo. Puedes escribirle directamente.',
    askLimit: 'Has alcanzado el l\u00edmite de preguntas por hoy.',
    askCapped: 'MARS est\u00e1 descansando este mes. Escr\u00edbele directamente.',
    of: 'de',
    thinking: 'Calculando',
    rules: 'Ver las reglas',
    gatesHead: 'Puerta por puerta',
    typeNumber: 'Escribe un número',
    send: 'Enviar',
    score: 'Puntuación',
    incomplete: 'No hay suficiente para juzgar.',
    contact: 'Contactar a Aishwar'
  } : {
    name: 'MARS',
    open: 'Talk to MARS',
    close: 'Close',
    restart: 'Start over',
    intro: [
      "Hi, I'm MARS, Aishwar's AI clone.",
      "I'll ask you a few things about your role, then tell you honestly whether he is a fit. I can say no, and sometimes I do."
    ],
    start: 'Screen a role',
    askBtn: 'Ask something else',
    askPlaceholder: 'Type your question',
    backToScreen: 'Back to the screening',
    startScreen: 'Screen a role',
    askIntro: 'What do you want to know? I answer only from what is documented about Aishwar. If I do not know, I say so.',
    askErr: 'I could not answer just now. You can write to him directly.',
    askLimit: 'You have reached the question limit for today.',
    askCapped: 'MARS is resting this month. Write to him directly.',
    of: 'of',
    thinking: 'Scoring',
    rules: 'See the rules',
    gatesHead: 'Gate by gate',
    typeNumber: 'Type a number',
    send: 'Send',
    score: 'Score',
    incomplete: 'Not enough to judge.',
    contact: 'Get in touch with Aishwar'
  };

  var SUF = ES ? '.es.html' : '.html';
  var rubric = null, queue = [], answers = {}, step = 0, done = false;
  var root, panel, log, input, launcher;

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  /* Spanish overrides live in rubric.i18n.es, so the two languages cannot
     drift apart. Missing key falls back to English rather than breaking. */
  function tr(item, key) {
    if (!ES) return item[key];
    var o = (rubric.i18n && rubric.i18n.es && rubric.i18n.es[item.id]) || {};
    return o[key] !== undefined ? o[key] : item[key];
  }
  function trOptions(item) {
    var labels = ES ? ((rubric.i18n.es[item.id] || {}).options || null) : null;
    return item.options.map(function (o, i) {
      return { value: o.value, label: labels ? labels[i] : o.label };
    });
  }

  /* --- chrome ---------------------------------------------------------- */
  function build() {
    root = document.createElement('div');
    root.className = 'mars';
    root.innerHTML =
      '<button class="mars-launcher" type="button" aria-expanded="false" aria-label="' +
        esc(T.open) + '"><span aria-hidden="true">M</span></button>' +
      '<section class="mars-panel" role="dialog" aria-modal="false" aria-label="' + esc(T.name) + '" hidden>' +
        '<header class="mars-head">' +
          '<span class="mars-avatar" aria-hidden="true">M</span>' +
          '<div><b>' + esc(T.name) + '</b><span class="mars-sub" id="mars-progress"></span></div>' +
          '<button class="mars-x" type="button" aria-label="' + esc(T.close) + '">&times;</button>' +
        '</header>' +
        '<div class="mars-log" id="mars-log" role="log" aria-live="polite"></div>' +
        '<div class="mars-input" id="mars-input"></div>' +
      '</section>';
    document.body.appendChild(root);

    launcher = root.querySelector('.mars-launcher');
    panel = root.querySelector('.mars-panel');
    log = root.querySelector('.mars-log');
    input = root.querySelector('.mars-input');

    launcher.addEventListener('click', toggle);
    // any [data-mars-open] on the page opens the widget
    Array.prototype.forEach.call(document.querySelectorAll('[data-mars-open]'), function (b) {
      b.addEventListener('click', open);
    });
    root.querySelector('.mars-x').addEventListener('click', close);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !panel.hidden) close();
    });
  }

  function toggle() { panel.hidden ? open() : close(); }

  function open() {
    panel.hidden = false;
    launcher.setAttribute('aria-expanded', 'true');
    root.classList.add('is-open');
    if (!log.childNodes.length) intro();
    var first = input.querySelector('button, input');
    if (first) first.focus();
  }

  function close() {
    panel.hidden = true;
    launcher.setAttribute('aria-expanded', 'false');
    root.classList.remove('is-open');
    launcher.focus();
  }

  /* --- messages -------------------------------------------------------- */
  function say(html, who) {
    var el = document.createElement('div');
    el.className = 'mars-msg mars-' + (who || 'bot');
    el.innerHTML = html;
    log.appendChild(el);
    log.scrollTop = log.scrollHeight;
    return el;
  }

  function progress() {
    var el = document.getElementById('mars-progress');
    el.textContent = done || !queue.length ? '' : (step + 1) + ' ' + T.of + ' ' + queue.length;
  }

  function intro() {
    T.intro.forEach(function (line) { say(esc(line)); });
    menu();
  }

  /* Two ways in. The ask option only appears when an endpoint is configured,
     so an undeployed Worker degrades to a screener rather than a dead button. */
  function menu() {
    input.innerHTML =
      '<button class="mars-opt mars-go" type="button" data-go="screen">' + esc(T.startScreen) + '</button>' +
      (ENDPOINT ? '<button class="mars-opt" type="button" data-go="ask">' + esc(T.askBtn) + '</button>' : '');
    Array.prototype.forEach.call(input.querySelectorAll('[data-go]'), function (b) {
      b.addEventListener('click', function () {
        input.innerHTML = '';
        if (b.dataset.go === 'ask') askMode(); else ask();
      });
    });
  }

  /* --- the questionnaire ------------------------------------------------ */
  function ask() {
    progress();
    if (step >= queue.length) return finish();

    var item = queue[step];
    say(esc(tr(item, 'question')) + ' <span class="mars-tag">' + item.id + '</span>');

    if (item.input_kind === 'number') {
      input.innerHTML =
        '<form class="mars-num"><label class="visually-hidden" for="mars-n">' + esc(T.typeNumber) + '</label>' +
        '<input id="mars-n" type="number" min="' + item.min + '" max="' + item.max +
        '" step="1" placeholder="' + esc(T.typeNumber) + '" required>' +
        '<button type="submit">' + esc(T.send) + '</button></form>';
      var form = input.querySelector('form');
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var v = Number(form.querySelector('input').value);
        if (isNaN(v) || v < item.min || v > item.max) return;
        answer(item, v, String(v));
      });
      form.querySelector('input').focus();
    } else {
      input.innerHTML = trOptions(item).map(function (o, i) {
        return '<button class="mars-opt" type="button" data-i="' + i + '">' + esc(o.label) + '</button>';
      }).join('');
      var opts = trOptions(item);
      Array.prototype.forEach.call(input.querySelectorAll('.mars-opt'), function (b) {
        b.addEventListener('click', function () {
          var o = opts[Number(b.dataset.i)];
          answer(item, o.value, o.label);
        });
      });
      var f = input.querySelector('.mars-opt');
      if (f) f.focus();
    }

    /* An escape hatch on every question. A visitor with an unrelated question
       should not have to finish a survey to ask it, and the survey resumes
       from the same place afterwards. */
    if (ENDPOINT) {
      var esc_btn = document.createElement('button');
      esc_btn.className = 'mars-opt mars-aside';
      esc_btn.type = 'button';
      esc_btn.textContent = T.askBtn;
      esc_btn.addEventListener('click', function () { askMode(true); });
      input.appendChild(esc_btn);
    }
  }

  function answer(item, value, label) {
    answers[item.input || item.id] = value;
    say(esc(label), 'me');
    input.innerHTML = '';

    /* The survey always runs to the end. A gate can already have failed by
       now, but someone who is answering deserves the full read on every
       gate rather than being cut off at the one that went wrong. */
    step++;
    setTimeout(ask, 260);
  }

  /* --- ask mode ---------------------------------------------------------
     Free-form questions go to the Worker, which answers only from facts.json.
     This path never produces a fit verdict: that stays in scoreRole(). */
  var history = [];

  function askMode(resumable) {
    if (!log.querySelector('.mars-ask-intro')) {
      var el = say(esc(T.askIntro));
      el.classList.add('mars-ask-intro');
    }
    askInput(resumable);
  }

  function askInput(resumable) {
    input.innerHTML =
      '<form class="mars-num mars-askform">' +
      '<label class="visually-hidden" for="mars-q">' + esc(T.askPlaceholder) + '</label>' +
      '<input id="mars-q" type="text" maxlength="600" placeholder="' + esc(T.askPlaceholder) + '" required>' +
      '<button type="submit">' + esc(T.send) + '</button></form>' +
      (resumable
        ? '<button class="mars-opt mars-aside" type="button" data-resume>' + esc(T.backToScreen) + '</button>'
        : '<button class="mars-opt mars-aside" type="button" data-go="screen">' + esc(T.startScreen) + '</button>');

    var form = input.querySelector('form');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var q = form.querySelector('input').value.trim();
      if (q) send(q, resumable);
    });

    var resume = input.querySelector('[data-resume]');
    if (resume) resume.addEventListener('click', function () { input.innerHTML = ''; ask(); });
    var go = input.querySelector('[data-go="screen"]');
    if (go) go.addEventListener('click', function () { input.innerHTML = ''; ask(); });

    form.querySelector('input').focus();
  }

  function send(q, resumable) {
    say(esc(q), 'me');
    input.innerHTML = '';
    var thinking = say('<span class="mars-dots"><i></i><i></i><i></i></span>');

    fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ q: q, lang: LANG, history: history })
    })
      .then(function (res) { return res.json().then(function (j) { return { ok: res.ok, j: j }; }); })
      .then(function (r) {
        thinking.remove();
        if (!r.ok) {
          var msg = r.j.error === 'rate_limited' ? T.askLimit
                  : r.j.error === 'capped' ? T.askCapped : T.askErr;
          say(esc(msg));
        } else {
          var html = esc(r.j.answer);
          if (r.j.link) {
            html += '<br><a class="mars-link" href="' + esc(r.j.link.href) + '">' +
                    esc(r.j.link.label) + ' <i class="chev" aria-hidden="true"></i></a>';
          }
          say(html);
          history.push({ role: 'user', content: q });
          history.push({ role: 'assistant', content: r.j.answer });
        }
        askInput(resumable);
      })
      .catch(function () {
        thinking.remove();
        say(esc(T.askErr));
        askInput(resumable);
      });
  }

  /* --- verdict ---------------------------------------------------------- */
  function finish() {
    done = true;
    progress();
    var thinking = say('<span class="mars-dots"><i></i><i></i><i></i></span>');

    /* Answers are passed exactly as given. On an early exit most fields are
       absent, and scoreRole settles a tripped gate before it looks at
       completeness, so nothing has to be invented here. */
    var r = Screener.scoreRole(answers, rubric);

    setTimeout(function () {
      thinking.remove();
      render(r);
    }, 420);
  }

  function render(r) {
    /* The number is the headline. The gate list below says what it means,
       in wording written in advance, so a one-word label on top would only
       be restating it less precisely. */
    var html = '<div class="mars-verdict mars-v-' + r.verdict + '">';
    if (r.total === null) {
      html += '<b>' + esc(T.incomplete) + '</b>';
    } else {
      html += '<span class="mars-big"><b class="num">' + Math.round(r.total) +
              '</b><i>/100</i></span>' +
              '<span class="mars-score">' + esc(T.score) + '</span>';
    }
    html += '</div>';
    say(html);

    var KEY = { FAIL: 'fail_note', NEAR: 'near_note', PASS: 'pass_note' };
    var rows = Screener.explain(r, rubric).map(function (n) {
      var def = rubric.gates.filter(function (g) { return g.id === n.id; })[0];
      return '<li><span class="mars-state mars-s-' + n.state + '">' + n.state + '</span>' +
             '<b>' + esc(n.id) + ' ' + esc(tr(def, 'label')) + '</b>' +
             '<p>' + esc(tr(def, KEY[n.state]) || tr(def, 'reason')) + '</p></li>';
    }).join('');
    say('<b class="mars-h">' + esc(T.gatesHead) + '</b><ul class="mars-gates">' + rows + '</ul>');

    input.innerHTML =
      '<a class="mars-opt mars-go" href="contact' + SUF + '">' + esc(T.contact) + '</a>' +
      (ENDPOINT ? '<button class="mars-opt" type="button" data-go="ask">' + esc(T.askBtn) + '</button>' : '') +
      '<a class="mars-opt" href="screener' + SUF + '">' + esc(T.rules) + '</a>' +
      '<button class="mars-opt" type="button" id="mars-restart">' + esc(T.restart) + '</button>';
    var askBtn = input.querySelector('[data-go="ask"]');
    if (askBtn) askBtn.addEventListener('click', function () { input.innerHTML = ''; askMode(); });
    document.getElementById('mars-restart').addEventListener('click', function () {
      answers = {}; step = 0; done = false; history = [];
      log.innerHTML = ''; input.innerHTML = '';
      intro();
    });
  }

  /* --- boot ------------------------------------------------------------- */
  if (typeof Screener === 'undefined' || !window.fetch) return;

  fetch('rubric.json')
    .then(function (r) { return r.json(); })
    .then(function (json) {
      rubric = json;
      // Gates first: a failed gate ends the screen, so asking them early
      // means most rejections cost the visitor six questions, not fourteen.
      // ponytail: fixed question order, no adaptive selection. The rubric's six
      // probes (P1-P6) and the /extract endpoint go unused until the interview
      // loop lands. Until then this is a rules engine, not an agent: do not
      // describe it as one. Upgrade path: build order steps 7-8 in the design doc.
      queue = rubric.gates.concat(rubric.criteria);
      build();
    })
    .catch(function () { /* no rubric, no widget. The site is unaffected. */ });
})();

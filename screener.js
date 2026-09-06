/* Founder fit screener: the scoring core.
 *
 * Pure functions. No DOM, no network, no side effects, no clock.
 * The same answers and the same rubric always produce the same verdict.
 * No language model is involved at any point in this file, by design:
 * a model may extract values from prose, but it never decides anything.
 *
 * Runs unchanged in the browser and in node.
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.Screener = factory();
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var STATES = { PASS: 'PASS', NEAR: 'NEAR', FAIL: 'FAIL' };

  /* --- rule evaluation ------------------------------------------------
     Rules are ordered; the first whose condition matches wins. Only these
     operators exist, so a rubric can never smuggle in executable code. */
  var OPS = {
    eq:  function (v, x) { return v === x; },
    ne:  function (v, x) { return v !== x; },
    lt:  function (v, x) { return typeof v === 'number' && v < x; },
    lte: function (v, x) { return typeof v === 'number' && v <= x; },
    gt:  function (v, x) { return typeof v === 'number' && v > x; },
    gte: function (v, x) { return typeof v === 'number' && v >= x; },
    "in": function (v, x) { return Array.isArray(x) && x.indexOf(v) !== -1; }
  };

  function matches(when, value) {
    var keys = Object.keys(when);
    for (var i = 0; i < keys.length; i++) {
      var op = OPS[keys[i]];
      if (!op) throw new Error('unknown operator: ' + keys[i]);
      if (!op(value, when[keys[i]])) return false;
    }
    return true;
  }

  function evaluateGate(gate, value) {
    for (var i = 0; i < gate.rules.length; i++) {
      if (matches(gate.rules[i].when, value)) {
        return { id: gate.id, label: gate.label, state: gate.rules[i].state, value: value };
      }
    }
    // A rubric whose rules do not cover an input is a rubric bug, not a
    // reason to guess. Surfacing it loudly is the correct behaviour.
    throw new Error('no rule matched for gate ' + gate.id + ' with value ' + JSON.stringify(value));
  }

  /* --- input validation -----------------------------------------------
     Missing details produce an "incomplete" result naming what is absent.
     They never produce a verdict, because a verdict we cannot justify is
     worse than no verdict. */
  function findMissing(answers, rubric) {
    var missing = [];
    rubric.gates.forEach(function (g) {
      if (answers[g.input] === undefined || answers[g.input] === null) {
        missing.push({ id: g.id, field: g.input, question: g.question });
      }
    });
    rubric.criteria.forEach(function (c) {
      if (answers[c.id] === undefined || answers[c.id] === null) {
        missing.push({ id: c.id, field: c.id, question: c.question });
      }
    });
    return missing;
  }

  /* --- criteria scoring ------------------------------------------------ */
  function scoreCriteria(rubric, answers) {
    var scores = rubric.criteria.map(function (c) {
      var raw = answers[c.id];
      if (typeof raw !== 'number' || raw < 0 || raw > 10) {
        throw new Error('criterion ' + c.id + ' expects a number 0-10, got ' + JSON.stringify(raw));
      }
      return {
        id: c.id,
        label: c.label,
        weight: c.weight,
        score: raw,
        weighted: raw * c.weight
      };
    });

    var earned = scores.reduce(function (a, s) { return a + s.weighted; }, 0);
    var max = rubric.criteria.reduce(function (a, c) { return a + c.weight * 10; }, 0);
    // Rounded to one decimal so the same inputs cannot drift on float noise.
    var pct = max === 0 ? 0 : Math.round((earned / max) * 1000) / 10;

    return { criteria_scores: scores, earned: earned, max: max, total: pct };
  }

  function bandFor(pct, bands) {
    if (pct >= bands.strong) return 'strong';
    if (pct >= bands.partial) return 'partial';
    return 'weak';
  }

  /* --- the verdict ----------------------------------------------------- */
  function answeredGates(answers, rubric) {
    return rubric.gates.filter(function (g) {
      return answers[g.input] !== undefined && answers[g.input] !== null;
    });
  }

  function scoreRole(answers, rubric) {
    /* Gates are checked before completeness, and deliberately so. A FAIL
       cannot be overturned by any answer that has not been given yet, so
       once one trips the verdict is settled and the remaining questions
       are noise. This is what lets a caller stop asking early. */
    var gates = answeredGates(answers, rubric).map(function (g) {
      return evaluateGate(g, answers[g.input]);
    });
    var failed = gates.filter(function (g) { return g.state === STATES.FAIL; });

    /* A failed gate settles the verdict. The criteria are still scored when
       they were answered, because a founder who filled in the whole survey
       has earned the full picture: "the work suits you, the timing does
       not" is more useful than a bare no. The score is context; it never
       changes the verdict. */
    if (failed.length) {
      var ctx = rubric.criteria.every(function (c) { return typeof answers[c.id] === 'number'; })
        ? scoreCriteria(rubric, answers) : null;
      return {
        verdict: 'no',
        gates: gates,
        gates_tripped: failed.map(function (g) { return g.id; }),
        gates_near: gates.filter(function (g) { return g.state === STATES.NEAR; })
                         .map(function (g) { return g.id; }),
        criteria_scores: ctx ? ctx.criteria_scores : [],
        total: ctx ? ctx.total : null,
        band: ctx ? bandFor(ctx.total, rubric.verdict_rules.bands) : null,
        missing: []
      };
    }

    var missing = findMissing(answers, rubric);
    if (missing.length) {
      return { verdict: 'incomplete', missing: missing, gates: gates, criteria_scores: [], total: null, band: null };
    }

    var near = gates.filter(function (g) { return g.state === STATES.NEAR; });

    var scored = scoreCriteria(rubric, answers);
    var band = bandFor(scored.total, rubric.verdict_rules.bands);

    return {
      verdict: near.length ? 'conditional' : band,
      gates: gates,
      gates_tripped: [],
      gates_near: near.map(function (g) { return g.id; }),
      criteria_scores: scored.criteria_scores,
      total: scored.total,
      band: band,
      missing: []
    };
  }

  /* --- explanation ----------------------------------------------------
     Returns the notes the rubric already carries. Nothing is generated
     here; the wording was written in advance, on purpose. */
  function explain(result, rubric) {
    var byId = {};
    rubric.gates.forEach(function (g) { byId[g.id] = g; });

    var NOTE = { FAIL: 'fail_note', NEAR: 'near_note', PASS: 'pass_note' };
    return (result.gates || []).map(function (g) {
      var def = byId[g.id];
      return {
        id: g.id,
        label: g.label,
        state: g.state,
        reason: def.reason,
        note: def[NOTE[g.state]] || def.reason
      };
    });
  }

  return {
    scoreRole: scoreRole,
    evaluateGate: evaluateGate,
    scoreCriteria: scoreCriteria,
    explain: explain,
    STATES: STATES
  };
}));

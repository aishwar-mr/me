/* Regression set for the screener core.
 *
 *   node screener.test.js
 *
 * Plain asserts, no framework. Run this before every deploy. The published
 * pass rate on the site comes from here.
 */

'use strict';

var assert = require('assert');
var fs = require('fs');
var path = require('path');

var Screener = require('./screener.js');
var rubric = JSON.parse(fs.readFileSync(path.join(__dirname, 'rubric.json'), 'utf8'));

/* A role that clears every gate and scores well. Individual cases override
   only the fields they are actually testing. */
var BASE = {
  years_required: 0,
  onsite_outside_india_no_sponsorship: false,
  ownership_level: 'prototype',
  scope_shape: 'broad',
  brief_fully_specced: false,
  availability_need: 'internship_or_part_time',
  C1: 9, C2: 9, C3: 9, C4: 9, C5: 8, C6: 7, C7: 8, C8: 9
};

function role(overrides) {
  return Object.assign({}, BASE, overrides);
}

var cases = [
  {
    name: 'seed-stage generalist, everything aligned',
    answers: role({}),
    expect: { verdict: 'strong', tripped: [], near: [] }
  },
  {
    name: 'FAIL G1: role wants 5 years full-time',
    answers: role({ years_required: 5 }),
    expect: { verdict: 'no', tripped: ['G1'] }
  },
  {
    name: 'FAIL G2: on-site in the US, no sponsorship',
    answers: role({ onsite_outside_india_no_sponsorship: true }),
    expect: { verdict: 'no', tripped: ['G2'] }
  },
  {
    name: 'FAIL G3: owns production systems with a pager',
    answers: role({ ownership_level: 'production_scale' }),
    expect: { verdict: 'no', tripped: ['G3'] }
  },
  {
    name: 'FAIL G4: narrow specialist lane at a large company',
    answers: role({ scope_shape: 'narrow', C3: 1, C4: 1 }),
    expect: { verdict: 'no', tripped: ['G4'] }
  },
  {
    name: 'FAIL G5: execution against a fully specced brief',
    answers: role({ brief_fully_specced: true }),
    expect: { verdict: 'no', tripped: ['G5'] }
  },
  {
    name: 'FAIL G6: needs someone full-time before 2027',
    answers: role({ availability_need: 'full_time_before_2027' }),
    expect: { verdict: 'no', tripped: ['G6'] }
  },
  {
    name: 'multiple gates fail, all are reported',
    answers: role({ years_required: 8, onsite_outside_india_no_sponsorship: true }),
    expect: { verdict: 'no', tripped: ['G1', 'G2'] }
  },
  {
    name: 'CONDITIONAL: asks 3 years, everything else strong',
    answers: role({ years_required: 3 }),
    expect: { verdict: 'conditional', tripped: [], near: ['G1'] }
  },
  {
    name: 'CONDITIONAL: ships to users, defined scope, H1 2027 start',
    answers: role({
      ownership_level: 'ships_to_users',
      scope_shape: 'defined',
      availability_need: 'full_time_2027_h1'
    }),
    expect: { verdict: 'conditional', tripped: [], near: ['G3', 'G4', 'G6'] }
  },
  {
    name: 'gates clear but the work is a poor fit: weak band',
    answers: role({ C1: 1, C2: 1, C3: 2, C4: 1, C5: 1, C6: 0, C7: 1, C8: 2 }),
    expect: { verdict: 'weak', tripped: [], near: [] }
  },
  {
    name: 'gates clear, middling fit: partial band',
    answers: role({ C1: 6, C2: 5, C3: 5, C4: 5, C5: 5, C6: 5, C7: 5, C8: 5 }),
    expect: { verdict: 'partial', tripped: [], near: [] }
  },
  {
    name: 'early exit: G2 fails with every later question unanswered',
    answers: { years_required: 0, onsite_outside_india_no_sponsorship: true },
    expect: { verdict: 'no', tripped: ['G2'] }
  },
  {
    name: 'early exit: G1 fails on the very first question',
    answers: { years_required: 9 },
    expect: { verdict: 'no', tripped: ['G1'] }
  },
  {
    name: 'early exit: G6 fails midway, criteria never asked',
    answers: {
      years_required: 0,
      onsite_outside_india_no_sponsorship: false,
      ownership_level: 'prototype',
      scope_shape: 'broad',
      brief_fully_specced: false,
      availability_need: 'full_time_before_2027'
    },
    expect: { verdict: 'no', tripped: ['G6'] }
  },
  {
    name: 'a full survey that fails a gate still reports the work score',
    answers: role({ onsite_outside_india_no_sponsorship: true }),
    expect: { verdict: 'no', tripped: ['G2'], hasScore: true }
  },
  {
    name: 'a high work score never overturns a failed gate',
    answers: role({ availability_need: 'full_time_before_2027',
                    C1: 10, C2: 10, C3: 10, C4: 10, C5: 10, C6: 10, C7: 10, C8: 10 }),
    expect: { verdict: 'no', tripped: ['G6'], hasScore: true }
  },
  {
    name: 'INCOMPLETE only when nothing has failed',
    answers: { years_required: 0, onsite_outside_india_no_sponsorship: false },
    expect: { verdict: 'incomplete' }
  },
  {
    name: 'INCOMPLETE: missing availability and one criterion',
    answers: (function () { var a = role({}); delete a.availability_need; delete a.C5; return a; })(),
    expect: { verdict: 'incomplete', missingFields: ['availability_need', 'C5'] }
  }
];

var passed = 0, failed = 0;

cases.forEach(function (c) {
  try {
    var r = Screener.scoreRole(c.answers, rubric);
    assert.strictEqual(r.verdict, c.expect.verdict, 'verdict');

    if (c.expect.tripped) {
      assert.deepStrictEqual(r.gates_tripped.sort(), c.expect.tripped.slice().sort(), 'gates_tripped');
    }
    if (c.expect.near) {
      assert.deepStrictEqual(r.gates_near.sort(), c.expect.near.slice().sort(), 'gates_near');
    }
    if (c.expect.hasScore) {
      assert.ok(r.total !== null, 'expected a context score');
      assert.strictEqual(r.criteria_scores.length, 8, 'expected all criteria scored');
    }
    if (c.expect.missingFields) {
      var got = r.missing.map(function (m) { return m.field; }).sort();
      assert.deepStrictEqual(got, c.expect.missingFields.slice().sort(), 'missing');
    }
    // A tripped gate must produce "no" no matter how well the work scores.
    // The score may be reported as context; it must never change the verdict.
    if (r.gates_tripped && r.gates_tripped.length) {
      assert.strictEqual(r.verdict, 'no', 'a tripped gate must always mean no');
    }
    // On an early exit nothing was scored, so there is no total to report.
    if (r.verdict === 'no' && r.criteria_scores.length === 0) {
      assert.strictEqual(r.total, null, 'no criteria scored means no total');
    }
    console.log('  ok    ' + c.name);
    passed++;
  } catch (e) {
    console.log('  FAIL  ' + c.name + '\n          ' + e.message);
    failed++;
  }
});

/* The load-bearing property: the verdict must not depend on anything
   outside its inputs. Run the whole set twice and compare. */
try {
  cases.forEach(function (c) {
    var a = JSON.stringify(Screener.scoreRole(c.answers, rubric));
    var b = JSON.stringify(Screener.scoreRole(c.answers, rubric));
    assert.strictEqual(a, b, 'non-deterministic: ' + c.name);
  });
  console.log('  ok    determinism: identical input yields identical output');
  passed++;
} catch (e) {
  console.log('  FAIL  determinism\n          ' + e.message);
  failed++;
}

/* Every gate that can return NEAR must carry the wording for it, or the
   memo would have to invent a rejection. */
try {
  rubric.gates.forEach(function (g) {
    var states = g.rules.map(function (r) { return r.state; });
    if (states.indexOf('NEAR') !== -1) assert.ok(g.near_note, g.id + ' has NEAR but no near_note');
    if (states.indexOf('FAIL') !== -1) assert.ok(g.fail_note, g.id + ' has FAIL but no fail_note');
    if (states.indexOf('PASS') !== -1) assert.ok(g.pass_note, g.id + ' has PASS but no pass_note');
  });
  console.log('  ok    every gate carries its own explanation text');
  passed++;
} catch (e) {
  console.log('  FAIL  gate notes\n          ' + e.message);
  failed++;
}

console.log('\n  ' + passed + ' passed, ' + failed + ' failed  (' +
            Math.round((passed / (passed + failed)) * 100) + '% pass rate)');
process.exit(failed ? 1 : 0);

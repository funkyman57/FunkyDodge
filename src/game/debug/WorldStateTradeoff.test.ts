import assert from "node:assert/strict";
import test from "node:test";
import {
  activatorIsSeparated,
  formatPossibilityTable,
  formatTrace,
  measureActivatorOptional,
  measureCorrectOrder,
  measureDirectY,
  measureEarlyChange,
  measureRestore,
  measureSolidPair,
  possibilityRow,
  successfulSequenceAvoidsOverlapRefuse,
  tradeoffHasNoTimer,
} from "./WorldStateTradeoff";

test("W3-EXP-002: SOLID enables X and blocks Y", () => {
  const pair = measureSolidPair();
  const solid = possibilityRow("SOLID");
  assert.equal(solid.xPossible, true);
  assert.equal(solid.yPossible, false);
  assert.equal(pair.xOnSolid, true);
  assert.equal(pair.yOnSolid, false);
  assert.ok(pair.solidSupportY <= 400);
  assert.ok(pair.solidBlockX < 320);
});

test("W3-EXP-002: PASSABLE disables X and enables Y", () => {
  const pair = measureSolidPair();
  const passable = possibilityRow("PASSABLE");
  assert.equal(passable.xPossible, false);
  assert.equal(passable.yPossible, true);
  assert.equal(pair.xOnPassable, false);
  assert.equal(pair.yOnPassable, true);
  assert.ok(pair.passableFallY > 400);
  assert.ok(pair.passableTraverseX > 348);
});

test("W3-EXP-002: same state change produces both gain and loss", () => {
  const solid = possibilityRow("SOLID");
  const passable = possibilityRow("PASSABLE");
  assert.equal(solid.xPossible && !passable.xPossible, true);
  assert.equal(!solid.yPossible && passable.yPossible, true);
  const pair = measureSolidPair();
  assert.notEqual(pair.solidSupportY, pair.passableFallY);
  assert.notEqual(pair.solidBlockX, pair.passableTraverseX);
});

test("W3-EXP-002: X-first → change → Y is physically valid", () => {
  const trace = measureCorrectOrder();
  assert.equal(trace.xUsed, true);
  assert.equal(trace.yUsed, true);
  assert.equal(trace.combinedGoal, true);
  assert.equal(trace.overlapRefused, 0);
  assert.equal(trace.timerInvolved, false);
  assert.match(formatTrace(trace), /use X/);
});

test("W3-EXP-002: change-first → X is physically invalid", () => {
  const trace = measureEarlyChange();
  assert.equal(trace.xUsed, false);
  assert.equal(trace.xAvailableAfterChange, false);
  assert.equal(trace.yUsed, true);
  assert.equal(trace.combinedGoal, false);
});

test("W3-EXP-002: restoration returns X without a timer", () => {
  const trace = measureRestore();
  assert.equal(trace.restoredX, true);
  assert.equal(trace.xUsed, true);
  assert.equal(trace.overlapRefused, 0);
  assert.equal(tradeoffHasNoTimer(), true);
});

test("W3-EXP-002: PASSABLE is correct for a Y-only plan", () => {
  const trace = measureDirectY();
  assert.equal(trace.xUsed, false);
  assert.equal(trace.yUsed, true);
  assert.equal(trace.overlapRefused, 0);
});

test("W3-EXP-002: activator is optional and intentionally contactable", () => {
  const { avoid, idle } = measureActivatorOptional();
  assert.equal(avoid.transitions, 0);
  assert.equal(avoid.stateAfter, "SOLID");
  assert.equal(idle.transitions, 0);
  assert.equal(idle.autoChanged, false);
  assert.equal(activatorIsSeparated(), true);
  const change = measureCorrectOrder();
  assert.equal(change.overlapRefused, 0);
});

test("W3-EXP-002: successful sequences do not require overlap-refuse", () => {
  assert.equal(successfulSequenceAvoidsOverlapRefuse(), true);
});

test("W3-EXP-002: no new movement mechanic or forced corridor", () => {
  const table = formatPossibilityTable();
  assert.match(table, /SOLID/);
  assert.match(table, /PASSABLE/);
  assert.match(table, /YES/);
  assert.match(table, /NO/);
  const pair = measureSolidPair();
  assert.equal("wallJump" in pair, false);
  assert.equal("boost" in pair, false);
  assert.equal("charge" in pair, false);
});

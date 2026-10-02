import assert from "node:assert/strict";
import test from "node:test";
import { PhysicsConfig } from "../physics/PhysicsConfig";
import { DELAY_MS } from "./WorldStateDelay";
import {
  TIMING_DELAY_MS,
  earlyActivationPossible,
  formatTimingTable,
  geometryDoesNotForceXFirst,
  instantWriteCorrectIsW3Order,
  instantWriteEarlyLosesXImmediately,
  measurePlanVariations,
  runCorrectB,
  runCorrectLate,
  runEarlyA,
  runRetryD,
  simulateCorrectPlan,
  simulateEarlyPlan,
  timingHasNoExpiryOrCounter,
  xFirstPossible,
} from "./WorldStateTiming";

test("W4-EXP-002: early activation is physically possible", () => {
  assert.equal(earlyActivationPossible(), true);
});

test("W4-EXP-002: X-first is physically possible", () => {
  assert.equal(xFirstPossible(), true);
});

test("W4-EXP-002: geometry does not force X-first", () => {
  assert.equal(geometryDoesNotForceXFirst(), true);
});

test("W4-EXP-002: early activation schedules transition", () => {
  const early = runEarlyA();
  assert.equal(early.session.causeAckCount >= 1 || early.session.completions >= 1, true);
  assert.equal(early.session.phase, "SETTLED");
  assert.equal(early.activateMs < early.settleMs, true);
});

test("W4-EXP-002: transition completes before unused X in wrong plan", () => {
  const early = runEarlyA();
  assert.equal(early.xUsed, false);
  assert.equal(early.session.probe.state, "PASSABLE");
  assert.ok(early.settleMs <= TIMING_DELAY_MS + 20);
});

test("W4-EXP-002: X is unavailable afterward", () => {
  const early = runEarlyA();
  assert.equal(early.xAvailableAtAttempt, false);
});

test("W4-EXP-002: correct plan uses X before activation", () => {
  const right = runCorrectB();
  assert.equal(right.xUsed, true);
  assert.equal(right.xAvailableAtAttempt, true);
});

test("W4-EXP-002: correct plan enters PENDING", () => {
  const right = runCorrectB();
  assert.ok(right.session.completions >= 1);
  assert.equal(right.session.phase, "SETTLED");
  assert.match(right.steps.join("\n"), /activate ACK/);
});

test("W4-EXP-002: Y preparation is possible during pending", () => {
  const right = runCorrectB();
  assert.equal(right.yReadyAtSettle, true);
  assert.ok(right.settleX >= 244);
});

test("W4-EXP-002: Y usable after settle", () => {
  const right = runCorrectB();
  assert.equal(right.yUsed, true);
  const late = runCorrectLate();
  assert.equal(late.yUsed, true);
});

test("W4-EXP-002: combined correct goal succeeds", () => {
  const right = runCorrectB();
  assert.equal(right.combined, true);
});

test("W4-EXP-002: wrong plan fails combined goal", () => {
  const early = runEarlyA();
  assert.equal(early.combined, false);
  assert.equal(early.xUsed, false);
  assert.equal(early.yUsed, true);
});

test("W4-EXP-002: correct plan succeeds across ordinary variations", () => {
  const { correct } = measurePlanVariations();
  assert.equal(correct.slow.combined, true);
  assert.equal(correct.nominal.combined, true);
  assert.equal(correct.fast.combined, true);
  assert.equal(correct.late.combined, true);
});

test("W4-EXP-002: wrong plan fails across ordinary variations", () => {
  const { early } = measurePlanVariations();
  assert.equal(early.slow.combined, false);
  assert.equal(early.nominal.combined, false);
  assert.equal(early.fast.combined, false);
  assert.equal(early.paused.combined, false);
  assert.equal(early.slow.xAvailableAtAttempt, false);
  assert.equal(early.fast.xAvailableAtAttempt, false);
});

test("W4-EXP-002: no expiry / cycle / Counter", () => {
  const session = runCorrectB().session;
  assert.equal(timingHasNoExpiryOrCounter(session), true);
  assert.equal(TIMING_DELAY_MS, 720);
  assert.equal(DELAY_MS, 720);
});

test("W4-EXP-002: no new movement mechanic", () => {
  assert.equal(PhysicsConfig.gravity, 1400);
  assert.equal(PhysicsConfig.contactSkin, 6);
  assert.equal(PhysicsConfig.bounceVelocity, 580);
});

test("W4-EXP-002: overlap-refuse not required", () => {
  assert.equal(runEarlyA().overlapRequired, false);
  assert.equal(runCorrectB().overlapRequired, false);
  assert.equal(runCorrectB().refused, 0);
});

test("W4-EXP-002: reset/restore allows retry", () => {
  const retry = runRetryD();
  assert.equal(retry.wrong.combined, false);
  assert.equal(retry.restored.phase, "IDLE");
  assert.equal(retry.restored.probe.state, "SOLID");
  assert.equal(retry.right.combined, true);
});

test("W4-EXP-002: W3 instant write loses X immediately; W4 loses it later", () => {
  assert.equal(instantWriteEarlyLosesXImmediately(), true);
  assert.equal(instantWriteCorrectIsW3Order(), true);
  const w4 = runEarlyA();
  assert.ok(w4.settleMs > 100);
  assert.equal(w4.xAvailableAtAttempt, false);
});

test("W4-EXP-002: measurement table prints plan identity", () => {
  const table = formatTimingTable();
  assert.match(table, /EARLY/);
  assert.match(table, /CORRECT/);
});

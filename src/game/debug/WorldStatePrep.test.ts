import assert from "node:assert/strict";
import test from "node:test";
import { PhysicsConfig } from "../physics/PhysicsConfig";
import {
  DELAY_MS,
  acknowledgeCause,
  advanceDelay,
  createDelaySession,
  recontactWhilePending,
} from "./WorldStateDelay";
import {
  PREP_DELAY_MS,
  PREP_STAGING,
  PREP_STAGING_BOUNDS,
  PREP_VX,
  PREP_WAIT,
  attemptYFrom,
  extraTravelToStaging,
  formatPrepTable,
  immediateWriteHasNoPendingInterval,
  pendingCreatesPreparationInterval,
  prepHasNoNewMechanic,
  prepReadiness,
  prepTargetReachableDuringPending,
  runPrepA,
  runPrepB,
  runPrepC,
  runPrepD,
  simulatePrep,
  solidRoleDuringPrep,
} from "./WorldStatePrep";
import { WORLD_STATE_TRAVERSAL } from "./WorldStateProbe";

test("W4-EXP-001: pending interval still behaves as EXP-000", () => {
  const pending = acknowledgeCause();
  assert.equal(pending.phase, "PENDING");
  assert.equal(pending.probe.state, "SOLID");
  assert.equal(pending.causeAcknowledged, true);
  const done = advanceDelay(pending, 44);
  assert.equal(done.phase, "SETTLED");
  assert.equal(done.probe.state, "PASSABLE");
  assert.equal(PREP_DELAY_MS, DELAY_MS);
  assert.equal(DELAY_MS, 720);
});

test("W4-EXP-001: player can move during pending", () => {
  const a = runPrepA();
  assert.equal(a.session.phase, "SETTLED");
  assert.ok(a.settleX > PREP_WAIT.x);
  assert.equal(a.session.probe.state, "PASSABLE");
});

test("W4-EXP-001: preparation target is reachable during pending", () => {
  assert.equal(prepTargetReachableDuringPending(), true);
  const travel = extraTravelToStaging(PREP_WAIT.x);
  assert.ok(travel.frames * (1000 / 60) < PREP_DELAY_MS);
});

test("W4-EXP-001: prepared scenario reaches target before / by settle", () => {
  const a = runPrepA();
  assert.equal(a.readiness, "READY AT SETTLE");
  assert.ok(a.settleX >= PREP_STAGING_BOUNDS.left);
  assert.ok(a.settleX <= PREP_STAGING_BOUNDS.right);
  assert.equal(a.yReadyAtSettle, true);
});

test("W4-EXP-001: wait-control is not prepared at settle", () => {
  const b = runPrepB();
  assert.equal(b.readiness, "NOT READY");
  assert.equal(b.yReadyAtSettle, false);
  assert.equal(b.yImmediate, false);
  assert.ok(b.extraFramesToStaging > 0);
});

test("W4-EXP-001: PASSABLE persists after settle", () => {
  const later = simulatePrep("PREPARE", 60);
  assert.equal(later.session.phase, "SETTLED");
  assert.equal(later.session.probe.state, "PASSABLE");
  assert.equal(later.session.completions, 1);
});

test("W4-EXP-001: Y remains usable after settle", () => {
  const a = runPrepA();
  assert.equal(a.yImmediate, true);
  assert.equal(a.persistY, true);
  const later = simulatePrep("PREPARE", 60);
  assert.equal(attemptYFrom(later.settleX, later.settleY, later.session).traversed, true);
});

test("W4-EXP-001: no narrow completion window is required", () => {
  const immediate = runPrepA();
  const later = simulatePrep("PREPARE", 60);
  assert.equal(immediate.yImmediate, true);
  assert.equal(later.persistY, true);
  assert.equal(later.session.probe.state, "PASSABLE");
});

test("W4-EXP-001: no new movement mechanic is active", () => {
  const a = runPrepA();
  assert.equal(prepHasNoNewMechanic(a.session), true);
  assert.equal(PREP_VX, WORLD_STATE_TRAVERSAL.vx);
  assert.equal(PhysicsConfig.gravity, 1400);
  assert.equal(PhysicsConfig.contactSkin, 6);
});

test("W4-EXP-001: no expiry / cycle / Counter", () => {
  const session = createDelaySession();
  assert.equal("expiryMs" in session, false);
  assert.equal("cycle" in session, false);
  assert.equal("counter" in session, false);
  const persist = simulatePrep("WAIT", 80);
  assert.equal(persist.session.phase, "SETTLED");
  assert.equal(persist.session.probe.state, "PASSABLE");
  assert.equal(persist.session.completions, 1);
});

test("W4-EXP-001: reactivation while pending remains ignored", () => {
  const pending = advanceDelay(acknowledgeCause(), 12);
  const before = pending.progress;
  const again = recontactWhilePending(pending);
  assert.ok(again.ignoredReactivations >= 1);
  assert.equal(again.queuedEvents, 0);
  assert.ok(again.progress >= before);
  assert.equal(again.phase, "PENDING");
});

test("W4-EXP-001: reset restores baseline", () => {
  const pair = runPrepD();
  assert.equal(pair.first.yReadyAtSettle, pair.second.yReadyAtSettle);
  assert.equal(pair.first.settleX.toFixed(1), pair.second.settleX.toFixed(1));
  assert.equal(pair.second.readiness, "READY AT SETTLE");
});

test("W4-EXP-001: scenario A prepare during pending", () => {
  const a = runPrepA();
  assert.equal(a.policy, "PREPARE");
  assert.equal(a.yImmediate, true);
  assert.equal(a.extraFramesToStaging, 0);
});

test("W4-EXP-001: scenario B wait is not Y-ready", () => {
  const b = runPrepB();
  assert.equal(b.policy, "WAIT");
  assert.ok(Math.abs(b.settleX - PREP_WAIT.x) < 2);
  assert.equal(prepReadiness(b.settleX, b.settleY), "NOT READY");
});

test("W4-EXP-001: scenario C partial is nearly ready", () => {
  const c = runPrepC();
  assert.equal(c.policy, "PARTIAL");
  assert.equal(c.readiness, "NEARLY READY");
  assert.equal(c.yImmediate, false);
  assert.ok(c.extraFramesToStaging > 0);
  assert.ok(c.settleX > PREP_WAIT.x);
  assert.ok(c.settleX < PREP_STAGING.x);
});

test("W4-EXP-001: W4 vs W3 — immediate write has no pending interval", () => {
  assert.equal(immediateWriteHasNoPendingInterval(), true);
  assert.equal(pendingCreatesPreparationInterval(), true);
});

test("W4-EXP-001: current SOLID blocks premature Y during pending", () => {
  assert.equal(solidRoleDuringPrep(), "BLOCKS PREMATURE Y");
});

test("W4-EXP-001: measurement table prints", () => {
  const table = formatPrepTable();
  assert.match(table, /PREPARE/);
  assert.match(table, /WAIT/);
  assert.match(table, /PARTIAL/);
});

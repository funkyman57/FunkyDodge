import assert from "node:assert/strict";
import test from "node:test";
import { PhysicsConfig } from "../physics/PhysicsConfig";
import { PHYSICS_PRESETS } from "../physics/PhysicsTuning";
import { AGENCY_B_CAUSE, AGENCY_GRAMMAR } from "./WorldStateAgency";
import {
  DELAY_AWAY,
  DELAY_CONTACT,
  DELAY_DT_MS,
  DELAY_MS,
  acknowledgeCause,
  advanceDelay,
  createDelaySession,
  delayCauseFlight,
  delayCollidesLikeWorldState,
  delayHasNoExpiry,
  delayHasNoMovementMechanic,
  delayUsesExistingActivator,
  formatDelayTable,
  measureDelayTable,
  physicalAt,
  progressBand,
  recontactWhilePending,
  resetDelaySession,
  restoreDelayImmediately,
  runScenarioA,
  runScenarioB,
  runScenarioC,
  runScenarioD,
  runScenarioE,
  seekDelayProgress,
  stepDelay,
} from "./WorldStateDelay";
import { createWorldStateProbe } from "./WorldStateProbe";

test("W4-EXP-000: fresh contact enters PENDING", () => {
  const a = runScenarioA();
  assert.equal(a.session.phase, "PENDING");
  assert.equal(a.session.probe.state, "SOLID");
  assert.ok(a.session.progress > 0);
});

test("W4-EXP-000: cause is acknowledged immediately", () => {
  const a = runScenarioA();
  assert.equal(a.session.causeAcknowledged, true);
  assert.equal(a.session.causeAckCount, 1);
  assert.equal(a.session.futureState, "PASSABLE");
  assert.match(a.session.lastHud, /CAUSE ACK/);
});

test("W4-EXP-000: World State remains SOLID while pending", () => {
  const b = runScenarioB();
  assert.equal(b.session.phase, "PENDING");
  assert.equal(b.session.probe.state, "SOLID");
  assert.equal(delayCollidesLikeWorldState(b.session), true);
});

test("W4-EXP-000: progress is monotonic", () => {
  let session = acknowledgeCause();
  let previous = session.progress;
  for (let i = 0; i < 40; i += 1) {
    session = stepDelay(session, DELAY_AWAY.x, DELAY_AWAY.y, DELAY_DT_MS);
    assert.ok(session.progress >= previous, `frame ${i}: ${session.progress} < ${previous}`);
    previous = session.progress;
  }
});

test("W4-EXP-000: progress is deterministic", () => {
  const first = advanceDelay(acknowledgeCause(), 21);
  const second = advanceDelay(acknowledgeCause(), 21);
  assert.equal(first.progress, second.progress);
  assert.equal(first.elapsedMs, second.elapsedMs);
  assert.equal(first.phase, second.phase);
  assert.equal(first.probe.state, second.probe.state);
});

test("W4-EXP-000: mid-pending SUPPORT still works", () => {
  const b = runScenarioB();
  assert.equal(b.phys.xSupport, true);
  assert.ok(b.phys.supportY <= 400);
  assert.equal(b.session.probe.state, "SOLID");
});

test("W4-EXP-000: mid-pending TRAVERSAL is still blocked", () => {
  const b = runScenarioB();
  assert.equal(b.phys.yTraversal, false);
  assert.ok(b.phys.traversalX < 320);
});

test("W4-EXP-000: completion writes PASSABLE", () => {
  const done = advanceDelay(acknowledgeCause(), 44);
  assert.equal(done.phase, "SETTLED");
  assert.equal(done.probe.state, "PASSABLE");
  assert.equal(done.progress, 1);
  assert.equal(done.completions, 1);
  assert.equal(done.futureState, null);
  const phys = physicalAt(done.probe);
  assert.equal(phys.xSupport, false);
  assert.equal(phys.yTraversal, true);
});

test("W4-EXP-000: PASSABLE persists after completion", () => {
  const c = runScenarioC();
  assert.equal(c.session.phase, "SETTLED");
  assert.equal(c.session.probe.state, "PASSABLE");
  assert.equal(c.session.completions, 1);
  assert.equal(c.phys.yTraversal, true);
  assert.equal(c.phys.xSupport, false);
});

test("W4-EXP-000: reactivation while pending is ignored", () => {
  const d = runScenarioD();
  assert.equal(d.session.phase, "PENDING");
  assert.ok(d.session.ignoredReactivations >= 1);
  assert.equal(d.session.causeAckCount, 1);
  assert.equal(d.session.completions, 0);
});

test("W4-EXP-000: reactivation does not restart progress", () => {
  const pending = advanceDelay(acknowledgeCause(), 12);
  const before = pending.progress;
  const again = recontactWhilePending(pending);
  assert.ok(again.progress >= before);
  assert.ok(again.elapsedMs >= pending.elapsedMs);
  assert.notEqual(again.progress, 0);
  assert.equal(again.phase, "PENDING");
});

test("W4-EXP-000: no second event is queued", () => {
  const d = runScenarioD();
  assert.equal(d.session.queuedEvents, 0);
  const settled = advanceDelay(d.session, 50);
  assert.equal(settled.completions, 1);
  assert.equal(settled.queuedEvents, 0);
});

test("W4-EXP-000: no expiry / cycle / auto-revert exists", () => {
  const idle = createDelaySession();
  assert.equal(delayHasNoExpiry(idle), true);
  const persist = runScenarioC().session;
  assert.equal(persist.phase, "SETTLED");
  assert.equal(persist.probe.state, "PASSABLE");
  assert.equal(delayHasNoExpiry(persist), true);
});

test("W4-EXP-000: restore/reset returns diagnostic baseline", () => {
  const e = runScenarioE();
  assert.equal(e.session.phase, "IDLE");
  assert.equal(e.session.probe.state, "SOLID");
  assert.equal(e.session.progress, 0);
  assert.equal(e.session.futureState, null);
  assert.equal(e.phys.xSupport, true);
  assert.equal(e.phys.yTraversal, false);
  const reset = resetDelaySession(advanceDelay(acknowledgeCause(), 44), DELAY_AWAY.x, DELAY_AWAY.y);
  assert.equal(reset.phase, "IDLE");
  assert.equal(reset.probe.state, "SOLID");
  assert.equal(reset.causeAckCount, 0);
});

test("W4-EXP-000: no movement tuning changed", () => {
  assert.equal(PhysicsConfig.gravity, 1400);
  assert.equal(PhysicsConfig.bounceVelocity, 580);
  assert.equal(PhysicsConfig.horizontalAcceleration, 1400);
  assert.equal(PhysicsConfig.airAcceleration, 950);
  assert.equal(PhysicsConfig.airReverseAcceleration, 2200);
  assert.equal(PhysicsConfig.horizontalDrag, 500);
  assert.equal(PhysicsConfig.maxHorizontalSpeed, 420);
  assert.equal(PhysicsConfig.takeoffHorizontalVelocityMin, 180);
  assert.equal(PhysicsConfig.lowBounceFreshPressWindowMs, 130);
  assert.equal(PhysicsConfig.contactSkin, 6);
  assert.equal(PHYSICS_PRESETS.CURRENT.gravity, 1400);
  assert.equal(PHYSICS_PRESETS.CURRENT.bounceVelocity, 580);
  assert.equal(PHYSICS_PRESETS.DYNAMIC.bounceVelocity, 480);
});

test("W4-EXP-000: no new movement mechanic participates", () => {
  const session = acknowledgeCause();
  assert.equal(delayHasNoMovementMechanic(session), true);
  assert.equal(AGENCY_GRAMMAR, "TOGGLE");
  assert.equal(DELAY_MS, 720);
  assert.equal(delayUsesExistingActivator(), true);
  assert.equal("durationMs" in session.probe, false);
  assert.equal(session.probe.state === "SOLID" || session.probe.state === "PASSABLE", true);
});

test("W4-EXP-000: scenario A cause ack", () => {
  const a = runScenarioA();
  assert.equal(a.session.causeAcknowledged, true);
  assert.equal(a.session.phase, "PENDING");
  assert.equal(a.session.probe.state, "SOLID");
  assert.ok(a.session.progress > 0);
  assert.equal(progressBand(a.session.progress), "EARLY");
});

test("W4-EXP-000: scenario B mid-pending keeps W3 SOLID physics", () => {
  const b = runScenarioB();
  assert.equal(b.session.phase, "PENDING");
  assert.ok(b.session.progress > 0.3);
  assert.ok(b.session.progress < 0.7);
  assert.equal(b.session.probe.state, "SOLID");
  assert.equal(b.phys.xSupport, true);
  assert.equal(b.phys.yTraversal, false);
  assert.equal(progressBand(b.session.progress), "MID");
});

test("W4-EXP-000: scenario C completion persists", () => {
  const c = runScenarioC();
  assert.equal(c.session.phase, "SETTLED");
  assert.equal(c.session.probe.state, "PASSABLE");
  assert.equal(c.phys.xSupport, false);
  assert.equal(c.phys.yTraversal, true);
  assert.equal(progressBand(c.session.progress), "COMPLETE");
});

test("W4-EXP-000: scenario D ignore contract", () => {
  const d = runScenarioD();
  assert.ok(d.session.ignoredReactivations >= 1);
  assert.equal(d.session.queuedEvents, 0);
  assert.equal(d.session.phase, "PENDING");
});

test("W4-EXP-000: scenario E immediate restore is diagnostic recovery", () => {
  const e = runScenarioE();
  assert.equal(e.session.phase, "IDLE");
  assert.equal(e.session.probe.state, "SOLID");
  assert.equal(e.session.restores, 1);
  assert.match(e.session.lastHud, /RESTORE/);
});

test("W4-EXP-000: flight contact uses the existing Model B activator", () => {
  const flight = delayCauseFlight();
  assert.equal(flight.session.causeAcknowledged, true);
  assert.ok(flight.session.phase === "PENDING" || flight.session.phase === "SETTLED");
  assert.equal(flight.session.causeAckCount, 1);
  assert.deepEqual(
    { x: AGENCY_B_CAUSE.startX, y: AGENCY_B_CAUSE.startY },
    { x: 140, y: 450 },
  );
});

test("W4-EXP-000: seek is monotonic and completion matches write", () => {
  const pending = acknowledgeCause();
  const mid = seekDelayProgress(pending, 0.5);
  assert.equal(mid.phase, "PENDING");
  assert.equal(mid.probe.state, "SOLID");
  assert.ok(mid.progress >= 0.5);
  const done = seekDelayProgress(mid, 1);
  assert.equal(done.phase, "SETTLED");
  assert.equal(done.probe.state, "PASSABLE");
  const back = seekDelayProgress(done, 0);
  assert.equal(back.phase, "SETTLED");
  assert.equal(back.progress, 1);
});

test("W4-EXP-000: measurement table has the required shape", () => {
  const rows = measureDelayTable();
  const table = formatDelayTable(rows);
  assert.match(table, /IDLE/);
  assert.match(table, /PENDING early/);
  assert.match(table, /PENDING mid/);
  assert.match(table, /PENDING late/);
  assert.match(table, /SETTLED/);
  const idle = rows[0];
  const early = rows[1];
  const late = rows[3];
  const settled = rows[4];
  assert.equal(idle.physicalState, "SOLID");
  assert.equal(idle.xSupport, true);
  assert.equal(idle.yTraversal, false);
  assert.equal(early.physicalState, "SOLID");
  assert.equal(late.physicalState, "SOLID");
  assert.equal(late.xSupport, true);
  assert.equal(late.yTraversal, false);
  assert.equal(settled.physicalState, "PASSABLE");
  assert.equal(settled.xSupport, false);
  assert.equal(settled.yTraversal, true);
  assert.equal(settled.progress, 1);
});

test("W4-EXP-000: pending is not a third collision state", () => {
  const pending = acknowledgeCause();
  assert.equal(pending.probe.state, "SOLID");
  assert.equal(createWorldStateProbe("SOLID").state === pending.probe.state, true);
  assert.notEqual(pending.phase, pending.probe.state);
});

test("W4-EXP-000: contact pose is away from the probe", () => {
  assert.ok(DELAY_CONTACT.x < 200);
  assert.ok(DELAY_CONTACT.x + 16 < 320);
});

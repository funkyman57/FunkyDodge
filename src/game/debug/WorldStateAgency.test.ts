import assert from "node:assert/strict";
import test from "node:test";
import {
  AGENCY_GRAMMAR,
  activatorAndProbeSeparated,
  createAgencySession,
  formatAgencyTable,
  measureModelA,
  measureModelB,
  modelAAvoidability,
  modelBAvoidability,
  resetAgencySession,
  simulateAgencyAttempt,
  stepAgency,
} from "./WorldStateAgency";
import { playerAabb, probeCollides } from "./WorldStateProbe";

test("W3-EXP-001 A: one fresh intentional contact → one transition", () => {
  const { cause, hold } = measureModelA();
  assert.equal(cause.contactEvents, 1);
  assert.equal(cause.transitions, 1);
  assert.equal(cause.stateBefore, "SOLID");
  assert.equal(cause.stateAfter, "PASSABLE");
  assert.equal(cause.autoChanged, false);
  assert.ok(hold.maxContactFrames > 1);
  assert.equal(hold.transitions, 1);
});

test("W3-EXP-001 A: avoid path and top-use keep state unchanged", () => {
  const { avoid, use } = measureModelA();
  assert.equal(avoid.contactEvents, 0);
  assert.equal(avoid.transitions, 0);
  assert.equal(avoid.stateAfter, "SOLID");
  assert.equal(use.contactEvents, 0);
  assert.equal(use.transitions, 0);
  assert.equal(use.stateAfter, "SOLID");
  assert.equal(modelAAvoidability(), "CONDITIONALLY OPTIONAL");
});

test("W3-EXP-001 A: recovery restores SOLID when approach is clear", () => {
  const { restore } = measureModelA();
  assert.equal(restore.stateBefore, "PASSABLE");
  assert.equal(restore.stateAfter, "SOLID");
  assert.equal(restore.transitions, 1);
  assert.equal(restore.refused, 0);
});

test("W3-EXP-001 A: overlapping re-solidify is refused, not teleported", () => {
  const { overlapRefuse } = measureModelA();
  assert.equal(overlapRefuse.stateAfter, "PASSABLE");
  assert.ok(overlapRefuse.refused >= 1);
  assert.equal(overlapRefuse.transitions, 0);
});

test("W3-EXP-001 B: one fresh contact → one transition, avoid and use stay SOLID", () => {
  const { cause, avoid, use, hold } = measureModelB();
  assert.equal(cause.contactEvents, 1);
  assert.equal(cause.transitions, 1);
  assert.equal(cause.stateAfter, "PASSABLE");
  assert.equal(avoid.contactEvents, 0);
  assert.equal(avoid.stateAfter, "SOLID");
  assert.equal(use.contactEvents, 0);
  assert.equal(use.stateAfter, "SOLID");
  assert.ok(hold.maxContactFrames > 1);
  assert.equal(hold.transitions, 1);
  assert.equal(modelBAvoidability(), "CLEARLY OPTIONAL");
  assert.equal(activatorAndProbeSeparated(), true);
});

test("W3-EXP-001 B: recovery restores and idle does not auto-change", () => {
  const { restore, idle } = measureModelB();
  assert.equal(restore.stateBefore, "PASSABLE");
  assert.equal(restore.stateAfter, "SOLID");
  assert.equal(restore.transitions, 1);
  assert.equal(idle.contactEvents, 0);
  assert.equal(idle.transitions, 0);
  assert.equal(idle.autoChanged, false);
  assert.equal(idle.stateAfter, "SOLID");
});

test("W3-EXP-001: re-contact after departure is a second event, not a multi-frame duplicate", () => {
  const a = measureModelA().recontact;
  const b = measureModelB().recontact;
  assert.ok(a.contactEvents >= 2);
  assert.ok(b.contactEvents >= 2);
  assert.equal(a.contactEvents, a.transitions + a.refused);
  assert.equal(b.contactEvents, b.transitions);
});

test("W3-EXP-001: repeated interaction is deterministic", () => {
  const first = simulateAgencyAttempt({
    model: "B",
    scenario: "CAUSE",
    startX: 140,
    startY: 450,
    vx: -280,
    vy: 0,
    frames: 36,
  });
  const second = simulateAgencyAttempt({
    model: "B",
    scenario: "RESTORE",
    startState: "PASSABLE",
    startX: 140,
    startY: 450,
    vx: -280,
    vy: 0,
    frames: 36,
  });
  const firstAgain = simulateAgencyAttempt({
    model: "B",
    scenario: "CAUSE",
    startX: 140,
    startY: 450,
    vx: -280,
    vy: 0,
    frames: 36,
  });
  assert.equal(first.stateAfter, "PASSABLE");
  assert.equal(second.stateAfter, "SOLID");
  assert.equal(firstAgain.stateAfter, first.stateAfter);
  assert.equal(first.contactEvents, firstAgain.contactEvents);
});

test("W3-EXP-001: state change alters actual probe collision, not a visual flag", () => {
  const { cause } = measureModelB();
  assert.equal(cause.probeStillPhysical, true);
  assert.equal(cause.stateAfter, "PASSABLE");
  const session = createAgencySession("B", "PASSABLE");
  assert.equal(probeCollides(session.probe), false);
  const restored = createAgencySession("B", "SOLID");
  assert.equal(probeCollides(restored.probe), true);
});

test("W3-EXP-001: no timer, new input, or movement mechanic on the agency session", () => {
  const session = createAgencySession("B");
  assert.equal(AGENCY_GRAMMAR, "TOGGLE");
  assert.equal("durationMs" in session, false);
  assert.equal("cooldownMs" in session, false);
  assert.equal("interact" in session, false);
  assert.equal("bounceType" in session, false);
  const occupant = playerAabb(220, 160);
  const reset = resetAgencySession(session, occupant);
  assert.equal(reset.probe.state, "SOLID");
  assert.equal(reset.risingEdges, 0);
  const held = stepAgency(reset, 220, 160);
  assert.equal(held.probe.state, "SOLID");
  assert.equal(held.transitions, 0);
});

test("W3-EXP-001: no contact → no transition, and OFF never fires", () => {
  const none = simulateAgencyAttempt({
    model: "B",
    scenario: "AVOID",
    startX: 400,
    startY: 200,
    vx: 0,
    vy: 0,
    frames: 24,
  });
  assert.equal(none.contactEvents, 0);
  assert.equal(none.transitions, 0);
  const off = simulateAgencyAttempt({
    model: "OFF",
    scenario: "CAUSE",
    startX: 260,
    startY: 450,
    vx: 280,
    vy: 0,
    frames: 36,
  });
  assert.equal(off.contactEvents, 0);
  assert.equal(off.stateAfter, "SOLID");
});

test("W3-EXP-001: measured tables print and overlap policy stays REFUSE", () => {
  const a = measureModelA();
  const b = measureModelB();
  const tableA = formatAgencyTable([a.cause, a.avoid, a.restore, a.use]);
  const tableB = formatAgencyTable([b.cause, b.avoid, b.restore, b.use]);
  assert.match(tableA, /CAUSE/);
  assert.match(tableB, /RESTORE/);
  assert.equal(createAgencySession("A").overlapPolicy, "REFUSE");
  assert.equal(a.overlapRefuse.stateAfter, "PASSABLE");
});

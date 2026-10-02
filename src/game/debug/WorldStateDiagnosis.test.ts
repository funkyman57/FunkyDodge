import assert from "node:assert/strict";
import test from "node:test";
import { PhysicsConfig } from "../physics/PhysicsConfig";
import { DELAY_MS } from "./WorldStateDelay";
import {
  DIAGNOSIS_DELAY_MS,
  diagnoseFromFacts,
  diagnosisHasNoSecondMechanic,
  formatDiagnosisMatrix,
  runDiagnosisRetry,
  sameDelayUsed,
  sameProbeActivatorRelation,
  simulateSuccessControl,
  simulateWrongPreparation,
  simulateWrongState,
  simulateWrongTiming,
  yAttemptDiffersOnlyByState,
} from "./WorldStateDiagnosis";

test("W4-EXP-003: wrong-state scenario attempts Y while SOLID", () => {
  const state = simulateWrongState();
  assert.equal(state.facts.yAttempted, true);
  assert.equal(state.facts.stateAtYAttempt, "SOLID");
  assert.equal(state.session.phase, "PENDING");
});

test("W4-EXP-003: wrong-state traversal is blocked", () => {
  const state = simulateWrongState();
  assert.equal(state.facts.yTraversedAtAttempt, false);
  assert.equal(state.combined, false);
});

test("W4-EXP-003: wrong-state failure does not require early cause", () => {
  const state = simulateWrongState();
  assert.equal(state.facts.xUsed, true);
  assert.equal(state.facts.causedAfterX, true);
  assert.equal(state.causeTimingCorrect, true);
  assert.equal(state.prepared, true);
  assert.equal(state.facts.xAvailableAtObservation, true);
  assert.equal(diagnoseFromFacts(state.facts), "WRONG STATE");
});

test("W4-EXP-003: wrong-timing scenario causes too early", () => {
  const timing = simulateWrongTiming();
  assert.equal(timing.facts.causedAfterX, false);
  assert.equal(timing.causeTimingCorrect, false);
  assert.ok(timing.activateMs < timing.observeMs);
});

test("W4-EXP-003: wrong-timing loses X before use", () => {
  const timing = simulateWrongTiming();
  assert.equal(timing.facts.xUsed, false);
  assert.equal(timing.facts.xAvailableAtObservation, false);
  assert.equal(timing.session.probe.state, "PASSABLE");
});

test("W4-EXP-003: wrong-timing does not depend on missing Y prep", () => {
  const timing = simulateWrongTiming();
  assert.equal(timing.facts.yAvailableAfter, true);
  assert.equal(timing.combined, false);
  assert.equal(diagnoseFromFacts(timing.facts), "WRONG TIMING");
});

test("W4-EXP-003: wrong-preparation uses X correctly", () => {
  const prep = simulateWrongPreparation();
  assert.equal(prep.facts.xUsed, true);
});

test("W4-EXP-003: wrong-preparation cause timing is valid", () => {
  const prep = simulateWrongPreparation();
  assert.equal(prep.facts.causedAfterX, true);
  assert.equal(prep.causeTimingCorrect, true);
});

test("W4-EXP-003: state reaches PASSABLE", () => {
  const prep = simulateWrongPreparation();
  assert.equal(prep.facts.stateAtObservation, "PASSABLE");
  assert.equal(prep.session.phase, "SETTLED");
});

test("W4-EXP-003: player is not Y-ready at settle", () => {
  const prep = simulateWrongPreparation();
  assert.equal(prep.facts.yReadyAtObservation, false);
  assert.equal(prep.readiness, "NOT READY");
  assert.ok(prep.extraFramesToY > 8);
  assert.equal(diagnoseFromFacts(prep.facts), "WRONG PREPARATION");
});

test("W4-EXP-003: success control is Y-ready", () => {
  const success = simulateSuccessControl();
  assert.equal(success.prepared, true);
  assert.equal(success.facts.yReadyAtObservation, true);
});

test("W4-EXP-003: success control traverses", () => {
  const success = simulateSuccessControl();
  assert.equal(success.facts.yTraversedAtAttempt, true);
  assert.equal(success.combined, true);
  assert.equal(diagnoseFromFacts(success.facts), "NONE");
});

test("W4-EXP-003: same delay used in all scenarios", () => {
  const rows = [
    simulateWrongState(),
    simulateWrongTiming(),
    simulateWrongPreparation(),
    simulateSuccessControl(),
  ];
  assert.equal(sameDelayUsed(...rows), true);
  assert.equal(DIAGNOSIS_DELAY_MS, 720);
  assert.equal(DELAY_MS, 720);
});

test("W4-EXP-003: same probe/activator relation used", () => {
  assert.equal(sameProbeActivatorRelation(), true);
});

test("W4-EXP-003: no expiry", () => {
  const success = simulateSuccessControl();
  assert.equal(diagnosisHasNoSecondMechanic(success.session), true);
  assert.equal(simulateWrongPreparation().facts.yAvailableAfter, true);
});

test("W4-EXP-003: no Counter / cycle", () => {
  for (const row of [
    simulateWrongState(),
    simulateWrongTiming(),
    simulateWrongPreparation(),
    simulateSuccessControl(),
  ]) {
    assert.equal(row.session.queuedEvents, 0);
    assert.ok(row.session.ignoredReactivations >= 0);
  }
});

test("W4-EXP-003: overlap-refuse not required", () => {
  assert.equal(simulateWrongState().overlapRequired, false);
  assert.equal(simulateWrongTiming().overlapRequired, false);
  assert.equal(simulateWrongPreparation().overlapRequired, false);
  assert.equal(simulateSuccessControl().overlapRequired, false);
});

test("W4-EXP-003: movement constants unchanged", () => {
  assert.equal(PhysicsConfig.gravity, 1400);
  assert.equal(PhysicsConfig.contactSkin, 6);
  assert.equal(PhysicsConfig.bounceVelocity, 580);
});

test("W4-EXP-003: diagnoses stay orthogonal", () => {
  assert.equal(simulateWrongState().diagnosis, "WRONG STATE");
  assert.equal(simulateWrongTiming().diagnosis, "WRONG TIMING");
  assert.equal(simulateWrongPreparation().diagnosis, "WRONG PREPARATION");
  assert.equal(simulateSuccessControl().diagnosis, "NONE");
  assert.equal(yAttemptDiffersOnlyByState(), true);
});

test("W4-EXP-003: reset/restore allows retry", () => {
  const retry = runDiagnosisRetry();
  assert.equal(retry.wrong.diagnosis, "WRONG TIMING");
  assert.equal(retry.restored.phase, "IDLE");
  assert.equal(retry.restored.probe.state, "SOLID");
  assert.equal(retry.success.diagnosis, "NONE");
  assert.equal(retry.success.combined, true);
});

test("W4-EXP-003: diagnosis matrix prints physical columns", () => {
  const table = formatDiagnosisMatrix();
  assert.match(table, /WRONG STATE/);
  assert.match(table, /WRONG TIMING/);
  assert.match(table, /WRONG PREPARATION/);
  assert.match(table, /SUCCESS/);
});

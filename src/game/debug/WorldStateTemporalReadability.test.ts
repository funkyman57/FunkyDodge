import assert from "node:assert/strict";
import test from "node:test";
import { PhysicsConfig } from "../physics/PhysicsConfig";
import { DELAY_MS, acknowledgeCause, createDelaySession } from "./WorldStateDelay";
import {
  CONFOUND_FLAGS,
  GHOST_AID_CLASSES,
  HUMAN_PROTOCOL,
  LEADING_QUESTIONS,
  PERCEPTION_FORBIDDEN,
  PROGRESS_CUE_CLASS,
  TEMPORAL_DELAY_MS,
  knownFixturesUnchanged,
  measureT1CurrentVsFuture,
  measureT2CauseLink,
  measureT3Progress,
  measureT4Orders,
  measureT5Cases,
  perceptionContainsForbidden,
  perceptionHidesDiagnosisLabels,
  perceptionHudLines,
  perceptionModeHidesAnswers,
  protocolIsNonLeading,
  resetRestoresBaseline,
  scenarioDimension,
  seedSession,
  temporalHasSameRelation,
  temporalHudLines,
} from "./WorldStateTemporalReadability";

test("W4-EXP-004A: T1 scenario retains current/future distinction", () => {
  const t1 = measureT1CurrentVsFuture();
  assert.equal(scenarioDimension("A"), "T1");
  assert.equal(t1.current, "SOLID");
  assert.equal(t1.future, "PASSABLE");
  assert.equal(t1.phase, "PENDING");
  assert.equal(t1.distinct, true);
  assert.equal(t1.stillSolid, true);
});

test("W4-EXP-004A: T2 activator actually causes the pending relation", () => {
  const t2 = measureT2CauseLink();
  assert.equal(scenarioDimension("B"), "T2");
  assert.equal(t2.idlePhase, "IDLE");
  assert.equal(t2.causedPhase, "PENDING");
  assert.equal(t2.ack, true);
  assert.equal(t2.links, true);
  assert.equal(t2.stillSolid, true);
});

test("W4-EXP-004A: T3 progress is monotonic", () => {
  const t3 = measureT3Progress();
  assert.equal(scenarioDimension("C"), "T3");
  assert.equal(t3.monotonic, true);
  assert.equal(t3.stillPending, true);
  assert.deepEqual(t3.bands, ["EARLY", "MID", "LATE"]);
});

test("W4-EXP-004A: T4 both orders are physically possible", () => {
  const t4 = measureT4Orders();
  assert.equal(scenarioDimension("D"), "T4");
  assert.equal(t4.earlyPossible, true);
  assert.equal(t4.xFirstPossible, true);
  assert.equal(t4.geometryOpen, true);
});

test("W4-EXP-004A: T4 early cause loses X", () => {
  assert.equal(measureT4Orders().earlyLosesX, true);
});

test("W4-EXP-004A: T4 X-first succeeds", () => {
  assert.equal(measureT4Orders().xFirstSucceeds, true);
});

test("W4-EXP-004A: T5 state case facts are correct", () => {
  const { state } = measureT5Cases();
  assert.equal(scenarioDimension("E"), "T5");
  assert.equal(state.diagnosis, "WRONG STATE");
  assert.equal(state.yBlockedWhileSolid, true);
  assert.equal(state.timingOk, true);
});

test("W4-EXP-004A: T5 timing case facts are correct", () => {
  const { timing } = measureT5Cases();
  assert.equal(timing.diagnosis, "WRONG TIMING");
  assert.equal(timing.lostX, true);
  assert.equal(timing.yAvailable, true);
});

test("W4-EXP-004A: T5 prep case facts are correct", () => {
  const { prep, success } = measureT5Cases();
  assert.equal(prep.diagnosis, "WRONG PREPARATION");
  assert.equal(prep.passable, true);
  assert.equal(prep.notReady, true);
  assert.equal(prep.timingOk, true);
  assert.equal(success, true);
});

test("W4-EXP-004A: Perception mode hides answer text", () => {
  assert.equal(perceptionModeHidesAnswers(), true);
  assert.equal(perceptionContainsForbidden(perceptionHudLines("A")), false);
  assert.equal(perceptionContainsForbidden(perceptionHudLines("D")), false);
  const hidden = temporalHudLines("PERCEPTION", {
    scenario: "C",
    session: seedSession("C"),
    x: 200,
    y: 300,
    xUsed: false,
  });
  assert.deepEqual(hidden, ["C"]);
  assert.ok(PERCEPTION_FORBIDDEN.includes("PENDING"));
  assert.ok(PERCEPTION_FORBIDDEN.includes("WRONG STATE"));
});

test("W4-EXP-004A: Perception mode does not show diagnosis labels", () => {
  assert.equal(perceptionHidesDiagnosisLabels(), true);
});

test("W4-EXP-004A: no expiry", () => {
  const pending = acknowledgeCause(createDelaySession("SOLID"));
  assert.equal(temporalHasSameRelation(pending), true);
});

test("W4-EXP-004A: no Counter", () => {
  assert.equal(acknowledgeCause().queuedEvents, 0);
});

test("W4-EXP-004A: no cycle", () => {
  const session = acknowledgeCause();
  assert.equal("cycle" in session, false);
  assert.equal("countdown" in session, false);
});

test("W4-EXP-004A: same 720ms relation", () => {
  assert.equal(TEMPORAL_DELAY_MS, 720);
  assert.equal(DELAY_MS, 720);
  assert.equal(measureT1CurrentVsFuture().delayMs, 720);
  assert.equal(knownFixturesUnchanged(), true);
});

test("W4-EXP-004A: no movement tuning", () => {
  assert.equal(PhysicsConfig.gravity, 1400);
  assert.equal(PhysicsConfig.bounceVelocity, 580);
  assert.equal(PhysicsConfig.contactSkin, 6);
});

test("W4-EXP-004A: overlap-refuse not required", () => {
  assert.equal(measureT5Cases().state.diagnosis, "WRONG STATE");
  assert.equal(measureT4Orders().xFirstSucceeds, true);
});

test("W4-EXP-004A: reset restores baseline", () => {
  const restored = resetRestoresBaseline();
  assert.equal(restored.phase, "IDLE");
  assert.equal(restored.probe.state, "SOLID");
  assert.equal(restored.progress, 0);
  assert.equal(restored.futureState, null);
});

test("W4-EXP-004A: progress cue and aids are classified", () => {
  assert.equal(PROGRESS_CUE_CLASS.perceptionFillAndTicks, "PERCEPTION-SAFE");
  assert.equal(PROGRESS_CUE_CLASS.instrumentedPercent, "INSTRUMENTED-ONLY");
  assert.equal(PROGRESS_CUE_CLASS.chevronCount, "TOO LEADING");
  assert.equal(GHOST_AID_CLASSES["subtle contact flash"], "PERCEPTION-SAFE");
  assert.equal(GHOST_AID_CLASSES["exact future target ghost"], "TOO LEADING");
  assert.equal(CONFOUND_FLAGS.includes("MOVEMENT MISS"), true);
  assert.equal(protocolIsNonLeading(), true);
  assert.ok(HUMAN_PROTOCOL.length >= 6);
  assert.ok(LEADING_QUESTIONS.length >= 3);
});

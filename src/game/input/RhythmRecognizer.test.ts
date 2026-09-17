import assert from "node:assert/strict";
import test from "node:test";
import { applyRhythmTiming, LowInputExperiment, RHYTHM_TIMING_DEFAULTS } from "./LowInputExperiment";
import { applyPhysicsTuning, PHYSICS_PRESETS, readPhysicsTuning } from "../physics/PhysicsTuning";
import { RhythmRecognizer } from "./RhythmRecognizer";
import { resolveFloorBounce } from "../physics/BounceController";
import type { BounceInput } from "../physics/BounceController";

function input(partial: Partial<BounceInput>): BounceInput {
  return {
    leftDown: false,
    rightDown: false,
    leftPressedAt: null,
    rightPressedAt: null,
    leftReleasedAt: null,
    rightReleasedAt: null,
    lastHorizontalDirection: 0,
    ...partial,
  };
}

function start(): RhythmRecognizer {
  applyRhythmTiming(RHYTHM_TIMING_DEFAULTS);
  return new RhythmRecognizer();
}

function play(
  recognizer: RhythmRecognizer,
  steps: Array<{
    t: number;
    left?: boolean;
    right?: boolean;
    land?: boolean;
    wall?: boolean;
    preview?: boolean;
  }>,
) {
  let left = false;
  let right = false;
  const landings: ReturnType<RhythmRecognizer["commitLanding"]>[] = [];
  const previews: ReturnType<RhythmRecognizer["preview"]>[] = [];
  for (const step of steps) {
    if (step.left !== undefined) {
      left = step.left;
    }
    if (step.right !== undefined) {
      right = step.right;
    }
    recognizer.update(step.t, left, right);
    if (step.wall) {
      recognizer.onWallJump(step.t);
    }
    if (step.preview) {
      previews.push(recognizer.preview(step.t));
    }
    if (step.land) {
      landings.push(recognizer.commitLanding(step.t));
    }
  }
  return { landings, previews };
}

test("RHYTHM Entry: double tap before landing is LOW and chain ON", () => {
  const recognizer = start();
  const { landings } = play(recognizer, [
    { t: 0, right: true },
    { t: 40, right: false },
    { t: 100, right: true },
    { t: 125, right: false },
    { t: 160, land: true },
  ]);
  assert.equal(landings[0]?.type, "LOW");
  assert.equal(recognizer.lastDecisionReason, "DOUBLE_TAP_ENTRY");
  assert.equal(recognizer.lowChainActive, true);
});

test("RHYTHM Single tap outside chain is NORMAL", () => {
  const recognizer = start();
  const { landings } = play(recognizer, [
    { t: 100, right: true },
    { t: 125, right: false },
    { t: 160, land: true },
  ]);
  assert.equal(landings[0]?.type, "NORMAL");
  assert.equal(recognizer.lastDecisionReason, "NO_REQUEST");
  assert.equal(recognizer.lowChainActive, false);
});

test("RHYTHM Hold override of second press is BOOST and does not resurrect LOW", () => {
  const recognizer = start();
  const { landings, previews } = play(recognizer, [
    { t: 0, right: true },
    { t: 40, right: false },
    { t: 100, right: true },
    { t: 260, preview: true },
    { t: 300, land: true },
  ]);
  assert.equal(previews[0]?.type, "BOOST");
  assert.equal(previews[0]?.pending, "NONE");
  assert.equal(recognizer.lastClearReason === "HOLD_OVERRIDE" || previews[0]?.reason === "SUSTAINED_HOLD", true);
  assert.equal(landings[0]?.type, "BOOST");
  assert.equal(recognizer.lastDecisionReason, "SUSTAINED_HOLD");
});

test("RHYTHM Release after request still lands LOW", () => {
  const recognizer = start();
  const { landings } = play(recognizer, [
    { t: 0, right: true },
    { t: 40, right: false },
    { t: 100, right: true },
    { t: 125, right: false },
    { t: 160, land: true },
  ]);
  assert.equal(landings[0]?.type, "LOW");
});

test("RHYTHM Released hold does not queue BOOST", () => {
  const recognizer = start();
  const { landings } = play(recognizer, [
    { t: 0, right: true },
    { t: 180, right: false },
    { t: 200, land: true },
  ]);
  assert.equal(landings[0]?.type, "NORMAL");
  assert.equal(recognizer.lastDecisionReason, "NO_REQUEST");
});

test("RHYTHM Continuation tap while chain ON is LOW", () => {
  const recognizer = start();
  recognizer.lowChainActive = true;
  const { landings } = play(recognizer, [
    { t: 0, right: true },
    { t: 20, right: false },
    { t: 100, land: true },
  ]);
  assert.equal(landings[0]?.type, "LOW");
  assert.equal(recognizer.lastDecisionReason, "RHYTHM_CONTINUE");
  assert.equal(recognizer.lowChainActive, true);
});

test("RHYTHM Opposite continuation is LOW without snapping velocity", () => {
  const recognizer = start();
  recognizer.lowChainActive = true;
  const { landings } = play(recognizer, [
    { t: 0, left: true },
    { t: 20, left: false },
    { t: 100, land: true },
  ]);
  assert.equal(landings[0]?.type, "LOW");
  assert.equal(landings[0]?.applyHorizontalBoost, false);
});

test("RHYTHM Expired continuation request is NORMAL and turns chain OFF", () => {
  const recognizer = start();
  recognizer.lowChainActive = true;
  const { landings } = play(recognizer, [
    { t: 0, right: true },
    { t: 20, right: false },
    { t: 141, land: true },
  ]);
  assert.equal(landings[0]?.type, "NORMAL");
  assert.equal(recognizer.lowChainActive, false);
});

test("RHYTHM Buffer boundary landing140 is LOW", () => {
  const recognizer = start();
  recognizer.lowChainActive = true;
  const { landings } = play(recognizer, [
    { t: 0, right: true },
    { t: 20, right: false },
    { t: 140, land: true },
  ]);
  assert.equal(landings[0]?.type, "LOW");
});

test("RHYTHM Hold boundary landing160 is BOOST", () => {
  const recognizer = start();
  const { landings } = play(recognizer, [
    { t: 0, right: true },
    { t: 160, land: true },
  ]);
  assert.equal(landings[0]?.type, "BOOST");
});

test("RHYTHM Pair boundary down at 220 is LOW", () => {
  const recognizer = start();
  const { landings } = play(recognizer, [
    { t: 0, right: true },
    { t: 30, right: false },
    { t: 220, right: true },
    { t: 230, right: false },
    { t: 240, land: true },
  ]);
  assert.equal(landings[0]?.type, "LOW");
});

test("RHYTHM Pair too late down at 221 is NORMAL", () => {
  const recognizer = start();
  const { landings } = play(recognizer, [
    { t: 0, right: true },
    { t: 30, right: false },
    { t: 221, right: true },
    { t: 230, right: false },
    { t: 240, land: true },
  ]);
  assert.equal(landings[0]?.type, "NORMAL");
});

test("RHYTHM Pair across landing cannot entry", () => {
  const recognizer = start();
  const { landings } = play(recognizer, [
    { t: 0, right: true },
    { t: 30, right: false },
    { t: 60, land: true },
    { t: 100, right: true },
    { t: 120, right: false },
    { t: 160, land: true },
  ]);
  assert.equal(landings[0]?.type, "NORMAL");
  assert.equal(landings[1]?.type, "NORMAL");
});

test("RHYTHM Alternating pair is not an entry", () => {
  const recognizer = start();
  const { landings } = play(recognizer, [
    { t: 0, left: true },
    { t: 30, left: false },
    { t: 100, right: true },
    { t: 120, right: false },
    { t: 160, land: true },
  ]);
  assert.equal(landings[0]?.type, "NORMAL");
});

test("RHYTHM Multiple continuation taps produce one LOW then NORMAL", () => {
  const recognizer = start();
  recognizer.lowChainActive = true;
  const { landings } = play(recognizer, [
    { t: 0, right: true },
    { t: 10, right: false },
    { t: 30, right: true },
    { t: 40, right: false },
    { t: 60, right: true },
    { t: 70, right: false },
    { t: 100, land: true },
    { t: 300, land: true },
  ]);
  assert.equal(landings[0]?.type, "LOW");
  assert.equal(landings[1]?.type, "NORMAL");
});

test("RHYTHM Alias overlap does not create a second logical tap", () => {
  const recognizer = start();
  recognizer.update(0, true, false);
  recognizer.update(40, true, false);
  recognizer.update(50, false, false);
  const landing = recognizer.commitLanding(160);
  assert.equal(landing.type, "NORMAL");
  assert.notEqual(recognizer.lastDecisionReason, "DOUBLE_TAP_ENTRY");
});

test("RHYTHM OS repeats do not create entry or continuation", () => {
  const recognizer = start();
  for (const t of [0, 16, 32, 48, 160]) {
    recognizer.update(t, false, true);
  }
  const landing = recognizer.commitLanding(160);
  assert.equal(landing.type, "BOOST");
});

test("RHYTHM Conflict cancels pending and lands NORMAL", () => {
  const recognizer = start();
  const { landings } = play(recognizer, [
    { t: 0, right: true },
    { t: 40, right: false },
    { t: 100, right: true },
    { t: 110, left: true, right: true },
    { t: 160, land: true },
  ]);
  assert.equal(landings[0]?.type, "NORMAL");
  assert.equal(recognizer.lastDecisionReason, "CONFLICT");
});

test("RHYTHM Wall jump clears request so later landing is not inherited LOW", () => {
  const recognizer = start();
  recognizer.lowChainActive = true;
  const { landings } = play(recognizer, [
    { t: 0, right: true },
    { t: 20, right: false },
    { t: 40, wall: true },
    { t: 80, land: true },
  ]);
  assert.equal(landings[0]?.type, "NORMAL");
  assert.equal(recognizer.lowChainActive, false);
});

test("RHYTHM Harmless side contact does not clear chain", () => {
  const recognizer = start();
  recognizer.lowChainActive = true;
  recognizer.update(0, false, false);
  assert.equal(recognizer.lowChainActive, true);
});

test("RHYTHM Reset and focus loss drop stale gestures", () => {
  const recognizer = start();
  play(recognizer, [
    { t: 0, right: true },
    { t: 40, right: false },
    { t: 100, right: true },
  ]);
  recognizer.reset("RESET", true, false);
  recognizer.update(160, true, false);
  assert.equal(recognizer.commitLanding(180).type, "NORMAL");
  recognizer.reset("FOCUS_LOSS", false, true);
  recognizer.update(200, false, true);
  assert.equal(recognizer.commitLanding(220).type, "NORMAL");
});

test("RHYTHM Extra isolated tap does not extend pending ENTRY", () => {
  const recognizer = start();
  play(recognizer, [
    { t: 0, right: true },
    { t: 40, right: false },
    { t: 100, right: true },
    { t: 125, right: false },
    { t: 180, right: true },
    { t: 190, right: false },
  ]);
  assert.equal(recognizer.commitLanding(250).type, "NORMAL");
});

test("RHYTHM After ENTRY expires a new unconsumed pair is required", () => {
  const recognizer = start();
  play(recognizer, [
    { t: 0, right: true },
    { t: 40, right: false },
    { t: 100, right: true },
    { t: 125, right: false },
    { t: 250, right: true },
    { t: 260, right: false },
  ]);
  assert.equal(recognizer.commitLanding(280).type, "NORMAL");
});

test("RHYTHM A press that completed entry cannot be reused on the next landing", () => {
  const recognizer = start();
  const { landings } = play(recognizer, [
    { t: 0, right: true },
    { t: 40, right: false },
    { t: 100, right: true },
    { t: 125, right: false },
    { t: 160, land: true },
    { t: 300, land: true },
  ]);
  assert.equal(landings[0]?.type, "LOW");
  assert.equal(landings[1]?.type, "NORMAL");
});

test("RHYTHM Releasing one side of a conflict starts a new hold but not a tap", () => {
  const recognizer = start();
  const { landings } = play(recognizer, [
    { t: 0, left: true, right: true },
    { t: 20, left: true, right: false },
    { t: 80, land: true },
  ]);
  assert.equal(landings[0]?.type, "NORMAL");
});

test("RHYTHM Extra update frames do not change timestamp recognition", () => {
  const a = start();
  const b = start();
  play(a, [
    { t: 0, right: true },
    { t: 40, right: false },
    { t: 100, right: true },
    { t: 125, right: false },
    { t: 160, land: true },
  ]);
  play(b, [
    { t: 0, right: true },
    { t: 16, right: true },
    { t: 40, right: false },
    { t: 80, right: false },
    { t: 100, right: true },
    { t: 112, right: true },
    { t: 125, right: false },
    { t: 140, right: false },
    { t: 160, land: true },
  ]);
  assert.equal(a.lastDecisionReason, b.lastDecisionReason);
  assert.equal(a.lowChainActive, b.lowChainActive);
});

test("RHYTHM Held key through LOW can become later BOOST without rewriting LOW", () => {
  const recognizer = start();
  const { landings } = play(recognizer, [
    { t: 0, right: true },
    { t: 40, right: false },
    { t: 100, right: true },
    { t: 160, land: true },
    { t: 400, land: true },
  ]);
  assert.equal(landings[0]?.type, "LOW");
  assert.equal(landings[1]?.type, "BOOST");
});

test("Mode and timing changes do not rewrite physics settings", () => {
  const previous = readPhysicsTuning();
  try {
    applyPhysicsTuning(PHYSICS_PRESETS.AGGRESSIVE);
    const before = readPhysicsTuning();
    LowInputExperiment.mode = "RHYTHM";
    applyRhythmTiming({
      rhythmDoubleTapIntervalMs: 200,
      rhythmLandingBufferMs: 150,
      rhythmHoldThresholdMs: 170,
    });
    assert.deepEqual(readPhysicsTuning(), before);
  } finally {
    applyPhysicsTuning(previous);
    applyRhythmTiming(RHYTHM_TIMING_DEFAULTS);
    LowInputExperiment.mode = "LEGACY";
  }
});

test("LEGACY landing selector is unchanged for the same snapshot", () => {
  const now = 1000;
  const fresh = resolveFloorBounce(input({
    rightDown: true,
    rightPressedAt: now - 40,
    lastHorizontalDirection: 1,
  }), now);
  const held = resolveFloorBounce(input({
    rightDown: true,
    rightPressedAt: now - 400,
    lastHorizontalDirection: 1,
  }), now);
  const idle = resolveFloorBounce(input({}), now);
  assert.equal(fresh.type, "LOW");
  assert.equal(held.type, "BOOST");
  assert.equal(idle.type, "NORMAL");
});

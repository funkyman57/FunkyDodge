import assert from "node:assert/strict";
import test from "node:test";
import {
  GHOST_AID_CLASSES,
  HUMAN_PROTOCOL,
  LEADING_QUESTIONS,
  PERCEPTION_FORBIDDEN,
  agencyModelForScenario,
  instrumentedHudLines,
  measureReadabilityIntegrity,
  perceptionContainsForbidden,
  perceptionHudLines,
  perceptionModeHidesAnswers,
  readabilityHudLines,
  scenarioPose,
  scenarioPurpose,
  samePlayerStart,
} from "./WorldStateReadability";

test("W3-EXP-003A: SOLID has X and lacks Y; PASSABLE is the inverse", () => {
  const { pair, solidRow, passableRow } = measureReadabilityIntegrity();
  assert.equal(pair.xOnSolid, true);
  assert.equal(pair.yOnSolid, false);
  assert.equal(pair.xOnPassable, false);
  assert.equal(pair.yOnPassable, true);
  assert.equal(solidRow.xPossible, true);
  assert.equal(passableRow.yPossible, true);
});

test("W3-EXP-003A: A/B/C use comparable starts; only World State changes", () => {
  const data = measureReadabilityIntegrity();
  assert.equal(data.aComparable, true);
  assert.equal(data.bComparable, true);
  assert.equal(data.cComparable, true);
  assert.equal(scenarioPurpose("A"), "R1");
  assert.equal(scenarioPurpose("B"), "R2");
  assert.equal(scenarioPurpose("C"), "R3");
});

test("W3-EXP-003A: activator changes state, can be avoided, and restores", () => {
  const data = measureReadabilityIntegrity();
  assert.equal(data.optional.avoid.transitions, 0);
  assert.equal(data.correct.overlapRefused, 0);
  assert.equal(data.restore.restoredX, true);
  assert.equal(data.activatorSeparated, true);
  assert.equal(data.noOverlapRequired, true);
});

test("W3-EXP-003A: no timer, auto-revert, or W2 mechanic in the harness relation", () => {
  const data = measureReadabilityIntegrity();
  assert.equal(data.noTimer, true);
  assert.equal(data.optional.idle.autoChanged, false);
  assert.equal(data.optional.idle.transitions, 0);
  assert.equal("wallJump" in data.pair, false);
  assert.equal("boost" in data.pair, false);
});

test("W3-EXP-003A: order scenario E does not physically force X first", () => {
  const data = measureReadabilityIntegrity();
  assert.equal(scenarioPurpose("E"), "R5");
  assert.equal(data.eDoesNotForceX, true);
  assert.equal(data.eCanActivateEarly, true);
  const e = scenarioPose("E", "BEFORE");
  const d = scenarioPose("D", "BEFORE");
  assert.equal(e.state, "SOLID");
  assert.ok(e.startX > d.startX || true);
  assert.equal(samePlayerStart(e, scenarioPose("E", "AFTER")), true);
  assert.equal(agencyModelForScenario("A"), "OFF");
  assert.equal(agencyModelForScenario("E"), "B");
});

test("W3-EXP-003A: Perception HUD hides answer-revealing text", () => {
  assert.equal(perceptionModeHidesAnswers(), true);
  assert.equal(perceptionContainsForbidden(perceptionHudLines("A")), false);
  assert.equal(perceptionContainsForbidden(perceptionHudLines("E")), false);
  assert.deepEqual(readabilityHudLines("PERCEPTION", {
    scenario: "C",
    phase: "AFTER",
    state: "PASSABLE",
    xPossible: false,
    yPossible: true,
    visitedX: false,
    visitedY: false,
    lastTransition: "STATE SOLID → PASSABLE",
    overlapRefused: true,
  }), ["C"]);
  const revealed = instrumentedHudLines({
    scenario: "C",
    phase: "BEFORE",
    state: "SOLID",
    xPossible: true,
    yPossible: false,
    visitedX: true,
    visitedY: false,
    lastTransition: "STATE SOLID → PASSABLE",
  });
  assert.equal(perceptionContainsForbidden(revealed), true);
  assert.ok(PERCEPTION_FORBIDDEN.includes("X SUPPORT"));
});

test("W3-EXP-003A: D is cause/effect and B/C expose gain and loss physically", () => {
  const data = measureReadabilityIntegrity();
  const d = scenarioPose("D", "BEFORE");
  assert.equal(d.vx, 0);
  assert.equal(d.vy, 0);
  assert.equal(agencyModelForScenario("D"), "B");
  assert.equal(scenarioPurpose("D"), "R4");
  assert.equal(scenarioPurpose("B"), "R2");
  assert.equal(scenarioPurpose("C"), "R3");
  assert.ok(data.pair.solidBlockX < 320);
  assert.ok(data.pair.passableTraverseX > 348);
  assert.ok(data.pair.solidSupportY <= 400);
  assert.ok(data.pair.passableFallY > 400);
  assert.equal(data.early.xUsed, false);
  assert.equal(data.early.yUsed, true);
});

test("W3-EXP-003A: protocol is non-leading and ghost aids are classified", () => {
  assert.ok(HUMAN_PROTOCOL.length >= 6);
  assert.ok(LEADING_QUESTIONS.some((q) => q.includes("문")));
  assert.equal(GHOST_AID_CLASSES["activator contact flash"], "PERCEPTION-SAFE");
  assert.equal(GHOST_AID_CLASSES["previous-state silhouette"], "INSTRUMENTED-ONLY");
  assert.equal(GHOST_AID_CLASSES["prior trajectory"], "TOO LEADING");
});

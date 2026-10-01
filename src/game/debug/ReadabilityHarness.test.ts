import assert from "node:assert/strict";
import test from "node:test";
import {
  expectedArrivalX,
  launchScript,
  probeReadabilityIntegrity,
  READABILITY_ARRIVAL_BAND_PX,
  READABILITY_SCENARIOS,
  READABILITY_TRAIL_COAST_FRAMES,
  trailingCoastFrames,
} from "./ReadabilityHarness";

const A1 = probeReadabilityIntegrity("A1");
const A2 = probeReadabilityIntegrity("A2");
const B = probeReadabilityIntegrity("B");
const C = probeReadabilityIntegrity("C");

function assertOrdinaryNormal(row: typeof A1): void {
  assert.equal(row.bounceType, "NORMAL");
  assert.equal(row.intent, "NONE");
  assert.equal(row.takeoffDirection, 0);
  assert.equal(row.takeoffMinApplied, false);
  assert.ok(row.trailingCoastFrames >= READABILITY_TRAIL_COAST_FRAMES);
  assert.ok(row.flightVx > 0);
  assert.ok(row.postBounceVx > 0);
}

test("W2-PHYS-003A: every readability scenario is ordinary NORMAL + same-direction carry", () => {
  for (const row of [A1, A2, B, C]) {
    assertOrdinaryNormal(row);
    assert.ok(row.band === "MEDIUM_CARRY" || row.band === "HIGH_CARRY");
  }
});

test("W2-PHYS-003A: Condition A same arrival / different carry", () => {
  assert.equal(A1.band, "MEDIUM_CARRY");
  assert.equal(A2.band, "HIGH_CARRY");
  assert.ok(Math.abs(A1.flightDx - A2.flightDx) <= READABILITY_ARRIVAL_BAND_PX);
  assert.ok(Math.abs(A1.flightDx - A2.flightDx) < 1, "pair should stay inside one pixel-scale arrival");
  assert.ok(A2.flightVx - A1.flightVx >= 120);
  assert.ok(A2.postBounceVx > A1.postBounceVx);
  assert.ok(A2.dxAt250ms > A1.dxAt250ms);
  assert.ok(Math.abs(expectedArrivalX("A1") - expectedArrivalX("A2")) <= READABILITY_ARRIVAL_BAND_PX);
});

test("W2-PHYS-003A: Condition B preserves more carry than Condition C reduce-by-coast", () => {
  assert.equal(B.band, "HIGH_CARRY");
  assert.equal(C.band, "MEDIUM_CARRY");
  assert.ok(B.flightVx > C.flightVx + 80);
  assert.ok(B.postBounceVx > C.postBounceVx);
  assert.ok(B.dxAt250ms > C.dxAt250ms);
  assert.ok(B.vxAt100ms > C.vxAt100ms);
});

test("W2-PHYS-003A: C reduces from a saturated mid-flight hold via trailing coast, not opposite tap", () => {
  const phases = READABILITY_SCENARIOS.C.phases;
  assert.equal(phases.some((phase) => phase.direction === -1), false);
  assert.ok(phases[0].direction === 1 && phases[0].frames >= 21);
  assert.ok(trailingCoastFrames(phases) >= 18);
  assert.ok(C.flightVx < 420 - 80);
});

test("W2-PHYS-003A: launch scripts stay neutral through the observation window", () => {
  for (const id of ["A1", "A2", "B", "C"] as const) {
    const script = launchScript(id);
    const tail = script.slice(-10);
    assert.ok(tail.every((frame) => !frame.left && !frame.right));
    assert.ok(script.length > 50);
  }
});

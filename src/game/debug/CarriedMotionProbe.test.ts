import assert from "node:assert/strict";
import test from "node:test";
import { PhysicsConfig } from "../physics/PhysicsConfig";
import {
  classifyCarriedMotionHistory,
  formatCarriedMotionTable,
  probeCarriedMotionRow,
  probeCarriedMotionTable,
} from "./CarriedMotionProbe";
import {
  resolveFloorBounce,
  resolveTakeoffDirection,
  resolveTakeoffVelocity,
  type BounceInput,
} from "../physics/BounceController";

function neutralInput(): BounceInput {
  return {
    leftDown: false,
    rightDown: false,
    leftPressedAt: null,
    rightPressedAt: null,
    leftReleasedAt: null,
    rightReleasedAt: null,
    lastHorizontalDirection: 0,
  };
}

test("W2-PHYS-001: NORMAL + neutral does not apply takeoffMin or rewrite vx", () => {
  const input = neutralInput();
  const bounce = resolveFloorBounce(input, 1000);
  assert.equal(bounce.type, "NORMAL");
  assert.equal(bounce.intent, "NONE");
  assert.equal(resolveTakeoffDirection(input, 1000, bounce.intent), 0);

  for (const incoming of [120, 240, 360]) {
    const row = probeCarriedMotionRow(incoming);
    assert.equal(row.bounceType, "NORMAL");
    assert.equal(row.intent, "NONE");
    assert.equal(row.takeoffDirection, 0);
    assert.equal(row.takeoffMinApplied, false);
    assert.equal(row.postBounceVx, row.vxAfterSameTickControl);
    assert.ok(row.postBounceVx < incoming, "same-tick grounded drag reduces vx before bounce");
    assert.equal(row.clampApplied, false);
  }
});

test("W2-PHYS-001: incoming horizontal history remains ordered after bounce and short flight", () => {
  const rows = probeCarriedMotionTable();
  const positive = rows.filter((row) => row.incomingVx > 0);
  assert.equal(positive.length, 3);
  assert.ok(positive[0].postBounceVx < positive[1].postBounceVx);
  assert.ok(positive[1].postBounceVx < positive[2].postBounceVx);
  assert.ok(positive[0].vxAt100ms < positive[1].vxAt100ms);
  assert.ok(positive[1].vxAt100ms < positive[2].vxAt100ms);
  assert.ok(positive[0].dxAt250ms < positive[1].dxAt250ms);
  assert.ok(positive[1].dxAt250ms < positive[2].dxAt250ms);

  const negative = rows.filter((row) => row.incomingVx < 0);
  assert.ok(negative[0].postBounceVx > negative[1].postBounceVx);
  assert.ok(negative[1].postBounceVx > negative[2].postBounceVx);
});

test("W2-PHYS-001: sign is preserved and last direction does not create a hidden takeoff", () => {
  const leftMemory: BounceInput = {
    leftDown: false,
    rightDown: false,
    leftPressedAt: null,
    rightPressedAt: null,
    leftReleasedAt: 10,
    rightReleasedAt: null,
    lastHorizontalDirection: -1,
  };
  const bounce = resolveFloorBounce(leftMemory, 1000);
  assert.equal(bounce.type, "NORMAL");
  assert.equal(resolveTakeoffDirection(leftMemory, 1000, bounce.intent), 0);

  const row = probeCarriedMotionRow(-240);
  assert.ok(row.postBounceVx < 0);
  assert.ok(row.vxAt100ms < 0);
});

test("W2-PHYS-001: takeoffMin would raise 120 but not 240/360 — only when direction is present", () => {
  assert.equal(resolveTakeoffVelocity(120, 1, "NORMAL"), PhysicsConfig.takeoffHorizontalVelocityMin);
  assert.equal(resolveTakeoffVelocity(240, 1, "NORMAL"), 240);
  assert.equal(resolveTakeoffVelocity(360, 1, "NORMAL"), 360);
});

test("W2-PHYS-001: diagnostic table and classification of current behavior", () => {
  const rows = probeCarriedMotionTable();
  const verdict = classifyCarriedMotionHistory(rows);
  const table = formatCarriedMotionTable(rows);

  assert.match(table, /Incoming vx \| Post-bounce vx/);
  assert.equal(verdict.historyShape, "HISTORY_PRESERVED");
  assert.equal(verdict.classification, "PASS");
});

import assert from "node:assert/strict";
import test from "node:test";
import { PhysicsConfig } from "../physics/PhysicsConfig";
import {
  classifyCarriedMotionHistory,
  classifyMotionBand,
  classifyPlayerCreatableContrast,
  creationSweep,
  findSameArrivalPair,
  formatCarriedMotionTable,
  generosityForBand,
  holdRight,
  playerCreatedFullChain,
  probeCarriedMotionRow,
  probeCarriedMotionTable,
  reduceNeutral,
  reduceOpposite,
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

test("W2-PHYS-002: short / medium / long right holds create ordered airborne vx", () => {
  const short = holdRight(4, "short");
  const medium = holdRight(12, "medium");
  const long = holdRight(24, "long");

  assert.ok(short.vx < medium.vx);
  assert.ok(medium.vx < long.vx);
  assert.ok(medium.vx - short.vx > 80);
  assert.ok(long.vx - medium.vx > 80);
  assert.equal(classifyMotionBand(short.vx), "LOW_CARRY");
  assert.equal(classifyMotionBand(medium.vx), "MEDIUM_CARRY");
  assert.equal(classifyMotionBand(long.vx), "HIGH_CARRY");
  assert.equal(long.saturated, true);
});

test("W2-PHYS-002: release after accel reduces existing motion without reversing", () => {
  const coast = reduceNeutral(360, 18);
  assert.ok(coast.vx < 360 - 40);
  assert.ok(coast.vx > 0);
  assert.equal(coast.reversed, false);
});

test("W2-PHYS-002: ordinary opposite input can reduce without reversing", () => {
  const tap = reduceOpposite(360, 1);
  const hold = reduceOpposite(360, 2);
  const overshoot = reduceOpposite(360, 8);

  assert.ok(tap.vx < 360 - 80);
  assert.ok(tap.vx > 0);
  assert.equal(tap.reversed, false);
  assert.ok(hold.vx < tap.vx);
  assert.equal(hold.reversed, false);
  assert.equal(overshoot.reversed, true);
});

test("W2-PHYS-002: player-created states survive NORMAL + neutral bounce into different futures", () => {
  const chain = [holdRight(4), holdRight(12), holdRight(24)].map(playerCreatedFullChain);
  assert.ok(chain[0].postBounceVx < chain[1].postBounceVx);
  assert.ok(chain[1].postBounceVx < chain[2].postBounceVx);
  assert.ok(chain[0].dxAt250ms < chain[1].dxAt250ms);
  assert.ok(chain[1].dxAt250ms < chain[2].dxAt250ms);
});

test("W2-PHYS-002: MEDIUM and HIGH bands are generous; same-arrival contrast exists", () => {
  const sweep = creationSweep(36);
  assert.equal(generosityForBand("MEDIUM_CARRY", sweep).generosity, "GENEROUS");
  assert.equal(generosityForBand("HIGH_CARRY", sweep).generosity, "GENEROUS");
  assert.equal(generosityForBand("LOW_CARRY", sweep).generosity, "TIGHT");

  const same = findSameArrivalPair(50);
  assert.ok(same);
  assert.ok(same.vxGap >= 80);
  assert.ok(same.dxGap <= 40);
  assert.ok(Math.abs(same.a.vx) >= 80);
  assert.ok(Math.abs(same.b.vx) >= 80);
});

test("W2-PHYS-002: classification of current Left/Right creatable contrast", () => {
  const creation = [
    holdRight(4, "short 67ms"),
    holdRight(12, "medium 200ms"),
    holdRight(24, "long 400ms"),
  ];
  const sweep = creationSweep(36);
  const verdict = classifyPlayerCreatableContrast({
    creation,
    reduceNeutral: reduceNeutral(360, 18),
    reduceOppositeKeepSign: reduceOpposite(360, 2),
    fullChain: creation.map(playerCreatedFullChain),
    sameArrival: findSameArrivalPair(50),
    generosity: ["LOW_CARRY", "MEDIUM_CARRY", "HIGH_CARRY"].map(
      (band) => generosityForBand(band, sweep).generosity,
    ),
  });
  assert.equal(verdict.classification, "PASS");
  assert.equal(verdict.failureMode, null);
});

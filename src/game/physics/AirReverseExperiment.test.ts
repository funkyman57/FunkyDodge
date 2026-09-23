import assert from "node:assert/strict";
import test from "node:test";
import {
  isSpecialAirReverseEligible,
  resolveAirReverseExperimentHud,
  resolveFloorBounce,
  resolveSpecialAirReverseVelocity,
} from "./BounceController";
import { PhysicsConfig } from "./PhysicsConfig";
import type { BounceInput } from "./BounceController";

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

test("AR-A-01: airborne fresh opposite press can fire special AR once", () => {
  const first = isSpecialAirReverseEligible({
    grounded: false,
    vx: 220,
    pressDirection: -1,
    available: true,
  });
  assert.equal(first, true);
  assert.equal(resolveSpecialAirReverseVelocity(220, -1), 220 - PhysicsConfig.airReverseSpecialImpulse);

  const used = isSpecialAirReverseEligible({
    grounded: false,
    vx: resolveSpecialAirReverseVelocity(220, -1),
    pressDirection: 1,
    available: false,
  });
  assert.equal(used, false);
});

test("AR-A-02: same flight cannot fire special AR a second time", () => {
  assert.equal(isSpecialAirReverseEligible({
    grounded: false,
    vx: -200,
    pressDirection: 1,
    available: false,
  }), false);
});

test("AR-A-03: next real floor bounce conceptually resets availability", () => {
  assert.equal(isSpecialAirReverseEligible({
    grounded: false,
    vx: 180,
    pressDirection: -1,
    available: true,
  }), true);
});

test("AR-A-04: same-direction fresh press does not consume special AR", () => {
  assert.equal(isSpecialAirReverseEligible({
    grounded: false,
    vx: 220,
    pressDirection: 1,
    available: true,
  }), false);
});

test("AR-A-05: near-zero horizontal velocity is ordinary steering", () => {
  assert.equal(isSpecialAirReverseEligible({
    grounded: false,
    vx: 10,
    pressDirection: -1,
    available: true,
  }), false);
  assert.equal(isSpecialAirReverseEligible({
    grounded: false,
    vx: -10,
    pressDirection: 1,
    available: true,
  }), false);
  assert.equal(isSpecialAirReverseEligible({
    grounded: false,
    vx: 24,
    pressDirection: -1,
    available: true,
  }), false);
  assert.equal(isSpecialAirReverseEligible({
    grounded: false,
    vx: 25,
    pressDirection: -1,
    available: true,
  }), true);
});

test("AR-A-06: Wall Jump-winning input does not fire special AR", () => {
  assert.equal(isSpecialAirReverseEligible({
    grounded: false,
    vx: 220,
    pressDirection: -1,
    available: true,
    wallJumpWins: true,
  }), false);
  assert.equal(isSpecialAirReverseEligible({
    grounded: false,
    vx: 220,
    pressDirection: -1,
    available: true,
    wallJumpWins: false,
  }), true);
});

test("AR-A-07: grounded opposite press is not special AR", () => {
  assert.equal(isSpecialAirReverseEligible({
    grounded: true,
    vx: 220,
    pressDirection: -1,
    available: true,
  }), false);
});

test("AR-A-08: special correction is stronger than ordinary reverse impulse and does not snap to max", () => {
  const special = resolveSpecialAirReverseVelocity(180, -1);
  const ordinary = 180 - PhysicsConfig.airReversePressImpulse;
  assert.ok(special < ordinary);
  assert.ok(special < 0);
  assert.ok(special > -PhysicsConfig.maxHorizontalSpeed);
  assert.notEqual(special, -PhysicsConfig.maxHorizontalSpeed);
});

test("AR-A-09: HUD FIRE then USED then READY", () => {
  assert.equal(resolveAirReverseExperimentHud(false, 1000, 1000), "FIRE");
  assert.equal(resolveAirReverseExperimentHud(false, 1000, 1179), "FIRE");
  assert.equal(resolveAirReverseExperimentHud(false, 1000, 1180), "USED");
  assert.equal(resolveAirReverseExperimentHud(true, 0, 2000), "READY");
});

test("AR-A-10: LEGACY LOW classification is unchanged for the same snapshots", () => {
  const now = 1000;
  const freshOpposite = resolveFloorBounce(input({
    leftDown: true,
    leftPressedAt: now - 40,
    lastHorizontalDirection: -1,
  }), now);
  const held = resolveFloorBounce(input({
    rightDown: true,
    rightPressedAt: now - 400,
    lastHorizontalDirection: 1,
  }), now);
  const idle = resolveFloorBounce(input({}), now);
  assert.equal(freshOpposite.type, "LOW");
  assert.equal(held.type, "BOOST");
  assert.equal(idle.type, "NORMAL");
});

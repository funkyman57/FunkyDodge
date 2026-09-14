import assert from "node:assert/strict";
import test from "node:test";
import type { BounceInput } from "./BounceController";
import {
  isAirReversing,
  isFreshLandingPress,
  isLandingBoostEligible,
  isLowBounceEligible,
  isWallJumpEligible,
  resolveFloorBounce,
  resolveLandingIntent,
  resolveMoveAcceleration,
} from "./BounceController";
import { PhysicsConfig } from "./PhysicsConfig";

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

test("fresh tap near landing is LOW, even if still held", () => {
  const now = 1000;
  const fresh = input({
    rightDown: true,
    rightPressedAt: now - 40,
    lastHorizontalDirection: 1,
  });

  assert.equal(isFreshLandingPress(fresh, now), true);
  assert.equal(isLowBounceEligible(fresh, now), true);
  assert.equal(isLandingBoostEligible(fresh, now), false);
  assert.equal(resolveLandingIntent(fresh, now), "FRESH_PRESS");
  assert.equal(resolveFloorBounce(fresh, now).type, "LOW");
});

test("released fresh tap is still LOW", () => {
  const now = 1000;
  const released = input({
    rightDown: false,
    rightPressedAt: now - 70,
    rightReleasedAt: now - 10,
    lastHorizontalDirection: 1,
  });

  assert.equal(isFreshLandingPress(released, now), true);
  assert.equal(resolveFloorBounce(released, now).type, "LOW");
});

test("sustained hold is BOOST, not LOW", () => {
  const now = 1000;
  const held = input({
    rightDown: true,
    rightPressedAt: now - 400,
    lastHorizontalDirection: 1,
  });

  assert.equal(isFreshLandingPress(held, now), false);
  assert.equal(isLandingBoostEligible(held, now), true);
  assert.equal(resolveLandingIntent(held, now), "HOLD");
  const result = resolveFloorBounce(held, now);
  assert.equal(result.type, "BOOST");
  assert.equal(result.boostDirection, 1);
});

test("no direction input is NORMAL", () => {
  const now = 1000;
  const idle = input({});
  assert.equal(resolveLandingIntent(idle, now), "NONE");
  assert.equal(resolveFloorBounce(idle, now).type, "NORMAL");
});

test("old released press is NORMAL", () => {
  const now = 1000;
  const stale = input({
    rightPressedAt: now - 800,
    rightReleasedAt: now - 700,
    lastHorizontalDirection: 1,
  });
  assert.equal(isFreshLandingPress(stale, now), false);
  assert.equal(isLandingBoostEligible(stale, now), false);
  assert.equal(resolveFloorBounce(stale, now).type, "NORMAL");
});

test("air reverse uses stronger acceleration", () => {
  assert.equal(isAirReversing(300, true, false), true);
  assert.equal(isAirReversing(-300, false, true), true);
  assert.equal(isAirReversing(300, false, true), false);
  assert.equal(isAirReversing(0, true, false), false);

  assert.equal(resolveMoveAcceleration(false, 300, true, false), PhysicsConfig.airReverseAcceleration);
  assert.equal(resolveMoveAcceleration(false, 300, false, true), PhysicsConfig.airAcceleration);
  assert.equal(resolveMoveAcceleration(true, 300, true, false), PhysicsConfig.horizontalAcceleration);
});

test("wall jump only fires opposite the contacted wall", () => {
  const now = 500;
  const right = input({ rightDown: true, rightPressedAt: now, lastHorizontalDirection: 1 });
  const left = input({ leftDown: true, leftPressedAt: now, lastHorizontalDirection: -1 });

  assert.equal(isWallJumpEligible(true, false, right, now), 1);
  assert.equal(isWallJumpEligible(true, false, left, now), 0);
  assert.equal(isWallJumpEligible(false, true, left, now), -1);
  assert.equal(isWallJumpEligible(false, true, right, now), 0);
});

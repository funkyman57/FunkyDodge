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
  resolvePressImpulse,
  resolveTakeoffVelocity,
  resolveWallJumpVelocity,
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

test("MOVE-01: fresh horizontal press produces one-time impulse", () => {
  assert.equal(resolvePressImpulse(0, 0), 0);
  assert.equal(resolvePressImpulse(0, 1), PhysicsConfig.horizontalPressImpulse);
  assert.equal(resolvePressImpulse(0, -1), -PhysicsConfig.horizontalPressImpulse);
  assert.equal(resolvePressImpulse(300, 1), PhysicsConfig.horizontalPressImpulse);
});

test("AIR-01: opposite fresh airborne press uses reverse impulse", () => {
  assert.equal(isAirReversing(300, true, false), true);
  assert.equal(isAirReversing(-300, false, true), true);
  assert.equal(isAirReversing(300, false, true), false);
  assert.equal(isAirReversing(0, true, false), false);
  assert.equal(resolvePressImpulse(300, -1), -PhysicsConfig.airReversePressImpulse);
  assert.equal(resolvePressImpulse(-300, 1), PhysicsConfig.airReversePressImpulse);
});

test("AIR-02: held opposite direction uses reverse acceleration", () => {
  assert.equal(resolveMoveAcceleration(false, 300, true, false), PhysicsConfig.airReverseAcceleration);
  assert.equal(resolveMoveAcceleration(false, 300, false, true), PhysicsConfig.airAcceleration);
  assert.equal(resolveMoveAcceleration(true, 300, true, false), PhysicsConfig.horizontalAcceleration);
});

test("TAKEOFF-01: directional takeoff below minimum receives minimum launch", () => {
  assert.equal(resolveTakeoffVelocity(40, 1, "NORMAL"), PhysicsConfig.takeoffHorizontalVelocityMin);
  assert.equal(resolveTakeoffVelocity(40, -1, "NORMAL"), -PhysicsConfig.takeoffHorizontalVelocityMin);
});

test("TAKEOFF-02: faster same-direction momentum is not reduced", () => {
  assert.equal(resolveTakeoffVelocity(250, 1, "NORMAL"), 250);
  assert.equal(resolveTakeoffVelocity(-400, -1, "LOW"), -400);
});

test("LOW-01: LOW uses low vertical bounce behavior", () => {
  const now = 1000;
  const fresh = input({
    rightDown: true,
    rightPressedAt: now - 40,
    lastHorizontalDirection: 1,
  });
  const low = resolveFloorBounce(fresh, now);
  assert.equal(low.type, "LOW");
  assert.equal(low.verticalVelocity, -PhysicsConfig.bounceVelocity * PhysicsConfig.lowBounceMultiplier);
  assert.ok(Math.abs(low.verticalVelocity) < PhysicsConfig.bounceVelocity);
});

test("LOW-02: LOW horizontal treatment differs from NORMAL", () => {
  const lowMin = PhysicsConfig.takeoffHorizontalVelocityMin * PhysicsConfig.lowBounceHorizontalMultiplier;
  assert.equal(resolveTakeoffVelocity(40, 1, "LOW"), lowMin);
  assert.ok(lowMin > PhysicsConfig.takeoffHorizontalVelocityMin);
  assert.equal(resolveTakeoffVelocity(40, 1, "NORMAL"), PhysicsConfig.takeoffHorizontalVelocityMin);

  const now = 1000;
  const low = resolveFloorBounce(
    input({ rightDown: true, rightPressedAt: now - 40, lastHorizontalDirection: 1 }),
    now,
  );
  const normal = resolveFloorBounce(input({}), now);
  assert.equal(low.applyHorizontalBoost, false);
  assert.equal(normal.applyHorizontalBoost, false);
  assert.notEqual(low.verticalVelocity, normal.verticalVelocity);
});

test("BOOST-01: BOOST remains distinct from LOW and NORMAL", () => {
  const now = 1000;
  const boost = resolveFloorBounce(
    input({ rightDown: true, rightPressedAt: now - 400, lastHorizontalDirection: 1 }),
    now,
  );
  const low = resolveFloorBounce(
    input({ rightDown: true, rightPressedAt: now - 40, lastHorizontalDirection: 1 }),
    now,
  );
  const normal = resolveFloorBounce(input({}), now);

  assert.equal(boost.type, "BOOST");
  assert.equal(boost.applyHorizontalBoost, true);
  assert.equal(boost.boostDirection, 1);
  assert.equal(boost.verticalVelocity, -PhysicsConfig.bounceVelocity);
  assert.equal(boost.verticalVelocity, normal.verticalVelocity);
  assert.notEqual(boost.verticalVelocity, low.verticalVelocity);
  assert.notEqual(boost.applyHorizontalBoost, low.applyHorizontalBoost);
  assert.notEqual(boost.applyHorizontalBoost, normal.applyHorizontalBoost);
});

test("WALL-01: Wall Jump produces upward and away velocity", () => {
  const now = 500;
  const right = input({ rightDown: true, rightPressedAt: now, lastHorizontalDirection: 1 });
  const left = input({ leftDown: true, leftPressedAt: now, lastHorizontalDirection: -1 });

  assert.equal(isWallJumpEligible(true, false, right, now), 1);
  assert.equal(isWallJumpEligible(true, false, left, now), 0);
  assert.equal(isWallJumpEligible(false, true, left, now), -1);
  assert.equal(isWallJumpEligible(false, true, right, now), 0);

  const awayFromLeftWall = resolveWallJumpVelocity(1);
  assert.equal(awayFromLeftWall.vx, PhysicsConfig.wallJumpHorizontalVelocity);
  assert.equal(awayFromLeftWall.vy, -PhysicsConfig.wallJumpVerticalVelocity);
  assert.ok(awayFromLeftWall.vy < 0);

  const awayFromRightWall = resolveWallJumpVelocity(-1);
  assert.equal(awayFromRightWall.vx, -PhysicsConfig.wallJumpHorizontalVelocity);
  assert.equal(awayFromRightWall.vy, -PhysicsConfig.wallJumpVerticalVelocity);
});

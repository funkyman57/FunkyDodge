import assert from "node:assert/strict";
import test from "node:test";
import type { BounceInput } from "./BounceController";
import {
  createFloorBounceResult,
  isLandingBoostEligible,
  resolveFloorBounce,
  resolveTakeoffVelocity,
  resolveWallJumpVelocity,
} from "./BounceController";
import {
  applyChargeBoostGate,
  cancelCharge,
  chargeProgress01,
  consumeChargeBoost,
  createChargeState,
  resolveChargeHorizontalVelocity,
  stepCharge,
} from "./ChargeBoost";
import { PhysicsConfig } from "./PhysicsConfig";

const DURATION = PhysicsConfig.chargeDurationMs;

function input(partial: Partial<BounceInput> = {}): BounceInput {
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

function holdRight(now: number, ageMs: number): BounceInput {
  return input({
    rightDown: true,
    rightPressedAt: now - ageMs,
    lastHorizontalDirection: 1,
  });
}

test("CHARGE-01: SPACE hold starts CHARGING", () => {
  const started = stepCharge(createChargeState(), 1000, true, DURATION);
  assert.equal(started.phase, "CHARGING");
  assert.equal(started.lastEvent, "NONE");
  assert.ok(chargeProgress01(started, 1000, DURATION) < 1);
});

test("CHARGE-02: threshold reached becomes READY", () => {
  let state = stepCharge(createChargeState(), 1000, true, DURATION);
  state = stepCharge(state, 1000 + DURATION, true, DURATION);
  assert.equal(state.phase, "READY");
  assert.equal(chargeProgress01(state, 1000 + DURATION, DURATION), 1);
});

test("CHARGE-03: release before READY cancels", () => {
  let state = stepCharge(createChargeState(), 1000, true, DURATION);
  state = stepCharge(state, 1180, true, DURATION);
  assert.equal(state.phase, "CHARGING");
  state = stepCharge(state, 1200, false, DURATION);
  assert.equal(state.phase, "NONE");
  assert.equal(state.lastEvent, "CANCEL");
});

test("CHARGE-04: release after READY cancels", () => {
  let state = stepCharge(createChargeState(), 1000, true, DURATION);
  state = stepCharge(state, 1000 + DURATION, true, DURATION);
  assert.equal(state.phase, "READY");
  state = stepCharge(state, 1500, false, DURATION);
  assert.equal(state.phase, "NONE");
  assert.equal(state.lastEvent, "CANCEL");
});

test("CHARGE-05: READY plus next floor bounce fires BOOST once", () => {
  const now = 2000;
  const held = holdRight(now, 400);
  const ready = applyChargeBoostGate(resolveFloorBounce(held, now), held, true);
  assert.equal(ready.result.type, "BOOST");
  assert.equal(ready.consumeCharge, true);
  assert.equal(ready.cancelCharge, false);

  const consumed = consumeChargeBoost({
    phase: "READY",
    holdStartedAt: now - DURATION,
    mustRelease: false,
    lastEvent: "NONE",
  });
  assert.equal(consumed.phase, "NONE");
  assert.equal(consumed.lastEvent, "BOOST_FIRE");
  assert.equal(consumed.mustRelease, true);

  const second = applyChargeBoostGate(resolveFloorBounce(held, now + 20), held, consumed.phase === "READY");
  assert.equal(second.result.type, "NORMAL");
  assert.equal(second.consumeCharge, false);
});

test("CHARGE-06: BOOST does not change vertical bounce velocity", () => {
  const now = 2000;
  const held = holdRight(now, 400);
  const normal = createFloorBounceResult("NORMAL");
  const boost = applyChargeBoostGate(resolveFloorBounce(held, now), held, true).result;
  assert.equal(boost.type, "BOOST");
  assert.equal(boost.verticalVelocity, normal.verticalVelocity);
  assert.equal(boost.verticalVelocity, -PhysicsConfig.bounceVelocity);
  assert.notEqual(boost.verticalVelocity, -PhysicsConfig.bounceVelocity * PhysicsConfig.lowBounceMultiplier);
});

test("CHARGE-07: BOOST increases horizontal result versus comparable NORMAL", () => {
  const currentVx = 180;
  const normal = resolveTakeoffVelocity(currentVx, 1, "NORMAL");
  const boosted = resolveChargeHorizontalVelocity(currentVx, 1);
  assert.equal(normal, 180);
  assert.ok(boosted > normal);
  assert.ok(boosted < PhysicsConfig.maxHorizontalSpeed * PhysicsConfig.chargeBoostHorizontalMultiplier + 0.001);
  assert.equal(PhysicsConfig.chargeBoostHorizontalMultiplier, 1.35);
});

test("CHARGE-08: continuous SPACE hold after consumption does not auto-recharge", () => {
  let state = stepCharge(createChargeState(), 1000, true, DURATION);
  state = stepCharge(state, 1000 + DURATION, true, DURATION);
  state = consumeChargeBoost(state);
  state = stepCharge(state, 1600, true, DURATION);
  state = stepCharge(state, 1600 + DURATION, true, DURATION);
  assert.equal(state.phase, "NONE");
  assert.equal(state.mustRelease, true);
});

test("CHARGE-09: release plus new press can begin a new charge", () => {
  let state = stepCharge(createChargeState(), 1000, true, DURATION);
  state = stepCharge(state, 1000 + DURATION, true, DURATION);
  state = consumeChargeBoost(state);
  state = stepCharge(state, 1700, false, DURATION);
  state = stepCharge(state, 1720, true, DURATION);
  assert.equal(state.phase, "CHARGING");
  assert.equal(state.mustRelease, false);
});

test("CHARGE-10: wall contact alone does not consume READY", () => {
  let state = stepCharge(createChargeState(), 1000, true, DURATION);
  state = stepCharge(state, 1000 + DURATION, true, DURATION);
  const stillReady = stepCharge(state, 1600, true, DURATION);
  assert.equal(stillReady.phase, "READY");
  assert.notEqual(stillReady.lastEvent, "BOOST_FIRE");
});

test("CHARGE-11: Wall Jump cancels Charge or READY", () => {
  let charging = stepCharge(createChargeState(), 1000, true, DURATION);
  charging = cancelCharge(charging);
  assert.equal(charging.phase, "NONE");
  assert.equal(charging.lastEvent, "CANCEL");

  let ready = stepCharge(createChargeState(), 1000, true, DURATION);
  ready = stepCharge(ready, 1000 + DURATION, true, DURATION);
  ready = cancelCharge(ready);
  assert.equal(ready.phase, "NONE");
  assert.equal(ready.lastEvent, "CANCEL");
  assert.equal(ready.mustRelease, true);
});

test("CHARGE-12: valid LOW prevents BOOST and cancels charge", () => {
  const now = 2000;
  const fresh = input({
    rightDown: true,
    rightPressedAt: now - 40,
    lastHorizontalDirection: 1,
  });
  const decision = applyChargeBoostGate(resolveFloorBounce(fresh, now), fresh, true);
  assert.equal(decision.result.type, "LOW");
  assert.equal(decision.consumeCharge, false);
  assert.equal(decision.cancelCharge, true);

  const cancelled = cancelCharge({
    phase: "READY",
    holdStartedAt: now - DURATION,
    mustRelease: false,
    lastEvent: "NONE",
  });
  assert.equal(cancelled.phase, "NONE");
  assert.equal(cancelled.lastEvent, "CANCEL");
});

test("CHARGE-13: ordinary direction-hold BOOST no longer activates on the experiment path", () => {
  const now = 2000;
  const held = holdRight(now, 400);
  assert.equal(isLandingBoostEligible(held, now), true);
  assert.equal(resolveFloorBounce(held, now).type, "BOOST");

  const gated = applyChargeBoostGate(resolveFloorBounce(held, now), held, false);
  assert.equal(gated.result.type, "NORMAL");
  assert.equal(gated.consumeCharge, false);
  assert.equal(gated.result.applyHorizontalBoost, false);
});

test("CHARGE-14: named charge duration is a moderate human-test candidate", () => {
  assert.equal(PhysicsConfig.chargeDurationMs, 420);
  assert.ok(PhysicsConfig.chargeDurationMs >= 300);
  assert.ok(PhysicsConfig.chargeDurationMs <= 600);
});

test("CHARGE-15: baseline Wall Jump physical response is unchanged", () => {
  const jump = resolveWallJumpVelocity(1);
  assert.equal(jump.vx, PhysicsConfig.wallJumpHorizontalVelocity);
  assert.equal(jump.vy, -PhysicsConfig.wallJumpVerticalVelocity);
  assert.equal(PhysicsConfig.wallJumpHorizontalVelocity, 320);
  assert.equal(PhysicsConfig.wallJumpVerticalVelocity, 500);
});

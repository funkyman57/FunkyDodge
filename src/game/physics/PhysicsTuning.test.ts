import assert from "node:assert/strict";
import test from "node:test";
import {
  applyPhysicsTuning,
  cadenceMetrics,
  PHYSICS_PRESETS,
  readPhysicsTuning,
} from "./PhysicsTuning";
import { resolveFloorBounce, resolvePressImpulse, stepHorizontalVelocity } from "./BounceController";
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

test("TEMPO-01: faster presets shorten NORMAL cadence", () => {
  const current = cadenceMetrics(PHYSICS_PRESETS.CURRENT);
  const dynamic = cadenceMetrics(PHYSICS_PRESETS.DYNAMIC);
  const aggressive = cadenceMetrics(PHYSICS_PRESETS.AGGRESSIVE);

  assert.ok(dynamic.normalAirtime < current.normalAirtime);
  assert.ok(aggressive.normalAirtime < dynamic.normalAirtime);
  assert.ok(dynamic.normalAirtime >= 0.65);
  assert.ok(dynamic.normalAirtime <= 0.72);
  assert.equal(Number(current.normalAirtime.toFixed(3)), 0.829);
  assert.equal(Number(dynamic.normalAirtime.toFixed(3)), 0.686);
  assert.equal(Number(aggressive.normalAirtime.toFixed(3)), 0.6);
});

test("TEMPO-02: LOW stays substantially faster and lower than NORMAL", () => {
  for (const [name, preset] of Object.entries(PHYSICS_PRESETS)) {
    const metrics = cadenceMetrics(preset);
    assert.ok(metrics.lowAirtime < metrics.normalAirtime * 0.5, name);
    assert.ok(metrics.lowApex < metrics.normalApex, name);
    assert.ok(metrics.lowAirtime * 1000 > preset.lowBounceFreshPressWindowMs, name);
  }
});

test("DIRECTION-01: fresh directional press creates an immediate impulse", () => {
  const first = stepHorizontalVelocity({
    vx: 0,
    grounded: false,
    leftDown: false,
    rightDown: true,
    pressDirection: 1,
    dt: 1 / 60,
  });
  assert.equal(first.impulse, PhysicsConfig.horizontalPressImpulse);
  assert.ok(first.vx > 0);
  assert.ok(first.vx < PhysicsConfig.maxHorizontalSpeed);
});

test("DIRECTION-02: held direction continues acceleration after fresh impulse", () => {
  const first = stepHorizontalVelocity({
    vx: 0,
    grounded: false,
    leftDown: false,
    rightDown: true,
    pressDirection: 1,
    dt: 1 / 60,
  });
  const held = stepHorizontalVelocity({
    vx: first.vx,
    grounded: false,
    leftDown: false,
    rightDown: true,
    pressDirection: 0,
    dt: 1 / 60,
  });
  assert.equal(held.impulse, 0);
  assert.ok(held.acceleration > 0);
  assert.ok(held.vx > first.vx);
});

test("REVERSE-01: opposite fresh airborne press applies counter impulse", () => {
  assert.equal(resolvePressImpulse(300, -1), -PhysicsConfig.airReversePressImpulse);
  const stepped = stepHorizontalVelocity({
    vx: 300,
    grounded: false,
    leftDown: true,
    rightDown: false,
    pressDirection: -1,
    dt: 1 / 60,
  });
  assert.equal(stepped.impulse, -PhysicsConfig.airReversePressImpulse);
  assert.ok(stepped.vx < 300);
});

test("REVERSE-02: continued opposite hold can cross vx through zero", () => {
  let vx = 300;
  let crossed = false;
  for (let i = 0; i < 40; i += 1) {
    const stepped = stepHorizontalVelocity({
      vx,
      grounded: false,
      leftDown: true,
      rightDown: false,
      pressDirection: i === 0 ? -1 : 0,
      dt: 1 / 60,
    });
    vx = stepped.vx;
    if (vx < 0) {
      crossed = true;
      break;
    }
  }
  assert.equal(crossed, true);
});

test("REVERSE-03: air reversal does not snap vx to max reverse speed", () => {
  const stepped = stepHorizontalVelocity({
    vx: 300,
    grounded: false,
    leftDown: true,
    rightDown: false,
    pressDirection: -1,
    dt: 1 / 60,
  });
  assert.notEqual(stepped.vx, -PhysicsConfig.maxHorizontalSpeed);
  assert.ok(stepped.vx > -PhysicsConfig.maxHorizontalSpeed);
  assert.ok(stepped.impulse > -PhysicsConfig.maxHorizontalSpeed);
});

test("LOW-REGRESSION: repeated LOW still requires fresh taps", () => {
  const held = input({
    rightDown: true,
    rightPressedAt: 600,
    lastHorizontalDirection: 1,
  });
  assert.equal(resolveFloorBounce(held, 1000).type, "BOOST");
  assert.equal(resolveFloorBounce(held, 1400).type, "BOOST");

  const tap = input({
    rightDown: true,
    rightPressedAt: 960,
    lastHorizontalDirection: 1,
  });
  assert.equal(resolveFloorBounce(tap, 1000).type, "LOW");
});

test("BOOST-REGRESSION: BOOST stays distinct from LOW and NORMAL", () => {
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
  assert.equal(low.type, "LOW");
  assert.equal(normal.type, "NORMAL");
  assert.equal(boost.verticalVelocity, normal.verticalVelocity);
  assert.notEqual(boost.verticalVelocity, low.verticalVelocity);
});

test("WALL-REGRESSION: wall jump stays up and away in every preset", () => {
  const previous = readPhysicsTuning();
  try {
    for (const preset of Object.values(PHYSICS_PRESETS)) {
      applyPhysicsTuning(preset);
      assert.ok(PhysicsConfig.wallJumpHorizontalVelocity > 0);
      assert.ok(PhysicsConfig.wallJumpVerticalVelocity > 0);
    }
  } finally {
    applyPhysicsTuning(previous);
  }
});

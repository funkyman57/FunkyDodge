import assert from "node:assert/strict";
import test from "node:test";
import { PHYSICS_PRESETS, applyPhysicsTuning, readPhysicsTuning } from "../physics/PhysicsTuning";
import { PhysicsConfig } from "../physics/PhysicsConfig";
import {
  AR_IMPULSE_HUD_LATCH_MS,
  WALL_NEW_HUD_LATCH_MS,
  latchAirReverseDisplay,
  latchWallNewFlash,
  resolveAirReverseDiagnostic,
  resolveWallContactPhase,
  wallJumpHudActive,
} from "./MovementDiagnostics";

test("DIAG-01: diagnostic helpers do not rewrite DYNAMIC physics values", () => {
  const previous = readPhysicsTuning();
  try {
    applyPhysicsTuning(PHYSICS_PRESETS.DYNAMIC);
    const before = readPhysicsTuning();

    resolveAirReverseDiagnostic({
      grounded: false,
      vx: 300,
      leftDown: true,
      rightDown: false,
      pressImpulse: -PHYSICS_PRESETS.DYNAMIC.airReversePressImpulse,
      reverseImpulseMagnitude: PhysicsConfig.airReversePressImpulse,
    });
    resolveWallContactPhase(false, false, true, false);
    latchAirReverseDisplay("IMPULSE", 1000, 0);
    latchWallNewFlash("NEW", 1000, 0);
    wallJumpHudActive(1000, 900);

    assert.deepEqual(readPhysicsTuning(), before);
    assert.equal(PhysicsConfig.bounceVelocity, 480);
    assert.equal(PhysicsConfig.airReversePressImpulse, 200);
    assert.equal(PhysicsConfig.airReverseAcceleration, 2800);
    assert.equal(PhysicsConfig.wallJumpHorizontalVelocity, 320);
    assert.equal(PhysicsConfig.wallJumpVerticalVelocity, 500);
    assert.equal(PhysicsConfig.lowBounceFreshPressWindowMs, 130);
    assert.equal(PHYSICS_PRESETS.DYNAMIC.bounceVelocity, 480);
    assert.equal(PHYSICS_PRESETS.CURRENT.bounceVelocity, 580);
    assert.equal(PHYSICS_PRESETS.AGGRESSIVE.bounceVelocity, 450);
  } finally {
    applyPhysicsTuning(previous);
  }
});

test("DIAG-02: AR impulse vs hold vs none from existing reversal signals", () => {
  const reverse = PHYSICS_PRESETS.DYNAMIC.airReversePressImpulse;

  assert.equal(resolveAirReverseDiagnostic({
    grounded: false,
    vx: 220,
    leftDown: true,
    rightDown: false,
    pressImpulse: -reverse,
    reverseImpulseMagnitude: reverse,
  }), "IMPULSE");

  assert.equal(resolveAirReverseDiagnostic({
    grounded: false,
    vx: 220,
    leftDown: true,
    rightDown: false,
    pressImpulse: 0,
    reverseImpulseMagnitude: reverse,
  }), "HOLD");

  assert.equal(resolveAirReverseDiagnostic({
    grounded: false,
    vx: 220,
    leftDown: false,
    rightDown: true,
    pressImpulse: PHYSICS_PRESETS.DYNAMIC.horizontalPressImpulse,
    reverseImpulseMagnitude: reverse,
  }), "—");

  assert.equal(resolveAirReverseDiagnostic({
    grounded: true,
    vx: 300,
    leftDown: true,
    rightDown: false,
    pressImpulse: -reverse,
    reverseImpulseMagnitude: reverse,
  }), "—");

  assert.equal(resolveAirReverseDiagnostic({
    grounded: false,
    vx: 10,
    leftDown: true,
    rightDown: false,
    pressImpulse: 0,
    reverseImpulseMagnitude: reverse,
  }), "—");
});

test("DIAG-03: AR impulse HUD latch is display-only and expires", () => {
  const started = latchAirReverseDisplay("IMPULSE", 1000, 0, AR_IMPULSE_HUD_LATCH_MS);
  assert.equal(started.label, "IMPULSE");
  assert.equal(started.impulseUntilMs, 1180);

  const duringHold = latchAirReverseDisplay("HOLD", 1100, started.impulseUntilMs, AR_IMPULSE_HUD_LATCH_MS);
  assert.equal(duringHold.label, "IMPULSE");
  assert.equal(duringHold.impulseUntilMs, 1180);

  const after = latchAirReverseDisplay("HOLD", 1180, started.impulseUntilMs, AR_IMPULSE_HUD_LATCH_MS);
  assert.equal(after.label, "HOLD");
});

test("DIAG-04: wall NEW vs STAY is observation-only", () => {
  assert.equal(resolveWallContactPhase(false, false, false, false), "—");
  assert.equal(resolveWallContactPhase(false, false, true, false), "NEW");
  assert.equal(resolveWallContactPhase(true, false, true, false), "STAY");
  assert.equal(resolveWallContactPhase(true, false, false, false), "—");
  assert.equal(resolveWallContactPhase(false, false, false, true), "NEW");
  assert.equal(resolveWallContactPhase(false, true, false, true), "STAY");
  assert.equal(resolveWallContactPhase(true, false, false, true), "NEW");
});

test("DIAG-04b: Wall NEW HUD flash is display-only; STAY stays actual contact", () => {
  const started = latchWallNewFlash("NEW", 1000, 0, WALL_NEW_HUD_LATCH_MS);
  assert.equal(started.contact, "NEW");
  assert.equal(started.newFlash, true);

  const duringStay = latchWallNewFlash("STAY", 1100, started.newUntilMs, WALL_NEW_HUD_LATCH_MS);
  assert.equal(duringStay.contact, "STAY");
  assert.equal(duringStay.newFlash, true);

  const after = latchWallNewFlash("STAY", 1180, started.newUntilMs, WALL_NEW_HUD_LATCH_MS);
  assert.equal(after.contact, "STAY");
  assert.equal(after.newFlash, false);

  const left = latchWallNewFlash("—", 1100, started.newUntilMs, WALL_NEW_HUD_LATCH_MS);
  assert.equal(left.contact, "—");
  assert.equal(left.newFlash, false);
});

test("DIAG-05: WJ indicator follows lastWallJumpAt only", () => {
  assert.equal(wallJumpHudActive(1000, 0), false);
  assert.equal(wallJumpHudActive(1000, 1000), true);
  assert.equal(wallJumpHudActive(1220, 1000), true);
  assert.equal(wallJumpHudActive(1221, 1000), false);
});

import { getFreshHorizontalPress, type HorizontalInputSnapshot } from "../input/InputState";
import { PhysicsConfig } from "./PhysicsConfig";

export type BounceType = "NORMAL" | "LOW" | "BOOST";
export type LandingIntent = "FRESH_PRESS" | "HOLD" | "NONE";
export type MovementState = "IDLE" | "DRAG" | "ACCEL" | "REVERSE" | "IMPULSE";
export type BounceInput = HorizontalInputSnapshot;

export type FloorBounceResult = {
  type: BounceType;
  intent: LandingIntent;
  verticalVelocity: number;
  applyHorizontalBoost: boolean;
  boostDirection: -1 | 0 | 1;
};

export function isFreshLandingPress(
  input: BounceInput,
  nowMs: number,
  windowMs: number = PhysicsConfig.lowBounceFreshPressWindowMs,
): boolean {
  const press = getFreshHorizontalPress(input, nowMs);
  return press !== null && press.ageMs <= windowMs;
}

export function isLowBounceEligible(
  input: BounceInput,
  nowMs: number,
  windowMs: number = PhysicsConfig.lowBounceFreshPressWindowMs,
): boolean {
  return isFreshLandingPress(input, nowMs, windowMs);
}

export function isLandingBoostEligible(
  input: BounceInput,
  nowMs: number,
  windowMs: number = PhysicsConfig.lowBounceFreshPressWindowMs,
): boolean {
  const press = getFreshHorizontalPress(input, nowMs);
  return press !== null && press.held && press.ageMs > windowMs;
}

export function resolveLandingIntent(
  input: BounceInput,
  nowMs: number,
  windowMs: number = PhysicsConfig.lowBounceFreshPressWindowMs,
): LandingIntent {
  if (isFreshLandingPress(input, nowMs, windowMs)) {
    return "FRESH_PRESS";
  }
  if (isLandingBoostEligible(input, nowMs, windowMs)) {
    return "HOLD";
  }
  return "NONE";
}

export function isWallJumpEligible(
  wallLeft: boolean,
  wallRight: boolean,
  input: BounceInput,
  nowMs: number,
  bufferMs: number = PhysicsConfig.wallInputBufferMs,
): -1 | 1 | 0 {
  if (wallLeft && wallRight) {
    return 0;
  }

  const leftIntent = hasHorizontalIntent("left", input, nowMs, bufferMs);
  const rightIntent = hasHorizontalIntent("right", input, nowMs, bufferMs);

  if (wallLeft && rightIntent && !input.leftDown) {
    return 1;
  }

  if (wallRight && leftIntent && !input.rightDown) {
    return -1;
  }

  return 0;
}

export function isAirReversing(vx: number, leftDown: boolean, rightDown: boolean): boolean {
  const epsilon = PhysicsConfig.airReverseSpeedEpsilon;
  if (leftDown && !rightDown && vx > epsilon) {
    return true;
  }
  if (rightDown && !leftDown && vx < -epsilon) {
    return true;
  }
  return false;
}

export function resolveMoveAcceleration(
  grounded: boolean,
  vx: number,
  leftDown: boolean,
  rightDown: boolean,
): number {
  if (grounded) {
    return PhysicsConfig.horizontalAcceleration;
  }
  if (isAirReversing(vx, leftDown, rightDown)) {
    return PhysicsConfig.airReverseAcceleration;
  }
  return PhysicsConfig.airAcceleration;
}

export function resolvePressImpulse(vx: number, pressDirection: -1 | 0 | 1): number {
  if (pressDirection === 0) {
    return 0;
  }

  const reversing = isAirReversing(vx, pressDirection === -1, pressDirection === 1);
  const magnitude = reversing
    ? PhysicsConfig.airReversePressImpulse
    : PhysicsConfig.horizontalPressImpulse;
  return pressDirection * magnitude;
}

export function resolveTakeoffDirection(input: BounceInput, nowMs: number, intent: LandingIntent): -1 | 0 | 1 {
  if (intent === "NONE") {
    return 0;
  }

  const press = getFreshHorizontalPress(input, nowMs);
  if (press !== null) {
    return press.direction;
  }
  return input.lastHorizontalDirection;
}

export function resolveTakeoffVelocity(
  currentVx: number,
  direction: -1 | 1,
  bounceType: BounceType,
): number {
  let minimum = PhysicsConfig.takeoffHorizontalVelocityMin;
  if (bounceType === "LOW") {
    minimum *= PhysicsConfig.lowBounceHorizontalMultiplier;
  }
  return direction * Math.max(Math.abs(currentVx), minimum);
}

export function resolveMovementState(
  vx: number,
  leftDown: boolean,
  rightDown: boolean,
  appliedImpulse: number,
): MovementState {
  if (appliedImpulse !== 0) {
    return "IMPULSE";
  }
  if (leftDown && !rightDown) {
    return isAirReversing(vx, true, false) ? "REVERSE" : "ACCEL";
  }
  if (rightDown && !leftDown) {
    return isAirReversing(vx, false, true) ? "REVERSE" : "ACCEL";
  }
  return Math.abs(vx) > PhysicsConfig.airReverseSpeedEpsilon ? "DRAG" : "IDLE";
}

export function resolveFloorBounce(input: BounceInput, nowMs: number): FloorBounceResult {
  const intent = resolveLandingIntent(input, nowMs);

  if (intent === "FRESH_PRESS") {
    return {
      type: "LOW",
      intent,
      verticalVelocity: -PhysicsConfig.bounceVelocity * PhysicsConfig.lowBounceMultiplier,
      applyHorizontalBoost: false,
      boostDirection: 0,
    };
  }

  if (intent === "HOLD") {
    const boostDirection = resolveBoostDirection(input);
    return {
      type: "BOOST",
      intent,
      verticalVelocity: -PhysicsConfig.bounceVelocity,
      applyHorizontalBoost: boostDirection !== 0,
      boostDirection,
    };
  }

  return {
    type: "NORMAL",
    intent,
    verticalVelocity: -PhysicsConfig.bounceVelocity,
    applyHorizontalBoost: false,
    boostDirection: 0,
  };
}

function hasHorizontalIntent(
  side: "left" | "right",
  input: BounceInput,
  nowMs: number,
  bufferMs: number,
): boolean {
  if (side === "left") {
    return input.leftDown || (input.leftPressedAt !== null && nowMs - input.leftPressedAt <= bufferMs);
  }

  return input.rightDown || (input.rightPressedAt !== null && nowMs - input.rightPressedAt <= bufferMs);
}

function resolveBoostDirection(input: BounceInput): -1 | 0 | 1 {
  if (input.rightDown && !input.leftDown) {
    return 1;
  }
  if (input.leftDown && !input.rightDown) {
    return -1;
  }
  return input.lastHorizontalDirection;
}

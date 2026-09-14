import { PhysicsConfig } from "./PhysicsConfig";

export type BounceType = "NORMAL" | "LOW" | "BOOST";

export type BounceInput = {
  leftDown: boolean;
  rightDown: boolean;
  leftPressedAt: number | null;
  rightPressedAt: number | null;
  leftReleasedAt: number | null;
  rightReleasedAt: number | null;
  lastHorizontalDirection: -1 | 0 | 1;
};

export type FloorBounceResult = {
  type: BounceType;
  verticalVelocity: number;
  applyHorizontalBoost: boolean;
  boostDirection: -1 | 0 | 1;
};

export function isLowBounceEligible(
  input: BounceInput,
  nowMs: number,
  windowMs: number = PhysicsConfig.lowBounceWindowMs,
  maxTapMs: number = PhysicsConfig.lowBounceMaxTapMs,
): boolean {
  if (input.leftDown || input.rightDown) {
    return false;
  }

  return wasShortTap(input.leftPressedAt, input.leftReleasedAt, nowMs, windowMs, maxTapMs)
    || wasShortTap(input.rightPressedAt, input.rightReleasedAt, nowMs, windowMs, maxTapMs);
}

export function isLandingBoostEligible(
  input: BounceInput,
  nowMs: number,
  windowMs: number = PhysicsConfig.landingBoostWindowMs,
): boolean {
  if (input.leftDown || input.rightDown) {
    return true;
  }

  if (input.leftPressedAt !== null && nowMs - input.leftPressedAt <= windowMs) {
    return true;
  }

  if (input.rightPressedAt !== null && nowMs - input.rightPressedAt <= windowMs) {
    return true;
  }

  return false;
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

export function resolveFloorBounce(input: BounceInput, nowMs: number): FloorBounceResult {
  if (isLowBounceEligible(input, nowMs)) {
    return {
      type: "LOW",
      verticalVelocity: -PhysicsConfig.bounceVelocity * PhysicsConfig.lowBounceMultiplier,
      applyHorizontalBoost: false,
      boostDirection: 0,
    };
  }

  if (isLandingBoostEligible(input, nowMs)) {
    const boostDirection = resolveBoostDirection(input);
    return {
      type: "BOOST",
      verticalVelocity: -PhysicsConfig.bounceVelocity,
      applyHorizontalBoost: boostDirection !== 0,
      boostDirection,
    };
  }

  return {
    type: "NORMAL",
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

function wasShortTap(
  pressedAt: number | null,
  releasedAt: number | null,
  nowMs: number,
  windowMs: number,
  maxTapMs: number,
): boolean {
  if (pressedAt === null || releasedAt === null || releasedAt < pressedAt) {
    return false;
  }

  if (nowMs - releasedAt > windowMs) {
    return false;
  }

  const duration = releasedAt - pressedAt;
  if (duration > maxTapMs) {
    return false;
  }

  return nowMs - pressedAt <= windowMs + maxTapMs;
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

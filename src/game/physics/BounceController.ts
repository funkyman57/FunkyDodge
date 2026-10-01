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

export type WallJumpContactPhase = "NONE" | "NEW" | "STAY";

export type WallJumpWindowState = {
  prevWallLeft: boolean;
  prevWallRight: boolean;
  windowUntilMs: number;
  firedThisContact: boolean;
};

export type WallJumpPress = {
  leftDown: boolean;
  rightDown: boolean;
  leftJustPressed: boolean;
  rightJustPressed: boolean;
};

export function createWallJumpWindowState(): WallJumpWindowState {
  return {
    prevWallLeft: false,
    prevWallRight: false,
    windowUntilMs: 0,
    firedThisContact: false,
  };
}

export function resolveWallJumpContactPhase(
  prevLeft: boolean,
  prevRight: boolean,
  wallLeft: boolean,
  wallRight: boolean,
): WallJumpContactPhase {
  if (!wallLeft && !wallRight) {
    return "NONE";
  }

  const newLeft = wallLeft && !prevLeft;
  const newRight = wallRight && !prevRight;
  if (newLeft || newRight) {
    return "NEW";
  }

  return "STAY";
}

export function stepWallJumpWindow(
  state: WallJumpWindowState,
  wallLeft: boolean,
  wallRight: boolean,
  nowMs: number,
  windowMs: number = PhysicsConfig.wallJumpResponseWindowMs,
): WallJumpWindowState {
  const phase = resolveWallJumpContactPhase(
    state.prevWallLeft,
    state.prevWallRight,
    wallLeft,
    wallRight,
  );
  const next: WallJumpWindowState = {
    prevWallLeft: wallLeft,
    prevWallRight: wallRight,
    windowUntilMs: state.windowUntilMs,
    firedThisContact: state.firedThisContact,
  };

  if (phase === "NONE") {
    next.windowUntilMs = 0;
    next.firedThisContact = false;
    return next;
  }

  if (phase === "NEW") {
    next.windowUntilMs = nowMs + windowMs;
    next.firedThisContact = false;
    return next;
  }

  return next;
}

export function isWallJumpWindowActive(state: WallJumpWindowState, nowMs: number): boolean {
  return !state.firedThisContact && state.windowUntilMs > 0 && nowMs <= state.windowUntilMs;
}

export function isWallJumpExpired(
  state: WallJumpWindowState,
  wallLeft: boolean,
  wallRight: boolean,
  nowMs: number,
): boolean {
  return (wallLeft || wallRight)
    && !state.firedThisContact
    && state.windowUntilMs > 0
    && nowMs > state.windowUntilMs;
}

export function isWallJumpEligible(
  wallLeft: boolean,
  wallRight: boolean,
  press: WallJumpPress,
  nowMs: number,
  state: WallJumpWindowState,
): -1 | 1 | 0 {
  if (wallLeft && wallRight) {
    return 0;
  }
  if (!isWallJumpWindowActive(state, nowMs)) {
    return 0;
  }

  if (wallLeft && press.rightJustPressed && !press.leftDown) {
    return 1;
  }

  if (wallRight && press.leftJustPressed && !press.rightDown) {
    return -1;
  }

  return 0;
}

export function markWallJumpFired(state: WallJumpWindowState): WallJumpWindowState {
  return {
    ...state,
    firedThisContact: true,
  };
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

export function stepHorizontalVelocity(options: {
  vx: number;
  grounded: boolean;
  leftDown: boolean;
  rightDown: boolean;
  pressDirection: -1 | 0 | 1;
  dt: number;
  maxSpeed?: number;
}): { vx: number; impulse: number; acceleration: number } {
  const impulse = resolvePressImpulse(options.vx, options.pressDirection);
  let vx = options.vx + impulse;
  const acceleration = resolveMoveAcceleration(
    options.grounded,
    vx,
    options.leftDown,
    options.rightDown,
  );

  if (options.leftDown && !options.rightDown) {
    vx -= acceleration * options.dt;
  } else if (options.rightDown && !options.leftDown) {
    vx += acceleration * options.dt;
  } else {
    const drag = PhysicsConfig.horizontalDrag * options.dt;
    if (vx > 0) {
      vx = Math.max(0, vx - drag);
    } else if (vx < 0) {
      vx = Math.min(0, vx + drag);
    }
  }

  const maxSpeed = options.maxSpeed ?? PhysicsConfig.maxHorizontalSpeed;
  vx = Math.max(-maxSpeed, Math.min(maxSpeed, vx));
  return { vx, impulse, acceleration };
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

export function resolveWallJumpVelocity(direction: -1 | 1): { vx: number; vy: number } {
  return {
    vx: direction * PhysicsConfig.wallJumpHorizontalVelocity,
    vy: -PhysicsConfig.wallJumpVerticalVelocity,
  };
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

export function theoreticalBounceApexHeight(
  launchSpeed: number,
  gravity: number = PhysicsConfig.gravity,
): number {
  if (gravity <= 0) {
    return 0;
  }
  return (launchSpeed * launchSpeed) / (2 * gravity);
}

export function theoreticalBounceAirtimeSeconds(
  launchSpeed: number,
  gravity: number = PhysicsConfig.gravity,
): number {
  if (gravity <= 0) {
    return 0;
  }
  return (2 * Math.abs(launchSpeed)) / gravity;
}

export function normalBounceAirtimeSeconds(): number {
  return theoreticalBounceAirtimeSeconds(PhysicsConfig.bounceVelocity);
}

export function lowBounceAirtimeSeconds(): number {
  return theoreticalBounceAirtimeSeconds(
    PhysicsConfig.bounceVelocity * PhysicsConfig.lowBounceMultiplier,
  );
}

export function createFloorBounceResult(
  type: BounceType,
  boostDirection: -1 | 0 | 1 = 0,
): FloorBounceResult {
  if (type === "LOW") {
    return {
      type: "LOW",
      intent: "FRESH_PRESS",
      verticalVelocity: -PhysicsConfig.bounceVelocity * PhysicsConfig.lowBounceMultiplier,
      applyHorizontalBoost: false,
      boostDirection: 0,
    };
  }

  if (type === "BOOST") {
    return {
      type: "BOOST",
      intent: "HOLD",
      verticalVelocity: -PhysicsConfig.bounceVelocity,
      applyHorizontalBoost: boostDirection !== 0,
      boostDirection,
    };
  }

  return {
    type: "NORMAL",
    intent: "NONE",
    verticalVelocity: -PhysicsConfig.bounceVelocity,
    applyHorizontalBoost: false,
    boostDirection: 0,
  };
}

export function resolveFloorBounce(input: BounceInput, nowMs: number): FloorBounceResult {
  const intent = resolveLandingIntent(input, nowMs);

  if (intent === "FRESH_PRESS") {
    return createFloorBounceResult("LOW");
  }

  if (intent === "HOLD") {
    return createFloorBounceResult("BOOST", resolveBoostDirection(input));
  }

  return createFloorBounceResult("NORMAL");
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

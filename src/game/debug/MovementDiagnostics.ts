import { isAirReversing } from "../physics/BounceController";

export type AirReverseHud = "—" | "IMPULSE" | "HOLD";
export type WallContactPhase = "—" | "NEW" | "STAY";

export const AR_IMPULSE_HUD_LATCH_MS = 180;
export const WALL_NEW_HUD_LATCH_MS = 180;
export const WJ_HUD_LATCH_MS = 220;

export function resolveAirReverseDiagnostic(input: {
  grounded: boolean;
  vx: number;
  leftDown: boolean;
  rightDown: boolean;
  pressImpulse: number;
  reverseImpulseMagnitude: number;
}): AirReverseHud {
  if (input.grounded) {
    return "—";
  }

  if (
    input.pressImpulse !== 0
    && Math.abs(input.pressImpulse) === input.reverseImpulseMagnitude
  ) {
    return "IMPULSE";
  }

  if (isAirReversing(input.vx, input.leftDown, input.rightDown)) {
    return "HOLD";
  }

  return "—";
}

export function latchAirReverseDisplay(
  raw: AirReverseHud,
  nowMs: number,
  impulseUntilMs: number,
  latchMs: number = AR_IMPULSE_HUD_LATCH_MS,
): { label: AirReverseHud; impulseUntilMs: number } {
  const until = raw === "IMPULSE" ? nowMs + latchMs : impulseUntilMs;
  if (nowMs < until) {
    return { label: "IMPULSE", impulseUntilMs: until };
  }
  return { label: raw, impulseUntilMs: until };
}

export function resolveWallContactPhase(
  prevLeft: boolean,
  prevRight: boolean,
  wallLeft: boolean,
  wallRight: boolean,
): WallContactPhase {
  if (!wallLeft && !wallRight) {
    return "—";
  }

  const newLeft = wallLeft && !prevLeft;
  const newRight = wallRight && !prevRight;
  if (newLeft || newRight) {
    return "NEW";
  }

  return "STAY";
}

export function latchWallNewFlash(
  raw: WallContactPhase,
  nowMs: number,
  newUntilMs: number,
  latchMs: number = WALL_NEW_HUD_LATCH_MS,
): { contact: WallContactPhase; newFlash: boolean; newUntilMs: number } {
  if (raw === "—") {
    return { contact: "—", newFlash: false, newUntilMs: 0 };
  }

  const until = raw === "NEW" ? nowMs + latchMs : newUntilMs;
  return {
    contact: raw,
    newFlash: nowMs < until,
    newUntilMs: until,
  };
}

export function wallJumpHudActive(
  nowMs: number,
  lastWallJumpAt: number,
  windowMs: number = WJ_HUD_LATCH_MS,
): boolean {
  return lastWallJumpAt > 0 && nowMs - lastWallJumpAt <= windowMs;
}

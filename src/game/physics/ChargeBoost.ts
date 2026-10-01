import type { BounceInput, FloorBounceResult } from "./BounceController";
import { createFloorBounceResult } from "./BounceController";
import { PhysicsConfig } from "./PhysicsConfig";

export type ChargePhase = "NONE" | "CHARGING" | "READY";
export type ChargeEvent = "NONE" | "CANCEL" | "BOOST_FIRE";

export type ChargeState = {
  phase: ChargePhase;
  holdStartedAt: number | null;
  mustRelease: boolean;
  lastEvent: ChargeEvent;
};

export type ChargeFloorDecision = {
  result: FloorBounceResult;
  consumeCharge: boolean;
  cancelCharge: boolean;
};

export function createChargeState(): ChargeState {
  return {
    phase: "NONE",
    holdStartedAt: null,
    mustRelease: false,
    lastEvent: "NONE",
  };
}

export function chargeProgressMs(state: ChargeState, nowMs: number): number {
  if (state.holdStartedAt === null) {
    return 0;
  }
  return Math.max(0, nowMs - state.holdStartedAt);
}

export function chargeProgress01(
  state: ChargeState,
  nowMs: number,
  durationMs: number = PhysicsConfig.chargeDurationMs,
): number {
  if (state.phase === "READY") {
    return 1;
  }
  if (state.phase !== "CHARGING" || durationMs <= 0) {
    return 0;
  }
  return Math.min(1, chargeProgressMs(state, nowMs) / durationMs);
}

export function stepCharge(
  state: ChargeState,
  nowMs: number,
  spaceDown: boolean,
  durationMs: number = PhysicsConfig.chargeDurationMs,
): ChargeState {
  if (!spaceDown) {
    const cancelled = state.phase === "CHARGING" || state.phase === "READY";
    return {
      phase: "NONE",
      holdStartedAt: null,
      mustRelease: false,
      lastEvent: cancelled ? "CANCEL" : "NONE",
    };
  }

  if (state.mustRelease) {
    return {
      phase: "NONE",
      holdStartedAt: null,
      mustRelease: true,
      lastEvent: "NONE",
    };
  }

  const holdStartedAt = state.phase === "NONE" ? nowMs : state.holdStartedAt ?? nowMs;
  const elapsed = nowMs - holdStartedAt;
  return {
    phase: elapsed >= durationMs ? "READY" : "CHARGING",
    holdStartedAt,
    mustRelease: false,
    lastEvent: "NONE",
  };
}

export function consumeChargeBoost(state: ChargeState): ChargeState {
  if (state.phase !== "READY") {
    return state;
  }
  return {
    phase: "NONE",
    holdStartedAt: null,
    mustRelease: true,
    lastEvent: "BOOST_FIRE",
  };
}

export function cancelCharge(state: ChargeState): ChargeState {
  if (state.phase === "NONE") {
    return {
      ...state,
      lastEvent: "NONE",
    };
  }
  return {
    phase: "NONE",
    holdStartedAt: null,
    mustRelease: true,
    lastEvent: "CANCEL",
  };
}

export function resolveChargeBoostDirection(input: BounceInput): -1 | 0 | 1 {
  if (input.rightDown && !input.leftDown) {
    return 1;
  }
  if (input.leftDown && !input.rightDown) {
    return -1;
  }
  return input.lastHorizontalDirection;
}

export function resolveChargeHorizontalVelocity(
  currentVx: number,
  direction: -1 | 1,
  multiplier: number = PhysicsConfig.chargeBoostHorizontalMultiplier,
): number {
  const boostedMax = PhysicsConfig.maxHorizontalSpeed * multiplier;
  const floor = PhysicsConfig.takeoffHorizontalVelocityMin * multiplier;
  const boosted = Math.max(Math.abs(currentVx) * multiplier, floor);
  return direction * Math.max(0, Math.min(boosted, boostedMax));
}

export function applyChargeBoostGate(
  raw: FloorBounceResult,
  input: BounceInput,
  chargeReady: boolean,
): ChargeFloorDecision {
  if (raw.type === "LOW") {
    return {
      result: raw,
      consumeCharge: false,
      cancelCharge: true,
    };
  }

  if (chargeReady) {
    return {
      result: createFloorBounceResult("BOOST", resolveChargeBoostDirection(input)),
      consumeCharge: true,
      cancelCharge: false,
    };
  }

  return {
    result: createFloorBounceResult("NORMAL"),
    consumeCharge: false,
    cancelCharge: false,
  };
}

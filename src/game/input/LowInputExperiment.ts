import type { BounceType } from "../physics/BounceController";

export type InputMode = "LEGACY" | "RHYTHM";

export type RhythmTimingValues = {
  rhythmDoubleTapIntervalMs: number;
  rhythmLandingBufferMs: number;
  rhythmHoldThresholdMs: number;
};

export const RHYTHM_TIMING_DEFAULTS: RhythmTimingValues = {
  rhythmDoubleTapIntervalMs: 220,
  rhythmLandingBufferMs: 140,
  rhythmHoldThresholdMs: 160,
};

export const EXPERIMENT_VERSION = "low-input-experiment-v1";

export const RhythmTiming: RhythmTimingValues = { ...RHYTHM_TIMING_DEFAULTS };

export const LowInputExperiment = {
  mode: "LEGACY" as InputMode,
};

export type DecisionReason =
  | "DOUBLE_TAP_ENTRY"
  | "RHYTHM_CONTINUE"
  | "SUSTAINED_HOLD"
  | "NO_REQUEST"
  | "CONFLICT"
  | "LEGACY_FRESH"
  | "LEGACY_HOLD"
  | "LEGACY_NONE";

export type ClearReason =
  | "EXPIRED"
  | "HOLD_OVERRIDE"
  | "CONFLICT"
  | "WALL_JUMP"
  | "RESET"
  | "MODE_SWITCH"
  | "TIMING_EDIT"
  | "FOCUS_LOSS"
  | "BOUNCE_CONSUMED"
  | null;

export type PendingKind = "NONE" | "ENTRY" | "CONTINUATION";
export type ClearIntent = "NEUTRAL" | "LEFT" | "RIGHT" | "CONFLICT";
export type GestureCue = "NONE" | "FIRST_TAP" | "REQUEST";

export const ExperimentReport = {
  lastBounce: "NORMAL" as BounceType,
  lastDecision: "NO_REQUEST" as DecisionReason,
  lastClearReason: null as ClearReason,
};

export function readRhythmTiming(): RhythmTimingValues {
  return { ...RhythmTiming };
}

export function applyRhythmTiming(values: RhythmTimingValues): void {
  RhythmTiming.rhythmDoubleTapIntervalMs = values.rhythmDoubleTapIntervalMs;
  RhythmTiming.rhythmLandingBufferMs = values.rhythmLandingBufferMs;
  RhythmTiming.rhythmHoldThresholdMs = values.rhythmHoldThresholdMs;
}

export function isPositiveMs(value: number): boolean {
  return Number.isFinite(value) && value > 0;
}

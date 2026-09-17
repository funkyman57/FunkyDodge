import type { BounceType, FloorBounceResult, LandingIntent } from "../physics/BounceController";
import { createFloorBounceResult } from "../physics/BounceController";
import {
  ExperimentReport,
  RhythmTiming,
  type ClearIntent,
  type ClearReason,
  type DecisionReason,
  type GestureCue,
  type PendingKind,
} from "./LowInputExperiment";

type Direction = -1 | 1;

type FirstTap = {
  direction: Direction;
  downAt: number;
  released: boolean;
  durationMs: number | null;
};

type PendingLow = {
  kind: "ENTRY" | "CONTINUATION";
  createdAt: number;
  direction: Direction;
};

export type RhythmPreview = {
  type: BounceType;
  intent: LandingIntent;
  reason: DecisionReason;
  direction: -1 | 0 | 1;
  pending: PendingKind;
  pendingAgeMs: number | null;
  pendingRemainingMs: number | null;
  chain: boolean;
  clearIntent: ClearIntent;
  holdAgeMs: number;
  gestureCue: GestureCue;
};

export class RhythmRecognizer {
  lowChainActive = false;
  lastDecisionReason: DecisionReason = "NO_REQUEST";
  lastClearReason: ClearReason = null;
  gestureCue: GestureCue = "NONE";

  private firstTap: FirstTap | null = null;
  private pending: PendingLow | null = null;
  private leftDown = false;
  private rightDown = false;
  private suppressedLeft = false;
  private suppressedRight = false;
  private holdStartAt: number | null = null;

  reset(reason: Exclude<ClearReason, null>, physicalLeft = false, physicalRight = false): void {
    this.firstTap = null;
    this.pending = null;
    this.lowChainActive = false;
    this.holdStartAt = null;
    this.leftDown = false;
    this.rightDown = false;
    this.suppressedLeft = physicalLeft;
    this.suppressedRight = physicalRight;
    this.gestureCue = "NONE";
    this.lastClearReason = reason;
    this.lastDecisionReason = "NO_REQUEST";
  }

  update(nowMs: number, physicalLeft: boolean, physicalRight: boolean): void {
    if (!physicalLeft) {
      this.suppressedLeft = false;
    }
    if (!physicalRight) {
      this.suppressedRight = false;
    }

    const left = physicalLeft && !this.suppressedLeft;
    const right = physicalRight && !this.suppressedRight;
    const leftPressed = left && !this.leftDown;
    const rightPressed = right && !this.rightDown;
    const leftReleased = !left && this.leftDown;
    const rightReleased = !right && this.rightDown;

    if (left && right && (leftPressed || rightPressed)) {
      this.cancelPending("CONFLICT");
      this.firstTap = null;
      this.gestureCue = "NONE";
    } else {
      if (leftPressed) {
        this.onLogicalDown(nowMs, -1);
      }
      if (rightPressed) {
        this.onLogicalDown(nowMs, 1);
      }
    }
    if (leftReleased) {
      this.onLogicalUp(nowMs, -1);
    }
    if (rightReleased) {
      this.onLogicalUp(nowMs, 1);
    }

    this.leftDown = left;
    this.rightDown = right;
    this.refreshHoldStart(nowMs, leftPressed || rightPressed || leftReleased || rightReleased);
    this.syncHoldAndExpiry(nowMs);
  }

  onWallJump(_nowMs: number): void {
    this.firstTap = null;
    this.pending = null;
    this.lowChainActive = false;
    this.gestureCue = "NONE";
    this.lastClearReason = "WALL_JUMP";
  }

  preview(nowMs: number): RhythmPreview {
    this.syncHoldAndExpiry(nowMs);
    const decision = this.evaluate(nowMs);
    return {
      ...decision,
      pending: this.pending?.kind ?? "NONE",
      pendingAgeMs: this.pending ? nowMs - this.pending.createdAt : null,
      pendingRemainingMs: this.pending
        ? Math.max(0, RhythmTiming.rhythmLandingBufferMs - (nowMs - this.pending.createdAt))
        : null,
      chain: this.lowChainActive,
      clearIntent: this.clearIntent(),
      holdAgeMs: this.holdAge(nowMs),
      gestureCue: this.gestureCue,
    };
  }

  commitLanding(nowMs: number): FloorBounceResult {
    const preview = this.preview(nowMs);
    const result = createFloorBounceResult(preview.type, preview.direction);
    this.lastDecisionReason = preview.reason;
    ExperimentReport.lastBounce = result.type;
    ExperimentReport.lastDecision = preview.reason;
    ExperimentReport.lastClearReason = this.lastClearReason;

    this.firstTap = null;
    this.pending = null;
    this.lowChainActive = result.type === "LOW";
    this.gestureCue = "NONE";
    this.lastClearReason = "BOUNCE_CONSUMED";
    return result;
  }

  private onLogicalDown(nowMs: number, direction: Direction): void {
    if (this.willConflictAfterDown(direction)) {
      this.cancelPending("CONFLICT");
      this.firstTap = null;
      this.gestureCue = "NONE";
      return;
    }

    if (this.lowChainActive) {
      this.pending = { kind: "CONTINUATION", createdAt: nowMs, direction };
      this.gestureCue = "REQUEST";
      return;
    }

    if (this.pending?.kind === "ENTRY") {
      return;
    }

    if (
      this.firstTap
      && this.firstTap.direction === direction
      && this.firstTap.released
      && this.firstTap.durationMs !== null
      && this.firstTap.durationMs < RhythmTiming.rhythmHoldThresholdMs
      && nowMs - this.firstTap.downAt <= RhythmTiming.rhythmDoubleTapIntervalMs
    ) {
      this.pending = { kind: "ENTRY", createdAt: nowMs, direction };
      this.firstTap = null;
      this.gestureCue = "REQUEST";
      return;
    }

    this.firstTap = {
      direction,
      downAt: nowMs,
      released: false,
      durationMs: null,
    };
    this.gestureCue = "FIRST_TAP";
  }

  private onLogicalUp(nowMs: number, direction: Direction): void {
    if (this.firstTap && this.firstTap.direction === direction && !this.firstTap.released) {
      this.firstTap.released = true;
      this.firstTap.durationMs = nowMs - this.firstTap.downAt;
      if (this.firstTap.durationMs >= RhythmTiming.rhythmHoldThresholdMs) {
        this.firstTap = null;
        if (this.gestureCue === "FIRST_TAP") {
          this.gestureCue = "NONE";
        }
      }
    }
  }

  private willConflictAfterDown(direction: Direction): boolean {
    return direction === -1 ? this.rightDown : this.leftDown;
  }

  private refreshHoldStart(nowMs: number, edgeThisFrame: boolean): void {
    const intent = this.clearIntent();
    if (intent === "LEFT" || intent === "RIGHT") {
      if (this.holdStartAt === null || edgeThisFrame) {
        if (this.holdStartAt === null) {
          this.holdStartAt = nowMs;
        }
      }
      return;
    }
    this.holdStartAt = null;
  }

  private syncHoldAndExpiry(nowMs: number): void {
    if (this.clearIntent() === "CONFLICT") {
      if (this.pending || this.firstTap) {
        this.cancelPending("CONFLICT");
        this.firstTap = null;
        this.gestureCue = "NONE";
      }
      this.holdStartAt = null;
      return;
    }

    const holdAge = this.holdAge(nowMs);
    if (this.clearIntent() !== "NEUTRAL" && holdAge >= RhythmTiming.rhythmHoldThresholdMs) {
      if (this.pending || this.firstTap) {
        this.cancelPending("HOLD_OVERRIDE");
        this.firstTap = null;
        this.gestureCue = "NONE";
      }
    }

    if (this.pending && nowMs - this.pending.createdAt > RhythmTiming.rhythmLandingBufferMs) {
      this.pending = null;
      this.lastClearReason = "EXPIRED";
      if (this.gestureCue === "REQUEST") {
        this.gestureCue = "NONE";
      }
    }
  }

  private evaluate(nowMs: number): {
    type: BounceType;
    intent: LandingIntent;
    reason: DecisionReason;
    direction: -1 | 0 | 1;
  } {
    const intent = this.clearIntent();
    if (intent === "CONFLICT") {
      return { type: "NORMAL", intent: "NONE", reason: "CONFLICT", direction: 0 };
    }

    if (intent !== "NEUTRAL" && this.holdAge(nowMs) >= RhythmTiming.rhythmHoldThresholdMs) {
      return {
        type: "BOOST",
        intent: "HOLD",
        reason: "SUSTAINED_HOLD",
        direction: intent === "LEFT" ? -1 : 1,
      };
    }

    if (this.pending && nowMs - this.pending.createdAt <= RhythmTiming.rhythmLandingBufferMs) {
      return {
        type: "LOW",
        intent: "FRESH_PRESS",
        reason: this.pending.kind === "ENTRY" ? "DOUBLE_TAP_ENTRY" : "RHYTHM_CONTINUE",
        direction: this.pending.direction,
      };
    }

    return { type: "NORMAL", intent: "NONE", reason: "NO_REQUEST", direction: 0 };
  }

  clearIntent(): ClearIntent {
    if (this.leftDown && this.rightDown) {
      return "CONFLICT";
    }
    if (this.leftDown) {
      return "LEFT";
    }
    if (this.rightDown) {
      return "RIGHT";
    }
    return "NEUTRAL";
  }

  private holdAge(nowMs: number): number {
    if (this.holdStartAt === null || this.clearIntent() === "NEUTRAL" || this.clearIntent() === "CONFLICT") {
      return 0;
    }
    return nowMs - this.holdStartAt;
  }

  private cancelPending(reason: Exclude<ClearReason, null>): void {
    this.pending = null;
    this.lastClearReason = reason;
  }
}

export const sharedRhythmRecognizer = new RhythmRecognizer();

export function rhythmDecisionToLegacyReason(intent: LandingIntent): DecisionReason {
  if (intent === "FRESH_PRESS") {
    return "LEGACY_FRESH";
  }
  if (intent === "HOLD") {
    return "LEGACY_HOLD";
  }
  return "LEGACY_NONE";
}

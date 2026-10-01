import Phaser from "phaser";
import { LowInputExperiment } from "../input/LowInputExperiment";
import { PhysicsConfig } from "../physics/PhysicsConfig";
import { InputState } from "../input/InputState";
import { PlayerController } from "../player/PlayerController";
import {
  latchAirReverseDisplay,
  latchWallNewFlash,
  resolveAirReverseDiagnostic,
  resolveWallContactPhase,
  wallJumpHudActive,
  type AirReverseHud,
  type WallContactPhase,
} from "./MovementDiagnostics";
import {
  scenarioHudName,
  type ReadabilityHarnessState,
} from "./ReadabilityHarness";

export class DebugHud {
  private readonly text: Phaser.GameObjects.Text;
  private prevWallLeft = false;
  private prevWallRight = false;
  private arImpulseUntilMs = 0;
  private wallNewUntilMs = 0;
  lastAirReverseLabel: AirReverseHud = "—";
  lastWallPhase: WallContactPhase = "—";
  lastWallNewFlash = false;
  lastWallJumpHud = false;

  constructor(scene: Phaser.Scene) {
    this.text = scene.add
      .text(16, 12, "", {
        fontFamily: "DejaVu Sans Mono, JetBrains Mono, monospace",
        fontSize: "13px",
        color: "#e8f1ff",
        backgroundColor: "rgba(8, 12, 24, 0.55)",
        padding: { x: 10, y: 8 },
        lineSpacing: 3,
      })
      .setDepth(100)
      .setScrollFactor(0);
  }

  update(
    player: PlayerController,
    input: InputState,
    nowMs: number,
    readability?: ReadabilityHarnessState,
  ): void {
    this.text.setVisible(PhysicsConfig.debug);
    if (!PhysicsConfig.debug) {
      return;
    }

    if (readability?.displayMode === "PERCEPTION") {
      const scenario = readability.scenarioId
        ? scenarioHudName(readability.scenarioId, "PERCEPTION")
        : "—";
      this.text.setText(
        [
          "PERCEPTION",
          `scenario ${scenario}`,
          readability.scripted ? "scripted" : "live",
        ].join("\n"),
      );
      return;
    }

    const press = input.getFreshHorizontalPress(nowMs);
    const horizontalInput = input.leftDown && !input.rightDown
      ? "LEFT"
      : input.rightDown && !input.leftDown
        ? "RIGHT"
        : "NONE";
    const rawAirReverse = resolveAirReverseDiagnostic({
      grounded: player.grounded,
      vx: player.vx,
      leftDown: input.leftDown,
      rightDown: input.rightDown,
      pressImpulse: player.lastPressImpulse,
      reverseImpulseMagnitude: PhysicsConfig.airReversePressImpulse,
    });
    const latched = latchAirReverseDisplay(rawAirReverse, nowMs, this.arImpulseUntilMs);
    this.arImpulseUntilMs = latched.impulseUntilMs;
    this.lastAirReverseLabel = latched.label;
    const rawWallPhase = resolveWallContactPhase(
      this.prevWallLeft,
      this.prevWallRight,
      player.wallLeft,
      player.wallRight,
    );
    const latchedWall = latchWallNewFlash(rawWallPhase, nowMs, this.wallNewUntilMs);
    this.wallNewUntilMs = latchedWall.newUntilMs;
    this.lastWallPhase = latchedWall.contact;
    this.lastWallNewFlash = latchedWall.newFlash;
    this.prevWallLeft = player.wallLeft;
    this.prevWallRight = player.wallRight;
    this.lastWallJumpHud = wallJumpHudActive(nowMs, player.lastWallJumpAt);
    const showPressAge = press !== null && (press.held || press.ageMs <= PhysicsConfig.lowBounceFreshPressWindowMs);

    if (readability?.active && readability.scenarioId) {
      this.text.setText(
        [
          `READABILITY ${scenarioHudName(readability.scenarioId, "INSTRUMENTED")}`,
          "mode INSTRUMENTED",
          readability.scripted ? `script ${readability.scriptFrame}/${readability.scriptLength}` : "script off",
          `vx ${player.vx.toFixed(1)}`,
          `W2 PRE ${player.lastCarryPreVx.toFixed(1)}`,
          `W2 POST ${player.lastCarryPostVx.toFixed(1)}`,
          `W2 retain ${carryRetain(player.lastCarryPreVx, player.lastCarryPostVx)}`,
          `Bounce Type: ${player.lastBounceType}`,
          `Horizontal Input ${horizontalInput}`,
        ].join("\n"),
      );
      return;
    }

    this.text.setText(
      [
        `vx ${player.vx.toFixed(1)}`,
        `vy ${player.vy.toFixed(1)}`,
        `W2 PRE ${player.lastCarryPreVx.toFixed(1)}`,
        `W2 POST ${player.lastCarryPostVx.toFixed(1)}`,
        `W2 retain ${carryRetain(player.lastCarryPreVx, player.lastCarryPostVx)}`,
        `Horizontal Input ${horizontalInput}`,
        `Fresh Press ${yesNo(player.freshPressThisFrame)}`,
        `Press Age ${showPressAge && press ? `${Math.round(press.ageMs)}ms` : "—"}`,
        `Press Impulse ${player.lastPressImpulse.toFixed(0)}`,
        `AR ${this.lastAirReverseLabel}`,
        `Movement State ${player.movementState}`,
        `Input Mode ${LowInputExperiment.mode}`,
        `Bounce Type: ${player.lastBounceType}`,
        `LOW chain ${player.rhythmPreview ? (player.rhythmPreview.chain ? "ON" : "OFF") : "—"}`,
        `Pending ${formatPending(player)}`,
        `Intent ${player.rhythmPreview?.clearIntent ?? horizontalInput}`,
        `Hold Age ${player.rhythmPreview ? `${Math.round(player.rhythmPreview.holdAgeMs)}ms` : "—"}`,
        `Next ${player.rhythmPreview?.type ?? "—"} (preview)`,
        `Decision ${player.lastDecisionReason}`,
        `Clear ${player.lastClearReason ?? "—"}`,
        `Gesture ${player.rhythmPreview?.gestureCue ?? "NONE"}`,
        `Landing Intent: ${player.landingIntent}`,
        `Grounded ${yesNo(player.grounded)}`,
        `Wall L/R ${yesNo(player.wallLeft)}/${yesNo(player.wallRight)}`,
        `Wall ${this.lastWallPhase}`,
        this.lastWallNewFlash && this.lastWallPhase !== "NEW" ? "Wall NEW" : "",
        this.lastWallJumpHud ? "WJ" : "",
        player.lastBounceType === "BOOST" ? "LANDING BOOST" : "",
      ]
        .filter(Boolean)
        .join("\n"),
    );
  }
}

function yesNo(value: boolean): string {
  return value ? "YES" : "NO";
}

function carryRetain(pre: number, post: number): string {
  if (Math.abs(pre) < 1) {
    return "—";
  }
  return (post / pre).toFixed(2);
}

function formatPending(player: PlayerController): string {
  const preview = player.rhythmPreview;
  if (!preview || preview.pending === "NONE") {
    return "NONE";
  }
  const age = preview.pendingAgeMs === null ? "—" : `${Math.round(preview.pendingAgeMs)}ms`;
  const remain = preview.pendingRemainingMs === null ? "—" : `${Math.round(preview.pendingRemainingMs)}ms`;
  return `${preview.pending} age ${age} left ${remain}`;
}

import Phaser from "phaser";
import { PhysicsConfig } from "../physics/PhysicsConfig";
import { InputState } from "../input/InputState";
import { PlayerController } from "../player/PlayerController";

export class DebugHud {
  private readonly text: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene) {
    this.text = scene.add
      .text(16, 12, "", {
        fontFamily: "monospace",
        fontSize: "13px",
        color: "#e8f1ff",
        backgroundColor: "rgba(8, 12, 24, 0.55)",
        padding: { x: 10, y: 8 },
        lineSpacing: 3,
      })
      .setDepth(100)
      .setScrollFactor(0);
  }

  update(player: PlayerController, input: InputState, nowMs: number): void {
    this.text.setVisible(PhysicsConfig.debug);
    if (!PhysicsConfig.debug) {
      return;
    }

    const windowLabel = player.landingBoostWindowActive
      ? `ON (${Math.round(player.landingBoostWindowMsRemaining)}ms)`
      : "OFF";

    this.text.setText(
      [
        `vx ${player.vx.toFixed(1)}`,
        `vy ${player.vy.toFixed(1)}`,
        `Grounded ${yesNo(player.grounded)}`,
        `Wall Left ${yesNo(player.wallLeft)}`,
        `Wall Right ${yesNo(player.wallRight)}`,
        `Last Input ${input.lastInputLabel}`,
        `Held ${heldLabel(input)}`,
        `Hold Duration ${Math.round(input.getHorizontalHoldDuration(nowMs))}ms`,
        `Bounce Type: ${player.lastBounceType}`,
        `Landing Intent: ${player.landingIntent}`,
        `Approach Intent: ${player.approachIntent}`,
        `Landing Window ${windowLabel}`,
        `Input Duration ${Math.round(input.inputDurationMs(nowMs))}ms`,
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

function heldLabel(input: InputState): string {
  if (input.leftDown && input.rightDown) {
    return "LEFT+RIGHT";
  }
  if (input.leftDown) {
    return "LEFT";
  }
  if (input.rightDown) {
    return "RIGHT";
  }
  return "NONE";
}

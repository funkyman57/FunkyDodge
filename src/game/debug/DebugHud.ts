import Phaser from "phaser";
import { isAirReversing } from "../physics/BounceController";
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

    const press = input.getFreshHorizontalPress(nowMs);
    const horizontalInput = input.leftDown && !input.rightDown
      ? "LEFT"
      : input.rightDown && !input.leftDown
        ? "RIGHT"
        : "NONE";
    const airReverse = !player.grounded && isAirReversing(player.vx, input.leftDown, input.rightDown);
    const showPressAge = press !== null && (press.held || press.ageMs <= PhysicsConfig.lowBounceFreshPressWindowMs);

    this.text.setText(
      [
        `vx ${player.vx.toFixed(1)}`,
        `vy ${player.vy.toFixed(1)}`,
        `Horizontal Input ${horizontalInput}`,
        `Fresh Press ${yesNo(player.freshPressThisFrame)}`,
        `Press Age ${showPressAge && press ? `${Math.round(press.ageMs)}ms` : "—"}`,
        `Press Impulse ${player.lastPressImpulse.toFixed(0)}`,
        `Air Reverse ${yesNo(airReverse)}`,
        `Movement State ${player.movementState}`,
        `Bounce Type: ${player.lastBounceType}`,
        `Landing Intent: ${player.landingIntent}`,
        `Grounded ${yesNo(player.grounded)}`,
        `Wall L/R ${yesNo(player.wallLeft)}/${yesNo(player.wallRight)}`,
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

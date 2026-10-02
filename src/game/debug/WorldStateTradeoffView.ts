import Phaser from "phaser";
import { TRADEOFF_X_ZONE, TRADEOFF_Y_ZONE } from "./WorldStateTradeoff";

export class WorldStateTradeoffView {
  readonly xLabel: Phaser.GameObjects.Text;
  readonly yLabel: Phaser.GameObjects.Text;
  readonly xMark: Phaser.GameObjects.Rectangle;
  readonly yMark: Phaser.GameObjects.Rectangle;

  constructor(scene: Phaser.Scene) {
    const x = TRADEOFF_X_ZONE;
    const y = TRADEOFF_Y_ZONE;
    this.xMark = scene.add
      .rectangle(
        (x.left + x.right) / 2,
        (x.top + x.bottom) / 2,
        x.right - x.left,
        x.bottom - x.top,
      )
      .setStrokeStyle(2, 0x8fd4a8, 0.85)
      .setFillStyle(0x8fd4a8, 0.08)
      .setDepth(3);
    this.yMark = scene.add
      .rectangle(
        (y.left + y.right) / 2,
        (y.top + y.bottom) / 2,
        y.right - y.left,
        y.bottom - y.top,
      )
      .setStrokeStyle(2, 0x8fb4f4, 0.85)
      .setFillStyle(0x8fb4f4, 0.08)
      .setDepth(3);
    this.xLabel = scene.add
      .text((x.left + x.right) / 2, x.top - 4, "X SUPPORT", {
        fontFamily: "DejaVu Sans Mono, JetBrains Mono, monospace",
        fontSize: "11px",
        color: "#8fd4a8",
      })
      .setOrigin(0.5, 1)
      .setDepth(7);
    this.yLabel = scene.add
      .text((y.left + y.right) / 2, y.top - 4, "Y TRAVERSE", {
        fontFamily: "DejaVu Sans Mono, JetBrains Mono, monospace",
        fontSize: "11px",
        color: "#8fb4f4",
      })
      .setOrigin(0.5, 1)
      .setDepth(7);
  }
}

export function tradeoffHudLines(input: {
  xPossible: boolean;
  yPossible: boolean;
  visitedX: boolean;
  visitedY: boolean;
}): string[] {
  return [
    `X SUPPORT ${input.xPossible ? "YES" : "NO"}${input.visitedX ? " used" : ""}`,
    `Y TRAVERSE ${input.yPossible ? "YES" : "NO"}${input.visitedY ? " used" : ""}`,
  ];
}

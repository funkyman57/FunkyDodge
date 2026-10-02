import Phaser from "phaser";
import {
  PREP_STAGING,
  PREP_STAGING_BOUNDS,
  PREP_WAIT,
  prepHudLines,
  prepReadiness,
} from "./WorldStatePrep";

export class WorldStatePrepView {
  private revealLabels = true;
  readonly mark: Phaser.GameObjects.Rectangle;
  readonly label: Phaser.GameObjects.Text;
  readonly waitMark: Phaser.GameObjects.Rectangle;
  readonly waitLabel: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene) {
    const box = PREP_STAGING_BOUNDS;
    this.mark = scene.add
      .rectangle(
        (box.left + box.right) / 2,
        (box.top + box.bottom) / 2,
        box.right - box.left,
        box.bottom - box.top,
      )
      .setStrokeStyle(2, 0x8fb4f4, 0.95)
      .setFillStyle(0x8fb4f4, 0.1)
      .setDepth(3);
    this.label = scene.add
      .text(PREP_STAGING.x, box.top - 4, "PREP Y", {
        fontFamily: "DejaVu Sans Mono, JetBrains Mono, monospace",
        fontSize: "11px",
        color: "#8fb4f4",
      })
      .setOrigin(0.5, 1)
      .setDepth(7);
    this.waitMark = scene.add
      .rectangle(PREP_WAIT.x, PREP_WAIT.y, 20, 20)
      .setStrokeStyle(1, 0x9eb0d0, 0.7)
      .setFillStyle(0x9eb0d0, 0.06)
      .setDepth(3);
    this.waitLabel = scene.add
      .text(PREP_WAIT.x, PREP_WAIT.y - 16, "WAIT", {
        fontFamily: "DejaVu Sans Mono, JetBrains Mono, monospace",
        fontSize: "10px",
        color: "#9eb0d0",
      })
      .setOrigin(0.5, 1)
      .setDepth(7);
  }

  refresh(visible: boolean, x = PREP_WAIT.x, y = PREP_WAIT.y): void {
    const show = visible && this.revealLabels;
    this.mark.setVisible(show);
    this.label.setVisible(show);
    this.waitMark.setVisible(show);
    this.waitLabel.setVisible(show);
    if (!show) {
      return;
    }
    const ready = prepReadiness(x, y);
    this.label.setText(`PREP Y ${ready === "READY AT SETTLE" ? "READY" : ready === "NEARLY READY" ? "NEAR" : "—"}`);
  }

  setRevealLabels(reveal: boolean): void {
    this.revealLabels = reveal;
    if (!reveal) {
      this.mark.setVisible(false);
      this.label.setVisible(false);
      this.waitMark.setVisible(false);
      this.waitLabel.setVisible(false);
    }
  }
}

export { prepHudLines };

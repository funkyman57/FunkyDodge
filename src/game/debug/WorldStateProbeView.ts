import Phaser from "phaser";
import {
  aabbOverlap,
  createWorldStateProbe,
  playerAabb,
  resetWorldState,
  setWorldState,
  WORLD_STATE_PROBE_BOUNDS,
  type BinaryWorldState,
  type WorldStateProbeModel,
} from "./WorldStateProbe";

const SOLID_FILL = 0xd8c27a;
const PASSABLE_FILL = 0x1b2438;
const OUTLINE = 0xf4e3a7;

export class WorldStateProbeView {
  readonly rect: Phaser.GameObjects.Rectangle;
  readonly outline: Phaser.GameObjects.Rectangle;
  readonly label: Phaser.GameObjects.Text;
  readonly body: Phaser.Physics.Arcade.StaticBody;
  model: WorldStateProbeModel;

  constructor(scene: Phaser.Scene) {
    this.model = createWorldStateProbe("SOLID");
    const { left, right, top, bottom } = WORLD_STATE_PROBE_BOUNDS;
    const width = right - left;
    const height = bottom - top;
    const cx = left + width / 2;
    const cy = top + height / 2;

    this.rect = scene.add.rectangle(cx, cy, width, height, SOLID_FILL, 0.95).setDepth(4);
    this.outline = scene.add.rectangle(cx, cy, width + 4, height + 4).setStrokeStyle(3, OUTLINE, 1).setFillStyle(0x000000, 0).setDepth(4);
    scene.physics.add.existing(this.rect, true);
    this.body = this.rect.body as Phaser.Physics.Arcade.StaticBody;
    this.body.updateFromGameObject();

    this.label = scene.add
      .text(cx, top - 10, "PROBE SOLID", {
        fontFamily: "DejaVu Sans Mono, JetBrains Mono, monospace",
        fontSize: "11px",
        color: "#f4e3a7",
      })
      .setOrigin(0.5, 1)
      .setDepth(5);

    this.applyBody();
    this.refreshVisual();
  }

  get solids(): Array<{ left: number; right: number; top: number; bottom: number }> {
    return this.model.state === "SOLID" ? [{ ...this.model.bounds }] : [];
  }

  setState(next: BinaryWorldState, playerX: number, playerY: number, radius: number): boolean {
    this.model = setWorldState(this.model, next, playerAabb(playerX, playerY, radius));
    if (this.model.lastReason === "REFUSED_OVERLAP") {
      this.refreshVisual();
      return false;
    }
    this.applyBody();
    this.refreshVisual();
    return true;
  }

  reset(playerX: number, playerY: number, radius: number): void {
    const occupant = playerAabb(playerX, playerY, radius);
    if (aabbOverlap(occupant, this.model.bounds)) {
      this.model = resetWorldState(this.model, "PASSABLE");
    } else {
      this.model = resetWorldState(this.model, "SOLID");
    }
    this.applyBody();
    this.refreshVisual();
  }

  overlapsPlayer(playerX: number, playerY: number, radius: number): boolean {
    return aabbOverlap(playerAabb(playerX, playerY, radius), this.model.bounds);
  }

  private applyBody(): void {
    this.body.enable = this.model.state === "SOLID";
  }

  private refreshVisual(): void {
    const solid = this.model.state === "SOLID";
    this.rect.setFillStyle(solid ? SOLID_FILL : PASSABLE_FILL, solid ? 0.95 : 0.22);
    this.outline.setStrokeStyle(solid ? 3 : 2, OUTLINE, solid ? 1 : 0.7);
    this.outline.setFillStyle(0x000000, 0);
    const refused = this.model.lastReason === "REFUSED_OVERLAP" ? " REFUSED" : "";
    this.label.setText(`PROBE ${this.model.state}${refused}`);
    this.label.setColor(solid ? "#f4e3a7" : "#b7c4d8");
  }
}

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
  readonly ghost: Phaser.GameObjects.Rectangle;
  model: WorldStateProbeModel;
  private revealLabels = true;
  private ghostEnabled = false;
  private flashUntil = 0;

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
    this.ghost = scene.add
      .rectangle(cx, cy, width + 8, height + 8)
      .setStrokeStyle(2, 0xffffff, 0.35)
      .setFillStyle(0x000000, 0)
      .setDepth(3)
      .setVisible(false);

    this.applyBody();
    this.refreshVisual();
  }

  get solids(): Array<{ left: number; right: number; top: number; bottom: number }> {
    return this.model.state === "SOLID" ? [{ ...this.model.bounds }] : [];
  }

  adoptModel(model: WorldStateProbeModel): void {
    const changed = model.state !== this.model.state;
    this.model = model;
    if (changed) {
      this.flashUntil = this.rect.scene.time.now + 280;
      if (this.ghostEnabled) {
        this.ghost.setVisible(true);
      }
    }
    this.applyBody();
    this.refreshVisual();
  }

  setRevealLabels(reveal: boolean): void {
    this.revealLabels = reveal;
    this.refreshVisual();
  }

  setGhostEnabled(enabled: boolean): void {
    this.ghostEnabled = enabled;
    if (!enabled) {
      this.ghost.setVisible(false);
    }
  }

  pulse(now: number): void {
    const flashing = now < this.flashUntil;
    this.outline.setStrokeStyle(
      this.model.state === "SOLID" ? 3 : 2,
      flashing ? 0xffffff : 0xf4e3a7,
      flashing ? 1 : this.model.state === "SOLID" ? 1 : 0.7,
    );
    if (this.ghostEnabled && !flashing && now > this.flashUntil + 900) {
      this.ghost.setVisible(false);
    }
  }

  setState(next: BinaryWorldState, playerX: number, playerY: number, radius: number): boolean {
    const previous = this.model.state;
    this.model = setWorldState(this.model, next, playerAabb(playerX, playerY, radius));
    if (this.model.lastReason === "REFUSED_OVERLAP") {
      this.refreshVisual();
      return false;
    }
    if (this.model.state !== previous) {
      this.flashUntil = this.rect.scene.time.now + 280;
      if (this.ghostEnabled) {
        this.ghost.setVisible(true);
      }
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
    this.label.setVisible(this.revealLabels);
  }
}

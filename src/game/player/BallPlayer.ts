import Phaser from "phaser";
import type { ChargePhase } from "../physics/ChargeBoost";
import { PhysicsConfig } from "../physics/PhysicsConfig";

export type BallVisualState = "NORMAL" | "BOOST" | "LOW" | "WALL";

const BALL_COLORS: Record<BallVisualState, number> = {
  NORMAL: 0x4ecdc4,
  BOOST: 0xffe66d,
  LOW: 0xc084fc,
  WALL: 0xff6b6b,
};

export class BallPlayer {
  readonly sprite: Phaser.Physics.Arcade.Image;
  readonly label: Phaser.GameObjects.Text;
  private readonly halo: Phaser.GameObjects.Image;

  constructor(scene: Phaser.Scene) {
    const radius = PhysicsConfig.ballRadius;
    ensureBallTexture(scene, radius);
    ensureHaloTexture(scene, radius);

    this.sprite = scene.physics.add.image(PhysicsConfig.spawnX, PhysicsConfig.spawnY, "ball-player");
    this.sprite.setCircle(radius);
    this.sprite.setCollideWorldBounds(false);
    this.sprite.setBounce(0, 0);
    this.sprite.setDrag(0, 0);
    this.sprite.setFriction(0, 0);
    this.sprite.setMaxVelocity(2000, 2500);
    this.sprite.setDepth(10);
    this.body.setAllowGravity(true);
    this.body.onWorldBounds = false;

    this.halo = scene.add.image(this.sprite.x, this.sprite.y, "ball-charge-halo");
    this.halo.setDepth(9);
    this.halo.setVisible(false);

    this.label = scene.add
      .text(this.sprite.x, this.sprite.y - radius - 14, "NORMAL", {
        fontFamily: "DejaVu Sans Mono, JetBrains Mono, monospace",
        fontSize: "12px",
        color: "#ffffff",
      })
      .setOrigin(0.5, 1)
      .setDepth(11);
  }

  get body(): Phaser.Physics.Arcade.Body {
    return this.sprite.body as Phaser.Physics.Arcade.Body;
  }

  get x(): number {
    return this.sprite.x;
  }

  get y(): number {
    return this.sprite.y;
  }

  reset(): void {
    this.body.reset(PhysicsConfig.spawnX, PhysicsConfig.spawnY);
    this.body.setVelocity(0, 0);
    this.body.setAcceleration(0, 0);
    this.body.setAllowGravity(true);
    this.setChargePresentation("NONE", 0, 0);
    this.setVisualState("NORMAL");
  }

  setVisualState(state: BallVisualState): void {
    this.sprite.setTint(BALL_COLORS[state]);
    this.label.setText(state);
    this.label.setVisible(PhysicsConfig.debug);
  }

  setChargePresentation(phase: ChargePhase, progress: number, nowMs: number): void {
    if (phase === "NONE") {
      this.sprite.setAngularVelocity(0);
      this.sprite.setAngle(0);
      this.halo.setVisible(false);
      return;
    }

    const spin = phase === "READY" ? 420 : 90 + 280 * progress;
    this.sprite.setAngularVelocity(spin);
    const ready = phase === "READY";
    this.halo.setVisible(ready);
    if (ready) {
      const pulse = 1 + 0.07 * Math.sin(nowMs / 80);
      this.halo.setScale(pulse);
      this.halo.setAlpha(0.9);
    }
  }

  syncLabel(): void {
    this.label.setPosition(this.sprite.x, this.sprite.y - PhysicsConfig.ballRadius - 14);
    this.label.setVisible(PhysicsConfig.debug);
    this.halo.setPosition(this.sprite.x, this.sprite.y);
    this.halo.setAngle(this.sprite.angle);
  }
}

function ensureBallTexture(scene: Phaser.Scene, radius: number): void {
  if (scene.textures.exists("ball-player")) {
    return;
  }

  const size = radius * 2;
  const graphics = scene.make.graphics({ x: 0, y: 0 });
  graphics.fillStyle(0xffffff, 1);
  graphics.fillCircle(radius, radius, radius);
  graphics.fillStyle(0x0b1020, 0.55);
  graphics.fillCircle(radius + radius * 0.35, radius - radius * 0.2, radius * 0.22);
  graphics.fillCircle(radius - radius * 0.28, radius + radius * 0.28, radius * 0.14);
  graphics.lineStyle(2, 0x0b1020, 0.35);
  graphics.strokeCircle(radius, radius, radius - 1);
  graphics.generateTexture("ball-player", size, size);
  graphics.destroy();
}

function ensureHaloTexture(scene: Phaser.Scene, radius: number): void {
  if (scene.textures.exists("ball-charge-halo")) {
    return;
  }

  const size = Math.ceil(radius * 3.2);
  const center = size / 2;
  const graphics = scene.make.graphics({ x: 0, y: 0 });
  graphics.lineStyle(4, 0xfff3c4, 1);
  graphics.strokeCircle(center, center, radius + 8);
  graphics.lineStyle(2, 0xffffff, 0.7);
  graphics.strokeCircle(center, center, radius + 12);
  graphics.generateTexture("ball-charge-halo", size, size);
  graphics.destroy();
}

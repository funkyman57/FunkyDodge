import Phaser from "phaser";
import { PhysicsConfig } from "../physics/PhysicsConfig";

export type BallVisualState = "NORMAL" | "BOOST" | "LOW" | "WALL";

const BALL_COLORS: Record<BallVisualState, number> = {
  NORMAL: 0x4ecdc4,
  BOOST: 0xffe66d,
  LOW: 0xa78bfa,
  WALL: 0xff6b6b,
};

export class BallPlayer {
  readonly sprite: Phaser.Physics.Arcade.Image;
  readonly label: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene) {
    const radius = PhysicsConfig.ballRadius;
    ensureBallTexture(scene, radius);

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

    this.label = scene.add
      .text(this.sprite.x, this.sprite.y - radius - 14, "NORMAL", {
        fontFamily: "monospace",
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
    this.setVisualState("NORMAL");
  }

  setVisualState(state: BallVisualState): void {
    this.sprite.setTint(BALL_COLORS[state]);
    this.label.setText(state);
    this.label.setVisible(PhysicsConfig.debug);
  }

  syncLabel(): void {
    this.label.setPosition(this.sprite.x, this.sprite.y - PhysicsConfig.ballRadius - 14);
    this.label.setVisible(PhysicsConfig.debug);
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
  graphics.lineStyle(2, 0x0b1020, 0.35);
  graphics.strokeCircle(radius, radius, radius - 1);
  graphics.generateTexture("ball-player", size, size);
  graphics.destroy();
}

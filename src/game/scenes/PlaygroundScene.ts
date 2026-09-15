import Phaser from "phaser";
import { DebugHud } from "../debug/DebugHud";
import { InputState } from "../input/InputState";
import { isAirReversing } from "../physics/BounceController";
import { PhysicsConfig } from "../physics/PhysicsConfig";
import { BallPlayer } from "../player/BallPlayer";
import { PlayerController } from "../player/PlayerController";

const WALL = 0x24314d;
const PLATFORM = 0x3d6ea8;
const LOW_CEILING = 0x7b4ea3;
const JUMP_WALL = 0xc45c6a;

type Solid = {
  left: number;
  right: number;
  top: number;
  bottom: number;
};

export class PlaygroundScene extends Phaser.Scene {
  private player!: BallPlayer;
  private controller!: PlayerController;
  private inputState!: InputState;
  private hud!: DebugHud;
  private keys!: {
    left: Phaser.Input.Keyboard.Key;
    right: Phaser.Input.Keyboard.Key;
    a: Phaser.Input.Keyboard.Key;
    d: Phaser.Input.Keyboard.Key;
    r: Phaser.Input.Keyboard.Key;
  };

  constructor() {
    super("PlaygroundScene");
  }

  create(): void {
    this.cameras.main.setBackgroundColor(0x12182b);
    this.physics.world.gravity.y = PhysicsConfig.gravity;
    this.physics.world.setBounds(0, 0, PhysicsConfig.width, PhysicsConfig.height);

    const { solids, platforms } = this.createTestRoom();

    this.player = new BallPlayer(this);
    this.inputState = new InputState();
    this.controller = new PlayerController(this.player, this.inputState);
    this.controller.setSolids(solids);
    this.hud = new DebugHud(this);

    this.physics.add.collider(this.player.sprite, platforms);
    this.game.canvas.setAttribute("tabindex", "0");
    this.game.canvas.focus();
    this.input.on("pointerdown", () => this.game.canvas.focus());

    this.keys = this.input.keyboard!.addKeys({
      left: Phaser.Input.Keyboard.KeyCodes.LEFT,
      right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
      a: Phaser.Input.Keyboard.KeyCodes.A,
      d: Phaser.Input.Keyboard.KeyCodes.D,
      r: Phaser.Input.Keyboard.KeyCodes.R,
    }) as typeof this.keys;

    this.add
      .text(PhysicsConfig.width - 16, 12, [
        "PHYSICS PLAYGROUND",
        "PLAY-001C cadence pass",
        "A/D or arrows: move",
        "R: restart",
        "Fresh tap near land: LOW",
        "Hold into land: BOOST",
        "Opposite on wall: WALL JUMP",
      ].join("\n"), {
        fontFamily: "DejaVu Sans Mono, JetBrains Mono, monospace",
        fontSize: "12px",
        color: "#c9d6f0",
        align: "right",
        lineSpacing: 3,
      })
      .setOrigin(1, 0)
      .setDepth(100);
  }

  update(time: number, delta: number): void {
    const override = debugInputOverride();
    const leftDown = override.left ?? (this.keys.left.isDown || this.keys.a.isDown);
    const rightDown = override.right ?? (this.keys.right.isDown || this.keys.d.isDown);
    const restartJustPressed = override.restart || Phaser.Input.Keyboard.JustDown(this.keys.r);

    this.inputState.update(time, leftDown, rightDown, restartJustPressed);

    if (this.inputState.restartJustPressed) {
      this.controller.reset();
      this.inputState.reset();
      this.inputState.update(time, leftDown, rightDown, false);
    }

    this.controller.update(time, delta);
    this.hud.update(this.controller, this.inputState, time);
    publishDebugState(this.controller, this.inputState, time);
  }

  private createTestRoom(): { solids: Solid[]; platforms: Phaser.GameObjects.Rectangle[] } {
    const t = 24;
    const w = PhysicsConfig.width;
    const h = PhysicsConfig.height;
    const solids: Solid[] = [];
    const platforms: Phaser.GameObjects.Rectangle[] = [];

    addSolid(this, platforms, solids, 0, 0, w, t, WALL);
    addSolid(this, platforms, solids, 0, h - t, w, t, WALL);
    addSolid(this, platforms, solids, 0, 0, t, h, WALL);
    addSolid(this, platforms, solids, w - t, 0, t, h, WALL);

    const platform = addSolid(this, platforms, solids, 150, 378, 160, 18, PLATFORM);
    label(this, platform.x, platform.y - 18, "PLATFORM");

    const lowCeiling = addSolid(this, platforms, solids, 688, 404, 224, 20, LOW_CEILING);
    label(this, lowCeiling.x, lowCeiling.y - 18, "LOW CEILING");

    const jumpWall = addSolid(this, platforms, solids, 500, 258, 24, 258, JUMP_WALL);
    label(this, jumpWall.x, jumpWall.y - 18, "WALL JUMP");

    return { solids, platforms };
  }
}

function addSolid(
  scene: Phaser.Scene,
  platforms: Phaser.GameObjects.Rectangle[],
  solids: Solid[],
  x: number,
  y: number,
  width: number,
  height: number,
  color: number,
): Phaser.GameObjects.Rectangle {
  const rect = scene.add.rectangle(x + width / 2, y + height / 2, width, height, color);
  scene.physics.add.existing(rect, true);
  const body = rect.body as Phaser.Physics.Arcade.StaticBody;
  body.updateFromGameObject();
  platforms.push(rect);
  solids.push({
    left: body.left,
    right: body.right,
    top: body.top,
    bottom: body.bottom,
  });
  return rect;
}

function label(scene: Phaser.Scene, x: number, y: number, text: string): void {
  scene.add
    .text(x, y, text, {
      fontFamily: "DejaVu Sans Mono, JetBrains Mono, monospace",
      fontSize: "11px",
      color: "#d7e3ff",
    })
    .setOrigin(0.5, 1)
    .setDepth(5);
}

type DebugInputOverride = {
  left?: boolean;
  right?: boolean;
  restart?: boolean;
};

function debugInputOverride(): DebugInputOverride {
  if (!PhysicsConfig.debug) {
    return {};
  }

  const fromWindow = (window as Window & { __inputOverride?: DebugInputOverride }).__inputOverride ?? {};
  const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
  const hold = hash.get("hold");

  return {
    left: fromWindow.left ?? (hold === "left" ? true : undefined),
    right: fromWindow.right ?? (hold === "right" ? true : undefined),
    restart: fromWindow.restart === true,
  };
}

function publishDebugState(player: PlayerController, input: InputState, nowMs: number): void {
  if (!PhysicsConfig.debug) {
    return;
  }

  (window as Window & { __playground?: unknown }).__playground = {
    vx: player.vx,
    vy: player.vy,
    grounded: player.grounded,
    wallLeft: player.wallLeft,
    wallRight: player.wallRight,
    bounceType: player.lastBounceType,
    visualState: player.visualState,
    landingIntent: player.landingIntent,
    approachIntent: player.approachIntent,
    movementState: player.movementState,
    freshPress: player.freshPressThisFrame,
    pressImpulse: player.lastPressImpulse,
    pressAgeMs: input.getFreshHorizontalPress(nowMs)?.ageMs ?? null,
    airReverse: !player.grounded && isAirReversing(player.vx, input.leftDown, input.rightDown),
    held: input.leftDown ? "LEFT" : input.rightDown ? "RIGHT" : "NONE",
    lastInput: input.lastInputLabel,
    inputDurationMs: input.inputDurationMs(nowMs),
    holdDurationMs: input.getHorizontalHoldDuration(nowMs),
    landingBoostWindow: player.landingBoostWindowActive,
    x: player.x,
    y: player.y,
  };
}

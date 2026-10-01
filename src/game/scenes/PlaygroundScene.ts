import Phaser from "phaser";
import { DebugHud } from "../debug/DebugHud";
import { mountPhysicsLab, physicsLabEnabled, type PhysicsLabHandle } from "../debug/PhysicsLab";
import {
  createReadabilityHarnessState,
  launchPose,
  launchScript,
  type ReadabilityScenarioId,
} from "../debug/ReadabilityHarness";
import { ReadabilityOverlay } from "../debug/ReadabilityOverlay";
import { InputState } from "../input/InputState";
import { LowInputExperiment, type ClearReason } from "../input/LowInputExperiment";
import { sharedRhythmRecognizer } from "../input/RhythmRecognizer";
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
  private physicsLab: PhysicsLabHandle | null = null;
  private keys!: {
    left: Phaser.Input.Keyboard.Key;
    right: Phaser.Input.Keyboard.Key;
    a: Phaser.Input.Keyboard.Key;
    d: Phaser.Input.Keyboard.Key;
    r: Phaser.Input.Keyboard.Key;
    one: Phaser.Input.Keyboard.Key;
    two: Phaser.Input.Keyboard.Key;
    three: Phaser.Input.Keyboard.Key;
    four: Phaser.Input.Keyboard.Key;
    m: Phaser.Input.Keyboard.Key;
  };
  private overlay!: ReadabilityOverlay;
  private helpText!: Phaser.GameObjects.Text;
  private extraDecor: Phaser.GameObjects.GameObject[] = [];
  private extraBodies: Phaser.Physics.Arcade.StaticBody[] = [];
  private boundsSolids: Solid[] = [];
  private roomSolids: Solid[] = [];
  private readability = createReadabilityHarnessState();
  private script: Array<{ left: boolean; right: boolean }> = [];

  constructor() {
    super("PlaygroundScene");
  }

  create(): void {
    this.cameras.main.setBackgroundColor(0x12182b);
    this.physics.world.gravity.y = PhysicsConfig.gravity;
    this.physics.world.setBounds(0, 0, PhysicsConfig.width, PhysicsConfig.height);

    const { solids, platforms } = this.createTestRoom();
    this.roomSolids = solids;

    this.player = new BallPlayer(this);
    this.inputState = new InputState();
    this.controller = new PlayerController(this.player, this.inputState);
    this.controller.setSolids(solids);
    this.hud = new DebugHud(this);
    this.overlay = new ReadabilityOverlay(this, PhysicsConfig.height - 24);
    if (physicsLabEnabled()) {
      this.physicsLab = mountPhysicsLab({
        onResetBall: () => this.resetPlaySession("RESET"),
        onValuesChanged: () => {
          this.physics.world.gravity.y = PhysicsConfig.gravity;
        },
        onModeOrTimingChanged: (reason) => this.resetPlaySession(reason),
        onReadabilityLaunch: (id) => this.launchReadability(id),
        onReadabilityModeToggle: () => this.toggleReadabilityMode(),
      });
      this.physics.world.gravity.y = PhysicsConfig.gravity;
    }

    window.addEventListener("blur", this.handleFocusLoss);
    document.addEventListener("visibilitychange", this.handleVisibilityChange);

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
      one: Phaser.Input.Keyboard.KeyCodes.ONE,
      two: Phaser.Input.Keyboard.KeyCodes.TWO,
      three: Phaser.Input.Keyboard.KeyCodes.THREE,
      four: Phaser.Input.Keyboard.KeyCodes.FOUR,
      m: Phaser.Input.Keyboard.KeyCodes.M,
    }) as typeof this.keys;

    this.helpText = this.add
      .text(PhysicsConfig.width - 16, 12, defaultHelpText(), {
        fontFamily: "DejaVu Sans Mono, JetBrains Mono, monospace",
        fontSize: "12px",
        color: "#c9d6f0",
        align: "right",
        lineSpacing: 3,
      })
      .setOrigin(1, 0)
      .setDepth(100)
      .setScrollFactor(0);
  }

  update(time: number, delta: number): void {
    const typing = document.activeElement instanceof HTMLInputElement;
    const override = debugInputOverride();
    const restartJustPressed = override.restart || Phaser.Input.Keyboard.JustDown(this.keys.r);

    if (!typing) {
      if (Phaser.Input.Keyboard.JustDown(this.keys.one)) {
        this.launchReadability("A1");
      } else if (Phaser.Input.Keyboard.JustDown(this.keys.two)) {
        this.launchReadability("A2");
      } else if (Phaser.Input.Keyboard.JustDown(this.keys.three)) {
        this.launchReadability("B");
      } else if (Phaser.Input.Keyboard.JustDown(this.keys.four)) {
        this.launchReadability("C");
      } else if (Phaser.Input.Keyboard.JustDown(this.keys.m)) {
        this.toggleReadabilityMode();
      } else if (restartJustPressed) {
        if (this.readability.active && this.readability.scenarioId) {
          this.launchReadability(this.readability.scenarioId);
        } else {
          this.resetPlaySession("RESET");
        }
      }
    }

    const scripted = this.nextScriptedInput();
    const leftDown = scripted?.left ?? override.left ?? (this.keys.left.isDown || this.keys.a.isDown);
    const rightDown = scripted?.right ?? override.right ?? (this.keys.right.isDown || this.keys.d.isDown);

    this.inputState.update(time, leftDown, rightDown, false);
    if (LowInputExperiment.mode === "RHYTHM") {
      sharedRhythmRecognizer.update(time, leftDown, rightDown);
    }

    const groundedBefore = this.controller.grounded;
    this.controller.update(time, delta);
    if (this.readability.active && this.controller.grounded && !groundedBefore) {
      this.overlay.markContact(this.controller.x, this.controller.y);
    }
    this.overlay.recordPoint(this.controller.x, this.controller.y);
    this.hud.update(this.controller, this.inputState, time, this.readability);
    publishDebugState(this.controller, this.inputState, this.hud, time, this.readability);
  }

  private resetPlaySession(reason: Exclude<ClearReason, null>): void {
    this.clearReadabilityLaunch(false);
    const physical = this.physicalDirections();
    this.controller.reset();
    this.inputState.reset();
    this.inputState.adoptHeld(physical.left, physical.right);
    sharedRhythmRecognizer.reset(reason, physical.left, physical.right);
    this.player.setDebugLabelHidden(this.readability.displayMode === "PERCEPTION");
    this.refreshHelp();
    this.physicsLab?.setReadabilityState(this.readability);
  }

  private launchReadability(id: ReadabilityScenarioId): void {
    this.physicsLab?.applyPreset("CURRENT");
    LowInputExperiment.mode = "LEGACY";
    this.setHarnessRoom(true);
    this.script = launchScript(id);
    this.readability.active = true;
    this.readability.scenarioId = id;
    this.readability.scripted = true;
    this.readability.scriptFrame = 0;
    this.readability.scriptLength = this.script.length;
    this.overlay.showScenario(id);
    this.overlay.beginRun();
    this.controller.reset();
    this.inputState.reset();
    sharedRhythmRecognizer.reset("RESET", false, false);
    const pose = launchPose();
    this.controller.placeAt(pose.x, pose.y, pose.vx, pose.vy);
    this.player.setDebugLabelHidden(this.readability.displayMode === "PERCEPTION");
    this.refreshHelp();
    this.physicsLab?.setReadabilityState(this.readability);
  }

  private toggleReadabilityMode(): void {
    this.readability.displayMode = this.readability.displayMode === "PERCEPTION"
      ? "INSTRUMENTED"
      : "PERCEPTION";
    this.player.setDebugLabelHidden(this.readability.displayMode === "PERCEPTION");
    this.refreshHelp();
    this.physicsLab?.setReadabilityState(this.readability);
  }

  private nextScriptedInput(): { left: boolean; right: boolean } | null {
    if (!this.readability.scripted || this.script.length === 0) {
      this.readability.scripted = false;
      return null;
    }
    const frame = this.script[this.readability.scriptFrame];
    this.readability.scriptFrame += 1;
    if (this.readability.scriptFrame >= this.script.length) {
      this.readability.scripted = false;
    }
    return frame;
  }

  private clearReadabilityLaunch(keepOverlay: boolean): void {
    this.script = [];
    this.readability.scripted = false;
    this.readability.scriptFrame = 0;
    this.readability.scriptLength = 0;
    if (!keepOverlay) {
      this.readability.active = false;
      this.readability.scenarioId = null;
      this.setHarnessRoom(false);
      this.overlay.hide();
    }
  }

  private setHarnessRoom(active: boolean): void {
    for (const decor of this.extraDecor) {
      if ("setVisible" in decor) {
        (decor as Phaser.GameObjects.GameObject & { setVisible: (v: boolean) => void }).setVisible(!active);
      }
    }
    for (const body of this.extraBodies) {
      body.enable = !active;
    }
    this.controller.setSolids(active ? this.boundsSolids : this.roomSolids);
  }

  private refreshHelp(): void {
    if (!this.helpText) {
      return;
    }
    const perception = this.readability.displayMode === "PERCEPTION";
    this.helpText.setText(this.readability.active ? harnessHelpText(perception) : defaultHelpText());
    this.helpText.setVisible(!perception || this.readability.active);
  }

  private physicalDirections(): { left: boolean; right: boolean } {
    if (!this.keys) {
      return { left: false, right: false };
    }
    const override = debugInputOverride();
    return {
      left: override.left ?? (this.keys.left.isDown || this.keys.a.isDown),
      right: override.right ?? (this.keys.right.isDown || this.keys.d.isDown),
    };
  }

  private readonly handleFocusLoss = (): void => {
    const physical = this.physicalDirections();
    sharedRhythmRecognizer.reset("FOCUS_LOSS", physical.left, physical.right);
    this.inputState.adoptHeld(physical.left, physical.right);
  };

  private readonly handleVisibilityChange = (): void => {
    if (document.hidden) {
      this.handleFocusLoss();
    }
  };

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
    this.boundsSolids = [...solids];

    const platform = addSolid(this, platforms, solids, 150, 378, 160, 18, PLATFORM);
    const platformLabel = label(this, platform.x, platform.y - 18, "PLATFORM");

    const lowCeiling = addSolid(this, platforms, solids, 688, 404, 224, 20, LOW_CEILING);
    const lowCeilingLabel = label(this, lowCeiling.x, lowCeiling.y - 18, "LOW CEILING");

    const jumpWall = addSolid(this, platforms, solids, 500, 258, 24, 258, JUMP_WALL);
    const jumpWallLabel = label(this, jumpWall.x, jumpWall.y - 18, "WALL JUMP");

    this.extraDecor = [platform, lowCeiling, jumpWall, platformLabel, lowCeilingLabel, jumpWallLabel];
    this.extraBodies = [
      platform.body as Phaser.Physics.Arcade.StaticBody,
      lowCeiling.body as Phaser.Physics.Arcade.StaticBody,
      jumpWall.body as Phaser.Physics.Arcade.StaticBody,
    ];

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

function label(scene: Phaser.Scene, x: number, y: number, text: string): Phaser.GameObjects.Text {
  return scene.add
    .text(x, y, text, {
      fontFamily: "DejaVu Sans Mono, JetBrains Mono, monospace",
      fontSize: "11px",
      color: "#d7e3ff",
    })
    .setOrigin(0.5, 1)
    .setDepth(5);
}

function defaultHelpText(): string {
  return [
    "PHYSICS PLAYGROUND",
    "LOW input experiment",
    "A/D or arrows: move",
    "R: restart",
    "L: toggle Physics Lab",
    "1/2/3/4: A1 A2 B C",
    "M: readability mode",
    "LEGACY: fresh tap = LOW",
    "RHYTHM: 따닥 entry, 탁 continue",
    "Hold into land: BOOST",
    "Opposite on wall: WALL JUMP",
  ].join("\n");
}

function harnessHelpText(perception: boolean): string {
  if (perception) {
    return ["1/2/3/4 launch", "M mode", "R replay"].join("\n");
  }
  return [
    "READABILITY HARNESS",
    "1 A1  2 A2  3 B  4 C",
    "M: instrumented / perception",
    "R: replay scenario",
    "L: toggle Physics Lab",
  ].join("\n");
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

function publishDebugState(
  player: PlayerController,
  input: InputState,
  hud: DebugHud,
  nowMs: number,
  readability?: ReturnType<typeof createReadabilityHarnessState>,
): void {
  if (!PhysicsConfig.debug) {
    return;
  }

  (window as Window & { __playground?: unknown }).__playground = {
    vx: player.vx,
    vy: player.vy,
    grounded: player.grounded,
    wallLeft: player.wallLeft,
    wallRight: player.wallRight,
    wallPhase: hud.lastWallPhase,
    wallNewHud: hud.lastWallNewFlash,
    wallJumpHud: hud.lastWallJumpHud,
    inputMode: LowInputExperiment.mode,
    bounceType: player.lastBounceType,
    lastDecision: player.lastDecisionReason,
    lastClear: player.lastClearReason,
    lowChain: player.rhythmPreview?.chain ?? null,
    pending: player.rhythmPreview?.pending ?? null,
    nextResponse: player.rhythmPreview?.type ?? null,
    gestureCue: player.rhythmPreview?.gestureCue ?? null,
    visualState: player.visualState,
    landingIntent: player.landingIntent,
    approachIntent: player.approachIntent,
    movementState: player.movementState,
    freshPress: player.freshPressThisFrame,
    pressImpulse: player.lastPressImpulse,
    pressAgeMs: input.getFreshHorizontalPress(nowMs)?.ageMs ?? null,
    airReverse: hud.lastAirReverseLabel,
    held: input.leftDown ? "LEFT" : input.rightDown ? "RIGHT" : "NONE",
    lastInput: input.lastInputLabel,
    inputDurationMs: input.inputDurationMs(nowMs),
    holdDurationMs: input.getHorizontalHoldDuration(nowMs),
    landingBoostWindow: player.landingBoostWindowActive,
    lastCarryPreVx: player.lastCarryPreVx,
    lastCarryPostVx: player.lastCarryPostVx,
    x: player.x,
    y: player.y,
    readability: readability
      ? {
        active: readability.active,
        scenario: readability.scenarioId,
        mode: readability.displayMode,
        scripted: readability.scripted,
      }
      : null,
  };
}

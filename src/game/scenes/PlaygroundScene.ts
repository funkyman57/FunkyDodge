import Phaser from "phaser";
import { DebugHud } from "../debug/DebugHud";
import { mountPhysicsLab, physicsLabEnabled, type PhysicsLabHandle } from "../debug/PhysicsLab";
import {
  WORLD_STATE_PROBE_BOUNDS,
  WORLD_STATE_SUPPORT,
  WORLD_STATE_TRAVERSAL,
  type BinaryWorldState,
  type WorldStateScenarioId,
} from "../debug/WorldStateProbe";
import { WorldStateProbeView } from "../debug/WorldStateProbeView";
import {
  AGENCY_A_AVOID,
  AGENCY_A_CAUSE,
  AGENCY_B_AVOID,
  AGENCY_B_CAUSE,
  type AgencyModelId,
  type AgencyScenarioId,
} from "../debug/WorldStateAgency";
import { agencyHudLines, WorldStateAgencyView } from "../debug/WorldStateAgencyView";
import { possibilityRow, type TradeoffScenarioId } from "../debug/WorldStateTradeoff";
import { tradeoffHudLines, WorldStateTradeoffView } from "../debug/WorldStateTradeoffView";
import {
  DELAY_CONTACT,
  DELAY_MS,
  acknowledgeCause,
  advanceDelay,
  createDelaySession,
  recontactWhilePending,
  resetDelaySession,
  restoreDelayImmediately,
  seekDelayProgress,
  stepDelay,
  type DelayScenarioId,
  type DelaySession,
} from "../debug/WorldStateDelay";
import { delayHudLines, WorldStateDelayView } from "../debug/WorldStateDelayView";
import {
  PREP_PARTIAL_WAIT_FRAMES,
  PREP_VX,
  PREP_WAIT,
  type PrepScenarioId,
} from "../debug/WorldStatePrep";
import { prepHudLines, WorldStatePrepView } from "../debug/WorldStatePrepView";
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
    t: Phaser.Input.Keyboard.Key;
    five: Phaser.Input.Keyboard.Key;
    six: Phaser.Input.Keyboard.Key;
    seven: Phaser.Input.Keyboard.Key;
    eight: Phaser.Input.Keyboard.Key;
    nine: Phaser.Input.Keyboard.Key;
    m: Phaser.Input.Keyboard.Key;
  };
  private probe!: WorldStateProbeView;
  private agency!: WorldStateAgencyView;
  private tradeoff!: WorldStateTradeoffView;
  private delayView!: WorldStateDelayView;
  private prepView!: WorldStatePrepView;
  private delaySession: DelaySession = createDelaySession();
  private delayEnabled = true;
  private visitedX = false;
  private visitedY = false;
  private roomSolids: Solid[] = [];

  constructor() {
    super("PlaygroundScene");
  }

  create(): void {
    this.cameras.main.setBackgroundColor(0x12182b);
    this.physics.world.gravity.y = PhysicsConfig.gravity;
    this.physics.world.setBounds(0, 0, PhysicsConfig.width, PhysicsConfig.height);

    const { solids, platforms } = this.createTestRoom();
    this.roomSolids = solids;
    this.probe = new WorldStateProbeView(this);
    this.agency = new WorldStateAgencyView(this);
    this.tradeoff = new WorldStateTradeoffView(this);
    this.delayView = new WorldStateDelayView(this);
    this.prepView = new WorldStatePrepView(this);
    platforms.push(this.probe.rect);
    platforms.push(this.agency.activatorRect);

    this.player = new BallPlayer(this);
    this.inputState = new InputState();
    this.controller = new PlayerController(this.player, this.inputState);
    this.syncSolids();
    this.hud = new DebugHud(this);
    if (physicsLabEnabled()) {
      this.physicsLab = mountPhysicsLab({
        onResetBall: () => this.resetPlaySession("RESET"),
        onValuesChanged: () => {
          this.physics.world.gravity.y = PhysicsConfig.gravity;
        },
        onModeOrTimingChanged: (reason) => this.resetPlaySession(reason),
        onWorldStateSet: (state) => this.setProbeState(state),
        onWorldStateLaunch: (id) => this.launchWorldState(id),
        onAgencyModel: (model) => this.setAgencyModel(model),
        onAgencyLaunch: (id) => this.launchAgency(id),
        onTradeoffLaunch: (id) => this.launchTradeoff(id),
        onDelayEnabled: (enabled) => this.setDelayEnabled(enabled),
        onDelayLaunch: (id) => this.launchDelay(id),
        onDelayRestore: () => this.restoreDelay(),
        onPrepLaunch: (id) => this.launchPrep(id),
      });
      this.physics.world.gravity.y = PhysicsConfig.gravity;
      this.physicsLab.setWorldStateUi(this.probe.model.state);
      this.physicsLab.setAgencyUi(this.agency.session.model);
      this.physicsLab.setDelayUi(this.delayEnabled, this.delaySession.phase);
      this.setAgencyModel("B");
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
      t: Phaser.Input.Keyboard.KeyCodes.T,
      five: Phaser.Input.Keyboard.KeyCodes.FIVE,
      six: Phaser.Input.Keyboard.KeyCodes.SIX,
      seven: Phaser.Input.Keyboard.KeyCodes.SEVEN,
      eight: Phaser.Input.Keyboard.KeyCodes.EIGHT,
      nine: Phaser.Input.Keyboard.KeyCodes.NINE,
      m: Phaser.Input.Keyboard.KeyCodes.M,
    }) as typeof this.keys;

    this.add
      .text(PhysicsConfig.width - 16, 12, [
        "PHYSICS PLAYGROUND",
        "LOW input experiment",
        "A/D or arrows: move",
        "R: restart",
        "L: toggle Physics Lab",
        "T: W3 state toggle",
        "5/6: W3 SOLID/PASSABLE launch",
        "M: W3 agency model",
        "7/8/9: cause/avoid/restore",
        "Lab W3 ORDER: X/Y scenarios",
        `Lab W4 DELAY ${DELAY_MS}ms onset`,
        "Lab W4 PREP: pending preparation",
        "LEGACY: fresh tap = LOW",
        "RHYTHM: 따닥 entry, 탁 continue",
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
    this.syncDelayView();
  }

  update(time: number, delta: number): void {
    const typing = document.activeElement instanceof HTMLInputElement;
    if (!typing) {
      if (Phaser.Input.Keyboard.JustDown(this.keys.t)) {
        this.setProbeState(this.probe.model.state === "SOLID" ? "PASSABLE" : "SOLID");
      } else if (Phaser.Input.Keyboard.JustDown(this.keys.five)) {
        this.launchWorldState("A");
      } else if (Phaser.Input.Keyboard.JustDown(this.keys.six)) {
        this.launchWorldState("B");
      } else if (Phaser.Input.Keyboard.JustDown(this.keys.m)) {
        this.setAgencyModel(nextAgencyModel(this.agency.session.model));
      } else if (Phaser.Input.Keyboard.JustDown(this.keys.seven)) {
        this.launchAgency("CAUSE");
      } else if (Phaser.Input.Keyboard.JustDown(this.keys.eight)) {
        this.launchAgency("AVOID");
      } else if (Phaser.Input.Keyboard.JustDown(this.keys.nine)) {
        this.launchAgency("RESTORE");
      }
    }

    const override = debugInputOverride();
    const leftDown = override.left ?? (this.keys.left.isDown || this.keys.a.isDown);
    const rightDown = override.right ?? (this.keys.right.isDown || this.keys.d.isDown);
    const restartJustPressed = override.restart || Phaser.Input.Keyboard.JustDown(this.keys.r);

    this.inputState.update(time, leftDown, rightDown, restartJustPressed);
    if (LowInputExperiment.mode === "RHYTHM") {
      sharedRhythmRecognizer.update(time, leftDown, rightDown);
    }

    if (this.inputState.restartJustPressed) {
      this.resetPlaySession("RESET");
    }

    this.controller.update(time, delta);
    if (this.delayEnabled) {
      this.stepDelay(delta);
    } else {
      this.stepAgency();
    }
    this.noteTradeoffUse();
    const possible = possibilityRow(this.probe.model.state);
    this.hud.update(
      this.controller,
      this.inputState,
      time,
      this.probe.model,
      [
        ...agencyHudLines(this.agency.session),
        ...tradeoffHudLines({
          xPossible: possible.xPossible,
          yPossible: possible.yPossible,
          visitedX: this.visitedX,
          visitedY: this.visitedY,
        }),
        ...(this.delayEnabled ? delayHudLines(this.delaySession) : []),
        ...(this.delayEnabled ? prepHudLines({
          x: this.controller.x,
          y: this.controller.y,
          session: this.delaySession,
        }) : []),
      ],
    );
    this.prepView.refresh(this.delayEnabled, this.controller.x, this.controller.y);
    publishDebugState(
      this.controller,
      this.inputState,
      this.hud,
      time,
      this.probe.model.state,
      this.agency.session.model,
      { visitedX: this.visitedX, visitedY: this.visitedY, xPossible: possible.xPossible, yPossible: possible.yPossible },
      this.delayEnabled ? this.delaySession : null,
    );
  }

  private resetPlaySession(reason: Exclude<ClearReason, null>): void {
    const physical = this.physicalDirections();
    this.controller.reset();
    this.inputState.reset();
    this.inputState.adoptHeld(physical.left, physical.right);
    sharedRhythmRecognizer.reset(reason, physical.left, physical.right);
    this.visitedX = false;
    this.visitedY = false;
    this.probe.reset(this.controller.x, this.controller.y, PhysicsConfig.ballRadius);
    this.agency.applyProbe(this.probe.model);
    this.agency.resetLatch(this.controller.x, this.controller.y, PhysicsConfig.ballRadius);
    this.delaySession = resetDelaySession(
      this.delaySession,
      this.controller.x,
      this.controller.y,
      PhysicsConfig.ballRadius,
    );
    this.probe.adoptModel(this.delayEnabled ? this.delaySession.probe : this.probe.model);
    this.syncDelayView();
    this.syncSolids();
    this.physicsLab?.setWorldStateUi(this.probe.model.state);
    this.physicsLab?.setAgencyUi(this.agency.session.model);
    this.physicsLab?.setDelayUi(this.delayEnabled, this.delaySession.phase);
  }

  private setProbeState(state: BinaryWorldState): void {
    this.probe.setState(state, this.controller.x, this.controller.y, PhysicsConfig.ballRadius);
    this.agency.applyProbe(this.probe.model);
    this.delaySession = {
      ...this.delaySession,
      probe: { ...this.probe.model },
      phase: state === "PASSABLE" ? "SETTLED" : "IDLE",
      progress: state === "PASSABLE" ? 1 : 0,
      elapsedMs: state === "PASSABLE" ? this.delaySession.delayMs : 0,
      causeAcknowledged: false,
      futureState: null,
      lastHud: "",
    };
    this.syncDelayView();
    this.syncSolids();
    this.physicsLab?.setWorldStateUi(this.probe.model.state);
    this.physicsLab?.setDelayUi(this.delayEnabled, this.delaySession.phase);
  }

  private setAgencyModel(model: AgencyModelId): void {
    this.agency.attachProbe(this.probe.model);
    this.agency.setModel(model, this.controller.x, this.controller.y, PhysicsConfig.ballRadius);
    if (model !== "B" && this.delayEnabled) {
      this.delayEnabled = false;
      this.physicsLab?.setDelayUi(false, this.delaySession.phase);
      this.syncDelayView();
    }
    this.syncSolids();
    this.physicsLab?.setAgencyUi(model);
  }

  private launchAgency(id: AgencyScenarioId): void {
    if (this.agency.session.model === "OFF") {
      this.setAgencyModel("B");
    }
    this.resetPlaySession("RESET");
    this.setProbeState(id === "RESTORE" ? "PASSABLE" : "SOLID");
    const pose = agencyPose(this.agency.session.model, id);
    if (!pose) {
      return;
    }
    this.controller.placeAt(pose.startX, pose.startY, pose.vx, pose.vy);
    this.agency.resetLatch(this.controller.x, this.controller.y, PhysicsConfig.ballRadius);
  }

  private stepAgency(): void {
    this.agency.attachProbe(this.probe.model);
    const session = this.agency.step(
      this.controller.x,
      this.controller.y,
      PhysicsConfig.ballRadius,
    );
    this.probe.adoptModel(session.probe);
    this.syncSolids();
    this.physicsLab?.setWorldStateUi(this.probe.model.state);
  }

  private stepDelay(delta: number): void {
    this.delaySession = {
      ...this.delaySession,
      probe: { ...this.probe.model },
    };
    this.delaySession = stepDelay(
      this.delaySession,
      this.controller.x,
      this.controller.y,
      delta,
      PhysicsConfig.ballRadius,
    );
    this.probe.adoptModel(this.delaySession.probe);
    this.agency.applyProbe(this.probe.model);
    this.syncDelayView();
    this.syncSolids();
    this.physicsLab?.setWorldStateUi(this.probe.model.state);
    this.physicsLab?.setDelayUi(this.delayEnabled, this.delaySession.phase);
  }

  private setDelayEnabled(enabled: boolean): void {
    this.delayEnabled = enabled;
    if (enabled) {
      this.setAgencyModel("B");
      this.delaySession = resetDelaySession(
        this.delaySession,
        this.controller.x,
        this.controller.y,
        PhysicsConfig.ballRadius,
      );
      this.probe.adoptModel(this.delaySession.probe);
    }
    this.syncDelayView();
    this.syncSolids();
    this.physicsLab?.setDelayUi(this.delayEnabled, this.delaySession.phase);
  }

  private restoreDelay(): void {
    this.delaySession = restoreDelayImmediately(
      this.delaySession,
      this.controller.x,
      this.controller.y,
      PhysicsConfig.ballRadius,
    );
    this.probe.adoptModel(this.delaySession.probe);
    this.agency.applyProbe(this.probe.model);
    this.syncDelayView();
    this.syncSolids();
    this.physicsLab?.setWorldStateUi(this.probe.model.state);
    this.physicsLab?.setDelayUi(this.delayEnabled, this.delaySession.phase);
  }

  private launchDelay(id: DelayScenarioId): void {
    this.setDelayEnabled(true);
    this.resetPlaySession("RESET");
    if (id === "A") {
      this.controller.placeAt(AGENCY_B_CAUSE.startX, AGENCY_B_CAUSE.startY, AGENCY_B_CAUSE.vx, AGENCY_B_CAUSE.vy);
    } else if (id === "B") {
      this.delaySession = seekDelayProgress(acknowledgeCause(), 0.5);
      this.probe.adoptModel(this.delaySession.probe);
      this.controller.placeAt(
        WORLD_STATE_SUPPORT.startX,
        WORLD_STATE_SUPPORT.startY,
        WORLD_STATE_SUPPORT.vx,
        WORLD_STATE_SUPPORT.vy,
      );
    } else if (id === "C") {
      this.delaySession = advanceDelay(acknowledgeCause(), 44);
      this.probe.adoptModel(this.delaySession.probe);
      this.controller.placeAt(
        WORLD_STATE_TRAVERSAL.startX,
        WORLD_STATE_TRAVERSAL.startY,
        WORLD_STATE_TRAVERSAL.vx,
        WORLD_STATE_TRAVERSAL.vy,
      );
    } else if (id === "D") {
      this.delaySession = recontactWhilePending(advanceDelay(acknowledgeCause(), 12));
      this.probe.adoptModel(this.delaySession.probe);
      this.controller.placeAt(DELAY_CONTACT.x, DELAY_CONTACT.y, -280, 0);
    } else {
      this.delaySession = restoreDelayImmediately(
        advanceDelay(acknowledgeCause(), 44),
        DELAY_CONTACT.x,
        DELAY_CONTACT.y,
      );
      this.probe.adoptModel(this.delaySession.probe);
      this.controller.placeAt(
        WORLD_STATE_SUPPORT.startX,
        WORLD_STATE_SUPPORT.startY,
        WORLD_STATE_SUPPORT.vx,
        WORLD_STATE_SUPPORT.vy,
      );
    }
    this.agency.applyProbe(this.probe.model);
    this.agency.resetLatch(this.controller.x, this.controller.y, PhysicsConfig.ballRadius);
    this.syncDelayView();
    this.syncSolids();
    this.physicsLab?.setWorldStateUi(this.probe.model.state);
    this.physicsLab?.setDelayUi(this.delayEnabled, this.delaySession.phase);
  }

  private syncDelayView(): void {
    this.delayView.refresh(this.delaySession, this.delayEnabled);
    this.prepView?.refresh(this.delayEnabled, this.controller?.x ?? PREP_WAIT.x, this.controller?.y ?? PREP_WAIT.y);
  }

  private launchPrep(id: PrepScenarioId): void {
    this.setDelayEnabled(true);
    this.resetPlaySession("RESET");
    if (id === "B") {
      this.delaySession = acknowledgeCause();
      this.controller.placeAt(PREP_WAIT.x, PREP_WAIT.y, 0, 0);
    } else if (id === "C") {
      this.delaySession = advanceDelay(acknowledgeCause(), PREP_PARTIAL_WAIT_FRAMES);
      this.controller.placeAt(PREP_WAIT.x, PREP_WAIT.y, PREP_VX, 0);
    } else {
      this.delaySession = acknowledgeCause();
      this.controller.placeAt(PREP_WAIT.x, PREP_WAIT.y, PREP_VX, 0);
    }
    this.probe.adoptModel(this.delaySession.probe);
    this.agency.applyProbe(this.probe.model);
    this.agency.resetLatch(this.controller.x, this.controller.y, PhysicsConfig.ballRadius);
    this.syncDelayView();
    this.syncSolids();
    this.physicsLab?.setWorldStateUi(this.probe.model.state);
    this.physicsLab?.setDelayUi(this.delayEnabled, this.delaySession.phase);
  }

  private launchTradeoff(id: TradeoffScenarioId): void {
    this.setAgencyModel("B");
    this.resetPlaySession("RESET");
    if (id === "CORRECT") {
      this.setProbeState("SOLID");
      this.controller.placeAt(
        WORLD_STATE_SUPPORT.startX,
        WORLD_STATE_SUPPORT.startY,
        WORLD_STATE_SUPPORT.vx,
        WORLD_STATE_SUPPORT.vy,
      );
    } else if (id === "EARLY") {
      this.setProbeState("PASSABLE");
      this.controller.placeAt(
        WORLD_STATE_SUPPORT.startX,
        WORLD_STATE_SUPPORT.startY,
        WORLD_STATE_SUPPORT.vx,
        WORLD_STATE_SUPPORT.vy,
      );
    } else if (id === "RESTORE") {
      this.setProbeState("PASSABLE");
      this.controller.placeAt(AGENCY_B_CAUSE.startX, AGENCY_B_CAUSE.startY, AGENCY_B_CAUSE.vx, AGENCY_B_CAUSE.vy);
    } else {
      this.setProbeState("PASSABLE");
      this.controller.placeAt(
        WORLD_STATE_TRAVERSAL.startX,
        WORLD_STATE_TRAVERSAL.startY,
        WORLD_STATE_TRAVERSAL.vx,
        WORLD_STATE_TRAVERSAL.vy,
      );
    }
    this.agency.resetLatch(this.controller.x, this.controller.y, PhysicsConfig.ballRadius);
  }

  private noteTradeoffUse(): void {
    const bounds = WORLD_STATE_PROBE_BOUNDS;
    const onTop = this.controller.grounded
      && this.controller.x >= bounds.left
      && this.controller.x <= bounds.right
      && this.controller.y <= bounds.top;
    if (this.probe.model.state === "SOLID" && onTop) {
      this.visitedX = true;
    }
    if (this.probe.model.state === "PASSABLE" && this.controller.x > bounds.right) {
      this.visitedY = true;
    }
  }

  private launchWorldState(id: WorldStateScenarioId): void {
    this.resetPlaySession("RESET");
    this.setProbeState(id === "A" ? "SOLID" : "PASSABLE");
    this.controller.placeAt(
      WORLD_STATE_TRAVERSAL.startX,
      WORLD_STATE_TRAVERSAL.startY,
      WORLD_STATE_TRAVERSAL.vx,
      WORLD_STATE_TRAVERSAL.vy,
    );
  }

  private syncSolids(): void {
    this.controller.setSolids([...this.roomSolids, ...this.probe.solids, ...this.agency.solids]);
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

    const platform = addSolid(this, platforms, solids, 150, 378, 160, 18, PLATFORM);
    label(this, platform.x, platform.y - 18, "PLATFORM");

    const lowCeiling = addSolid(this, platforms, solids, 688, 404, 224, 20, LOW_CEILING);
    label(this, lowCeiling.x, lowCeiling.y - 18, "LOW CEILING");

    const jumpWall = addSolid(this, platforms, solids, 500, 258, 24, 258, JUMP_WALL);
    label(this, jumpWall.x, jumpWall.y - 18, "WALL JUMP");

    return { solids, platforms };
  }
}

function nextAgencyModel(current: AgencyModelId): AgencyModelId {
  if (current === "OFF") {
    return "A";
  }
  if (current === "A") {
    return "B";
  }
  return "OFF";
}

function agencyPose(model: AgencyModelId, id: AgencyScenarioId) {
  if (model === "A") {
    return id === "AVOID" ? AGENCY_A_AVOID : AGENCY_A_CAUSE;
  }
  if (model === "B") {
    return id === "AVOID" ? AGENCY_B_AVOID : AGENCY_B_CAUSE;
  }
  return null;
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

function publishDebugState(
  player: PlayerController,
  input: InputState,
  hud: DebugHud,
  nowMs: number,
  worldState?: BinaryWorldState,
  agencyModel?: AgencyModelId,
  tradeoff?: { visitedX: boolean; visitedY: boolean; xPossible: boolean; yPossible: boolean },
  delay?: DelaySession | null,
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
    x: player.x,
    y: player.y,
    worldState: worldState ?? null,
    agencyModel: agencyModel ?? null,
    visitedX: tradeoff?.visitedX ?? false,
    visitedY: tradeoff?.visitedY ?? false,
    xPossible: tradeoff?.xPossible ?? null,
    yPossible: tradeoff?.yPossible ?? null,
    w4Phase: delay?.phase ?? null,
    w4Progress: delay?.progress ?? null,
    w4Future: delay?.futureState ?? null,
    w4CauseAck: delay?.causeAcknowledged ?? false,
    w4Ignored: delay?.ignoredReactivations ?? 0,
  };
}

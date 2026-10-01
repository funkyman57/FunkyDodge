import Phaser from "phaser";
import {
  causeTouches,
  causeBoundsFor,
  createAgencySession,
  stepAgency,
  type AgencyModelId,
  type AgencySession,
} from "./WorldStateAgency";
import {
  aabbOverlap,
  playerAabb,
  type WorldStateProbeModel,
} from "./WorldStateProbe";

const CAUSE_FILL = 0x7ad0c4;
const ACTIVATOR_FILL = 0xd07a9a;

export class WorldStateAgencyView {
  readonly causeRect: Phaser.GameObjects.Rectangle;
  readonly causeOutline: Phaser.GameObjects.Rectangle;
  readonly causeLabel: Phaser.GameObjects.Text;
  readonly activatorRect: Phaser.GameObjects.Rectangle;
  readonly activatorOutline: Phaser.GameObjects.Rectangle;
  readonly activatorLabel: Phaser.GameObjects.Text;
  readonly activatorBody: Phaser.Physics.Arcade.StaticBody;
  session: AgencySession;

  constructor(scene: Phaser.Scene) {
    this.session = createAgencySession("OFF");

    const cause = causeBoundsFor("A")!;
    const causeW = cause.right - cause.left;
    const causeH = cause.bottom - cause.top;
    this.causeRect = scene.add
      .rectangle(cause.left + causeW / 2, cause.top + causeH / 2, causeW, causeH, CAUSE_FILL, 0.35)
      .setDepth(6);
    this.causeOutline = scene.add
      .rectangle(cause.left + causeW / 2, cause.top + causeH / 2, causeW + 2, causeH + 2)
      .setStrokeStyle(2, CAUSE_FILL, 0.9)
      .setFillStyle(0x000000, 0)
      .setDepth(6);
    this.causeLabel = scene.add
      .text(cause.left + causeW / 2, cause.top - 8, "CAUSE", {
        fontFamily: "DejaVu Sans Mono, JetBrains Mono, monospace",
        fontSize: "11px",
        color: "#7ad0c4",
      })
      .setOrigin(0.5, 1)
      .setDepth(7);

    const act = causeBoundsFor("B")!;
    const actW = act.right - act.left;
    const actH = act.bottom - act.top;
    this.activatorRect = scene.add
      .rectangle(act.left + actW / 2, act.top + actH / 2, actW, actH, ACTIVATOR_FILL, 0.95)
      .setDepth(4);
    this.activatorOutline = scene.add
      .rectangle(act.left + actW / 2, act.top + actH / 2, actW + 4, actH + 4)
      .setStrokeStyle(3, 0xf4c2d4, 1)
      .setFillStyle(0x000000, 0)
      .setDepth(4);
    scene.physics.add.existing(this.activatorRect, true);
    this.activatorBody = this.activatorRect.body as Phaser.Physics.Arcade.StaticBody;
    this.activatorBody.updateFromGameObject();
    this.activatorLabel = scene.add
      .text(act.left + actW / 2, act.top - 8, "ACTIVATOR", {
        fontFamily: "DejaVu Sans Mono, JetBrains Mono, monospace",
        fontSize: "11px",
        color: "#f4c2d4",
      })
      .setOrigin(0.5, 1)
      .setDepth(7);

    this.applyVisual();
  }

  get solids(): Array<{ left: number; right: number; top: number; bottom: number }> {
    if (this.session.model !== "B") {
      return [];
    }
    const bounds = causeBoundsFor("B")!;
    return [{ ...bounds }];
  }

  get probe(): WorldStateProbeModel {
    return this.session.probe;
  }

  setModel(model: AgencyModelId, playerX: number, playerY: number, radius: number): void {
    this.session = createAgencySession(model, this.session.probe.state, playerAabb(playerX, playerY, radius));
    this.applyVisual();
  }

  attachProbe(probe: WorldStateProbeModel): void {
    this.session = { ...this.session, probe: { ...probe } };
  }

  step(playerX: number, playerY: number, radius: number): AgencySession {
    this.session = stepAgency(this.session, playerX, playerY, radius);
    this.applyVisual();
    return this.session;
  }

  resetLatch(playerX: number, playerY: number, radius: number): void {
    const bounds = causeBoundsFor(this.session.model);
    const overlapping = bounds !== null && causeTouches(playerAabb(playerX, playerY, radius), bounds);
    this.session = {
      ...this.session,
      causeOverlapping: overlapping,
      contactFrames: overlapping ? 1 : 0,
      maxContactFrames: overlapping ? 1 : 0,
      risingEdges: 0,
      transitions: 0,
      refused: 0,
      lastFrom: null,
      lastTo: null,
      lastHud: "",
    };
    this.applyVisual();
  }

  applyProbe(probe: WorldStateProbeModel): void {
    this.session = { ...this.session, probe: { ...probe } };
  }

  overlapsActivator(playerX: number, playerY: number, radius: number): boolean {
    return aabbOverlap(playerAabb(playerX, playerY, radius), causeBoundsFor("B")!);
  }

  private applyVisual(): void {
    const modelA = this.session.model === "A";
    const modelB = this.session.model === "B";
    this.causeRect.setVisible(modelA);
    this.causeOutline.setVisible(modelA);
    this.causeLabel.setVisible(modelA);
    this.activatorRect.setVisible(modelB);
    this.activatorOutline.setVisible(modelB);
    this.activatorLabel.setVisible(modelB);
    this.activatorBody.enable = modelB;
    if (this.session.lastHud) {
      const label = modelA ? this.causeLabel : this.activatorLabel;
      if (this.session.lastFrom && this.session.lastTo) {
        label.setText(`${modelA ? "CAUSE" : "ACTIVATOR"} ${this.session.lastFrom}→${this.session.lastTo}`);
      } else if (this.session.refused > 0) {
        label.setText(`${modelA ? "CAUSE" : "ACTIVATOR"} REFUSED`);
      }
    } else {
      this.causeLabel.setText("CAUSE");
      this.activatorLabel.setText("ACTIVATOR");
    }
  }
}

export function agencyHudLines(session: AgencySession): string[] {
  if (session.model === "OFF") {
    return [];
  }
  const lines = [`W3 MODEL ${session.model}`];
  if (session.causeOverlapping) {
    lines.push("CAUSE CONTACT");
  }
  if (session.lastFrom && session.lastTo) {
    lines.push(`STATE ${session.lastFrom} → ${session.lastTo}`);
  }
  if (session.lastHud.includes("REFUSED")) {
    lines.push("W3 toggle refused (overlap)");
  }
  return lines;
}

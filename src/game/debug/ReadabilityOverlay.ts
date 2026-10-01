import Phaser from "phaser";
import {
  expectedArrivalX,
  READABILITY_ARRIVAL_BAND_PX,
  READABILITY_START_X,
  type ReadabilityScenarioId,
} from "./ReadabilityHarness";
import { PhysicsConfig } from "../physics/PhysicsConfig";

type TrailPoint = { x: number; y: number };

const TICK = 0xa8b8d4;
const START = 0xf2f6ff;
const ARRIVAL = 0x9eb6e0;
const CONTACT = 0xf4d35e;
const PREV_CONTACT = 0xc5d0e4;
const TRAIL = 0xb7dcff;
const GHOST = 0x8b9bb8;

export class ReadabilityOverlay {
  private readonly ticks: Phaser.GameObjects.Rectangle[] = [];
  private readonly startMark: Phaser.GameObjects.Rectangle;
  private readonly arrivalBand: Phaser.GameObjects.Rectangle;
  private readonly contactMark: Phaser.GameObjects.Rectangle;
  private readonly prevContactMark: Phaser.GameObjects.Rectangle;
  private readonly liveDots: Phaser.GameObjects.Arc[] = [];
  private readonly ghostDots: Phaser.GameObjects.Arc[] = [];
  private livePath: TrailPoint[] = [];
  private ghostPath: TrailPoint[] = [];
  private lastContact: TrailPoint | null = null;
  private prevContact: TrailPoint | null = null;
  private sampleCounter = 0;
  private visible = false;

  constructor(
    private readonly scene: Phaser.Scene,
    private readonly floorTop: number,
  ) {
    const left = 24;
    const right = PhysicsConfig.width - 24;
    this.ticks.push(
      scene.add.rectangle((left + right) / 2, this.floorTop - 1, right - left, 3, TICK, 0.35).setDepth(2).setVisible(false),
    );
    for (let x = 80; x <= right - 8; x += 80) {
      this.ticks.push(
        scene.add.rectangle(x, this.floorTop - 10, 3, 20, TICK, 0.85).setDepth(3).setVisible(false),
      );
    }
    this.startMark = scene.add
      .rectangle(READABILITY_START_X, this.floorTop - 10, 4, 20, START, 0.9)
      .setDepth(4)
      .setVisible(false);
    this.arrivalBand = scene.add
      .rectangle(READABILITY_START_X, this.floorTop - 4, READABILITY_ARRIVAL_BAND_PX * 2, 8, ARRIVAL, 0.22)
      .setDepth(3)
      .setVisible(false);
    this.contactMark = scene.add
      .rectangle(left, this.floorTop - 11, 8, 8, CONTACT, 0.95)
      .setDepth(5)
      .setVisible(false)
      .setAngle(45);
    this.prevContactMark = scene.add
      .rectangle(left, this.floorTop - 11, 8, 8, PREV_CONTACT, 0.55)
      .setDepth(4)
      .setVisible(false)
      .setAngle(45);

    for (let i = 0; i < 48; i += 1) {
      this.liveDots.push(scene.add.circle(0, 0, 3, TRAIL, 0.5).setDepth(6).setVisible(false));
      this.ghostDots.push(scene.add.circle(0, 0, 3, GHOST, 0.28).setDepth(5).setVisible(false));
    }
  }

  showScenario(id: ReadabilityScenarioId): void {
    this.visible = true;
    for (const tick of this.ticks) {
      tick.setVisible(true);
    }
    this.startMark.setVisible(true);
    const showArrival = id === "A1" || id === "A2";
    this.arrivalBand.setVisible(showArrival);
    if (showArrival) {
      this.arrivalBand.setPosition(expectedArrivalX(id), this.floorTop - 4);
    }
    this.redrawContacts();
    this.redrawGhost();
  }

  hide(): void {
    this.visible = false;
    for (const tick of this.ticks) {
      tick.setVisible(false);
    }
    this.startMark.setVisible(false);
    this.arrivalBand.setVisible(false);
    this.contactMark.setVisible(false);
    this.prevContactMark.setVisible(false);
    for (const dot of this.liveDots) {
      dot.setVisible(false);
    }
    for (const dot of this.ghostDots) {
      dot.setVisible(false);
    }
  }

  beginRun(): void {
    if (this.livePath.length > 4) {
      this.ghostPath = this.livePath;
    }
    this.livePath = [];
    this.sampleCounter = 0;
    if (this.lastContact) {
      this.prevContact = this.lastContact;
      this.lastContact = null;
    }
    this.redrawContacts();
    this.redrawGhost();
    this.redrawLive();
  }

  recordPoint(x: number, y: number): void {
    if (!this.visible) {
      return;
    }
    this.sampleCounter += 1;
    if (this.sampleCounter % 2 !== 0 && this.livePath.length > 0) {
      return;
    }
    this.livePath.push({ x, y });
    if (this.livePath.length > this.liveDots.length) {
      this.livePath.shift();
    }
    this.redrawLive();
  }

  markContact(x: number, y: number): void {
    if (!this.visible) {
      return;
    }
    this.lastContact = { x, y };
    this.redrawContacts();
  }

  private redrawLive(): void {
    for (let i = 0; i < this.liveDots.length; i += 1) {
      const point = this.livePath[i];
      const dot = this.liveDots[i];
      if (!point || !this.visible) {
        dot.setVisible(false);
        continue;
      }
      const age = this.livePath.length - 1 - i;
      dot.setPosition(point.x, point.y);
      dot.setAlpha(Math.max(0.18, 0.7 - age * 0.012));
      dot.setVisible(true);
    }
  }

  private redrawGhost(): void {
    for (let i = 0; i < this.ghostDots.length; i += 1) {
      const point = this.ghostPath[i];
      const dot = this.ghostDots[i];
      if (!point || !this.visible) {
        dot.setVisible(false);
        continue;
      }
      dot.setPosition(point.x, point.y);
      dot.setVisible(true);
    }
  }

  private redrawContacts(): void {
    if (this.prevContact && this.visible) {
      this.prevContactMark.setPosition(this.prevContact.x, this.floorTop - 11);
      this.prevContactMark.setVisible(true);
    } else {
      this.prevContactMark.setVisible(false);
    }
    if (this.lastContact && this.visible) {
      this.contactMark.setPosition(this.lastContact.x, this.floorTop - 11);
      this.contactMark.setVisible(true);
    } else {
      this.contactMark.setVisible(false);
    }
  }
}

import Phaser from "phaser";
import {
  delayHudLines,
  progressBand,
  type DelaySession,
} from "./WorldStateDelay";
import { WORLD_STATE_PROBE_BOUNDS } from "./WorldStateProbe";
import { MODEL_B_ACTIVATOR_BOUNDS } from "./WorldStateAgency";

const METER_FILL = 0x7ad0c4;
const METER_EMPTY = 0x1b2438;
const TICK = 0xf4e3a7;

export class WorldStateDelayView {
  readonly meterBack: Phaser.GameObjects.Rectangle;
  readonly meterFill: Phaser.GameObjects.Rectangle;
  readonly tickEarly: Phaser.GameObjects.Rectangle;
  readonly tickMid: Phaser.GameObjects.Rectangle;
  readonly hatch: Phaser.GameObjects.Text;
  readonly phaseLabel: Phaser.GameObjects.Text;
  readonly ackLabel: Phaser.GameObjects.Text;
  readonly futureLabel: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene) {
    const probe = WORLD_STATE_PROBE_BOUNDS;
    const meterLeft = probe.right + 10;
    const meterWidth = 14;
    const meterHeight = probe.bottom - probe.top;
    const meterCx = meterLeft + meterWidth / 2;
    const meterCy = probe.top + meterHeight / 2;

    this.meterBack = scene.add
      .rectangle(meterCx, meterCy, meterWidth, meterHeight, METER_EMPTY, 0.85)
      .setStrokeStyle(2, TICK, 0.9)
      .setDepth(8);
    this.meterFill = scene.add
      .rectangle(meterCx, probe.bottom, meterWidth - 4, 2, METER_FILL, 1)
      .setOrigin(0.5, 1)
      .setDepth(9);
    this.tickEarly = scene.add
      .rectangle(meterCx, probe.bottom - meterHeight / 3, meterWidth + 8, 2, TICK, 0.95)
      .setDepth(10);
    this.tickMid = scene.add
      .rectangle(meterCx, probe.bottom - (meterHeight * 2) / 3, meterWidth + 8, 2, TICK, 0.95)
      .setDepth(10);
    this.hatch = scene.add
      .text(meterCx, probe.top - 8, "", {
        fontFamily: "DejaVu Sans Mono, JetBrains Mono, monospace",
        fontSize: "11px",
        color: "#7ad0c4",
      })
      .setOrigin(0.5, 1)
      .setDepth(10);
    this.phaseLabel = scene.add
      .text((probe.left + probe.right) / 2, probe.top - 24, "", {
        fontFamily: "DejaVu Sans Mono, JetBrains Mono, monospace",
        fontSize: "11px",
        color: "#7ad0c4",
      })
      .setOrigin(0.5, 1)
      .setDepth(10);
    this.futureLabel = scene.add
      .text((probe.left + probe.right) / 2, probe.bottom + 6, "", {
        fontFamily: "DejaVu Sans Mono, JetBrains Mono, monospace",
        fontSize: "11px",
        color: "#b7c4d8",
      })
      .setOrigin(0.5, 0)
      .setDepth(10);

    const act = MODEL_B_ACTIVATOR_BOUNDS;
    this.ackLabel = scene.add
      .text((act.left + act.right) / 2, act.top - 22, "", {
        fontFamily: "DejaVu Sans Mono, JetBrains Mono, monospace",
        fontSize: "11px",
        color: "#f4c2d4",
      })
      .setOrigin(0.5, 1)
      .setDepth(10);
  }

  refresh(session: DelaySession, visible: boolean, perceptionSafe = false): void {
    this.meterBack.setVisible(visible);
    this.meterFill.setVisible(visible);
    this.tickEarly.setVisible(visible);
    this.tickMid.setVisible(visible);
    this.hatch.setVisible(visible && !perceptionSafe);
    this.phaseLabel.setVisible(visible && !perceptionSafe);
    this.futureLabel.setVisible(visible && !perceptionSafe);
    this.ackLabel.setVisible(visible && !perceptionSafe);
    if (!visible) {
      return;
    }

    const probe = WORLD_STATE_PROBE_BOUNDS;
    const maxH = probe.bottom - probe.top;
    const height = Math.max(2, session.progress * maxH);
    this.meterFill.height = height;
    this.meterFill.setFillStyle(METER_FILL, session.phase === "SETTLED" ? 1 : 0.95);

    const band = progressBand(session.progress);
    const chevrons = band === "NONE" ? "" : band === "EARLY" ? ">" : band === "MID" ? ">>" : band === "LATE" ? ">>>" : ">>>>";
    this.hatch.setText(chevrons);
    this.phaseLabel.setText(
      session.phase === "IDLE"
        ? "PROBE SOLID"
        : session.phase === "PENDING"
          ? `PENDING ${band} ${Math.round(session.progress * 100)}%`
          : "SETTLED PASSABLE",
    );
    this.phaseLabel.setColor(session.phase === "SETTLED" ? "#b7c4d8" : "#7ad0c4");
    this.futureLabel.setText(
      session.futureState ? `FUTURE ${session.futureState}` : session.phase === "SETTLED" ? "FUTURE —" : "",
    );
    this.ackLabel.setText(
      session.lastHud.includes("IGNORED")
        ? "IGNORED"
        : session.causeAcknowledged && session.phase === "PENDING"
          ? "CAUSE ACK"
          : "",
    );
    this.ackLabel.setColor(session.lastHud.includes("IGNORED") ? "#f4c2d4" : "#f4c2d4");
  }
}

export { delayHudLines };

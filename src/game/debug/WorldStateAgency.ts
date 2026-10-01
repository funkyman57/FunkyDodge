import { PhysicsConfig } from "../physics/PhysicsConfig";
import {
  aabbOverlap,
  createWorldStateProbe,
  playerAabb,
  probeCollides,
  resetWorldState,
  resolveOrdinaryContact,
  setWorldState,
  WORLD_STATE_DT,
  WORLD_STATE_PROBE_BOUNDS,
  WORLD_STATE_RADIUS,
  type Aabb,
  type BinaryWorldState,
  type WorldStateProbeModel,
} from "./WorldStateProbe";

export type AgencyModelId = "A" | "B" | "OFF";
export type AgencyGrammar = "TOGGLE";
export type AgencyScenarioId = "CAUSE" | "AVOID" | "RESTORE" | "USE" | "HOLD" | "RECONTACT";
export type AvoidabilityClass = "CLEARLY OPTIONAL" | "CONDITIONALLY OPTIONAL" | "EFFECTIVELY FORCED";
export type OverlapPolicy = "REFUSE";

export const AGENCY_GRAMMAR: AgencyGrammar = "TOGGLE";
export const AGENCY_OVERLAP_POLICY: OverlapPolicy = "REFUSE";

export const MODEL_A_CAUSE_BOUNDS: Aabb = {
  left: 308,
  right: 320,
  top: 416,
  bottom: 516,
};

export const MODEL_B_ACTIVATOR_BOUNDS: Aabb = {
  left: 80,
  right: 92,
  top: 400,
  bottom: 516,
};

export const AGENCY_A_CAUSE = {
  startX: 260,
  startY: 450,
  vx: 280,
  vy: 0,
  frames: 36,
};

export const AGENCY_A_AVOID = {
  startX: 260,
  startY: 360,
  vx: 280,
  vy: 0,
  frames: 36,
};

export const AGENCY_A_USE = {
  startX: 334,
  startY: 360,
  vx: 0,
  vy: 240,
  frames: 36,
};

export const AGENCY_B_CAUSE = {
  startX: 140,
  startY: 450,
  vx: -280,
  vy: 0,
  frames: 36,
};

export const AGENCY_B_AVOID = {
  startX: 140,
  startY: 450,
  vx: 280,
  vy: 0,
  frames: 36,
};

export const AGENCY_B_USE = {
  startX: 260,
  startY: 450,
  vx: 280,
  vy: 0,
  frames: 36,
};

export type AgencySession = {
  model: AgencyModelId;
  grammar: AgencyGrammar;
  overlapPolicy: OverlapPolicy;
  probe: WorldStateProbeModel;
  causeOverlapping: boolean;
  contactFrames: number;
  maxContactFrames: number;
  risingEdges: number;
  transitions: number;
  refused: number;
  lastFrom: BinaryWorldState | null;
  lastTo: BinaryWorldState | null;
  lastHud: string;
};

export type AgencyMeasurement = {
  model: AgencyModelId;
  scenario: AgencyScenarioId;
  contactEvents: number;
  maxContactFrames: number;
  stateBefore: BinaryWorldState;
  stateAfter: BinaryWorldState;
  refused: number;
  transitions: number;
  startX: number;
  startY: number;
  startVx: number;
  startVy: number;
  finalX: number;
  finalY: number;
  probeStillPhysical: boolean;
  autoChanged: boolean;
};

export function aabbTouches(a: Aabb, b: Aabb): boolean {
  return a.left <= b.right && a.right >= b.left && a.top <= b.bottom && a.bottom >= b.top;
}

export function causeTouches(player: Aabb, cause: Aabb, skin = PhysicsConfig.contactSkin): boolean {
  return player.left <= cause.right + skin
    && player.right >= cause.left - skin
    && player.top <= cause.bottom + skin
    && player.bottom >= cause.top - skin;
}

export function causeBoundsFor(model: AgencyModelId): Aabb | null {
  if (model === "A") {
    return MODEL_A_CAUSE_BOUNDS;
  }
  if (model === "B") {
    return MODEL_B_ACTIVATOR_BOUNDS;
  }
  return null;
}

export function createAgencySession(
  model: AgencyModelId,
  state: BinaryWorldState = "SOLID",
  occupant: Aabb | null = null,
): AgencySession {
  const probe = createWorldStateProbe(state);
  const bounds = causeBoundsFor(model);
  const overlapping = bounds !== null && occupant !== null && causeTouches(occupant, bounds);
  return {
    model,
    grammar: AGENCY_GRAMMAR,
    overlapPolicy: AGENCY_OVERLAP_POLICY,
    probe,
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
}

export function resetAgencySession(
  session: AgencySession,
  occupant: Aabb | null = null,
): AgencySession {
  const next = createAgencySession(session.model, "SOLID", occupant);
  if (occupant !== null && aabbOverlap(occupant, next.probe.bounds)) {
    next.probe = resetWorldState(next.probe, "PASSABLE");
  }
  return next;
}

export function stepAgency(
  session: AgencySession,
  playerX: number,
  playerY: number,
  radius = WORLD_STATE_RADIUS,
): AgencySession {
  const bounds = causeBoundsFor(session.model);
  const occupant = playerAabb(playerX, playerY, radius);
  const overlapping = bounds !== null && causeTouches(occupant, bounds);
  const rising = overlapping && !session.causeOverlapping;
  const next: AgencySession = {
    ...session,
    probe: { ...session.probe },
    causeOverlapping: overlapping,
    contactFrames: overlapping ? (session.causeOverlapping ? session.contactFrames + 1 : 1) : 0,
  };
  next.maxContactFrames = Math.max(session.maxContactFrames, next.contactFrames);
  if (!rising || session.model === "OFF") {
    return next;
  }
  next.risingEdges = session.risingEdges + 1;
  const from = session.probe.state;
  const to: BinaryWorldState = from === "SOLID" ? "PASSABLE" : "SOLID";
  next.probe = setWorldState(session.probe, to, occupant);
  if (next.probe.lastReason === "REFUSED_OVERLAP") {
    next.refused = session.refused + 1;
    next.lastHud = "CAUSE CONTACT REFUSED OVERLAP";
    return next;
  }
  if (next.probe.state !== from) {
    next.transitions = session.transitions + 1;
    next.lastFrom = from;
    next.lastTo = next.probe.state;
    next.lastHud = `CAUSE CONTACT  STATE ${from} → ${next.probe.state}`;
  }
  return next;
}

function fakeSolid(bounds: Aabb): WorldStateProbeModel {
  return createWorldStateProbe("SOLID", bounds);
}

export function simulateAgencyAttempt(options: {
  model: AgencyModelId;
  scenario: AgencyScenarioId;
  startState?: BinaryWorldState;
  startX: number;
  startY: number;
  vx: number;
  vy: number;
  frames: number;
  radius?: number;
  dt?: number;
  reverseAfterFrames?: number;
  setVxAt?: Array<{ frame: number; vx: number }>;
}): AgencyMeasurement {
  const radius = options.radius ?? WORLD_STATE_RADIUS;
  const dt = options.dt ?? WORLD_STATE_DT;
  const startState = options.startState ?? "SOLID";
  let x = options.startX;
  let y = options.startY;
  let vx = options.vx;
  let vy = options.vy;
  let session = createAgencySession(
    options.model,
    startState,
    playerAabb(x, y, radius),
  );
  const startProbeState = session.probe.state;

  for (let i = 0; i < options.frames; i += 1) {
    if (options.reverseAfterFrames !== undefined && i === options.reverseAfterFrames) {
      vx = -vx;
    }
    if (options.setVxAt) {
      const command = options.setVxAt.find((entry) => entry.frame === i);
      if (command) {
        vx = command.vx;
      }
    }
    x += vx * dt;
    y += vy * dt;
    const probeHit = resolveOrdinaryContact({
      x,
      y,
      vx,
      vy,
      radius,
      probe: session.probe,
    });
    x = probeHit.x;
    y = probeHit.y;
    vx = probeHit.vx;
    vy = probeHit.vy;
    if (options.model === "B") {
      const activatorHit = resolveOrdinaryContact({
        x,
        y,
        vx,
        vy,
        radius,
        probe: fakeSolid(MODEL_B_ACTIVATOR_BOUNDS),
      });
      x = activatorHit.x;
      y = activatorHit.y;
      vx = activatorHit.vx;
      vy = activatorHit.vy;
    }
    session = stepAgency(session, x, y, radius);
  }

  return {
    model: options.model,
    scenario: options.scenario,
    contactEvents: session.risingEdges,
    maxContactFrames: session.maxContactFrames,
    stateBefore: startState,
    stateAfter: session.probe.state,
    refused: session.refused,
    transitions: session.transitions,
    startX: options.startX,
    startY: options.startY,
    startVx: options.vx,
    startVy: options.vy,
    finalX: x,
    finalY: y,
    probeStillPhysical: probeCollides(session.probe) === (session.probe.state === "SOLID"),
    autoChanged: session.probe.state !== startProbeState && session.risingEdges === 0,
  };
}

export function measureModelA() {
  const cause = simulateAgencyAttempt({
    model: "A",
    scenario: "CAUSE",
    ...AGENCY_A_CAUSE,
  });
  const avoid = simulateAgencyAttempt({
    model: "A",
    scenario: "AVOID",
    ...AGENCY_A_AVOID,
  });
  const use = simulateAgencyAttempt({
    model: "A",
    scenario: "USE",
    ...AGENCY_A_USE,
  });
  const restore = simulateAgencyAttempt({
    model: "A",
    scenario: "RESTORE",
    startState: "PASSABLE",
    ...AGENCY_A_CAUSE,
  });
  const hold = simulateAgencyAttempt({
    model: "A",
    scenario: "HOLD",
    ...AGENCY_A_CAUSE,
    frames: 48,
  });
  const recontact = simulateAgencyAttempt({
    model: "A",
    scenario: "RECONTACT",
    ...AGENCY_A_CAUSE,
    frames: 90,
    reverseAfterFrames: 40,
  });
  const overlapRefuse = simulateAgencyAttempt({
    model: "A",
    scenario: "CAUSE",
    startState: "PASSABLE",
    startX: 360,
    startY: 450,
    vx: -280,
    vy: 0,
    frames: 24,
  });
  return { cause, avoid, use, restore, hold, recontact, overlapRefuse };
}

export function measureModelB() {
  const cause = simulateAgencyAttempt({
    model: "B",
    scenario: "CAUSE",
    ...AGENCY_B_CAUSE,
  });
  const avoid = simulateAgencyAttempt({
    model: "B",
    scenario: "AVOID",
    ...AGENCY_B_AVOID,
  });
  const use = simulateAgencyAttempt({
    model: "B",
    scenario: "USE",
    ...AGENCY_B_USE,
  });
  const restore = simulateAgencyAttempt({
    model: "B",
    scenario: "RESTORE",
    startState: "PASSABLE",
    ...AGENCY_B_CAUSE,
  });
  const hold = simulateAgencyAttempt({
    model: "B",
    scenario: "HOLD",
    ...AGENCY_B_CAUSE,
    frames: 48,
  });
  const recontact = simulateAgencyAttempt({
    model: "B",
    scenario: "RECONTACT",
    startX: 140,
    startY: 450,
    vx: -280,
    vy: 0,
    frames: 90,
    setVxAt: [
      { frame: 20, vx: 280 },
      { frame: 50, vx: -280 },
    ],
  });
  const idle = simulateAgencyAttempt({
    model: "B",
    scenario: "AVOID",
    startX: 220,
    startY: 160,
    vx: 0,
    vy: 0,
    frames: 120,
  });
  return { cause, avoid, use, restore, hold, recontact, idle };
}

export function formatAgencyTable(rows: AgencyMeasurement[]): string {
  const header = "Scenario | Contact events | State before | State after | Avoidable? | Recoverable? | Notes";
  const lines = rows.map((row) => {
    const avoidable = row.scenario === "AVOID" && row.transitions === 0 ? "YES" : row.scenario === "CAUSE" ? "—" : "—";
    const recoverable = row.scenario === "RESTORE" && row.stateAfter === "SOLID" ? "YES" : row.scenario === "RESTORE" ? "NO" : "—";
    const notes = [
      `edges ${row.contactEvents}`,
      `held ${row.maxContactFrames}f`,
      row.refused > 0 ? `refused ${row.refused}` : "",
    ].filter(Boolean).join(", ");
    return [
      row.scenario,
      String(row.contactEvents),
      row.stateBefore,
      row.stateAfter,
      avoidable,
      recoverable,
      notes,
    ].join(" | ");
  });
  return [header, ...lines].join("\n");
}

export function modelAAvoidability(): AvoidabilityClass {
  return "CONDITIONALLY OPTIONAL";
}

export function modelBAvoidability(): AvoidabilityClass {
  return "CLEARLY OPTIONAL";
}

export function activatorAndProbeSeparated(): boolean {
  const a = MODEL_B_ACTIVATOR_BOUNDS;
  const p = WORLD_STATE_PROBE_BOUNDS;
  const gap = p.left - a.right;
  return gap > WORLD_STATE_RADIUS * 2;
}

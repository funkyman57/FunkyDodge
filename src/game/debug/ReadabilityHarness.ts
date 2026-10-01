import {
  CARRIED_MOTION_DT,
  classifyMotionBand,
  probeCarriedMotionRow,
  simulateHorizontalHistory,
  type InputPhase,
  type MotionBand,
} from "./CarriedMotionProbe";
import {
  resolveFloorBounce,
  resolveTakeoffDirection,
  type BounceInput,
} from "../physics/BounceController";
import { PhysicsConfig } from "../physics/PhysicsConfig";

export type ReadabilityScenarioId = "A1" | "A2" | "B" | "C";
export type ReadabilityDisplayMode = "INSTRUMENTED" | "PERCEPTION";
export type ReadabilityCondition = "A" | "B" | "C";

export const READABILITY_AIRTIME_FRAMES = 50;
export const READABILITY_TRAIL_COAST_FRAMES = 10;
export const READABILITY_OBSERVATION_FRAMES = 24;
export const READABILITY_START_X = 88;
export const READABILITY_LAUNCH_LIFT = 4;
export const READABILITY_ARRIVAL_BAND_PX = 16;

export type ReadabilityScenario = {
  id: ReadabilityScenarioId;
  condition: ReadabilityCondition;
  perceptionLabel: string;
  instrumentedLabel: string;
  phases: InputPhase[];
};

export const READABILITY_SCENARIOS: Record<ReadabilityScenarioId, ReadabilityScenario> = {
  A1: {
    id: "A1",
    condition: "A",
    perceptionLabel: "A1",
    instrumentedLabel: "A1 same-arrive",
    phases: [
      { direction: 1, frames: 22 },
      { direction: 0, frames: 28 },
    ],
  },
  A2: {
    id: "A2",
    condition: "A",
    perceptionLabel: "A2",
    instrumentedLabel: "A2 same-arrive",
    phases: [
      { direction: 0, frames: 7 },
      { direction: 1, frames: 33 },
      { direction: 0, frames: 10 },
    ],
  },
  B: {
    id: "B",
    condition: "B",
    perceptionLabel: "B",
    instrumentedLabel: "B preserve",
    phases: [
      { direction: 1, frames: 40 },
      { direction: 0, frames: 10 },
    ],
  },
  C: {
    id: "C",
    condition: "C",
    perceptionLabel: "C",
    instrumentedLabel: "C reduce",
    phases: [
      { direction: 1, frames: 24 },
      { direction: 0, frames: 26 },
    ],
  },
};

export type ReadabilityIntegrity = {
  id: ReadabilityScenarioId;
  flightVx: number;
  flightDx: number;
  band: MotionBand;
  bounceType: "NORMAL" | "LOW" | "BOOST";
  intent: "FRESH_PRESS" | "HOLD" | "NONE";
  takeoffDirection: -1 | 0 | 1;
  takeoffMinApplied: boolean;
  postBounceVx: number;
  vxAt100ms: number;
  vxAt250ms: number;
  dxAt250ms: number;
  trailingCoastFrames: number;
};

export function scenarioFlight(id: ReadabilityScenarioId) {
  const scenario = READABILITY_SCENARIOS[id];
  return simulateHorizontalHistory({
    label: scenario.id,
    phases: scenario.phases,
  });
}

export function trailingCoastFrames(phases: InputPhase[]): number {
  let coast = 0;
  for (let i = phases.length - 1; i >= 0; i -= 1) {
    if (phases[i].direction !== 0) {
      break;
    }
    coast += phases[i].frames;
  }
  return coast;
}

export function expandPhasesToFrames(phases: InputPhase[]): Array<{ left: boolean; right: boolean }> {
  const frames: Array<{ left: boolean; right: boolean }> = [];
  for (const phase of phases) {
    for (let i = 0; i < phase.frames; i += 1) {
      frames.push({
        left: phase.direction === -1,
        right: phase.direction === 1,
      });
    }
  }
  return frames;
}

export function launchScript(id: ReadabilityScenarioId): Array<{ left: boolean; right: boolean }> {
  const scenario = READABILITY_SCENARIOS[id];
  return expandPhasesToFrames([
    ...scenario.phases,
    { direction: 0, frames: READABILITY_OBSERVATION_FRAMES },
  ]);
}

export function landingInputAfterPhases(phases: InputPhase[], nowMs = 10_000): BounceInput {
  const dtMs = CARRIED_MOTION_DT * 1000;
  const totalMs = phases.reduce((sum, phase) => sum + phase.frames, 0) * dtMs;
  let t = nowMs - totalMs;
  let leftPressedAt: number | null = null;
  let rightPressedAt: number | null = null;
  let leftReleasedAt: number | null = null;
  let rightReleasedAt: number | null = null;
  let lastHorizontalDirection: -1 | 0 | 1 = 0;

  for (const phase of phases) {
    if (phase.direction === -1) {
      leftPressedAt = t;
      lastHorizontalDirection = -1;
      t += phase.frames * dtMs;
      leftReleasedAt = t;
    } else if (phase.direction === 1) {
      rightPressedAt = t;
      lastHorizontalDirection = 1;
      t += phase.frames * dtMs;
      rightReleasedAt = t;
    } else {
      t += phase.frames * dtMs;
    }
  }

  return {
    leftDown: false,
    rightDown: false,
    leftPressedAt,
    rightPressedAt,
    leftReleasedAt,
    rightReleasedAt,
    lastHorizontalDirection,
  };
}

export function probeReadabilityIntegrity(id: ReadabilityScenarioId): ReadabilityIntegrity {
  const scenario = READABILITY_SCENARIOS[id];
  const flight = scenarioFlight(id);
  const landing = landingInputAfterPhases(scenario.phases);
  const bounce = resolveFloorBounce(landing, 10_000);
  const chain = probeCarriedMotionRow(flight.vx);

  return {
    id,
    flightVx: flight.vx,
    flightDx: flight.dx,
    band: classifyMotionBand(flight.vx),
    bounceType: bounce.type,
    intent: bounce.intent,
    takeoffDirection: resolveTakeoffDirection(landing, 10_000, bounce.intent),
    takeoffMinApplied: chain.takeoffMinApplied,
    postBounceVx: chain.postBounceVx,
    vxAt100ms: chain.vxAt100ms,
    vxAt250ms: chain.vxAt250ms,
    dxAt250ms: chain.dxAt250ms,
    trailingCoastFrames: trailingCoastFrames(scenario.phases),
  };
}

export function expectedArrivalX(id: ReadabilityScenarioId, startX = READABILITY_START_X): number {
  return startX + scenarioFlight(id).dx;
}

export function launchPose(): { x: number; y: number; vx: number; vy: number } {
  const floorTop = PhysicsConfig.height - 24;
  return {
    x: READABILITY_START_X,
    y: floorTop - PhysicsConfig.ballRadius - READABILITY_LAUNCH_LIFT,
    vx: 0,
    vy: -PhysicsConfig.bounceVelocity,
  };
}

export function scenarioHudName(id: ReadabilityScenarioId, mode: ReadabilityDisplayMode): string {
  const scenario = READABILITY_SCENARIOS[id];
  return mode === "PERCEPTION" ? scenario.perceptionLabel : scenario.instrumentedLabel;
}

export type ReadabilityLabUiState = {
  scenarioId: ReadabilityScenarioId | null;
  displayMode: ReadabilityDisplayMode;
  active: boolean;
};

export type ReadabilityHarnessState = ReadabilityLabUiState & {
  scripted: boolean;
  scriptFrame: number;
  scriptLength: number;
};

export function createReadabilityHarnessState(): ReadabilityHarnessState {
  return {
    active: false,
    scenarioId: null,
    displayMode: "INSTRUMENTED",
    scripted: false,
    scriptFrame: 0,
    scriptLength: 0,
  };
}

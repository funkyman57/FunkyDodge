import {
  AGENCY_B_AVOID,
  AGENCY_B_CAUSE,
  MODEL_B_ACTIVATOR_BOUNDS,
  activatorAndProbeSeparated,
  simulateAgencyAttempt,
} from "./WorldStateAgency";
import {
  WORLD_STATE_PROBE_BOUNDS,
  WORLD_STATE_RADIUS,
  WORLD_STATE_SUPPORT,
  WORLD_STATE_TRAVERSAL,
  createWorldStateProbe,
  measureSupportPair,
  measureTraversalPair,
  simulateWorldStateAttempt,
  type BinaryWorldState,
} from "./WorldStateProbe";

export type TradeoffScenarioId = "CORRECT" | "EARLY" | "RESTORE" | "DIRECT_Y";

export const POSSIBILITY_X = {
  id: "X",
  name: "SUPPORT",
  description: "be supported by the probe top and hold that height",
} as const;

export const POSSIBILITY_Y = {
  id: "Y",
  name: "TRAVERSAL",
  description: "pass through the occupied space to the far side",
} as const;

export const TRADEOFF_X_ZONE = {
  left: WORLD_STATE_PROBE_BOUNDS.left,
  right: WORLD_STATE_PROBE_BOUNDS.right,
  top: WORLD_STATE_PROBE_BOUNDS.top - WORLD_STATE_RADIUS * 2,
  bottom: WORLD_STATE_PROBE_BOUNDS.top,
};

export const TRADEOFF_Y_ZONE = {
  left: WORLD_STATE_PROBE_BOUNDS.right,
  right: WORLD_STATE_PROBE_BOUNDS.right + 80,
  top: 434,
  bottom: 498,
};

export type PossibilityRow = {
  state: BinaryWorldState;
  xPossible: boolean;
  yPossible: boolean;
  why: string;
};

export function possibilityRow(state: BinaryWorldState): PossibilityRow {
  if (state === "SOLID") {
    return {
      state,
      xPossible: true,
      yPossible: false,
      why: "support exists / passage blocked",
    };
  }
  return {
    state,
    xPossible: false,
    yPossible: true,
    why: "support absent / passage open",
  };
}

export function formatPossibilityTable(rows: PossibilityRow[] = [
  possibilityRow("SOLID"),
  possibilityRow("PASSABLE"),
]): string {
  const header = "State | X possible? | Y possible? | Why";
  const lines = rows.map((row) => [
    row.state,
    row.xPossible ? "YES" : "NO",
    row.yPossible ? "YES" : "NO",
    row.why,
  ].join(" | "));
  return [header, ...lines].join("\n");
}

export type TradeoffAttempt = {
  xUsed: boolean;
  yUsed: boolean;
  supported: boolean;
  traversed: boolean;
  blocked: boolean;
  finalX: number;
  finalY: number;
  worldState: BinaryWorldState;
};

function attemptX(state: BinaryWorldState): TradeoffAttempt {
  const pose = WORLD_STATE_SUPPORT;
  const result = simulateWorldStateAttempt({
    scenario: "A",
    probe: createWorldStateProbe(state),
    ...pose,
  });
  return {
    xUsed: result.supported && result.finalY <= WORLD_STATE_PROBE_BOUNDS.top,
    yUsed: false,
    supported: result.supported,
    traversed: result.traversed,
    blocked: result.blocked,
    finalX: result.finalX,
    finalY: result.finalY,
    worldState: state,
  };
}

function attemptY(state: BinaryWorldState): TradeoffAttempt {
  const pose = WORLD_STATE_TRAVERSAL;
  const result = simulateWorldStateAttempt({
    scenario: "B",
    probe: createWorldStateProbe(state),
    ...pose,
  });
  return {
    xUsed: false,
    yUsed: result.traversed && result.finalX > WORLD_STATE_PROBE_BOUNDS.right,
    supported: result.supported,
    traversed: result.traversed,
    blocked: result.blocked,
    finalX: result.finalX,
    finalY: result.finalY,
    worldState: state,
  };
}

function activate(startState: BinaryWorldState) {
  return simulateAgencyAttempt({
    model: "B",
    scenario: startState === "SOLID" ? "CAUSE" : "RESTORE",
    startState,
    ...AGENCY_B_CAUSE,
  });
}

export type TradeoffTrace = {
  scenario: TradeoffScenarioId;
  steps: string[];
  xUsed: boolean;
  yUsed: boolean;
  xAvailableAfterChange: boolean;
  yAvailableAfterChange: boolean;
  restoredX: boolean | null;
  overlapRefused: number;
  timerInvolved: boolean;
  combinedGoal: boolean;
  carryover: string;
};

export function measureSolidPair() {
  const pair = {
    support: measureSupportPair(),
    traversal: measureTraversalPair(),
  };
  return {
    xOnSolid: pair.support.solid.supported,
    yOnSolid: pair.traversal.solid.traversed,
    xOnPassable: pair.support.passable.supported,
    yOnPassable: pair.traversal.passable.traversed,
    solidSupportY: pair.support.solid.finalY,
    passableFallY: pair.support.passable.finalY,
    solidBlockX: pair.traversal.solid.finalX,
    passableTraverseX: pair.traversal.passable.finalX,
  };
}

export function measureCorrectOrder(): TradeoffTrace {
  const useX = attemptX("SOLID");
  const change = activate("SOLID");
  const useY = attemptY("PASSABLE");
  return {
    scenario: "CORRECT",
    steps: [
      `State SOLID. Action: use X (support). Result: y=${useX.finalY.toFixed(1)} supported=${useX.supported}`,
      `Cause: Model B activator contact. State SOLID → PASSABLE. refused=${change.refused}`,
      `State PASSABLE. Action: use Y (traverse). Result: x=${useY.finalX.toFixed(1)} traversed=${useY.traversed}`,
    ],
    xUsed: useX.xUsed,
    yUsed: useY.yUsed,
    xAvailableAfterChange: false,
    yAvailableAfterChange: useY.yUsed,
    restoredX: null,
    overlapRefused: change.refused,
    timerInvolved: false,
    combinedGoal: useX.xUsed && useY.yUsed && change.stateAfter === "PASSABLE" && change.refused === 0,
    carryover: "route progress: X visited while SOLID; position after X is the supported height, then player leaves before changing",
  };
}

export function measureEarlyChange(): TradeoffTrace {
  const change = activate("SOLID");
  const tryX = attemptX("PASSABLE");
  const stillY = attemptY("PASSABLE");
  return {
    scenario: "EARLY",
    steps: [
      `Cause first: activator contact. State SOLID → PASSABLE. refused=${change.refused}`,
      `Attempt X (support) while PASSABLE. Result: y=${tryX.finalY.toFixed(1)} supported=${tryX.supported}`,
      `Y remains available: x=${stillY.finalX.toFixed(1)} traversed=${stillY.traversed}`,
    ],
    xUsed: tryX.xUsed,
    yUsed: stillY.yUsed,
    xAvailableAfterChange: tryX.xUsed,
    yAvailableAfterChange: stillY.yUsed,
    restoredX: null,
    overlapRefused: change.refused,
    timerInvolved: false,
    combinedGoal: false,
    carryover: "none — X was never obtained",
  };
}

export function measureRestore(): TradeoffTrace {
  const early = attemptX("PASSABLE");
  const restore = activate("PASSABLE");
  const again = attemptX("SOLID");
  return {
    scenario: "RESTORE",
    steps: [
      `PASSABLE. Attempt X. Result: y=${early.finalY.toFixed(1)} supported=${early.supported}`,
      `Restore: activator contact. State PASSABLE → SOLID. refused=${restore.refused}`,
      `SOLID. Use X again. Result: y=${again.finalY.toFixed(1)} supported=${again.supported}`,
    ],
    xUsed: again.xUsed,
    yUsed: false,
    xAvailableAfterChange: false,
    yAvailableAfterChange: false,
    restoredX: again.xUsed,
    overlapRefused: restore.refused,
    timerInvolved: false,
    combinedGoal: again.xUsed && !early.xUsed && restore.refused === 0,
    carryover: "restoration returns X; order is still required for the combined goal",
  };
}

export function measureDirectY(): TradeoffTrace {
  const y = attemptY("PASSABLE");
  return {
    scenario: "DIRECT_Y",
    steps: [
      `State PASSABLE from the start. Action: use Y only. Result: x=${y.finalX.toFixed(1)} traversed=${y.traversed}`,
      "X was not required for this plan. PASSABLE is the correct state.",
    ],
    xUsed: false,
    yUsed: y.yUsed,
    xAvailableAfterChange: false,
    yAvailableAfterChange: y.yUsed,
    restoredX: null,
    overlapRefused: 0,
    timerInvolved: false,
    combinedGoal: false,
    carryover: "none needed — Y-only plan",
  };
}

export function measureActivatorOptional() {
  const avoid = simulateAgencyAttempt({
    model: "B",
    scenario: "AVOID",
    ...AGENCY_B_AVOID,
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
  return { avoid, idle };
}

export function tradeoffHasNoTimer(): boolean {
  const probe = createWorldStateProbe("SOLID");
  return !("durationMs" in probe)
    && !("cycle" in probe)
    && !("delayMs" in probe)
    && !("countdown" in probe);
}

export function successfulSequenceAvoidsOverlapRefuse(): boolean {
  return measureCorrectOrder().overlapRefused === 0
    && measureRestore().overlapRefused === 0;
}

export function activatorIsSeparated(): boolean {
  return activatorAndProbeSeparated()
    && MODEL_B_ACTIVATOR_BOUNDS.right < WORLD_STATE_PROBE_BOUNDS.left - WORLD_STATE_RADIUS * 2;
}

export function formatTrace(trace: TradeoffTrace): string {
  return [`Scenario: ${trace.scenario}`, ...trace.steps].join("\n");
}

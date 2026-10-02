import {
  AGENCY_B_CAUSE,
  simulateAgencyAttempt,
  type AgencyModelId,
} from "./WorldStateAgency";
import {
  WORLD_STATE_SUPPORT,
  WORLD_STATE_TRAVERSAL,
  type BinaryWorldState,
} from "./WorldStateProbe";
import {
  activatorIsSeparated,
  measureActivatorOptional,
  measureCorrectOrder,
  measureEarlyChange,
  measureRestore,
  measureSolidPair,
  possibilityRow,
  successfulSequenceAvoidsOverlapRefuse,
  tradeoffHasNoTimer,
} from "./WorldStateTradeoff";

export type ReadabilityMode = "INSTRUMENTED" | "PERCEPTION";
export type ReadabilityScenarioId = "A" | "B" | "C" | "D" | "E";
export type ReadabilityPhase = "BEFORE" | "AFTER";

export type ReadabilityPose = {
  startX: number;
  startY: number;
  vx: number;
  vy: number;
  state: BinaryWorldState;
};

export const READABILITY_OBSERVE = {
  startX: 200,
  startY: 300,
  vx: 0,
  vy: 0,
};

export const READABILITY_CHOICE = {
  startX: 220,
  startY: 450,
  vx: 0,
  vy: 0,
};

export const PERCEPTION_FORBIDDEN = [
  "W3 STATE",
  "X SUPPORT",
  "Y TRAVERSE",
  "CAUSE CONTACT",
  "correct order",
  "CORRECT ORDER",
  "support lost",
  "traversal gained",
  "PROBE SOLID",
  "PROBE PASSABLE",
  "STATE SOLID",
  "STATE PASSABLE",
  "SOLID →",
  "PASSABLE →",
];

export type GhostAidClass = "INSTRUMENTED-ONLY" | "PERCEPTION-SAFE" | "TOO LEADING";

export const GHOST_AID_CLASSES: Record<string, GhostAidClass> = {
  "previous-state silhouette": "INSTRUMENTED-ONLY",
  "prior support marker": "INSTRUMENTED-ONLY",
  "contact marker": "INSTRUMENTED-ONLY",
  "prior trajectory": "TOO LEADING",
  "replay button": "INSTRUMENTED-ONLY",
  "activator contact flash": "PERCEPTION-SAFE",
  "probe transition flash": "PERCEPTION-SAFE",
};

export function scenarioPurpose(id: ReadabilityScenarioId): "R1" | "R2" | "R3" | "R4" | "R5" {
  if (id === "A") {
    return "R1";
  }
  if (id === "B") {
    return "R2";
  }
  if (id === "C") {
    return "R3";
  }
  if (id === "D") {
    return "R4";
  }
  return "R5";
}

export function scenarioPose(id: ReadabilityScenarioId, phase: ReadabilityPhase): ReadabilityPose {
  if (id === "A") {
    return { ...READABILITY_OBSERVE, state: phase === "AFTER" ? "PASSABLE" : "SOLID" };
  }
  if (id === "B") {
    return { ...WORLD_STATE_TRAVERSAL, state: phase === "AFTER" ? "PASSABLE" : "SOLID" };
  }
  if (id === "C") {
    return { ...WORLD_STATE_SUPPORT, state: phase === "AFTER" ? "PASSABLE" : "SOLID" };
  }
  if (id === "D") {
    return {
      startX: AGENCY_B_CAUSE.startX,
      startY: AGENCY_B_CAUSE.startY,
      vx: 0,
      vy: 0,
      state: "SOLID",
    };
  }
  return { ...READABILITY_CHOICE, state: "SOLID" };
}

export function agencyModelForScenario(id: ReadabilityScenarioId): AgencyModelId {
  return id === "D" || id === "E" ? "B" : "OFF";
}

export function samePlayerStart(a: ReadabilityPose, b: ReadabilityPose): boolean {
  return a.startX === b.startX && a.startY === b.startY && a.vx === b.vx && a.vy === b.vy;
}

export function perceptionHudLines(scenario: ReadabilityScenarioId): string[] {
  return [scenario];
}

export function instrumentedHudLines(input: {
  scenario: ReadabilityScenarioId;
  phase: ReadabilityPhase;
  state: BinaryWorldState;
  xPossible: boolean;
  yPossible: boolean;
  visitedX: boolean;
  visitedY: boolean;
  lastTransition: string;
}): string[] {
  return [
    `SCENARIO ${input.scenario} ${input.phase}`,
    `W3 STATE ${input.state}`,
    `X SUPPORT ${input.xPossible ? "YES" : "NO"}${input.visitedX ? " used" : ""}`,
    `Y TRAVERSE ${input.yPossible ? "YES" : "NO"}${input.visitedY ? " used" : ""}`,
    input.lastTransition,
  ].filter(Boolean);
}

export function perceptionContainsForbidden(lines: string[]): boolean {
  const blob = lines.join("\n");
  return PERCEPTION_FORBIDDEN.some((token) => blob.includes(token));
}

export function readabilityHudLines(
  mode: ReadabilityMode,
  input: {
    scenario: ReadabilityScenarioId;
    phase: ReadabilityPhase;
    state: BinaryWorldState;
    xPossible: boolean;
    yPossible: boolean;
    visitedX: boolean;
    visitedY: boolean;
    lastTransition: string;
    overlapRefused?: boolean;
  },
): string[] {
  if (mode === "PERCEPTION") {
    return perceptionHudLines(input.scenario);
  }
  const lines = instrumentedHudLines(input);
  if (input.overlapRefused) {
    lines.push("RUN CONFOUNDED overlap-refuse");
  }
  return lines;
}

export function measureReadabilityIntegrity() {
  const pair = measureSolidPair();
  const aBefore = scenarioPose("A", "BEFORE");
  const aAfter = scenarioPose("A", "AFTER");
  const bBefore = scenarioPose("B", "BEFORE");
  const bAfter = scenarioPose("B", "AFTER");
  const cBefore = scenarioPose("C", "BEFORE");
  const cAfter = scenarioPose("C", "AFTER");
  const e = scenarioPose("E", "BEFORE");
  const avoidFromChoice = simulateAgencyAttempt({
    model: "B",
    scenario: "AVOID",
    startX: e.startX,
    startY: e.startY,
    vx: 280,
    vy: 0,
    frames: 36,
  });
  const earlyFromChoice = simulateAgencyAttempt({
    model: "B",
    scenario: "CAUSE",
    startX: e.startX,
    startY: e.startY,
    vx: AGENCY_B_CAUSE.vx,
    vy: AGENCY_B_CAUSE.vy,
    frames: 48,
  });
  return {
    pair,
    aComparable: samePlayerStart(aBefore, aAfter) && aBefore.state !== aAfter.state,
    bComparable: samePlayerStart(bBefore, bAfter) && bBefore.state !== bAfter.state,
    cComparable: samePlayerStart(cBefore, cAfter) && cBefore.state !== cAfter.state,
    eDoesNotForceX: avoidFromChoice.transitions === 0 && avoidFromChoice.stateAfter === "SOLID",
    eCanActivateEarly: earlyFromChoice.transitions >= 1 && earlyFromChoice.stateAfter === "PASSABLE",
    optional: measureActivatorOptional(),
    correct: measureCorrectOrder(),
    early: measureEarlyChange(),
    restore: measureRestore(),
    noTimer: tradeoffHasNoTimer(),
    noOverlapRequired: successfulSequenceAvoidsOverlapRefuse(),
    activatorSeparated: activatorIsSeparated(),
    solidRow: possibilityRow("SOLID"),
    passableRow: possibilityRow("PASSABLE"),
  };
}

export function perceptionModeHidesAnswers(): boolean {
  const lines = perceptionHudLines("E");
  return !perceptionContainsForbidden(lines) && lines.length === 1 && lines[0] === "E";
}

export const HUMAN_PROTOCOL = [
  "1. Perception mode. Tester interacts without numeric or explanatory HUD.",
  "2. 무엇이 달라진 것 같아?",
  "3. After a transition: 지금 할 수 있는 게 아까랑 달라진 게 있어?",
  "4. Before a combined attempt: 둘 다 해야 한다면 어떤 순서로 해볼 것 같아?",
  "5. After a wrong or alternate attempt: 왜 그렇게 됐다고 생각해?",
  "6. Only after the response, instrumented mode may be shown.",
];

export const LEADING_QUESTIONS = [
  "문이 열린 거지?",
  "지지대가 사라졌지?",
  "먼저 위에 올라가야 하지?",
  "스위치를 누르면 통과할 수 있지?",
];

import { PhysicsConfig } from "../physics/PhysicsConfig";
import {
  DELAY_MS,
  acknowledgeCause,
  createDelaySession,
  delayHasNoExpiry,
  delayHasNoMovementMechanic,
  progressBand,
  resetDelaySession,
  restoreDelayImmediately,
  seekDelayProgress,
  type DelaySession,
} from "./WorldStateDelay";
import {
  diagnoseFromFacts,
  simulateSuccessControl,
  simulateWrongPreparation,
  simulateWrongState,
  simulateWrongTiming,
} from "./WorldStateDiagnosis";
import { PREP_STAGING, PREP_WAIT, prepReadiness } from "./WorldStatePrep";
import {
  WORLD_STATE_SUPPORT,
  WORLD_STATE_TRAVERSAL,
  type BinaryWorldState,
} from "./WorldStateProbe";
import {
  earlyActivationPossible,
  geometryDoesNotForceXFirst,
  simulateCorrectPlan,
  simulateEarlyPlan,
  xFirstPossible,
} from "./WorldStateTiming";

export type TemporalReadabilityMode = "INSTRUMENTED" | "PERCEPTION";
export type TemporalScenarioId = "A" | "B" | "C" | "D" | "E";
export type TemporalDimension = "T1" | "T2" | "T3" | "T4" | "T5";
export type TemporalDiagnosisCase = "E1" | "E2" | "E3";
export type GhostAidClass = "PERCEPTION-SAFE" | "INSTRUMENTED-ONLY" | "TOO LEADING";
export type ProgressCueClass = "PERCEPTION-SAFE" | "INSTRUMENTED-ONLY" | "TOO LEADING";
export type ConfoundFlag =
  | "MOVEMENT MISS"
  | "OVERLAP REFUSE"
  | "UNINTENDED ACTIVATOR CONTACT"
  | "REACTIVATION SPAM"
  | "SCENARIO SCRIPT ERROR"
  | "VISUAL CUE FAILURE";

export const TEMPORAL_DELAY_MS = DELAY_MS;

export const TEMPORAL_OBSERVE = { x: 200, y: 300, vx: 0, vy: 0 };
export const TEMPORAL_CAUSE_START = { x: 140, y: 450, vx: 0, vy: 0 };
export const TEMPORAL_CHOICE = { x: 220, y: 450, vx: 0, vy: 0 };

export const PERCEPTION_FORBIDDEN = [
  "SOLID",
  "PASSABLE",
  "CURRENT",
  "FUTURE",
  "PENDING",
  "TOO EARLY",
  "PREPARE NOW",
  "X SUPPORT",
  "Y TRAVERSE",
  "X USED",
  "Y READY",
  "CORRECT ORDER",
  "WRONG STATE",
  "WRONG TIMING",
  "WRONG PREPARATION",
  "READY AT SETTLE",
  "NOT READY",
  "NEARLY READY",
  "CAUSE ACK",
  "SETTLED",
  "PROBE SOLID",
  "PROBE PASSABLE",
];

export const CONFOUND_FLAGS: ConfoundFlag[] = [
  "MOVEMENT MISS",
  "OVERLAP REFUSE",
  "UNINTENDED ACTIVATOR CONTACT",
  "REACTIVATION SPAM",
  "SCENARIO SCRIPT ERROR",
  "VISUAL CUE FAILURE",
];

export const GHOST_AID_CLASSES: Record<string, GhostAidClass> = {
  "exact prior trajectory": "TOO LEADING",
  "exact future target ghost": "TOO LEADING",
  "transition-history timeline": "INSTRUMENTED-ONLY",
  "X/Y labeled zones": "INSTRUMENTED-ONLY",
  "PENDING / FUTURE text": "INSTRUMENTED-ONLY",
  "instrumented percent meter": "INSTRUMENTED-ONLY",
  "subtle contact flash": "PERCEPTION-SAFE",
  "probe fill vs hollow": "PERCEPTION-SAFE",
  "perception fill and ticks": "PERCEPTION-SAFE",
};

export const PROGRESS_CUE_CLASS: Record<string, ProgressCueClass> = {
  instrumentedPhaseText: "INSTRUMENTED-ONLY",
  instrumentedPercent: "INSTRUMENTED-ONLY",
  chevronCount: "TOO LEADING",
  perceptionFillAndTicks: "PERCEPTION-SAFE",
};

export const HUMAN_PROTOCOL = [
  "1. Perception mode. 지금 뭐가 일어나고 있는 것 같아?",
  "2. 방금 네가 한 행동 때문에 무언가 달라진 것 같아?",
  "3. 아직 바뀌지 않은 것과 곧 바뀔 것 같은 게 있어?",
  "4. Before T4 choice: 둘 다 해야 한다면 어떤 순서로 해볼 것 같아?",
  "5. After failure: 왜 그렇게 된 것 같아?",
  "6. After another failure: 이번에는 앞이랑 뭐가 달랐던 것 같아?",
  "Instrumented mode only after the response, if needed for debugging.",
];

export const LEADING_QUESTIONS = [
  "너무 일찍 눌렀지?",
  "먼저 X 해야 하는 거 아니야?",
  "준비를 안 해서 그런 거 아니야?",
];

export type TemporalPose = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

export function scenarioDimension(id: TemporalScenarioId): TemporalDimension {
  if (id === "A") {
    return "T1";
  }
  if (id === "B") {
    return "T2";
  }
  if (id === "C") {
    return "T3";
  }
  if (id === "D") {
    return "T4";
  }
  return "T5";
}

export function scenarioPose(id: TemporalScenarioId, diagnosis: TemporalDiagnosisCase = "E1"): TemporalPose {
  if (id === "A" || id === "C") {
    return { ...TEMPORAL_OBSERVE };
  }
  if (id === "B") {
    return { ...TEMPORAL_CAUSE_START };
  }
  if (id === "D") {
    return { ...TEMPORAL_CHOICE };
  }
  if (diagnosis === "E1") {
    return { x: PREP_STAGING.x, y: PREP_STAGING.y, vx: WORLD_STATE_TRAVERSAL.vx, vy: 0 };
  }
  if (diagnosis === "E2") {
    return { x: PREP_WAIT.x, y: PREP_WAIT.y, vx: 0, vy: 0 };
  }
  return { x: PREP_WAIT.x, y: PREP_WAIT.y, vx: 0, vy: 0 };
}

export function seedSession(id: TemporalScenarioId, diagnosis: TemporalDiagnosisCase = "E1"): DelaySession {
  if (id === "A") {
    return seekDelayProgress(acknowledgeCause(), 0.5);
  }
  if (id === "C") {
    return seekDelayProgress(acknowledgeCause(), 1 / 3);
  }
  if (id === "E" && (diagnosis === "E1" || diagnosis === "E2" || diagnosis === "E3")) {
    return acknowledgeCause();
  }
  return createDelaySession("SOLID");
}

export function perceptionHudLines(scenario: TemporalScenarioId): string[] {
  return [scenario];
}

export function instrumentedHudLines(input: {
  scenario: TemporalScenarioId;
  diagnosis?: TemporalDiagnosisCase;
  session: DelaySession;
  x: number;
  y: number;
  xUsed: boolean;
  confound?: ConfoundFlag | null;
}): string[] {
  const ready = prepReadiness(input.x, input.y);
  const lines = [
    `SCENARIO ${input.scenario} ${scenarioDimension(input.scenario)}${input.diagnosis ? ` ${input.diagnosis}` : ""}`,
    `CURRENT ${input.session.probe.state}`,
    `FUTURE ${input.session.futureState ?? "—"}`,
    `W4 PHASE ${input.session.phase}`,
    `PROGRESS ${Math.round(input.session.progress * 100)}% ${progressBand(input.session.progress)}`,
    `X USED ${input.xUsed ? "YES" : "NO"}`,
    `Y READY ${ready === "READY AT SETTLE" ? "YES" : "NO"}`,
  ];
  if (input.confound) {
    lines.push(`RUN CONFOUNDED ${input.confound}`);
  }
  return lines;
}

export function perceptionContainsForbidden(lines: string[]): boolean {
  const blob = lines.join("\n");
  return PERCEPTION_FORBIDDEN.some((token) => blob.includes(token));
}

export function temporalHudLines(
  mode: TemporalReadabilityMode,
  input: {
    scenario: TemporalScenarioId;
    diagnosis?: TemporalDiagnosisCase;
    session: DelaySession;
    x: number;
    y: number;
    xUsed: boolean;
    confound?: ConfoundFlag | null;
  },
): string[] {
  if (mode === "PERCEPTION") {
    return perceptionHudLines(input.scenario);
  }
  return instrumentedHudLines(input);
}

export function perceptionModeHidesAnswers(): boolean {
  return (["A", "B", "C", "D", "E"] as TemporalScenarioId[]).every((id) => {
    const lines = perceptionHudLines(id);
    return lines.length === 1 && lines[0] === id && !perceptionContainsForbidden(lines);
  });
}

export function perceptionHidesDiagnosisLabels(): boolean {
  const blob = perceptionHudLines("E").join("\n");
  return !blob.includes("WRONG STATE")
    && !blob.includes("WRONG TIMING")
    && !blob.includes("WRONG PREPARATION")
    && !blob.includes("E1")
    && !blob.includes("E2")
    && !blob.includes("E3");
}

export function measureT1CurrentVsFuture() {
  const session = seedSession("A");
  return {
    current: session.probe.state as BinaryWorldState,
    future: session.futureState,
    phase: session.phase,
    distinct: session.probe.state === "SOLID" && session.futureState === "PASSABLE",
    stillSolid: session.probe.state === "SOLID",
    delayMs: session.delayMs,
  };
}

export function measureT2CauseLink() {
  const idle = createDelaySession("SOLID");
  const caused = acknowledgeCause(idle);
  return {
    idlePhase: idle.phase,
    causedPhase: caused.phase,
    ack: caused.causeAcknowledged,
    future: caused.futureState,
    stillSolid: caused.probe.state === "SOLID",
    links: caused.phase === "PENDING" && caused.causeAcknowledged && caused.futureState === "PASSABLE",
  };
}

export function measureT3Progress() {
  const pending = acknowledgeCause();
  const early = seekDelayProgress(pending, 0.25);
  const mid = seekDelayProgress(early, 0.5);
  const late = seekDelayProgress(mid, 0.8);
  return {
    values: [early.progress, mid.progress, late.progress],
    monotonic: early.progress < mid.progress && mid.progress < late.progress,
    bands: [progressBand(early.progress), progressBand(mid.progress), progressBand(late.progress)],
    stillPending: late.phase === "PENDING" && late.probe.state === "SOLID",
  };
}

export function measureT4Orders() {
  const early = simulateEarlyPlan({ band: "NOMINAL" });
  const correct = simulateCorrectPlan({ band: "NOMINAL" });
  return {
    earlyPossible: earlyActivationPossible(),
    xFirstPossible: xFirstPossible(),
    geometryOpen: geometryDoesNotForceXFirst(),
    earlyLosesX: !early.xUsed && !early.xAvailableAtAttempt,
    xFirstSucceeds: correct.combined,
  };
}

export function measureT5Cases() {
  const state = simulateWrongState();
  const timing = simulateWrongTiming();
  const prep = simulateWrongPreparation();
  const success = simulateSuccessControl();
  return {
    state: {
      diagnosis: diagnoseFromFacts(state.facts),
      yBlockedWhileSolid: state.facts.yAttempted && state.facts.stateAtYAttempt === "SOLID" && !state.facts.yTraversedAtAttempt,
      timingOk: state.causeTimingCorrect,
    },
    timing: {
      diagnosis: diagnoseFromFacts(timing.facts),
      lostX: !timing.facts.xUsed && !timing.facts.xAvailableAtObservation,
      yAvailable: timing.facts.yAvailableAfter,
    },
    prep: {
      diagnosis: diagnoseFromFacts(prep.facts),
      passable: prep.facts.stateAtObservation === "PASSABLE",
      notReady: !prep.facts.yReadyAtObservation,
      timingOk: prep.causeTimingCorrect,
    },
    success: success.combined && success.diagnosis === "NONE",
  };
}

export function resetRestoresBaseline(session: DelaySession = acknowledgeCause()): DelaySession {
  return restoreDelayImmediately(
    resetDelaySession(session, TEMPORAL_OBSERVE.x, TEMPORAL_OBSERVE.y),
    TEMPORAL_OBSERVE.x,
    TEMPORAL_OBSERVE.y,
  );
}

export function temporalHasSameRelation(session: DelaySession): boolean {
  return session.delayMs === 720
    && TEMPORAL_DELAY_MS === DELAY_MS
    && delayHasNoExpiry(session)
    && delayHasNoMovementMechanic(session)
    && session.queuedEvents === 0
    && PhysicsConfig.gravity === 1400
    && PhysicsConfig.bounceVelocity === 580
    && PhysicsConfig.contactSkin === 6;
}

export function knownFixturesUnchanged(): boolean {
  return PREP_WAIT.x === 108
    && PREP_WAIT.y === 450
    && PREP_STAGING.x === 260
    && PREP_STAGING.y === 450
    && WORLD_STATE_SUPPORT.startX === 334
    && WORLD_STATE_SUPPORT.startY === 360
    && WORLD_STATE_TRAVERSAL.vx === 280;
}

export function playCauseClick(): void {
  if (typeof AudioContext === "undefined") {
    return;
  }
  const ctx = new AudioContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.frequency.value = 880;
  gain.gain.value = 0.05;
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.05);
}

export function protocolIsNonLeading(): boolean {
  return HUMAN_PROTOCOL.every((line) => !LEADING_QUESTIONS.some((q) => line.includes(q)));
}

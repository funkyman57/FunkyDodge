import { PhysicsConfig } from "../physics/PhysicsConfig";
import { MODEL_B_ACTIVATOR_BOUNDS } from "./WorldStateAgency";
import {
  DELAY_CONTACT,
  DELAY_DT_MS,
  DELAY_MS,
  acknowledgeCause,
  createDelaySession,
  delayHasNoExpiry,
  delayHasNoMovementMechanic,
  resetDelaySession,
  restoreDelayImmediately,
  stepDelay,
  type DelaySession,
} from "./WorldStateDelay";
import {
  PREP_STAGING,
  PREP_STAGING_BOUNDS,
  PREP_VX,
  PREP_WAIT,
  attemptYFrom,
  extraTravelToStaging,
  pointIn,
  prepReadiness,
  type PrepReadiness,
} from "./WorldStatePrep";
import {
  WORLD_STATE_DT,
  WORLD_STATE_PROBE_BOUNDS,
  WORLD_STATE_RADIUS,
  WORLD_STATE_TRAVERSAL,
  createWorldStateProbe,
  resolveOrdinaryContact,
  type BinaryWorldState,
} from "./WorldStateProbe";
import {
  TIMING_ACTIVATE,
  TIMING_DELAY_MS,
  attemptXOn,
  simulateCorrectPlan,
  simulateEarlyPlan,
} from "./WorldStateTiming";

export type DiagnosisId = "WRONG STATE" | "WRONG TIMING" | "WRONG PREPARATION" | "NONE";
export type DiagnosisScenarioId = "A" | "B" | "C" | "D" | "E";

export const DIAGNOSIS_DELAY_MS = DELAY_MS;

export type DiagnosisFacts = {
  yAttempted: boolean;
  stateAtYAttempt: BinaryWorldState | null;
  yTraversedAtAttempt: boolean;
  xUsed: boolean;
  causedAfterX: boolean;
  xAvailableAtObservation: boolean;
  stateAtObservation: BinaryWorldState;
  yReadyAtObservation: boolean;
  yAvailableAfter: boolean;
};

export type DiagnosisTrace = {
  scenario: DiagnosisScenarioId;
  label: string;
  session: DelaySession;
  facts: DiagnosisFacts;
  diagnosis: DiagnosisId;
  currentStateCorrect: boolean;
  causeTimingCorrect: boolean;
  prepared: boolean;
  combined: boolean;
  activateMs: number;
  observeMs: number;
  observeX: number;
  observeY: number;
  readiness: PrepReadiness;
  extraFramesToY: number;
  extraDistanceToY: number;
  refused: number;
  overlapRequired: boolean;
  steps: string[];
};

function resolveStep(
  session: DelaySession,
  x: number,
  y: number,
  vx: number,
  vy: number,
) {
  const probeHit = resolveOrdinaryContact({
    x,
    y,
    vx,
    vy,
    radius: WORLD_STATE_RADIUS,
    probe: session.probe,
  });
  const activatorHit = resolveOrdinaryContact({
    x: probeHit.x,
    y: probeHit.y,
    vx: probeHit.vx,
    vy: probeHit.vy,
    radius: WORLD_STATE_RADIUS,
    probe: createWorldStateProbe("SOLID", MODEL_B_ACTIVATOR_BOUNDS),
  });
  const next = stepDelay(session, activatorHit.x, activatorHit.y, DELAY_DT_MS);
  return {
    session: next,
    x: activatorHit.x,
    y: activatorHit.y,
  };
}

export function diagnoseFromFacts(facts: DiagnosisFacts): DiagnosisId {
  if (facts.yAttempted && facts.stateAtYAttempt === "SOLID" && !facts.yTraversedAtAttempt) {
    return "WRONG STATE";
  }
  if (!facts.xUsed && !facts.xAvailableAtObservation) {
    return "WRONG TIMING";
  }
  if (
    facts.xUsed
    && facts.causedAfterX
    && facts.stateAtObservation === "PASSABLE"
    && !facts.yReadyAtObservation
  ) {
    return "WRONG PREPARATION";
  }
  return "NONE";
}

function xStillAvailable(session: DelaySession): boolean {
  return attemptXOn(session).supported;
}

/**
 * Y attempt after correct X and acceptable cause, while PENDING is still SOLID.
 * Schedule and preparation are not the problem; current World State is.
 */
export function simulateWrongState(): DiagnosisTrace {
  const xUsed = attemptXOn(createDelaySession("SOLID")).supported;
  let session = acknowledgeCause();
  const activateMs = session.elapsedMs;
  let x = TIMING_ACTIVATE.x;
  let y = TIMING_ACTIVATE.y;
  const steps = [
    `SOLID use X: supported=${xUsed}`,
    `activate ACK elapsed=${activateMs.toFixed(1)}ms phase=${session.phase} state=${session.probe.state}`,
    "prepare Y during PENDING",
  ];

  for (let i = 0; i < 90; i += 1) {
    const vx = x < PREP_STAGING.x ? PREP_VX : 0;
    const stepped = resolveStep(session, x + vx * WORLD_STATE_DT, y, vx, 0);
    session = stepped.session;
    x = stepped.x;
    y = stepped.y;
    if (pointIn(x, y, PREP_STAGING_BOUNDS) && session.phase === "PENDING") {
      const yAttempt = attemptYFrom(x, y, session);
      const readiness = prepReadiness(x, y);
      const facts: DiagnosisFacts = {
        yAttempted: true,
        stateAtYAttempt: session.probe.state,
        yTraversedAtAttempt: yAttempt.traversed,
        xUsed,
        causedAfterX: xUsed,
        xAvailableAtObservation: xStillAvailable(session),
        stateAtObservation: session.probe.state,
        yReadyAtObservation: readiness === "READY AT SETTLE",
        yAvailableAfter: false,
      };
      steps.push(
        `Y attempt ${session.elapsedMs.toFixed(1)}ms at ${x.toFixed(1)},${y.toFixed(1)} state=${session.probe.state} traversed=${yAttempt.traversed} ready=${readiness}`,
      );
      return {
        scenario: "A",
        label: "WRONG STATE",
        session,
        facts,
        diagnosis: diagnoseFromFacts(facts),
        currentStateCorrect: session.probe.state === "PASSABLE",
        causeTimingCorrect: xUsed,
        prepared: readiness === "READY AT SETTLE",
        combined: false,
        activateMs,
        observeMs: session.elapsedMs,
        observeX: x,
        observeY: y,
        readiness,
        extraFramesToY: 0,
        extraDistanceToY: 0,
        refused: session.refused,
        overlapRequired: session.refused > 0,
        steps,
      };
    }
  }

  throw new Error("WRONG STATE scenario never reached Y staging during PENDING");
}

/**
 * EXP-002 early cause: remaining SOLID is spent traveling toward unused X.
 * Y can still be available after settle. Combined goal fails because X is gone.
 */
export function simulateWrongTiming(): DiagnosisTrace {
  const early = simulateEarlyPlan({ band: "NOMINAL" });
  const yAfter = attemptYFrom(PREP_STAGING.x, PREP_STAGING.y, early.session);
  const facts: DiagnosisFacts = {
    yAttempted: false,
    stateAtYAttempt: null,
    yTraversedAtAttempt: false,
    xUsed: early.xUsed,
    causedAfterX: false,
    xAvailableAtObservation: early.xAvailableAtAttempt,
    stateAtObservation: early.session.probe.state,
    yReadyAtObservation: early.readiness === "READY AT SETTLE",
    yAvailableAfter: yAfter.traversed,
  };
  return {
    scenario: "B",
    label: "WRONG TIMING",
    session: early.session,
    facts,
    diagnosis: diagnoseFromFacts(facts),
    currentStateCorrect: early.session.probe.state === "PASSABLE",
    causeTimingCorrect: false,
    prepared: yAfter.traversed,
    combined: early.combined,
    activateMs: early.activateMs,
    observeMs: early.settleMs,
    observeX: early.settleX,
    observeY: early.settleY,
    readiness: early.readiness,
    extraFramesToY: extraTravelToStaging(early.settleX).frames,
    extraDistanceToY: extraTravelToStaging(early.settleX).distance,
    refused: early.refused,
    overlapRequired: early.overlapRequired,
    steps: [
      ...early.steps,
      `Y from staging after settle traversed=${yAfter.traversed}`,
      `combined=${early.combined} (X unused=${!early.xUsed})`,
    ],
  };
}

/**
 * X used, cause after X, then WAIT through PENDING.
 * PASSABLE arrives; player is not Y-ready. Failure is position, not expiry.
 */
export function simulateWrongPreparation(): DiagnosisTrace {
  const xUsed = attemptXOn(createDelaySession("SOLID")).supported;
  let session = acknowledgeCause();
  const activateMs = session.elapsedMs;
  let x = PREP_WAIT.x;
  let y = PREP_WAIT.y;
  const steps = [
    `SOLID use X: supported=${xUsed}`,
    `activate ACK elapsed=${activateMs.toFixed(1)}ms phase=${session.phase}`,
    "do not prepare Y during PENDING",
  ];

  for (let i = 0; i < 90; i += 1) {
    const stepped = resolveStep(session, x, y, 0, 0);
    session = stepped.session;
    x = stepped.x;
    y = stepped.y;
    if (session.phase === "SETTLED") {
      break;
    }
  }

  const readiness = prepReadiness(x, y);
  const travel = extraTravelToStaging(x);
  const yNow = attemptYFrom(x, y, session);
  const yLater = attemptYFrom(PREP_STAGING.x, PREP_STAGING.y, session);
  const facts: DiagnosisFacts = {
    yAttempted: false,
    stateAtYAttempt: null,
    yTraversedAtAttempt: false,
    xUsed,
    causedAfterX: xUsed,
    xAvailableAtObservation: xStillAvailable(session),
    stateAtObservation: session.probe.state,
    yReadyAtObservation: readiness === "READY AT SETTLE",
    yAvailableAfter: yLater.traversed,
  };
  steps.push(
    `SETTLED ${session.elapsedMs.toFixed(1)}ms at ${x.toFixed(1)},${y.toFixed(1)} state=${session.probe.state} ${readiness}`,
  );
  steps.push(`Y from wait traversed=${yNow.traversed} extra ${travel.frames}f / ${travel.distance.toFixed(1)}px`);
  steps.push(`Y from staging later traversed=${yLater.traversed} (PASSABLE persists)`);
  return {
    scenario: "C",
    label: "WRONG PREPARATION",
    session,
    facts,
    diagnosis: diagnoseFromFacts(facts),
    currentStateCorrect: session.probe.state === "PASSABLE",
    causeTimingCorrect: xUsed,
    prepared: false,
    combined: xUsed && yNow.traversed,
    activateMs,
    observeMs: session.elapsedMs,
    observeX: x,
    observeY: y,
    readiness,
    extraFramesToY: travel.frames,
    extraDistanceToY: travel.distance,
    refused: session.refused,
    overlapRequired: session.refused > 0,
    steps,
  };
}

export function simulateSuccessControl(): DiagnosisTrace {
  const right = simulateCorrectPlan({ band: "NOMINAL" });
  const facts: DiagnosisFacts = {
    yAttempted: true,
    stateAtYAttempt: right.session.probe.state,
    yTraversedAtAttempt: right.yUsed,
    xUsed: right.xUsed,
    causedAfterX: right.xUsed,
    xAvailableAtObservation: right.xAvailableAtAttempt,
    stateAtObservation: right.session.probe.state,
    yReadyAtObservation: right.yReadyAtSettle,
    yAvailableAfter: right.yUsed,
  };
  return {
    scenario: "D",
    label: "SUCCESS",
    session: right.session,
    facts,
    diagnosis: diagnoseFromFacts(facts),
    currentStateCorrect: right.session.probe.state === "PASSABLE",
    causeTimingCorrect: true,
    prepared: right.yReadyAtSettle,
    combined: right.combined,
    activateMs: right.activateMs,
    observeMs: right.settleMs,
    observeX: right.settleX,
    observeY: right.settleY,
    readiness: right.readiness,
    extraFramesToY: 0,
    extraDistanceToY: 0,
    refused: right.refused,
    overlapRequired: right.overlapRequired,
    steps: right.steps,
  };
}

export function runDiagnosisRetry(): {
  wrong: DiagnosisTrace;
  restored: DelaySession;
  success: DiagnosisTrace;
} {
  const wrong = simulateWrongTiming();
  const restored = restoreDelayImmediately(
    resetDelaySession(wrong.session, PREP_WAIT.x, PREP_WAIT.y),
    PREP_WAIT.x,
    PREP_WAIT.y,
  );
  return { wrong, restored, success: simulateSuccessControl() };
}

export function sameDelayUsed(...traces: DiagnosisTrace[]): boolean {
  return traces.every((trace) => trace.session.delayMs === DIAGNOSIS_DELAY_MS)
    && DIAGNOSIS_DELAY_MS === DELAY_MS
    && TIMING_DELAY_MS === DELAY_MS;
}

export function sameProbeActivatorRelation(): boolean {
  return DELAY_CONTACT.x === 108
    && DELAY_CONTACT.y === 450
    && WORLD_STATE_PROBE_BOUNDS.left === 320
    && WORLD_STATE_PROBE_BOUNDS.right === 348
    && MODEL_B_ACTIVATOR_BOUNDS.right <= WORLD_STATE_PROBE_BOUNDS.left - 8
    && PREP_VX === WORLD_STATE_TRAVERSAL.vx;
}

export function diagnosisHasNoSecondMechanic(session: DelaySession): boolean {
  return delayHasNoExpiry(session)
    && delayHasNoMovementMechanic(session)
    && session.queuedEvents === 0
    && DIAGNOSIS_DELAY_MS === 720
    && PhysicsConfig.gravity === 1400
    && PhysicsConfig.bounceVelocity === 580
    && PhysicsConfig.contactSkin === 6;
}

export function yAttemptDiffersOnlyByState(): boolean {
  const solid = attemptYFrom(PREP_STAGING.x, PREP_STAGING.y, createDelaySession("SOLID"));
  const passable = attemptYFrom(
    PREP_STAGING.x,
    PREP_STAGING.y,
    { ...createDelaySession("PASSABLE"), probe: createWorldStateProbe("PASSABLE") },
  );
  return !solid.traversed && passable.traversed;
}

export function formatDiagnosisMatrix(
  rows: DiagnosisTrace[] = [
    simulateWrongState(),
    simulateWrongTiming(),
    simulateWrongPreparation(),
    simulateSuccessControl(),
  ],
): string {
  const header = "Scenario | Current state correct? | Cause timing correct? | Prepared? | Result | Diagnosis";
  const lines = rows.map((row) => [
    row.label,
    row.currentStateCorrect ? "YES" : "NO",
    row.causeTimingCorrect ? "YES" : "NO",
    row.prepared ? "YES" : "NO",
    row.combined ? "success" : row.label === "WRONG STATE" ? "Y blocked" : row.label === "WRONG PREPARATION" ? "not Y-ready" : "combined fail",
    row.diagnosis,
  ].join(" | "));
  return [header, ...lines].join("\n");
}

export function diagnosisHudLines(input: {
  scenario: DiagnosisScenarioId | null;
  session: DelaySession;
  x: number;
  y: number;
  xUsed: boolean;
}): string[] {
  if (!input.scenario) {
    return [];
  }
  const ready = prepReadiness(input.x, input.y);
  const facts: DiagnosisFacts = {
    yAttempted: input.scenario === "A" && input.session.probe.state === "SOLID",
    stateAtYAttempt: input.scenario === "A" ? input.session.probe.state : null,
    yTraversedAtAttempt: false,
    xUsed: input.xUsed,
    causedAfterX: input.xUsed && input.session.phase !== "IDLE",
    xAvailableAtObservation: input.session.probe.state === "SOLID",
    stateAtObservation: input.session.probe.state,
    yReadyAtObservation: ready === "READY AT SETTLE",
    yAvailableAfter: input.session.probe.state === "PASSABLE",
  };
  return [
    `DX ${input.scenario}`,
    `NOW ${input.session.probe.state} FUT ${input.session.futureState ?? "—"}`,
    `X USED ${input.xUsed ? "YES" : "NO"}`,
    `Y READY ${ready === "READY AT SETTLE" ? "YES" : "NO"}`,
    `CANDIDATE ${diagnoseFromFacts(facts)}`,
  ];
}

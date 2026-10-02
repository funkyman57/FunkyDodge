import {
  AGENCY_B_CAUSE,
  AGENCY_B_USE,
  MODEL_B_ACTIVATOR_BOUNDS,
  activatorAndProbeSeparated,
  simulateAgencyAttempt,
} from "./WorldStateAgency";
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
  pointIn,
  prepReadiness,
  type PrepReadiness,
} from "./WorldStatePrep";
import {
  WORLD_STATE_DT,
  WORLD_STATE_PROBE_BOUNDS,
  WORLD_STATE_RADIUS,
  WORLD_STATE_SUPPORT,
  WORLD_STATE_TRAVERSAL,
  createWorldStateProbe,
  resolveOrdinaryContact,
  simulateWorldStateAttempt,
} from "./WorldStateProbe";

export type TimingPlanId = "EARLY" | "CORRECT";
export type TimingBand = "FAST" | "NOMINAL" | "SLOW";
export type TimingScenarioId = "A" | "B" | "C" | "D";

export const TIMING_DELAY_MS = DELAY_MS;
export const TIMING_NOMINAL_SPEED = PREP_VX;
export const TIMING_FAST_SPEED = 350;
export const TIMING_SLOW_SPEED = 220;
export const TIMING_LATE_PAUSE_FRAMES = 18;
export const TIMING_X_POSE = {
  x: WORLD_STATE_SUPPORT.startX,
  y: WORLD_STATE_SUPPORT.startY,
};
export const TIMING_ACTIVATE = { x: DELAY_CONTACT.x, y: DELAY_CONTACT.y };

export type TimingTrace = {
  plan: TimingPlanId;
  band: TimingBand;
  session: DelaySession;
  xUsed: boolean;
  yUsed: boolean;
  combined: boolean;
  xAvailableAtAttempt: boolean;
  activateMs: number;
  settleMs: number;
  xAttemptMs: number;
  settleX: number;
  settleY: number;
  readiness: PrepReadiness;
  yReadyAtSettle: boolean;
  refused: number;
  overlapRequired: boolean;
  steps: string[];
};

export function speedFor(band: TimingBand): number {
  if (band === "FAST") {
    return TIMING_FAST_SPEED;
  }
  if (band === "SLOW") {
    return TIMING_SLOW_SPEED;
  }
  return TIMING_NOMINAL_SPEED;
}

export function attemptXOn(session: DelaySession) {
  return simulateWorldStateAttempt({
    scenario: "A",
    probe: session.probe,
    ...WORLD_STATE_SUPPORT,
  });
}

function travelVelocity(fromX: number, fromY: number, toX: number, toY: number, speed: number) {
  const dx = toX - fromX;
  const dy = toY - fromY;
  const dist = Math.hypot(dx, dy);
  if (dist < 1) {
    return { vx: 0, vy: 0, dist: 0 };
  }
  return { vx: (dx / dist) * speed, vy: (dy / dist) * speed, dist };
}

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
    vx: activatorHit.vx,
    vy: activatorHit.vy,
    supported: probeHit.supported,
  };
}

export function simulateEarlyPlan(options: {
  band?: TimingBand;
  pauseFrames?: number;
} = {}): TimingTrace {
  const band = options.band ?? "NOMINAL";
  const speed = speedFor(band);
  const pauseFrames = options.pauseFrames ?? 0;
  let session = acknowledgeCause();
  const activateMs = session.elapsedMs;
  let x = TIMING_ACTIVATE.x;
  let y = TIMING_ACTIVATE.y;
  let xUsed = false;
  let arriving = false;
  let settleX = x;
  let settleY = y;
  let settleMs = session.elapsedMs;
  const steps = [
    `t0 activate ACK elapsed=${activateMs.toFixed(1)}ms state=${session.probe.state} phase=${session.phase}`,
  ];

  for (let i = 0; i < 120; i += 1) {
    let vx = 0;
    let vy = 0;
    if (i >= pauseFrames) {
      if (!arriving && Math.hypot(TIMING_X_POSE.x - x, TIMING_X_POSE.y - y) > 4) {
        const travel = travelVelocity(x, y, TIMING_X_POSE.x, TIMING_X_POSE.y, speed);
        vx = travel.vx;
        vy = travel.vy;
      } else {
        arriving = true;
        vx = 0;
        vy = WORLD_STATE_SUPPORT.vy;
      }
    }
    const stepped = resolveStep(session, x + vx * WORLD_STATE_DT, y + vy * WORLD_STATE_DT, vx, vy);
    session = stepped.session;
    x = stepped.x;
    y = stepped.y;
    if (stepped.supported && session.probe.state === "SOLID") {
      xUsed = true;
    }
    if (session.phase === "SETTLED") {
      settleX = x;
      settleY = y;
      settleMs = session.elapsedMs;
      steps.push(`SETTLED ${settleMs.toFixed(1)}ms at ${x.toFixed(1)},${y.toFixed(1)} X used yet=${xUsed}`);
      break;
    }
  }

  const xAttempt = attemptXOn(session);
  const yAttempt = attemptYFrom(PREP_STAGING.x, PREP_STAGING.y, session);
  steps.push(`X attempt after settle: supported=${xAttempt.supported} state=${session.probe.state}`);
  steps.push(`Y available=${yAttempt.traversed}`);
  return {
    plan: "EARLY",
    band,
    session,
    xUsed,
    yUsed: yAttempt.traversed,
    combined: xUsed && yAttempt.traversed,
    xAvailableAtAttempt: xAttempt.supported,
    activateMs,
    settleMs,
    xAttemptMs: settleMs,
    settleX,
    settleY,
    readiness: prepReadiness(settleX, settleY),
    yReadyAtSettle: false,
    refused: session.refused,
    overlapRequired: session.refused > 0,
    steps,
  };
}

export function simulateCorrectPlan(options: {
  band?: TimingBand;
  pauseFrames?: number;
} = {}): TimingTrace {
  const band = options.band ?? "NOMINAL";
  const speed = speedFor(band);
  const pauseFrames = options.pauseFrames ?? 0;
  const idle = createDelaySession("SOLID");
  const xAttempt = attemptXOn(idle);
  const xUsed = xAttempt.supported && xAttempt.finalY <= WORLD_STATE_PROBE_BOUNDS.top;
  const steps = [
    `SOLID use X: supported=${xAttempt.supported} y=${xAttempt.finalY.toFixed(1)}`,
    "leave X (untimed) → activator",
  ];
  let session = acknowledgeCause();
  const activateMs = session.elapsedMs;
  steps.push(`activate ACK elapsed=${activateMs.toFixed(1)}ms phase=${session.phase}`);
  let x = TIMING_ACTIVATE.x;
  let y = TIMING_ACTIVATE.y;
  let settleX = x;
  let settleY = y;
  let settleMs = session.elapsedMs;

  for (let i = 0; i < 90; i += 1) {
    let vx = 0;
    let vy = 0;
    if (i >= pauseFrames && x < PREP_STAGING.x) {
      vx = speed;
    }
    const stepped = resolveStep(session, x + vx * WORLD_STATE_DT, y + vy * WORLD_STATE_DT, vx, vy);
    session = stepped.session;
    x = stepped.x;
    y = stepped.y;
    if (session.phase === "SETTLED") {
      settleX = x;
      settleY = y;
      settleMs = session.elapsedMs;
      steps.push(`SETTLED ${settleMs.toFixed(1)}ms at ${x.toFixed(1)},${y.toFixed(1)}`);
      break;
    }
  }

  const yFromSettle = attemptYFrom(
    pointIn(settleX, settleY, PREP_STAGING_BOUNDS) ? settleX : PREP_STAGING.x,
    pointIn(settleX, settleY, PREP_STAGING_BOUNDS) ? settleY : PREP_STAGING.y,
    session,
  );
  const yUsed = yFromSettle.traversed;
  const ready = prepReadiness(settleX, settleY);
  steps.push(`Y after settle traversed=${yUsed} ready=${ready}`);
  return {
    plan: "CORRECT",
    band,
    session,
    xUsed,
    yUsed,
    combined: xUsed && yUsed,
    xAvailableAtAttempt: true,
    activateMs,
    settleMs,
    xAttemptMs: WORLD_STATE_SUPPORT.frames * DELAY_DT_MS,
    settleX,
    settleY,
    readiness: ready,
    yReadyAtSettle: ready === "READY AT SETTLE",
    refused: session.refused,
    overlapRequired: session.refused > 0,
    steps,
  };
}

export function runEarlyA(band: TimingBand = "NOMINAL"): TimingTrace {
  return simulateEarlyPlan({ band });
}

export function runCorrectB(band: TimingBand = "NOMINAL"): TimingTrace {
  return simulateCorrectPlan({ band });
}

export function runCorrectLate(): TimingTrace {
  return simulateCorrectPlan({ band: "NOMINAL", pauseFrames: TIMING_LATE_PAUSE_FRAMES });
}

export function measurePlanVariations() {
  return {
    early: {
      slow: simulateEarlyPlan({ band: "SLOW" }),
      nominal: simulateEarlyPlan({ band: "NOMINAL" }),
      fast: simulateEarlyPlan({ band: "FAST" }),
      paused: simulateEarlyPlan({ band: "NOMINAL", pauseFrames: 12 }),
    },
    correct: {
      slow: simulateCorrectPlan({ band: "SLOW" }),
      nominal: simulateCorrectPlan({ band: "NOMINAL" }),
      fast: simulateCorrectPlan({ band: "FAST" }),
      late: runCorrectLate(),
    },
  };
}

export function runRetryD(): { wrong: TimingTrace; restored: DelaySession; right: TimingTrace } {
  const wrong = simulateEarlyPlan();
  const restored = resetDelaySession(wrong.session, PREP_WAIT.x, PREP_WAIT.y);
  const idle = restoreDelayImmediately(restored, PREP_WAIT.x, PREP_WAIT.y);
  const right = simulateCorrectPlan();
  return { wrong, restored: idle, right };
}

export function earlyActivationPossible(): boolean {
  const cause = acknowledgeCause();
  return cause.causeAcknowledged
    && cause.phase === "PENDING"
    && cause.probe.state === "SOLID"
    && attemptXOn(createDelaySession("SOLID")).supported;
}

export function xFirstPossible(): boolean {
  const use = simulateAgencyAttempt({
    model: "B",
    scenario: "USE",
    ...AGENCY_B_USE,
  });
  const support = attemptXOn(createDelaySession("SOLID"));
  return use.transitions === 0 && support.supported;
}

export function geometryDoesNotForceXFirst(): boolean {
  return activatorAndProbeSeparated()
    && earlyActivationPossible()
    && xFirstPossible();
}

export function instantWriteEarlyLosesXImmediately(): boolean {
  const cause = simulateAgencyAttempt({
    model: "B",
    scenario: "CAUSE",
    ...AGENCY_B_CAUSE,
  });
  const x = simulateWorldStateAttempt({
    scenario: "A",
    probe: createWorldStateProbe("PASSABLE"),
    ...WORLD_STATE_SUPPORT,
  });
  return cause.stateAfter === "PASSABLE" && !x.supported;
}

export function instantWriteCorrectIsW3Order(): boolean {
  const x = attemptXOn(createDelaySession("SOLID"));
  const cause = simulateAgencyAttempt({
    model: "B",
    scenario: "CAUSE",
    ...AGENCY_B_CAUSE,
  });
  const y = simulateWorldStateAttempt({
    scenario: "B",
    probe: createWorldStateProbe("PASSABLE"),
    ...WORLD_STATE_TRAVERSAL,
  });
  return x.supported && cause.stateAfter === "PASSABLE" && y.traversed;
}

export function timingHasNoExpiryOrCounter(session: DelaySession): boolean {
  return delayHasNoExpiry(session)
    && delayHasNoMovementMechanic(session)
    && TIMING_DELAY_MS === 720
    && TIMING_NOMINAL_SPEED === WORLD_STATE_TRAVERSAL.vx;
}

export function formatTimingTable(
  rows: TimingTrace[] = [
    simulateEarlyPlan({ band: "SLOW" }),
    simulateEarlyPlan({ band: "NOMINAL" }),
    simulateEarlyPlan({ band: "FAST" }),
    simulateCorrectPlan({ band: "FAST" }),
    simulateCorrectPlan({ band: "NOMINAL" }),
    runCorrectLate(),
  ],
): string {
  const header = "Plan | Band | X used | X later | Y | Combined | Settle x,y | Ready";
  const lines = rows.map((row) => [
    row.plan,
    row.band,
    row.xUsed ? "YES" : "NO",
    row.xAvailableAtAttempt ? "YES" : "NO",
    row.yUsed ? "YES" : "NO",
    row.combined ? "YES" : "NO",
    `${row.settleX.toFixed(1)},${row.settleY.toFixed(1)}`,
    row.readiness,
  ].join(" | "));
  return [header, ...lines].join("\n");
}

export function timingHudLines(trace: { plan: TimingPlanId | null; xUsed: boolean; combined: boolean }): string[] {
  if (!trace.plan) {
    return [];
  }
  return [
    `PLAN ${trace.plan}`,
    `X USED ${trace.xUsed ? "YES" : "NO"}`,
    `COMBINED ${trace.combined ? "YES" : "NO"}`,
  ];
}

import {
  AGENCY_B_CAUSE,
  simulateAgencyAttempt,
} from "./WorldStateAgency";
import {
  DELAY_CONTACT,
  DELAY_DT_MS,
  DELAY_MS,
  acknowledgeCause,
  advanceDelay,
  createDelaySession,
  delayHasNoExpiry,
  delayHasNoMovementMechanic,
  recontactWhilePending,
  resetDelaySession,
  restoreDelayImmediately,
  stepDelay,
  type DelaySession,
} from "./WorldStateDelay";
import {
  WORLD_STATE_DT,
  WORLD_STATE_PROBE_BOUNDS,
  WORLD_STATE_RADIUS,
  WORLD_STATE_TRAVERSAL,
  createWorldStateProbe,
  resolveOrdinaryContact,
  simulateWorldStateAttempt,
  type Aabb,
} from "./WorldStateProbe";
import { MODEL_B_ACTIVATOR_BOUNDS } from "./WorldStateAgency";

export type PrepScenarioId = "A" | "B" | "C" | "D";
export type PrepPolicy = "PREPARE" | "WAIT" | "PARTIAL";
export type PrepReadiness = "READY AT SETTLE" | "NEARLY READY" | "NOT READY";

export const PREP_DELAY_MS = DELAY_MS;
export const PREP_VX = WORLD_STATE_TRAVERSAL.vx;
export const PREP_WAIT = { x: DELAY_CONTACT.x, y: DELAY_CONTACT.y };
export const PREP_STAGING = {
  x: WORLD_STATE_TRAVERSAL.startX,
  y: WORLD_STATE_TRAVERSAL.startY,
};

export const PREP_WAIT_BOUNDS: Aabb = {
  left: 80,
  right: 140,
  top: 400,
  bottom: 516,
};

export const PREP_STAGING_BOUNDS: Aabb = {
  left: PREP_STAGING.x - WORLD_STATE_RADIUS,
  right: WORLD_STATE_PROBE_BOUNDS.left,
  top: 434,
  bottom: 498,
};

export const PREP_CORRIDOR_BOUNDS: Aabb = {
  left: PREP_WAIT_BOUNDS.right,
  right: PREP_STAGING_BOUNDS.left,
  top: 434,
  bottom: 498,
};

export const PREP_PARTIAL_WAIT_FRAMES = 26;

export type PrepTrace = {
  scenario: PrepScenarioId;
  policy: PrepPolicy;
  session: DelaySession;
  t0Ms: number;
  settleMs: number;
  settleX: number;
  settleY: number;
  stagingDistanceAtSettle: number;
  readiness: PrepReadiness;
  yReadyAtSettle: boolean;
  yImmediate: boolean;
  extraFramesToStaging: number;
  extraDistanceToStaging: number;
  persistY: boolean;
  steps: string[];
};

export function pointIn(x: number, y: number, box: Aabb): boolean {
  return x >= box.left && x <= box.right && y >= box.top && y <= box.bottom;
}

export function stagingDistance(x: number, y: number): number {
  const dx = x - PREP_STAGING.x;
  const dy = y - PREP_STAGING.y;
  return Math.hypot(dx, dy);
}

export function prepReadiness(x: number, y: number): PrepReadiness {
  if (pointIn(x, y, PREP_STAGING_BOUNDS)) {
    return "READY AT SETTLE";
  }
  if (pointIn(x, y, PREP_CORRIDOR_BOUNDS)) {
    return "NEARLY READY";
  }
  return "NOT READY";
}

export function extraTravelToStaging(x: number): { frames: number; distance: number } {
  const distance = Math.max(0, PREP_STAGING.x - x);
  const frames = distance === 0 ? 0 : Math.ceil(distance / (PREP_VX * WORLD_STATE_DT));
  return { frames, distance };
}

export function attemptYFrom(
  x: number,
  y: number,
  session: DelaySession,
) {
  return simulateWorldStateAttempt({
    scenario: "B",
    probe: session.probe,
    startX: x,
    startY: y,
    vx: WORLD_STATE_TRAVERSAL.vx,
    vy: WORLD_STATE_TRAVERSAL.vy,
    frames: WORLD_STATE_TRAVERSAL.frames,
  });
}

function resolveStep(
  session: DelaySession,
  x: number,
  y: number,
  vx: number,
  vy: number,
  radius = WORLD_STATE_RADIUS,
) {
  const probeHit = resolveOrdinaryContact({
    x,
    y,
    vx,
    vy,
    radius,
    probe: session.probe,
  });
  const activatorHit = resolveOrdinaryContact({
    x: probeHit.x,
    y: probeHit.y,
    vx: probeHit.vx,
    vy: probeHit.vy,
    radius,
    probe: createWorldStateProbe("SOLID", MODEL_B_ACTIVATOR_BOUNDS),
  });
  const next = stepDelay(session, activatorHit.x, activatorHit.y, DELAY_DT_MS, radius);
  return { session: next, x: activatorHit.x, y: activatorHit.y, vx: activatorHit.vx, vy: activatorHit.vy };
}

function desiredVx(policy: PrepPolicy, frame: number, x: number): number {
  const moving = x < PREP_STAGING.x;
  if (policy === "WAIT") {
    return 0;
  }
  if (policy === "PARTIAL" && frame < PREP_PARTIAL_WAIT_FRAMES) {
    return 0;
  }
  return moving ? PREP_VX : 0;
}

export function simulatePrep(policy: PrepPolicy, extraFramesAfterSettle = 0): PrepTrace {
  let session = acknowledgeCause();
  const t0Ms = session.elapsedMs;
  let x = PREP_WAIT.x;
  let y = PREP_WAIT.y;
  let vx = 0;
  let vy = 0;
  let settleX = x;
  let settleY = y;
  let settleMs = session.elapsedMs;
  let settled = false;

  for (let i = 0; i < 90; i += 1) {
    vx = settled ? 0 : desiredVx(policy, i, x);
    const stepped = resolveStep(session, x + vx * WORLD_STATE_DT, y + vy * WORLD_STATE_DT, vx, vy);
    session = stepped.session;
    x = stepped.x;
    y = stepped.y;
    vx = stepped.vx;
    vy = stepped.vy;
    if (!settled && session.phase === "SETTLED") {
      settled = true;
      settleX = x;
      settleY = y;
      settleMs = session.elapsedMs;
      if (extraFramesAfterSettle <= 0) {
        break;
      }
    } else if (settled) {
      extraFramesAfterSettle -= 1;
      if (extraFramesAfterSettle <= 0) {
        break;
      }
    }
  }

  const readiness = prepReadiness(settleX, settleY);
  const yAttempt = attemptYFrom(settleX, settleY, session);
  const travel = extraTravelToStaging(settleX);
  const persist = advanceDelay(session, 60, settleX, settleY);
  const persistY = attemptYFrom(settleX, settleY, persist).traversed;
  return {
    scenario: policy === "PREPARE" ? "A" : policy === "WAIT" ? "B" : "C",
    policy,
    session,
    t0Ms,
    settleMs,
    settleX,
    settleY,
    stagingDistanceAtSettle: stagingDistance(settleX, settleY),
    readiness,
    yReadyAtSettle: readiness === "READY AT SETTLE" && session.probe.state === "PASSABLE",
    yImmediate: yAttempt.traversed,
    extraFramesToStaging: travel.frames,
    extraDistanceToStaging: travel.distance,
    persistY,
    steps: [
      `t0 ACK elapsed=${t0Ms.toFixed(1)}ms`,
      `settle ${settleMs.toFixed(1)}ms at ${settleX.toFixed(1)},${settleY.toFixed(1)} ${readiness}`,
      `Y immediate=${yAttempt.traversed} extra ${travel.frames}f / ${travel.distance.toFixed(1)}px`,
    ],
  };
}

export function runPrepA(): PrepTrace {
  return simulatePrep("PREPARE");
}

export function runPrepB(): PrepTrace {
  return simulatePrep("WAIT");
}

export function runPrepC(): PrepTrace {
  return simulatePrep("PARTIAL");
}

export function runPrepD(): { first: PrepTrace; second: PrepTrace } {
  const first = simulatePrep("PREPARE");
  const reset = resetDelaySession(first.session, PREP_WAIT.x, PREP_WAIT.y);
  const restored = restoreDelayImmediately(reset, PREP_WAIT.x, PREP_WAIT.y);
  const second = simulatePrep("PREPARE");
  return {
    first: {
      ...first,
      session: restored.phase === "IDLE" ? first.session : first.session,
      scenario: "D",
      steps: [...first.steps, `reset phase=${reset.phase} state=${reset.probe.state}`],
    },
    second: { ...second, scenario: "D" },
  };
}

export function prepTargetReachableDuringPending(): boolean {
  const travel = extraTravelToStaging(PREP_WAIT.x);
  return travel.frames * DELAY_DT_MS < PREP_DELAY_MS;
}

export function immediateWriteHasNoPendingInterval(): boolean {
  const cause = simulateAgencyAttempt({
    model: "B",
    scenario: "CAUSE",
    ...AGENCY_B_CAUSE,
  });
  return cause.stateAfter === "PASSABLE" && cause.transitions === 1;
}

export function pendingCreatesPreparationInterval(): boolean {
  return immediateWriteHasNoPendingInterval() && prepTargetReachableDuringPending();
}

export function solidRoleDuringPrep(): "BLOCKS PREMATURE Y" | "IRRELEVANT" | "HELPS PREP" {
  const pending = advanceDelay(acknowledgeCause(), 21);
  const blocked = attemptYFrom(PREP_STAGING.x, PREP_STAGING.y, pending);
  if (pending.probe.state === "SOLID" && !blocked.traversed) {
    return "BLOCKS PREMATURE Y";
  }
  return "IRRELEVANT";
}

export function prepHudLines(input: {
  x: number;
  y: number;
  session: DelaySession;
}): string[] {
  const ready = prepReadiness(input.x, input.y);
  return [
    `PREP TARGET ${PREP_STAGING.x},${PREP_STAGING.y}`,
    `PREP ${ready}`,
    input.session.phase === "SETTLED" ? "SETTLE EVENT" : "",
  ].filter(Boolean);
}

export function prepHasNoNewMechanic(session: DelaySession): boolean {
  return delayHasNoMovementMechanic(session)
    && delayHasNoExpiry(session)
    && PREP_VX === WORLD_STATE_TRAVERSAL.vx
    && PREP_DELAY_MS === DELAY_MS;
}

export function formatPrepTable(rows: PrepTrace[] = [runPrepA(), runPrepB(), runPrepC()]): string {
  const header = "Scenario | Settle ms | x,y | Dist staging | Ready | Y now | Extra f";
  const lines = rows.map((row) => [
    row.policy,
    row.settleMs.toFixed(1),
    `${row.settleX.toFixed(1)},${row.settleY.toFixed(1)}`,
    row.stagingDistanceAtSettle.toFixed(1),
    row.readiness,
    row.yImmediate ? "YES" : "NO",
    String(row.extraFramesToStaging),
  ].join(" | "));
  return [header, ...lines].join("\n");
}

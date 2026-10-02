import {
  AGENCY_B_CAUSE,
  MODEL_B_ACTIVATOR_BOUNDS,
  causeTouches,
} from "./WorldStateAgency";
import {
  WORLD_STATE_DT,
  WORLD_STATE_PROBE_BOUNDS,
  WORLD_STATE_RADIUS,
  WORLD_STATE_SUPPORT,
  WORLD_STATE_TRAVERSAL,
  createWorldStateProbe,
  playerAabb,
  probeCollides,
  resetWorldState,
  resolveOrdinaryContact,
  setWorldState,
  simulateWorldStateAttempt,
  type BinaryWorldState,
  type WorldStateProbeModel,
} from "./WorldStateProbe";

export type TemporalPhase = "IDLE" | "PENDING" | "SETTLED";
export type ProgressBand = "NONE" | "EARLY" | "MID" | "LATE" | "COMPLETE";
export type DelayScenarioId = "A" | "B" | "C" | "D" | "E";

/**
 * Diagnostic delay only. Not a production Timed Gate, not a room-tuned band.
 * 720ms is long enough to read PENDING and finish one known W3 action
 * (support or traversal pose = 36 frames / 600ms), short enough that
 * cause and completion stay connected, and not a reaction window.
 */
export const DELAY_MS = 720;
export const DELAY_DT_MS = WORLD_STATE_DT * 1000;
export const DELAY_REASON =
  "W4-EXP-000 diagnostic delay only. Immediate restore after SETTLED is recovery, not a second temporal contract.";

export const DELAY_CONTACT = { x: 108, y: 450 };
export const DELAY_AWAY = { x: 220, y: 160 };

export type DelaySession = {
  probe: WorldStateProbeModel;
  phase: TemporalPhase;
  progress: number;
  elapsedMs: number;
  delayMs: number;
  causeOverlapping: boolean;
  contactFrames: number;
  risingEdges: number;
  causeAcknowledged: boolean;
  causeAckCount: number;
  ignoredReactivations: number;
  queuedEvents: number;
  completions: number;
  restores: number;
  refused: number;
  futureState: BinaryWorldState | null;
  lastHud: string;
};

export function progressBand(progress: number): ProgressBand {
  if (progress <= 0) {
    return "NONE";
  }
  if (progress >= 1) {
    return "COMPLETE";
  }
  if (progress < 1 / 3) {
    return "EARLY";
  }
  if (progress < 2 / 3) {
    return "MID";
  }
  return "LATE";
}

export function createDelaySession(
  state: BinaryWorldState = "SOLID",
): DelaySession {
  return {
    probe: createWorldStateProbe(state),
    phase: "IDLE",
    progress: 0,
    elapsedMs: 0,
    delayMs: DELAY_MS,
    causeOverlapping: false,
    contactFrames: 0,
    risingEdges: 0,
    causeAcknowledged: false,
    causeAckCount: 0,
    ignoredReactivations: 0,
    queuedEvents: 0,
    completions: 0,
    restores: 0,
    refused: 0,
    futureState: null,
    lastHud: "",
  };
}

export function resetDelaySession(
  session: DelaySession,
  occupantX: number,
  occupantY: number,
  radius = WORLD_STATE_RADIUS,
): DelaySession {
  const occupant = playerAabb(occupantX, occupantY, radius);
  const overlapping = occupant.left < session.probe.bounds.right
    && occupant.right > session.probe.bounds.left
    && occupant.top < session.probe.bounds.bottom
    && occupant.bottom > session.probe.bounds.top;
  const next = createDelaySession(overlapping ? "PASSABLE" : "SOLID");
  next.probe = resetWorldState(next.probe, overlapping ? "PASSABLE" : "SOLID");
  next.causeOverlapping = causeTouches(occupant, MODEL_B_ACTIVATOR_BOUNDS);
  next.contactFrames = next.causeOverlapping ? 1 : 0;
  return next;
}

export function restoreDelayImmediately(
  session: DelaySession,
  occupantX: number,
  occupantY: number,
  radius = WORLD_STATE_RADIUS,
): DelaySession {
  const occupant = playerAabb(occupantX, occupantY, radius);
  const probe = setWorldState(session.probe, "SOLID", occupant);
  const next: DelaySession = {
    ...session,
    probe,
    lastHud: "",
  };
  if (probe.lastReason === "REFUSED_OVERLAP") {
    next.refused = session.refused + 1;
    next.lastHud = "RESTORE REFUSED OVERLAP";
    return next;
  }
  next.phase = "IDLE";
  next.progress = 0;
  next.elapsedMs = 0;
  next.causeAcknowledged = false;
  next.futureState = null;
  next.restores = session.restores + 1;
  next.lastHud = "DIAGNOSTIC RESTORE SOLID";
  return next;
}

function clampDt(dtMs: number): number {
  return Math.max(0, Math.min(dtMs, 50));
}

export function stepDelay(
  session: DelaySession,
  playerX: number,
  playerY: number,
  dtMs: number,
  radius = WORLD_STATE_RADIUS,
): DelaySession {
  const occupant = playerAabb(playerX, playerY, radius);
  const overlapping = causeTouches(occupant, MODEL_B_ACTIVATOR_BOUNDS);
  const rising = overlapping && !session.causeOverlapping;
  const dt = clampDt(dtMs);
  const next: DelaySession = {
    ...session,
    probe: { ...session.probe },
    causeOverlapping: overlapping,
    contactFrames: overlapping ? (session.causeOverlapping ? session.contactFrames + 1 : 1) : 0,
    queuedEvents: 0,
  };

  if (rising) {
    next.risingEdges = session.risingEdges + 1;
    if (session.phase === "PENDING") {
      next.ignoredReactivations = session.ignoredReactivations + 1;
      next.lastHud = "IGNORED REACTIVATION";
    } else if (session.phase === "IDLE") {
      next.causeAcknowledged = true;
      next.causeAckCount = session.causeAckCount + 1;
      next.phase = "PENDING";
      next.elapsedMs = 0;
      next.progress = 0;
      next.futureState = "PASSABLE";
      next.lastHud = "CAUSE ACK";
    } else if (session.phase === "SETTLED") {
      return restoreDelayImmediately(
        { ...next, causeOverlapping: overlapping, risingEdges: next.risingEdges },
        playerX,
        playerY,
        radius,
      );
    }
  }

  if (next.phase !== "PENDING") {
    return next;
  }

  next.elapsedMs = next.elapsedMs + dt;
  const raw = next.elapsedMs / next.delayMs;
  next.progress = raw >= 1 ? 1 : raw < session.progress ? session.progress : raw;

  if (next.progress < 1) {
    return next;
  }

  next.probe = setWorldState(session.probe, "PASSABLE", occupant);
  next.phase = "SETTLED";
  next.progress = 1;
  next.elapsedMs = next.delayMs;
  next.futureState = null;
  next.completions = session.completions + 1;
  next.lastHud = next.lastHud === "IGNORED REACTIVATION"
    ? "IGNORED REACTIVATION · SETTLED PASSABLE"
    : "SETTLED PASSABLE";
  return next;
}

export function acknowledgeCause(session: DelaySession = createDelaySession()): DelaySession {
  const idle = stepDelay(session, DELAY_AWAY.x, DELAY_AWAY.y, DELAY_DT_MS);
  return stepDelay(idle, DELAY_CONTACT.x, DELAY_CONTACT.y, DELAY_DT_MS);
}

export function advanceDelay(
  session: DelaySession,
  frames: number,
  x = DELAY_AWAY.x,
  y = DELAY_AWAY.y,
  dtMs = DELAY_DT_MS,
): DelaySession {
  let next = session;
  for (let i = 0; i < frames; i += 1) {
    next = stepDelay(next, x, y, dtMs);
  }
  return next;
}

export function seekDelayProgress(session: DelaySession, progress: number): DelaySession {
  if (session.phase !== "PENDING") {
    return session;
  }
  const target = Math.min(1, Math.max(session.progress, progress));
  const next: DelaySession = {
    ...session,
    probe: { ...session.probe },
    elapsedMs: target * session.delayMs,
    progress: target,
    queuedEvents: 0,
  };
  if (target < 1) {
    return next;
  }
  next.probe = setWorldState(session.probe, "PASSABLE", null);
  next.phase = "SETTLED";
  next.progress = 1;
  next.elapsedMs = session.delayMs;
  next.futureState = null;
  next.completions = session.completions + 1;
  next.lastHud = "SETTLED PASSABLE";
  return next;
}

export function recontactWhilePending(session: DelaySession): DelaySession {
  const left = stepDelay(session, DELAY_AWAY.x, DELAY_AWAY.y, DELAY_DT_MS);
  return stepDelay(left, DELAY_CONTACT.x, DELAY_CONTACT.y, DELAY_DT_MS);
}

export type DelayPhysicalRow = {
  phase: TemporalPhase | "PENDING early" | "PENDING mid" | "PENDING late";
  progress: number;
  band: ProgressBand;
  physicalState: BinaryWorldState;
  xSupport: boolean;
  yTraversal: boolean;
  supportY: number;
  traversalX: number;
  notes: string;
};

export function physicalAt(probe: WorldStateProbeModel): {
  xSupport: boolean;
  yTraversal: boolean;
  supportY: number;
  traversalX: number;
} {
  const support = simulateWorldStateAttempt({
    scenario: "A",
    probe,
    ...WORLD_STATE_SUPPORT,
  });
  const traversal = simulateWorldStateAttempt({
    scenario: "B",
    probe,
    ...WORLD_STATE_TRAVERSAL,
  });
  return {
    xSupport: support.supported && support.finalY <= WORLD_STATE_PROBE_BOUNDS.top,
    yTraversal: traversal.traversed && traversal.finalX > WORLD_STATE_PROBE_BOUNDS.right,
    supportY: support.finalY,
    traversalX: traversal.finalX,
  };
}

export function measureDelayTable(): DelayPhysicalRow[] {
  const idle = createDelaySession();
  const early = acknowledgeCause();
  const mid = advanceDelay(acknowledgeCause(), 21);
  const late = advanceDelay(acknowledgeCause(), 42);
  const settled = advanceDelay(acknowledgeCause(), 44);
  const persist = advanceDelay(settled, 120);
  return [
    row("IDLE", idle, "baseline SOLID / no schedule"),
    row("PENDING early", early, "CAUSE ACK, progress begins, still SOLID"),
    row("PENDING mid", mid, `mid band ${progressBand(mid.progress)}, still SOLID`),
    row("PENDING late", late, "late pending, still SOLID, SUPPORT yes, TRAVERSAL no"),
    row("SETTLED", settled, "PASSABLE write, SUPPORT gone, TRAVERSAL open"),
    row("SETTLED", persist, "persists — no expiry / cycle / auto-revert"),
    {
      ...row("IDLE", restoreDelayImmediately(persist, DELAY_AWAY.x, DELAY_AWAY.y), "immediate diagnostic restore"),
      notes: "immediate diagnostic restore, not a second delay",
    },
  ];
}

function row(
  phase: DelayPhysicalRow["phase"],
  session: DelaySession,
  notes: string,
): DelayPhysicalRow {
  const phys = physicalAt(session.probe);
  return {
    phase,
    progress: session.progress,
    band: progressBand(session.progress),
    physicalState: session.probe.state,
    xSupport: phys.xSupport,
    yTraversal: phys.yTraversal,
    supportY: phys.supportY,
    traversalX: phys.traversalX,
    notes,
  };
}

export function formatDelayTable(rows: DelayPhysicalRow[] = measureDelayTable()): string {
  const header = "Phase | Progress | Physical state | X support | Y traversal | Notes";
  const lines = rows.map((entry) => [
    entry.phase,
    entry.progress >= 1 ? "complete" : entry.progress.toFixed(3),
    entry.physicalState,
    entry.xSupport ? "YES" : "NO",
    entry.yTraversal ? "YES" : "NO",
    entry.notes,
  ].join(" | "));
  return [header, ...lines].join("\n");
}

export type DelayScenarioTrace = {
  scenario: DelayScenarioId;
  session: DelaySession;
  phys: ReturnType<typeof physicalAt>;
  steps: string[];
};

export function runScenarioA(): DelayScenarioTrace {
  const session = acknowledgeCause();
  const phys = physicalAt(session.probe);
  return {
    scenario: "A",
    session,
    phys,
    steps: [
      "Initial: SOLID / IDLE",
      `Fresh activator contact. ACK=${session.causeAcknowledged} phase=${session.phase} state=${session.probe.state} progress=${session.progress.toFixed(3)}`,
    ],
  };
}

export function runScenarioB(): DelayScenarioTrace {
  const session = advanceDelay(acknowledgeCause(), 21);
  const phys = physicalAt(session.probe);
  return {
    scenario: "B",
    session,
    phys,
    steps: [
      `Mid-pending elapsed=${session.elapsedMs.toFixed(1)}ms progress=${session.progress.toFixed(3)} band=${progressBand(session.progress)}`,
      `state=${session.probe.state} support=${phys.xSupport} traversal=${phys.yTraversal}`,
    ],
  };
}

export function runScenarioC(): DelayScenarioTrace {
  const session = advanceDelay(acknowledgeCause(), 44);
  const later = advanceDelay(session, 120);
  const phys = physicalAt(later.probe);
  return {
    scenario: "C",
    session: later,
    phys,
    steps: [
      `Completion: phase=${session.phase} state=${session.probe.state} completions=${session.completions}`,
      `Persist 120f: phase=${later.phase} state=${later.probe.state} completions=${later.completions}`,
    ],
  };
}

export function runScenarioD(): DelayScenarioTrace {
  const pending = advanceDelay(acknowledgeCause(), 12);
  const before = pending.progress;
  const again = recontactWhilePending(pending);
  const phys = physicalAt(again.probe);
  return {
    scenario: "D",
    session: again,
    phys,
    steps: [
      `Pending progress before recontact=${before.toFixed(3)}`,
      `ignored=${again.ignoredReactivations} queued=${again.queuedEvents} progress=${again.progress.toFixed(3)} restarted=${again.progress < before}`,
    ],
  };
}

export function runScenarioE(): DelayScenarioTrace {
  const settled = advanceDelay(acknowledgeCause(), 44);
  const restored = restoreDelayImmediately(settled, DELAY_AWAY.x, DELAY_AWAY.y);
  const phys = physicalAt(restored.probe);
  return {
    scenario: "E",
    session: restored,
    phys,
    steps: [
      `After SETTLED restore: phase=${restored.phase} state=${restored.probe.state} progress=${restored.progress}`,
      `X support=${phys.xSupport} Y traversal=${phys.yTraversal}`,
    ],
  };
}

export function delayHudLines(session: DelaySession): string[] {
  return [
    `W4 PHASE ${session.phase}`,
    `CURRENT ${session.probe.state}`,
    `FUTURE ${session.futureState ?? "—"}`,
    `PROGRESS ${Math.round(session.progress * 100)}% ${progressBand(session.progress)}`,
    session.causeAcknowledged && session.phase === "PENDING" ? "CAUSE ACK" : "",
    session.ignoredReactivations > 0 ? `IGNORED REACTIVATION ${session.ignoredReactivations}` : "",
  ].filter(Boolean);
}

export function delayUsesExistingActivator(): boolean {
  return MODEL_B_ACTIVATOR_BOUNDS.right < WORLD_STATE_PROBE_BOUNDS.left - WORLD_STATE_RADIUS * 2;
}

export function delayHasNoExpiry(session: DelaySession): boolean {
  return !("expiryMs" in session)
    && !("cycle" in session)
    && !("countdown" in session)
    && !("counter" in session)
    && session.queuedEvents === 0;
}

export function delayHasNoMovementMechanic(session: DelaySession): boolean {
  return !("bounceType" in session)
    && !("interact" in session)
    && !("wallJump" in session)
    && !("airReverse" in session);
}

export function delayCollidesLikeWorldState(session: DelaySession): boolean {
  return probeCollides(session.probe) === (session.probe.state === "SOLID");
}

export function simulateDelayFlight(options: {
  startX: number;
  startY: number;
  vx: number;
  vy: number;
  frames: number;
  session?: DelaySession;
  radius?: number;
  dt?: number;
}): { session: DelaySession; finalX: number; finalY: number } {
  const radius = options.radius ?? WORLD_STATE_RADIUS;
  const dt = options.dt ?? WORLD_STATE_DT;
  let x = options.startX;
  let y = options.startY;
  let vx = options.vx;
  let vy = options.vy;
  let session = options.session ?? createDelaySession();

  for (let i = 0; i < options.frames; i += 1) {
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
    const activatorHit = resolveOrdinaryContact({
      x,
      y,
      vx,
      vy,
      radius,
      probe: createWorldStateProbe("SOLID", MODEL_B_ACTIVATOR_BOUNDS),
    });
    x = activatorHit.x;
    y = activatorHit.y;
    vx = activatorHit.vx;
    vy = activatorHit.vy;
    session = stepDelay(session, x, y, dt * 1000, radius);
  }

  return { session, finalX: x, finalY: y };
}

export function delayCauseFlight() {
  return simulateDelayFlight({
    ...AGENCY_B_CAUSE,
  });
}

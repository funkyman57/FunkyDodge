import {
  resolveFloorBounce,
  resolveTakeoffDirection,
  resolveTakeoffVelocity,
  stepHorizontalVelocity,
  type BounceInput,
} from "../physics/BounceController";
import { PhysicsConfig } from "../physics/PhysicsConfig";

export const CARRIED_MOTION_DT = 1 / 60;
export const CARRIED_MOTION_INCOMING = [120, 240, 360, -120, -240, -360] as const;

export type CarriedMotionClassification = "PASS" | "PARTIAL" | "FAIL";
export type HistoryShape = "HISTORY_PRESERVED" | "PARTIAL_NORMALIZATION" | "HISTORY_ERASED" | "OTHER";

export type CarriedMotionRow = {
  incomingVx: number;
  vxAfterSameTickControl: number;
  postBounceVx: number;
  vxAt100ms: number;
  vxAt250ms: number;
  dxAt250ms: number;
  bounceType: "NORMAL" | "LOW" | "BOOST";
  intent: "FRESH_PRESS" | "HOLD" | "NONE";
  input: "NONE";
  takeoffDirection: -1 | 0 | 1;
  takeoffMinApplied: boolean;
  clampApplied: boolean;
  notes: string[];
};

function neutralInput(): BounceInput {
  return {
    leftDown: false,
    rightDown: false,
    leftPressedAt: null,
    rightPressedAt: null,
    leftReleasedAt: null,
    rightReleasedAt: null,
    lastHorizontalDirection: 0,
  };
}

function stepNeutral(vx: number, grounded: boolean, dt: number): { vx: number; clampApplied: boolean } {
  const before = vx;
  const stepped = stepHorizontalVelocity({
    vx,
    grounded,
    leftDown: false,
    rightDown: false,
    pressDirection: 0,
    dt,
  });
  const clamped = Math.abs(before) > PhysicsConfig.maxHorizontalSpeed
    && Math.abs(stepped.vx) === PhysicsConfig.maxHorizontalSpeed;
  return { vx: stepped.vx, clampApplied: clamped };
}

export function probeCarriedMotionRow(
  incomingVx: number,
  dt: number = CARRIED_MOTION_DT,
): CarriedMotionRow {
  const nowMs = 1000;
  const input = neutralInput();
  const bounce = resolveFloorBounce(input, nowMs);
  const takeoffDirection = resolveTakeoffDirection(input, nowMs, bounce.intent);
  const notes: string[] = [];

  const sameTick = stepNeutral(incomingVx, true, dt);
  let vx = sameTick.vx;
  let takeoffMinApplied = false;
  let clampApplied = sameTick.clampApplied;

  if (takeoffDirection !== 0) {
    const beforeTakeoff = vx;
    vx = resolveTakeoffVelocity(vx, takeoffDirection, bounce.type);
    takeoffMinApplied = Math.abs(vx) !== Math.abs(beforeTakeoff);
    notes.push(`takeoffMin wrote vx ${beforeTakeoff.toFixed(2)} → ${vx.toFixed(2)}`);
  } else {
    notes.push("NORMAL + neutral: bounce does not write vx");
  }

  if (sameTick.vx !== incomingVx) {
    notes.push(
      `same-tick controller drag (grounded, before bounce) ${incomingVx.toFixed(2)} → ${sameTick.vx.toFixed(2)}`,
    );
  }

  const postBounceVx = vx;
  let x = 0;
  let elapsed = 0;
  let vxAt100ms = postBounceVx;
  let captured100 = false;
  const t100 = 0.1;
  const t250 = 0.25;

  while (elapsed + 1e-9 < t250) {
    const next = stepNeutral(vx, false, dt);
    vx = next.vx;
    clampApplied = clampApplied || next.clampApplied;
    x += vx * dt;
    elapsed += dt;
    if (!captured100 && elapsed + 1e-9 >= t100) {
      vxAt100ms = vx;
      captured100 = true;
    }
  }

  notes.push(`neutral air drag ${PhysicsConfig.horizontalDrag}/s toward 0`);
  if (takeoffDirection === 0 && !takeoffMinApplied) {
    notes.push("takeoffMin not applied");
  }

  return {
    incomingVx,
    vxAfterSameTickControl: sameTick.vx,
    postBounceVx,
    vxAt100ms,
    vxAt250ms: vx,
    dxAt250ms: x,
    bounceType: bounce.type,
    intent: bounce.intent,
    input: "NONE",
    takeoffDirection,
    takeoffMinApplied,
    clampApplied,
    notes,
  };
}

export function probeCarriedMotionTable(
  incoming: readonly number[] = CARRIED_MOTION_INCOMING,
  dt: number = CARRIED_MOTION_DT,
): CarriedMotionRow[] {
  return incoming.map((vx) => probeCarriedMotionRow(vx, dt));
}

export function formatCarriedMotionTable(rows: CarriedMotionRow[]): string {
  const header = "Incoming vx | Post-bounce vx | vx @ +100ms | vx @ +250ms | dx @ +250ms | Notes";
  const lines = rows.map((row) =>
    [
      row.incomingVx.toFixed(0),
      row.postBounceVx.toFixed(2),
      row.vxAt100ms.toFixed(2),
      row.vxAt250ms.toFixed(2),
      row.dxAt250ms.toFixed(2),
      row.notes.join("; "),
    ].join(" | "),
  );
  return [header, ...lines].join("\n");
}

export type InputDirection = -1 | 0 | 1;

export type InputPhase = {
  direction: InputDirection;
  frames: number;
};

export type HorizontalHistoryResult = {
  label: string;
  phases: InputPhase[];
  durationMs: number;
  startVx: number;
  vx: number;
  dx: number;
  reversed: boolean;
  saturated: boolean;
  grounded: boolean;
};

export type MotionBand = "LOW_CARRY" | "MEDIUM_CARRY" | "HIGH_CARRY" | "OUTSIDE";
export type Generosity = "GENEROUS" | "TIGHT" | "IMPLAUSIBLY_PRECISE";

export type PlayerContrastClassification = "PASS" | "PARTIAL" | "FAIL";

export function simulateHorizontalHistory(options: {
  label: string;
  phases: InputPhase[];
  startVx?: number;
  grounded?: boolean;
  dt?: number;
}): HorizontalHistoryResult {
  const dt = options.dt ?? CARRIED_MOTION_DT;
  const grounded = options.grounded ?? false;
  let vx = options.startVx ?? 0;
  let dx = 0;
  let frames = 0;
  let reversed = false;
  const startSign = Math.sign(vx);

  for (const phase of options.phases) {
    for (let i = 0; i < phase.frames; i += 1) {
      const pressDirection = i === 0 && phase.direction !== 0 ? phase.direction : 0;
      const leftDown = phase.direction === -1;
      const rightDown = phase.direction === 1;
      const stepped = stepHorizontalVelocity({
        vx,
        grounded,
        leftDown,
        rightDown,
        pressDirection,
        dt,
      });
      vx = stepped.vx;
      dx += vx * dt;
      frames += 1;
      if (startSign !== 0 && Math.sign(vx) !== 0 && Math.sign(vx) !== startSign) {
        reversed = true;
      }
      if (startSign === 0 && options.startVx === 0 && vx < 0 && phase.direction === 1) {
        reversed = true;
      }
    }
  }

  return {
    label: options.label,
    phases: options.phases,
    durationMs: frames * dt * 1000,
    startVx: options.startVx ?? 0,
    vx,
    dx,
    reversed,
    saturated: Math.abs(vx) >= PhysicsConfig.maxHorizontalSpeed - 0.5,
    grounded,
  };
}

export function holdRight(frames: number, label?: string, startVx = 0): HorizontalHistoryResult {
  return simulateHorizontalHistory({
    label: label ?? `right ${frames}f`,
    phases: [{ direction: 1, frames }],
    startVx,
    grounded: false,
  });
}

export function creationSweep(maxFrames = 36): HorizontalHistoryResult[] {
  return Array.from({ length: maxFrames }, (_, i) => holdRight(i + 1, `right ${i + 1}f`));
}

export function reduceNeutral(startVx: number, frames: number): HorizontalHistoryResult {
  return simulateHorizontalHistory({
    label: `from ${startVx} neutral ${frames}f`,
    phases: [{ direction: 0, frames }],
    startVx,
    grounded: false,
  });
}

export function reduceOpposite(startVx: number, frames: number): HorizontalHistoryResult {
  return simulateHorizontalHistory({
    label: `from ${startVx} opposite ${frames}f`,
    phases: [{ direction: startVx >= 0 ? -1 : 1, frames }],
    startVx,
    grounded: false,
  });
}

export function classifyMotionBand(vx: number): MotionBand {
  const speed = Math.abs(vx);
  if (speed >= 80 && speed < 180) {
    return "LOW_CARRY";
  }
  if (speed >= 180 && speed < 320) {
    return "MEDIUM_CARRY";
  }
  if (speed >= 320) {
    return "HIGH_CARRY";
  }
  return "OUTSIDE";
}

export function generosityForBand(band: MotionBand, sweep: HorizontalHistoryResult[]): {
  band: MotionBand;
  frames: number[];
  durationMs: [number, number] | null;
  generosity: Generosity;
} {
  const frames = sweep
    .map((row, index) => ({ row, frame: index + 1 }))
    .filter(({ row }) => classifyMotionBand(row.vx) === band)
    .map(({ frame }) => frame);

  if (frames.length === 0) {
    return { band, frames, durationMs: null, generosity: "IMPLAUSIBLY_PRECISE" };
  }

  const span = frames[frames.length - 1] - frames[0] + 1;
  const durationMs: [number, number] = [
    frames[0] * CARRIED_MOTION_DT * 1000,
    frames[frames.length - 1] * CARRIED_MOTION_DT * 1000,
  ];
  if (span >= 6) {
    return { band, frames, durationMs, generosity: "GENEROUS" };
  }
  if (span >= 3) {
    return { band, frames, durationMs, generosity: "TIGHT" };
  }
  return { band, frames, durationMs, generosity: "IMPLAUSIBLY_PRECISE" };
}

export type SameArrivalPair = {
  a: HorizontalHistoryResult;
  b: HorizontalHistoryResult;
  dxGap: number;
  vxGap: number;
};

export function findSameArrivalPair(
  airtimeFrames = 50,
): SameArrivalPair | null {
  const candidates: HorizontalHistoryResult[] = [];

  for (let hold = 1; hold <= airtimeFrames; hold += 1) {
    candidates.push(simulateHorizontalHistory({
      label: `right ${hold}f then coast ${airtimeFrames - hold}f`,
      phases: [
        { direction: 1, frames: hold },
        { direction: 0, frames: airtimeFrames - hold },
      ],
    }));
    candidates.push(simulateHorizontalHistory({
      label: `coast ${airtimeFrames - hold}f then right ${hold}f`,
      phases: [
        { direction: 0, frames: airtimeFrames - hold },
        { direction: 1, frames: hold },
      ],
    }));
  }

  let best: SameArrivalPair | null = null;
  for (let i = 0; i < candidates.length; i += 1) {
    for (let j = i + 1; j < candidates.length; j += 1) {
      const a = candidates[i];
      const b = candidates[j];
      if (Math.abs(a.vx) < 80 || Math.abs(b.vx) < 80) {
        continue;
      }
      const dxGap = Math.abs(a.dx - b.dx);
      const vxGap = Math.abs(a.vx - b.vx);
      if (dxGap > 40 || vxGap < 80) {
        continue;
      }
      if (!best || dxGap < best.dxGap || (dxGap === best.dxGap && vxGap > best.vxGap)) {
        best = { a, b, dxGap, vxGap };
      }
    }
  }
  return best;
}

export type FullChainRow = {
  history: string;
  createdVx: number;
  preContactVx: number;
  postBounceVx: number;
  vxAt100ms: number;
  vxAt250ms: number;
  dxAt250ms: number;
};

export function playerCreatedFullChain(history: HorizontalHistoryResult): FullChainRow {
  const bounce = probeCarriedMotionRow(history.vx);
  return {
    history: history.label,
    createdVx: history.vx,
    preContactVx: bounce.incomingVx,
    postBounceVx: bounce.postBounceVx,
    vxAt100ms: bounce.vxAt100ms,
    vxAt250ms: bounce.vxAt250ms,
    dxAt250ms: bounce.dxAt250ms,
  };
}

export function classifyPlayerCreatableContrast(input: {
  creation: HorizontalHistoryResult[];
  reduceNeutral: HorizontalHistoryResult;
  reduceOppositeKeepSign: HorizontalHistoryResult;
  fullChain: FullChainRow[];
  sameArrival: SameArrivalPair | null;
  generosity: Generosity[];
}): {
  classification: PlayerContrastClassification;
  reason: string;
  failureMode: string | null;
} {
  const vx = input.creation.map((row) => row.vx);
  const ordered = vx[0] < vx[1] && vx[1] < vx[2];
  const spread = vx[vx.length - 1] - vx[0];
  const chainOrdered = input.fullChain.every((row, index, all) => {
    if (index === 0) {
      return true;
    }
    return row.postBounceVx > all[index - 1].postBounceVx && row.dxAt250ms > all[index - 1].dxAt250ms;
  });
  const reducedNeutral = input.reduceNeutral.vx < input.reduceNeutral.startVx - 40
    && input.reduceNeutral.vx > 0;
  const reducedOpposite = input.reduceOppositeKeepSign.vx < input.reduceOppositeKeepSign.startVx - 40
    && !input.reduceOppositeKeepSign.reversed
    && input.reduceOppositeKeepSign.vx > 0;
  const generousCount = input.generosity.filter((g) => g === "GENEROUS").length;
  const precise = input.generosity.includes("IMPLAUSIBLY_PRECISE");

  if (!ordered || spread < 80 || !chainOrdered) {
    return {
      classification: "FAIL",
      reason: "Ordinary Left/Right cannot create bounce-surviving carried-motion contrast.",
      failureMode: !ordered || spread < 80 ? "INPUT CONTROL RANGE" : "PHYSICS RELATION",
    };
  }

  if (!reducedNeutral && !reducedOpposite) {
    return {
      classification: "PARTIAL",
      reason: "Building contrast exists, but REDUCE EXISTING MOTION is not supported by ordinary input.",
      failureMode: "ACTIVE DECELERATION TOO WEAK",
    };
  }

  if (precise || generousCount < 2) {
    return {
      classification: "PARTIAL",
      reason: "Creatable states exist but require tight or frame-precise timing.",
      failureMode: "INPUT CONTROL RANGE",
    };
  }

  if (!input.sameArrival) {
    return {
      classification: "PARTIAL",
      reason: "States exist and reduce, but comparable arrival with different vx was not found from the same start in one flight.",
      failureMode: "SAME-ARRIVAL FEASIBILITY",
    };
  }

  return {
    classification: "PASS",
    reason:
      "Ordinary Left/Right can create multiple robust carried-motion bands, reduce existing motion, and those states survive a NORMAL bounce into different futures.",
    failureMode: null,
  };
}

export function classifyCarriedMotionHistory(rows: CarriedMotionRow[]): {
  classification: CarriedMotionClassification;
  historyShape: HistoryShape;
  reason: string;
} {
  const positive = rows.filter((row) => row.incomingVx > 0).sort((a, b) => a.incomingVx - b.incomingVx);
  if (positive.length < 3) {
    return { classification: "FAIL", historyShape: "OTHER", reason: "Need three positive incoming samples." };
  }

  const takeoffMinFired = positive.some((row) => row.takeoffMinApplied);
  const bounceWrites = positive.filter((row) => row.postBounceVx !== row.vxAfterSameTickControl);
  const post = positive.map((row) => row.postBounceVx);
  const at100 = positive.map((row) => row.vxAt100ms);
  const at250 = positive.map((row) => row.vxAt250ms);
  const dx = positive.map((row) => row.dxAt250ms);

  const ordered = (values: number[]): boolean =>
    values[0] < values[1] && values[1] < values[2];
  const minGap = (values: number[]): number =>
    Math.min(values[1] - values[0], values[2] - values[1]);

  const postSpread = post[post.length - 1] - post[0];
  const gap100 = minGap(at100);
  const gap250 = minGap(at250);
  const dxGap = minGap(dx);

  if (takeoffMinFired || bounceWrites.length > 0) {
    if (!ordered(post) || postSpread < 20) {
      return {
        classification: "FAIL",
        historyShape: "HISTORY_ERASED",
        reason: "Floor bounce or takeoff write collapsed incoming vx into one motion state.",
      };
    }
    return {
      classification: "PARTIAL",
      historyShape: "PARTIAL_NORMALIZATION",
      reason: "Bounce/takeoff wrote vx; some incoming history survived.",
    };
  }

  if (!ordered(post) || postSpread < 20) {
    return {
      classification: "FAIL",
      historyShape: "HISTORY_ERASED",
      reason: "Post-bounce vx values are not distinguishable.",
    };
  }

  if (!ordered(at100) || gap100 < 24 || !ordered(dx) || dxGap < 8) {
    return {
      classification: "PARTIAL",
      historyShape: "HISTORY_PRESERVED",
      reason: "History survives the bounce but short-term trajectories converge too quickly.",
    };
  }

  if (!ordered(at250) || gap250 < 12) {
    return {
      classification: "PARTIAL",
      historyShape: "HISTORY_PRESERVED",
      reason: "History survives bounce and +100ms, but +250ms gaps are weak.",
    };
  }

  return {
    classification: "PASS",
    historyShape: "HISTORY_PRESERVED",
    reason:
      "Different incoming horizontal states remain ordered after an ordinary NORMAL bounce and still separate short-term trajectories under neutral drag.",
  };
}

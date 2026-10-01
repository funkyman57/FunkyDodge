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

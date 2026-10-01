export type BinaryWorldState = "SOLID" | "PASSABLE";
export type WorldStateChangeReason = "INIT" | "SET" | "RESET" | "REFUSED_OVERLAP";
export type WorldStateScenarioId = "A" | "B";

export type Aabb = {
  left: number;
  right: number;
  top: number;
  bottom: number;
};

export type WorldStateProbeModel = {
  state: BinaryWorldState;
  bounds: Aabb;
  lastReason: WorldStateChangeReason;
  changeCount: number;
};

export const WORLD_STATE_PROBE_BOUNDS: Aabb = {
  left: 320,
  right: 348,
  top: 400,
  bottom: 516,
};

export const WORLD_STATE_DT = 1 / 60;
export const WORLD_STATE_RADIUS = 16;

export const WORLD_STATE_TRAVERSAL = {
  startX: 260,
  startY: 450,
  vx: 280,
  vy: 0,
  frames: 36,
};

export const WORLD_STATE_SUPPORT = {
  startX: 334,
  startY: 360,
  vx: 0,
  vy: 240,
  frames: 36,
};

export function createWorldStateProbe(
  state: BinaryWorldState = "SOLID",
  bounds: Aabb = WORLD_STATE_PROBE_BOUNDS,
): WorldStateProbeModel {
  return {
    state,
    bounds: { ...bounds },
    lastReason: "INIT",
    changeCount: 0,
  };
}

export function playerAabb(x: number, y: number, radius = WORLD_STATE_RADIUS): Aabb {
  return {
    left: x - radius,
    right: x + radius,
    top: y - radius,
    bottom: y + radius,
  };
}

export function aabbOverlap(a: Aabb, b: Aabb): boolean {
  return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
}

export function probeCollides(probe: WorldStateProbeModel): boolean {
  return probe.state === "SOLID";
}

export function setWorldState(
  probe: WorldStateProbeModel,
  next: BinaryWorldState,
  occupant: Aabb | null = null,
): WorldStateProbeModel {
  if (probe.state === next) {
    return { ...probe, lastReason: "SET" };
  }
  if (next === "SOLID" && occupant !== null && aabbOverlap(occupant, probe.bounds)) {
    return { ...probe, lastReason: "REFUSED_OVERLAP" };
  }
  return {
    ...probe,
    state: next,
    lastReason: "SET",
    changeCount: probe.changeCount + 1,
  };
}

export function resetWorldState(
  probe: WorldStateProbeModel,
  initial: BinaryWorldState = "SOLID",
): WorldStateProbeModel {
  return {
    ...probe,
    state: initial,
    lastReason: "RESET",
    changeCount: 0,
  };
}

export type ContactResolution = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  contact: boolean;
  blocked: boolean;
  supported: boolean;
  overlapping: boolean;
  traversed: boolean;
};

export function resolveOrdinaryContact(input: {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius?: number;
  probe: WorldStateProbeModel;
}): ContactResolution {
  const radius = input.radius ?? WORLD_STATE_RADIUS;
  let { x, y, vx, vy } = input;
  const box = playerAabb(x, y, radius);
  const overlapping = aabbOverlap(box, input.probe.bounds);
  const traversed = box.left > input.probe.bounds.right;

  if (!probeCollides(input.probe) || !overlapping) {
    return {
      x,
      y,
      vx,
      vy,
      contact: false,
      blocked: false,
      supported: false,
      overlapping,
      traversed,
    };
  }

  let blocked = false;
  let supported = false;

  if (vx > 0 && box.left < input.probe.bounds.left && box.right > input.probe.bounds.left) {
    x = input.probe.bounds.left - radius;
    vx = 0;
    blocked = true;
  } else if (vx < 0 && box.right > input.probe.bounds.right && box.left < input.probe.bounds.right) {
    x = input.probe.bounds.right + radius;
    vx = 0;
    blocked = true;
  }

  if (vy > 0 && box.top < input.probe.bounds.top && box.bottom > input.probe.bounds.top) {
    y = input.probe.bounds.top - radius;
    vy = 0;
    supported = true;
  } else if (vy < 0 && box.bottom > input.probe.bounds.bottom && box.top < input.probe.bounds.bottom) {
    y = input.probe.bounds.bottom + radius;
    vy = 0;
    blocked = true;
  }

  const after = playerAabb(x, y, radius);
  return {
    x,
    y,
    vx,
    vy,
    contact: blocked || supported,
    blocked,
    supported,
    overlapping: aabbOverlap(after, input.probe.bounds),
    traversed: after.left > input.probe.bounds.right,
  };
}

export type WorldStateMeasurement = {
  scenario: WorldStateScenarioId;
  worldState: BinaryWorldState;
  startX: number;
  startY: number;
  startVx: number;
  startVy: number;
  finalX: number;
  finalY: number;
  finalVx: number;
  finalVy: number;
  contact: boolean;
  traversed: boolean;
  supported: boolean;
  blocked: boolean;
  overlapping: boolean;
  frames: number;
  autoChanged: boolean;
};

export function simulateWorldStateAttempt(options: {
  scenario: WorldStateScenarioId;
  probe: WorldStateProbeModel;
  startX: number;
  startY: number;
  vx: number;
  vy: number;
  frames: number;
  radius?: number;
  dt?: number;
}): WorldStateMeasurement {
  const radius = options.radius ?? WORLD_STATE_RADIUS;
  const dt = options.dt ?? WORLD_STATE_DT;
  let x = options.startX;
  let y = options.startY;
  let vx = options.vx;
  let vy = options.vy;
  let contact = false;
  let blocked = false;
  let supported = false;
  let overlapping = false;
  let traversed = false;
  const startState = options.probe.state;

  for (let i = 0; i < options.frames; i += 1) {
    x += vx * dt;
    y += vy * dt;
    const resolved = resolveOrdinaryContact({
      x,
      y,
      vx,
      vy,
      radius,
      probe: options.probe,
    });
    x = resolved.x;
    y = resolved.y;
    vx = resolved.vx;
    vy = resolved.vy;
    contact = contact || resolved.contact;
    blocked = blocked || resolved.blocked;
    supported = supported || resolved.supported;
    overlapping = resolved.overlapping;
    traversed = resolved.traversed || x - radius > options.probe.bounds.right;
  }

  return {
    scenario: options.scenario,
    worldState: options.probe.state,
    startX: options.startX,
    startY: options.startY,
    startVx: options.vx,
    startVy: options.vy,
    finalX: x,
    finalY: y,
    finalVx: vx,
    finalVy: vy,
    contact,
    traversed,
    supported,
    blocked,
    overlapping,
    frames: options.frames,
    autoChanged: options.probe.state !== startState,
  };
}

export function measureTraversalPair(): {
  solid: WorldStateMeasurement;
  passable: WorldStateMeasurement;
} {
  const pose = WORLD_STATE_TRAVERSAL;
  return {
    solid: simulateWorldStateAttempt({
      scenario: "A",
      probe: createWorldStateProbe("SOLID"),
      ...pose,
    }),
    passable: simulateWorldStateAttempt({
      scenario: "B",
      probe: createWorldStateProbe("PASSABLE"),
      ...pose,
    }),
  };
}

export function measureSupportPair(): {
  solid: WorldStateMeasurement;
  passable: WorldStateMeasurement;
} {
  const pose = WORLD_STATE_SUPPORT;
  return {
    solid: simulateWorldStateAttempt({
      scenario: "A",
      probe: createWorldStateProbe("SOLID"),
      ...pose,
    }),
    passable: simulateWorldStateAttempt({
      scenario: "B",
      probe: createWorldStateProbe("PASSABLE"),
      ...pose,
    }),
  };
}

export function formatWorldStateTable(
  rows: WorldStateMeasurement[],
): string {
  const header = "State | Start x,y,vx,vy | Contact | Traversal | Support/block | Final x,y";
  const lines = rows.map((row) =>
    [
      row.worldState,
      `${row.startX.toFixed(0)},${row.startY.toFixed(0)},${row.startVx.toFixed(0)},${row.startVy.toFixed(0)}`,
      row.contact ? "YES" : "NO",
      row.traversed ? "YES" : "NO",
      row.supported ? "SUPPORT" : row.blocked ? "BLOCK" : "NONE",
      `${row.finalX.toFixed(1)},${row.finalY.toFixed(1)}`,
    ].join(" | "),
  );
  return [header, ...lines].join("\n");
}

export function samePlayerStart(a: WorldStateMeasurement, b: WorldStateMeasurement): boolean {
  return a.startX === b.startX
    && a.startY === b.startY
    && a.startVx === b.startVx
    && a.startVy === b.startVy
    && a.frames === b.frames;
}

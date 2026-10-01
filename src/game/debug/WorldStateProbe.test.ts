import assert from "node:assert/strict";
import test from "node:test";
import {
  aabbOverlap,
  createWorldStateProbe,
  formatWorldStateTable,
  measureSupportPair,
  measureTraversalPair,
  playerAabb,
  resetWorldState,
  samePlayerStart,
  setWorldState,
  WORLD_STATE_PROBE_BOUNDS,
  WORLD_STATE_TRAVERSAL,
} from "./WorldStateProbe";

test("W3-EXP-000: SOLID and PASSABLE persist and do not change by themselves", () => {
  const solid = createWorldStateProbe("SOLID");
  const passable = createWorldStateProbe("PASSABLE");
  assert.equal(solid.state, "SOLID");
  assert.equal(passable.state, "PASSABLE");
  assert.equal(solid.changeCount, 0);
  assert.equal(passable.lastReason, "INIT");

  const held = simulateIdle(solid, 120);
  assert.equal(held.state, "SOLID");
  assert.equal(held.changeCount, 0);
});

test("W3-EXP-000: same movement attempt yields different collision under SOLID vs PASSABLE", () => {
  const pair = measureTraversalPair();
  assert.equal(samePlayerStart(pair.solid, pair.passable), true);
  assert.equal(pair.solid.worldState, "SOLID");
  assert.equal(pair.passable.worldState, "PASSABLE");
  assert.equal(pair.solid.contact, true);
  assert.equal(pair.solid.blocked, true);
  assert.equal(pair.solid.traversed, false);
  assert.equal(pair.passable.contact, false);
  assert.equal(pair.passable.blocked, false);
  assert.equal(pair.passable.traversed, true);
  assert.ok(pair.solid.finalX < WORLD_STATE_PROBE_BOUNDS.left);
  assert.ok(pair.passable.finalX > WORLD_STATE_PROBE_BOUNDS.right);
  assert.equal(pair.solid.autoChanged, false);
  assert.equal(pair.passable.autoChanged, false);
});

test("W3-EXP-000: support vs fall-through uses the same binary state, not a new bounce law", () => {
  const pair = measureSupportPair();
  assert.equal(samePlayerStart(pair.solid, pair.passable), true);
  assert.equal(pair.solid.supported, true);
  assert.equal(pair.solid.traversed, false);
  assert.ok(pair.solid.finalY <= WORLD_STATE_PROBE_BOUNDS.top);
  assert.equal(pair.passable.supported, false);
  assert.ok(pair.passable.finalY > WORLD_STATE_PROBE_BOUNDS.top);
});

test("W3-EXP-000: contrast is physical, not a visual flag", () => {
  const pair = measureTraversalPair();
  assert.notEqual(pair.solid.finalX, pair.passable.finalX);
  assert.notEqual(pair.solid.contact, pair.passable.contact);
  assert.equal(pair.solid.startVx, WORLD_STATE_TRAVERSAL.vx);
  assert.equal(pair.passable.startVx, WORLD_STATE_TRAVERSAL.vx);
});

test("W3-EXP-000: reset restores the intended initial World State", () => {
  let probe = createWorldStateProbe("SOLID");
  probe = setWorldState(probe, "PASSABLE");
  assert.equal(probe.state, "PASSABLE");
  assert.equal(probe.changeCount, 1);
  probe = resetWorldState(probe, "SOLID");
  assert.equal(probe.state, "SOLID");
  assert.equal(probe.lastReason, "RESET");
  assert.equal(probe.changeCount, 0);
});

test("W3-EXP-000: no timer, cycle, or special movement mechanic in the probe", () => {
  const probe = createWorldStateProbe("SOLID");
  assert.equal("durationMs" in probe, false);
  assert.equal("cycle" in probe, false);
  assert.equal("bounceType" in probe, false);
  assert.equal("force" in probe, false);
  const keys = Object.keys(probe).sort();
  assert.deepEqual(keys, ["bounds", "changeCount", "lastReason", "state"]);
});

test("W3-EXP-000: re-solidify is refused while overlapping, allowed when clear", () => {
  const probe = createWorldStateProbe("PASSABLE");
  const overlapping = playerAabb(334, 450);
  assert.equal(aabbOverlap(overlapping, WORLD_STATE_PROBE_BOUNDS), true);
  const refused = setWorldState(probe, "SOLID", overlapping);
  assert.equal(refused.state, "PASSABLE");
  assert.equal(refused.lastReason, "REFUSED_OVERLAP");
  assert.equal(refused.changeCount, 0);

  const clear = playerAabb(260, 450);
  assert.equal(aabbOverlap(clear, WORLD_STATE_PROBE_BOUNDS), false);
  const allowed = setWorldState(probe, "SOLID", clear);
  assert.equal(allowed.state, "SOLID");
  assert.equal(allowed.lastReason, "SET");
});

test("W3-EXP-000: measured possibility table is ordered and printable", () => {
  const traversal = measureTraversalPair();
  const support = measureSupportPair();
  const table = formatWorldStateTable([
    traversal.solid,
    traversal.passable,
    support.solid,
    support.passable,
  ]);
  assert.match(table, /State \| Start/);
  assert.match(table, /SOLID/);
  assert.match(table, /PASSABLE/);
  assert.match(table, /BLOCK/);
  assert.match(table, /SUPPORT/);
});

function simulateIdle(probe: ReturnType<typeof createWorldStateProbe>, frames: number) {
  let next = probe;
  for (let i = 0; i < frames; i += 1) {
    next = { ...next };
  }
  return next;
}

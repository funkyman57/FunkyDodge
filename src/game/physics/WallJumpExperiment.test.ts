import assert from "node:assert/strict";
import test from "node:test";
import {
  createWallJumpWindowState,
  isWallJumpEligible,
  isWallJumpExpired,
  isWallJumpWindowActive,
  markWallJumpFired,
  resolveWallJumpContactPhase,
  resolveWallJumpVelocity,
  stepWallJumpWindow,
  type WallJumpPress,
  type WallJumpWindowState,
} from "./BounceController";
import { PhysicsConfig } from "./PhysicsConfig";

const WINDOW_MS = PhysicsConfig.wallJumpResponseWindowMs;

function press(partial: Partial<WallJumpPress> = {}): WallJumpPress {
  return {
    leftDown: false,
    rightDown: false,
    leftJustPressed: false,
    rightJustPressed: false,
    ...partial,
  };
}

function contact(
  state: WallJumpWindowState,
  wallLeft: boolean,
  wallRight: boolean,
  nowMs: number,
): WallJumpWindowState {
  return stepWallJumpWindow(state, wallLeft, wallRight, nowMs, WINDOW_MS);
}

function freshAwayFromLeft(): WallJumpPress {
  return press({ rightDown: true, rightJustPressed: true });
}

function freshAwayFromRight(): WallJumpPress {
  return press({ leftDown: true, leftJustPressed: true });
}

test("WJB-01: NEW contact opens WJ window", () => {
  let state = createWallJumpWindowState();
  assert.equal(resolveWallJumpContactPhase(false, false, true, false), "NEW");

  state = contact(state, true, false, 1000);
  assert.equal(isWallJumpWindowActive(state, 1000), true);
  assert.equal(isWallJumpWindowActive(state, 1000 + WINDOW_MS), true);
  assert.equal(isWallJumpExpired(state, true, false, 1000), false);
});

test("WJB-02: fresh opposite press inside window fires WJ", () => {
  let state = contact(createWallJumpWindowState(), true, false, 1000);
  assert.equal(isWallJumpEligible(true, false, freshAwayFromLeft(), 1080, state), 1);

  state = contact(createWallJumpWindowState(), false, true, 1000);
  assert.equal(isWallJumpEligible(false, true, freshAwayFromRight(), 1080, state), -1);
});

test("WJB-03: held opposite input from before contact does not fire", () => {
  const heldBefore = press({ rightDown: true, rightJustPressed: false });
  const state = contact(createWallJumpWindowState(), true, false, 1000);

  assert.equal(isWallJumpEligible(true, false, heldBefore, 1000, state), 0);
  assert.equal(isWallJumpEligible(true, false, heldBefore, 1100, state), 0);
});

test("WJB-04: no fresh press plus window expiration prevents later STAY WJ", () => {
  let state = contact(createWallJumpWindowState(), true, false, 1000);
  state = contact(state, true, false, 1000 + WINDOW_MS + 1);

  assert.equal(resolveWallJumpContactPhase(true, false, true, false), "STAY");
  assert.equal(isWallJumpWindowActive(state, 1000 + WINDOW_MS + 1), false);
  assert.equal(isWallJumpExpired(state, true, false, 1000 + WINDOW_MS + 1), true);
  assert.equal(isWallJumpEligible(true, false, freshAwayFromLeft(), 1000 + WINDOW_MS + 1, state), 0);
});

test("WJB-05: later fresh opposite press during expired STAY does not fire", () => {
  let state = contact(createWallJumpWindowState(), false, true, 500);
  state = contact(state, false, true, 500 + WINDOW_MS + 40);

  assert.equal(isWallJumpExpired(state, false, true, 500 + WINDOW_MS + 40), true);
  assert.equal(isWallJumpEligible(false, true, freshAwayFromRight(), 500 + WINDOW_MS + 40, state), 0);
});

test("WJB-06: one contact cannot fire WJ twice", () => {
  let state = contact(createWallJumpWindowState(), true, false, 1000);
  assert.equal(isWallJumpEligible(true, false, freshAwayFromLeft(), 1040, state), 1);

  state = markWallJumpFired(state);
  state = contact(state, true, false, 1080);
  assert.equal(isWallJumpEligible(true, false, freshAwayFromLeft(), 1080, state), 0);
  assert.equal(isWallJumpWindowActive(state, 1080), false);
  assert.equal(isWallJumpExpired(state, true, false, 1080), false);
});

test("WJB-07: true exit plus recontact restores eligibility", () => {
  let state = contact(createWallJumpWindowState(), true, false, 1000);
  state = markWallJumpFired(state);
  state = contact(state, false, false, 1200);
  assert.equal(resolveWallJumpContactPhase(true, false, false, false), "NONE");
  assert.equal(isWallJumpWindowActive(state, 1200), false);

  state = contact(state, true, false, 1400);
  assert.equal(resolveWallJumpContactPhase(false, false, true, false), "NEW");
  assert.equal(isWallJumpWindowActive(state, 1400), true);
  assert.equal(isWallJumpEligible(true, false, freshAwayFromLeft(), 1450, state), 1);
});

test("WJB-08: wrong-direction fresh press does not fire", () => {
  const state = contact(createWallJumpWindowState(), true, false, 1000);
  const intoWall = press({ leftDown: true, leftJustPressed: true });
  assert.equal(isWallJumpEligible(true, false, intoWall, 1040, state), 0);
  assert.equal(isWallJumpEligible(true, false, press(), 1040, state), 0);
});

test("WJB-09: current Wall Jump physical response values remain unchanged", () => {
  assert.equal(PhysicsConfig.wallJumpHorizontalVelocity, 320);
  assert.equal(PhysicsConfig.wallJumpVerticalVelocity, 500);

  const awayFromLeft = resolveWallJumpVelocity(1);
  assert.equal(awayFromLeft.vx, 320);
  assert.equal(awayFromLeft.vy, -500);

  const awayFromRight = resolveWallJumpVelocity(-1);
  assert.equal(awayFromRight.vx, -320);
  assert.equal(awayFromRight.vy, -500);
});

test("WJB-10: sliding the same wall is STAY and does not reopen the window", () => {
  let state = contact(createWallJumpWindowState(), true, false, 1000);
  const openedUntil = state.windowUntilMs;
  state = contact(state, true, false, 1120);
  assert.equal(resolveWallJumpContactPhase(true, false, true, false), "STAY");
  assert.equal(state.windowUntilMs, openedUntil);
  assert.equal(state.firedThisContact, false);
});

test("WJB-11: WJ-B uses the named post-contact window and no pre-contact buffer", () => {
  assert.equal(PhysicsConfig.wallJumpResponseWindowMs, 300);
  assert.ok(PhysicsConfig.wallJumpResponseWindowMs >= 200);
  assert.ok(PhysicsConfig.wallJumpResponseWindowMs <= 400);

  const beforeContact = createWallJumpWindowState();
  assert.equal(
    isWallJumpEligible(false, false, freshAwayFromLeft(), 990, beforeContact),
    0,
  );
});

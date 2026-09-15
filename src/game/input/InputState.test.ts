import assert from "node:assert/strict";
import test from "node:test";
import { InputState } from "./InputState";

test("INPUT-01: fresh directional press is detected once, not every held frame", () => {
  const input = new InputState();

  input.update(0, false, false, false);
  assert.equal(input.justPressedDirection(), 0);
  assert.equal(input.leftJustPressed, false);

  input.update(16, true, false, false);
  assert.equal(input.leftJustPressed, true);
  assert.equal(input.rightJustPressed, false);
  assert.equal(input.justPressedDirection(), -1);
  assert.equal(input.leftDown, true);
  assert.equal(input.getFreshHorizontalPress(16)?.ageMs, 0);

  input.update(32, true, false, false);
  assert.equal(input.leftJustPressed, false);
  assert.equal(input.justPressedDirection(), 0);
  assert.equal(input.leftDown, true);
  assert.equal(input.lastHorizontalDirection, -1);
  assert.equal(input.getFreshHorizontalPress(32)?.ageMs, 16);

  input.update(48, true, false, false);
  assert.equal(input.justPressedDirection(), 0);
  assert.equal(input.leftDown, true);
});

test("INPUT-01: opposite fresh press is a new one-shot after release", () => {
  const input = new InputState();
  input.update(0, false, true, false);
  assert.equal(input.justPressedDirection(), 1);

  input.update(16, false, true, false);
  assert.equal(input.justPressedDirection(), 0);

  input.update(32, false, false, false);
  assert.equal(input.justPressedDirection(), 0);

  input.update(48, true, false, false);
  assert.equal(input.justPressedDirection(), -1);
  assert.equal(input.leftPressedAt, 48);
});

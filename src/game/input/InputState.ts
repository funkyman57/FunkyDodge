export type HorizontalDirection = -1 | 0 | 1;

export type HorizontalInputSnapshot = {
  leftDown: boolean;
  rightDown: boolean;
  leftPressedAt: number | null;
  rightPressedAt: number | null;
  leftReleasedAt: number | null;
  rightReleasedAt: number | null;
  lastHorizontalDirection: HorizontalDirection;
};

export type HorizontalPressInfo = {
  direction: -1 | 1;
  pressedAt: number;
  ageMs: number;
  held: boolean;
};

export function getFreshHorizontalPress(
  input: HorizontalInputSnapshot,
  nowMs: number,
): HorizontalPressInfo | null {
  const left = toPress(-1, input.leftPressedAt, input.leftDown, nowMs);
  const right = toPress(1, input.rightPressedAt, input.rightDown, nowMs);

  if (input.leftDown && !input.rightDown) {
    return left;
  }
  if (input.rightDown && !input.leftDown) {
    return right;
  }
  if (left && right) {
    return left.pressedAt >= right.pressedAt ? left : right;
  }
  return left ?? right;
}

export function getHorizontalHoldDuration(input: HorizontalInputSnapshot, nowMs: number): number {
  const press = getFreshHorizontalPress(input, nowMs);
  if (press === null || !press.held) {
    return 0;
  }
  return press.ageMs;
}

export class InputState implements HorizontalInputSnapshot {
  leftDown = false;
  rightDown = false;
  restartJustPressed = false;

  leftPressedAt: number | null = null;
  rightPressedAt: number | null = null;
  leftReleasedAt: number | null = null;
  rightReleasedAt: number | null = null;

  lastHorizontalDirection: HorizontalDirection = 0;
  lastInputLabel = "NONE";

  update(nowMs: number, leftDown: boolean, rightDown: boolean, restartJustPressed: boolean): void {
    this.restartJustPressed = restartJustPressed;

    if (leftDown && !this.leftDown) {
      this.leftPressedAt = nowMs;
      this.lastInputLabel = "LEFT";
    }
    if (!leftDown && this.leftDown) {
      this.leftReleasedAt = nowMs;
    }

    if (rightDown && !this.rightDown) {
      this.rightPressedAt = nowMs;
      this.lastInputLabel = "RIGHT";
    }
    if (!rightDown && this.rightDown) {
      this.rightReleasedAt = nowMs;
    }

    this.leftDown = leftDown;
    this.rightDown = rightDown;

    if (leftDown && !rightDown) {
      this.lastHorizontalDirection = -1;
    } else if (rightDown && !leftDown) {
      this.lastHorizontalDirection = 1;
    }

    if (restartJustPressed) {
      this.lastInputLabel = "RESTART";
    }
  }

  getFreshHorizontalPress(nowMs: number): HorizontalPressInfo | null {
    return getFreshHorizontalPress(this, nowMs);
  }

  getHorizontalHoldDuration(nowMs: number): number {
    return getHorizontalHoldDuration(this, nowMs);
  }

  inputDurationMs(nowMs: number): number {
    const held = this.getHorizontalHoldDuration(nowMs);
    if (held > 0) {
      return held;
    }

    const leftTap = this.tapDuration(this.leftPressedAt, this.leftReleasedAt);
    const rightTap = this.tapDuration(this.rightPressedAt, this.rightReleasedAt);
    const leftRelease = this.leftReleasedAt ?? -Infinity;
    const rightRelease = this.rightReleasedAt ?? -Infinity;

    if (leftRelease <= 0 && rightRelease <= 0) {
      return 0;
    }

    return leftRelease >= rightRelease ? leftTap : rightTap;
  }

  reset(): void {
    this.leftDown = false;
    this.rightDown = false;
    this.restartJustPressed = false;
    this.leftPressedAt = null;
    this.rightPressedAt = null;
    this.leftReleasedAt = null;
    this.rightReleasedAt = null;
    this.lastHorizontalDirection = 0;
    this.lastInputLabel = "NONE";
  }

  private tapDuration(pressedAt: number | null, releasedAt: number | null): number {
    if (pressedAt === null || releasedAt === null || releasedAt < pressedAt) {
      return 0;
    }
    return releasedAt - pressedAt;
  }
}

function toPress(
  direction: -1 | 1,
  pressedAt: number | null,
  held: boolean,
  nowMs: number,
): HorizontalPressInfo | null {
  if (pressedAt === null) {
    return null;
  }
  return {
    direction,
    pressedAt,
    ageMs: nowMs - pressedAt,
    held,
  };
}

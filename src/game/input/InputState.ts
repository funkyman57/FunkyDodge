export type HorizontalDirection = -1 | 0 | 1;

export class InputState {
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

  inputDurationMs(nowMs: number): number {
    if (this.leftDown && this.leftPressedAt !== null && (!this.rightDown || this.leftPressedAt >= (this.rightPressedAt ?? -Infinity))) {
      return Math.max(0, nowMs - this.leftPressedAt);
    }

    if (this.rightDown && this.rightPressedAt !== null) {
      return Math.max(0, nowMs - this.rightPressedAt);
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

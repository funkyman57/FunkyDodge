import Phaser from "phaser";
import { InputState } from "../input/InputState";
import { ExperimentReport, LowInputExperiment } from "../input/LowInputExperiment";
import { rhythmDecisionToLegacyReason, sharedRhythmRecognizer, type RhythmPreview } from "../input/RhythmRecognizer";
import {
  BounceType,
  isSpecialAirReverseEligible,
  isWallJumpEligible,
  LandingIntent,
  MovementState,
  resolveAirReverseExperimentHud,
  resolveFloorBounce,
  resolveLandingIntent,
  resolveMovementState,
  resolveSpecialAirReverseVelocity,
  resolveTakeoffDirection,
  resolveTakeoffVelocity,
  resolveWallJumpVelocity,
  stepHorizontalVelocity,
  type AirReverseExperimentHud,
} from "../physics/BounceController";
import { PhysicsConfig } from "../physics/PhysicsConfig";
import { BallPlayer, BallVisualState } from "./BallPlayer";

type SolidBody = {
  left: number;
  right: number;
  top: number;
  bottom: number;
};

export class PlayerController {
  grounded = false;
  wallLeft = false;
  wallRight = false;
  lastBounceType: BounceType = "NORMAL";
  landingIntent: LandingIntent = "NONE";
  approachIntent: LandingIntent = "NONE";
  landingBoostWindowActive = false;
  landingBoostWindowMsRemaining = 0;
  visualState: BallVisualState = "NORMAL";
  movementState: MovementState = "IDLE";
  freshPressThisFrame = false;
  lastPressImpulse = 0;
  lastDecisionReason = ExperimentReport.lastDecision;
  lastClearReason = ExperimentReport.lastClearReason;
  rhythmPreview: RhythmPreview | null = null;

  lastWallJumpAt = 0;
  airReverseAvailable = true;
  airReverseFiredAt = 0;
  specialAirReverseThisFrame = false;
  airReverseExperimentHud: AirReverseExperimentHud = "READY";

  private bounceApplied = false;
  private wallJumpConsumed = false;
  private boostUntilMs = 0;
  private solids: SolidBody[] = [];

  constructor(
    private readonly player: BallPlayer,
    private readonly input: InputState,
  ) {}

  get vx(): number {
    return this.player.body.velocity.x;
  }

  get vy(): number {
    return this.player.body.velocity.y;
  }

  get x(): number {
    return this.player.x;
  }

  get y(): number {
    return this.player.y;
  }

  setSolids(solids: SolidBody[]): void {
    this.solids = solids;
  }

  reset(): void {
    this.player.reset();
    this.grounded = false;
    this.wallLeft = false;
    this.wallRight = false;
    this.lastBounceType = "NORMAL";
    this.landingIntent = "NONE";
    this.approachIntent = "NONE";
    this.landingBoostWindowActive = false;
    this.landingBoostWindowMsRemaining = 0;
    this.visualState = "NORMAL";
    this.movementState = "IDLE";
    this.freshPressThisFrame = false;
    this.lastPressImpulse = 0;
    this.lastDecisionReason = "NO_REQUEST";
    this.lastClearReason = "RESET";
    this.rhythmPreview = null;
    this.bounceApplied = false;
    this.wallJumpConsumed = false;
    this.boostUntilMs = 0;
    this.lastWallJumpAt = 0;
    this.airReverseAvailable = true;
    this.airReverseFiredAt = 0;
    this.specialAirReverseThisFrame = false;
    this.airReverseExperimentHud = "READY";
  }

  update(nowMs: number, deltaMs: number): void {
    const body = this.player.body;
    const dt = deltaMs / 1000;

    this.physicsWorldGravity();
    this.refreshContactFlags(body);
    this.updateApproachWindow(body, nowMs);
    this.refreshRhythmPreview(nowMs);
    this.applyHorizontalControl(body, dt, nowMs);
    this.applyWallJump(nowMs);
    this.applyFloorBounce(nowMs);
    this.airReverseExperimentHud = resolveAirReverseExperimentHud(
      this.airReverseAvailable,
      this.airReverseFiredAt,
      nowMs,
    );
    this.updateVisualState(nowMs);
    this.player.syncLabel();
  }

  private physicsWorldGravity(): void {
    this.player.sprite.scene.physics.world.gravity.y = PhysicsConfig.gravity;
  }

  private refreshContactFlags(body: Phaser.Physics.Arcade.Body): void {
    const geometricLeft = this.isTouchingWall(body, "left");
    const geometricRight = this.isTouchingWall(body, "right");

    this.grounded = body.blocked.down || body.touching.down;
    this.wallLeft = body.blocked.left || body.touching.left || geometricLeft;
    this.wallRight = body.blocked.right || body.touching.right || geometricRight;

    if (!this.wallLeft && !this.wallRight) {
      this.wallJumpConsumed = false;
    }

    if (!this.grounded) {
      this.bounceApplied = false;
    }
  }

  private isTouchingWall(body: Phaser.Physics.Arcade.Body, side: "left" | "right"): boolean {
    const skin = PhysicsConfig.contactSkin;
    return this.solids.some((solid) => {
      const verticallyOverlaps = body.bottom > solid.top + 8 && body.top < solid.bottom - 8;
      if (!verticallyOverlaps) {
        return false;
      }

      if (side === "left") {
        const distance = body.left - solid.right;
        return distance >= -skin && distance <= skin;
      }

      const distance = solid.left - body.right;
      return distance >= -skin && distance <= skin;
    });
  }

  private refreshRhythmPreview(nowMs: number): void {
    if (LowInputExperiment.mode !== "RHYTHM") {
      this.rhythmPreview = null;
      return;
    }
    this.rhythmPreview = sharedRhythmRecognizer.preview(nowMs);
  }

  private updateApproachWindow(body: Phaser.Physics.Arcade.Body, nowMs: number): void {
    this.approachIntent = resolveLandingIntent(this.input, nowMs);

    const distance = this.distanceToGround();
    const falling = body.velocity.y > PhysicsConfig.fallingSpeedEpsilon;

    if (!falling || distance === Number.POSITIVE_INFINITY) {
      this.landingBoostWindowActive = false;
      this.landingBoostWindowMsRemaining = 0;
      return;
    }

    const timeToGroundMs = (distance / body.velocity.y) * 1000;
    this.landingBoostWindowMsRemaining = Math.max(0, PhysicsConfig.landingBoostWindowMs - timeToGroundMs);
    this.landingBoostWindowActive = timeToGroundMs <= PhysicsConfig.landingBoostWindowMs;
  }

  private applyHorizontalControl(body: Phaser.Physics.Arcade.Body, dt: number, nowMs: number): void {
    const pressDirection = this.input.justPressedDirection();
    const boostActive = nowMs < this.boostUntilMs || this.lastBounceType === "BOOST";
    const maxSpeed = PhysicsConfig.maxHorizontalSpeed * (boostActive ? PhysicsConfig.landingBoostMultiplier : 1);
    const wallJumpWins = !this.wallJumpConsumed && isWallJumpEligible(
      this.wallLeft,
      this.wallRight,
      this.input,
      nowMs,
      PhysicsConfig.wallInputBufferMs,
    ) !== 0;
    const specialReverse = isSpecialAirReverseEligible({
      grounded: this.grounded,
      vx: body.velocity.x,
      pressDirection,
      available: this.airReverseAvailable,
      wallJumpWins,
    });
    this.specialAirReverseThisFrame = specialReverse;

    let startVx = body.velocity.x;
    let specialImpulse = 0;
    if (specialReverse && (pressDirection === -1 || pressDirection === 1)) {
      startVx = resolveSpecialAirReverseVelocity(body.velocity.x, pressDirection);
      specialImpulse = startVx - body.velocity.x;
      this.airReverseAvailable = false;
      this.airReverseFiredAt = nowMs;
    }

    const stepped = stepHorizontalVelocity({
      vx: startVx,
      grounded: this.grounded,
      leftDown: this.input.leftDown,
      rightDown: this.input.rightDown,
      pressDirection: specialReverse ? 0 : pressDirection,
      dt,
      maxSpeed,
    });
    this.freshPressThisFrame = pressDirection !== 0;
    this.lastPressImpulse = specialReverse ? specialImpulse : stepped.impulse;
    let vx = stepped.vx;

    if (this.wallLeft && vx < 0 && !this.input.rightDown) {
      vx = 0;
    }
    if (this.wallRight && vx > 0 && !this.input.leftDown) {
      vx = 0;
    }

    this.movementState = resolveMovementState(vx, this.input.leftDown, this.input.rightDown, stepped.impulse);
    body.setVelocityX(vx);
  }

  private applyWallJump(nowMs: number): void {
    if (this.wallJumpConsumed) {
      return;
    }

    const direction = isWallJumpEligible(
      this.wallLeft,
      this.wallRight,
      this.input,
      nowMs,
      PhysicsConfig.wallInputBufferMs,
    );

    if (direction === 0) {
      return;
    }

    const body = this.player.body;
    const jump = resolveWallJumpVelocity(direction);
    body.setVelocityX(jump.vx);
    body.setVelocityY(jump.vy);
    body.blocked.left = false;
    body.blocked.right = false;
    body.blocked.down = false;
    body.x += direction * 3;
    this.wallJumpConsumed = true;
    this.lastWallJumpAt = nowMs;
    this.visualState = "WALL";
    if (LowInputExperiment.mode === "RHYTHM") {
      sharedRhythmRecognizer.onWallJump(nowMs);
      this.lastClearReason = "WALL_JUMP";
      ExperimentReport.lastClearReason = "WALL_JUMP";
    }
  }

  private applyFloorBounce(nowMs: number): void {
    const body = this.player.body;
    if (!this.grounded) {
      return;
    }

    if (this.bounceApplied && body.velocity.y < 0) {
      return;
    }

    const result = LowInputExperiment.mode === "RHYTHM"
      ? sharedRhythmRecognizer.commitLanding(nowMs)
      : resolveFloorBounce(this.input, nowMs);
    body.setVelocityY(result.verticalVelocity);
    body.blocked.down = false;
    this.lastBounceType = result.type;
    this.landingIntent = result.intent;
    this.lastDecisionReason = LowInputExperiment.mode === "RHYTHM"
      ? sharedRhythmRecognizer.lastDecisionReason
      : rhythmDecisionToLegacyReason(result.intent);
    this.lastClearReason = LowInputExperiment.mode === "RHYTHM"
      ? sharedRhythmRecognizer.lastClearReason
      : null;
    ExperimentReport.lastBounce = result.type;
    ExperimentReport.lastDecision = this.lastDecisionReason;
    ExperimentReport.lastClearReason = this.lastClearReason;
    this.bounceApplied = true;
    this.airReverseAvailable = true;

    const takeoffDirection = resolveTakeoffDirection(this.input, nowMs, result.intent);
    if (takeoffDirection !== 0) {
      body.setVelocityX(resolveTakeoffVelocity(body.velocity.x, takeoffDirection, result.type));
    }

    if (result.applyHorizontalBoost) {
      this.applyLandingBoost(result.boostDirection, nowMs);
    } else if (result.type !== "BOOST") {
      this.boostUntilMs = 0;
    }
  }

  private applyLandingBoost(direction: -1 | 0 | 1, nowMs: number): void {
    if (direction === 0) {
      return;
    }

    const body = this.player.body;
    const boostedMax = PhysicsConfig.maxHorizontalSpeed * PhysicsConfig.landingBoostMultiplier;
    const current = Math.abs(body.velocity.x);
    const boosted = Math.max(current * PhysicsConfig.landingBoostMultiplier, PhysicsConfig.maxHorizontalSpeed * 0.55);
    body.setVelocityX(direction * clamp(boosted, 0, boostedMax));
    this.boostUntilMs = nowMs + PhysicsConfig.landingBoostHoldMs;
  }

  private updateVisualState(nowMs: number): void {
    if (nowMs - this.lastWallJumpAt < PhysicsConfig.wallJumpVisualMs || ((this.wallLeft || this.wallRight) && this.wallJumpConsumed)) {
      this.visualState = "WALL";
    } else if (this.lastBounceType === "BOOST" || nowMs < this.boostUntilMs) {
      this.visualState = "BOOST";
    } else if (this.lastBounceType === "LOW") {
      this.visualState = "LOW";
    } else {
      this.visualState = "NORMAL";
    }

    this.player.setVisualState(this.visualState);
  }

  private distanceToGround(): number {
    const body = this.player.body;
    const bottom = body.bottom;
    let minDistance = Number.POSITIVE_INFINITY;

    for (const solid of this.solids) {
      const horizontallyOverlaps = body.right >= solid.left && body.left <= solid.right;
      if (!horizontallyOverlaps) {
        continue;
      }
      if (solid.top < bottom - 2) {
        continue;
      }
      minDistance = Math.min(minDistance, solid.top - bottom);
    }

    return minDistance;
  }
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

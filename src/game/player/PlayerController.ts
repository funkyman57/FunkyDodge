import Phaser from "phaser";
import { InputState } from "../input/InputState";
import { ExperimentReport, LowInputExperiment } from "../input/LowInputExperiment";
import { rhythmDecisionToLegacyReason, sharedRhythmRecognizer, type RhythmPreview } from "../input/RhythmRecognizer";
import {
  applyChargeBoostGate,
  cancelCharge,
  chargeProgress01,
  chargeProgressMs,
  consumeChargeBoost,
  createChargeState,
  resolveChargeHorizontalVelocity,
  stepCharge,
  type ChargeEvent,
  type ChargePhase,
  type ChargeState,
} from "../physics/ChargeBoost";
import {
  BounceType,
  isWallJumpEligible,
  LandingIntent,
  MovementState,
  resolveFloorBounce,
  resolveLandingIntent,
  resolveMovementState,
  resolveTakeoffDirection,
  resolveTakeoffVelocity,
  resolveWallJumpVelocity,
  stepHorizontalVelocity,
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
  chargePhase: ChargePhase = "NONE";
  chargeProgressMs = 0;
  chargeProgress01 = 0;
  chargeLastEvent: ChargeEvent = "NONE";

  private bounceApplied = false;
  private wallJumpConsumed = false;
  private boostUntilMs = 0;
  private charge: ChargeState = createChargeState();
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
    this.charge = createChargeState();
    this.publishCharge();
    this.player.setChargePresentation("NONE", 0, 0);
  }

  update(nowMs: number, deltaMs: number): void {
    const body = this.player.body;
    const dt = deltaMs / 1000;

    this.physicsWorldGravity();
    this.refreshContactFlags(body);
    this.updateCharge(nowMs);
    this.updateApproachWindow(body, nowMs);
    this.refreshRhythmPreview(nowMs);
    this.applyHorizontalControl(body, dt, nowMs);
    this.applyWallJump(nowMs);
    this.applyFloorBounce(nowMs);
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
    const boostActive = this.lastBounceType === "BOOST";
    const maxSpeed = PhysicsConfig.maxHorizontalSpeed * (
      boostActive ? PhysicsConfig.chargeBoostHorizontalMultiplier : 1
    );
    const stepped = stepHorizontalVelocity({
      vx: body.velocity.x,
      grounded: this.grounded,
      leftDown: this.input.leftDown,
      rightDown: this.input.rightDown,
      pressDirection,
      dt,
      maxSpeed,
    });
    this.freshPressThisFrame = pressDirection !== 0;
    this.lastPressImpulse = stepped.impulse;
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
    this.charge = cancelCharge(this.charge);
    this.publishCharge(nowMs);
    this.player.setChargePresentation(this.charge.phase, this.chargeProgress01, nowMs);
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

    const raw = LowInputExperiment.mode === "RHYTHM"
      ? sharedRhythmRecognizer.commitLanding(nowMs)
      : resolveFloorBounce(this.input, nowMs);
    const gated = applyChargeBoostGate(raw, this.input, this.charge.phase === "READY");
    if (gated.cancelCharge) {
      this.charge = cancelCharge(this.charge);
    } else if (gated.consumeCharge) {
      this.charge = consumeChargeBoost(this.charge);
    }
    this.publishCharge(nowMs);
    this.player.setChargePresentation(this.charge.phase, this.chargeProgress01, nowMs);
    const result = gated.result;
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

    const takeoffDirection = resolveTakeoffDirection(this.input, nowMs, result.intent);
    if (takeoffDirection !== 0) {
      body.setVelocityX(resolveTakeoffVelocity(body.velocity.x, takeoffDirection, result.type));
    }

    if (result.applyHorizontalBoost && result.boostDirection !== 0) {
      body.setVelocityX(resolveChargeHorizontalVelocity(body.velocity.x, result.boostDirection));
    }
  }

  private updateCharge(nowMs: number): void {
    this.charge = stepCharge(this.charge, nowMs, this.input.spaceDown);
    this.publishCharge(nowMs);
    this.player.setChargePresentation(this.charge.phase, this.chargeProgress01, nowMs);
  }

  private publishCharge(nowMs = 0): void {
    this.chargePhase = this.charge.phase;
    this.chargeProgressMs = chargeProgressMs(this.charge, nowMs);
    this.chargeProgress01 = chargeProgress01(this.charge, nowMs);
    this.chargeLastEvent = this.charge.lastEvent;
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

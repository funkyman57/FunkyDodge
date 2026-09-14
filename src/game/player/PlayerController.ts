import Phaser from "phaser";
import { InputState } from "../input/InputState";
import {
  BounceType,
  isLowBounceEligible,
  isWallJumpEligible,
  resolveFloorBounce,
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
  landingBoostWindowActive = false;
  landingBoostWindowMsRemaining = 0;
  visualState: BallVisualState = "NORMAL";

  private bounceApplied = false;
  private wallJumpConsumed = false;
  private boostUntilMs = 0;
  private lastWallJumpAt = 0;
  private boostLatch = false;
  private lowBounceLatch = false;
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
    this.landingBoostWindowActive = false;
    this.landingBoostWindowMsRemaining = 0;
    this.visualState = "NORMAL";
    this.bounceApplied = false;
    this.wallJumpConsumed = false;
    this.boostUntilMs = 0;
    this.lastWallJumpAt = 0;
    this.boostLatch = false;
    this.lowBounceLatch = false;
  }

  update(nowMs: number, deltaMs: number): void {
    const body = this.player.body;
    const dt = deltaMs / 1000;

    this.physicsWorldGravity();
    this.refreshContactFlags(body);
    this.updateLandingBoostWindow(body, nowMs);
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

  private updateLandingBoostWindow(body: Phaser.Physics.Arcade.Body, nowMs: number): void {
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

    if (this.landingBoostWindowActive && (this.input.leftDown || this.input.rightDown)) {
      this.boostLatch = true;
    }
    if (this.landingBoostWindowActive && isLowBounceEligible(this.input, nowMs)) {
      this.lowBounceLatch = true;
    }
    if (!this.grounded && body.velocity.y < -PhysicsConfig.fallingSpeedEpsilon) {
      this.boostLatch = false;
      this.lowBounceLatch = false;
    }
  }

  private applyHorizontalControl(body: Phaser.Physics.Arcade.Body, dt: number, nowMs: number): void {
    const accel = this.grounded ? PhysicsConfig.horizontalAcceleration : PhysicsConfig.airAcceleration;
    let vx = body.velocity.x;

    if (this.input.leftDown && !this.input.rightDown) {
      vx -= accel * dt;
    } else if (this.input.rightDown && !this.input.leftDown) {
      vx += accel * dt;
    } else {
      const drag = PhysicsConfig.horizontalDrag * dt;
      if (vx > 0) {
        vx = Math.max(0, vx - drag);
      } else if (vx < 0) {
        vx = Math.min(0, vx + drag);
      }
    }

    const boostActive = nowMs < this.boostUntilMs;
    const maxSpeed = PhysicsConfig.maxHorizontalSpeed * (boostActive ? PhysicsConfig.landingBoostMultiplier : 1);
    vx = clamp(vx, -maxSpeed, maxSpeed);

    if (this.wallLeft && vx < 0 && !this.input.rightDown) {
      vx = 0;
    }
    if (this.wallRight && vx > 0 && !this.input.leftDown) {
      vx = 0;
    }

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

    this.player.body.setVelocityX(direction * PhysicsConfig.wallJumpHorizontalVelocity);
    this.player.body.blocked.left = false;
    this.player.body.blocked.right = false;
    this.player.body.x += direction * 3;
    this.wallJumpConsumed = true;
    this.lastWallJumpAt = nowMs;
    this.visualState = "WALL";
  }

  private applyFloorBounce(nowMs: number): void {
    const body = this.player.body;
    if (!this.grounded) {
      return;
    }

    if (this.bounceApplied && body.velocity.y < 0) {
      return;
    }

    let result = resolveFloorBounce(this.input, nowMs);
    if (
      result.type !== "LOW"
      && this.lowBounceLatch
      && !this.input.leftDown
      && !this.input.rightDown
    ) {
      result = {
        type: "LOW",
        verticalVelocity: -PhysicsConfig.bounceVelocity * PhysicsConfig.lowBounceMultiplier,
        applyHorizontalBoost: false,
        boostDirection: 0,
      };
    } else if (result.type === "NORMAL" && this.boostLatch) {
      const boostDirection = this.input.lastHorizontalDirection;
      result = {
        type: "BOOST",
        verticalVelocity: -PhysicsConfig.bounceVelocity,
        applyHorizontalBoost: boostDirection !== 0,
        boostDirection,
      };
    }

    body.setVelocityY(result.verticalVelocity);
    body.blocked.down = false;
    this.lastBounceType = result.type;
    this.bounceApplied = true;
    this.boostLatch = false;
    this.lowBounceLatch = false;

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

export const PhysicsConfig = {
  debug: true,

  width: 960,
  height: 540,

  gravity: 1100,

  bounceVelocity: 620,

  horizontalAcceleration: 900,
  airAcceleration: 700,
  airReverseAcceleration: 1800,
  airReverseSpeedEpsilon: 24,

  maxHorizontalSpeed: 340,

  horizontalDrag: 500,

  landingBoostWindowMs: 120,
  landingBoostMultiplier: 1.25,
  landingBoostHoldMs: 200,

  lowBounceFreshPressWindowMs: 130,
  lowBounceMultiplier: 0.48,

  wallInputBufferMs: 120,
  wallJumpHorizontalVelocity: 320,
  wallJumpVerticalVelocity: 500,
  wallJumpVisualMs: 180,
  contactSkin: 6,
  fallingSpeedEpsilon: 40,

  spawnX: 220,
  spawnY: 160,

  ballRadius: 16,
};

export const PhysicsConfig = {
  debug: true,

  width: 960,
  height: 540,

  gravity: 1400,

  bounceVelocity: 580,

  horizontalAcceleration: 1400,
  airAcceleration: 950,
  airReverseAcceleration: 2200,
  airReverseSpeedEpsilon: 24,

  horizontalPressImpulse: 90,
  airReversePressImpulse: 140,

  maxHorizontalSpeed: 420,

  horizontalDrag: 500,

  takeoffHorizontalVelocityMin: 180,
  lowBounceHorizontalMultiplier: 1.15,

  landingBoostWindowMs: 120,
  landingBoostMultiplier: 1.25,
  landingBoostHoldMs: 200,

  lowBounceFreshPressWindowMs: 130,
  lowBounceMultiplier: 0.42,

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

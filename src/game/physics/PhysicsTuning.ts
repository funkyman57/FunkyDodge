import {
  theoreticalBounceApexHeight,
  theoreticalBounceAirtimeSeconds,
} from "./BounceController";
import { PhysicsConfig } from "./PhysicsConfig";

export type PhysicsPresetName = "CURRENT" | "DYNAMIC" | "AGGRESSIVE";

export type PhysicsTuningValues = {
  gravity: number;
  bounceVelocity: number;
  lowBounceMultiplier: number;
  horizontalPressImpulse: number;
  airReversePressImpulse: number;
  horizontalAcceleration: number;
  airAcceleration: number;
  airReverseAcceleration: number;
  maxHorizontalSpeed: number;
  takeoffHorizontalVelocityMin: number;
  lowBounceHorizontalMultiplier: number;
  wallJumpHorizontalVelocity: number;
  wallJumpVerticalVelocity: number;
  lowBounceFreshPressWindowMs: number;
};

export type PhysicsCadenceMetrics = {
  normalAirtime: number;
  lowAirtime: number;
  normalApex: number;
  lowApex: number;
};

export const TUNING_KEYS = [
  "gravity",
  "bounceVelocity",
  "lowBounceMultiplier",
  "horizontalPressImpulse",
  "airReversePressImpulse",
  "horizontalAcceleration",
  "airAcceleration",
  "airReverseAcceleration",
  "maxHorizontalSpeed",
  "takeoffHorizontalVelocityMin",
  "lowBounceHorizontalMultiplier",
  "wallJumpHorizontalVelocity",
  "wallJumpVerticalVelocity",
  "lowBounceFreshPressWindowMs",
] as const satisfies readonly (keyof PhysicsTuningValues)[];

export const PHYSICS_PRESETS: Record<PhysicsPresetName, PhysicsTuningValues> = {
  CURRENT: {
    gravity: 1400,
    bounceVelocity: 580,
    lowBounceMultiplier: 0.42,
    horizontalPressImpulse: 90,
    airReversePressImpulse: 140,
    horizontalAcceleration: 1400,
    airAcceleration: 950,
    airReverseAcceleration: 2200,
    maxHorizontalSpeed: 420,
    takeoffHorizontalVelocityMin: 180,
    lowBounceHorizontalMultiplier: 1.15,
    wallJumpHorizontalVelocity: 320,
    wallJumpVerticalVelocity: 500,
    lowBounceFreshPressWindowMs: 130,
  },
  DYNAMIC: {
    gravity: 1400,
    bounceVelocity: 480,
    lowBounceMultiplier: 0.42,
    horizontalPressImpulse: 130,
    airReversePressImpulse: 200,
    horizontalAcceleration: 1600,
    airAcceleration: 1200,
    airReverseAcceleration: 2800,
    maxHorizontalSpeed: 420,
    takeoffHorizontalVelocityMin: 180,
    lowBounceHorizontalMultiplier: 1.15,
    wallJumpHorizontalVelocity: 320,
    wallJumpVerticalVelocity: 500,
    lowBounceFreshPressWindowMs: 130,
  },
  AGGRESSIVE: {
    gravity: 1500,
    bounceVelocity: 450,
    lowBounceMultiplier: 0.42,
    horizontalPressImpulse: 170,
    airReversePressImpulse: 260,
    horizontalAcceleration: 1800,
    airAcceleration: 1450,
    airReverseAcceleration: 3400,
    maxHorizontalSpeed: 460,
    takeoffHorizontalVelocityMin: 190,
    lowBounceHorizontalMultiplier: 1.2,
    wallJumpHorizontalVelocity: 340,
    wallJumpVerticalVelocity: 540,
    lowBounceFreshPressWindowMs: 130,
  },
};

export function readPhysicsTuning(): PhysicsTuningValues {
  return {
    gravity: PhysicsConfig.gravity,
    bounceVelocity: PhysicsConfig.bounceVelocity,
    lowBounceMultiplier: PhysicsConfig.lowBounceMultiplier,
    horizontalPressImpulse: PhysicsConfig.horizontalPressImpulse,
    airReversePressImpulse: PhysicsConfig.airReversePressImpulse,
    horizontalAcceleration: PhysicsConfig.horizontalAcceleration,
    airAcceleration: PhysicsConfig.airAcceleration,
    airReverseAcceleration: PhysicsConfig.airReverseAcceleration,
    maxHorizontalSpeed: PhysicsConfig.maxHorizontalSpeed,
    takeoffHorizontalVelocityMin: PhysicsConfig.takeoffHorizontalVelocityMin,
    lowBounceHorizontalMultiplier: PhysicsConfig.lowBounceHorizontalMultiplier,
    wallJumpHorizontalVelocity: PhysicsConfig.wallJumpHorizontalVelocity,
    wallJumpVerticalVelocity: PhysicsConfig.wallJumpVerticalVelocity,
    lowBounceFreshPressWindowMs: PhysicsConfig.lowBounceFreshPressWindowMs,
  };
}

export function applyPhysicsTuning(values: PhysicsTuningValues): void {
  PhysicsConfig.gravity = values.gravity;
  PhysicsConfig.bounceVelocity = values.bounceVelocity;
  PhysicsConfig.lowBounceMultiplier = values.lowBounceMultiplier;
  PhysicsConfig.horizontalPressImpulse = values.horizontalPressImpulse;
  PhysicsConfig.airReversePressImpulse = values.airReversePressImpulse;
  PhysicsConfig.horizontalAcceleration = values.horizontalAcceleration;
  PhysicsConfig.airAcceleration = values.airAcceleration;
  PhysicsConfig.airReverseAcceleration = values.airReverseAcceleration;
  PhysicsConfig.maxHorizontalSpeed = values.maxHorizontalSpeed;
  PhysicsConfig.takeoffHorizontalVelocityMin = values.takeoffHorizontalVelocityMin;
  PhysicsConfig.lowBounceHorizontalMultiplier = values.lowBounceHorizontalMultiplier;
  PhysicsConfig.wallJumpHorizontalVelocity = values.wallJumpHorizontalVelocity;
  PhysicsConfig.wallJumpVerticalVelocity = values.wallJumpVerticalVelocity;
  PhysicsConfig.lowBounceFreshPressWindowMs = values.lowBounceFreshPressWindowMs;
}

export function cadenceMetrics(values: PhysicsTuningValues): PhysicsCadenceMetrics {
  const lowLaunch = values.bounceVelocity * values.lowBounceMultiplier;
  return {
    normalAirtime: theoreticalBounceAirtimeSeconds(values.bounceVelocity, values.gravity),
    lowAirtime: theoreticalBounceAirtimeSeconds(lowLaunch, values.gravity),
    normalApex: theoreticalBounceApexHeight(values.bounceVelocity, values.gravity),
    lowApex: theoreticalBounceApexHeight(lowLaunch, values.gravity),
  };
}

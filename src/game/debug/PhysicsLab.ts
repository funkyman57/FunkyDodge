import {
  applyPhysicsTuning,
  cadenceMetrics,
  PHYSICS_PRESETS,
  readPhysicsTuning,
  type PhysicsPresetName,
  type PhysicsTuningValues,
} from "../physics/PhysicsTuning";
import { PhysicsConfig } from "../physics/PhysicsConfig";
import "./physics-lab.css";

type LabField = {
  key: keyof PhysicsTuningValues;
  label: string;
  min: number;
  max: number;
  step: number;
};

const FIELDS: LabField[] = [
  { key: "gravity", label: "gravity", min: 800, max: 2000, step: 10 },
  { key: "bounceVelocity", label: "bounceVelocity", min: 280, max: 800, step: 5 },
  { key: "lowBounceMultiplier", label: "lowBounceMultiplier", min: 0.25, max: 0.7, step: 0.01 },
  { key: "horizontalPressImpulse", label: "horizontalPressImpulse", min: 40, max: 240, step: 5 },
  { key: "airReversePressImpulse", label: "airReversePressImpulse", min: 60, max: 320, step: 5 },
  { key: "horizontalAcceleration", label: "horizontalAcceleration", min: 800, max: 2400, step: 25 },
  { key: "airAcceleration", label: "airAcceleration", min: 400, max: 2000, step: 25 },
  { key: "airReverseAcceleration", label: "airReverseAcceleration", min: 1000, max: 4200, step: 25 },
  { key: "maxHorizontalSpeed", label: "maxHorizontalSpeed", min: 240, max: 600, step: 10 },
  { key: "takeoffHorizontalVelocityMin", label: "takeoffHorizontalVelocityMin", min: 80, max: 280, step: 5 },
  { key: "lowBounceHorizontalMultiplier", label: "lowBounceHorizontalMultiplier", min: 1, max: 1.4, step: 0.01 },
  { key: "wallJumpHorizontalVelocity", label: "wallJumpHorizontalVelocity", min: 180, max: 480, step: 10 },
  { key: "wallJumpVerticalVelocity", label: "wallJumpVerticalVelocity", min: 280, max: 720, step: 10 },
  { key: "lowBounceFreshPressWindowMs", label: "lowBounceFreshPressWindowMs", min: 80, max: 220, step: 5 },
];

export type PhysicsLabHandle = {
  applyPreset: (name: PhysicsPresetName) => void;
  destroy: () => void;
};

export function mountPhysicsLab(options: {
  onResetBall: () => void;
  onValuesChanged: () => void;
}): PhysicsLabHandle {
  const root = document.createElement("aside");
  root.className = "physics-lab";
  root.innerHTML = `
    <h2>PHYSICS LAB <small>L toggle</small></h2>
    <div class="physics-lab-presets"></div>
    <div class="physics-lab-actions"></div>
    <form class="physics-lab-fields"></form>
    <div class="physics-lab-metrics"></div>
    <p class="physics-lab-note">Dev only. Presets are experiments, not validated values.</p>
  `;

  const presetRow = root.querySelector(".physics-lab-presets") as HTMLElement;
  const actionRow = root.querySelector(".physics-lab-actions") as HTMLElement;
  const form = root.querySelector(".physics-lab-fields") as HTMLFormElement;
  const metrics = root.querySelector(".physics-lab-metrics") as HTMLElement;

  let selectedPreset: PhysicsPresetName = "DYNAMIC";

  const presetButtons = (["CURRENT", "DYNAMIC", "AGGRESSIVE"] as const).map((name) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = name;
    button.addEventListener("click", () => applyPreset(name));
    presetRow.append(button);
    return { name, button };
  });

  const resetBall = document.createElement("button");
  resetBall.type = "button";
  resetBall.textContent = "RESET BALL";
  resetBall.addEventListener("click", () => options.onResetBall());

  const resetValues = document.createElement("button");
  resetValues.type = "button";
  resetValues.textContent = "RESET VALUES";
  resetValues.addEventListener("click", () => applyPreset(selectedPreset));

  const copyValues = document.createElement("button");
  copyValues.type = "button";
  copyValues.textContent = "COPY VALUES";
  copyValues.addEventListener("click", async () => {
    const payload = JSON.stringify(readPhysicsTuning(), null, 2);
    await navigator.clipboard.writeText(payload);
    copyValues.textContent = "COPIED";
    window.setTimeout(() => {
      copyValues.textContent = "COPY VALUES";
    }, 900);
  });

  actionRow.append(resetBall, resetValues, copyValues);

  for (const field of FIELDS) {
    const label = document.createElement("label");
    const title = document.createElement("span");
    title.textContent = field.label;
    const range = document.createElement("input");
    range.type = "range";
    range.min = String(field.min);
    range.max = String(field.max);
    range.step = String(field.step);
    range.dataset.key = field.key;
    const number = document.createElement("input");
    number.type = "number";
    number.min = String(field.min);
    number.max = String(field.max);
    number.step = String(field.step);
    number.dataset.key = field.key;
    const sync = (value: string) => {
      range.value = value;
      number.value = value;
      commitField(field.key, Number(value));
    };
    range.addEventListener("input", () => sync(range.value));
    number.addEventListener("change", () => sync(number.value));
    label.append(title, range, number);
    form.append(label);
  }

  function commitField(key: keyof PhysicsTuningValues, value: number): void {
    if (!Number.isFinite(value)) {
      return;
    }
    const next = readPhysicsTuning();
    next[key] = value;
    applyPhysicsTuning(next);
    refreshMetrics();
    options.onValuesChanged();
  }

  function refreshFields(): void {
    const values = readPhysicsTuning();
    for (const input of form.querySelectorAll("input")) {
      const key = input.dataset.key as keyof PhysicsTuningValues | undefined;
      if (!key) {
        continue;
      }
      input.value = String(values[key]);
    }
    for (const preset of presetButtons) {
      preset.button.dataset.active = String(preset.name === selectedPreset);
    }
    refreshMetrics();
  }

  function refreshMetrics(): void {
    const next = cadenceMetrics(readPhysicsTuning());
    metrics.innerHTML = [
      `NORMAL airtime ${next.normalAirtime.toFixed(3)}s`,
      `LOW airtime ${next.lowAirtime.toFixed(3)}s`,
      `NORMAL apex ${next.normalApex.toFixed(1)}px`,
      `LOW apex ${next.lowApex.toFixed(1)}px`,
    ].join("<br>");
  }

  function applyPreset(name: PhysicsPresetName): void {
    selectedPreset = name;
    applyPhysicsTuning(PHYSICS_PRESETS[name]);
    refreshFields();
    options.onValuesChanged();
  }

  const onKeyDown = (event: KeyboardEvent): void => {
    if (event.repeat || event.target instanceof HTMLInputElement) {
      return;
    }
    if (event.key === "l" || event.key === "L") {
      root.hidden = !root.hidden;
    }
  };

  window.addEventListener("keydown", onKeyDown);
  document.body.append(root);
  applyPreset("DYNAMIC");

  return {
    applyPreset,
    destroy() {
      window.removeEventListener("keydown", onKeyDown);
      root.remove();
      applyPhysicsTuning(PHYSICS_PRESETS.CURRENT);
    },
  };
}

export function physicsLabEnabled(): boolean {
  return PhysicsConfig.debug;
}

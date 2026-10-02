import {
  applyRhythmTiming,
  EXPERIMENT_VERSION,
  ExperimentReport,
  isPositiveMs,
  LowInputExperiment,
  readRhythmTiming,
  RHYTHM_TIMING_DEFAULTS,
  type InputMode,
  type RhythmTimingValues,
} from "../input/LowInputExperiment";
import {
  applyPhysicsTuning,
  cadenceMetrics,
  PHYSICS_PRESETS,
  readPhysicsTuning,
  type PhysicsPresetName,
  type PhysicsTuningValues,
} from "../physics/PhysicsTuning";
import { PhysicsConfig } from "../physics/PhysicsConfig";
import type { BinaryWorldState, WorldStateScenarioId } from "./WorldStateProbe";
import type { AgencyModelId, AgencyScenarioId } from "./WorldStateAgency";
import type { TradeoffScenarioId } from "./WorldStateTradeoff";
import type { DelayScenarioId, TemporalPhase } from "./WorldStateDelay";
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
  setWorldStateUi: (state: BinaryWorldState) => void;
  setAgencyUi: (model: AgencyModelId) => void;
  setDelayUi: (enabled: boolean, phase?: TemporalPhase) => void;
};

export function mountPhysicsLab(options: {
  onResetBall: () => void;
  onValuesChanged: () => void;
  onModeOrTimingChanged: (reason: "MODE_SWITCH" | "TIMING_EDIT") => void;
  onWorldStateSet?: (state: BinaryWorldState) => void;
  onWorldStateLaunch?: (id: WorldStateScenarioId) => void;
  onAgencyModel?: (model: AgencyModelId) => void;
  onAgencyLaunch?: (id: AgencyScenarioId) => void;
  onTradeoffLaunch?: (id: TradeoffScenarioId) => void;
  onDelayEnabled?: (enabled: boolean) => void;
  onDelayLaunch?: (id: DelayScenarioId) => void;
  onDelayRestore?: () => void;
}): PhysicsLabHandle {
  const root = document.createElement("aside");
  root.className = "physics-lab";
  root.innerHTML = `
    <h2>PHYSICS LAB <small>L toggle</small></h2>
    <div class="physics-lab-modes"></div>
    <div class="physics-lab-timing"></div>
    <div class="physics-lab-presets"></div>
    <div class="physics-lab-actions"></div>
    <h3>W3 STATE</h3>
    <div class="physics-lab-world-state"></div>
    <p class="physics-lab-note">T toggle · 5 SOLID A · 6 PASSABLE B. Diagnostic only.</p>
    <h3>W3 AGENCY</h3>
    <div class="physics-lab-agency"></div>
    <p class="physics-lab-note">M model · 7 cause · 8 avoid · 9 restore. Contact only. Not a Switch.</p>
    <h3>W3 ORDER</h3>
    <div class="physics-lab-tradeoff"></div>
    <p class="physics-lab-note">X = support. Y = traverse. Diagnostic order only.</p>
    <h3>W4 DELAY</h3>
    <div class="physics-lab-delay"></div>
    <p class="physics-lab-note">720ms diagnostic onset. PENDING is not a third collision state. Immediate restore is recovery, not a second delay.</p>
    <form class="physics-lab-fields"></form>
    <div class="physics-lab-metrics"></div>
    <p class="physics-lab-note">Dev only. Input mode is independent of physics presets. Timing seeds are provisional.</p>
  `;

  const modeRow = root.querySelector(".physics-lab-modes") as HTMLElement;
  const timingBox = root.querySelector(".physics-lab-timing") as HTMLElement;
  const presetRow = root.querySelector(".physics-lab-presets") as HTMLElement;
  const actionRow = root.querySelector(".physics-lab-actions") as HTMLElement;
  const worldStateRow = root.querySelector(".physics-lab-world-state") as HTMLElement;
  const agencyRow = root.querySelector(".physics-lab-agency") as HTMLElement;
  const tradeoffRow = root.querySelector(".physics-lab-tradeoff") as HTMLElement;
  const delayRow = root.querySelector(".physics-lab-delay") as HTMLElement;
  const form = root.querySelector(".physics-lab-fields") as HTMLFormElement;
  let worldState: BinaryWorldState = "SOLID";
  let agencyModel: AgencyModelId = "OFF";
  let delayEnabled = true;
  let delayPhase: TemporalPhase = "IDLE";
  const metrics = root.querySelector(".physics-lab-metrics") as HTMLElement;

  let selectedPreset: PhysicsPresetName = "DYNAMIC";

  const modeButtons = (["LEGACY", "RHYTHM"] as const).map((name) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = name === "LEGACY" ? "LEGACY — fresh press" : "RHYTHM — double tap";
    button.addEventListener("click", () => setMode(name));
    modeRow.append(button);
    return { name, button };
  });

  const timingFields: Array<{ key: keyof RhythmTimingValues; label: string }> = [
    { key: "rhythmDoubleTapIntervalMs", label: "double-tap interval ms" },
    { key: "rhythmLandingBufferMs", label: "landing buffer ms" },
    { key: "rhythmHoldThresholdMs", label: "hold threshold ms" },
  ];
  for (const field of timingFields) {
    const label = document.createElement("label");
    const title = document.createElement("span");
    title.textContent = field.label;
    const number = document.createElement("input");
    number.type = "number";
    number.min = "1";
    number.step = "1";
    number.dataset.timing = field.key;
    number.addEventListener("change", () => {
      const value = Number(number.value);
      if (!isPositiveMs(value)) {
        number.value = String(readRhythmTiming()[field.key]);
        return;
      }
      const next = readRhythmTiming();
      next[field.key] = value;
      applyRhythmTiming(next);
      options.onModeOrTimingChanged("TIMING_EDIT");
    });
    label.append(title, number);
    timingBox.append(label);
  }
  const resetTiming = document.createElement("button");
  resetTiming.type = "button";
  resetTiming.textContent = "RESET TIMING";
  resetTiming.addEventListener("click", () => {
    applyRhythmTiming(RHYTHM_TIMING_DEFAULTS);
    refreshTiming();
    options.onModeOrTimingChanged("TIMING_EDIT");
  });
  timingBox.append(resetTiming);

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

  const copyExperiment = document.createElement("button");
  copyExperiment.type = "button";
  copyExperiment.textContent = "COPY EXPERIMENT";
  copyExperiment.addEventListener("click", async () => {
    const payload = JSON.stringify({
      version: EXPERIMENT_VERSION,
      mode: LowInputExperiment.mode,
      physics: readPhysicsTuning(),
      timing: readRhythmTiming(),
      lastBounce: ExperimentReport.lastBounce,
      lastDecision: ExperimentReport.lastDecision,
    }, null, 2);
    await navigator.clipboard.writeText(payload);
    copyExperiment.textContent = "COPIED";
    window.setTimeout(() => {
      copyExperiment.textContent = "COPY EXPERIMENT";
    }, 900);
  });

  actionRow.append(resetBall, resetValues, copyValues, copyExperiment);

  const worldButtons = (["SOLID", "PASSABLE"] as const).map((name) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = name;
    button.addEventListener("click", () => options.onWorldStateSet?.(name));
    worldStateRow.append(button);
    return { name, button };
  });
  const launchA = document.createElement("button");
  launchA.type = "button";
  launchA.textContent = "A";
  launchA.addEventListener("click", () => options.onWorldStateLaunch?.("A"));
  const launchB = document.createElement("button");
  launchB.type = "button";
  launchB.textContent = "B";
  launchB.addEventListener("click", () => options.onWorldStateLaunch?.("B"));
  worldStateRow.append(launchA, launchB);

  const agencyButtons = (["A", "B", "OFF"] as const).map((name) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = name === "OFF" ? "OFF" : `MODEL ${name}`;
    button.addEventListener("click", () => options.onAgencyModel?.(name));
    agencyRow.append(button);
    return { name, button };
  });
  const agencyLaunches: Array<{ id: AgencyScenarioId; label: string }> = [
    { id: "CAUSE", label: "CAUSE" },
    { id: "AVOID", label: "AVOID" },
    { id: "RESTORE", label: "RESTORE" },
  ];
  for (const launch of agencyLaunches) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = launch.label;
    button.addEventListener("click", () => options.onAgencyLaunch?.(launch.id));
    agencyRow.append(button);
  }

  const tradeoffLaunches: Array<{ id: TradeoffScenarioId; label: string }> = [
    { id: "CORRECT", label: "CORRECT" },
    { id: "EARLY", label: "EARLY" },
    { id: "RESTORE", label: "RESTORE X" },
    { id: "DIRECT_Y", label: "DIRECT Y" },
  ];
  for (const launch of tradeoffLaunches) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = launch.label;
    button.addEventListener("click", () => options.onTradeoffLaunch?.(launch.id));
    tradeoffRow.append(button);
  }

  const delayOn = document.createElement("button");
  delayOn.type = "button";
  delayOn.textContent = "DELAY ON";
  delayOn.addEventListener("click", () => options.onDelayEnabled?.(true));
  const delayOff = document.createElement("button");
  delayOff.type = "button";
  delayOff.textContent = "DELAY OFF";
  delayOff.addEventListener("click", () => options.onDelayEnabled?.(false));
  delayRow.append(delayOn, delayOff);
  const delayLaunches: Array<{ id: DelayScenarioId; label: string }> = [
    { id: "A", label: "A ACK" },
    { id: "B", label: "B MID" },
    { id: "C", label: "C DONE" },
    { id: "D", label: "D REACT" },
    { id: "E", label: "E RESTORE" },
  ];
  for (const launch of delayLaunches) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = launch.label;
    button.addEventListener("click", () => options.onDelayLaunch?.(launch.id));
    delayRow.append(button);
  }
  const delayRestore = document.createElement("button");
  delayRestore.type = "button";
  delayRestore.textContent = "RESTORE NOW";
  delayRestore.addEventListener("click", () => options.onDelayRestore?.());
  delayRow.append(delayRestore);

  function refreshWorldState(): void {
    for (const entry of worldButtons) {
      entry.button.dataset.active = String(entry.name === worldState);
    }
  }

  function refreshAgency(): void {
    for (const entry of agencyButtons) {
      entry.button.dataset.active = String(entry.name === agencyModel);
    }
  }

  function refreshDelay(): void {
    delayOn.dataset.active = String(delayEnabled);
    delayOff.dataset.active = String(!delayEnabled);
    delayOn.textContent = delayEnabled ? `DELAY ON ${delayPhase}` : "DELAY ON";
  }

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

  function setMode(mode: InputMode): void {
    LowInputExperiment.mode = mode;
    refreshModes();
    options.onModeOrTimingChanged("MODE_SWITCH");
  }

  function refreshModes(): void {
    for (const mode of modeButtons) {
      mode.button.dataset.active = String(mode.name === LowInputExperiment.mode);
    }
  }

  function refreshTiming(): void {
    const values = readRhythmTiming();
    for (const input of timingBox.querySelectorAll("input")) {
      const key = input.dataset.timing as keyof RhythmTimingValues | undefined;
      if (key) {
        input.value = String(values[key]);
      }
    }
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
  LowInputExperiment.mode = "LEGACY";
  applyRhythmTiming(RHYTHM_TIMING_DEFAULTS);
  refreshModes();
  refreshTiming();
  applyPreset("DYNAMIC");

  refreshWorldState();
  refreshAgency();
  refreshDelay();

  return {
    applyPreset,
    destroy() {
      window.removeEventListener("keydown", onKeyDown);
      root.remove();
      applyPhysicsTuning(PHYSICS_PRESETS.CURRENT);
    },
    setWorldStateUi(state: BinaryWorldState) {
      worldState = state;
      refreshWorldState();
    },
    setAgencyUi(model: AgencyModelId) {
      agencyModel = model;
      refreshAgency();
    },
    setDelayUi(enabled: boolean, phase?: TemporalPhase) {
      delayEnabled = enabled;
      if (phase) {
        delayPhase = phase;
      }
      refreshDelay();
    },
  };
}

export function physicsLabEnabled(): boolean {
  return PhysicsConfig.debug;
}

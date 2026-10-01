# W2-PHYS-001 — Carried Motion Continuity Probe

Isolated physics diagnostic. **Not** Human Validation. **Not** W2 room work. **Not** PLAY-002.

**Status:** diagnostic evidence recorded. Classification: **PASS**.

**Baseline:** `cursor/validation-diagnostics-3f71` @ `226bcd3cb5eccb32e8674897f66631f400ca10e9`

Experiment branch: `cursor/w2-phys-001-carried-motion-3f71`

AR-A2 / WJ-B / Charge were **not** merged.

---

## Hypothesis

H1. Different horizontal velocities immediately before an ordinary floor contact remain meaningfully different after the bounce.

H2. With neutral input after the bounce, those differences produce meaningfully different short-term trajectories.

H3. The current movement controller does **not** silently normalize all incoming horizontal velocities to one common takeoff state.

This tests whether the **physical** W2-K01 / W2-K02 relationship exists. It does **not** test whether a player can understand or create it.

---

## Baseline inspection

Repository state at start: exact known HEAD. No extra commits on `cursor/validation-diagnostics-3f71`.

Baked `PhysicsConfig` (CURRENT, used by this probe):

| Knob | Actual |
| --- | --- |
| gravity | 1400 |
| bounceVelocity | **580** (DYNAMIC lab preset is 480) |
| horizontalAcceleration | **1400** (DYNAMIC 1600) |
| airAcceleration | **950** (DYNAMIC 1200) |
| airReverseAcceleration | **2200** (DYNAMIC 2800) |
| maxHorizontalSpeed | 420 |
| takeoffHorizontalVelocityMin | 180 |
| horizontalDrag | 500 |

Playground Physics Lab calls `applyPreset("DYNAMIC")` on mount. **This probe does not retune.** Horizontal drag and takeoff-min are identical across CURRENT and DYNAMIC, and this experiment uses NORMAL + neutral input, so bounce/accel differences do not enter the measured write chain.

---

## Horizontal velocity write-chain

Update order in `PlayerController.update`: gravity → contact flags → approach window → **horizontal control** → wall jump → **floor bounce** → visuals.

Paths that can write `vx` at or just after a floor bounce:

| When | Writer | This probe |
| --- | --- | --- |
| Every tick | `stepHorizontalVelocity` (accel / reverse / **neutral drag 500/s** / max-speed clamp) | Neutral drag only |
| Every tick, walls | Wall contact zeros inward vx | Excluded (ordinary floor) |
| Wall jump | `resolveWallJumpVelocity` ±320 | Excluded |
| Floor bounce, intent ≠ NONE | `resolveTakeoffVelocity` → `max(\|vx\|, takeoffMin)` | **Does not fire** on NORMAL + neutral |
| BOOST | `applyLandingBoost` | Excluded |
| Arcade body | Phaser drag/friction/bounce | Body is set to 0 / 0 / 0 |

Arcade body does not independently rewrite horizontal velocity.

---

## Floor-bounce behavior (NORMAL + neutral)

`resolveFloorBounce` → type `NORMAL`, intent `NONE`.

`resolveTakeoffDirection(..., "NONE")` → `0`.

Therefore `applyFloorBounce` writes **vy only**. Incoming `vx` is left unchanged by the bounce itself.

---

## Takeoff-min audit (observed, not changed)

`takeoffHorizontalVelocityMin = 180`.

Applies **only** when takeoff direction is nonzero (LOW fresh-press or BOOST hold).

Then: `vx = direction * max(|currentVx|, 180)` (LOW multiplies the minimum by 1.15).

It does **not** normalize all floor-bounce velocities. Neutral input does **not** trigger it. `lastHorizontalDirection` alone does **not** trigger it.

If a directional landing were present, 120 would be raised to 180 while 240 / 360 would keep history. That path is **out of this experiment**.

---

## Neutral-input audit (observed, not changed)

After bounce, `stepHorizontalVelocity` with no keys applies `horizontalDrag` (500/s) toward 0. No hidden target speed. Sign is preserved until 0. Last direction does not affect the drag.

Same-tick: horizontal control runs **before** bounce while still grounded, so incoming vx loses one drag step (~8.33 at 60 Hz) **before** T0.

---

## Controller-overwrite findings

These are different modes:

1. **Physics / bounce:** preserves incoming vx on NORMAL + neutral.
2. **Same-tick controller:** one uniform drag step before bounce. Not a bounce overwrite.
3. **Post-bounce controller:** continues the same uniform drag. Does **not** snap to takeoff-min or a common takeoff state.

No same-tick takeoff overwrite occurs in this contract.

---

## Procedure

Deterministic 60 Hz simulation of the existing write-chain (`CarriedMotionProbe`). No keyboard. No sleeps.

Scenarios: incoming vx `+120 / +240 / +360` and mirrors. Ordinary floor. NORMAL bounce. Neutral input after contact. LOW / BOOST / Charge / AR / Wall Jump / Wind / Ice / Rough / Spring excluded.

Checkpoints: T-1 incoming; T0 after same-tick control + bounce; T+100ms; T+250ms.

---

## Measurement table

dt = 1/60. Values from `probeCarriedMotionTable()` on this baseline.

| Incoming vx | Post-bounce vx | vx @ +100ms | vx @ +250ms | dx @ +250ms | Notes |
| --- | --- | --- | --- | --- | --- |
| 120 | 111.67 | 61.67 | 0.00 | 11.56 | takeoffMin not applied; same-tick drag |
| 240 | 231.67 | 181.67 | 106.67 | 41.25 | preserved + uniform drag |
| 360 | 351.67 | 301.67 | 226.67 | 71.25 | preserved + uniform drag |
| -120 | -111.67 | -61.67 | 0.00 | -11.56 | mirrored |
| -240 | -231.67 | -181.67 | -106.67 | -41.25 | mirrored |
| -360 | -351.67 | -301.67 | -226.67 | -71.25 | mirrored |

History shape: **HISTORY PRESERVED** (A), with uniform drag decay. Not B (partial takeoff normalization). Not C (history erased).

The +120 case reaches 0 before +250ms (`111.67 / 500 ≈ 223ms`). 240 vs 360 remain clearly separated.

---

## Classification

**PASS**

Different incoming horizontal-motion states remain meaningfully distinguishable after an ordinary NORMAL bounce and influence short-term future movement (vx at +100ms; dx at +250ms).

W2-K01 physical relationship: **exists** (same ordinary floor bounce; different carried motion → different short-term future).

W2-K02 causal history: **exists** (post-bounce vx is incoming vx minus uniform drag, not a surface-assigned speed).

This does **not** prove a player can create those incoming states, nor that they can read them.

---

## Confounds

- Same-tick grounded drag before bounce (~8.33 at 60 Hz).
- If the body remains floor-overlapping after bounce, extra grounded drag frames could apply (not modeled if the bounce leaves immediately).
- +120 zeros out by ~223ms; low-vs-high is still readable via +100ms vx and +250ms dx.
- Directional LOW/BOOST would invoke takeoff-min and could raise 120 → 180.
- Playground runtime preset is DYNAMIC; this probe used baked CURRENT. Horizontal drag / takeoff-min / max speed match.
- Phaser integration order vs this discrete `x += vx * dt` approximation.

---

## Next experiment

**W2-PHYS-002 — Player-Creatable Motion Contrast**

Question: can normal player input intentionally create distinguishable carried-motion states (the +120 / +240 / +360 class) before an ordinary floor bounce?

Do not add Wind / Ice / Rough as the first follow-up.

---

## Files

- `src/game/debug/CarriedMotionProbe.ts`
- `src/game/debug/CarriedMotionProbe.test.ts`
- `src/game/player/PlayerController.ts` (record-only PRE/POST vx)
- `src/game/debug/DebugHud.ts` (diagnostic PRE/POST/retain)
- `package.json` (register test)
- `docs/playtest/W2_PHYS_001.md`

No gravity / bounce / accel / drag / takeoffMin / max-speed / friction / input-timing changes.

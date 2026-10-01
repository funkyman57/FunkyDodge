# W2-PHYS-002 — Player-Creatable Motion Contrast

Isolated input-to-motion diagnostic. **Not** Human Validation. **Not** W2 room work. **Not** PLAY-002.

**Status:** diagnostic evidence recorded. Classification: **PASS**.

**Baseline:** `cursor/w2-phys-001-carried-motion-3f71` @ `24c48450dd282cd3a8b1d8c43dbde10f5280939a`

Experiment branch: `cursor/w2-phys-002-player-contrast-3f71`

AR-A2 / WJ-B / Charge were **not** merged. No physics knobs were changed.

W2-PHYS-001 already showed NORMAL + neutral bounce preserves incoming vx. This ticket asks whether ordinary Left / Right can **create** those incoming states.

This proves **control possibility**, not player understanding.

---

## Hypotheses

H1. Left / Right alone can create meaningfully distinct incoming vx.

H2. Those states do not require frame-perfect timing.

H3. The differences survive an ordinary NORMAL bounce long enough to matter.

H4. The grammar is more than “hold longer = always faster”: the player can reduce existing motion.

---

## Method

Extend `CarriedMotionProbe` (same 60 Hz `stepHorizontalVelocity` write-chain). Airborne ordinary control (Auto Bounce flight). Grounded accel is faster and was not used as the primary map.

NORMAL airtime on baked CURRENT: `2 * 580 / 1400 ≈ 0.829s` (50 frames).

Excluded: LOW, BOOST, Charge, AR, Wall Jump, Wind, Ice, Rough, Spring.

---

## TABLE A — creation

Start vx = 0. Airborne. Right hold only. First frame includes the +90 press impulse, then airAccel 950/s.

| Input history | Duration | Resulting vx | Notes |
| --- | --- | --- | --- |
| A. short hold (4f) | 67ms | 153.3 | LOW_CARRY |
| B. medium hold (12f) | 200ms | 280.0 | MEDIUM_CARRY |
| C. long hold (24f) | 400ms | 420.0 | HIGH_CARRY, saturated |
| D. right 12f then coast 12f | 400ms | 180.0 | accel → neutral |
| E. from 360, opposite 1f | 17ms | 183.3 | accel → opposite tap |

Saturation: 21 frames / **350ms** to 420. After that, longer hold does not raise vx.

Sweep (1–36f): vx rises ~16/frame after the first impulse until clamp.

---

## TABLE B — reduction

From vx = 360 (already created).

| Initial vx | Input | Duration | Resulting vx | Reversed? |
| --- | --- | --- | --- | --- |
| 360 | neutral | 100ms (6f) | 310 | no |
| 360 | neutral | 200ms (12f) | 260 | no |
| 360 | neutral | 300ms (18f) | 210 | no |
| 360 | neutral | 400ms (24f) | 160 | no |
| 360 | opposite | 17ms (1f) | 183 | no |
| 360 | opposite | 33ms (2f) | 147 | no |
| 360 | opposite | 50ms (3f) | 110 | no |
| 360 | opposite | 100ms (6f) | 0 | no (hits 0) |
| 360 | opposite | 133ms (8f) | −32 | **yes** |

Neutral drag 500/s: useful intermediates over 200–400ms. Fits inside one bounce (~829ms).

Opposite uses ordinary reverse impulse (140) + reverseAccel (2200). One tap already drops ~177. Fine “reduce but do not reverse” window is about **1–5 frames** (TIGHT). Mechanism exists; it is a hard brake, not a gentle trim.

---

## TABLE C — full chain

Created airborne vx → W2-PHYS-001 NORMAL + neutral bounce → future.

| Input history | Pre-contact vx | Post-bounce vx | +100ms vx | +250ms vx | +250ms dx |
| --- | --- | --- | --- | --- | --- |
| short 67ms | 153.3 | 145.0 | 95.0 | 20.0 | 19.6 |
| medium 200ms | 280.0 | 271.7 | 221.7 | 146.7 | 51.3 |
| long 400ms | 420.0 | 411.7 | 361.7 | 286.7 | 86.3 |

Chain: **input history → arrival motion → bounce → different future**.

---

## Player-creatable bands (not production thresholds)

Approximate observation bands from the hold sweep:

| Band | vx | Hold window | Generosity |
| --- | --- | --- | --- |
| LOW_CARRY | 80–180 | 17–83ms (1–5f) | **TIGHT** |
| MEDIUM_CARRY | 180–320 | 100–233ms (6–14f) | **GENEROUS** |
| HIGH_CARRY | 320–420 | 250ms+ (15f+, then saturate) | **GENEROUS** |

A typical human tap (~80–120ms) sits on the LOW/MEDIUM boundary. Short vs medium vs long as **67 / 200 / 400ms** are not frame-perfect.

H2 holds for the useful contrast (tap / short hold / long hold). The named LOW band alone is TIGHT.

---

## Same-arrival feasibility

Monotonic same-direction holds from the same start in one flight **cannot** match x (different average vx × same airtime).

They **can** converge if one history accelerates early then coasts and another waits then holds. Best pair found in one 50-frame NORMAL flight, both |vx| ≥ 80:

| History | Arrival vx | Flight dx |
| --- | --- | --- |
| right 28f then coast 22f | 236.7 | 260.28 |
| coast 5f then right 45f | 420.0 | 260.42 |

dx gap **0.14px**, vx gap **183**. No invented room geometry — same start, same airtime, ordinary Left/Right.

A wide floor is enough to *host* this. This is not a room design.

---

## START SMALL vs REDUCE EXISTING

| Mode | Supported? | Mechanism |
| --- | --- | --- |
| A. START SMALL | yes | Short / withheld Right. Never build much vx. |
| B. REDUCE EXISTING | **yes** | Neutral coast (generous). Opposite tap/hold (strong; easy to overshoot into reverse). |

W2-K03 does **not** require Rough for a first physical reduction. Neutral release is the practical moderator. Opposite is available but aggressive.

H4 holds.

---

## Classification

**PASS**

Ordinary Left/Right can create multiple robust carried-motion states, including meaningful reduction, and those states survive a NORMAL bounce into different futures.

PASS does **not** validate W2 gameplay or readability.

Known softness (not enough to drop to PARTIAL):

- LOW named band is TIGHT
- opposite-input moderation is TIGHT if the player must not reverse
- saturation at 350ms (HIGH is “hold through most of a bounce”)

Failure-mode tags: none required. Soft notes only: LOW band timing; opposite brake is strong.

---

## Control-support findings

| Knowledge | Support |
| --- | --- |
| W2-K01 | **Supported.** Player-created LOW/MED/HIGH incoming states remain different after bounce and in +100/+250ms futures. Same-arrival with different vx is physically possible. |
| W2-K02 | **Supported.** Arrival vx is a function of earlier hold / coast / opposite history, not a surface-assigned speed. |
| W2-K03 | **Supported at control level.** REDUCE EXISTING works via neutral coast; opposite also reduces. Not yet a human-understanding test. |

---

## Confounds

- Simulation is airborne `stepHorizontalVelocity` only (no Phaser collide, no extra grounded frames).
- First-frame impulse (+90) makes 1-frame taps jump to ~106.
- Baked CURRENT (airAccel 950). Playground lab DYNAMIC (1200) would saturate faster; not retuned.
- Same-arrival search is discrete phase grids, not an exhaustive player policy.
- Bounce future uses W2-PHYS-001 same-tick grounded drag.
- Diagnostic HUD numbers from PHYS-001 are not used as evidence.

---

## Next experiment

**W2-PHYS-003 Readable Motion Contrast**

Question: can a human perceive and reason about these created carried-motion differences **without** a numeric HUD?

Diagnostic visual / readability only. Not room design. Not Wind / Ice / Rough.

---

## Files

- `src/game/debug/CarriedMotionProbe.ts` (history sim, bands, same-arrival, full chain)
- `src/game/debug/CarriedMotionProbe.test.ts`
- `docs/playtest/W2_PHYS_002.md`

No gravity / bounce / accel / reverseAccel / drag / takeoffMin / max-speed / input-timing / physics-order changes.

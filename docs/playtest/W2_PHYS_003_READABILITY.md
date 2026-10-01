# W2-PHYS-003A — Readable Motion Contrast (Exposure Harness)

Isolated diagnostic / human-test **preparation**. **Not** Human Validation. **Not** W2 room production. **Not** PLAY-002.

**HUMAN VALIDATION: PENDING**

This ticket builds the controlled visual test environment. It does **not** answer:

> Can a player perceive meaningful carried-motion differences without reading numeric velocity values?

That question is queued as **W2-PHYS-003 Human Readability Validation** in the home-test list. Company work may continue independently.

---

## Purpose

W2-PHYS-001 proved incoming carried horizontal motion survives an ordinary NORMAL + neutral bounce.

W2-PHYS-002 proved ordinary Left / Right can create multiple useful carried-motion states, including practical reduction via neutral coast, and a same-arrival / different-vx pair.

003A exposes those physical contrasts as **repeatable, world-relative comparisons** so a future human session can judge readability without a numeric HUD.

---

## Inherited findings (not retuned)

Baseline: `cursor/w2-phys-002-player-contrast-3f71` @ `66c84757c53132078d9175ff53474b759d05e21c`

Baked CURRENT (this harness pins CURRENT on launch; it does not change the knobs):

| Knob | Value |
| --- | --- |
| gravity | 1400 |
| bounceVelocity | 580 |
| airAcceleration | 950 |
| horizontalDrag | 500 |
| maxHorizontalSpeed | 420 |
| takeoffHorizontalVelocityMin | 180 |

NORMAL airtime ≈ `2 * 580 / 1400 ≈ 0.829s` (50 frames at 60 Hz).

PHYS-002 same-arrival evidence (late hold through landing) is **not** reused as-is: holding through contact would contaminate the bounce with BOOST. The harness uses an equivalent early-hold / late-hold pair that both **release ≥10 frames** before contact so landing stays NORMAL.

AR-A2 / WJ-B / Charge were **not** merged. No Wind / Ice / Rough / Spring / momentum meter.

---

## Test scenarios

Launch: keys **1 / 2 / 3 / 4** or Physics Lab **A1 / A2 / B / C**. **R** replays the active scenario. Scripts run the flight plus 24 extra neutral frames so arrival and a short future play without the tester matching the setup.

Start pose (diagnostic): x = 88, just above the floor, vx = 0, vy = −580. Same start for every condition.

Playground LOW-ceiling / platform / jump-wall solids are hidden only while a scenario is active. That is diagnostic framing so those props cannot change bounce type or eat the flight. It is **not** a production room.

| ID | Condition | Input (50f flight) | Arrival vx | Flight dx | Band |
| --- | --- | --- | --- | --- | --- |
| A1 | A same-arrive | Right 22f → coast 28f | 186.67 | 239.03 | MEDIUM |
| A2 | A same-arrive | coast 7f → Right 33f → coast 10f | 336.67 | 238.78 | HIGH |
| B | Preserve | Right 40f → coast 10f | 336.67 | 287.78 | HIGH |
| C | Reduce | Right 24f → coast 26f | 203.33 | 246.67 | MEDIUM |

All four land as **NORMAL**, intent **NONE**, takeoffMin **off**, same sign (right). No opposite-tap braking. No LOW / BOOST / Charge / AR / Wall Jump.

These numbers describe the **setup**. They are not a production perception threshold.

### Condition A — same arrival / different carry

Primary W2-K01 readability pair.

dx gap **0.25px**. vx gap **150**. After NORMAL + neutral: POST 178.33 vs 328.33; +250ms dx 27.92 vs 65.42.

Same floor, same direction, same bounce type, comparable arrival region. The later trajectories differ.

### Condition B — preserve

Useful HIGH carry continues through arrival. Same landing rule as A (trailing coast). Post-bounce +250ms dx 65.42.

### Condition C — reduce

Saturating Right (24f / 400ms) then **neutral coast** (26f) before arrival. Arrival vx 203 (MEDIUM), not LOW_CARRY. Opposite-tap is not used.

B vs C are **not** a same-arrival pair. They show preserve vs reduce on ordinary input. Compare A1 vs A2 when arrival position must stay out of the story.

---

## Display modes

**M** or Lab MODE toggles.

### MODE 1 — INSTRUMENTED

May show current vx / vy, W2 PRE / POST, retain ratio, bounce type, scenario name (`A1 same-arrive`, …), script frame. Purpose: confirm experiment integrity.

### MODE 2 — PERCEPTION

Hides numeric velocity, retain ratio, FAST/SLOW text, bounce-type ball label, and answer-revealing names. The tester may see scenario id **A1 / A2 / B / C** only. In-world motion is unchanged.

Perception mode does **not** judge the player. It only removes numeric spoilers for the future human session.

---

## World-relative references

The playground camera already shows the full 960×540 room. No production camera change.

While a scenario runs:

- floor tick marks every 80px
- start mark at x = 88
- walls / ceiling remain as stable references

Primary evidence is still displacement versus the floor and the actual path, not a fake speed widget.

---

## Visual aids

| Aid | Decision | Why |
| --- | --- | --- |
| Floor ticks | **added** | world reference if the eye follows the ball |
| Start mark | **added** | same origin, not a different start |
| A-pair arrival wash | **added** | Condition A comparability; not a scoring target |
| Contact marker | **added** | this landing |
| Previous-contact marker | **added** | compare landings without pixel-equality |
| Live trajectory dots | **added** | actual sampled positions |
| Previous-run ghost | **added** (diagnostic-only) | see Task 6 |
| Speed-colored trail | **rejected** | answers R2 |
| Momentum meter / FAST-SLOW | **rejected** | answers the test |
| Predicted-future ghost | **rejected** | not actual history |
| Vector arrow overlay | **rejected** | replaces physical movement |

Aids show **what happened**. They do not say which state is better.

---

## Ghost / replay

Implemented as a faint copy of the **previous run’s actual points**.

Benefit: A1 vs A2 (same arrival, different futures) can be compared without relying on memory.

Risks accepted and isolated:

- makes persistence (R3) easier to see
- must not be read as “this is the correct line”
- diagnostic only; no production dependency
- no fake sync — it is the last recorded path, not a predicted overlay

If a later human session finds the ghost too leading, turn it off there. Do not treat it as a design feature.

---

## Arrival-position comparison

Do not require pixel equality. Do not turn this into a landing-precision test.

Method:

- Condition A: subtle floor wash around the intended arrival (~327) plus current / previous contact diamonds
- all conditions: contact vs previous-contact markers
- automated check: A1/A2 flight dx gap < 1px (well inside a 16px band)

“They landed in the same region” is visible. “They kept different motion” is the remaining question.

---

## Integrity checks

`src/game/debug/ReadabilityHarness.test.ts` (setup only, not perception):

- each scenario: NORMAL, NONE, no takeoffMin, trailing coast ≥10f, no reverse, MEDIUM or HIGH
- A: comparable dx, vx gap ≥120, A2 > A1 after bounce and at +250ms
- B > C in arrival vx, POST vx, +100ms vx, +250ms dx
- C uses Right then coast only (no opposite)
- launch scripts stay neutral through the observation tail

---

## Future Human Validation protocol

**Do not run this as part of 003A.** Home-test queue item: W2-PHYS-003 Human Readability Validation.

Minimize leading. Reveal numbers only after the spoken response, if useful.

Suggested order (one sitting, short):

1. Perception mode. Launch **A1**. Watch through bounce and the short future. Do not talk numbers.
2. Launch **A2**. Ghost of A1 may remain. Watch.
3. Ask non-leading questions (below).
4. Ask for a prediction before a third bounce / after they take live control.
5. Optionally launch **B** then **C**.
6. Only then switch to INSTRUMENTED if you need to confirm the setup.

Questions (prefer these):

- “What looked different?”
- “What do you expect to happen next?”
- “What would you change if you wanted a different result?”

Do **not** ask: “Which one has more momentum?”

The tester may know the launch id. Do not explain that A2 is faster or that C is the reduce case.

---

## Evidence categories (score separately)

PHYS-003 Human Validation may pass R1–R3 while R4/R5 stay unresolved. Do not collapse them.

| Id | Name | Question |
| --- | --- | --- |
| R1 | Direction | Can they read which way motion continues? |
| R2 | Relative amount | Can they tell meaningfully more vs less carried horizontal motion? |
| R3 | Persistence | Can they see that the difference continues through / after the bounce? |
| R4 | Causal trace | Can they connect the later difference to something earlier? |
| R5 | Strategic use | Can they predict or choose differently because of that difference? |

Seeing “one went farther” may support R2/R3. It does **not** automatically score R4 or R5.

---

## False positives

Protect against reading:

- a different start position (starts are identical)
- a different bounce type (all NORMAL; extras hidden)
- the numeric HUD (use Perception)
- a trail that does not match the path (dots are sampled positions)
- camera motion (camera does not follow)
- a label that names the better state (Perception uses A1/A2/B/C only)
- “one went farther” as if it proved they understood *why*

---

## Status

Harness: ready for a future human session.

**HUMAN VALIDATION: PENDING**

No production threshold such as “players can perceive 80 px/s” is adopted here.

---

## Files

- `src/game/debug/ReadabilityHarness.ts`
- `src/game/debug/ReadabilityHarness.test.ts`
- `src/game/debug/ReadabilityOverlay.ts`
- `src/game/scenes/PlaygroundScene.ts`
- `src/game/debug/DebugHud.ts`
- `src/game/debug/PhysicsLab.ts`
- `docs/playtest/W2_PHYS_003_READABILITY.md`

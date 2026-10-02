# W3-EXP-003A — World-State Readability & Possibility Understanding Harness

Isolated diagnostic / human-test **preparation**. **Not** Human Validation. **Not** W3 room production. **Not** Door / Switch implementation. **Not** W4 timing. **Not** movement tuning. **Not** PLAY-002. **Not** lifecycle promotion.

**HUMAN VALIDATION: PENDING**

**HOME TEST status:** queued as **W3-EXP-003 Human Readability & Possibility Understanding**. Not run in this ticket.

This ticket prepares the evidence conditions. It does **not** answer the human-perception questions.

Do **not** collapse R1–R5 into one PASS/FAIL. A player may read the state without understanding the trade-off.

---

## Inherited physical PASS results

Baseline: `cursor/w3-exp-002-tradeoff-order-3f71` @ `db580d8e7cf09ef199ded64ffbd376cd3ce46d08`

| Prior ticket | Result | What it proved (physical only) |
| --- | --- | --- |
| W3-EXP-000 | PASS | Persistent SOLID / PASSABLE World State changes a real action possibility |
| W3-EXP-001 | PASS | Player can intentionally cause / avoid / restore. Preferred model: **SEPARATE ACTIVATOR** |
| W3-EXP-002 | PASS | Same binary state creates X = SUPPORT (SOLID) and Y = TRAVERSAL (PASSABLE). X → change → Y is a genuine logical order without timing pressure |

W2 experiment branches, AR-A2, WJ-B, Charge, and the W3 docs branch were **not** merged. No movement knobs were changed.

Authoritative interaction remains: **WorldStateProbe + Model B diagnostic activator**. Not a production Door / Switch.

---

## Authoritative physical relation

| State | X SUPPORT | Y TRAVERSAL |
| --- | --- | --- |
| STATE A — SOLID | available | unavailable |
| STATE B — PASSABLE | unavailable | available |

Separate activator: intentionally contactable, avoidable, usable for restoration. Diagnostic only.

No timer. No delay. No cycle. No W2 carried-motion requirement.

---

## Scenario definitions

These are diagnostic setups, **not** production rooms.

### A — STATE CONTRAST (R1)

Comparable observe pose `(200, 300)` at rest. BEFORE = SOLID. AFTER = PASSABLE. Activator off.

Purpose: can the tester distinguish the two world conditions from persistent, physically congruent form (filled slab vs hollow / broken slab), not from debug text.

### B — POSSIBILITY GAIN (R2)

Same traversal pose `(260, 450, vx=280)` as EXP-000/002. BEFORE = SOLID (blocked). AFTER = PASSABLE (passage). Activator off. Operator switches phase; the player does not have to discover the activator here.

Purpose: newly available traversal of the **same** occupied space.

### C — POSSIBILITY LOSS (R3)

Same support pose `(334, 360, vy=240)`. BEFORE = SOLID: player can rest / bounce on the probe top (measured support y=384). AFTER = PASSABLE: the same known approach falls through (measured fall y=504). Activator off.

Purpose: support that was just demonstrated is observably gone. Loss must not be inferred only from text.

Do **not** score R3 from “PASSABLE let me go farther.” That may support R2 only.

### D — CAUSE / EFFECT (R4)

SOLID. Model B activator visible. Live start `(140, 450)` at rest so contact is intentional (the automated cause fixture still uses vx=−280). Player must choose to move into the post.

Purpose: activator contact → state change → later possibility difference.

### E — ORDER CHOICE (R5)

SOLID. Model B on. Start `(220, 450)` at rest, between activator (left) and probe (right).

- X can be attempted before activation (go right / bounce onto the top while SOLID).
- Activator can be contacted early (go left).
- Y can be attempted when PASSABLE.
- Restoration remains possible.
- Geometry does **not** force X first.
- No timer, one-way lock, or hallway-trigger activator.

The setup allows an early-change mistake **and** correct anticipation.

---

## Display modes

**P** or Lab **INSTR / PERC**.

### MODE 1 — INSTRUMENTED

May show:

- current World State (`W3 STATE SOLID/PASSABLE`)
- activator contact
- X available yes/no
- Y available yes/no
- transition history
- scenario name + BEFORE/AFTER
- previous-state silhouette (ghost)
- `RUN CONFOUNDED overlap-refuse` if that safety rule fired

Purpose: experiment integrity. Not a player-facing answer during the human session.

### MODE 2 — PERCEPTION

Hides:

- SOLID / PASSABLE text
- X / Y availability labels
- “correct order”
- “support lost”
- “traversal gained”
- instructional arrows
- probe / activator / X / Y labels
- numeric Debug HUD

The tester may see the scenario letter **A / B / C / D / E** only. World behavior is unchanged. The player should infer from actual collision, support, and passage.

Perception automatically hides the Physics Lab so SOLID / PASSABLE / X / Y operator copy cannot leak. `L` can show it again if the operator needs it.

---

## State visual language

Neutral diagnostic differentiation. Persistent. Visible. Physically congruent. **Not color-only.**

| State | Form |
| --- | --- |
| SOLID | filled / continuous slab, thick outline |
| PASSABLE | hollow / low-fill / thinner outline |

The visual says **“the world is different.”** It does **not** say “this is the good state.” Neither state is green-good or red-bad. This is not production art.

---

## Activator feedback

The future player must notice contact → transition without text.

Perception-safe (used in both modes):

- local activator outline flash on contact / transition
- short probe outline flash when the World State actually changes
- truthful short click only when the state changes

Not created:

- “PRESS THIS”
- glowing objective arrow
- correct-order hint

The post looks like a neutral diagnostic object (thin pink post vs gold slab). Labels hide in Perception.

---

## Gain / loss readability setup

**Gain (B):** same start, same motion. SOLID occupies the space (block x=304). PASSABLE lets the same flight through (traverse x=428). Player-State comparison stays the EXP-000 traversal pair.

**Loss (C):** same start, same downward approach. SOLID supports (y=384). PASSABLE drops the player through the remembered top (y=504). No precision landing, new movement tech, or W2 momentum reading is required.

---

## Order-choice setup

Scenario E start is on the floor between the post and the probe. Going right while SOLID can still attempt X. Going left can change first. Y is only available after PASSABLE. Restore is the same post. No corridor encodes “X then switch then Y.”

---

## Future Human protocol

**Do not run this as part of 003A.** Perception hides the Physics Lab. Stay in Perception until after the spoken response.

Suggested sequence:

1. Let the tester observe / interact without numeric or explanatory HUD.
2. Ask: **「무엇이 달라진 것 같아?」**
3. After a transition ask: **「지금 할 수 있는 게 아까랑 달라진 게 있어?」**
4. Before a combined-order attempt ask: **「둘 다 해야 한다면 어떤 순서로 해볼 것 같아?」**
5. After a wrong / alternate attempt ask: **「왜 그렇게 됐다고 생각해?」**
6. Only after the response, Instrumented mode may be shown if needed.

Avoid asking:

- 「문이 열린 거지?」
- 「지지대가 사라졌지?」
- 「먼저 위에 올라가야 하지?」
- 「스위치를 누르면 통과할 수 있지?」

Score R1–R5 separately.

---

## R1–R5 evidence definitions

### R1 STATE READABILITY

**Strong evidence:** tester distinguishes the two world conditions without reading debug text (filled vs hollow **and** that one supports / one does not, or equivalent physical reading).

**False positive:** tester only notices a cosmetic difference without understanding physical state.

### R2 POSSIBILITY CREATION

**Strong evidence:** tester predicts / uses newly available traversal of the same space.

**False positive:** tester accidentally passes through.

### R3 POSSIBILITY LOSS

**Strong evidence:** tester recognizes support is no longer available and changes plan accordingly.

**False positive:** tester simply misses the landing.

**Not R3:** “I could go farther” after PASSABLE (that is R2-shaped).

### R4 CAUSAL TRACE

**Strong evidence:** tester intentionally reuses / avoids the activator to reproduce the state change.

**False positive:** tester says “something changed” but cannot connect cause.

### R5 LOGICAL ORDER

**Strong evidence:** tester chooses or corrects toward X → transition → Y because X will disappear.

**False positive:** geometry or a memorized sequence forces the order.

---

## Ghost / before-after decision

Do **not** assume a ghost is desirable.

| Aid | Class | Why |
| --- | --- | --- |
| previous-state silhouette | INSTRUMENTED-ONLY | Useful for operators; can leak “it used to be solid here” for R1/R3 |
| prior support marker | INSTRUMENTED-ONLY | Names the lost action |
| contact marker | INSTRUMENTED-ONLY | Points at the cause for R4 |
| replay / reset button | INSTRUMENTED-ONLY (operator) | Lab / `R` is fine; do not advertise as “the solution replay” |
| prior trajectory | TOO LEADING | Draws the answer path for R2/R5 |
| activator contact flash | PERCEPTION-SAFE | Truthful local contact, no instruction |
| probe transition flash | PERCEPTION-SAFE | Truthful state change, no good/bad |

Perception uses only the two flashes plus the persistent form change. No ghost.

---

## Restoration / reset behavior

- Activator restoration remains available in D and E (same contact, both directions).
- `R` deterministically resets the **current** scenario + phase. It does not skip to a later phase.
- Lab BEFORE / AFTER is an operator comparison switch, not an auto-advance.
- There is **no** auto-revert and no fast auto-reset after a transition.

The player must have time to see what changed and what was lost.

---

## False-positive protections

- A / B / C use the **same player start** across BEFORE/AFTER; only World State changes.
- B and C reuse the EXP-000/002 poses so technique / velocity are not a new variable.
- No timer, delay, cycle, or race.
- Hidden overlap-refuse is not part of any successful path. If it fires, the run is **confounded** (Instrumented may show that; Perception does not explain it).
- Activator is off for A/B/C so R1–R3 are not mixed with R4.
- D starts at rest so contact is not an automatic launch into the post.
- E does not physically force X first (rightward flight from the choice spawn never hits the post).
- Perception HUD cannot show state / X / Y / order answers.
- State visuals are form + stroke + fill, not a good/bad color pair.
- Scenario letters are allowed; they are not the solution.
- “PASSABLE let me go farther” is **not** automatic R3.

---

## Overlap-refuse isolation

Human Validation does **not** require learning “PASSABLE → SOLID is refused while overlapping.”

- A/B/C launches never start overlapping the probe.
- D/E restore from the separated post, not from inside the probe.
- Successful EXP-002 sequences already have `refused=0`.

If overlap-refuse appears during a human run, **mark that run confounded.** Do not score R1–R5 from it.

---

## Automated integrity (setup tests, not Human Validation)

`WorldStateReadability.test.ts` plus inherited EXP-000/001/002 tests:

- SOLID has X, lacks Y
- PASSABLE lacks X, has Y
- A/B/C comparable starts; only World State changes
- activator changes state, can be avoided, restores
- no timer / auto-revert / W2 mechanic
- E does not physically force X first; early activate is possible
- Perception HUD hides answer-revealing text
- overlap-refuse is not required

---

## Perception mode integrity

Automated check: Perception lines for any scenario are exactly the letter (`A`…`E`). Forbidden tokens include `W3 STATE`, `X SUPPORT`, `Y TRAVERSE`, `CAUSE CONTACT`, `correct order`, `support lost`, `traversal gained`, `PROBE SOLID/PASSABLE`.

Instrumented mode may show those lines.

---

## Lab / keys

W3 READ: A B C D E · INSTR / PERC · BEFORE / AFTER.

- `1` `2` `3` `4` `0` → A–E
- `P` → mode
- `[` `]` → BEFORE / AFTER
- `R` → reset current setup

Diagnostic only.

---

## Classification

**READY**

The harness can cleanly test R1–R5 later, with physical integrity guaranteed and without answer-revealing UI. This ticket does **not** run Human Validation.

---

## Next company step

Do **not** wait for home Human Validation.

Recommended next independent design task: **W4 TIME Knowledge Architecture v1**

Do **not** begin W3 production rooms.

---

## What this does not validate

Human understanding. Fun. Final room quality. Production Door / Switch. Final World structure. W4 timing.

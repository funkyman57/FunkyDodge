# W4-EXP-004A — Temporal Readability & Planning Harness

Human-Validation **harness preparation**. **Not** Human Validation. **Not** W4 production rooms. **Not** Timed Gate / Counter / Cycle. **Not** movement tuning. **Not** W5.

**HUMAN VALIDATION: PENDING**

**HOME TEST status:** queued as **W4-EXP-004 Human Temporal Readability & Planning**. Not run in this ticket.

Do **not** collapse T1–T5 into one pass/fail. A player may read pending without inferring cause timing, or infer timing without diagnosing preparation.

**Harness classification:** **READY**

---

## Purpose

Prepare isolated evidence conditions for later home Human Validation of the W4 temporal relation already proven physically.

| Prior ticket | Result | Physical only |
| --- | --- | --- |
| W4-EXP-000 | PASS | caused readable delayed persistent state |
| W4-EXP-001 | PASS | pending can support meaningful preparation |
| W4-EXP-002 | PASS | cause timing changes success |
| W4-EXP-003 | PASS | WRONG STATE / TIMING / PREPARATION are separable |

Human understanding is **not** answered here.

---

## Inherited relation

`cursor/w4-exp-003-temporal-diagnosis-3f71` @ `970917b85530064d5fd284278fcdbf7beac66d78`

SOLID: X support YES, Y traversal NO. PASSABLE: inverse.

Cause → ACK → PENDING (still SOLID) → delayed persistent PASSABLE. Delay **720ms**. Reactivation IGNORED. No expiry.

Known fixtures: 108,450 / 260,450 / 334,360. vx=280.

---

## T1 — CURRENT vs FUTURE STATE

**Scenario A.** Observe pose `(200, 300)` at rest. Cause already acknowledged. Progress seeded at 50%. Current remains SOLID. PASSABLE is scheduled. No X/Y planning.

**Evidence:** player expresses or behaves as if it is still this now, but will become that.

**False positive:** notices animation only; says it already changed; assumes current collision already flipped.

---

## T2 — CAUSE → PENDING LINKAGE

**Scenario B.** IDLE SOLID. Start `(140, 450)` at rest. Player must move into the activator. Probe stays SOLID, then later writes PASSABLE.

**Evidence:** player later reuses or avoids the activator because they expect the later change.

**False positive:** “something changed” without identifying the activator.

---

## T3 — TEMPORAL PROGRESS / OCCURRENCE

**Scenario C.** Cause already happened. Progress seeded at ~1/3. Observe pose `(200, 300)`. Player may act before completion.

**Evidence:** qualitative prediction — not yet / almost / after this / soon / still waiting — before the write.

**False positive:** reports only after the completion cue.

Perception progress is the rising fill + two ticks. No percent, no PENDING text, no chevron count.

---

## T4 — EARLIER IS NOT ALWAYS BETTER

**Scenario D.** EXP-002 seam. Start `(220, 450)` at rest between activator (left) and probe (right). Activate-first and X-first are both open.

**Evidence:** player selects or corrects toward X → cause → pending prep → Y because early cause loses X.

**False positives:** follows geometry; memorizes a demo; waits because told to; random retry.

---

## T5 — TEMPORAL PLAN / DIAGNOSIS

**Scenario E.** Do not name the categories. Lab E1/E2/E3 seeds only.

| Case | Seed | Expected correction class |
| --- | --- | --- |
| E1 | Y-ready during PENDING SOLID | wait / cause the write |
| E2 | too-early cause, unused X | change when cause begins |
| E3 | valid post-X cause, wait, not Y-ready | use pending differently |

**T5a / T5b / T5c stay separate.** Same generic “try again slower” for all three is a false positive.

---

## Instrumented mode

May show current / future / pending / progress / cause ack / X used / Y-ready / settle / diagnosis candidate / scenario letter / confound flag.

Lab: **INSTR**. Debug only.

---

## Perception mode

**P** or Lab **PERC**.

Hides SOLID / PASSABLE, CURRENT / FUTURE, PENDING, TOO EARLY, PREPARE NOW, X/Y labels, CORRECT ORDER, WRONG STATE / TIMING / PREPARATION, READY / NOT READY, numeric Debug HUD, Physics Lab, help copy.

Shows only the scenario letter (A–E). E subcase ids are not shown.

---

## Visual-language audit

| Cue | Class |
| --- | --- |
| SOLID filled / thick outline | PERCEPTION-SAFE (W3 language) |
| PASSABLE hollow / thin outline | PERCEPTION-SAFE |
| Perception meter fill + ticks | PERCEPTION-SAFE |
| Instrumented PENDING % / FUTURE text | INSTRUMENTED-ONLY |
| Chevron count >, >>, >>> | TOO LEADING |
| Subtle activator flash + click | PERCEPTION-SAFE |
| PREP Y / WAIT / X SUPPORT marks | INSTRUMENTED-ONLY |
| Exact prior trajectory | TOO LEADING |
| Exact future target ghost | TOO LEADING |
| Transition-history timeline | INSTRUMENTED-ONLY |

Completion of the fill matches the physical write. Pending does not become a third collision state.

---

## Progress-cue classification

Current labeled meter is **INSTRUMENTED-ONLY**. Perception uses fill + ticks only: **PERCEPTION-SAFE**. Progress is not hidden.

---

## Cause feedback

On real activator contact: local post flash + short click. No “ACTIVATED”, “PASSABLE SOON”, arrows, or instruction text.

---

## Future Human protocol

1. 지금 뭐가 일어나고 있는 것 같아?
2. 방금 네가 한 행동 때문에 무언가 달라진 것 같아?
3. 아직 바뀌지 않은 것과 곧 바뀔 것 같은 게 있어?
4. Before T4: 둘 다 해야 한다면 어떤 순서로 해볼 것 같아?
5. After failure: 왜 그렇게 된 것 같아?
6. After another failure: 이번에는 앞이랑 뭐가 달랐던 것 같아?

Instrumented mode only after the response.

Do **not** ask: 너무 일찍 눌렀지? / 먼저 X 해야 하는 거 아니야? / 준비를 안 해서 그런 거 아니야?

---

## Confound rules

Flags: MOVEMENT MISS, OVERLAP REFUSE, UNINTENDED ACTIVATOR CONTACT, REACTIVATION SPAM, SCENARIO SCRIPT ERROR, VISUAL CUE FAILURE.

A confounded run is **not** Human-knowledge evidence. Movement miss uses the known fixtures / wide Y slab / vx=280; do not retune physics.

---

## Reset / restore

**R** relaunches the current harness scenario. Immediate diagnostic restore remains available. No auto-revert. Allow time to inspect the outcome first.

---

## Home Human Validation status

**PENDING.** This ticket only prepares the harness.

Company next (do not wait for home): **W5 UNDERSTANDING Knowledge Architecture v1**.

Do not begin W4 production rooms.

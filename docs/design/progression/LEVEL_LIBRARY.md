# Level Library

Levels instantiate discoveries. They sequence into worlds.

These World 1 rows are **structural CANDIDATES**, not final levels.

**Do not implement them yet.** PLAY-002 has not started. PLAY-001B is still a playground.

Every room must have a purpose (C-08): Teach, Apply/Test, Surprise, or Reward.

---

## Schema

```text
Level ID
World
Status

Purpose
Teach / Apply / Test / Surprise / Reward

Discovery Target

Rules Used
Interactions Used
Gimmicks Used
Puzzle Patterns Used

Expected Player Hypothesis
Intended Solution
Alternate Solutions

Cognitive Difficulty
Execution Difficulty

Failure Cause
Failure Cue
Player Learnability
Reset Cost

Anti-Pattern Check

Playtest Findings
```

IDs are permanent: `LVL-W01-001` style. Do not recycle.

---

## Difficulty target

Cognitive Difficulty >= Execution Difficulty (default design target, not an invariant).

---

## World 1 structural candidates

World: `WLD-01` — HOW DO I MOVE?

| ID | Working title | Purpose (candidate) |
| --- | --- | --- |
| LVL-W01-001 | Auto Bounce observation | Teach |
| LVL-W01-002 | LEFT / RIGHT | Teach |
| LVL-W01-003 | Air / landing position control | Teach / Apply |
| LVL-W01-004 | Low Bounce introduction | Teach |
| LVL-W01-005 | Low ceiling Low Bounce application | Apply |
| LVL-W01-006 | Landing Boost introduction | Teach |
| LVL-W01-007 | Long-gap Boost application | Apply |
| LVL-W01-008 | LOW vs BOOST choice | Test / Surprise |
| LVL-W01-009 | Wall Jump introduction | Teach |
| LVL-W01-010 | Wall Jump application | Apply |
| LVL-W01-011 | Movement combination | Test |
| LVL-W01-012 | Movement mastery / first meaningful reinterpretation | Test / Surprise |

Interactions Used remain TBD until INT-001–INT-028 are imported. Do not invent INT mappings.

Gimmicks Used: none. World 1 is a movement school. Candidate gimmicks are not committed and must not be implemented from this file.

---

### LVL-W01-001 — Auto Bounce observation

| Field | Value |
| --- | --- |
| Level ID | `LVL-W01-001` |
| World | WLD-01 |
| Status | CANDIDATE |
| Purpose | Teach |
| Teach / Apply / Test / Surprise / Reward | Teach |
| Discovery Target | D0: the ball bounces by itself (R-PLAYER-001). No numbered DSC required. |
| Rules Used | R-WORLD-001; R-PLAYER-001; R-CONTACT-001 |
| Interactions Used | TBD (reserved INT set) |
| Gimmicks Used | none |
| Puzzle Patterns Used | PAT-001 Reach |
| Expected Player Hypothesis | “I need to jump.” |
| Intended Solution | Wait / move within the auto bounce. No jump button. |
| Alternate Solutions | TBD |
| Cognitive Difficulty | Low |
| Execution Difficulty | Low |
| Failure Cause | Walking off or expecting a jump |
| Failure Cue | The ball leaves the floor without a jump press |
| Player Learnability | High |
| Reset Cost | Must stay low |
| Anti-Pattern Check | ANTI-016 (do not write “you bounce automatically” as the lesson); ANTI-002 |
| Playtest Findings | none — not implemented |

---

### LVL-W01-002 — LEFT / RIGHT

| Field | Value |
| --- | --- |
| Level ID | `LVL-W01-002` |
| World | WLD-01 |
| Status | CANDIDATE |
| Purpose | Teach |
| Teach / Apply / Test / Surprise / Reward | Teach |
| Discovery Target | D0: LEFT and RIGHT steer (R-PLAYER-002) |
| Rules Used | R-PLAYER-002; R-PLAYER-001; R-MOTION-002 |
| Interactions Used | TBD |
| Gimmicks Used | none |
| Puzzle Patterns Used | PAT-001 |
| Expected Player Hypothesis | “There should be more buttons.” |
| Intended Solution | Hold or tap LEFT/RIGHT to cross. |
| Alternate Solutions | TBD |
| Cognitive Difficulty | Low |
| Execution Difficulty | Low |
| Failure Cause | No horizontal intent |
| Failure Cue | The exit is to the side; bounce alone is not enough |
| Player Learnability | High |
| Reset Cost | Must stay low |
| Anti-Pattern Check | ANTI-016; ANTI-006 |
| Playtest Findings | none |

---

### LVL-W01-003 — Air / landing position control

| Field | Value |
| --- | --- |
| Level ID | `LVL-W01-003` |
| World | WLD-01 |
| Status | CANDIDATE |
| Purpose | Teach / Apply |
| Teach / Apply / Test / Surprise / Reward | Teach, Apply |
| Discovery Target | D1: air time is for positioning; landing location is a choice |
| Rules Used | R-PLAYER-002; R-MOTION-001; R-MOTION-002; R-PLAYER-001 |
| Interactions Used | TBD |
| Gimmicks Used | none |
| Puzzle Patterns Used | PAT-001 |
| Expected Player Hypothesis | “I only steer on the ground.” |
| Intended Solution | Adjust in air so the next bounce lands where you meant. |
| Alternate Solutions | TBD |
| Cognitive Difficulty | Low–medium |
| Execution Difficulty | Low–medium (must not become the test) |
| Failure Cause | Landing off the intended surface |
| Failure Cue | Missed landing is visible |
| Player Learnability | High |
| Reset Cost | Low |
| Anti-Pattern Check | ANTI-006; ANTI-014 |
| Playtest Findings | none |

---

### LVL-W01-004 — Low Bounce introduction

| Field | Value |
| --- | --- |
| Level ID | `LVL-W01-004` |
| World | WLD-01 |
| Status | CANDIDATE |
| Purpose | Teach |
| Teach / Apply / Test / Surprise / Reward | Teach |
| Discovery Target | D0/D1 Low Bounce exists. Opens DSC-005. |
| Rules Used | R-PLAYER-003; R-PLAYER-001; R-PLAYER-002 |
| Interactions Used | TBD |
| Gimmicks Used | none |
| Puzzle Patterns Used | PAT-001 |
| Expected Player Hypothesis | “I always bounce the same height.” |
| Intended Solution | Fresh directional press at landing → LOW. Exact window is a PLAY-001B knob, not design law. |
| Alternate Solutions | TBD |
| Cognitive Difficulty | Medium |
| Execution Difficulty | Low–medium; must not be frame-perfect (ANTI-003) |
| Failure Cause | Neutral or hold landing still too high |
| Failure Cue | Full bounce hits the constraint; LOW would have passed |
| Player Learnability | Medium |
| Reset Cost | Low |
| Anti-Pattern Check | ANTI-003; ANTI-016; ANTI-015 |
| Playtest Findings | none |

Do not mark Low Bounce `CORE` from this candidate.

---

### LVL-W01-005 — Low ceiling Low Bounce application

| Field | Value |
| --- | --- |
| Level ID | `LVL-W01-005` |
| World | WLD-01 |
| Status | CANDIDATE |
| Purpose | Apply |
| Teach / Apply / Test / Surprise / Reward | Apply |
| Discovery Target | DSC-005 (candidate) |
| Rules Used | R-PLAYER-003; R-CONTACT-001 |
| Interactions Used | TBD |
| Gimmicks Used | none |
| Puzzle Patterns Used | PAT-001; PAT-016 |
| Expected Player Hypothesis | “I need more height to get through.” |
| Intended Solution | Use LOW under a low ceiling (or equivalent constraint). Geometry TBD; do not spec pixels. |
| Alternate Solutions | TBD |
| Cognitive Difficulty | Medium |
| Execution Difficulty | Below cognitive |
| Failure Cause | Full bounce |
| Failure Cue | Ceiling contact / blocked path after a high bounce |
| Player Learnability | High if 004 was taught |
| Reset Cost | Low |
| Anti-Pattern Check | ANTI-017 (must not be a clone of 004); ANTI-006 |
| Playtest Findings | none |

---

### LVL-W01-006 — Landing Boost introduction

| Field | Value |
| --- | --- |
| Level ID | `LVL-W01-006` |
| World | WLD-01 |
| Status | CANDIDATE |
| Purpose | Teach |
| Teach / Apply / Test / Surprise / Reward | Teach |
| Discovery Target | D0/D1 Landing Boost exists |
| Rules Used | R-PLAYER-004; R-PLAYER-001; R-PLAYER-002; R-MOTION-003 |
| Interactions Used | TBD |
| Gimmicks Used | none |
| Puzzle Patterns Used | PAT-001; PAT-004 |
| Expected Player Hypothesis | “Hold does the same as tap.” |
| Intended Solution | Sustained hold through landing → BOOST. Windows/multipliers are knobs. |
| Alternate Solutions | TBD |
| Cognitive Difficulty | Medium |
| Execution Difficulty | Low–medium |
| Failure Cause | Neutral bounce falls short |
| Failure Cue | Gap remains; hold landing would have carried |
| Player Learnability | Medium |
| Reset Cost | Low |
| Anti-Pattern Check | ANTI-003; ANTI-016; ANTI-007 if a fake short path exists |
| Playtest Findings | none |

Do not mark Landing Boost `CORE` from this candidate.

---

### LVL-W01-007 — Long-gap Boost application

| Field | Value |
| --- | --- |
| Level ID | `LVL-W01-007` |
| World | WLD-01 |
| Status | CANDIDATE |
| Purpose | Apply |
| Teach / Apply / Test / Surprise / Reward | Apply |
| Discovery Target | D1 application of Landing Boost; may preview DSC-017 |
| Rules Used | R-PLAYER-004; R-MOTION-001 |
| Interactions Used | TBD |
| Gimmicks Used | none |
| Puzzle Patterns Used | PAT-004; PAT-001 |
| Expected Player Hypothesis | “I need a new button for distance.” |
| Intended Solution | Planned BOOST across a long gap. |
| Alternate Solutions | TBD — do not require an exploit (ANTI-019) |
| Cognitive Difficulty | Medium |
| Execution Difficulty | Below cognitive; gap must not become a precision tax |
| Failure Cause | Neutral or LOW takeoff |
| Failure Cue | Fall short, readable |
| Player Learnability | High if 006 was taught |
| Reset Cost | Low |
| Anti-Pattern Check | ANTI-006; ANTI-018 (do not just lengthen 006) |
| Playtest Findings | none |

---

### LVL-W01-008 — LOW vs BOOST choice

| Field | Value |
| --- | --- |
| Level ID | `LVL-W01-008` |
| World | WLD-01 |
| Status | CANDIDATE |
| Purpose | Test / Surprise |
| Teach / Apply / Test / Surprise / Reward | Test, Surprise |
| Discovery Target | DSC-005 and/or DSC-006 (candidates). Choice is real (not ANTI-007). |
| Rules Used | R-PLAYER-003; R-PLAYER-004 |
| Interactions Used | TBD |
| Gimmicks Used | none |
| Puzzle Patterns Used | PAT-002; PAT-016 |
| Expected Player Hypothesis | “One of these is always correct.” |
| Intended Solution | TBD — the room must make the *choice* the lesson. Do not invent a single forced path in this bootstrap. |
| Alternate Solutions | Both bounce types should be meaningful if this remains a choice room. |
| Cognitive Difficulty | Medium–high |
| Execution Difficulty | Below cognitive |
| Failure Cause | Using the bounce type the chosen route refuses |
| Failure Cue | Route constraint (ceiling vs gap) readable |
| Player Learnability | Medium |
| Reset Cost | Low–medium |
| Anti-Pattern Check | ANTI-007 Fake Choice; ANTI-015 |
| Playtest Findings | none |

---

### LVL-W01-009 — Wall Jump introduction

| Field | Value |
| --- | --- |
| Level ID | `LVL-W01-009` |
| World | WLD-01 |
| Status | CANDIDATE |
| Purpose | Teach |
| Teach / Apply / Test / Surprise / Reward | Teach |
| Discovery Target | D0/D1 Wall Jump: leave up and away |
| Rules Used | R-PLAYER-005; R-CONTACT-001; R-PLAYER-002 |
| Interactions Used | TBD |
| Gimmicks Used | none |
| Puzzle Patterns Used | PAT-001 |
| Expected Player Hypothesis | “Walls only block me.” |
| Intended Solution | Press away from a touched wall. Must go up and away. |
| Alternate Solutions | TBD |
| Cognitive Difficulty | Medium |
| Execution Difficulty | Low–medium; buffer is a knob, not a frame lock |
| Failure Cause | No opposing intent; or expecting a downward kick |
| Failure Cue | Slide down vs leave up and out |
| Player Learnability | Medium |
| Reset Cost | Low |
| Anti-Pattern Check | ANTI-016; ANTI-003; ANTI-019 |
| Playtest Findings | none |

Do not mark Wall Jump `CORE` from this candidate.

---

### LVL-W01-010 — Wall Jump application

| Field | Value |
| --- | --- |
| Level ID | `LVL-W01-010` |
| World | WLD-01 |
| Status | CANDIDATE |
| Purpose | Apply |
| Teach / Apply / Test / Surprise / Reward | Apply |
| Discovery Target | D1 Wall Jump as a tool |
| Rules Used | R-PLAYER-005 |
| Interactions Used | TBD |
| Gimmicks Used | none |
| Puzzle Patterns Used | PAT-001; PAT-016 |
| Expected Player Hypothesis | “Wall Jump was a one-room trick.” |
| Intended Solution | Reuse wall bounce to reach a new place. Layout TBD. |
| Alternate Solutions | TBD |
| Cognitive Difficulty | Medium |
| Execution Difficulty | Below cognitive |
| Failure Cause | Ignoring the wall or using only floor bounce |
| Failure Cue | Unreachable exit without the wall |
| Player Learnability | High if 009 was taught |
| Reset Cost | Low |
| Anti-Pattern Check | ANTI-017; ANTI-006; ANTI-008 (Wall Jump must not be single-use) |
| Playtest Findings | none |

---

### LVL-W01-011 — Movement combination

| Field | Value |
| --- | --- |
| Level ID | `LVL-W01-011` |
| World | WLD-01 |
| Status | CANDIDATE |
| Purpose | Test |
| Teach / Apply / Test / Surprise / Reward | Test |
| Discovery Target | PAT-017 Combination Discovery — two taught movement rules together. Exact pair TBD; do not invent a new mechanic. |
| Rules Used | Subset of R-PLAYER-001…005 and R-MOTION-001…003 already taught |
| Interactions Used | TBD |
| Gimmicks Used | none |
| Puzzle Patterns Used | PAT-017 |
| Expected Player Hypothesis | “I use one tool at a time.” |
| Intended Solution | TBD after playtest of the taught tools. Must not introduce a new gimmick (ANTI-020). |
| Alternate Solutions | PAT-022 welcome if fair |
| Cognitive Difficulty | High |
| Execution Difficulty | Below cognitive |
| Failure Cause | Using only one of the required tools |
| Failure Cue | Each half-solution stalls readably |
| Player Learnability | Medium |
| Reset Cost | Medium at most |
| Anti-Pattern Check | ANTI-011; ANTI-020; ANTI-006; ANTI-002 |
| Playtest Findings | none |

---

### LVL-W01-012 — Movement mastery / first meaningful reinterpretation

| Field | Value |
| --- | --- |
| Level ID | `LVL-W01-012` |
| World | WLD-01 |
| Status | CANDIDATE |
| Purpose | Test / Surprise |
| Teach / Apply / Test / Surprise / Reward | Test, Surprise |
| Discovery Target | First meaningful reinterpretation. Signature candidates: DSC-006 and/or DSC-017. PAT-016 / PAT-009 / PAT-015. |
| Rules Used | Taught World 1 movement rules only |
| Interactions Used | TBD |
| Gimmicks Used | none |
| Puzzle Patterns Used | PAT-016; optionally PAT-009, PAT-015, PAT-022 |
| Expected Player Hypothesis | The World 1 defaults (higher is better; Low is only “under”; a place is a place). |
| Intended Solution | TBD — must come from possibility inside known rules, not a new object. |
| Alternate Solutions | TBD |
| Cognitive Difficulty | High |
| Execution Difficulty | Must feel achievable once understood |
| Failure Cause | Applying only first-face movement |
| Failure Cue | The old plan fails for a visible reason |
| Player Learnability | The failure must teach |
| Reset Cost | Medium at most |
| Anti-Pattern Check | ANTI-002; ANTI-005; ANTI-019; ANTI-020; ANTI-006; ANTI-013 |
| Playtest Findings | none |

This is not a visual or narrative finale. Visual themes are not locked.

---

## Later worlds

Do not add `LVL-W02-*` in this bootstrap. Worlds 2–5 are conceptual only (see WORLD_LIBRARY).

---

## Implementation boundary

- Do not build these rooms in the playground as a campaign.
- Do not freeze movement parameters to make a candidate room “work.”
- When a room is later implemented, fill Playtest Findings and only then consider VALIDATED.
- Implementation does not validate a level.

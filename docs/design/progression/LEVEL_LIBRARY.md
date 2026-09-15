# Level Library

Levels instantiate discoveries. They sequence into worlds.

All W1–W5 rows are **progression candidates** (60 slots, not a ship count). Official lifecycle status: `CANDIDATE`. Do not add a new lifecycle state. Documentation is not validation. Do not promote to EXPERIMENTAL / VALIDATED / CORE from this file.

**Do not implement these rooms.** PLAY-002 has not started. PLAY-001B feel validation is pending. Do not start W4 implementation.

Geometry, spacing, force strength, friction coefficients, velocities, bounce heights, counts, and timing windows: `TBD — after PLAY-001B / relevant prototype validation`.

Knowledge Graphs and Gates: [WORLD_LIBRARY.md](WORLD_LIBRARY.md). Vocabulary: [DESIGN_SYSTEM.md](../DESIGN_SYSTEM.md). Do not assign `PAT-001` merely because a room has an exit.

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

Additional progression fields used below: Knowledge, Expected realization, Geometry. They do not change the official lifecycle.

IDs are permanent. Do not recycle.

Difficulty target: Cognitive >= Execution (default, not an invariant).

---

## Index

### WLD-01 — 12

| ID | Title | Purpose |
| --- | --- | --- |
| LVL-W01-001 | It Bounces | TEACH / OBSERVE |
| LVL-W01-002 | I Can Bend It | TEACH |
| LVL-W01-003 | Change Your Mind | TEST |
| LVL-W01-004 | Stay Low | TEACH |
| LVL-W01-005 | Low != Slow | APPLY / REWARD candidate |
| LVL-W01-006 | Hold It | TEACH |
| LVL-W01-007 | Three Answers | TEST |
| LVL-W01-008 | The Wall | TEACH |
| LVL-W01-009 | Walls Are Routes | APPLY / REINTERPRET |
| LVL-W01-010 | Arrive Correctly | TEST |
| LVL-W01-011 | Choose Your Bounce | COMBINE |
| LVL-W01-012 | Same Space, Different Ball | SURPRISE / MASTERY |

Gimmicks: none.

### WLD-02 — 12

| ID | Title | Purpose |
| --- | --- | --- |
| LVL-W02-001 | Something Is Pushing Me | TEACH |
| LVL-W02-002 | Ride the Wind | APPLY / REWARD candidate |
| LVL-W02-003 | Fight the Wind | TEST |
| LVL-W02-004 | Let It Stop You | SURPRISE / REINTERPRET |
| LVL-W02-005 | Keep Moving | TEACH |
| LVL-W02-006 | Store It | REINTERPRET / REWARD candidate |
| LVL-W02-007 | The Rough Patch | TEACH |
| LVL-W02-008 | Stop on Purpose | SURPRISE |
| LVL-W02-009 | Build It | TEST / SETUP |
| LVL-W02-010 | Spend It | COMBINE |
| LVL-W02-011 | Enter Differently | REINTERPRET |
| LVL-W02-012 | Momentum Laboratory | MASTERY |

Gimmicks: Wind, Ice, Rough only. No Spring.

### WLD-03 — 12

| ID | Title | Purpose |
| --- | --- | --- |
| LVL-W03-001 | Closed | TEACH |
| LVL-W03-002 | State | APPLY |
| LVL-W03-003 | Set It First | TEST |
| LVL-W03-004 | Don't Open It | SURPRISE / REINTERPRET |
| LVL-W03-005 | Use It, Then Open It | APPLY / ORDER / REWARD candidate |
| LVL-W03-006 | Opening Can Be Wrong | REINTERPRET |
| LVL-W03-007 | Switch Again | REINTERPRET / APPLY |
| LVL-W03-008 | Movement Before State | TEST |
| LVL-W03-009 | Which First? | ORDER |
| LVL-W03-010 | Same Door, Different Job | REINTERPRET |
| LVL-W03-011 | Door × Momentum | COMBINE |
| LVL-W03-012 | The Door Is Not a Door | MASTERY / REINTERPRET |

Gimmicks: Door, Switch only. No Moving Block / One-way Surface.

### WLD-04 — 12

| ID | Title | Purpose |
| --- | --- | --- |
| LVL-W04-001 | One, Two, Three | TEACH |
| LVL-W04-002 | Count Your Steps | APPLY |
| LVL-W04-003 | One More Bounce | REINTERPRET / APPLY / REWARD candidate |
| LVL-W04-004 | Don't Move | REINTERPRET |
| LVL-W04-005 | Open for a While | TEACH |
| LVL-W04-006 | Which Bounce? | TEST |
| LVL-W04-007 | Wait for the Window | REINTERPRET / SYNCHRONIZATION |
| LVL-W04-008 | Not Yet | TEACH |
| LVL-W04-009 | Leave Before It Happens | APPLY |
| LVL-W04-010 | Set the Future | COMBINE |
| LVL-W04-011 | Meet Me There | SYNCHRONIZATION / TEST |
| LVL-W04-012 | The Right Time | MASTERY |

Gimmicks: Bounce Counter, Timed Gate, Delayed Switch (or Switch+Delay). Planning, not twitch.

### WLD-05 — 12

| ID | Title | Purpose |
| --- | --- | --- |
| LVL-W05-001 | You Know This | RECALL |
| LVL-W05-002 | Another Answer | APPLY / ALTERNATE SOLUTION |
| LVL-W05-003 | Wrong Way | REINTERPRET |
| LVL-W05-004 | Fall | REINTERPRET |
| LVL-W05-005 | Give It Up | REINTERPRET |
| LVL-W05-006 | Close It | REINTERPRET |
| LVL-W05-007 | Too Early | REINTERPRET / TIME |
| LVL-W05-008 | Waste a Bounce | REINTERPRET / RESOURCE ALLOCATION |
| LVL-W05-009 | Three Old Things | COMBINE |
| LVL-W05-010 | Same Room, New Rules? | REINTERPRET / APPLY / REWARD candidate |
| LVL-W05-011 | Make Your Own Route | MASTERY / ALTERNATE SOLUTION |
| LVL-W05-012 | What Do I Really Know? | FINAL MASTERY |

Gimmicks: none new. New Rule target 0.

---

## World 1

### LVL-W01-001 — It Bounces

| Field | Value |
| --- | --- |
| Status | CANDIDATE |
| Purpose | TEACH / OBSERVE |
| Knowledge | Auto Bounce |
| Discovery Target | none numbered |
| Rules Used | R-PLAYER-001 |
| Interactions Used | none |
| Gimmicks Used | none |
| Puzzle Patterns Used | none — arriving is not the puzzle |
| Expected Player Hypothesis | “I need to jump.” |
| Expected realization | “The ball keeps bouncing by itself.” |
| Intended Solution | Observe continuous bounce. No jump input. No meaningful failure required for the lesson. |
| Alternate Solutions | n/a |
| Cognitive / Execution | Observation; execution must stay trivial |
| Geometry | TBD — after PLAY-001B feel validation |
| Anti-Pattern Check | Structurally: ANTI-016. Playtest: whether observation is skipped. |
| Playtest Findings | none |

---

### LVL-W01-002 — I Can Bend It

| Field | Value |
| --- | --- |
| Status | CANDIDATE |
| Purpose | TEACH |
| Knowledge | Directional Control |
| Discovery Target | none numbered |
| Rules Used | R-PLAYER-002; R-PLAYER-001 |
| Interactions Used | INT-006 |
| Gimmicks Used | none |
| Puzzle Patterns Used | none unless trajectory construction *is* the ask |
| Expected realization | “I influence the trajectory rather than command a jump.” |
| Intended Solution | Directional input changes the Auto Bounce trajectory. |
| Geometry | TBD — after PLAY-001B feel validation |
| Gates | Contributes to W1-GATE-1 |
| Anti-Pattern Check | Structurally: ANTI-016. Playtest: ANTI-006 if the first steer is a precision tax. |
| Playtest Findings | none |

---

### LVL-W01-003 — Change Your Mind

| Field | Value |
| --- | --- |
| Status | CANDIDATE |
| Purpose | TEST |
| Knowledge | Air Steering; Counter Steering (intent change in flight; not a new Rule ID) |
| Discovery Target | none numbered |
| Rules Used | R-PLAYER-002; R-MOTION-001; R-MOTION-002 |
| Interactions Used | INT-006 |
| Gimmicks Used | none |
| Puzzle Patterns Used | none assigned |
| Expected realization | “My decision is not finished after takeoff.” |
| Intended Solution | Change direction after committing to an airborne trajectory. |
| Geometry | TBD — after PLAY-001B feel validation. Feel validation required before any geometry. |
| Gates | W1-GATE-1 |
| Anti-Pattern Check | Requires playtest: ANTI-003 / ANTI-006 if reverse is frame-tight. |
| Playtest Findings | none |

---

### LVL-W01-004 — Stay Low

| Field | Value |
| --- | --- |
| Status | CANDIDATE |
| Purpose | TEACH |
| Knowledge | Low Bounce |
| Discovery Target | opens DSC-005 (not declared realized) |
| Rules Used | R-PLAYER-003; R-PLAYER-001; R-PLAYER-002 |
| Interactions Used | INT-007 |
| Gimmicks Used | none |
| Puzzle Patterns Used | PAT-001 only if the low trajectory *is* the puzzle |
| Expected realization | A lower trajectory can be the useful one. |
| Intended Solution | Introduce LOW via a spatial situation where lower is meaningful. Ceiling/geometry TBD — after PLAY-001B. |
| Anti-Pattern Check | Structurally: ANTI-016. Requires playtest: ANTI-003 (fresh-press window). |
| Playtest Findings | none |

Do not mark Low Bounce `CORE`.

---

### LVL-W01-005 — Low != Slow

| Field | Value |
| --- | --- |
| Status | CANDIDATE |
| Purpose | APPLY / REWARD candidate |
| Knowledge | Repeated LOW; LOW + horizontal movement |
| Discovery Target | DSC-006 seed. Do not declare DSC-006 realized until playtest supports the room. |
| Rules Used | R-PLAYER-003; R-MOTION-001 |
| Interactions Used | INT-008 |
| Gimmicks Used | none |
| Puzzle Patterns Used | PAT-016 |
| Expected realization | LOW is not only “fit under a ceiling.” |
| Intended Solution | Repeated LOW travel. Desired feel: tap → swoosh → tap → swoosh. Not a numeric spec. |
| Geometry | TBD — after PLAY-001B feel validation |
| Anti-Pattern Check | Structurally: ANTI-017 vs 004 (different job). Playtest: whether LOW still reads as “weak.” |
| Playtest Findings | none |

---

### LVL-W01-006 — Hold It

| Field | Value |
| --- | --- |
| Status | CANDIDATE |
| Purpose | TEACH |
| Knowledge | Landing Boost; landing-intent distinction |
| Discovery Target | none numbered |
| Rules Used | R-PLAYER-004; R-PLAYER-001; R-PLAYER-002 |
| Interactions Used | none specified — teach of a player-rule variation |
| Gimmicks Used | none |
| Puzzle Patterns Used | none assigned |
| Expected realization | Hold vs tap at landing are different choices. |
| Intended Solution | Experimental grammar (PLAY-001B, not frozen): fresh press near landing → LOW; sustained hold before landing → BOOST; no directional intent → NORMAL. Do not freeze windows here. |
| Geometry | TBD — after PLAY-001B feel validation |
| Anti-Pattern Check | Requires playtest: ANTI-003. Structurally: ANTI-016. |
| Playtest Findings | none |

Do not mark Landing Boost `CORE`.

---

### LVL-W01-007 — Three Answers

| Field | Value |
| --- | --- |
| Status | CANDIDATE |
| Purpose | TEST |
| Knowledge | LOW; NORMAL; BOOST; Bounce Choice |
| Discovery Target | DSC-005 |
| Rules Used | R-PLAYER-003; R-PLAYER-004; R-PLAYER-001 |
| Interactions Used | INT-007; INT-008 |
| Gimmicks Used | none |
| Puzzle Patterns Used | PAT-002 if more than one viable bounce is real |
| Expected realization | Bounce height is a choice, not a power level. LOW ≠ weak. BOOST ≠ better. |
| Intended Solution | Deliberately distinguish bounce types. Exact layout TBD — after PLAY-001B. |
| Gates | W1-GATE-2 |
| Anti-Pattern Check | Structurally: ANTI-007 if only one type works. Requires playtest: ANTI-015. |
| Playtest Findings | none |

---

### LVL-W01-008 — The Wall

| Field | Value |
| --- | --- |
| Status | CANDIDATE |
| Purpose | TEACH |
| Knowledge | Wall Contact; Wall Jump |
| Discovery Target | opens DSC-010 |
| Rules Used | R-PLAYER-005; R-CONTACT-001; R-PLAYER-002 |
| Interactions Used | INT-013 |
| Gimmicks Used | none |
| Puzzle Patterns Used | none assigned |
| Expected realization | A solid wall is part of movement. |
| Intended Solution | Spatial teach. Do not require explanatory text if space can show it. Must leave up and away. |
| Geometry | TBD — after PLAY-001B feel validation |
| Anti-Pattern Check | Structurally: ANTI-016. Playtest: ANTI-003 / ANTI-019. |
| Playtest Findings | none |

Do not mark Wall Jump `CORE`.

---

### LVL-W01-009 — Walls Are Routes

| Field | Value |
| --- | --- |
| Status | CANDIDATE |
| Purpose | APPLY / REINTERPRET |
| Knowledge | Wall as movement tool |
| Discovery Target | DSC-010 |
| Previous Assumption | Wall = restriction |
| New understanding | Wall = trajectory-changing tool |
| Rules Used | R-PLAYER-005; R-CONTACT-001; R-MOTION-001 |
| Interactions Used | INT-013 |
| Gimmicks Used | none |
| Puzzle Patterns Used | PAT-016 |
| Intended Solution | Reuse wall bounce as a route. Layout TBD — after PLAY-001B. |
| Gates | W1-GATE-3 |
| Anti-Pattern Check | Structurally: ANTI-008 / ANTI-017 vs 008. Playtest: ANTI-006. |
| Playtest Findings | none |

---

### LVL-W01-010 — Arrive Correctly

| Field | Value |
| --- | --- |
| Status | CANDIDATE |
| Purpose | TEST |
| Knowledge | Momentum; Entry State; wall interaction |
| Discovery Target | DSC-017 seed |
| Rules Used | R-MOTION-001; R-CONTACT-001 |
| Interactions Used | INT-013; INT-006 |
| Gimmicks Used | none |
| Puzzle Patterns Used | PAT-015 |
| Expected realization | The same wall/location differs by how you arrive. |
| Intended Solution | TBD — after PLAY-001B. No numeric entry thresholds. |
| Gates | W1-GATE-3 |
| Anti-Pattern Check | Structurally: C-01 (geometry unchanged). Requires playtest: ANTI-015 / ANTI-006. |
| Playtest Findings | none |

---

### LVL-W01-011 — Choose Your Bounce

| Field | Value |
| --- | --- |
| Status | CANDIDATE |
| Purpose | COMBINE |
| Knowledge | Possible vocabulary: LOW, NORMAL, BOOST, Air Steering, Wall Jump, Momentum |
| Discovery Target | DSC-015 possible; exact pair not assigned |
| Rules Used | Taught W1 player/motion rules only |
| Interactions Used | Room-defined. Do not invent a default pair or a new INT. |
| Gimmicks Used | none |
| Puzzle Patterns Used | PAT-017 |
| Expected realization | Choosing the correct movement vocabulary is the puzzle. |
| Intended Solution | Do **not** assign an exact canonical combination yet. |
| Geometry | TBD — after PLAY-001B feel validation |
| Gates | W1-GATE-4 |
| Anti-Pattern Check | Structurally: ANTI-020, ANTI-011. Requires playtest: ANTI-006 / ANTI-015. |
| Playtest Findings | none |

---

### LVL-W01-012 — Same Space, Different Ball

| Field | Value |
| --- | --- |
| Status | CANDIDATE |
| Purpose | SURPRISE / MASTERY |
| Knowledge | Movement State; no new Rule; no new Gimmick |
| Discovery Target | Primary DSC-017. Supporting: DSC-005, DSC-006 |
| Rules Used | Taught W1 rules only |
| Interactions Used | INT-013 and/or INT-008 matching the chosen discovery |
| Gimmicks Used | none |
| Puzzle Patterns Used | PAT-015; PAT-016 |
| Expected realization | A familiar-looking space changes with Movement State. |
| Intended Solution | TBD. |
| Geometry | TBD — after PLAY-001B feel validation |
| Anti-Pattern Check | Structurally: ANTI-002, ANTI-020. Requires playtest: ANTI-005, ANTI-019, ANTI-006, ANTI-013. |
| Playtest Findings | none |

---

## World 2

### LVL-W02-001 — Something Is Pushing Me

| Field | Value |
| --- | --- |
| Status | CANDIDATE |
| Purpose | TEACH |
| Knowledge | Environmental force changes trajectory |
| Discovery Target | none numbered |
| Rules Used | R-FORCE-001; R-PLAYER-001 |
| Interactions Used | INT-001 |
| Gimmicks Used | GIM-003 Wind |
| Puzzle Patterns Used | none assigned |
| Expected realization | Something outside my input bends the bounce. |
| Geometry | TBD — after PLAY-001B feel validation. Wind strength not specified. |
| Gates | W2-GATE-1 |
| Anti-Pattern Check | Structurally: ANTI-001 if wind is visible. Playtest: readability. |
| Playtest Findings | none |

---

### LVL-W02-002 — Ride the Wind

| Field | Value |
| --- | --- |
| Status | CANDIDATE |
| Purpose | APPLY / REWARD candidate |
| Knowledge | Input and environmental force can reinforce |
| Rules Used | R-PLAYER-002; R-FORCE-001 |
| Interactions Used | INT-001; INT-017 |
| Gimmicks Used | GIM-003 |
| Puzzle Patterns Used | none assigned |
| Intended Solution | Move with the force. |
| Geometry | TBD — after PLAY-001B feel validation |
| Gates | W2-GATE-2 (with) |
| Anti-Pattern Check | Structurally: ANTI-017 vs 001. Playtest: ANTI-006. |
| Playtest Findings | none |

---

### LVL-W02-003 — Fight the Wind

| Field | Value |
| --- | --- |
| Status | CANDIDATE |
| Purpose | TEST |
| Knowledge | Wind is a force, not an instruction |
| Rules Used | R-FORCE-001; R-PLAYER-002 |
| Interactions Used | INT-001; INT-017 |
| Gimmicks Used | GIM-003 |
| Puzzle Patterns Used | none assigned |
| Expected realization | “Wind is a force, not an instruction.” |
| Intended Solution | Move against the force. |
| Geometry | TBD — after PLAY-001B feel validation |
| Gates | W2-GATE-2 (against) |
| Anti-Pattern Check | Requires playtest: ANTI-006 if fighting is only a grind. |
| Playtest Findings | none |

---

### LVL-W02-004 — Let It Stop You

| Field | Value |
| --- | --- |
| Status | CANDIDATE |
| Purpose | SURPRISE / REINTERPRET |
| Knowledge | Wind Second Face |
| Discovery Target | DSC-002 |
| Rules Used | R-FORCE-001; R-MOTION-001 |
| Interactions Used | INT-001; INT-017 |
| Gimmicks Used | GIM-003 |
| Puzzle Patterns Used | PAT-016 |
| First Face | Helps movement in its direction |
| Second Face | Can deliberately reduce or alter unwanted movement |
| Geometry | TBD — after PLAY-001B feel validation |
| Gates | W2-GATE-2 |
| Anti-Pattern Check | Structurally: C-06, C-07. Requires playtest: ANTI-015. |
| Playtest Findings | none |

---

### LVL-W02-005 — Keep Moving

| Field | Value |
| --- | --- |
| Status | CANDIDATE |
| Purpose | TEACH |
| Knowledge | Low friction preserves motion |
| Discovery Target | opens DSC-003 |
| Rules Used | R-CONTACT-003 low; R-MOTION-001; R-PLAYER-001 |
| Interactions Used | INT-003; INT-014 |
| Gimmicks Used | GIM-004 Ice |
| Puzzle Patterns Used | PAT-004 |
| Geometry | TBD — after PLAY-001B feel validation. No friction coefficient. |
| Gates | W2-GATE-3 |
| Anti-Pattern Check | Structurally: one Friction rule, low config. Playtest: ANTI-001 if ice is not readable. |
| Playtest Findings | none |

---

### LVL-W02-006 — Store It

| Field | Value |
| --- | --- |
| Status | CANDIDATE |
| Purpose | REINTERPRET / REWARD candidate |
| Knowledge | Ice as momentum storage |
| Discovery Target | DSC-003 |
| Rules Used | R-CONTACT-003 low; R-FORCE-001; R-MOTION-001 |
| Interactions Used | INT-016; INT-003; INT-014 |
| Gimmicks Used | GIM-004; GIM-003 if the gain step uses wind |
| Puzzle Patterns Used | PAT-003; PAT-004 |
| Conceptual sequence | gain speed → preserve speed → leave force/surface → use preserved momentum |
| Geometry | TBD — after PLAY-001B feel validation |
| Gates | W2-GATE-3 |
| Anti-Pattern Check | Structurally: no new INT. Requires playtest: ANTI-015. |
| Playtest Findings | none |

---

### LVL-W02-007 — The Rough Patch

| Field | Value |
| --- | --- |
| Status | CANDIDATE |
| Purpose | TEACH |
| Knowledge | High friction removes horizontal motion more strongly. Initially appears disadvantageous. |
| Rules Used | R-CONTACT-003 high |
| Interactions Used | INT-004; INT-015 |
| Gimmicks Used | GIM-005 Rough Surface |
| Puzzle Patterns Used | none assigned |
| Geometry | TBD — after PLAY-001B feel validation |
| Gates | Opens W2-GATE-4 |
| Anti-Pattern Check | Structurally: same Friction rule as Ice. Playtest: ANTI-009 if it only ruins runs. |
| Playtest Findings | none |

---

### LVL-W02-008 — Stop on Purpose

| Field | Value |
| --- | --- |
| Status | CANDIDATE |
| Purpose | SURPRISE |
| Knowledge | The correct speed is better than more speed |
| Discovery Target | DSC-004; DSC-009 |
| Rules Used | R-CONTACT-003 high; R-MOTION-001 |
| Interactions Used | INT-015 |
| Gimmicks Used | GIM-005 |
| Puzzle Patterns Used | PAT-005 |
| Expected realization | “More speed is not always better. The correct speed is better.” |
| Geometry | TBD — after PLAY-001B feel validation |
| Gates | W2-GATE-4 |
| Anti-Pattern Check | Structurally: C-06. Requires playtest: ANTI-015. |
| Playtest Findings | none |

---

### LVL-W02-009 — Build It

| Field | Value |
| --- | --- |
| Status | CANDIDATE |
| Purpose | TEST / SETUP |
| Knowledge | Create useful Movement State before the apparent objective |
| Discovery Target | DSC-008. Seed: DSC-007 |
| Rules Used | R-MOTION-001 |
| Interactions Used | INT-006; INT-014 where a preserve surface is used |
| Gimmicks Used | already-introduced W2 surfaces only if needed |
| Puzzle Patterns Used | PAT-003; PAT-004; PAT-018 if the setup is a detour |
| Geometry | TBD — after PLAY-001B feel validation |
| Gates | W2-GATE-5 |
| Anti-Pattern Check | Structurally: ANTI-018 (no mandated lap count). Requires playtest. |
| Playtest Findings | none |

---

### LVL-W02-010 — Spend It

| Field | Value |
| --- | --- |
| Status | CANDIDATE |
| Purpose | COMBINE |
| Knowledge | Manage a momentum life-cycle |
| Conceptual reasoning | BUILD → PRESERVE → USE → KILL → LAND |
| Discovery Target | none new required |
| Rules Used | Taught W2 force/friction + W1 movement |
| Interactions Used | Existing INT-003, INT-014, INT-015, INT-016 as the room needs. No new INT. |
| Gimmicks Used | Introduced W2 set only |
| Puzzle Patterns Used | PAT-017 |
| UI | Do not expose these words as meters or resource UI |
| Geometry | TBD — after PLAY-001B feel validation |
| Gates | W2-GATE-6 |
| Anti-Pattern Check | Structurally: ANTI-011 / ANTI-020. Requires playtest: ANTI-006. |
| Playtest Findings | none |

---

### LVL-W02-011 — Enter Differently

| Field | Value |
| --- | --- |
| Status | CANDIDATE |
| Purpose | REINTERPRET |
| Knowledge | Entry Movement State |
| Discovery Target | DSC-017 |
| Rules Used | R-MOTION-001; R-CONTACT-001 |
| Interactions Used | INT-013; INT-006 |
| Gimmicks Used | none new |
| Puzzle Patterns Used | PAT-015 |
| Conceptual states | too slow; useful speed; too fast; controlled entry — not numeric thresholds |
| Geometry | TBD — after PLAY-001B feel validation |
| Gates | W2-GATE-6 |
| Anti-Pattern Check | Structurally: C-01. Requires playtest: ANTI-015. |
| Playtest Findings | none |

---

### LVL-W02-012 — Momentum Laboratory

| Field | Value |
| --- | --- |
| Status | CANDIDATE |
| Purpose | MASTERY |
| Knowledge | No new Rule. No new Gimmick. |
| Discovery Target | DSC-003; DSC-009; DSC-017 |
| Rules Used | Taught W1+W2 only |
| Interactions Used | Existing momentum/friction/force IDs only |
| Gimmicks Used | none new |
| Puzzle Patterns Used | Primary PAT-004. Secondary PAT-005, PAT-017 |
| World conclusion | “Speed is not simply an outcome. It is something I manage.” |
| Geometry | TBD — after PLAY-001B feel validation |
| Anti-Pattern Check | Structurally: ANTI-020. Requires playtest: ANTI-006 / ANTI-011. |
| Playtest Findings | none |

---

## World 3

### LVL-W03-001 — Closed

| Field | Value |
| --- | --- |
| Status | CANDIDATE |
| Purpose | TEACH |
| Knowledge | Switch → Door opens → Pass. Establish: Door = obstacle that should be opened. |
| Rules Used | R-STATE-001; R-SIGNAL-001; R-CONTACT-001 |
| Interactions Used | INT-021; INT-022 |
| Gimmicks Used | GIM-001; GIM-002 |
| Puzzle Patterns Used | PAT-006 (simple) |
| Geometry | TBD — after PLAY-001B feel validation |
| Gates | W3-GATE-1 |
| Anti-Pattern Check | Structurally: ANTI-016 (space, not text). Playtest: first-face stickiness for later surprise. |
| Playtest Findings | none |

---

### LVL-W03-002 — State

| Field | Value |
| --- | --- |
| Status | CANDIDATE |
| Purpose | APPLY |
| Knowledge | CLOSED blocks; OPEN permits; Switch changes Door state. No reinterpretation yet. |
| Rules Used | R-STATE-001; R-SIGNAL-001 |
| Interactions Used | INT-021; INT-022; INT-028 |
| Gimmicks Used | GIM-001; GIM-002 |
| Puzzle Patterns Used | none assigned |
| Geometry | TBD — after PLAY-001B feel validation |
| Gates | W3-GATE-1 |
| Anti-Pattern Check | Structurally: ANTI-017 vs 001 (apply, not clone). Playtest. |
| Playtest Findings | none |

---

### LVL-W03-003 — Set It First

| Field | Value |
| --- | --- |
| Status | CANDIDATE |
| Purpose | TEST |
| Knowledge | Prepare world state before movement |
| Discovery Target | none numbered |
| Rules Used | R-STATE-001; R-SIGNAL-001 |
| Interactions Used | INT-022 |
| Gimmicks Used | GIM-001; GIM-002 |
| Puzzle Patterns Used | PAT-006 |
| Geometry | TBD — after PLAY-001B feel validation |
| Gates | W3-GATE-4 |
| Anti-Pattern Check | Structurally: ANTI-001 if the needed state is off-screen with no cue. |
| Playtest Findings | none |

Pairs with LVL-W03-008 (STATE→MOVE vs MOVE→STATE).

---

### LVL-W03-004 — Don't Open It

| Field | Value |
| --- | --- |
| Status | CANDIDATE |
| Purpose | SURPRISE / REINTERPRET |
| Knowledge | Closed Door as wall / rebound / wall-jump surface |
| Discovery Target | DSC-001 |
| Required setup | Door visibly solid while closed; solids already support movement; Wall Jump known |
| Rules Used | R-STATE-001; R-CONTACT-001; R-PLAYER-005 |
| Interactions Used | INT-021; INT-013 |
| Gimmicks Used | GIM-001 |
| Puzzle Patterns Used | PAT-014 |
| Expected realization | “The door is also a wall.” |
| Door Second Face | Closed Door as movement/rebound/wall-jump surface |
| Geometry | TBD — after PLAY-001B feel validation |
| Gates | W3-GATE-2 |
| Anti-Pattern Check | Structurally: C-06. Requires playtest: ANTI-015 / “how was I supposed to know.” |
| Playtest Findings | none |

---

### LVL-W03-005 — Use It, Then Open It

| Field | Value |
| --- | --- |
| Status | CANDIDATE |
| Purpose | APPLY / ORDER / REWARD candidate |
| Knowledge | Both Door faces in one puzzle |
| Conceptual sequence | Door CLOSED → use as surface → reach Switch → Door OPEN → pass |
| Rules Used | R-STATE-001; R-SIGNAL-001; R-CONTACT-001 |
| Interactions Used | INT-021; INT-022 |
| Gimmicks Used | GIM-001; GIM-002 |
| Puzzle Patterns Used | PAT-003; PAT-009 |
| Geometry | TBD — after PLAY-001B feel validation |
| Anti-Pattern Check | Structurally: C-07 reuse. Requires playtest: ANTI-006. |
| Playtest Findings | none |

---

### LVL-W03-006 — Opening Can Be Wrong

| Field | Value |
| --- | --- |
| Status | CANDIDATE |
| Purpose | REINTERPRET |
| Knowledge | State change is not automatically an upgrade |
| Discovery Target | DSC-014 |
| Rules Used | R-STATE-001; R-CONTACT-001 |
| Interactions Used | INT-021; INT-022 |
| Gimmicks Used | GIM-001; GIM-002 |
| Puzzle Patterns Used | PAT-008; PAT-009 |
| Expected realization | Opening may create a route and remove a useful surface. |
| Geometry | TBD — after PLAY-001B feel validation |
| Gates | W3-GATE-3 |
| Anti-Pattern Check | Structurally: ANTI-002 if open stops being a real open. Requires playtest. |
| Playtest Findings | none |

---

### LVL-W03-007 — Switch Again

| Field | Value |
| --- | --- |
| Status | CANDIDATE |
| Purpose | REINTERPRET / APPLY |
| Knowledge | Switch Second Face candidate: restore a useful previous state |
| First Face | Change another object's state to create progress |
| Conceptual sequence | CLOSED → OPEN → move → CLOSED → use restored structure |
| Rules Used | R-SIGNAL-001; R-STATE-001 |
| Interactions Used | INT-022 |
| Gimmicks Used | GIM-002; GIM-001 |
| Puzzle Patterns Used | PAT-009 |
| Switch conflict | None. GIM-002 First Face already includes toggle. Second Face is a new *use*, not a behavior change. |
| Geometry | TBD — after PLAY-001B feel validation |
| Anti-Pattern Check | Structurally: C-07. Requires playtest. |
| Playtest Findings | none |

---

### LVL-W03-008 — Movement Before State

| Field | Value |
| --- | --- |
| Status | CANDIDATE |
| Purpose | TEST |
| Knowledge | Create Movement State/position, then change object state |
| Rules Used | R-STATE-001; W1/W2 movement |
| Interactions Used | INT-022 |
| Gimmicks Used | GIM-001; GIM-002 |
| Puzzle Patterns Used | PAT-007 |
| Pair | Opposite of LVL-W03-003 (STATE → MOVE vs MOVE → STATE) |
| Geometry | TBD — after PLAY-001B feel validation |
| Gates | W3-GATE-4 |
| Anti-Pattern Check | Structurally: ANTI-013 if a wrong order is a long reset. Requires playtest. |
| Playtest Findings | none |

---

### LVL-W03-009 — Which First?

| Field | Value |
| --- | --- |
| Status | CANDIDATE |
| Purpose | ORDER |
| Knowledge | Order of Door/Switch actions. Physical possibility, not a Boolean logic exam. |
| Rules Used | R-STATE-001; R-SIGNAL-001 |
| Interactions Used | INT-021; INT-022 |
| Gimmicks Used | GIM-001; GIM-002 |
| Puzzle Patterns Used | PAT-008 |
| Geometry | TBD — after PLAY-001B feel validation |
| Gates | W3-GATE-4 |
| Anti-Pattern Check | Structurally: do not escalate to many abstract bits (ANTI-011). Playtest. |
| Playtest Findings | none |

---

### LVL-W03-010 — Same Door, Different Job

| Field | Value |
| --- | --- |
| Status | CANDIDATE |
| Purpose | REINTERPRET |
| Knowledge | Contextual roles, not one fixed purpose |
| Discovery Target | DSC-018 |
| CLOSED roles | blocks passage; provides solid surface |
| OPEN roles | permits passage; removes that solid surface |
| Rules Used | R-STATE-001; R-CONTACT-001 |
| Interactions Used | INT-021 |
| Gimmicks Used | GIM-001 |
| Puzzle Patterns Used | PAT-014 |
| Geometry | TBD — after PLAY-001B feel validation |
| Gates | W3-GATE-5 |
| Anti-Pattern Check | Structurally: C-07, INT-028. Requires playtest. |
| Playtest Findings | none |

---

### LVL-W03-011 — Door × Momentum

| Field | Value |
| --- | --- |
| Status | CANDIDATE |
| Purpose | COMBINE |
| Knowledge | Door solidity + Momentum. No new Gimmick. |
| Discovery Target | DSC-015. Weak seed only for DSC-016 (not realized here). |
| DSC-016 seed | A Door collision/rebound may send the player a way that looks less immediately productive but sets a later trajectory. Do not declare DSC-016 realized in W3. |
| Rules Used | R-MOTION-001; R-CONTACT-001; R-STATE-001 |
| Interactions Used | INT-013; INT-021 |
| Gimmicks Used | GIM-001 (and Switch only if already needed to set state) |
| Puzzle Patterns Used | PAT-017 |
| Intended Solution | Do not assign exact geometry or collision solution yet. |
| Geometry | TBD — after PLAY-001B feel validation |
| Gates | W3-GATE-6 |
| Anti-Pattern Check | Structurally: ANTI-020. Requires playtest: ANTI-019 (no mandatory clip). |
| Playtest Findings | none |

---

### LVL-W03-012 — The Door Is Not a Door

| Field | Value |
| --- | --- |
| Status | CANDIDATE |
| Purpose | MASTERY / REINTERPRET |
| Knowledge | No new Rule. No new Gimmick. |
| Discovery Target | DSC-001; DSC-014; DSC-015; DSC-018 |
| Core question | “What role should this Door have right now?” |
| Rules Used | Taught W1–W3 only |
| Interactions Used | Existing door/momentum IDs only |
| Gimmicks Used | none new |
| Puzzle Patterns Used | PAT-014; PAT-016; PAT-017 |
| World conclusion | Objects do not have one purpose. Their state changes what they can become. |
| Geometry | TBD — after PLAY-001B feel validation |
| Anti-Pattern Check | Structurally: ANTI-020, ANTI-002. Requires playtest: ANTI-006 / ANTI-015. |
| Playtest Findings | none |

---

## World 4

Planning-first. No reaction-only gates. Counts and durations: TBD — after PLAY-001B / relevant prototype validation. Numeric counts in titles are illustrative, not canonical.

### LVL-W04-001 — One, Two, Three

| Field | Value |
| --- | --- |
| Status | CANDIDATE |
| Purpose | TEACH |
| Knowledge | Bounce can be counted; Counter |
| Discovery Target | opens DSC-011 |
| Rules Used | R-PLAYER-001; R-STATE-003; R-INFO-001 |
| Interactions Used | INT-005 |
| Gimmicks Used | GIM-007 |
| Puzzle Patterns Used | PAT-011 |
| Expected realization | Bounce is not only movement. It is also a countable event. |
| Geometry | TBD — after PLAY-001B / relevant prototype validation. No canonical count. |
| Gates | W4-GATE-1 |
| Anti-Pattern Check | Structurally: ANTI-001 (visible count). Playtest: ANTI-018. |
| Playtest Findings | none |

---

### LVL-W04-002 — Count Your Steps

| Field | Value |
| --- | --- |
| Status | CANDIDATE |
| Purpose | APPLY |
| Knowledge | Count while moving. A direct route may produce the wrong future count/state. |
| Rules Used | R-STATE-003; W1 movement |
| Interactions Used | INT-005 |
| Gimmicks Used | GIM-007 |
| Puzzle Patterns Used | PAT-011; PAT-018 if the useful route is a detour |
| Geometry | TBD — after PLAY-001B / relevant prototype validation |
| Gates | W4-GATE-1 |
| Anti-Pattern Check | Structurally: planning, not grind. Playtest: ANTI-006. |
| Playtest Findings | none |

---

### LVL-W04-003 — One More Bounce

| Field | Value |
| --- | --- |
| Status | CANDIDATE |
| Purpose | REINTERPRET / APPLY / REWARD candidate |
| Knowledge | An apparently extra Bounce is useful |
| Discovery Target | DSC-011 (strong payoff candidate) |
| Rules Used | R-STATE-003; R-PLAYER-001 |
| Interactions Used | INT-005 |
| Gimmicks Used | GIM-007 |
| Puzzle Patterns Used | PAT-011; PAT-018 |
| Geometry | TBD — after PLAY-001B / relevant prototype validation |
| Gates | W4-GATE-2 |
| Anti-Pattern Check | Structurally: C-06. Playtest: ANTI-015. |
| Playtest Findings | none |

---

### LVL-W04-004 — Don't Move

| Field | Value |
| --- | --- |
| Status | CANDIDATE |
| Purpose | REINTERPRET |
| Knowledge | Waiting is an intentional choice. Auto Bounce means “wait” can be remaining in a safe/local cycle while World State approaches — not standing perfectly still. |
| Discovery Target | DSC-012 |
| Cognitive operation | Waiting (≠ W04-007 synchronization) |
| Rules Used | R-STATE-002 and/or clocked world state; R-INFO-001 |
| Interactions Used | INT-023 when a window is used |
| Gimmicks Used | already-introduced temporal object if needed |
| Puzzle Patterns Used | PAT-010 |
| Geometry | TBD — after PLAY-001B / relevant prototype validation |
| Gates | W4-GATE-3 |
| Anti-Pattern Check | Structurally: ANTI-004 (not a twitch freeze). Playtest. |
| Playtest Findings | none |

---

### LVL-W04-005 — Open for a While

| Field | Value |
| --- | --- |
| Status | CANDIDATE |
| Purpose | TEACH |
| Knowledge | Some World States are temporary. Learning goal: “This state does not last forever.” Not: “React quickly.” |
| Rules Used | R-STATE-002; R-CONTACT-001; R-INFO-001 |
| Interactions Used | INT-023 |
| Gimmicks Used | GIM-008 |
| Puzzle Patterns Used | PAT-010 |
| Geometry | TBD — after PLAY-001B / relevant prototype validation. First window must be generous and readable. Duration not specified. |
| Gates | W4-GATE-4 |
| Anti-Pattern Check | Structurally: ANTI-003 / ANTI-004 / ANTI-012. Requires playtest. |
| Playtest Findings | none |

---

### LVL-W04-006 — Which Bounce?

| Field | Value |
| --- | --- |
| Status | CANDIDATE |
| Purpose | TEST |
| Knowledge | Timed State + LOW / NORMAL / BOOST. Planning, not input precision. |
| Rules Used | R-STATE-002; R-PLAYER-003; R-PLAYER-004 |
| Interactions Used | INT-023 |
| Gimmicks Used | GIM-008 |
| Puzzle Patterns Used | PAT-010 |
| Geometry | TBD — after PLAY-001B / relevant prototype validation |
| Gates | W4-GATE-4 |
| Anti-Pattern Check | Requires playtest: ANTI-003 / ANTI-006. |
| Playtest Findings | none |

---

### LVL-W04-007 — Wait for the Window

| Field | Value |
| --- | --- |
| Status | CANDIDATE |
| Purpose | REINTERPRET / SYNCHRONIZATION |
| Knowledge | Align Movement State with a predictable World State window |
| Cognitive operation | Synchronization (≠ W04-004 waiting-as-action) |
| Rules Used | R-STATE-002; W1/W2 movement |
| Interactions Used | INT-023 |
| Gimmicks Used | GIM-008 |
| Puzzle Patterns Used | PAT-012 |
| Geometry | TBD — after PLAY-001B / relevant prototype validation |
| Gates | W4-GATE-6 |
| Anti-Pattern Check | Structurally: ANTI-012 telegraph. Playtest: ANTI-004. |
| Playtest Findings | none |

---

### LVL-W04-008 — Not Yet

| Field | Value |
| --- | --- |
| Status | CANDIDATE |
| Purpose | TEACH |
| Knowledge | Trigger → clear activation cue → predictable delay → state change |
| Rules Used | R-SIGNAL-001; R-SIGNAL-002; R-INFO-001 |
| Interactions Used | INT-027 |
| Gimmicks Used | GIM-012 (or Switch+Delay variation — unresolved) |
| Puzzle Patterns Used | PAT-020 |
| Geometry | TBD — after PLAY-001B / relevant prototype validation. Delay duration not specified. |
| Gates | W4-GATE-5 |
| Anti-Pattern Check | Structurally: ANTI-001 / ANTI-012 if the chain is readable. Playtest. |
| Playtest Findings | none |

---

### LVL-W04-009 — Leave Before It Happens

| Field | Value |
| --- | --- |
| Status | CANDIDATE |
| Purpose | APPLY |
| Knowledge | Trigger now; occupy the predicted future World State (≠ W05-007 choose-when-to-trigger) |
| Discovery Target | DSC-013 |
| Rules Used | R-SIGNAL-002; W1 movement |
| Interactions Used | INT-027 |
| Gimmicks Used | GIM-012 or Switch+Delay |
| Puzzle Patterns Used | PAT-020 |
| Geometry | TBD — after PLAY-001B / relevant prototype validation |
| Gates | W4-GATE-5 |
| Anti-Pattern Check | Structurally: C-06. Playtest: ANTI-004 / ANTI-006. |
| Playtest Findings | none |

---

### LVL-W04-010 — Set the Future

| Field | Value |
| --- | --- |
| Status | CANDIDATE |
| Purpose | COMBINE |
| Knowledge | After several future events, what state will exist? |
| Rules Used | R-STATE-003; R-SIGNAL-001; R-STATE-001 |
| Interactions Used | INT-025; INT-026 |
| Gimmicks Used | GIM-007 plus Door/Switch if already taught |
| Puzzle Patterns Used | PAT-011; PAT-008 |
| Geometry | TBD — after PLAY-001B / relevant prototype validation. No exact counts. |
| Anti-Pattern Check | Structurally: ANTI-018. Playtest: ANTI-011. |
| Playtest Findings | none |

---

### LVL-W04-011 — Meet Me There

| Field | Value |
| --- | --- |
| Status | CANDIDATE |
| Purpose | SYNCHRONIZATION / TEST |
| Knowledge | Future Movement State (position, velocity, trajectory, bounce) meets future World State (gate/door, counter, delay) |
| Rules Used | Taught W1–W4 only |
| Interactions Used | Existing INT-023 / INT-027 / INT-005 as needed. No new INT. |
| Gimmicks Used | none new |
| Puzzle Patterns Used | PAT-012 |
| Geometry | TBD — after PLAY-001B / relevant prototype validation. Success must not be frame-perfect. |
| Gates | W4-GATE-6 |
| Anti-Pattern Check | **W4 scrutiny:** ANTI-003, ANTI-004, ANTI-012. Requires playtest. |
| Playtest Findings | none |

---

### LVL-W04-012 — The Right Time

| Field | Value |
| --- | --- |
| Status | CANDIDATE |
| Purpose | MASTERY |
| Knowledge | No new Rule. No new Gimmick. Movement State, World State, count, timed state, delay, waiting, sync. |
| Discovery Target | DSC-011; DSC-012; DSC-013 |
| Core question | When should I act so that the desired future states meet? |
| Rules Used | Taught W1–W4 only |
| Interactions Used | Existing temporal IDs only |
| Gimmicks Used | none new |
| Puzzle Patterns Used | PAT-012; PAT-020; PAT-008 |
| Geometry | TBD — after PLAY-001B / relevant prototype validation |
| Gates | W4-GATE-6 |
| Anti-Pattern Check | Structurally: ANTI-020. Playtest: ANTI-003 / ANTI-004 / ANTI-006 / ANTI-011. |
| Playtest Findings | none |

---

## World 5

New Rule 0. New Gimmick 0. Hidden mechanic 0. Adjacent rooms must use different cognitive operations ([WORLD_LIBRARY.md](WORLD_LIBRARY.md)).

### LVL-W05-001 — You Know This

| Field | Value |
| --- | --- |
| Status | CANDIDATE |
| Purpose | RECALL |
| Knowledge | Familiar-looking problem. Old answer stays legal; another valid answer is visible through deeper understanding. |
| Expected feeling | “The old answer wasn't wrong. It just wasn't the only answer.” |
| Rules Used | Already taught |
| Interactions Used | Existing only |
| Gimmicks Used | none new |
| Puzzle Patterns Used | PAT-022 possible |
| Geometry | TBD — after PLAY-001B / relevant prototype validation |
| Gates | W5-GATE-1 |
| Anti-Pattern Check | Structurally: ANTI-002 (rules unchanged). Playtest: ANTI-015. |
| Playtest Findings | none |

---

### LVL-W05-002 — Another Answer

| Field | Value |
| --- | --- |
| Status | CANDIDATE |
| Purpose | APPLY / ALTERNATE SOLUTION |
| Knowledge | More than one rule-consistent solution. Players need not find every path. Validates system understanding, not memorization. |
| Rules Used | Already taught |
| Interactions Used | Existing only |
| Gimmicks Used | none new |
| Puzzle Patterns Used | PAT-022 |
| Geometry | TBD — after PLAY-001B / relevant prototype validation |
| Gates | W5-GATE-1 (not a multi-solution checklist) |
| Anti-Pattern Check | Structurally: ANTI-007 if alts are fake. Playtest: ANTI-019. |
| Playtest Findings | none |

---

### LVL-W05-003 — Wrong Way

| Field | Value |
| --- | --- |
| Status | CANDIDATE |
| Purpose | REINTERPRET |
| Cognitive operation | Spatial detour — WHERE to go first (≠ W05-004) |
| Discovery Target | DSC-007 payoff |
| Rules Used | Already taught |
| Interactions Used | none new |
| Gimmicks Used | none new |
| Puzzle Patterns Used | PAT-018 |
| Geometry | TBD — after PLAY-001B / relevant prototype validation |
| Gates | W5-GATE-2 |
| Anti-Pattern Check | Structurally: ANTI-014 if the detour is hidden. Playtest. |
| Playtest Findings | none |

---

### LVL-W05-004 — Fall

| Field | Value |
| --- | --- |
| Status | CANDIDATE |
| Purpose | REINTERPRET |
| Cognitive operation | State transformation — WHAT state to create (≠ W05-003) |
| Discovery Target | DSC-016 payoff (W3-011 was weak seed only) |
| Fairness | Intentional setup distinguishable from death/failure via existing rules and readable space. No hidden information. |
| Rules Used | Already taught PLAYER / CONTACT / STATE |
| Interactions Used | Existing only |
| Gimmicks Used | none new |
| Puzzle Patterns Used | PAT-019 |
| Geometry | TBD — after PLAY-001B / relevant prototype validation |
| Gates | W5-GATE-2 |
| Anti-Pattern Check | **W5 scrutiny:** ANTI-001, ANTI-015, ANTI-019. Requires playtest. |
| Playtest Findings | none |

---

### LVL-W05-005 — Give It Up

| Field | Value |
| --- | --- |
| Status | CANDIDATE |
| Purpose | REINTERPRET |
| Cognitive operation | State sacrifice — WHAT valuable state to abandon (≠ “touch Rough again”) |
| Discovery Target | DSC-009 reinforcement |
| Rules Used | R-MOTION-001; friction only if it serves sacrifice-of-value, not a First-Face rerun |
| Interactions Used | INT-015 if high friction is used |
| Gimmicks Used | none new required |
| Puzzle Patterns Used | PAT-005 |
| Geometry | TBD — after PLAY-001B / relevant prototype validation |
| Gates | W5-GATE-3 |
| Anti-Pattern Check | Structurally: ANTI-017 vs W02-008. Playtest. |
| Playtest Findings | none |

---

### LVL-W05-006 — Close It

| Field | Value |
| --- | --- |
| Status | CANDIDATE |
| Purpose | REINTERPRET |
| Cognitive operation | Object role selection |
| Discovery Target | DSC-014 reinforcement |
| Knowledge | OPEN appears beneficial; restore CLOSED because the solid is required. OPEN ≠ GOOD. CLOSED ≠ BAD. |
| Rules Used | R-STATE-001; R-CONTACT-001 |
| Interactions Used | INT-021; INT-022 |
| Gimmicks Used | GIM-001; GIM-002 |
| Puzzle Patterns Used | PAT-014 |
| Geometry | TBD — after PLAY-001B / relevant prototype validation |
| Gates | W5-GATE-4 |
| Anti-Pattern Check | Structurally: C-07. Playtest: ANTI-017 vs W03-006. |
| Playtest Findings | none |

---

### LVL-W05-007 — Too Early

| Field | Value |
| --- | --- |
| Status | CANDIDATE |
| Purpose | REINTERPRET / TIME |
| Cognitive operation | Trigger timing — WHEN to cause the future event (≠ W04-009 trigger-now-then-move) |
| Knowledge | Immediate trigger makes the future state arrive too early. Delay the cause. |
| Rules Used | R-SIGNAL-002; taught W4 time |
| Interactions Used | INT-027 |
| Gimmicks Used | none new |
| Puzzle Patterns Used | PAT-020 |
| Geometry | TBD — after PLAY-001B / relevant prototype validation |
| Gates | W5-GATE-5 |
| Anti-Pattern Check | Structurally: ANTI-012. Playtest: ANTI-004. |
| Playtest Findings | none |

---

### LVL-W05-008 — Waste a Bounce

| Field | Value |
| --- | --- |
| Status | CANDIDATE |
| Purpose | REINTERPRET / RESOURCE ALLOCATION |
| Cognitive operation | Resource spending |
| Discovery Target | DSC-011 reinforcement |
| Knowledge | W4: bounce can be counted. W5: bounce count can be deliberately spent/allocated. Not a visible currency unless later justified. |
| Rules Used | R-STATE-003 |
| Interactions Used | INT-005 |
| Gimmicks Used | GIM-007 if already in language |
| Puzzle Patterns Used | PAT-021 |
| Geometry | TBD — after PLAY-001B / relevant prototype validation |
| Gates | W5-GATE-5 |
| Anti-Pattern Check | Structurally: ANTI-018. Playtest. |
| Playtest Findings | none |

---

### LVL-W05-009 — Three Old Things

| Field | Value |
| --- | --- |
| Status | CANDIDATE |
| Purpose | COMBINE |
| Discovery Target | DSC-015 |
| Knowledge | 2–3 well-understood systems, new possibility. Example only (not mandatory): Wind → Momentum → Ice preserves → Closed Door redirects. Avoid Gimmick Flood. |
| Rules Used | Already taught |
| Interactions Used | Existing only (e.g. INT-016, INT-013). No new INT. |
| Gimmicks Used | none new |
| Puzzle Patterns Used | PAT-017 |
| Geometry | TBD — after PLAY-001B / relevant prototype validation |
| Anti-Pattern Check | Structurally: ANTI-010 / ANTI-020. Playtest: ANTI-011. |
| Playtest Findings | none |

---

### LVL-W05-010 — Same Room, New Rules?

| Field | Value |
| --- | --- |
| Status | CANDIDATE |
| Purpose | REINTERPRET / APPLY / REWARD candidate |
| Knowledge | Evokes an earlier World structure. Rules do **not** change. Accumulated knowledge reveals a new approach. |
| Expected feeling | “The game didn't change. I did.” |
| Rules Used | Already taught — no replacements |
| Interactions Used | Existing only |
| Gimmicks Used | none new |
| Puzzle Patterns Used | PAT-016 |
| Geometry | TBD — after PLAY-001B / relevant prototype validation |
| Anti-Pattern Check | Structurally: ANTI-002. Playtest: ANTI-017. |
| Playtest Findings | none |

---

### LVL-W05-011 — Make Your Own Route

| Field | Value |
| --- | --- |
| Status | CANDIDATE |
| Purpose | MASTERY / ALTERNATE SOLUTION |
| Knowledge | Multiple rule-consistent approaches where practical (Momentum, LOW, Door rebound, timing — examples). Solution count not frozen. From following rules to using them. |
| Rules Used | Already taught |
| Interactions Used | Existing only |
| Gimmicks Used | none new |
| Puzzle Patterns Used | PAT-022 |
| Geometry | TBD — after PLAY-001B / relevant prototype validation |
| Gates | W5-GATE-6 |
| Anti-Pattern Check | Structurally: ANTI-019. Playtest: ANTI-015. Not a “find all solutions” gate. |
| Playtest Findings | none |

---

### LVL-W05-012 — What Do I Really Know?

| Field | Value |
| --- | --- |
| Status | CANDIDATE |
| Purpose | FINAL MASTERY |
| Knowledge | No new Rule, Gimmick, or hidden mechanic. No new explanatory concept. Prefer ~4–5 deep concepts, not every gimmick. Combination TBD after prototype/playtest. |
| Final questions | Where? How? What Movement State? What World State? When? What assumptions? What else is possible? |
| Rules Used | Taught W1–W4 only |
| Interactions Used | Existing only |
| Gimmicks Used | none new |
| Puzzle Patterns Used | PAT-017; PAT-022 possible |
| Geometry | TBD — after PLAY-001B / relevant prototype validation |
| Gates | W5-GATE-6 |
| Anti-Pattern Check | Structurally: ANTI-010, ANTI-020. **W5 scrutiny:** ANTI-001, ANTI-015, ANTI-017, ANTI-019. Requires playtest. |
| Playtest Findings | none |

---

## Knowledge Gate count

| World | Gates | Count |
| --- | --- | --- |
| W1 | W1-GATE-1 … W1-GATE-4 | 4 |
| W2 | W2-GATE-1 … W2-GATE-6 | 6 |
| W3 | W3-GATE-1 … W3-GATE-6 | 6 |
| W4 | W4-GATE-1 … W4-GATE-6 | 6 |
| W5 | W5-GATE-1 … W5-GATE-6 | 6 |
| **Player total** | | **28** |

No W5-GATE-7. Alternate-solution support is a level-design quality principle, not a gate.

Gate definitions: [WORLD_LIBRARY.md](WORLD_LIBRARY.md).

---

## Shared constraints

- Do not implement any room from this file.
- Do not invent geometry, counts, durations, or physics values.
- Do not invent new INT / DSC IDs.
- Do not start W4 implementation or PLAY-001B from this document.

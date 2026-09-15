# Puzzle Pattern Library

Patterns are abstract structures. They arrange known rules, interactions, and gimmicks. They do not add hidden rules.

Puzzle Patterns describe the **thinking problem**, not merely the spatial objective.

Do not assign `PAT-001` because a room ends by reaching an exit. Use `PAT-001` only when constructing a viable trajectory to the destination is itself the meaningful puzzle.

Levels instantiate patterns. A pattern without a discovery target is incomplete as a design record.

---

## Schema

```text
Pattern ID
Name
Status

Abstract Structure

Primary Cognitive Challenge
Required Rule Types
Compatible Interactions
Compatible Gimmicks

Cognitive Difficulty
Execution Difficulty

Discovery Types
Difficulty Knobs
Variants

Failure Readability
Anti-Pattern Risks

Example Level
Validated Levels
```

---

## Core difficulty principle

```text
Cognitive Difficulty >= Execution Difficulty
```

This is a **default design target**, not a mathematical invariant.

Once the player understands the solution, success should feel achievable (C-02, ANTI-006).

---

## Signature candidates

These patterns are flagged as signature *candidates*. The flag is not `CORE`.

- PAT-004 Build Momentum
- PAT-005 Kill Momentum
- PAT-009 Order Reversal
- PAT-011 Bounce Counting
- PAT-016 Same Tool, New Function
- PAT-017 Combination Discovery

---

## Index

| ID | Name | Status | Signature candidate |
| --- | --- | --- | --- |
| PAT-001 | Reach | CANDIDATE | |
| PAT-002 | Route Choice | CANDIDATE | |
| PAT-003 | Setup → Payoff | CANDIDATE | |
| PAT-004 | Build Momentum | CANDIDATE | yes |
| PAT-005 | Kill Momentum | CANDIDATE | yes |
| PAT-006 | State Before Movement | CANDIDATE | |
| PAT-007 | Movement Before State | CANDIDATE | |
| PAT-008 | Order Dependency | CANDIDATE | |
| PAT-009 | Order Reversal | CANDIDATE | yes |
| PAT-010 | Timed Window | CANDIDATE | |
| PAT-011 | Bounce Counting | CANDIDATE | yes |
| PAT-012 | Synchronization | CANDIDATE | |
| PAT-013 | Commitment | CANDIDATE | |
| PAT-014 | Reinterpret Object | CANDIDATE | |
| PAT-015 | Reinterpret Space | CANDIDATE | |
| PAT-016 | Same Tool, New Function | CANDIDATE | yes |
| PAT-017 | Combination Discovery | CANDIDATE | yes |
| PAT-018 | Intentional Detour | CANDIDATE | |
| PAT-019 | Controlled Failure | CANDIDATE | |
| PAT-020 | Delayed Consequence | CANDIDATE | |
| PAT-021 | Resource Allocation | CANDIDATE | |
| PAT-022 | Alternate Solution | CANDIDATE | |

All rows are structural CANDIDATES. None are implemented as authored levels.

Compatible Interactions list only IDs directly supported by DOC-001A. Empty means unspecified, not reserved.

---

### PAT-001 — Reach

| Field | Value |
| --- | --- |
| Pattern ID | `PAT-001` |
| Name | Reach |
| Status | CANDIDATE |
| Abstract Structure | Get from here to there. The board asks “can you arrive?” |
| Primary Cognitive Challenge | Read the space; pick a motion that arrives. |
| Required Rule Types | PLAYER, MOTION, CONTACT |
| Compatible Interactions | INT-007 when the reach is a low route |
| Compatible Gimmicks | Any that change reachable space |
| Cognitive Difficulty | Low by default |
| Execution Difficulty | Must not exceed the cognitive ask |
| Discovery Types | D0 Learning, D1 Application |
| Difficulty Knobs | Gap size, ceiling, required bounce type |
| Variants | Vertical reach, horizontal reach, multi-bounce reach |
| Failure Readability | Miss should show short / high / late |
| Anti-Pattern Risks | ANTI-006, ANTI-018 |
| Example Level | none assigned — not every exit is PAT-001 |
| Validated Levels | none |

---

### PAT-002 — Route Choice

| Field | Value |
| --- | --- |
| Pattern ID | `PAT-002` |
| Name | Route Choice |
| Status | CANDIDATE |
| Abstract Structure | Two or more viable paths. The player picks. |
| Primary Cognitive Challenge | Compare routes against current knowledge. |
| Required Rule Types | PLAYER plus whatever distinguishes the routes |
| Compatible Interactions | None specified in DOC-001A |
| Compatible Gimmicks | TBD |
| Cognitive Difficulty | Medium |
| Execution Difficulty | Each route should stay achievable |
| Discovery Types | D1 Application |
| Difficulty Knobs | How different the routes are; cost of the wrong first pick |
| Variants | LOW / NORMAL / BOOST (LVL-W01-007 candidate) |
| Failure Readability | Wrong route should look like a wrong plan, not a fumble |
| Anti-Pattern Risks | ANTI-007 Fake Choice |
| Example Level | LVL-W01-007 |
| Validated Levels | none |

---

### PAT-003 — Setup → Payoff

| Field | Value |
| --- | --- |
| Pattern ID | `PAT-003` |
| Name | Setup → Payoff |
| Status | CANDIDATE |
| Abstract Structure | Do a preparatory action, then spend it. |
| Primary Cognitive Challenge | See that the first action is for the second. |
| Required Rule Types | Depends on the setup (often STATE or MOTION) |
| Compatible Interactions | INT-008 when LOW is the setup |
| Compatible Gimmicks | Switch, Spring, Counter, Delayed Switch |
| Cognitive Difficulty | Medium |
| Execution Difficulty | Payoff should be easier than discovering the setup |
| Discovery Types | D1, D2; DSC-006; DSC-008 |
| Difficulty Knobs | Distance between setup and payoff; how loud the setup is |
| Variants | Immediate payoff; payoff in the next room (not required here) |
| Failure Readability | Arriving unprepared should be obvious |
| Anti-Pattern Risks | ANTI-008 if the setup object never returns; ANTI-015 |
| Example Level | TBD |
| Validated Levels | none |

---

### PAT-004 — Build Momentum

| Field | Value |
| --- | --- |
| Pattern ID | `PAT-004` |
| Name | Build Momentum |
| Status | CANDIDATE (signature candidate) |
| Abstract Structure | Arrive with *more* speed than a standing start allows. |
| Primary Cognitive Challenge | Treat current velocity as a resource to grow. |
| Required Rule Types | MOTION (Momentum, Acceleration), PLAYER |
| Compatible Interactions | INT-006; INT-014; INT-003; INT-009 |
| Compatible Gimmicks | Ice, Wind, Spring (candidates) |
| Cognitive Difficulty | Medium–high |
| Execution Difficulty | Keep below cognitive |
| Discovery Types | D1, D2; DSC-003; DSC-008; DSC-017 |
| Difficulty Knobs | Runway length, required exit speed |
| Variants | Multi-bounce buildup; boost-assisted buildup |
| Failure Readability | Coming up short while slow |
| Anti-Pattern Risks | ANTI-006 if the runway is only a grind; ANTI-018 |
| Example Level | LVL-W02-009 |
| Validated Levels | none |

---

### PAT-005 — Kill Momentum

| Field | Value |
| --- | --- |
| Pattern ID | `PAT-005` |
| Name | Kill Momentum |
| Status | CANDIDATE (signature candidate) |
| Abstract Structure | Arrive with *less* speed than the obvious approach produces. |
| Primary Cognitive Challenge | See that going slower (or stopping) is the solution. |
| Required Rule Types | MOTION, CONTACT (often Friction) |
| Compatible Interactions | INT-015; INT-004 |
| Compatible Gimmicks | Rough Surface, Low Bounce as a height/speed tool |
| Cognitive Difficulty | Medium–high |
| Execution Difficulty | Stopping should be achievable, not pixel-perfect |
| Discovery Types | D2 Reinterpretation; DSC-004; DSC-009 |
| Difficulty Knobs | How punishing leftover speed is |
| Variants | Dump speed before a narrow landing; refuse a boost |
| Failure Readability | Overshoot should read as “too fast” |
| Anti-Pattern Risks | ANTI-014; ANTI-006 |
| Example Level | TBD |
| Validated Levels | none |

---

### PAT-006 — State Before Movement

| Field | Value |
| --- | --- |
| Pattern ID | `PAT-006` |
| Name | State Before Movement |
| Status | CANDIDATE |
| Abstract Structure | Change the world, then travel. |
| Primary Cognitive Challenge | Notice the board is wrong until a state is set. |
| Required Rule Types | STATE, SIGNAL, PLAYER |
| Compatible Interactions | None specified in DOC-001A |
| Compatible Gimmicks | Door, Switch, Timed Gate |
| Cognitive Difficulty | Low–medium |
| Execution Difficulty | Low once the state is set |
| Discovery Types | D0, D1 |
| Difficulty Knobs | How obvious the dormant state is |
| Variants | Multiple states before one move |
| Failure Readability | Hitting a closed door should look closed |
| Anti-Pattern Risks | ANTI-001 if the needed state is off-screen with no cue |
| Example Level | TBD — PLAY-002 not started |
| Validated Levels | none |

---

### PAT-007 — Movement Before State

| Field | Value |
| --- | --- |
| Pattern ID | `PAT-007` |
| Name | Movement Before State |
| Status | CANDIDATE |
| Abstract Structure | Travel first so that a later state change is useful — or possible. |
| Primary Cognitive Challenge | Invert the usual “switch then go.” |
| Required Rule Types | PLAYER, STATE |
| Compatible Interactions | None specified in DOC-001A |
| Compatible Gimmicks | Door, Switch, Delayed Switch |
| Cognitive Difficulty | Medium |
| Execution Difficulty | Low–medium |
| Discovery Types | D2 |
| Difficulty Knobs | How costly it is to flip state too early |
| Variants | Get in position, then flip; escape before a close |
| Failure Readability | Flipping first should fail in a readable way |
| Anti-Pattern Risks | ANTI-013 long reset after a wrong order |
| Example Level | TBD |
| Validated Levels | none |

---

### PAT-008 — Order Dependency

| Field | Value |
| --- | --- |
| Pattern ID | `PAT-008` |
| Name | Order Dependency |
| Status | CANDIDATE |
| Abstract Structure | A then B works. B then A does not (or does something else). |
| Primary Cognitive Challenge | Find the legal sequence. |
| Required Rule Types | STATE and/or PLAYER landing grammar |
| Compatible Interactions | INT-021; INT-022 |
| Compatible Gimmicks | Any sequenced devices |
| Cognitive Difficulty | Medium |
| Execution Difficulty | Sequence should not be a dexterity tax |
| Discovery Types | D1, D2; DSC-014 |
| Difficulty Knobs | Number of steps; how many look legal |
| Variants | Two-step; three-step |
| Failure Readability | Wrong order produces a clear wrong board |
| Anti-Pattern Risks | ANTI-017 if later rooms only repeat the same order |
| Example Level | TBD |
| Validated Levels | none |

---

### PAT-009 — Order Reversal

| Field | Value |
| --- | --- |
| Pattern ID | `PAT-009` |
| Name | Order Reversal |
| Status | CANDIDATE (signature candidate) |
| Abstract Structure | A learned order is wrong here. The reverse is required. |
| Primary Cognitive Challenge | Drop a previous habit. |
| Required Rule Types | Same as the learned order |
| Compatible Interactions | INT-021; INT-022 |
| Compatible Gimmicks | Same tools as the earlier lesson, new sequence |
| Cognitive Difficulty | High |
| Execution Difficulty | Must stay below the cognitive ask |
| Discovery Types | D2 Reinterpretation; DSC-014 |
| Difficulty Knobs | How strongly the old order was taught |
| Variants | Reverse two devices; reverse LOW then BOOST vs BOOST then LOW |
| Failure Readability | Doing the old order should fail obviously |
| Anti-Pattern Risks | ANTI-002 if the rules actually changed; they must not |
| Example Level | LVL-W01-012 (possible home, not assigned) |
| Validated Levels | none |

---

### PAT-010 — Timed Window

| Field | Value |
| --- | --- |
| Pattern ID | `PAT-010` |
| Name | Timed Window |
| Status | CANDIDATE |
| Abstract Structure | A condition is true only for a readable duration. |
| Primary Cognitive Challenge | Decide *when*, not only *what*. |
| Required Rule Types | STATE (Timed) or SIGNAL (Delay), INFO |
| Compatible Interactions | INT-023 |
| Compatible Gimmicks | Timed Gate, Delayed Switch, Moving Block |
| Cognitive Difficulty | Medium |
| Execution Difficulty | Window must be wide enough (C-02, ANTI-003, ANTI-004) |
| Discovery Types | D1; DSC-012 |
| Difficulty Knobs | Duration, telegraph, cycle vs one-shot |
| Variants | Recurring cycle; one-shot after trigger |
| Failure Readability | Late arrival should show a closed window |
| Anti-Pattern Risks | ANTI-003, ANTI-004, ANTI-012 |
| Example Level | TBD |
| Validated Levels | none |

---

### PAT-011 — Bounce Counting

| Field | Value |
| --- | --- |
| Pattern ID | `PAT-011` |
| Name | Bounce Counting |
| Status | CANDIDATE (signature candidate) |
| Abstract Structure | The number of bounces is the resource or the key. |
| Primary Cognitive Challenge | Treat Auto Bounce events as countable. |
| Required Rule Types | PLAYER (Auto Bounce), STATE (Counter), INFO |
| Compatible Interactions | INT-005; INT-012; INT-025; INT-026 |
| Compatible Gimmicks | GIM-007 Bounce Counter |
| Cognitive Difficulty | Medium–high |
| Execution Difficulty | Counting must not become frame-perfect last hops |
| Discovery Types | DSC-011 |
| Difficulty Knobs | Threshold, whether bounce type changes the count |
| Variants | Reach N; stay under N; spend N |
| Failure Readability | Count visible at failure |
| Anti-Pattern Risks | ANTI-018, ANTI-005, ANTI-001 |
| Example Level | TBD |
| Validated Levels | none |

---

### PAT-012 — Synchronization

| Field | Value |
| --- | --- |
| Pattern ID | `PAT-012` |
| Name | Synchronization |
| Status | CANDIDATE |
| Abstract Structure | Align the player's cycle with another cycle. |
| Primary Cognitive Challenge | Match two clocks (bounce cycle vs object cycle). |
| Required Rule Types | PLAYER, plus a moving or timed object |
| Compatible Interactions | None specified in DOC-001A |
| Compatible Gimmicks | Moving Block, Timed Gate |
| Cognitive Difficulty | Medium |
| Execution Difficulty | Cycles should meet in a generous overlap |
| Discovery Types | D1, D2 |
| Difficulty Knobs | Period ratio, overlap size |
| Variants | Sync to ride; sync to pass; sync to hit |
| Failure Readability | Missed phase should be visible |
| Anti-Pattern Risks | ANTI-004, ANTI-012, ANTI-003 |
| Example Level | TBD |
| Validated Levels | none |

---

### PAT-013 — Commitment

| Field | Value |
| --- | --- |
| Pattern ID | `PAT-013` |
| Name | Commitment |
| Status | CANDIDATE |
| Abstract Structure | Entering a space spends the option to leave the same way. |
| Primary Cognitive Challenge | Accept an irreversible (or costly-to-reverse) choice. |
| Required Rule Types | CONTACT, sometimes STATE |
| Compatible Interactions | None specified in DOC-001A |
| Compatible Gimmicks | One-way Surface, Door |
| Cognitive Difficulty | Medium |
| Execution Difficulty | The committed action itself should be easy |
| Discovery Types | D1, D2 |
| Difficulty Knobs | Cost of reset; how well the commitment is telegraphed |
| Variants | One-way drop; locked-behind-you door |
| Failure Readability | The closed path behind the player should be obvious |
| Anti-Pattern Risks | ANTI-013 Punishing Reset |
| Example Level | TBD |
| Validated Levels | none |

---

### PAT-014 — Reinterpret Object

| Field | Value |
| --- | --- |
| Pattern ID | `PAT-014` |
| Name | Reinterpret Object |
| Status | CANDIDATE |
| Abstract Structure | A known object is used for a job it was not introduced to do. |
| Primary Cognitive Challenge | Drop the first-face assumption. |
| Required Rule Types | Whatever the object already has |
| Compatible Interactions | INT-021; INT-019 |
| Compatible Gimmicks | Any gimmick that has (or will have) a second face |
| Cognitive Difficulty | High |
| Execution Difficulty | Low–medium after the idea |
| Discovery Types | DSC-001; DSC-018 |
| Difficulty Knobs | How loudly the first face was taught |
| Variants | Door as floor; switch as platform — examples only, not commitments |
| Failure Readability | Using only the first face should stall readably |
| Anti-Pattern Risks | ANTI-009 if no second face exists; ANTI-019 if the new use is an exploit |
| Example Level | TBD |
| Validated Levels | none |

---

### PAT-015 — Reinterpret Space

| Field | Value |
| --- | --- |
| Pattern ID | `PAT-015` |
| Name | Reinterpret Space |
| Status | CANDIDATE |
| Abstract Structure | The same geometry means something else given a new approach. |
| Primary Cognitive Challenge | See the room as a function of entry state. |
| Required Rule Types | MOTION, CONTACT |
| Compatible Interactions | INT-013; INT-006 |
| Compatible Gimmicks | One-way Surface; any surface whose contact depends on velocity |
| Cognitive Difficulty | High |
| Execution Difficulty | Approach should be achievable |
| Discovery Types | DSC-017 |
| Difficulty Knobs | How different the two readings are |
| Variants | Fast vs slow; high vs low entry |
| Failure Readability | The “wrong reading” should look consistent with the old habit |
| Anti-Pattern Risks | ANTI-002 if geometry actually changed; ANTI-001 if the second reading is hidden |
| Example Level | LVL-W01-012 (possible) |
| Validated Levels | none |

---

### PAT-016 — Same Tool, New Function

| Field | Value |
| --- | --- |
| Pattern ID | `PAT-016` |
| Name | Same Tool, New Function |
| Status | CANDIDATE (signature candidate) |
| Abstract Structure | No new gimmick. A known tool does a new job. |
| Primary Cognitive Challenge | Apply C-05 in play: variation and combination before novelty. |
| Required Rule Types | Already-taught PLAYER / MOTION rules |
| Compatible Interactions | INT-007; INT-008 |
| Compatible Gimmicks | Prefer none new |
| Cognitive Difficulty | High |
| Execution Difficulty | Below cognitive |
| Discovery Types | DSC-005; DSC-006 |
| Difficulty Knobs | Distance from the tool's intro room |
| Variants | Low Bounce as route-starter, not only “go under” |
| Failure Readability | Using the old function should be possible but insufficient |
| Anti-Pattern Risks | ANTI-020 New Gimmick as Solution; ANTI-010 |
| Example Level | LVL-W01-012 |
| Validated Levels | none |

---

### PAT-017 — Combination Discovery

| Field | Value |
| --- | --- |
| Pattern ID | `PAT-017` |
| Name | Combination Discovery |
| Status | CANDIDATE (signature candidate) |
| Abstract Structure | Two known rules, used together, solve what neither solves alone. |
| Primary Cognitive Challenge | Hold two facts at once. |
| Required Rule Types | At least two families |
| Compatible Interactions | Room-defined pair. Named example: INT-016. Do not invent a default pair. |
| Compatible Gimmicks | Prefer already-introduced |
| Cognitive Difficulty | High |
| Execution Difficulty | Combination, once seen, should be performable |
| Discovery Types | DSC-015 |
| Difficulty Knobs | How far apart the two lessons were taught |
| Variants | LOW + wall; BOOST + kill-speed landing — examples, not assignments |
| Failure Readability | Each half working alone should stall |
| Anti-Pattern Risks | ANTI-011 Rule Overload; ANTI-015 if the combo is accidental |
| Example Level | LVL-W01-011 |
| Validated Levels | none |

---

### PAT-018 — Intentional Detour

| Field | Value |
| --- | --- |
| Pattern ID | `PAT-018` |
| Name | Intentional Detour |
| Status | CANDIDATE |
| Abstract Structure | The straight path fails. A longer path is the solution. |
| Primary Cognitive Challenge | Reject the obvious line. |
| Required Rule Types | Depends |
| Compatible Interactions | None specified in DOC-001A |
| Compatible Gimmicks | none required |
| Cognitive Difficulty | Medium–high |
| Execution Difficulty | Detour should not be a precision tax |
| Discovery Types | DSC-007 |
| Difficulty Knobs | How attractive the false straight path is |
| Variants | Detour to set state; detour to build or kill momentum |
| Failure Readability | Straight path fails for a visible reason |
| Anti-Pattern Risks | ANTI-014 if the detour is an invisible alcove |
| Example Level | TBD |
| Validated Levels | none |

---

### PAT-019 — Controlled Failure

| Field | Value |
| --- | --- |
| Pattern ID | `PAT-019` |
| Name | Controlled Failure |
| Status | CANDIDATE |
| Abstract Structure | A miss, bounce, or fall is the intended first step. |
| Primary Cognitive Challenge | Use a “failure” as a setup. |
| Required Rule Types | PLAYER, CONTACT |
| Compatible Interactions | None specified in DOC-001A |
| Compatible Gimmicks | none required |
| Cognitive Difficulty | High |
| Execution Difficulty | The intended miss must be easy to perform on purpose |
| Discovery Types | DSC-016 |
| Difficulty Knobs | How costly an uncontrolled miss is |
| Variants | Fall to a lower ledge on purpose; waste a bounce on purpose |
| Failure Readability | Accidental vs intended miss should be distinguishable after learning |
| Anti-Pattern Risks | ANTI-015; ANTI-019 Mandatory Exploit; ANTI-013 |
| Example Level | TBD |
| Validated Levels | none |

---

### PAT-020 — Delayed Consequence

| Field | Value |
| --- | --- |
| Pattern ID | `PAT-020` |
| Name | Delayed Consequence |
| Status | CANDIDATE |
| Abstract Structure | Cause now, effect later. Plan across the gap. |
| Primary Cognitive Challenge | Hold a future board in mind. |
| Required Rule Types | SIGNAL (Delay), STATE, INFO |
| Compatible Interactions | INT-027 |
| Compatible Gimmicks | Delayed Switch, Timed Gate |
| Cognitive Difficulty | Medium–high |
| Execution Difficulty | After the plan, the wait should not be a reaction test |
| Discovery Types | DSC-013 |
| Difficulty Knobs | Delay length, telegraph |
| Variants | Helpful delay; hostile delay the player must schedule |
| Failure Readability | Effect arriving at the wrong time should be visible |
| Anti-Pattern Risks | ANTI-012, ANTI-004 |
| Example Level | TBD |
| Validated Levels | none |

---

### PAT-021 — Resource Allocation

| Field | Value |
| --- | --- |
| Pattern ID | `PAT-021` |
| Name | Resource Allocation |
| Status | CANDIDATE |
| Abstract Structure | A limited resource can be spent in more than one place. |
| Primary Cognitive Challenge | Choose where the resource does the most work. |
| Required Rule Types | STATE (Counter) or equivalent scarce event |
| Compatible Interactions | INT-005; INT-025 |
| Compatible Gimmicks | Bounce Counter; one-shot Switch |
| Cognitive Difficulty | Medium–high |
| Execution Difficulty | Spending should be a decision, not a fumble |
| Discovery Types | DSC-011 |
| Difficulty Knobs | Budget size; number of sinks |
| Variants | Bounces; switch uses; timed-window uses |
| Failure Readability | Empty budget with work left should be obvious |
| Anti-Pattern Risks | ANTI-018; ANTI-007 if only one spend is real |
| Example Level | TBD |
| Validated Levels | none |

---

### PAT-022 — Alternate Solution

| Field | Value |
| --- | --- |
| Pattern ID | `PAT-022` |
| Name | Alternate Solution |
| Status | CANDIDATE |
| Abstract Structure | More than one intended solution is valid. |
| Primary Cognitive Challenge | Optional. The room must still have a purpose (C-08). |
| Required Rule Types | Depends |
| Compatible Interactions | None specified in DOC-001A |
| Compatible Gimmicks | TBD |
| Cognitive Difficulty | Varies |
| Execution Difficulty | Each intended path stays achievable |
| Discovery Types | D1+ |
| Difficulty Knobs | How advertised the alternate is |
| Variants | Intended alternate; later-knowledge shortcut |
| Failure Readability | N/A for success paths |
| Anti-Pattern Risks | ANTI-007 if the alternate is fake; ANTI-019 if one “path” is an exploit |
| Example Level | TBD — record in LEVEL_LIBRARY when a room has one |
| Validated Levels | none |

Alternate solutions are welcome. They must still follow the Constitution.

---

## Out of scope

- Do not implement example levels from this file.
- Do not add PAT-023+ in this bootstrap.
- Do not invent INT mappings to fill empty Compatible Interactions fields.

# Gimmick Library

Gimmicks embody rules and interactions. They are not a collection quest.

> We are not designing a game about collecting gimmicks.  
> We are designing a game about discovering rules.

> A gimmick should create a choice, not merely an obstacle.

C-05: new gimmicks are the last resort. C-07: important gimmicks need another face.

---

## Schema

```text
Gimmick ID
Name
Status

Visual Role
Rule Composition
Default State

Player Assumption

Primary Use / First Face
Second Face
Further Uses

Compatible Interactions
Visual Cue
Audio Cue

Choice Creation
Fairness Concerns
Anti-Pattern Risks

Complexity Tier
Introduced World
Validated Levels
```

---

## Promotion criteria

Do not promote a gimmick because it is implemented. Require evidence for:

- Rule Consistency
- First Face
- Second Face
- Readability
- Choice Creation
- Reusability

`CORE` needs explicit design approval.

---

## Candidate set — not a build list

The twelve rows below are **CANDIDATES**.

This list is **not** a commitment to implement all twelve.

PLAY-002 has **not** started. Do not implement these gimmicks from this document.

Second Face and Further Uses stay unset unless a later approved note supplies them. C-07 still applies: an important gimmick may not ship without another face.

DOC-001A supplies Second Face material for Door (closed door as wall) and Wind (headwind / airtime). Other second faces are not filled from this pass.

---

## Index

| ID | Name | Status | Introduced World |
| --- | --- | --- | --- |
| GIM-001 | Door | CANDIDATE | TBD |
| GIM-002 | Switch | CANDIDATE | TBD |
| GIM-003 | Wind | CANDIDATE | TBD |
| GIM-004 | Ice | CANDIDATE | TBD |
| GIM-005 | Rough Surface | CANDIDATE | TBD |
| GIM-006 | Spring | CANDIDATE | TBD |
| GIM-007 | Bounce Counter | CANDIDATE | TBD |
| GIM-008 | Timed Gate | CANDIDATE | TBD |
| GIM-009 | Force Switch | CANDIDATE | TBD |
| GIM-010 | Moving Block | CANDIDATE | TBD |
| GIM-011 | One-way Surface | CANDIDATE | TBD |
| GIM-012 | Delayed Switch | CANDIDATE | TBD |

World column is unset on purpose. Visual themes are not locked (see WORLD_LIBRARY).

---

### GIM-001 — Door

| Field | Value |
| --- | --- |
| Gimmick ID | `GIM-001` |
| Name | Door |
| Status | CANDIDATE |
| Visual Role | Barrier that can open or close. Exact art TBD. |
| Rule Composition | R-STATE-001 Binary State; R-CONTACT-001 when closed; R-INFO-001 |
| Default State | TBD |
| Player Assumption | A door blocks a path until something opens it. |
| Primary Use / First Face | Open a route. |
| Second Face | Closed door as a wall (`DSC-001`). C-07 still required before this is important. |
| Further Uses | Opening immediately can be wrong (`DSC-014`) — order, not a third object type. |
| Compatible Interactions | INT-021; INT-022; INT-028 |
| Visual Cue | Open vs closed must be visible. |
| Audio Cue | TBD |
| Choice Creation | Whether to open, leave shut, or use the closed door as geometry. |
| Fairness Concerns | State must be visible. Linked switch must be attributable. |
| Anti-Pattern Risks | ANTI-008 Single-Use; ANTI-009 One-Face; ANTI-001 if the lock is hidden |
| Complexity Tier | TBD |
| Introduced World | TBD |
| Validated Levels | none |

---

### GIM-002 — Switch

| Field | Value |
| --- | --- |
| Gimmick ID | `GIM-002` |
| Name | Switch |
| Status | CANDIDATE |
| Visual Role | Device the player can activate. Exact art TBD. |
| Rule Composition | R-SIGNAL-001 Trigger; usually writes R-STATE-001; R-INFO-001 |
| Default State | TBD |
| Player Assumption | Touch or bounce on it to change something elsewhere. |
| Primary Use / First Face | Toggle or set a Binary State. |
| Second Face | TBD |
| Further Uses | TBD |
| Compatible Interactions | INT-022; INT-028. Pairing with Door is INT-022 → INT-021. Delayed write is GIM-012 / INT-027. |
| Visual Cue | Switch state and target state must be readable. |
| Audio Cue | TBD |
| Choice Creation | When to flip it; whether the new state is the one you want. |
| Fairness Concerns | Effect must be learnable without hidden wiring (ANTI-001). |
| Anti-Pattern Risks | ANTI-007 Fake Choice; ANTI-008; ANTI-016 if taught only by text |
| Complexity Tier | TBD |
| Introduced World | TBD |
| Validated Levels | none |

---

### GIM-003 — Wind

| Field | Value |
| --- | --- |
| Gimmick ID | `GIM-003` |
| Name | Wind |
| Status | CANDIDATE |
| Visual Role | Region that pushes. Exact art TBD. Visual theme not locked. |
| Rule Composition | R-FORCE-001 Directional Force; R-MOTION-001 Momentum; R-INFO-001 |
| Default State | TBD (always on vs switched) |
| Player Assumption | Wind is a hazard that blows me off course. |
| Primary Use / First Face | Change motion without a new button. |
| Second Face | Headwind that reduces horizontal momentum; airtime up or down (`INT-001` Second Face, `DSC-002`). |
| Further Uses | Speed remaining after leaving the region (`INT-016`, `INT-017`). |
| Compatible Interactions | INT-001; INT-016; INT-017; INT-018; INT-019; INT-011 |
| Visual Cue | Direction and presence must be visible before they matter. |
| Audio Cue | TBD |
| Choice Creation | Enter, avoid, or use the push as carry. |
| Fairness Concerns | Invisible wind is ANTI-001. Instant death from wind is ANTI-013 risk. |
| Anti-Pattern Risks | ANTI-009 if it only ever pushes you into a pit; ANTI-002 if it secretly changes bounce |
| Complexity Tier | TBD |
| Introduced World | TBD (conceptual fit: WLD-02) |
| Validated Levels | none |

---

### GIM-004 — Ice

| Field | Value |
| --- | --- |
| Gimmick ID | `GIM-004` |
| Name | Ice |
| Status | CANDIDATE |
| Visual Role | Low-friction surface. Art TBD. Not a locked visual theme. |
| Rule Composition | R-CONTACT-003 Friction (low configuration); R-MOTION-001; R-INFO-001 |
| Default State | Surface property (not a toggle, unless later approved) |
| Player Assumption | Ice makes me slide and lose control. |
| Primary Use / First Face | Preserve horizontal speed. |
| Second Face | TBD |
| Further Uses | TBD |
| Compatible Interactions | INT-003; INT-009; INT-014; INT-016; INT-020. Same rule as Rough Surface, opposite friction configuration. |
| Visual Cue | Must read as slick before it affects speed. |
| Audio Cue | TBD |
| Choice Creation | Land here to keep speed, or avoid to stay precise. |
| Fairness Concerns | Must not look like ordinary ground. |
| Anti-Pattern Risks | ANTI-006 if the only test is not sliding off; ANTI-018 if longer ice = harder |
| Complexity Tier | TBD |
| Introduced World | TBD (conceptual fit: WLD-02) |
| Validated Levels | none |

Do not create a separate “Ice Rule.” Ice is a Friction configuration.

---

### GIM-005 — Rough Surface

| Field | Value |
| --- | --- |
| Gimmick ID | `GIM-005` |
| Name | Rough Surface |
| Status | CANDIDATE |
| Visual Role | High-friction surface. Art TBD. |
| Rule Composition | R-CONTACT-003 Friction (high configuration); R-MOTION-001; R-INFO-001 |
| Default State | Surface property |
| Player Assumption | This ground will slow or stop me. |
| Primary Use / First Face | Kill or dump momentum. |
| Second Face | TBD |
| Further Uses | TBD |
| Compatible Interactions | INT-004; INT-015. Same rule as Ice, opposite friction configuration. |
| Visual Cue | Must read as grabby before it dumps speed. |
| Audio Cue | TBD |
| Choice Creation | Land here to stop, or avoid to keep speed. |
| Fairness Concerns | Must not look like Ice or ordinary ground. |
| Anti-Pattern Risks | ANTI-006; ANTI-009 if it only ever ruins a run |
| Complexity Tier | TBD |
| Introduced World | TBD (conceptual fit: WLD-02) |
| Validated Levels | none |

Do not create a separate “Rough Rule.”

---

### GIM-006 — Spring

| Field | Value |
| --- | --- |
| Gimmick ID | `GIM-006` |
| Name | Spring |
| Status | CANDIDATE |
| Visual Role | Object or pad that launches. Art TBD. |
| Rule Composition | Evaluate as R-FORCE-002 Impulse and/or a variation of R-PLAYER-001 Auto Bounce before inventing a new rule (C-05). R-INFO-001. |
| Default State | TBD |
| Player Assumption | Springs launch me higher. |
| Primary Use / First Face | Extra takeoff. |
| Second Face | TBD |
| Further Uses | TBD |
| Compatible Interactions | INT-002; INT-020 |
| Visual Cue | Must look launch-capable before use. |
| Audio Cue | TBD |
| Choice Creation | Use, skip, or approach with a chosen bounce type. |
| Fairness Concerns | Must not silently replace Auto Bounce identity (C-04). |
| Anti-Pattern Risks | ANTI-020 if a new spring is the only solution; ANTI-009; ANTI-004 if the window is a reaction test |
| Complexity Tier | TBD |
| Introduced World | TBD |
| Validated Levels | none |

---

### GIM-007 — Bounce Counter

| Field | Value |
| --- | --- |
| Gimmick ID | `GIM-007` |
| Name | Bounce Counter |
| Status | CANDIDATE |
| Visual Role | Visible count tied to bounces. Art TBD. |
| Rule Composition | R-STATE-003 Counter; R-PLAYER-001 as the counted event; R-INFO-001 |
| Default State | TBD starting value |
| Player Assumption | I need to bounce a certain number of times. |
| Primary Use / First Face | Threshold after N bounces. |
| Second Face | TBD |
| Further Uses | TBD |
| Compatible Interactions | INT-005; INT-012; INT-025; INT-026. Discovery: DSC-011. |
| Visual Cue | The count must be visible at decision time. |
| Audio Cue | TBD |
| Choice Creation | Spend or conserve bounces; choose bounce type because height changes count rate. |
| Fairness Concerns | Hidden count is ANTI-001. Required exact count with no readable feedback is ANTI-005 / ANTI-015 risk. |
| Anti-Pattern Risks | ANTI-018 Difficulty by Numbers; ANTI-003 if the last bounce is frame-perfect |
| Complexity Tier | TBD |
| Introduced World | TBD (conceptual fit: WLD-04) |
| Validated Levels | none |

---

### GIM-008 — Timed Gate

| Field | Value |
| --- | --- |
| Gimmick ID | `GIM-008` |
| Name | Timed Gate |
| Status | CANDIDATE |
| Visual Role | Opening that exists on a clock. Art TBD. |
| Rule Composition | R-STATE-002 Timed State; R-CONTACT-001 when closed; R-INFO-001 |
| Default State | TBD |
| Player Assumption | I must rush through before it closes. |
| Primary Use / First Face | A limited window to pass. |
| Second Face | TBD |
| Further Uses | TBD |
| Compatible Interactions | INT-023. Pattern: PAT-010 Timed Window. |
| Visual Cue | Open/closed and remaining time must be readable. |
| Audio Cue | TBD |
| Choice Creation | Go now, wait for the next cycle, or use the closed gate as geometry. |
| Fairness Concerns | Unreadable timer is ANTI-012. Frame-perfect crossing is ANTI-003. |
| Anti-Pattern Risks | ANTI-004 Reaction Test; ANTI-006 Execution Tax |
| Complexity Tier | TBD |
| Introduced World | TBD (conceptual fit: WLD-04) |
| Validated Levels | none |

---

### GIM-009 — Force Switch

| Field | Value |
| --- | --- |
| Gimmick ID | `GIM-009` |
| Name | Force Switch |
| Status | CANDIDATE |
| Visual Role | Switch that cares about how it is hit, not only that it is hit. Art TBD. |
| Rule Composition | R-SIGNAL-001 Trigger with a force/impulse/velocity condition; R-FORCE-002 and/or R-MOTION-001; R-INFO-001 |
| Default State | TBD |
| Player Assumption | Any touch will do. |
| Primary Use / First Face | Activate only under a known motion condition. |
| Second Face | TBD |
| Further Uses | TBD |
| Compatible Interactions | INT-022 (it is a Trigger that writes state). No force-threshold INT is registered; do not invent one. |
| Visual Cue | The required condition must be teachable from the object, not from text only (ANTI-016). |
| Audio Cue | TBD |
| Choice Creation | Approach with LOW, BOOST, or neutral; succeed or spare the switch. |
| Fairness Concerns | If the threshold is invisible, the switch is a luck box (ANTI-005). |
| Anti-Pattern Risks | ANTI-015 Solution by Accident; ANTI-001 |
| Complexity Tier | TBD |
| Introduced World | TBD (conceptual fit: WLD-02 / WLD-03) |
| Validated Levels | none |

Threshold numbers are not recorded. Do not freeze them.

---

### GIM-010 — Moving Block

| Field | Value |
| --- | --- |
| Gimmick ID | `GIM-010` |
| Name | Moving Block |
| Status | CANDIDATE |
| Visual Role | Solid that relocates. Art TBD. |
| Rule Composition | R-CONTACT-001 on a changing transform. Motion path is a parameter, not a new rule. R-INFO-001. |
| Default State | TBD path / period |
| Player Assumption | I must ride it or wait for it. |
| Primary Use / First Face | A platform or door that changes position. |
| Second Face | TBD |
| Further Uses | TBD |
| Compatible Interactions | None specified in DOC-001A. Pattern: PAT-012 Synchronization. |
| Visual Cue | Path or cycle must be readable. |
| Audio Cue | TBD |
| Choice Creation | Ride, use as a moving wall, or treat as a timed solid. |
| Fairness Concerns | Unreadable path is ANTI-001. Crush without telegraph is ANTI-013 risk. |
| Anti-Pattern Risks | ANTI-004; ANTI-012; ANTI-010 if many movers replace rule depth |
| Complexity Tier | TBD |
| Introduced World | TBD |
| Validated Levels | none |

---

### GIM-011 — One-way Surface

| Field | Value |
| --- | --- |
| Gimmick ID | `GIM-011` |
| Name | One-way Surface |
| Status | CANDIDATE |
| Visual Role | Surface that is solid from one approach and passable from another. Art TBD. |
| Rule Composition | Variation of R-CONTACT-001. Must remain a readable variation, not a secret hole. R-INFO-001. |
| Default State | Allowed direction TBD |
| Player Assumption | Solids are solids from every side. |
| Primary Use / First Face | Enter a space you cannot exit the same way — or the reverse. |
| Second Face | TBD |
| Further Uses | TBD |
| Compatible Interactions | None specified in DOC-001A. Patterns: PAT-013 Commitment; PAT-015 Reinterpret Space. |
| Visual Cue | Allowed direction must be visible before commitment. |
| Audio Cue | TBD |
| Choice Creation | Commit to a side; use it as floor or as passage. |
| Fairness Concerns | Invisible one-way is ANTI-001 and ANTI-002. |
| Anti-Pattern Risks | ANTI-013 if falling through is a long reset; ANTI-009 |
| Complexity Tier | TBD |
| Introduced World | TBD (conceptual fit: WLD-03 / WLD-05) |
| Validated Levels | none |

---

### GIM-012 — Delayed Switch

| Field | Value |
| --- | --- |
| Gimmick ID | `GIM-012` |
| Name | Delayed Switch |
| Status | CANDIDATE |
| Visual Role | Switch whose effect arrives later. Art TBD. |
| Rule Composition | R-SIGNAL-001 Trigger + R-SIGNAL-002 Delay; usually R-STATE-001; R-INFO-001 |
| Default State | TBD delay |
| Player Assumption | The effect happens now. |
| Primary Use / First Face | Cause, then wait, then effect. |
| Second Face | TBD |
| Further Uses | TBD |
| Compatible Interactions | INT-027; INT-022. Pattern: PAT-020 Delayed Consequence. Discovery: DSC-013. |
| Visual Cue | The wait must be telegraphed. |
| Audio Cue | TBD |
| Choice Creation | Start the delay when the coming state will help, not when it is convenient to press. |
| Fairness Concerns | Hidden delay is ANTI-012. |
| Anti-Pattern Risks | ANTI-004 if the delay is only a reaction test; ANTI-008 |
| Complexity Tier | TBD |
| Introduced World | TBD (conceptual fit: WLD-04) |
| Validated Levels | none |

---

## Reserved / out of scope

- Do not add GIM-013+ in this bootstrap.
- Do not implement any candidate from this file.
- Do not invent Second Faces to satisfy C-07 on paper. Satisfy C-07 in design work, then record the face here.

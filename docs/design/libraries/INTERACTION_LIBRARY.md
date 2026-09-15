# Interaction Library

Interactions are what happens when named rules combine.

They do not invent silent extra rules. If a result cannot be predicted from the listed rules, it is not an interaction — it is a new rule or a rule betrayal (ANTI-002).

> Do not treat parameter configurations as independent rules.

Anti-Patterns validate this layer.

---

## Schema

```text
Interaction ID
Name
Status

Rule A
Rule B

Result
Preconditions
Priority / Conflict Resolution

Player Cue
Discovery Potential

Design Uses
Test Case
```

More than two rules may participate. `Rule A` / `Rule B` name the primary pair. Additional rules go under Result / Preconditions.

---

## Discovery Potential

| Score | Meaning |
| --- | --- |
| 0 | Engine-level behavior |
| 1 | Useful but expected |
| 2 | Meaningful puzzle potential |
| 3 | Strong discovery potential |

---

## Registration criteria

Record an interaction only when it earns at least three YES answers:

1. Does it change a player decision?
2. Is it predictable from known rules?
3. Is it reusable?
4. Does it have discovery potential?

A 0-score engine coupling may still be listed if designers need a stable name for it. Prefer not to promote those to `CORE`.

---

## Status lifecycle reminder

Implementation does not validate an interaction. PLAY-001B couplings that exist in code remain `EXPERIMENTAL` until playtest supports the intended design.

---

## Source-note gap (DOC-001)

The bootstrap brief requires the official **INT-001 through INT-028** candidate set from the design notes.

Those notes were **not present** in this repository, in GitHub issues, or on existing branches at bootstrap time.

Therefore:

- `INT-001` … `INT-028` are **reserved**.
- Do not invent names, rule pairs, or results for reserved IDs.
- Do not assign a reserved ID to an observed playground coupling.
- When the design notes are added, fill the reserved slots in place. IDs stay permanent.

Observed PLAY-001B couplings are listed below as **unnumbered working notes** so the reserved range stays clean.

---

## Reserved IDs

| ID | Name | Status |
| --- | --- | --- |
| INT-001 | *(reserved — awaiting design notes)* | RESERVED |
| INT-002 | *(reserved — awaiting design notes)* | RESERVED |
| INT-003 | *(reserved — awaiting design notes)* | RESERVED |
| INT-004 | *(reserved — awaiting design notes)* | RESERVED |
| INT-005 | *(reserved — awaiting design notes)* | RESERVED |
| INT-006 | *(reserved — awaiting design notes)* | RESERVED |
| INT-007 | *(reserved — awaiting design notes)* | RESERVED |
| INT-008 | *(reserved — awaiting design notes)* | RESERVED |
| INT-009 | *(reserved — awaiting design notes)* | RESERVED |
| INT-010 | *(reserved — awaiting design notes)* | RESERVED |
| INT-011 | *(reserved — awaiting design notes)* | RESERVED |
| INT-012 | *(reserved — awaiting design notes)* | RESERVED |
| INT-013 | *(reserved — awaiting design notes)* | RESERVED |
| INT-014 | *(reserved — awaiting design notes)* | RESERVED |
| INT-015 | *(reserved — awaiting design notes)* | RESERVED |
| INT-016 | *(reserved — awaiting design notes)* | RESERVED |
| INT-017 | *(reserved — awaiting design notes)* | RESERVED |
| INT-018 | *(reserved — awaiting design notes)* | RESERVED |
| INT-019 | *(reserved — awaiting design notes)* | RESERVED |
| INT-020 | *(reserved — awaiting design notes)* | RESERVED |
| INT-021 | *(reserved — awaiting design notes)* | RESERVED |
| INT-022 | *(reserved — awaiting design notes)* | RESERVED |
| INT-023 | *(reserved — awaiting design notes)* | RESERVED |
| INT-024 | *(reserved — awaiting design notes)* | RESERVED |
| INT-025 | *(reserved — awaiting design notes)* | RESERVED |
| INT-026 | *(reserved — awaiting design notes)* | RESERVED |
| INT-027 | *(reserved — awaiting design notes)* | RESERVED |
| INT-028 | *(reserved — awaiting design notes)* | RESERVED |

`RESERVED` is a bootstrap placeholder, not a lifecycle status. After the notes arrive, each row takes a normal status (`CANDIDATE` or later).

---

## Observed PLAY-001B couplings (unnumbered)

These are working notes from the current movement pass. They are **not** the official INT set. Do **not** give them `INT-###` IDs in this document.

None of these notes freeze parameter values.

### Gravity × Auto Bounce

| Field | Note |
| --- | --- |
| Rule A | R-WORLD-001 Gravity |
| Rule B | R-PLAYER-001 Auto Bounce |
| Result | A repeating rise/fall cycle. Landing is a known event. |
| Preconditions | Valid floor contact. |
| Priority | Auto Bounce applies on qualifying floor contact; gravity resumes in air. |
| Player Cue | The ball leaves the floor without a jump press. |
| Discovery Potential | 0–1 |
| Design Uses | Every room. Foundation for landing grammar. |
| Test Case | Fall onto a floor with no direction held → NORMAL bounce. |
| Registration (informal) | 2. yes 3. yes — may fail #1 and #4 alone. |

### Directional Control × Momentum

| Field | Note |
| --- | --- |
| Rule A | R-PLAYER-002 Directional Control |
| Rule B | R-MOTION-001 Momentum |
| Result | Held or released input changes how existing speed persists. |
| Preconditions | Non-zero or changing horizontal velocity. |
| Priority | Velocity Limit still caps the result. |
| Player Cue | The ball keeps traveling after release; reverse is not instant. |
| Discovery Potential | 1–2 |
| Design Uses | Air position control (LVL-W01-003). |
| Test Case | Release keys at apex; observe continued travel. |

### Fresh press × Auto Bounce → Low Bounce

| Field | Note |
| --- | --- |
| Rule A | R-PLAYER-002 Directional Control (fresh press) |
| Rule B | R-PLAYER-001 Auto Bounce |
| Result | R-PLAYER-003 Low Bounce. Shorter vertical takeoff. |
| Preconditions | Fresh press inside the landing window. Exact ms is a knob. |
| Priority | Intent classification: fresh press wins over hold. LOW and BOOST are not both applied. |
| Player Cue | Late tap at the floor → short hop. |
| Discovery Potential | 2–3 |
| Design Uses | Low ceiling routes. DSC-005, DSC-006. |
| Test Case | Tap near landing → LOW. Hold from earlier → not LOW. |
| Status | EXPERIMENTAL (the player rule is EXPERIMENTAL). |

### Sustained hold × Auto Bounce → Landing Boost

| Field | Note |
| --- | --- |
| Rule A | R-PLAYER-002 Directional Control (hold) |
| Rule B | R-PLAYER-001 Auto Bounce |
| Result | R-PLAYER-004 Landing Boost. Extra horizontal carry. Vertical bounce remains Auto Bounce unless a later rule says otherwise. |
| Preconditions | Hold that is not classified as fresh press. |
| Priority | After fresh-press check fails. |
| Player Cue | Holding through landing carries farther. |
| Discovery Potential | 2 |
| Design Uses | Long gaps (LVL-W01-007). LOW vs BOOST choice (LVL-W01-008). |
| Test Case | Hold direction before the fresh window → BOOST, not LOW. |
| Status | EXPERIMENTAL. |

### Directional Control × Solid Collision (wall) → Wall Jump

| Field | Note |
| --- | --- |
| Rule A | R-PLAYER-002 Directional Control |
| Rule B | R-CONTACT-001 Solid Collision |
| Result | R-PLAYER-005 Wall Jump: leave up and away. |
| Preconditions | Wall contact + intent away from that wall. Not both walls. |
| Priority | Wall bounce is not a floor bounce. Must not send the player down. |
| Player Cue | Press off a touched wall → up and out. |
| Discovery Potential | 2 |
| Design Uses | LVL-W01-009, LVL-W01-010. |
| Test Case | Touch wall, press away → upward outbound bounce. |
| Status | EXPERIMENTAL. |

### Impulse × Acceleration

| Field | Note |
| --- | --- |
| Rule A | R-FORCE-002 Impulse |
| Rule B | R-MOTION-002 Acceleration |
| Result | A press kicks velocity; a hold continues to change it. Movement is not a digital snap to max speed. |
| Preconditions | Directional Control. |
| Priority | Impulse on press edge; Acceleration while held. |
| Player Cue | Tap vs hold feel different. |
| Discovery Potential | 1 |
| Design Uses | PLAY-001B feel. Not a puzzle by itself. |
| Test Case | KeyDown once, then hold; speed changes in two phases. |
| Status | EXPERIMENTAL. |

### Acceleration × Velocity Limit

| Field | Note |
| --- | --- |
| Rule A | R-MOTION-002 Acceleration |
| Rule B | R-MOTION-003 Velocity Limit |
| Result | Speed approaches a cap and stops rising. |
| Preconditions | Held direction. |
| Priority | Cap wins. |
| Player Cue | The ball stops speeding up. |
| Discovery Potential | 0–1 |
| Design Uses | Keep execution achievable (C-02). |
| Test Case | Hold RIGHT on open floor; speed plateaus. |

### Momentum × entry into the same space

| Field | Note |
| --- | --- |
| Rule A | R-MOTION-001 Momentum |
| Rule B | R-CONTACT-001 Solid Collision (same geometry) |
| Result | The same location can play differently depending on entry velocity. |
| Preconditions | Geometry unchanged. Velocity different. |
| Priority | Rules do not change; the state of motion does. |
| Player Cue | Fast vs slow approach is visible. |
| Discovery Potential | 3 (named: DSC-017) |
| Design Uses | Reinterpret Space (PAT-015). Mastery rooms. |
| Test Case | Deferred — no authored level yet. |
| Registration | Likely 4× YES once a room exists. |

### Low Bounce × takeoff carry

| Field | Note |
| --- | --- |
| Rule A | R-PLAYER-003 Low Bounce |
| Rule B | R-MOTION-001 Momentum |
| Result | A short bounce can be the start of a stronger horizontal route. |
| Preconditions | LOW takeoff with directional intent. |
| Priority | LOW sets height; momentum/takeoff min set travel. |
| Player Cue | After a short hop the ball is still moving; the next landing can be a setup. |
| Discovery Potential | 3 (named: DSC-006) |
| Design Uses | LVL-W01-005, LVL-W01-012 candidates. |
| Test Case | Deferred — no authored level yet. |

---

## Candidate couplings not in PLAY-001B

Do not assign reserved INT IDs. Record only as future investigation prompts:

- Friction × Momentum — kill or keep speed on a surface (GIM-004, GIM-005).
- Directional Force × Momentum — wind as help and hindrance (GIM-003).
- Counter × Auto Bounce — bounce count as resource (GIM-007, DSC-011).
- Trigger × Binary State — switch and door (GIM-001, GIM-002).
- Delay × Trigger — delayed consequence (GIM-012, PAT-020).
- Impulse × Auto Bounce — spring-like takeoff (GIM-006), only after C-05 checks.

These are not registered interactions. PLAY-002 has not started.

---

## Normalization needed later

- Map reserved `INT-001`–`INT-028` onto official names from the missing design notes.
- Decide which observed PLAY-001B couplings are the same rows as those notes (do not duplicate).
- Score Discovery Potential officially after that mapping.

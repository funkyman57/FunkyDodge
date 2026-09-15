# World Library

Worlds sequence levels. They ask one core question at a time.

Vocabulary (Knowledge Graph, Knowledge Gate, Movement State) is defined in [DESIGN_SYSTEM.md](../DESIGN_SYSTEM.md). Room rows live in [LEVEL_LIBRARY.md](LEVEL_LIBRARY.md). Do not duplicate those definitions here.

Official status for worlds and rooms: `CANDIDATE`. Role: progression candidate. Documentation is not validation.

Do **not** lock visual themes. Do not implement these worlds. PLAY-002 has not started. PLAY-001B feel validation is pending.

Geometry / physics values: `TBD — after PLAY-001B feel validation`. See DESIGN_SYSTEM.

---

## Schema

```text
World ID
Name
Status

Core Question
Design Theme

Rules Emphasized
Existing Rules Recontextualized
New Rule Budget

Major Discoveries
Difficulty Curve

Visual Identity
Audio Identity

Mastery Test
Transition to Next World
```

IDs are permanent: `WLD-01`.

---

## W1–W3 accumulation

```text
W1 — CONTROL
“I can manipulate my Movement State.”
        ↓
W2 — MOMENTUM
“The environment also changes my Movement State,
and I can prepare/manage that state.”
        ↓
W3 — POSSIBILITY
“Object state changes which movement possibilities exist.”
```

Knowledge accumulates; it is not replaced.

Examples (no new INT IDs — compose existing ones):

- W1: LOW
- W2: LOW × Momentum; LOW × Wind (`INT-001`); LOW × Low Friction (`INT-003`)
- W3: Movement State × Door State (`INT-021`); Momentum × Door (`INT-013` + closed solid); Wall Jump × Closed Door

W4 TIME and W5 UNDERSTANDING stay high-level. No detailed rooms in this pass.

---

## Discovery distribution (guidance, not ownership)

| World | Conceptual homes |
| --- | --- |
| W1 | DSC-005, DSC-006, DSC-010, DSC-017 |
| W2 | DSC-002, DSC-003, DSC-004, DSC-007, DSC-008, DSC-009, DSC-017 reinforcement |
| W3 | DSC-001, DSC-014, DSC-015, DSC-018 |
| Later | DSC-011, DSC-012, DSC-013, DSC-016 |

Do not force every DSC into W1–W3. Do not lock a DSC to one world.

---

## World progression curve

```text
TEACH → APPLY → TEST → REINTERPRET → COMBINE → MASTERY
```

Do not open a world with mastery. Do not end a world with an untaught new gimmick (ANTI-020).

---

## Conceptual structure

| ID | Role | Core Question | Status | Room detail |
| --- | --- | --- | --- | --- |
| WLD-01 | CONTROL | HOW DO I MOVE? | CANDIDATE | 12 progression candidates |
| WLD-02 | MOMENTUM | WHAT CHANGES MY MOTION? | CANDIDATE | 12 progression candidates |
| WLD-03 | POSSIBILITY | WHAT CAN OBJECTS BECOME? | CANDIDATE | 12 progression candidates |
| WLD-04 | TIME | WHEN SHOULD I ACT? | CANDIDATE | high-level only |
| WLD-05 | UNDERSTANDING | WHAT DO I REALLY KNOW? | CANDIDATE | high-level only |

---

### WLD-01 — HOW DO I MOVE?

| Field | Value |
| --- | --- |
| World ID | `WLD-01` |
| Name | HOW DO I MOVE? |
| Role | CONTROL |
| Status | CANDIDATE |
| Core Question | How do I move? |
| Design Theme | Player physics. Not a visual theme. |
| World purpose | The player does not jump. The ball auto-bounces; the player intervenes in its trajectory. |
| End-of-world understanding | “I do not command jumps. I manipulate the trajectory of a continuously bouncing ball.” |
| Rules Emphasized | R-PLAYER-001…005; R-MOTION-001…003; R-CONTACT-001; R-WORLD-001 |
| New Rule Budget | Player physics only. **No** Door, Switch, Wind, Ice, Spring, Counter, Timer unless later playtest shows a strong need. |
| Major Discoveries | DSC-005, DSC-006, DSC-010, DSC-017 (guidance) |
| Mastery Test | LVL-W01-012 |
| Transition to Next World | Player can manipulate Movement State. Next: the environment also changes it. |
| Visual / Audio Identity | **Not locked.** |

LOW ≠ weak. BOOST ≠ better. LOW / NORMAL / BOOST are choices, not a power ladder.

PLAY-001B is still validating movement feel. Do not mark Low Bounce, Landing Boost, or Wall Jump `CORE`.

#### Knowledge Graph

```text
                         AUTO BOUNCE
                              |
                 +------------+------------+
                 |                         |
                 v                         v
        DIRECTIONAL CONTROL              LANDING
                 |                         |
                 v              +----------+----------+
          AIR STEERING          |                     |
                                v                     v
                              LOW                   BOOST
                               |                     |
                               +----------+----------+
                                          |
                                          v
                                  BOUNCE CHOICE
                                          |
                                          v
                                      MOMENTUM
                                          |
                         +----------------+----------------+
                         |                                 |
                         v                                 v
                    SOLID WALL                        ENTRY SPEED
                         |                                 |
                         v                                 |
                    WALL JUMP                             |
                         +----------------+----------------+
                                          |
                                          v
                                  MOVEMENT LANGUAGE
                                          |
                                          v
                                  REINTERPRETATION
```

#### Knowledge Gates

Not separate exam rooms.

| Gate | Requirement | May be satisfied in |
| --- | --- | --- |
| W1-GATE-1 | Deliberately change an Auto Bounce trajectory | LVL-W01-002 / LVL-W01-003 |
| W1-GATE-2 | Distinguish LOW / NORMAL / BOOST intentionally | LVL-W01-007 |
| W1-GATE-3 | Use Wall and Momentum as movement tools | LVL-W01-009 / LVL-W01-010 |
| W1-GATE-4 | Select among movement techniques by situation | LVL-W01-011 |

Rooms: `LVL-W01-001` … `LVL-W01-012`.

---

### WLD-02 — WHAT CHANGES MY MOTION?

| Field | Value |
| --- | --- |
| World ID | `WLD-02` |
| Name | WHAT CHANGES MY MOTION? |
| Role | MOMENTUM |
| Status | CANDIDATE |
| Core Question | What changes my motion? |
| Design Theme | Momentum is managed. Not a visual theme. Do not assume “ice world” art. |
| World purpose | Movement State is changed by the environment as well as input. |
| Central concept | Momentum is something you manage: build, preserve, redirect, reduce, intentionally discard. Greater speed is not universally better. |
| Rules Emphasized | R-FORCE-001; R-CONTACT-003 (low/high configs); R-MOTION-001; R-INFO-001 |
| New Rule Budget | Wind, Ice, Rough Surface only. **Impulse / Spring not required** (C-05). Keep `R-FORCE-002` and `GIM-006` in libraries. |
| Major Discoveries | DSC-002, DSC-003, DSC-004, DSC-007, DSC-008, DSC-009, DSC-017 reinforcement |
| Mastery Test | LVL-W02-012 |
| Transition to Next World | Speed is managed. Next: object state changes possibility. |
| Visual / Audio Identity | **Not locked.** |
| World conclusion | “Speed is not simply an outcome. It is something I manage.” |

Do not turn BUILD / PRESERVE / USE / KILL into player-visible meters.

#### Knowledge Graph

```text
                    W1 MOVEMENT LANGUAGE
                            |
                            v
                       MOMENTUM
                            |
            +---------------+---------------+
            |                               |
            v                               v
    DIRECTIONAL FORCE                    FRICTION
            |                               |
         WIND                     +---------+---------+
            |                     |                   |
            v                     v                   v
     CHANGE TRAJECTORY       LOW FRICTION        HIGH FRICTION
                                  |                   |
                                  v                   v
                              KEEP SPEED          KILL SPEED
                                  |                   |
            +---------------------+-------------------+
                                  |
                                  v
                           MANAGE MOMENTUM
                                  |
                         +--------+--------+
                         |                 |
                         v                 v
                    BUILD SPEED        LOSE SPEED
                         |                 |
                         +--------+--------+
                                  |
                                  v
                             ENTRY STATE
                                  |
                                  v
                       ENVIRONMENT MASTERY
```

#### Knowledge Gates

| Gate | Requirement | May be satisfied in |
| --- | --- | --- |
| W2-GATE-1 | Wind changes trajectory | LVL-W02-001 |
| W2-GATE-2 | Use Wind with and against its direction | LVL-W02-002 / LVL-W02-003 / LVL-W02-004 |
| W2-GATE-3 | Use Low Friction to preserve Momentum | LVL-W02-005 / LVL-W02-006 |
| W2-GATE-4 | Use High Friction to remove Momentum on purpose | LVL-W02-007 / LVL-W02-008 |
| W2-GATE-5 | Build useful Movement State before the objective | LVL-W02-009 |
| W2-GATE-6 | Plan Movement State required at a future location | LVL-W02-010 / LVL-W02-011 |

Rooms: `LVL-W02-001` … `LVL-W02-012`.

---

### WLD-03 — WHAT CAN OBJECTS BECOME?

| Field | Value |
| --- | --- |
| World ID | `WLD-03` |
| Name | WHAT CAN OBJECTS BECOME? |
| Role | POSSIBILITY |
| Status | CANDIDATE |
| Core Question | What can objects become? |
| Design Theme | State changes possibility. C-07. Not a visual theme. |
| World purpose | An object's state changes what possibilities it provides. |
| Core statement | State changes possibility. |
| Primary Gimmicks | GIM-001 Door; GIM-002 Switch |
| Rules Emphasized | R-STATE-001; R-SIGNAL-001; R-CONTACT-001; R-INFO-001 |
| Existing Rules Recontextualized | W1+W2 movement language |
| New Rule Budget | Door + Switch only. **GIM-010 / GIM-011 not required.** Keep them as library candidates. Do not invent Motion/Kinematic or Conditional Collision rules for them. |
| Major Discoveries | DSC-001, DSC-014, DSC-015, DSC-018 |
| Mastery Test | LVL-W03-012 |
| Transition to Next World | Objects have contextual roles. Next question (W4): *when*. |
| Visual / Audio Identity | **Not locked.** |
| World conclusion | Objects do not have one purpose. Their state changes what they can become. |

W3 is physical possibility, not Boolean-logic puzzles.

#### Knowledge Graph

```text
                 W1 + W2 KNOWLEDGE
                        |
                        v
                  PHYSICAL OBJECT
                        |
                 +------+------+
                 |             |
                 v             v
              SOLID          STATE
                 |             |
                 v             v
               WALL        OPEN / CLOSED
                 |             |
                 +------+------+
                        |
                        v
                       DOOR
                        |
              +---------+---------+
              |                   |
              v                   v
          PASSAGE               SURFACE
              |                   |
              v                   v
          OPEN DOOR          CLOSED DOOR
                                  |
                             WALL / REBOUND
                                  |
                                  v
                              WALL JUMP

                       SWITCH
                          |
                          v
                       TRIGGER
                          |
                          v
                    CHANGE STATE
                          |
               +----------+----------+
               |                     |
               v                     v
          CREATE ROUTE          REMOVE TOOL
               |                     |
               +----------+----------+
                          |
                          v
                    STATE PLANNING
                          |
                          v
                    OBJECT ROLE
                          |
                          v
                   SECOND FACE
```

#### Knowledge Gates

| Gate | Requirement | May be satisfied in |
| --- | --- | --- |
| W3-GATE-1 | Switch → state change | LVL-W03-001 / LVL-W03-002 |
| W3-GATE-2 | Closed Door is a usable physical surface | LVL-W03-004 |
| W3-GATE-3 | Stop treating OPEN/CLOSED as GOOD/BAD | LVL-W03-006 |
| W3-GATE-4 | Plan order of Movement and State | LVL-W03-003 / LVL-W03-008 / LVL-W03-009 |
| W3-GATE-5 | Reinterpret the same object by context | LVL-W03-010 |
| W3-GATE-6 | Combine object state with prior physics | LVL-W03-011 |

Rooms: `LVL-W03-001` … `LVL-W03-012`.

---

### WLD-04 — WHEN SHOULD I ACT?

High-level conceptual candidate only. Role: TIME. No room list in this pass.

Rules/gimmicks remain library candidates (`R-STATE-002`, `R-STATE-003`, `R-SIGNAL-002`; Timed Gate, Bounce Counter, Delayed Switch). Discoveries DSC-011, DSC-012, DSC-013 are later-world guidance.

Do not freeze durations. Visual/audio **not locked**.

---

### WLD-05 — WHAT DO I REALLY KNOW?

High-level conceptual candidate only. Role: UNDERSTANDING. No room list in this pass.

Near-zero new-gimmick budget (C-05). Prefer PAT-009, PAT-015, PAT-016, PAT-017. D3 remains rare.

---

## Anti-pattern review (W1–W3 architecture)

Conceptual only. Do not fabricate PASS from documentation.

| ID | Result |
| --- | --- |
| ANTI-001 Hidden Information | **Structurally compliant** if Visible State / door-as-wall setup is kept. **Playtest** for attributable wind/friction/door cues. |
| ANTI-002 Rule Betrayal | **Structurally compliant** — no silent rule exceptions in this architecture. |
| ANTI-003 Frame-Perfect Input | **Requires playtest** — landing grammar and windows are PLAY-001B knobs. |
| ANTI-004 Reaction Test | **Structurally compliant** for W1–W3 (no required timers). **Playtest** W2 wind fights. |
| ANTI-006 Execution Tax | **Requires playtest** — C-02 target stated; unvalidated feel. |
| ANTI-008 Single-Use Gimmick | **Structurally compliant** — Wind/Ice/Rough/Door/Switch are reused across rooms. |
| ANTI-009 One-Face Gimmick | **Structurally compliant** for Door and Wind (second faces assigned). Switch second face is a **candidate**. Ice/Rough second faces still unset — **unresolved** as C-07 importance, not as W2 teach. |
| ANTI-010 Gimmick Flood | **Structurally compliant** — W1 none; W2 three configs; W3 two objects; Spring/movers excluded. |
| ANTI-011 Rule Overload | **Structurally compliant** if worlds accumulate as graphed. **Playtest** W1-011 / W2-010 / W3-011 combine rooms. |
| ANTI-015 Solution by Accident | **Requires playtest** — gates require deliberate application; accidental-clear risk is empirical. |
| ANTI-017 Redundant Puzzle | **Structurally compliant** — each room has a distinct knowledge job. **Playtest** for felt clones. |
| ANTI-018 Difficulty by Numbers | **Structurally compliant** — no numeric grind specified. |
| ANTI-020 New Gimmick as Solution | **Structurally compliant** — mastery rooms forbid new rules/gimmicks. |

---

## Shared constraints

- Do not implement rooms or gimmicks from this file.
- Do not grow the New Rule Budget to fill world length.
- Do not specify geometry or physics values.
- Knowledge Gates are requirements, not extra `LVL-` IDs.

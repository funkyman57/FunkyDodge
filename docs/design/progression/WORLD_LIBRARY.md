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

## W1–W5 accumulation

```text
W1 — CONTROL
Where / how do I move?
        ↓
W2 — MOMENTUM
In what Movement State should I arrive?
        ↓
W3 — POSSIBILITY
What should the World State be?
        ↓
W4 — TIME
When should those states exist?
        ↓
W5 — UNDERSTANDING
What assumptions am I making, and what else is possible?
```

W5 does not replace prior knowledge. It recombines and reinterprets W1–W4.

Examples (no new INT IDs):

- W1: LOW
- W2: LOW × Momentum; LOW × Wind (`INT-001`); LOW × Low Friction (`INT-003`)
- W3: Movement State × Door State (`INT-021`); Momentum × Door (`INT-013` + closed solid)
- W4: Bounce count (`INT-005`); Timed State (`INT-023`); Delay (`INT-027`)
- W5: compose taught pairs only

Rhythm, Reward, Cognitive Operation Variety: [DESIGN_SYSTEM.md](../DESIGN_SYSTEM.md).

---

## Discovery distribution (guidance, not ownership)

| World | Conceptual homes |
| --- | --- |
| W1 | DSC-005, DSC-006, DSC-010, DSC-017 (seed) |
| W2 | DSC-002, DSC-003, DSC-004, DSC-007 (seed), DSC-008, DSC-009, DSC-017 (payoff/reinforcement) |
| W3 | DSC-001, DSC-014, DSC-015, DSC-018, DSC-016 (weak seed only) |
| W4 | DSC-011, DSC-012, DSC-013 |
| W5 | DSC-007 payoff; DSC-016 payoff; DSC-009/011/012/013/014/015/018 reinforcement or recombination |

Long-range: DSC-017 W1 seed → W2 payoff; DSC-007 W2 seed → W5 payoff; DSC-016 W3 seed → W5 payoff.

Do not lock a DSC to one world. Discovery → Knowledge → Future Tool.

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
| WLD-04 | TIME | WHEN SHOULD I ACT? | CANDIDATE | 12 progression candidates |
| WLD-05 | UNDERSTANDING | WHAT DO I REALLY KNOW? | CANDIDATE | 12 progression candidates |

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

| Field | Value |
| --- | --- |
| World ID | `WLD-04` |
| Name | WHEN SHOULD I ACT? |
| Role | TIME |
| Status | CANDIDATE |
| Core Question | When should I act? |
| Core understanding | Reason about *when* a future state will exist, not only the current state. |
| Time principle | Time is reasoned about, not reacted to. A timing window creates a planning decision before an execution challenge. |
| Avoid | Frame-perfect windows; unexplained timers; sudden state changes; arbitrary timing; reaction-only gates; invisible countdown (ANTI-003, ANTI-004, ANTI-012) |
| Rules Emphasized | R-STATE-003; R-STATE-002; R-SIGNAL-002; R-INFO-001 |
| New Rule Budget | Bounce Counter, Timed Gate, Delayed Switch (or Switch+Delay variation). Three distinct questions: How many? How long? When later? |
| Delayed Switch note | May later be a Switch variation, not a separate object family. **Do not resolve in DOC-003.** |
| Major Discoveries | DSC-011, DSC-012, DSC-013 |
| Mastery Test | LVL-W04-012 |
| Transition to Next World | Future states can be planned. Next: what else is possible with known rules? |
| Visual / Audio Identity | **Not locked.** Durations TBD — after PLAY-001B / relevant prototype validation. |

#### Knowledge Graph

```text
WORLD STATE
    |
    v
   TIME
    |
 +--+----------------+
 |          |        |
 v          v        v
COUNT      WINDOW   DELAY
 |          |        |
 v          v        v
HOW MANY? HOW LONG? WHEN LATER?
 |          |        |
 v          v        v
BOUNCE    TIMED     FUTURE
COUNTER   STATE     CONSEQUENCE
 \          |        /
  \         |       /
   +--------+------+
            |
            v
        PREDICTION
            |
            v
      ACTION TIMING
         /      \
        v        v
     ACT NOW    WAIT
        \        /
         \      /
          v    v
     SYNCHRONIZATION
            |
            v
       TIME MASTERY
```

#### Knowledge Gates

| Gate | Requirement | May be satisfied in |
| --- | --- | --- |
| W4-GATE-1 | Bounce is a countable event/resource | LVL-W04-001 / LVL-W04-002 |
| W4-GATE-2 | Extra Bounce or detour to alter future state | LVL-W04-003 |
| W4-GATE-3 | Waiting as intentional strategy | LVL-W04-004 |
| W4-GATE-4 | Plan around a readable Timed State window | LVL-W04-005 / LVL-W04-006 |
| W4-GATE-5 | Predict a delayed consequence | LVL-W04-008 / LVL-W04-009 |
| W4-GATE-6 | Synchronize future Movement State and World State | LVL-W04-007 / LVL-W04-011 / LVL-W04-012 |

Rooms: `LVL-W04-001` … `LVL-W04-012`.

---

### WLD-05 — WHAT DO I REALLY KNOW?

| Field | Value |
| --- | --- |
| World ID | `WLD-05` |
| Name | WHAT DO I REALLY KNOW? |
| Role | UNDERSTANDING |
| Status | CANDIDATE |
| Core Question | What do I really know? |
| Evolves from | “What is the rule?” → “What else is possible with the rules I already know?” |
| New Rule target | **0** |
| New Gimmick target | **0** |
| Hidden mechanic | **0** |
| Exists to | Recall, reinterpret, recombine, challenge assumptions, permit alternate rule-consistent solutions |
| Major Discoveries | DSC-007 payoff; DSC-016 payoff; reinforcement of DSC-009/011–015/018 |
| Mastery Test | LVL-W05-012 |
| Transition to Next World | None recorded. |
| Visual / Audio Identity | **Not locked.** |

Do not put every gimmick in the finale. Prefer ~4–5 deeply interacting concepts. Exact mix TBD after prototype/playtest.

#### Knowledge Graph

```text
MOVEMENT STATE
      |
   MOMENTUM
      |
      v
 WORLD STATE
   /      \
OBJECT    SECOND
 ROLE      FACE
   \       /
    \     /
  FUTURE STATE
       |
   PREDICTION
       |
PLAYER ASSUMPTION
    /       \
EXPECTED    ACTUAL
SOLUTION   POSSIBILITY
    \       /
     \     /
 REINTERPRETATION
       |
  COMBINATION
       |
    MASTERY
```

#### Knowledge Gates

Player-understanding gates only. **28** total across W1–W5. Alternate-solution support is **not** W5-GATE-7.

| Gate | Requirement | May be satisfied in |
| --- | --- | --- |
| W5-GATE-1 | Question the first apparent solution when rules permit alternatives | LVL-W05-001 / LVL-W05-002 |
| W5-GATE-2 | Detour / apparent loss as deliberate setup | LVL-W05-003 / LVL-W05-004 |
| W5-GATE-3 | Sacrifice an apparently favorable Movement State | LVL-W05-005 |
| W5-GATE-4 | Choose an object's First/Second Face by context | LVL-W05-006 |
| W5-GATE-5 | Plan present actions around a desired future state | LVL-W05-007 / LVL-W05-008 |
| W5-GATE-6 | Form a valid solution from learned rules; no newly taught behavior | LVL-W05-011 / LVL-W05-012 |

Rooms: `LVL-W05-001` … `LVL-W05-012`.

---

## 60-slot note

W1–W5 = 12 × 5 = **60 progression candidates / slots**.

This is **not** a commitment to ship 60 rooms. Later playtest may merge, delete, expand, reorder, convert to Reward, or reduce count.

---

## DOC-003 audits

### Interaction

Unused Interaction ≠ design debt. Required progression need not cover INT-018, INT-019, INT-024. Those may stay challenge / alternate / expansion / experiment material.

### Gimmick economy

| World | Required / primary |
| --- | --- |
| W1 | none |
| W2 | Wind, Ice, Rough Surface |
| W3 | Door, Switch |
| W4 | Bounce Counter, Timed Gate, Delayed Switch (or Switch+Delay variation) |
| W5 | no new gimmicks |

Intentional (C-05). Do not add gimmicks so later worlds “look more complex.”

GIM-005 Rough Surface Second Face remains **unresolved**. “Kill unwanted momentum” may only be a positive reading of the First Face (slow). Do not invent a new property to satisfy C-07. Blocks CORE until playtest/design resolves it.

### Pattern / cognitive operations (W5 adjacent)

If two adjacent rooms share one reasoning operation, mark for future merge/reorder. Not new Pattern IDs.

| Room | Primary cognitive operation | Distinct ask |
| --- | --- | --- |
| LVL-W05-003 | Spatial detour | WHERE first? |
| LVL-W05-004 | State transformation | WHAT state to create? |
| LVL-W05-005 | State sacrifice | WHAT valuable state to abandon? |
| LVL-W05-006 | Object role selection | WHAT role for this object? |
| LVL-W05-007 | Trigger timing | WHEN to cause the future event? |
| LVL-W05-008 | Resource allocation | HOW to spend/count events? |

W04-004 (waiting as action) ≠ W04-007 (synchronize two clocks). W04-009 (trigger now, move) ≠ W05-007 (choose when to trigger).

### Anti-pattern (full W1–W5)

Conceptual only. Do not fabricate PASS.

| ID | Result |
| --- | --- |
| ANTI-001 | **Structurally compliant** if cues stay visible. **W5 scrutiny / playtest:** DSC-016 fairness; no hidden failure-as-setup. |
| ANTI-002 | **Structurally compliant** — W5-010 does not change rules. |
| ANTI-003 | **Requires playtest.** **W4 scrutiny:** windows/delays/sync must stay generous. |
| ANTI-004 | **Structurally** W4 is planning-first. **Requires playtest** that Timed Gate / sync do not become twitch. |
| ANTI-006 | **Requires playtest** across mastery rooms. |
| ANTI-008 | **Structurally compliant** — gimmicks reuse across rooms/worlds. |
| ANTI-009 | Door/Wind assigned; Switch candidate; **Rough unresolved**; Ice unset. |
| ANTI-010 | **Structurally compliant** — W5 adds none; W4 three temporal questions. |
| ANTI-011 | **Playtest** combine/finale rooms (W04-010/011/012, W05-009/012). Prefer 2–5 concepts. |
| ANTI-012 | **Structurally** Delay requires readable chain. **W4 scrutiny / playtest.** |
| ANTI-013 | **Requires playtest** (wrong-order / missed-window resets). |
| ANTI-015 | **Requires playtest.** **W5 scrutiny:** alternate solutions and DSC-016 must be repeatable on purpose. |
| ANTI-017 | **Structurally** operations differ. **W5 scrutiny / playtest** for “do the opposite” clones. |
| ANTI-018 | **Structurally compliant** — counts/durations not canonical. |
| ANTI-019 | **Structurally** no mandatory clips. **W5 scrutiny / playtest.** |
| ANTI-020 | **Structurally compliant** — W4/W5 mastery add no new gimmick. |

---

## Shared constraints

- Do not implement rooms or gimmicks from this file.
- Do not grow the New Rule Budget to fill world length.
- Do not specify geometry, counts, or durations.
- Knowledge Gates are requirements, not extra `LVL-` IDs (28 player gates; no W5-GATE-7).

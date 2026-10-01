# World Library

Worlds sequence levels. They ask one core question at a time.

Vocabulary (Knowledge Graph, Knowledge Gate, Movement State) is defined in [DESIGN_SYSTEM.md](../DESIGN_SYSTEM.md). Room rows live in [LEVEL_LIBRARY.md](LEVEL_LIBRARY.md). Discovery Language: [DISCOVERY_LIBRARY.md](../libraries/DISCOVERY_LIBRARY.md). Do not duplicate those definitions here.

Official status for worlds and rooms: `CANDIDATE`. Role: progression candidate. Documentation is not validation.

W1 CONTROL Knowledge Architecture v1 (`W1-K01`–`W1-K08`) is the **current** W1 planning source. **Status:** `CANDIDATE`. Conceptual only.

The DOC-003 12-slot W1 list is a **historical candidate inventory**. It is not a production room count, not a shipping sequence, and not the current graduation checklist. C-05 Depth Over Quantity takes precedence over slot preservation.

Do **not** lock visual themes. Do not implement these worlds. PLAY-002 remains LOCKED. Vertical Slice implementation remains HOLD. Movement foundation is not finalized.

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
Where / which direction should the next useful action begin?
(historical label: How do I move?)
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
| W1 | DSC-005 (contextual height). DSC-006 / DSC-010 / DSC-017 W1 homes are **historical guidance** — see scope notes in Discovery Library. |
| W2 | DSC-002, DSC-003, DSC-004, DSC-007 (seed), DSC-008, DSC-009, DSC-017 (payoff/reinforcement) |
| W3 | DSC-001, DSC-014, DSC-015, DSC-018, DSC-016 (weak seed only) |
| W4 | DSC-011, DSC-012, DSC-013 |
| W5 | DSC-007 payoff; DSC-016 payoff; DSC-009/011/012/013/014/015/018 reinforcement or recombination |

Long-range: DSC-017 historical W1 seed → later motion-state payoff (not current W1 graduation evidence); DSC-007 W2 seed → W5 payoff; DSC-016 W3 seed → W5 payoff.

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
| WLD-01 | CONTROL | Where / which direction should the next useful action begin? | CANDIDATE | Role-based current plan. 12-slot list = historical inventory. |
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
| Core Question | Where / which direction should the next useful action begin? (historical label: How do I move?) |
| Design Theme | Player physics. Not a visual theme. |
| World purpose | The player does not jump. The ball auto-bounces; the player intervenes in its trajectory. |
| End-of-world understanding | “I do not command jumps. I manipulate the trajectory of a continuously bouncing ball.” |
| Rules Emphasized | R-PLAYER-001…005; R-MOTION-001…003; R-CONTACT-001; R-WORLD-001 |
| New Rule Budget | Player physics only. **No** Door, Switch, Wind, Ice, Spring, Counter, Timer unless later playtest shows a strong need. |
| Major Discoveries | Current W1: DSC-005 (contextual height). DSC-006 / DSC-010 / DSC-017 are **not** current W1 graduation evidence. |
| Mastery Test | Historical: LVL-W01-012. Current: K08 evidence via Transfer / [CONDITIONAL SYNTHESIS], not a required 12th slot. |
| Transition to Next World | Player can choose where / which direction the next useful action begins. Later: carried movement. |
| Visual / Audio Identity | **Not locked.** |

LOW ≠ weak. BOOST ≠ better. LOW / NORMAL / BOOST are choices, not a power ladder. BOOST is **not** a current W1 graduation requirement.

PLAY-001B is still validating movement feel. Do not mark Low Bounce, Landing Boost, or Wall Jump `CORE`.

Current planning model next. Historical 12-slot graph, gates, and slot mapping follow it as lineage.

#### W1 CONTROL Knowledge Architecture v1

**Status:** `CANDIDATE` — conceptual. Unvalidated. Not runtime objects. Not `VALIDATED` / `CORE`.

This is the **authoritative current W1 planning model**. Role-based. Not slot-count-based.

```text
FOUNDATION
    → CONTEXTUAL CHOICE
        → PREPARATION
            → TRANSFER
                → [CONDITIONAL SYNTHESIS]
```

| Role | Knowledge | Planning note |
| --- | --- | --- |
| FOUNDATION | K01 + K02 | Auto Bounce + landing intervention. |
| CONTEXTUAL CHOICE | K03 | First spatial value of NORMAL / LOW. |
| PREPARATION | K04 | This landing is the next start. |
| TRANSFER | K05 | Earlier route changes for a later start. |
| [CONDITIONAL SYNTHESIS] | may gather K06 / K08 | **Not pre-approved content.** See cut rule. |

- **K06:** required observation target across late content. Not a dedicated room by default.
- **K07:** cross-cutting recovery / replanning opportunity. Not a dedicated recovery room by default. May remain **UNOBSERVED** for a player without blocking W2. UNOBSERVED ≠ FAILED.
- **K08:** integrated planning / mastery evidence, possibly through Transfer and/or [CONDITIONAL SYNTHESIS].

Current Slice candidate: **A+B-1 → C-1 → D-1 → G-1**. G-3 = backup / comparison.

**IDs:** `W1-K01` … `W1-K08`. Permanent conceptual knowledge IDs. Do not recycle. Do not implement as game objects.

**World statement:** “내 움직임을 바꿀 수 있다.”

**Graduation candidate:** The player can think about the position and direction needed for the next useful action, choose the current trajectory / landing / approach accordingly, and reorganize the plan from the actual resulting state.

Graduation is **not** “used every movement technique” and **not** “executed one fixed route perfectly.” It does **not** require BOOST, Wall Jump, Air Reversal, momentum management, or velocity optimization.

##### Knowledge nodes

| ID | Layer | Understanding | Prerequisite | Evidence | Misconception |
| --- | --- | --- | --- | --- | --- |
| W1-K01 | FOUNDATION | 누르지 않아도 공은 다시 튄다. | — | Player waits for and uses Auto Bounce. | Jump must be manually initiated. |
| W1-K02 | FOUNDATION | 입력을 바꾸면 내려오는 곳도 바뀐다. | K01 | Player changes approach input based on prior landing result. | Direction input is an immediate position command. |
| W1-K03 | DEVELOPMENT | 다른 궤적이 더 유리한 공간도 있다. | K01 + K02 + access to LOW input | Player chooses NORMAL / LOW according to spatial conditions. | Higher is always better. |
| W1-K04 | REINTERPRETATION | 이번 착지는 다음 행동의 출발점을 만든다. | K02. Current D-1 candidate may also depend on K03. | Player changes the previous action to alter the next starting position. | Only getting closer to the exit matters. |
| W1-K05 | TRANSFER | 마지막 출발점을 생각하면 앞선 길도 고를 수 있다. | K04 | Player changes an earlier approach / route for the sake of the final action. | Route choice is only the shortest / closest path. |
| W1-K06 | DEVELOPMENT | 잘 됐던 선택도 이번에는 맞지 않을 수 있다. | K03 + K04 | Player does not repeat LOW / preparation automatically. They choose by current need. | LOW or preparation is always the advanced / correct choice. |
| W1-K07 | DEVELOPMENT | 계획과 다르게 내려왔어도 여기서 다시 생각할 수 있다. | K02 + K04 | Player reorganizes approach from the actual landing instead of replaying the previous sequence. | Missing the intended landing means reset / replay exactly. |
| W1-K08 | MASTERY | 필요한 출발점을 만들고, 결과에 맞춰 선택을 이어갈 수 있다. | K05 + K06 + K07 | Player combines known relationships into a plan and modifies it using actual results. | Memorized input order equals mastery. |

K04 is **not** conceptually LOW-dependent. K03 may support the current D-1 candidate. K06 and K07 do **not** automatically receive dedicated rooms.

##### Knowledge flow

```text
K01 Auto Bounce
        ↓
K02 Landing Intervention
   /        \
  v          v
K03 Contextual     K04 Landing as Next Start
Trajectory Choice         |
  \                       v
   \               K05 Earlier Approach Planning
    \                     |
     +------ K06 Contextual Re-evaluation
     |              (K03 + K04)
     +------ K07 Plan Adjustment from Actual Landing
                    (K02 + K04)
                          |
                          v
              K08 Integrated Control Mastery
                    (K05 + K06 + K07)
```

##### Current W1 arc

Player-facing statements for the role model. **Not** a fixed room count.

| Role | Statement |
| --- | --- |
| FOUNDATION / CONTROL | 착지를 바꿀 수 있다. |
| CONTEXTUAL CHOICE | 상황에 따라 좋은 궤적이 다르다. |
| PREPARATION | 이번 착지가 다음 행동을 만든다. |
| TRANSFER / PLANNING | 미래의 출발점을 보고 앞선 선택을 바꾼다. |
| ADAPTATION | 잘 됐던 선택도 항상 정답은 아니며, 실제 착지에서 다시 판단한다. Observation (K06) + optional K07. |
| MASTERY | 이제 내가 계획을 만든다. (K08) |

##### Conceptual Vertical Slice

**Status:** `CANDIDATE` / unvalidated. Implementation: **HOLD**.

These labels are **not** `LVL-W01-*` IDs. Do not treat them as the 12-slot list.

Candidate: **A+B-1 → C-1 → D-1 → G-1**. **G-3** remains comparison / backup.

| Slice | Intended knowledge | Role | Target evidence | Must remain unstated | False positive |
| --- | --- | --- | --- | --- | --- |
| A+B-1 | K01 + K02 | Auto Bounce + landing intervention | Player changes input based on previous landing. Discovery audit: ACTION / EFFECT. Evidence target E2. | Exact correct landing / solution sequence | Room clear alone |
| C-1 | K03 | First contextual value of LOW | Player chooses low trajectory because the space favors it. RELATIONSHIP. Evidence target E2. | “Use LOW here.” | NORMAL hits ceiling and still passes — C-1 then fails its conceptual role |
| D-1 | K04 | Preparation | Player changes a previous action to create a better next starting position. REINTERPRETATION. Evidence target E2. | “Land on P so the next bounce works.” | LOW once → preparation shelf → hold direction → automatic exit |
| G-1 | K05 | Transfer / planning | Player changes an earlier route because of the final starting position needed. TRANSFER. Evidence target E3 candidate. | “Take the detour.” | The detour is simply the visually obvious path |
| G-3 | backup / comparison | — | — | — | May become an obvious “follow the visible route” problem |

Discovery Language audit for this slice: [DISCOVERY_LIBRARY.md](../libraries/DISCOVERY_LIBRARY.md).

##### Conditional synthesis CUT rule

A post-G synthesis role is **not** pre-approved content. Do not name or number a new room now.

- **CUT** if G already provides sufficient evidence for contextual re-evaluation (K06), self-directed planning (K08), and known-control integration.
- **KEEP AS CANDIDATE** only if later Human Validation reveals a genuine evidence gap.

##### W1 graduation evidence

Use **planning supported / adaptation unobserved**, not “passed / failed everything.”

| Class | Items |
| --- | --- |
| MUST HAVE EVIDENCE | K01/K02 control understanding; K03/K06 contextual trajectory choice; K04 preparation; K05 transfer; K08 self-directed planning |
| DESIRABLE | K07 actual-state replanning; spontaneous NORMAL re-selection; alternative valid planning |
| CAN REMAIN UNOBSERVED | K07 for a player who never meets meaningful recovery; all alternate solutions; verbal explanation; perfect execution |

K07 unobserved does **not** block W2 progression. Do not claim full adaptation mastery from that individual session.

**MUST NOT REQUIRE:** speed accumulation; momentum preservation; velocity optimization; BOOST; Air Reversal; Wall Jump; RHYTHM LOW; environmental gimmicks; timing-state systems; precision execution; verbal explanation of the solution.

W1 may physically involve velocity. The player must **not** need deliberate velocity accumulation / preservation to understand W1 problems.

##### W1 → W2 boundary

| | Current W1 | Later motion-state expansion |
| --- | --- | --- |
| Question | Where / which direction should the next useful action begin? | How does carried movement change what becomes possible? |
| Conceptual | Position / Direction | Motion State / carried movement |
| Korean | 다음 행동을 하기 좋으려면 어디에서, 어느 쪽을 향해 시작해야 할까? | 같은 위치에서 시작해도, 도착할 때 남아 있는 움직임에 따라 다음 가능성이 달라질까? |

Existing WLD-02 question (“What changes my motion?”) remains. This boundary records the conceptual handoff only. Historical W1 slots about Wall Jump, BOOST, or entry velocity are **not** current W1 requirements and are **not** automatic W2 rooms.

Movement contracts (AR-A2, WJ-B, Charge / Spin) are a separate pending human-validation queue. Protocol: `docs/playtest/MOVEMENT_VALIDATION_003.md` on `cursor/movement-validation-003-3f71`. Do not treat those experiments as W1 requirements. No outcomes are recorded here.

#### Historical 12-slot lineage

The following graph, gates, and slots are a **historical candidate inventory**. They are not the current production plan.

#### Knowledge Graph (historical candidate inventory)

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

#### Knowledge Gates (historical — not current graduation)

IDs retained. These are **not** the current W1 graduation checklist. Current graduation: W1-K evidence language above.

| Gate | Historical requirement | Current scope |
| --- | --- | --- |
| W1-GATE-1 | Deliberately change an Auto Bounce trajectory (`LVL-W01-002` / `003`) | Conceptually relevant to FOUNDATION (K01/K02). Air Reversal-specific reading of 003 is outside current W1 graduation. |
| W1-GATE-2 | Distinguish LOW / NORMAL / BOOST (`LVL-W01-007`) | **Not valid** as a current W1 graduation gate. BOOST is out of W1 graduation scope. Contextual LOW / NORMAL remains (K03/K06). |
| W1-GATE-3 | Use Wall and Momentum as movement tools (`LVL-W01-009` / `010`) | Conflicts with current W1 boundary. Wall Jump and momentum / entry-speed are outside current W1 graduation. **Not** a W2 assignment. |
| W1-GATE-4 | Select among movement techniques by situation (`LVL-W01-011`) | Valid only if limited to approved CONTROL knowledge (NORMAL / LOW, landing as next start). Technique-menu including BOOST / Wall Jump is historical. |

Rooms `LVL-W01-001` … `LVL-W01-012` are a **historical candidate inventory**. Not a production count. Not a mandatory sequence. Depth Over Quantity takes precedence over slot preservation. IDs are not deleted or renumbered.

##### Historical slot → current role

| Slot | Title | Current alignment |
| --- | --- | --- |
| 001 | It Bounces | Maps into FOUNDATION. |
| 002 | I Can Bend It | Maps into FOUNDATION. |
| 003 | Change Your Mind | Basic directional intervention absorbed by FOUNDATION. Special Air Reversal requirement is outside current W1 graduation. |
| 004 | Stay Low | Maps into CONTEXTUAL CHOICE. |
| 005 | Low != Slow | Not a separate required lesson. May survive later only as application / reward if useful. |
| 006 | Hold It | Historical hold-BOOST lesson. Not part of the current W1 plan. |
| 007 | Three Answers | Selection principle absorbed into contextual re-evaluation / synthesis. BOOST dependence removed from W1 requirement. |
| 008 | The Wall | Wall Jump-specific content is outside current W1 graduation scope. |
| 009 | Walls Are Routes | Wall Jump-dependent reinterpretation is outside current W1 graduation scope. |
| 010 | Arrive Correctly | Entry-motion / velocity-state belongs beyond the current W1 boundary. Not a W2 room assignment. |
| 011 | Choose Your Bounce | Integration / mastery function may inform [CONDITIONAL SYNTHESIS]. |
| 012 | Same Space, Different Ball | Historical meaning depends on entry velocity; beyond current W1 knowledge boundary. Mastery function can be represented elsewhere. |

“Outside current W1” does **not** mean “W2 confirmed.”

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

Player-understanding gates only. **28** historical gate IDs across W1–W5. W1-GATE-2/3 are not current W1 graduation. Alternate-solution support is **not** W5-GATE-7.

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

W1–W5 = 12 × 5 = **60 historical progression candidates / slots**.

This is **not** a commitment to ship 60 rooms. The W1 12-slot list is a historical candidate inventory, not a production target. C-05 Depth Over Quantity takes precedence over slot preservation. Later playtest may merge, delete, expand, reorder, convert to Reward, or reduce count.

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
- Knowledge Gate IDs are retained and are not extra `LVL-` IDs (28 historical player-gate labels; no W5-GATE-7). Current W1 graduation is W1-K evidence language, not W1-GATE-2/3.

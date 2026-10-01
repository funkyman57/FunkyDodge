# World Library

Worlds sequence levels. They are **knowledge domains**, not mechanic or gimmick bundles.

Vocabulary (Knowledge Graph, Knowledge Gate, Movement State) is defined in [DESIGN_SYSTEM.md](../DESIGN_SYSTEM.md). Room rows live in [LEVEL_LIBRARY.md](LEVEL_LIBRARY.md). Discovery Language: [DISCOVERY_LIBRARY.md](../libraries/DISCOVERY_LIBRARY.md). Do not duplicate those definitions here.

Official status for worlds and rooms: `CANDIDATE`. Role: progression candidate. Documentation is not validation. This pass does **not** validate W2–W5 content, any gimmick, or movement experiments.

W1 CONTROL Knowledge Architecture v1 (`W1-K01`–`W1-K08`) is the **current** W1 planning source. **Status:** `CANDIDATE`. Conceptual only.

W2 MOMENTUM Knowledge Architecture v1 (`W2-K01`–`W2-K05`) is the **current** W2 planning source. **Status:** `CANDIDATE`. Conceptual only. Movement Validation #3 is **pending** and does **not** validate W2-K. W2-PHYS-001 (carried motion persists) and W2-PHYS-002 (player can create useful motion contrast) are **physical PASS**. W2-PHYS-003 Human Readability is **PENDING**. Do **not** treat W2 as fully Human Validated. No W2 room is `VALIDATED`. No Wind / Ice / Rough implementation is approved by this documentation.

W3 POSSIBILITY Knowledge Architecture v1 (`W3-K01`–`W3-K05`) is the **current** W3 planning source. **Status:** `CANDIDATE`. Conceptual only. No W3 room is `VALIDATED`. No Door / Switch (or other W3) mechanic is approved for production by this documentation. W3 is **not** Door World, Switch World, or a gimmick showcase.

The DOC-003 12-slot lists are **historical candidate inventories**. They are not production room counts, shipping sequences, or current graduation checklists. C-05 Depth Over Quantity takes precedence over slot preservation.

Do **not** lock visual themes. Do not implement these worlds. PLAY-002 remains LOCKED. Vertical Slice implementation remains HOLD. Movement foundation is not finalized.

Geometry / physics values: `TBD — after PLAY-001B feel validation`. See DESIGN_SYSTEM.

---

## World Knowledge Architecture

**Status:** `CANDIDATE`. Authoritative current World identities. Historical names (`HOW DO I MOVE?`, etc.) remain as lineage labels.

Choose a knowledge question first. Then find the smallest expression. Do **not** choose a gimmick, assign a World, and then invent a room.

| World | Role | Core question | Korean |
| --- | --- | --- | --- |
| WLD-01 | CONTROL | Where / in which direction should the next useful action begin — and what do I choose now? | 다음 유용한 행동을 어디에서, 어느 방향으로 시작하려면 지금 무엇을 선택할까? |
| WLD-02 | MOMENTUM | How does carried movement change what becomes possible? | 도착할 때 남아 있는 움직임이 다음 가능성을 어떻게 바꾸는가? |
| WLD-03 | POSSIBILITY | When the world state changes, which actions become possible and which actions disappear? | 세계의 상태가 바뀌면 어떤 행동이 가능해지고, 어떤 행동이 사라지는가? |
| WLD-04 | TIME | When does the needed state appear, how long does it last, and after which event — and how does that change the plan? | 필요한 상태가 언제 생기고, 얼마나 유지되며, 어떤 사건 뒤에 생기는지가 계획을 어떻게 바꾸는가? |
| WLD-05 | UNDERSTANDING | Under what conditions is my familiar solution valid, and what becomes possible if known relationships connect differently? | 내가 정답처럼 쓰던 해법은 어떤 조건에서 유효하며, 알려진 관계를 다르게 연결하면 무엇이 가능한가? |

Historical English labels remain: How do I move? / What changes my motion? / What can objects become? / When should I act? / What do I really know?

### Knowledge focus

| World | Focus | Inherited | Must not require |
| --- | --- | --- | --- |
| W1 CONTROL | Trajectory, landing, next starting position, starting direction | — | Deliberate speed accumulation; momentum preservation; velocity optimization; world-state manipulation; time-state planning; BOOST / Air Reversal / Wall Jump mastery |
| W2 MOMENTUM | Carried motion; preserve / reduce / discard; same position, different movement state | W1 position / direction / next start | “Go faster” as identity; world-state as the lesson; time-state planning. W2 is **not** Wind / Ice / Rough. |
| W3 POSSIBILITY | World State changes the current possibility set; create **and** remove possibilities; logical order of state choices | W1 action / landing understanding; only W2 relationships that were actually introduced and understood | Gimmick showcase as identity. W3 is **not** Door / Switch. Logical order ≠ TIME. Momentum is **not** required in every W3 problem. |
| W4 TIME | Occurrence, duration, delay, event progression, future-state prediction | W1 + W2 + W3 state *value* / order | Reaction challenge; frame-perfect timing; hidden-cycle memorization. Event-count belongs **only if** it changes future-state planning. Pure counting / resource allocation is not automatically TIME. |
| W5 UNDERSTANDING | Check assumptions behind familiar solutions; recombine known relationships; construct a personal plan | W1–W4 known relationships | Hidden new rules; new input grammar; all mechanics / gimmicks; long execution chains; precision escalation. Reinterpretation already exists from W1 onward and is **not** unique to W5. |

### Graduation evidence

| World | Sufficient | Insufficient |
| --- | --- | --- |
| W1 | Player changes earlier trajectory / landing / approach based on the next starting position needed. | LOW usage alone; room clear; memorized sequence |
| W2 | Player intentionally uses differences in carried motion (preserve / reduce / discard / redirect) because the goal demands it. | Maximum-speed clear; accidental slide |
| W3 | Player prepares / preserves / delays / restores World State because it changes which actions remain possible. See W3-K graduation. | Press every switch; follow every opened path; activate-all; memorized switch sequence |
| W4 | Player adjusts cause timing / order / waiting because a useful state must exist at a future moment or event. | Lucky timing; fast reaction; cycle memorization without understanding |
| W5 | Player detects that a familiar solution’s assumptions no longer hold and reorganizes known relationships into a different plan. | Hard execution of an old solution; using many gimmicks; a longer sequence |

### Adjacent transitions

| Handoff | Previous | New | Discontinuity |
| --- | --- | --- | --- |
| W1 → W2 | Where / which direction should I begin? | How does carried movement change what becomes possible? | Position / direction alone no longer explains the result. |
| W2 → W3 | What movement state should I arrive with? | What world state must exist for the desired action to be possible? | Player state is no longer the only changing condition. |
| W3 → W4 | Which world state should I create, and in what logical order? | When will that state exist, and for how long? | State *value* alone is insufficient; occurrence / duration / event progression matters. |
| W4 → W5 | How do I align player state, world state, and time? | Which assumptions behind my familiar solutions still apply? | Not a new physical dimension. Greater autonomy in selecting and recombining known relationships. |

### Dangerous boundary leaks

1. W1 preparation becoming speed buildup.
2. W2 becoming “faster is better.”
3. W2 being defined by a Wind / Ice / Rough inventory.
4. W3 being defined by gimmick novelty.
5. W3 logical order being mistaken for W4 TIME.
6. W4 becoming reaction / precision timing.
7. Every Counter being classified as TIME.
8. W5 repeating W3’s “same object, different role.”
9. W5 repeating W4 timing lessons.
10. W5 hiding new rules inside “reinterpretation.”

### Unassigned / not yet world-owned

Unassigned is **not** design debt. It means the knowledge role is not yet proven. Do not force a World.

Candidates that remain unassigned unless later justified: BOOST / Spin / Charge; special Air Reversal; Wall Jump; Spring / Impulse use cases; Moving Block; One-way Surface; Force Switch; pure count / resource puzzles; Mirror / Detour forms; Recovery; Personal Plan; Reinterpretation (as a standalone domain).

### W5 synthesis status

W5 is **not** a fifth mechanic domain. It is a **synthesis / autonomy** stage.

It may be smaller than other Worlds. Its content count is **not** protected. If strong recombination / assumption-audit problems are scarce, reduce W5 scope. Do **not** steal reinterpretation from earlier Worlds to fill W5. Do **not** preserve the historical 12-room count.

### Gimmicks as expression tools

Gimmicks do **not** own Worlds. A gimmick may support different domains depending on the required inference.

Example (classification only; do not invent new Door behavior):

- W3 if Door state changes which actions are available
- W4 if a delayed / temporary Door state must be predicted
- W5 only if already-known Door relationships combine with other known relationships in a new planning structure

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
Where / in which direction should the next useful action begin?
        ↓
W2 — MOMENTUM
How does carried movement change what becomes possible?
        ↓
W3 — POSSIBILITY
When the world state changes, which actions become possible and which actions disappear?
        ↓
W4 — TIME
When will the needed state exist, and for how long?
        ↓
W5 — UNDERSTANDING
Which assumptions behind familiar solutions still apply?
```

W5 does not replace prior knowledge. It is a synthesis stage over W1–W4. Canonical questions: World Knowledge Architecture above.

Historical expression examples (no new INT IDs; not World identities):

- W1: LOW as contextual trajectory (not speed)
- W2: LOW × carried motion; LOW × Wind (`INT-001`); LOW × Low Friction (`INT-003`) — if the ask is remaining motion
- W3: Movement State × Door State (`INT-021`); Momentum × Door (`INT-013` + closed solid) — if the ask is action availability
- W4: Bounce count (`INT-005`) only if future-state planning; Timed State (`INT-023`); Delay (`INT-027`)
- W5: compose already-taught pairs only. No new physical dimension.

Rhythm, Reward, Cognitive Operation Variety: [DESIGN_SYSTEM.md](../DESIGN_SYSTEM.md).

---

## Discovery distribution (guidance, not ownership)

Do not lock a DSC to one world. Discovery → Knowledge → Future Tool. Mixed / unassigned IDs stay unassigned.

| Alignment | IDs |
| --- | --- |
| W1 clear | DSC-005 Higher Is Not Always Better |
| W2 strong conceptual | DSC-017 (W2-K01), DSC-003 (preserve), DSC-009 (purposeful loss) |
| W2 useful / conditional | DSC-002, DSC-004, DSC-008 — not mandatory production assignments |
| W3 clear | DSC-014, DSC-018 |
| W4 clear | DSC-012, DSC-013 |
| W4 conditional | DSC-011 Bounce Is a Resource — only if event progression changes future-state planning |
| Mixed / unassigned | DSC-006, DSC-007, DSC-010, DSC-015, DSC-016 |
| Historical guidance only | DSC-001 (Door-as-wall seed; expression, not W3 identity); DSC-006 / DSC-010 / DSC-017 as former W1 homes |

Long-range: DSC-017 strongly aligns with **W2-K01**, **not** current W1 graduation evidence and **not** a forced W2 room. Do not assign mixed IDs to W5 to fill a remix quota.

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
| WLD-01 | CONTROL | Where / in which direction should the next useful action begin? | CANDIDATE | Role-based current plan. 12-slot list = historical inventory. |
| WLD-02 | MOMENTUM | How does carried movement change what becomes possible? | CANDIDATE | Knowledge domain. 12-slot list = historical inventory. |
| WLD-03 | POSSIBILITY | When the world state changes, which actions become possible and which actions disappear? | CANDIDATE | Knowledge domain. 12-slot list = historical inventory. |
| WLD-04 | TIME | When will the needed state exist, and for how long? | CANDIDATE | Knowledge domain. 12-slot list = historical inventory. |
| WLD-05 | UNDERSTANDING | Which assumptions behind familiar solutions still apply? | CANDIDATE | Synthesis stage. Historical 12-slot count is **not** protected. |

---

### WLD-01 — HOW DO I MOVE?

| Field | Value |
| --- | --- |
| World ID | `WLD-01` |
| Name | HOW DO I MOVE? |
| Role | CONTROL |
| Status | CANDIDATE |
| Core Question | Where / in which direction should the next useful action begin — and what do I choose now? (historical label: How do I move?) |
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
| Question | Where / in which direction should the next useful action begin? | How does carried movement change what becomes possible? |
| Conceptual | Position / Direction | Motion State / carried movement |
| Korean | 다음 유용한 행동을 어디에서, 어느 방향으로 시작하려면 지금 무엇을 선택할까? | 도착할 때 남아 있는 움직임이 다음 가능성을 어떻게 바꾸는가? |

Canonical handoff: World Knowledge Architecture above. Historical WLD-02 label (“What changes my motion?”) remains as lineage. Historical W1 slots about Wall Jump, BOOST, or entry velocity are **not** current W1 requirements and are **not** automatic W2 rooms.

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
| Core Question | How does carried movement change what becomes possible? (historical label: What changes my motion?) |
| Design Theme | Momentum is managed. Not a visual theme. Do not assume “ice world” art. |
| World purpose | Remaining motion at arrival changes what is possible. Same position, different movement state. |
| Central concept | The player should sometimes want more motion, less motion, or different motion. W2 is **not** “go faster.” |
| Knowledge focus | Preserve / reduce / discard / redirect carried motion because the goal demands it. |
| Graduation | Intentional use of motion-state difference. Insufficient: max-speed clear; accidental slide. |
| Rules Emphasized | R-FORCE-001; R-CONTACT-003 (low/high configs); R-MOTION-001; R-INFO-001 |
| New Rule Budget | Historical expression candidates: Wind, Ice, Rough Surface. **These do not define W2.** Impulse / Spring remain unassigned (C-05). Keep `R-FORCE-002` and `GIM-006` in libraries. |
| Major Discoveries | Strong conceptual: DSC-017, DSC-003, DSC-009. Useful / conditional: DSC-002, DSC-004, DSC-008. None are mandatory rooms. DSC-007 remains mixed / unassigned. |
| Mastery Test | Historical: LVL-W02-012. Current: carried-motion evidence, not a required 12th slot. |
| Transition to Next World | Player state is no longer the only changing condition. Next: world state changes action availability. |
| Visual / Audio Identity | **Not locked.** |
| World conclusion | “Remaining motion is something I manage, not a speed trophy.” |

Do not turn BUILD / PRESERVE / USE / KILL into player-visible meters. Momentum is **not** a reward score. More motion is **not** automatically better.

Current planning model next. Historical 12-slot graph, gates, and slot mapping follow it as lineage.

#### W2 MOMENTUM Knowledge Architecture v1

**Status:** `CANDIDATE` — conceptual. Unvalidated. Not runtime objects. Not `VALIDATED` / `CORE`. Movement Validation #3 pending does **not** validate this architecture. Future W2 room / expression validation is separate.

This is the **authoritative current W2 planning model**. Role-based. Not slot-count-based. Not a gimmick tutorial sequence.

**Core question:** How does carried movement change what becomes possible? / 도착할 때 남아 있는 움직임이 다음 가능성을 어떻게 바꾸는가?

**Useful question:** What movement should remain when I arrive for the next action I want to perform?

W2 may require preserving movement **or** intentionally reducing it. It must **not** become “build maximum speed.”

```text
ARRIVAL CONTRAST
    → TRACE THE MOTION
        → REVALUE MOTION
            → PREPARE FOR THE NEXT ACTION
                → OWN THE PLAN
```

| Role | Knowledge | Planning note |
| --- | --- | --- |
| ARRIVAL CONTRAST | K01 | Same place, different future. Position alone is insufficient. |
| TRACE THE MOTION | K02 | Earlier movement history explains arrival motion. |
| REVALUE MOTION | K03 | More is not always better. Preserve and Reduce are faces of one principle, not separate mandatory nodes. |
| PREPARE FOR THE NEXT ACTION | K04 | Future carried-motion need changes earlier approach. |
| OWN THE PLAN | K05 | Position + carried motion organized into a personal plan. |

Roles may merge. This is **not** a fixed room sequence.

**IDs:** `W2-K01` … `W2-K05`. Permanent conceptual knowledge IDs. Do not recycle. Do not implement as game objects. Do **not** add W2-K06 = Preserve, W2-K07 = Build, etc.

**World statement:** “어디에 도착할지만 아니라, 그때 어떤 움직임을 남기거나 줄일지도 내가 고른다.”

##### Knowledge nodes

| ID | Layer | Understanding | Prerequisite | Evidence | Misconception |
| --- | --- | --- | --- | --- | --- |
| W2-K01 | FOUNDATION | 같은 곳에 와도 남은 움직임이 다르면 다음 결과가 달라진다. | W1 landing intervention; W1 landing as next start | Player keeps roughly the same destination but changes carried motion to alter the next result. | If I reach the right place, the state is equivalent. |
| W2-K02 | DEVELOPMENT | 지금 남은 움직임은 여기까지 오는 과정에서 만들어지고, 유지되거나 줄어든 것이다. | K01 | Player changes an earlier cause to change the motion that remains at arrival. | This surface simply gives one fixed speed. Landing erases what happened before. |
| W2-K03 | REINTERPRETATION | 남길 움직임은 많을수록 좋은 것이 아니라 다음 행동에 맞아야 한다. | K01 + K02 | Player preserves useful motion and intentionally reduces obstructive motion. | Slowing down means failure. |
| W2-K04 | TRANSFER | 다음에 필요한 움직임을 생각하면 지금의 접근을 다르게 고를 수 있다. | K02 + K03 + W1 future-oriented approach planning | In a new context, player changes an earlier approach to prepare useful carried motion for a later action. | Get there first; fix the movement after arrival. |
| W2-K05 | MASTERY | 어디에 도착할지와 무엇을 남길지를 함께 정해 내 계획을 만들 수 있다. | K01–K04 | Player selects / combines known motion relationships, uses them intentionally, and adjusts the plan from actual results. | There is one fixed BUILD → PRESERVE → KILL sequence. |

##### Knowledge flow

```text
W1 landing / next-start
        ↓
W2-K01 same place, different future
        ↓
W2-K02 earlier process creates carried motion
        ↓
W2-K03 motion value depends on purpose
        ↓
W2-K04 future motion changes earlier approach
        ↓
W2-K05 integrated position + motion planning
```

This is a knowledge dependency graph. It is **not** a room count, mandatory room order, or gimmick tutorial sequence.

##### First true W2 Aha

Leading candidate: “자리는 맞았는데, 여기까지 가져온 움직임 때문에 다음이 달라지는구나.”

English: “I reached the right place, but what I carried into it changed what happened next.”

This is the conceptual discontinuity from W1. The comparison must **not** secretly depend on a meaningfully different landing position, starting direction alone, a different world state, or unrelated bounce-type differences. Exact pixel-identical landing is **not** required. A comparable arrival region is enough if position difference cannot reasonably explain the result.

##### W1 preparation vs W2 preparation

| | W1 | W2 |
| --- | --- | --- |
| Question | What position / direction should the next action start from? | What carried motion should remain when I arrive there? |
| Player changes | Trajectory, landing, approach position | How motion is created, preserved, or reduced before arrival |

**Dangerous leak:** if a W1 preparation problem requires deliberate speed buildup or preservation, it has crossed into W2 knowledge.

##### More-is-not-always-better applications

Applications of K03, **not** isolated mandatory lessons and **not** extra knowledge IDs:

| Face | Meaning |
| --- | --- |
| PRESERVE | Keep useful motion. |
| BUILD | Create motion that will be needed later. |
| REDUCE | Remove motion that interferes with the next action. |
| ABANDON | Give up previously useful motion because carrying it forward is now worse. |

One deep principle is preferred over a technique-checklist progression.

##### W2 graduation evidence

Use **planning supported / adaptation unobserved**, not “used every surface.”

| Class | Items |
| --- | --- |
| MUST UNDERSTAND | Same position can produce different futures because carried motion differs; carried motion results from earlier movement history; more motion is not always better; useful motion may be preserved; harmful motion may be intentionally reduced; the motion needed later can influence an earlier approach; known motion relationships can be applied in a new context |
| MAY EXPERIENCE | Deliberate motion buildup; abandoning most stored motion; redirecting carried motion with an already-known valid tool; trading position quality against motion quality; multiple valid approaches to a useful arrival state; replanning after too much / too little motion remains |
| MUST NOT REQUIRE | Maximum speed; exact velocity values; tiny velocity thresholds; Wind + Ice + Rough completion checklist; BOOST / Charge; special Air Reversal; Wall Jump; world-state manipulation; timing / delay synchronization; all alternate solutions; verbal explanation |

Insufficient: maximum-speed clear; accidental slide; automatically favorable motion; memorized surface order.

##### Final integration

Candidate: “어디에 도착할지만 아니라, 그때 어떤 움직임을 남기거나 줄일지도 내가 고른다.”

Must prove: target position matters; target carried motion matters; player can choose known causes; player can preserve **or** reduce when useful; player is not following one fixed technique chain.

False-positive clear: maximum-speed clear; automatically favorable motion; memorized surface order; unrelated new mechanic bypass. No new W3 state manipulation. No timing escalation.

##### W2 → W3 handoff

| | W2 | W3 |
| --- | --- | --- |
| Question | What movement state should I arrive with? | What world state must exist for the desired action to be possible? |
| Environment | Fixed known influences may affect motion | World state itself becomes a planning variable |

Using environmental effects ≠ manipulating world state. Do **not** pre-teach W3 state-switch planning inside W2.

##### Expression alignments (not mandatory rooms)

| Topic | Record |
| --- | --- |
| DSC-017 | Core relationship strongly aligns with **W2-K01**: similar spatial arrival + different carried motion = different future. **Not** automatically a required W2 room. Historical slot position is not authoritative. Do not rewrite the Discovery meaning. |
| Friction / loss | Intentional reduction of carried motion is required W2 understanding. Rough Surface is **not** required. “Friction can help” expresses “motion value depends on purpose.” Do not imply Rough = mandatory W2 mechanic. Do not promote a Gimmick lifecycle. |
| Wind | Supports W2 when reasoning is about carried motion produced or removed by that force. May be W3 if player-manipulated world state changes available actions. May be W4 if timing / duration / future occurrence of force is central. Object identity does not determine World. |
| Ice / Rough | Ice may expose preservation; Rough may expose loss. They are **not** simply “fast floor / slow floor.” Neither is required for W2 completion. If two surfaces only communicate opposite numeric values without changing player judgment, they are redundant. |

##### Bloat warnings

Depth Over Quantity applies.

- Faster-is-better repetition
- Long run-up = fake depth
- Tiny speed threshold
- Fast precision landing
- Repeated BUILD → SPEND sequence
- Ice / Rough as numeric opposites only
- Multiple surfaces differentiated only by amount
- Adding gimmicks because W2 feels short

##### Carried-motion readability

Carried motion must be readable **without** a numeric velocity HUD in production. Do not design production UI here.

Necessary facts may include: direction of continuing movement; relative amount of continuing movement; before / after contact change; whether motion persisted through arrival; relationship between earlier influence and later result.

Support signals may include: world-relative movement; trajectory; consistent contact feedback; trail / sound / rotation where truthful.

Ball spin must **not** automatically mean travel speed, especially if Spin / Charge survives later.

##### Historical slot → current role

IDs and titles preserved. **Not** a production count, mandatory sequence, or graduation checklist.

| Slot | Title | Current alignment |
| --- | --- | --- |
| 001 | Something Is Pushing Me | Useful external-force application. Not a mandatory W2 opening. |
| 002 | Ride the Wind | Application / reward candidate. |
| 003 | Fight the Wind | Application candidate. Remove if it becomes execution-only resistance. |
| 004 | Let It Stop You | Strong expression of W2-K03. |
| 005 | Keep Moving | Strong preservation expression. |
| 006 | Store It | Transfer / test if preserved motion matters later. Merge if only repeating 005. |
| 007 | The Rough Patch | Motion-loss application. Rough not mandatory. |
| 008 | Stop on Purpose | Strong W2-K03 expression. May merge with 007. |
| 009 | Build It | W2-K04 application. Must not reduce to a long run-up. |
| 010 | Spend It | Transfer / integration candidate. Fixed BUILD → PRESERVE → USE chain is not authoritative. |
| 011 | Enter Differently | Strong W2-K01 expression. Historical late position does not make it late knowledge. |
| 012 | Momentum Laboratory | W2-K05 candidate. Merge if not distinct from 010. |

#### Knowledge Graph (historical candidate inventory)

Wind / Ice / Rough appear here as historical expression, not as W2’s identity. Current planning: W2-K above.

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

#### Knowledge Gates (historical — not current World identity)

IDs retained. Current W2 graduation is the W2-K evidence language above, not “used Wind / Ice / Rough.”

| Gate | Historical requirement | May be satisfied in |
| --- | --- | --- |
| W2-GATE-1 | Wind changes trajectory | LVL-W02-001 |
| W2-GATE-2 | Use Wind with and against its direction | LVL-W02-002 / LVL-W02-003 / LVL-W02-004 |
| W2-GATE-3 | Use Low Friction to preserve Momentum | LVL-W02-005 / LVL-W02-006 |
| W2-GATE-4 | Use High Friction to remove Momentum on purpose | LVL-W02-007 / LVL-W02-008 |
| W2-GATE-5 | Build useful Movement State before the objective | LVL-W02-009 |
| W2-GATE-6 | Plan Movement State required at a future location | LVL-W02-010 / LVL-W02-011 |

Rooms `LVL-W02-001` … `LVL-W02-012` are a **historical candidate inventory**. Not a production count.

---

### WLD-03 — WHAT CAN OBJECTS BECOME?

| Field | Value |
| --- | --- |
| World ID | `WLD-03` |
| Name | WHAT CAN OBJECTS BECOME? |
| Role | POSSIBILITY |
| Status | CANDIDATE |
| Core Question | When the world state changes, which actions become possible and which actions disappear? (historical label: What can objects become?) |
| Design Theme | State changes possibility. C-07. Not a visual theme. |
| World purpose | World State changes the current possibility set. A change may create **and** remove possibilities. |
| Core statement | State changes possibility. W3 is **not** Door World, Switch World, a gimmick showcase, “activate everything,” or “open every path.” |
| Approved summary | 다음 행동에 필요한 가능성을 만들고, 아직 필요한 가능성은 없애지 않는다. |
| Knowledge focus | Select / delay / reverse / restore a World State change because it changes what actions remain possible. |
| Graduation | Deliberate World State choice that opens some actions and closes others. Insufficient: press every switch; follow every opened path. |
| Primary Gimmicks | Historical expression candidates: GIM-001 Door (strong candidate expression); GIM-002 Switch (useful candidate). **These do not define W3.** No production mechanic is approved. |
| Rules Emphasized | R-STATE-001; R-SIGNAL-001; R-CONTACT-001; R-INFO-001 |
| Existing Rules Recontextualized | W1+W2 movement language |
| New Rule Budget | Historical: Door + Switch only. **GIM-010 / GIM-011 remain unassigned** (C-05). Do not invent Motion/Kinematic or Conditional Collision rules for them. |
| Major Discoveries | W3-clear: DSC-014, DSC-018. DSC-001 is historical Door-as-wall guidance. DSC-015 / DSC-016 remain mixed / unassigned. |
| Mastery Test | Historical: LVL-W03-012. Current: world-state possibility evidence, not a required 12th slot. |
| Transition to Next World | State *value* / logical order is not enough. Next: when that state exists and for how long. |
| Visual / Audio Identity | **Not locked.** |
| World conclusion | World State changes what I can do — and what I can no longer do. Open is not always better. |

W3 is physical possibility, not Boolean-logic puzzles. Logical order of state changes is still W3, not W4 TIME.

Current planning model next. Historical 12-slot graph, gates, and slot mapping follow it as lineage.

#### W3 POSSIBILITY Knowledge Architecture v1

**Status:** `CANDIDATE` — conceptual. Unvalidated. Not runtime objects. Not `VALIDATED` / `CORE`. No W3 room is `VALIDATED`. No W3 mechanic is approved for production.

This is the **authoritative current W3 planning model**. Role-based. Not slot-count-based. Not a Door / Switch tutorial. Not a gimmick showcase.

**Core question:** When the world state changes, which actions become possible and which actions disappear? / 세계의 상태가 바뀌면 어떤 행동이 가능해지고, 어떤 행동이 사라지는가?

**Approved summary:** “다음 행동에 필요한 가능성을 만들고, 아직 필요한 가능성은 없애지 않는다.”

W3 is **not**: Door World; Switch World; gimmick showcase; activate everything; open every path.

W3 **is** about World State changing the **current possibility set**.

##### World State definition

Canonical vocabulary also lives in [DESIGN_SYSTEM.md](../DESIGN_SYSTEM.md). Restated here because W3 owns the planning use.

**World State** is the current operating condition of the environment that changes which interactions / routes / actions are possible under otherwise comparable player conditions.

Design model:

```text
known rules
+ fixed geometry
+ Player State
+ World State
→ currently possible actions
```

| Term | Meaning |
| --- | --- |
| PLAYER STATE | Position, direction, carried motion. |
| WORLD STATE | Current environment operating condition. |
| FIXED GEOMETRY | The stable spatial structure against which states are compared. |
| HIDDEN IMPLEMENTATION FLAG | Not valid knowledge unless observable through honest world behavior. |
| W4 TEMPORAL PROGRESSION | When / how long / after what event a state exists. |

Do **not** define “World State is a resource.”

| Distinguish | Meaning |
| --- | --- |
| STATE SELECTION | Which environment condition is active. |
| STATE COMMITMENT | Changing state may remove future options. |
| RESOURCE CONSUMPTION | Quantity / uses decrease. |
| W4 EVENT PROGRESSION | Events change future state over time / sequence. |

W3 language should prefer: create possibility; remove possibility; preserve possibility; restore possibility.

##### Possibility-set model (design audit only)

Example:

```text
World State A: {X, Y}
World State B: {Y, Z}

State change: X disappears, Y remains, Z appears
```

The player does **not** need to see set notation. Designers use the model to ask: “What actions actually changed?”

A possible action must correspond to a real readable gameplay relationship, not an invisible permission flag.

##### Gain / loss / trade-off

| Kind | Meaning |
| --- | --- |
| CREATION | A possibility becomes available. |
| REMOVAL | A possibility becomes unavailable. |
| TRADE-OFF | One possibility appears while another disappears. |

W3 core requires understanding **creation + removal**. Trade-off is the deeper planning interpretation. Do **not** create separate mandatory tutorial nodes for every variant.

##### Open is not always better

“Open / active / enabled” is not inherently good.

A World State is judged by what it makes possible **for the current plan**.

Behavioral evidence may include: delaying activation; using a possibility before activation; restoring a previous state; choosing activation in a different context.

Do **not** require the player to fail first. Correct anticipation is valid evidence.

```text
STATE ENABLES ACTION
    → REVALUE THE CHANGE
        → PRESERVE WHAT COMES NEXT
            → PLAN BOTH STATES
```

| Role | Knowledge | Planning note |
| --- | --- | --- |
| STATE ENABLES ACTION | K01 | World State changes what actions are possible. |
| REVALUE THE CHANGE | K03 (after K02 cause) | An apparently positive state change may remove a useful possibility. |
| PRESERVE WHAT COMES NEXT | K04 | Logical order keeps a needed possibility available. |
| PLAN BOTH STATES | K05 | Player State + World State organized into a personal plan. |

K02 (player action changes World State) sits between K01 and K03 in the knowledge flow. Roles may merge. This is **not** a fixed room sequence.

**IDs:** `W3-K01` … `W3-K05`. Permanent conceptual knowledge IDs. Do not recycle. Do not implement as game objects.

**World statement:** “다음 행동에 필요한 가능성을 만들고, 아직 필요한 가능성은 없애지 않는다.”

##### Knowledge nodes

| ID | Layer | Understanding | Prerequisite | Evidence | Misconception |
| --- | --- | --- | --- | --- | --- |
| W3-K01 | FOUNDATION | 내 상태가 비슷해도 세계 상태에 따라 할 수 있는 행동이 달라진다. Even with a similar player state, different world states can make different actions possible. | W1 action / landing understanding and whatever already-known movement relationship is used | Player stops changing only Player State and changes / compares World State to make the desired action possible. | If my movement is correct, the same action should always work. |
| W3-K02 | DEVELOPMENT | 내 행동이 세계 상태를 바꾸고, 그 결과 다음 선택도 바뀐다. My action can change the world state, and that changes what I can do next. | K01; readable cause / state-change relationship | Player intentionally reproduces, avoids, or orders the cause of a state change to affect later possibilities. | The world changed by itself. If I can activate something, I should activate it immediately. |
| W3-K03 | REINTERPRETATION | 상태 변경은 단순한 진전이 아니라 가능성의 교환일 수 있다. A state change can trade possibilities, not simply create progress. | K01 + K02 | Player considers what will be lost before activating a state change, or restores / delays the change when useful. | Open / active / enabled is always better. |
| W3-K04 | TRANSFER | 나중에 필요한 가능성을 위해 지금의 행동과 상태 변경 순서를 정할 수 있다. I can order actions and state changes to preserve possibilities I will need later. | K02 + K03 + W1 future-oriented planning | In a new context, player deliberately uses a needed possibility first, then changes World State, or prepares World State before a later action. | Activate everything first, then move. |
| W3-K05 | MASTERY | 내 상태와 세계 상태를 함께 준비해 내 계획을 만들 수 있다. I can plan both my player state and the world state needed for the action I want. | K01–K04, and only W1 / W2 relationships that were actually introduced and understood | Player selects and combines known relationships into a plan, then revises that plan based on actual results. | The correct switch order is the solution. |

##### Knowledge flow

```text
W1 action / next-start planning
        ↓
W3-K01 state affects action possibility
        ↓
W3-K02 player action changes world state
        ↓
W3-K03 state value depends on what possibilities are gained/lost
        ↓
W3-K04 logical ordering preserves needed possibilities
        ↓
W3-K05 player + world state integrated planning
```

Optional dependency: understood W2 carried-motion relationships may support K05 when relevant. **Momentum is not required in every W3 problem.**

This is a knowledge dependency graph. It is **not** a room count, mandatory room order, or Door / Switch tutorial.

##### First true W3 Aha

Leading candidate: “내가 잘 도착하는 것만으로는 부족하네. 그 행동을 할 수 있는 세계 상태도 필요하구나.”

English: “Arriving correctly is not enough. The world also needs to be in a state that makes the action possible.”

Simply encountering a closed obstacle is **not** sufficient evidence. The player must experience / use: World State difference → action possibility difference, under otherwise comparable conditions.

##### Logical order vs W4 TIME

Record this boundary explicitly.

**W3 ORDER:** B must happen before A because A removes the possibility of B. Waiting forever does not change the logic.

Examples: use a capability before disabling it; enter position before changing solidity; use current state, then switch state; restore a state before another action.

**W4 TIME:** success depends on when a state occurs; how long it lasts; delay; cycle; countdown; event progression; timing between actions.

Boundary tests:

1. Does waiting alone change the relevant World State? If yes, a W4 element exists.
2. Can the same logical order succeed or fail only because of time spacing? If spacing is the planning variable, W4.
3. With generous execution time, is a specific logical order still necessary? If yes, it can remain W3.

Do **not** add timing pressure merely for difficulty. No timed switch, short-lived gate, cycle, countdown, delay, or rhythm as default W3 escalation.

##### Reversibility

Reversibility is **not** required by W3.

Early W3 should prefer reversible state changes **or** short readable recovery, because that supports comparison and hypothesis testing.

Irreversible commitment is optional deeper content. Requirements: consequence is readable before commitment; rules remain consistent; failure does not become a hidden softlock; replay / recovery cost remains reasonable.

Do **not** make irreversible commitment a foundational W3 requirement.

##### Player agency

Three possible expression forms. No dedicated Switch is required.

| Form | Meaning |
| --- | --- |
| DIRECT | Player intentionally activates state. |
| INDIRECT | Movement / contact causes state change. |
| CONSEQUENTIAL | One action changes multiple possibilities. |

Minimum W3 agency: the cause is readable; the player can intentionally cause / avoid / order it; the choice changes later possibilities; the player can compare outcomes and retry.

Automatic state changes may expose K01. They are insufficient by themselves for K02–K05.

##### Readability

Facts that **must** be readable: current relevant World State; what changed; what caused the change; which relevant route / surface / interaction changed; whether the change is reversible when that matters; why a currently desired action is unavailable.

Strategic conclusions that should remain discoverable: which state is best; when to change it; exact action order; which possibility to preserve.

Apply Discovery Language: facts visible, strategy discoverable.

##### Failure as information

| Kind | Pattern |
| --- | --- |
| Informative | Player changes state, gains one possibility, and can see another needed possibility disappear. |
| Uninformative | State changes, progress becomes impossible, but the player cannot identify why. |
| Misleading | Failure appears to be a movement error, but hidden World State blocked the action. |
| Accidental clear | Automatic state sequence produces the correct order without intentional choice. |

Hidden softlocks are **not** Discovery. Long mandatory replay is **not** informative failure.

##### Door / Switch status

| Object | Record |
| --- | --- |
| Door | **STRONG CANDIDATE EXPRESSION.** Not a mandatory W3 mechanic. Strengths: concrete binary state; readable solid / passable relationship; can create and remove different interaction possibilities. Risks: open = progress cliché; switch hunting; closed-state value depending on unvalidated Wall Jump; trivial unlock puzzles. No implementation approval. |
| Switch | **USEFUL EXPRESSION CANDIDATE.** Not required. Primary value: clear cause → separated state result. Danger: a visible switch becomes “press me now.” Supports W3 depth only when “can activate” differs from “should activate now.” |

##### W2 reuse

W3 may reuse understood W2 relationships.

W2-PHYS-001 / 002 **PASS** prove physical capability, **not** human understanding. Until W2 readability is validated (W2-PHYS-003 **PENDING**), do not assume the player can use carried-motion knowledge as a required W3 prerequisite.

Good reuse: known player-state preparation + new World-State condition.

Bad reuse: first-time motion reasoning + first-time world-state reasoning in the same problem.

##### W3 graduation evidence

Use **planning supported / adaptation unobserved**, not “used every Door / Switch.”

| Class | Items |
| --- | --- |
| MUST UNDERSTAND | World State changes available actions; player actions can change World State; state change can create **and** remove possibilities; a state's value depends on the current plan; logical order may matter even with unlimited thinking time; future actions may require preparing or preserving a World State |
| MAY EXPERIENCE | Same object in different roles; restoring a prior state; irreversible commitment; one action changing multiple possibilities; deciding whether Player State or World State should be prepared first; multiple valid state plans |
| MUST NOT REQUIRE | Door / Switch completion checklist; Wall Jump; BOOST / Charge; special Air Reversal; timed switches; countdowns; delay prediction; cycles; rhythm; hidden state conditions; long mandatory replay; precision execution; all alternate solutions; verbal explanation |

Insufficient: press every switch; follow every opened path; automatic order; activate-all; memorized switch sequence; hidden-condition guessing.

##### Final integration

Candidate: “원하는 행동을 위해 내 상태와 세계 상태를 준비하고, 아직 필요한 가능성을 남기는 순서를 고를 수 있다.”

English: “I can prepare both my state and the world state, while ordering changes so needed possibilities remain available.”

Possible evidence: intentionally creates a needed possibility; preserves a still-needed possibility; delays or reverses an apparently beneficial change; chooses a logical state/action order; transfers known relationships to a new context.

Do **not** require all evidence inside one giant room.

False-positive clear: automatic order; activate-all; memorized switch sequence; hidden-condition guessing.

##### W3 → W4 handoff

| | W3 | W4 |
| --- | --- | --- |
| Question | What world state must exist for the desired action to be possible? | When must it exist, how long does it exist, or after what event will it exist? |
| Planning variable | Which state / logical order | Occurrence, duration, delay, cycle, event progression |

W3 should **not** add timing pressure merely for difficulty. No timed switch / short-lived gate / cycle / countdown / delay / rhythm as default W3 escalation.

##### Expression alignments (not mandatory rooms)

| Topic | Record |
| --- | --- |
| DSC-014 | Core relationship strongly aligns with **W3-K03 / K04**: apparently positive state change → removes a still-needed possibility → plan / order is reconsidered. Door is one possible expression. Do **not** make Wall Jump or Door-specific behavior a current W3 prerequisite. Do **not** claim a hidden consequence is fair discovery. **Not** automatically a required W3 room. |
| DSC-018 | Strong W3 alignment when different World State changes what actions involving the object are possible. This does **not** mean every object needs two tricks. W3 learns how World State changes object/action possibility. W5 recombines already-known state/role relationships with other known domains. Do **not** move reinterpretation exclusively to W5. |
| DSC-001 | Historical Door-as-wall seed. Expression, not W3 identity. Closed-state value must not depend on unvalidated Wall Jump as a current W3 requirement. |

##### Bloat warnings

Depth Over Quantity applies.

- Switch count mistaken for depth
- Longer state sequences
- Open / close tutorials split into separate rooms
- Reverse-order versions with no new inference
- Hidden linkage
- Irreversible gotcha
- Door-specific trick checklist
- Adding timing to make W3 harder
- Adding gimmicks because W3 feels short

##### Historical slot → current role

IDs and titles preserved. **Not** a production count, mandatory sequence, or graduation checklist.

| Slot | Title | Current alignment |
| --- | --- | --- |
| 001 | Closed | Useful K01/K02 expression candidate. |
| 002 | State | Duplicate candidate if the same inference as 001. |
| 003 | Set It First | K04 transfer/test. |
| 004 | Don't Open It | Conditional / historically Wall-Jump-dependent. **Not** current mandatory content. |
| 005 | Use It, Then Open It | Useful logical-order application. |
| 006 | Opening Can Be Wrong | Strong K03 expression candidate. |
| 007 | Switch Again | State restoration application. |
| 008 | Movement Before State | Transfer/test. Ensure it is not merely reverse ordering of 003. |
| 009 | Which First? | Duplicate candidate if the same state-order inference as earlier slots. |
| 010 | Same Door, Different Job | Transfer/test or duplicate depending on earlier coverage. |
| 011 | Door × Momentum | Only after W2 knowledge is actually learned. **Not** a current prerequisite. |
| 012 | The Door Is Not a Door | Integration / transfer candidate. Not “use every Door trick.” |

Historical slots remain lineage, not production count / order / graduation checklist.

#### Knowledge Graph (historical candidate inventory)

Door / Switch appear here as historical expression, not as W3’s identity.

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

#### Knowledge Gates (historical — not current World identity)

IDs retained. Current W3 graduation is the W3-K evidence language above, not “used Door / Switch.”

| Gate | Historical requirement | May be satisfied in |
| --- | --- | --- |
| W3-GATE-1 | Switch → state change | LVL-W03-001 / LVL-W03-002 |
| W3-GATE-2 | Closed Door is a usable physical surface | LVL-W03-004 |
| W3-GATE-3 | Stop treating OPEN/CLOSED as GOOD/BAD | LVL-W03-006 |
| W3-GATE-4 | Plan order of Movement and State | LVL-W03-003 / LVL-W03-008 / LVL-W03-009 |
| W3-GATE-5 | Reinterpret the same object by context | LVL-W03-010 |
| W3-GATE-6 | Combine object state with prior physics | LVL-W03-011 |

Rooms `LVL-W03-001` … `LVL-W03-012` are a **historical candidate inventory**. Not a production count.

---

### WLD-04 — WHEN SHOULD I ACT?

| Field | Value |
| --- | --- |
| World ID | `WLD-04` |
| Name | WHEN SHOULD I ACT? |
| Role | TIME |
| Status | CANDIDATE |
| Core Question | When does the needed state appear, how long does it last, and after which event — and how does that change the plan? (historical label: When should I act?) |
| Core understanding | Reason about *when* a future state will exist, not only the current state. |
| Time principle | Time is reasoned about, not reacted to. A timing window creates a planning decision before an execution challenge. |
| Knowledge focus | Occurrence, duration, delay, event progression, future-state prediction. |
| Graduation | Player adjusts cause timing / order / waiting because a useful state must exist later. Insufficient: lucky timing; fast reaction; cycle memorization. |
| Avoid | Frame-perfect windows; unexplained timers; sudden state changes; arbitrary timing; reaction-only gates; invisible countdown (ANTI-003, ANTI-004, ANTI-012). W4 is **not** a reaction challenge. |
| Rules Emphasized | R-STATE-003; R-STATE-002; R-SIGNAL-002; R-INFO-001 |
| New Rule Budget | Historical expression candidates: Bounce Counter, Timed Gate, Delayed Switch (or Switch+Delay). **These do not define W4.** Event-count belongs here **only if** it changes future-state planning. Pure counting / resource allocation is not automatically TIME. |
| Delayed Switch note | May later be a Switch variation, not a separate object family. **Do not resolve in DOC-003.** |
| Major Discoveries | W4-clear: DSC-012, DSC-013. DSC-011 is **conditional** (future-state planning required). |
| Mastery Test | Historical: LVL-W04-012. Current: future-state planning evidence, not a required 12th slot. |
| Transition to Next World | Player / world / time alignment is known. Next: which assumptions behind familiar solutions still apply. |
| Visual / Audio Identity | **Not locked.** Durations TBD — after PLAY-001B / relevant prototype validation. |

#### Knowledge Graph (historical candidate inventory)

Counter / Gate / Delay appear here as historical expression, not as W4’s identity. COUNT is TIME only when it changes future-state prediction.

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

#### Knowledge Gates (historical — not current World identity)

IDs retained. Current W4 graduation is future-state planning evidence above. W4-GATE-1 is TIME only if the count changes a predicted future state.

| Gate | Historical requirement | May be satisfied in |
| --- | --- | --- |
| W4-GATE-1 | Bounce is a countable event/resource | LVL-W04-001 / LVL-W04-002 |
| W4-GATE-2 | Extra Bounce or detour to alter future state | LVL-W04-003 |
| W4-GATE-3 | Waiting as intentional strategy | LVL-W04-004 |
| W4-GATE-4 | Plan around a readable Timed State window | LVL-W04-005 / LVL-W04-006 |
| W4-GATE-5 | Predict a delayed consequence | LVL-W04-008 / LVL-W04-009 |
| W4-GATE-6 | Synchronize future Movement State and World State | LVL-W04-007 / LVL-W04-011 / LVL-W04-012 |

Rooms `LVL-W04-001` … `LVL-W04-012` are a **historical candidate inventory**. Not a production count.

---

### WLD-05 — WHAT DO I REALLY KNOW?

| Field | Value |
| --- | --- |
| World ID | `WLD-05` |
| Name | WHAT DO I REALLY KNOW? |
| Role | UNDERSTANDING |
| Status | CANDIDATE |
| Core Question | Under what conditions is my familiar solution valid, and what becomes possible if known relationships connect differently? (historical label: What do I really know?) |
| Evolves from | “What is the rule?” → “Which assumptions behind my familiar solutions still apply?” |
| Identity | **Synthesis / autonomy stage.** Not a fifth mechanic domain. Not Remix / Hard Mode. |
| New Rule target | **0** |
| New Gimmick target | **0** |
| Hidden mechanic | **0** |
| Exists to | Check assumptions; recombine known relationships; construct a personal plan. Reinterpretation is **not** unique to W5. |
| Graduation | Player detects that a familiar solution’s assumptions no longer hold and reorganizes known relationships. Insufficient: hard execution of an old solution; using many gimmicks; a longer sequence. |
| Major Discoveries | Do **not** force mixed IDs here. DSC-007 / DSC-016 remain mixed / unassigned unless later justified as assumption-audit / recombination. |
| Mastery Test | Historical: LVL-W05-012. Current: synthesis evidence. Room count is **not** protected. |
| Transition to Next World | None recorded. |
| Visual / Audio Identity | **Not locked.** |

W5 may be smaller than other Worlds. If strong recombination / assumption-audit problems are scarce, **reduce W5 scope**. Do not steal reinterpretation from earlier Worlds. Do not put every gimmick in the finale. Prefer a few deeply interacting known relationships. Exact mix TBD after prototype/playtest.

#### Knowledge Graph (historical candidate inventory)

This graph is lineage. W5 must not hide new rules inside “reinterpretation,” repeat W3 object-role lessons, or repeat W4 timing lessons.

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

Rooms `LVL-W05-001` … `LVL-W05-012` are a **historical candidate inventory**. The 12-slot count is **not** protected.

---

## 60-slot note

W1–W5 = 12 × 5 = **60 historical progression candidates / slots**.

This is **not** a commitment to ship 60 rooms. No World is defined by its slot count. W5’s count is especially unprotected. C-05 Depth Over Quantity takes precedence over slot preservation. Later playtest may merge, delete, expand, reorder, convert to Reward, or reduce count.

---

## DOC-003 audits

### Interaction

Unused Interaction ≠ design debt. Required progression need not cover INT-018, INT-019, INT-024. Those may stay challenge / alternate / expansion / experiment material.

### Gimmick economy (historical expression candidates)

These groupings do **not** define Worlds. Gimmicks are expression tools for a knowledge question.

| World | Historical expression candidates |
| --- | --- |
| W1 | none required |
| W2 | Wind, Ice, Rough Surface — if the ask is carried motion, not “use the ice world” |
| W3 | Door, Switch — if the ask is action availability, not gimmick novelty |
| W4 | Bounce Counter, Timed Gate, Delayed Switch — if the ask is future-state prediction, not counting for its own sake |
| W5 | no new gimmicks |

Intentional (C-05). Do not add gimmicks so later worlds “look more complex.”

GIM-005 Rough Surface Second Face remains **unresolved**. “Kill unwanted momentum” may only be a positive reading of the First Face (slow). Do not invent a new property to satisfy C-07. Blocks CORE until playtest/design resolves it.

### Pattern / cognitive operations (W5 adjacent)

Historical W5 room rows only. Several operations below (detour, object role, resource allocation, trigger timing) may belong to earlier Worlds or remain unassigned. Do not steal them to fill W5.

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
- Do not define a World by its historical gimmick inventory or slot count.
- Knowledge Gate IDs are retained and are not extra `LVL-` IDs (28 historical player-gate labels; no W5-GATE-7). Current graduation is the World Knowledge Architecture evidence language, not historical gate-to-gimmick checklists.

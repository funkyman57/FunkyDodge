# World Library

Worlds sequence levels. They are **knowledge domains**, not mechanic or gimmick bundles.

Vocabulary (Knowledge Graph, Knowledge Gate, Movement State) is defined in [DESIGN_SYSTEM.md](../DESIGN_SYSTEM.md). Room rows live in [LEVEL_LIBRARY.md](LEVEL_LIBRARY.md). Discovery Language: [DISCOVERY_LIBRARY.md](../libraries/DISCOVERY_LIBRARY.md). Do not duplicate those definitions here.

Official status for worlds and rooms: `CANDIDATE`. Role: progression candidate. Documentation is not validation. This pass does **not** validate W2–W5 content, any gimmick, or movement experiments.

W1 CONTROL Knowledge Architecture v1 (`W1-K01`–`W1-K08`) is the **current** W1 planning source. **Status:** `CANDIDATE`. Conceptual only.

W2 MOMENTUM Knowledge Architecture v1 (`W2-K01`–`W2-K05`) is the **current** W2 planning source. **Status:** `CANDIDATE`. Conceptual only. Movement Validation #3 is **pending** and does **not** validate W2-K. W2-PHYS-001 (carried motion persists) and W2-PHYS-002 (player can create useful motion contrast) are **physical PASS**. W2-PHYS-003 Human Readability is **PENDING**. Do **not** treat W2 as fully Human Validated. No W2 room is `VALIDATED`. No Wind / Ice / Rough implementation is approved by this documentation.

W3 POSSIBILITY Knowledge Architecture v1 (`W3-K01`–`W3-K05`) is the **current** W3 planning source. **Status:** `CANDIDATE`. Conceptual only. No W3 room is `VALIDATED`. No Door / Switch (or other W3) mechanic is approved for production by this documentation. W3 is **not** Door World, Switch World, or a gimmick showcase.

W3 current **physical** evidence (not Human Validation): EXP-000 **PASS** (binary World State changes real possibilities); EXP-001 **PASS** (player can intentionally cause / avoid / restore); EXP-002 **PASS** (one binary state supports possibility trade-off and logical order without timing); EXP-003A **READY** (Human readability harness prepared). **W3 Human Validation: PENDING.** Do **not** document W3 as Human Validated.

W4 TIME Knowledge Architecture v1 (`W4-K01`–`W4-K05`) is the **current** W4 planning source. **Status:** `CANDIDATE`. Conceptual only. No W4 room is `VALIDATED`. No temporal mechanic is approved for production. W4 is **not** Timed Gate World, Delayed Switch World, Counter World, or a reaction challenge. Production dependencies on W2 / W3 **human** understanding remain unapproved.

W5 UNDERSTANDING Knowledge Architecture v1 (`W5-K01`–`W5-K04`) is the **current** W5 planning source. **Status:** `CANDIDATE`. Conceptual only. No W5 room is `VALIDATED`. No W5 gimmick is approved. W5 is **not** a fifth mechanic domain, not Remix / Hard Mode, not a harder W4, and not an all-mechanics finale. W5 does **not** own reinterpretation itself. Do **not** treat W2 / W3 / W4 Human understanding as validated. W2 / W3 / W4 physical experiments are **PASS** where documented; Human Validation remains **PENDING**.

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
| WLD-05 | UNDERSTANDING | Under what conditions is the solution I treated as correct actually valid, and what becomes possible when I recombine known relationships differently? | 내가 정답처럼 쓰던 해법은 어떤 조건에서 유효하며, 이미 아는 관계를 다르게 연결하면 무엇이 가능한가? |

Historical English labels remain: How do I move? / What changes my motion? / What can objects become? / When should I act? / What do I really know?

### Knowledge focus

| World | Focus | Inherited | Must not require |
| --- | --- | --- | --- |
| W1 CONTROL | Trajectory, landing, next starting position, starting direction | — | Deliberate speed accumulation; momentum preservation; velocity optimization; world-state manipulation; time-state planning; BOOST / Air Reversal / Wall Jump mastery |
| W2 MOMENTUM | Carried motion; preserve / reduce / discard; same position, different movement state | W1 position / direction / next start | “Go faster” as identity; world-state as the lesson; time-state planning. W2 is **not** Wind / Ice / Rough. |
| W3 POSSIBILITY | World State changes the current possibility set; create **and** remove possibilities; logical order of state choices | W1 action / landing understanding; only W2 relationships that were actually introduced and understood | Gimmick showcase as identity. W3 is **not** Door / Switch. Logical order ≠ TIME. Momentum is **not** required in every W3 problem. |
| W4 TIME | TIME AS A PLANNING VARIABLE. When a needed state occurs, how long it lasts, or after what known cause it appears — and how that changes the present plan | W1-level preparation already understood; W3 state-possibility conceptually reusable; only W2 relationships that were actually introduced and understood | Reaction speed; frame-perfect timing; rhythm; racing a timer; cycle memorization; waiting for an obvious opening. Timed Gate / Delayed Switch / Counter do **not** define W4. Event-count belongs **only if** it changes future-state planning. |
| W5 UNDERSTANDING | The player chooses **which known relationship should organize the plan**. Supporting processes: assumption audit, relation selection, relation recombination, solution autonomy. See W5-K. | W1–W4 known relationships that were actually introduced and understood | Hidden new rules; new input grammar; new gimmick; all mechanics / gimmicks; long execution chains; precision escalation; verbal explanation. Single-variable revaluation already owned by W2 / W3 / W4 is **not** unique to W5. |

### Graduation evidence

| World | Sufficient | Insufficient |
| --- | --- | --- |
| W1 | Player changes earlier trajectory / landing / approach based on the next starting position needed. | LOW usage alone; room clear; memorized sequence |
| W2 | Player intentionally uses differences in carried motion (preserve / reduce / discard / redirect) because the goal demands it. | Maximum-speed clear; accidental slide |
| W3 | Player prepares / preserves / delays / restores World State because it changes which actions remain possible. See W3-K graduation. | Press every switch; follow every opened path; activate-all; memorized switch sequence |
| W4 | Player predicts a future World State from a known cause / progression and changes present cause, preparation, or delay so that state exists when it is useful. See W4-K graduation. | Lucky timing; fast reaction; cycle memorization; “you were too slow”; racing a visible cue |
| W5 | Player judges which known relationship is relevant under current readable conditions, retains still-valid knowledge, and reorganizes the plan when a familiar solution’s assumptions no longer hold. See W5-K graduation. | Hard execution of an old solution; using many gimmicks; a longer sequence; all-mechanics finale; single-variable revaluation already owned by W2 / W3 / W4 |

### Adjacent transitions

| Handoff | Previous | New | Discontinuity |
| --- | --- | --- | --- |
| W1 → W2 | Where / which direction should I begin? | How does carried movement change what becomes possible? | Position / direction alone no longer explains the result. |
| W2 → W3 | What movement state should I arrive with? | What world state must exist for the desired action to be possible? | Player state is no longer the only changing condition. |
| W3 → W4 | Which world state should I create, and in what logical order? Waiting indefinitely does not change the relation. | When will that state exist, how long, after what event — and how does that change the present plan? | State *value* / logical order alone is insufficient. Temporal progression becomes a planning variable. |
| W4 → W5 | How do I organize present choices so Player State and World State coincide when useful? | Under what conditions is the solution I treated as correct actually valid, and which known relationship should organize the plan now? | W5 adds **no** new temporal dimension and **no** new gimmick. Not harder timers, smaller windows, more cycles, or an all-mechanics finale. |

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
11. W5 becoming a harder earlier World (narrower landing, more exact speed, more state changes, tighter timing).
12. W5 becoming an all-mechanics / all-discoveries finale.
13. W5 requiring Charge / Wall Jump / Air Reversal merely because they appear advanced.

### Unassigned / not yet world-owned

Unassigned is **not** design debt. It means the knowledge role is not yet proven. Do not force a World.

Candidates that remain unassigned unless later justified: BOOST / Spin / Charge; special Air Reversal; Wall Jump; Spring / Impulse use cases; Moving Block; One-way Surface; Force Switch; pure count / resource puzzles; Mirror / Detour forms; Recovery; Personal Plan; Reinterpretation (as a standalone domain).

### W5 synthesis status

W5 is **not** a fifth mechanic domain. It is a **synthesis / autonomy** stage.

W5 does **not** own reinterpretation itself. Earlier Worlds already include: W2 more motion is not always better; W3 state change / opening is not always progress; W4 earlier activation is not always better.

W5’s new central demand is: **the player chooses which known relationship should organize the plan.**

It may be intentionally compact. Scope is evidence-driven. Its content count is **not** protected. If a distinct relation-selection ability remains untested, a new dependency adds real synthesis evidence, autonomy transfers to a broader context, or mastery experience improves without repetition, expand. Otherwise reduce. Do **not** steal reinterpretation from earlier Worlds to fill W5. Do **not** preserve World length for symmetry. Do **not** preserve the historical 12-room count. New W5 gimmick: **NOT REQUIRED** (default **NO-GO**).

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
Under what conditions is the solution I treated as correct actually valid,
and what becomes possible when I recombine known relationships differently?
```

W5 does not replace prior knowledge. It is a synthesis stage over W1–W4. Canonical questions: World Knowledge Architecture above. W5-K01–K04 is the current planning source.

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
| Mixed / unassigned | DSC-006, DSC-007, DSC-010, DSC-016 |
| W5 strongest candidate | DSC-015 — **only** when known relations form a genuinely new dependency. Combination is not automatically W5. |
| Historical guidance only | DSC-001 (Door-as-wall seed; expression, not W3 identity); DSC-006 / DSC-010 / DSC-017 as former W1 homes |

Long-range: DSC-017 strongly aligns with **W2-K01**, **not** current W1 graduation evidence and **not** a forced W2 room. Do **not** assign mixed IDs or earlier-World discoveries to W5 to fill a remix quota. W5 audit (IDs preserved; meanings unchanged): DSC-002 / 008 / 012 / 013 are possible TRANSFER material if already understood; DSC-001 / 003 / 004 / 005 / 009 / 014 / 017 / 018 remain earlier-World understanding; DSC-006 / 007 / 010 / 011 / 016 remain unassigned / optional — W5 assignment not required.

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
| WLD-05 | UNDERSTANDING | Under what conditions is the solution I treated as correct actually valid, and what becomes possible when I recombine known relationships differently? | CANDIDATE | Synthesis stage. `W5-K01`–`W5-K04`. Historical 12-slot count is **not** protected. Compact / evidence-driven. |

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
| Approved summary | 미래에 필요한 상태가 유용한 때 존재하도록, 지금의 선택을 조직한다. |
| Core understanding | TIME AS A PLANNING VARIABLE. Reason about *when* a future state will exist, not only the current state. |
| Time principle | Time is reasoned about, not reacted to. W4 is **not** primarily reaction speed, frame-perfect timing, rhythm, racing a timer, cycle memorization, or waiting for an obvious opening. |
| Knowledge focus | Predicting a future World State; preparing before it appears; delaying or advancing a cause; distinguishing state error from timing error; revising a temporal plan from actual progress. |
| Graduation | See W4-K graduation. Insufficient: lucky timing; fast reaction; cycle memorization; “you were too slow.” |
| Avoid | Frame-perfect windows; unexplained timers; sudden state changes; arbitrary timing; reaction-only gates; invisible countdown (ANTI-003, ANTI-004, ANTI-012). |
| Rules Emphasized | R-STATE-003; R-STATE-002; R-SIGNAL-002; R-INFO-001 |
| New Rule Budget | Historical expression candidates: Bounce Counter, Timed Gate, Delayed Switch (or Switch+Delay). **These do not define W4.** Event-count belongs here **only if** it changes future-state planning. Pure counting / resource allocation is not automatically TIME. No temporal mechanic is approved for production. |
| Delayed Switch note | Delayed **causal relation** is a strong expression candidate. This does **not** approve a production Delayed Switch object. Implementation as independent object vs Switch+Delay remains unresolved. |
| Major Discoveries | W4-clear: DSC-012 (useful application, not mandatory graduation), DSC-013 (strong foundational expression). DSC-011 is **conditional** (future-state planning required). |
| Mastery Test | Historical: LVL-W04-012. Current: W4-K05 / final-integration evidence, not a required 12th slot. |
| Transition to Next World | Player / world / time alignment is known. Next: which known relationship should organize the plan under current conditions. W5 adds no new temporal dimension and no new gimmick. |
| Visual / Audio Identity | **Not locked.** Durations TBD — after PLAY-001B / relevant prototype validation. |

Current planning model next. Historical 12-slot graph, gates, and slot mapping follow it as lineage.

#### W4 TIME Knowledge Architecture v1

**Status:** `CANDIDATE` — conceptual. Unvalidated. Not runtime objects. Not `VALIDATED` / `CORE`. No W4 room is `VALIDATED`. No temporal mechanic is approved for production.

This is the **authoritative current W4 planning model**. Role-based. Not slot-count-based. Not a Timed Gate / Delayed Switch / Counter tutorial. Not a reaction challenge.

**Core question:** How does when a needed state occurs, how long it lasts, or what causes it to occur later change the plan? / 필요한 상태가 언제 생기고, 얼마나 유지되며, 어떤 사건 뒤에 생기는지가 계획을 어떻게 바꾸는가?

**Approved summary:** “미래에 필요한 상태가 유용한 때 존재하도록, 지금의 선택을 조직한다.”

W4 is **not** primarily: reaction speed; frame-perfect timing; rhythm; racing a timer; cycle memorization; waiting for an obvious opening.

W4 **is** TIME AS A PLANNING VARIABLE.

Player reasoning should involve: predicting a future state; preparing before it appears; delaying or advancing a cause; distinguishing state error from timing error; revising a temporal plan from actual progress.

##### Traceability

| Item | Status |
| --- | --- |
| W3 EXP-000 / 001 / 002 | physical **PASS** |
| W3 EXP-003A | Human harness **READY** |
| W3 Human Validation | **PENDING** |
| W2 Human readability | **PENDING** |

W4 architecture may be documented. Production dependencies on W2 / W3 **human** understanding remain unapproved. Do **not** document W3 as Human Validated.

##### Temporal State definition

Canonical vocabulary also lives in [DESIGN_SYSTEM.md](../DESIGN_SYSTEM.md). Restated here because W4 owns the planning use.

**Temporal State** is the relationship between:

- the current World State
- a future World State
- and the known temporal / event relation by which that future state will occur

when that relationship affects player planning.

| Term | Meaning |
| --- | --- |
| CURRENT WORLD STATE | What is true now? |
| FUTURE WORLD STATE | What will become true later if known conditions continue? |
| TEMPORAL RELATION | When / for how long / after what event does that future change occur? |

Distinguish Temporal State from: ordinary elapsed simulation time; movement execution timing; landing-input timing; animation duration with no gameplay consequence; W3 logical ordering; hidden timer implementation.

##### WHEN / HOW LONG / AFTER WHAT

These are **dimensions of one temporal principle**, not separate knowledge IDs.

| Dimension | Role |
| --- | --- |
| WHEN | When does the useful state exist relative to player action? **Core.** |
| HOW LONG | How long does it remain useful? **Optional expression.** |
| AFTER WHAT | What known cause / event progression makes the future state occur? Predictable causal basis is **core**; Counter / event-count expression is **optional**. |

Do **not** create W4-K06 Duration, W4-K07 Counter, etc. unless future evidence proves genuinely independent knowledge.

```text
READ THE FUTURE
    → REVALUE IMMEDIACY
        → CHOOSE NOW FOR LATER
            → OWN THE TEMPORAL PLAN
```

| Role | Knowledge | Planning note |
| --- | --- | --- |
| READ THE FUTURE | K01 + K02 | Current state and future state are distinguished; future change is linked to a known cause. |
| REVALUE IMMEDIACY | K03 | Acting immediately is not always optimal. Waiting is **not** automatically the answer. |
| CHOOSE NOW FOR LATER | K04 | Future need changes current cause timing / preparation. |
| OWN THE TEMPORAL PLAN | K05 | Player organizes known Player / World / Time relations and revises from actual progress. |

Roles may merge. This is **not** a fixed room sequence.

**IDs:** `W4-K01` … `W4-K05`. Permanent conceptual knowledge IDs. Do not recycle. Do not implement as game objects.

**World statement:** “미래에 필요한 상태가 유용한 때 존재하도록, 지금의 선택을 조직한다.”

##### Knowledge nodes

| ID | Layer | Understanding | Prerequisite | Evidence | Misconception |
| --- | --- | --- | --- | --- | --- |
| W4-K01 | FOUNDATION | 지금 보이는 상태가 내가 행동할 때의 상태와 같지는 않을 수 있다. The state I see now may not be the state that exists when I act later. | W3-K01: World State affects action possibility | Player stops treating the current state as permanently representative and begins considering a known future change. | 현재 닫혀 있으면 계속 불가능하다. |
| W4-K02 | DEVELOPMENT | 미래 상태는 알려진 원인과 시간·사건 진행으로 예상할 수 있다. Future World State can be predicted from known causes and temporal / event progression. | K01; readable temporal cause | Player prepares before the visible result occurs and links the later change to an earlier known cause. | The activator failed. The change is random. |
| W4-K03 | REINTERPRETATION | 즉시 행동하거나 최대한 빨리 상태를 만드는 것이 항상 유리하지는 않다. Acting immediately or creating the state as early as possible is not always better. | K02; W3 understanding that state value depends on plan | Player advances or delays an action based on when the future state will be useful. Waiting is **not** automatically the answer. | Faster is always better. Waiting is always safer. |
| W4-K04 | TRANSFER | 나중에 필요한 상태가 지금 원인을 만들 시점과 준비 순서를 바꾼다. What I will need later can change when I cause the state change and what I prepare now. | K02 + K03 + W1 future-oriented planning | In a new context, player changes an earlier cause or preparation because of a later temporal need. | 변화가 보인 다음 대응하면 된다. |
| W4-K05 | MASTERY | Player State와 World State가 유용하게 만나는 시점을 계획하고, 실제 진행에 맞춰 수정할 수 있다. I can plan when my Player State and the needed World State should coincide, then revise the plan from actual progress. | K01–K04, and only previously understood Player / World State relationships | Player forms a temporal plan, executes it, identifies timing mismatch, and changes the relevant earlier choice. | The solution is the memorized input sequence. |

##### Knowledge flow

```text
W3: World State determines possibility
        ↓
W4-K01: current state may differ from future action state
        ↓
W4-K02: future change is predictable from known cause / progress
        ↓
W4-K03: immediate action is not always optimal
        ↓
W4-K04: future need changes current cause / preparation
        ↓
W4-K05: Player State + World State + temporal relation
        are integrated into a plan
```

This is a knowledge dependency graph. It is **not** a room count, required device order, or Counter → Gate → Delay tutorial sequence.

##### First true W4 Aha

Leading candidate: “작동은 이미 됐다. 결과가 아직 오지 않았을 뿐이다. 그러면 결과가 오기 전에 내가 준비할 수 있겠네.”

English: “The action already worked. The result just hasn't happened yet. That means I can prepare before it arrives.”

Prefer this over: “I was too slow.” The first W4 discovery should introduce **future-state planning**, not timer pressure.

| Evidence | Meaning |
| --- | --- |
| WEAK | Player notices / waits for a delayed result. |
| STRONGER | Player prepares before the result appears. |
| STRONG | Player changes the cause timing based on when the result will be useful. |

##### W3 order vs W4 order

Record this boundary explicitly.

**W3:** X first → change state → Y because state change removes X. Waiting indefinitely does **not** change the relation.

**W4:** Cause future change now → prepare → future state appears → act; **or** prepare first → trigger temporal change → use temporary future state. Temporal progression changes which state exists later.

Designer boundary tests:

1. Does waiting change the relevant state?
2. Does spacing between otherwise identical actions matter because of a known temporal relation?
3. Does a future event need to be anticipated?
4. If temporal progression is removed, does the problem collapse back into W3?

##### DSC-012 — Waiting Is an Action

Useful W4 application. **Not** a mandatory separate graduation skill.

| Kind | Meaning |
| --- | --- |
| PASSIVE WAIT | Player has no meaningful choice except waiting for the world. |
| INTENTIONAL WAIT | Player delays an action because acting now would make future Player / World State alignment worse. |

Auto Bounce note: waiting does **not** necessarily mean standing still. Do not redefine all non-progress as waiting.

##### DSC-013 — Action Now, Result Later

Strong candidate for **foundational W4 expression**.

Core relation: cause now → result pending → future World State → preparation before result.

Must read: cause occurred successfully; result is pending; affected target; future change; temporal progression.

Do **not** allow arbitrary hidden delay.

##### Event-progression boundary

Event count belongs to W4 **only when** the predicted future state changes what the player prepares before the relevant event occurs.

Diagnostic: “Besides knowing how many events remain, does knowing WHEN the next event changes the world alter the player's current plan?”

If **NO**, it may instead be: quota; resource; repetition; execution count; W3 logical prerequisite.

| W4 | Not automatically W4 |
| --- | --- |
| Next bounce will change the World State, so the player prepares beforehand. | Touch a trigger twice to unlock. |

Do **not** rewrite resource meanings to force W4 ownership.

##### Duration

Limited duration is **not** required for W4 completion.

Duration adds useful temporal depth only when: starting the state too early can be bad; preparation before activation matters; remaining opportunity changes the plan.

Reject as W4 core: open briefly → run faster, when no planning distinction remains.

##### Cycles

**OPTIONAL / RISKY** expression.

Useful when: phase predicts future possibility; player prepares before a future phase; skipping one opportunity can be intentional; next opportunity can be planned.

Risky when: wait for opening; memorize period; react to cue; rhythm / timing execution dominates.

Do **not** make cycles mandatory W4 content.

##### Delay

Readable delayed consequence is the **leading first W4 expression candidate**.

| | Record |
| --- | --- |
| DELAY RELATION | Strong candidate. |
| DELAYED SWITCH OBJECT | **Not approved.** |

Required information: cause succeeded; result pending; affected target; relative progress; persistence / expiry contract; effect of reactivation when relevant.

If removing the delay does not change any planning decision, the expression may be only W3 + waiting.

##### Scheduled vs caused future

Expression priority for initial W4 exploration (not a production content list):

1. **CAUSED FUTURE**
2. **EVENT-PROGRESSION FUTURE**
3. **SCHEDULED / CYCLIC FUTURE**

Reason: caused future most directly expresses current player action → predictable future World State → current preparation changes.

##### Temporal prediction model

W4 does **not** require exact millisecond prediction.

Valid qualitative temporal knowledge may include: before / after; soon / later; next event; one more event; enough time to prepare; not enough time if activated now; state will persist; state will expire.

Temporal information is sufficient when it reliably changes a meaningful choice.

##### Readability

Facts that may need to be readable: current World State; future change is pending; what caused it; affected world element; temporal progression basis; relative occurrence timing; persistence / expiry; effect of another action on the pending result.

Do **not** require exact numbers by default. Do **not** hide temporal facts and call surprise “discovery.”

Apply Discovery Language: facts visible, strategy discoverable.

##### Failure as information

| Kind | Pattern |
| --- | --- |
| Informative | Player arrives before the future state exists and can infer the cause should happen earlier, or preparation should happen later. |
| Informative | Useful state expires before action and the player can identify which preparation was mistimed. |
| Uninformative | Failure resets before Temporal State can be inspected. |
| Misleading | Movement error appears to be temporal failure, or temporal failure appears to be movement error. |
| Accidental clear | Input spam / arbitrary waiting happens to line up with the future state. |

“You were too slow” alone is **weak** W4 feedback.

##### Generous-timing principle

Candidate principle: “Once the temporal relation is understood, ordinary execution variance should usually still allow the plan to succeed.”

Design target: large difference between wrong plan vs right plan; small penalty for minor execution variance within the right plan.

Do **not** create depth by shrinking windows alone.

##### Player / World / Time integration

First-W4 burden target:

| Variable | Target |
| --- | --- |
| PLAYER STATE | Already understood W1-level preparation. |
| WORLD STATE | Already understood state-possibility relation. |
| NEW VARIABLE | One temporal relation. |

Avoid first exposure with a new movement technique, a new World-State rule, a new activator, and a new temporal rule **all together**.

Until Human Validation: W3 knowledge may be conceptually reused, but production content must **not** assume human understanding is proven. W2 carried motion remains optional until W2 Human readability evidence exists.

##### W4 graduation evidence

Use **planning supported / adaptation unobserved**, not “used every temporal device.”

| Class | Items |
| --- | --- |
| MUST UNDERSTAND | Current state alone may not determine future possibility; future state can be predicted from readable causes / progression; a future need can change present action; immediate / earliest action is not always best; player can distinguish wrong state from wrong timing / progression; player can transfer the relation to a new context |
| MAY EXPERIENCE | Limited duration; intentional waiting; event-count progression; recurring cycles; multiple temporal relationships; understood carried-motion reuse |
| MUST NOT REQUIRE | Every temporal device; exact seconds; frame-perfect reaction; narrow windows; rhythm execution; unvalidated movement techniques; unvalidated W2/W3 knowledge; verbal explanation; memorized cycles |

Insufficient: lucky timing; fast reaction; cycle memorization; racing a visible cue; “you were too slow.”

##### Final integration

Candidate: “필요한 상태가 내 행동에 유용한 때 존재하도록 현재 선택을 조직하고, 실제 진행이 다르면 계획을 수정한다.”

English: “I can organize my present choices so the needed state exists when it becomes useful, then revise the plan from actual progress.”

E3 candidate: in a new context, player changes an earlier cause / preparation because of a future temporal need.

Mastery: player distinguishes wrong state / wrong timing / wrong preparation and modifies the relevant cause.

False positives: memorized input sequence; input spam; accidental waiting; reaction to visible cue; cycle memorization.

##### W4 → W5 handoff

| | W4 | W5 |
| --- | --- | --- |
| Question | How do I organize present choices so the needed state exists when useful? | Under what conditions is the solution I treated as correct actually valid, and which known relationship should organize the plan now? |
| Adds | One temporal relation as a planning variable | **No** new temporal dimension. **No** new gimmick. |

W4 graduates can reason about: Player State; World State; when those states must coincide; what current action prepares that future.

W5 adds: assumption audit; selecting among known relationships; meaningful recombination; autonomy; applying known conditions in unfamiliar contexts.

W5’s new demand is **not** another single-variable revaluation. If gameplay is behaviorally identical to “earlier is not always better,” do not relabel it W5.

Do **not** make W5: harder timers; smaller windows; more cycles; all-mechanics finale.

##### Expression alignments (not mandatory rooms)

| Topic | Record |
| --- | --- |
| Timed Gate | **USEFUL expression candidate.** Not required. Risk: reaction / race challenge. Existing lifecycle (`CANDIDATE`) preserved. |
| Delayed Switch | **STRONG CANDIDATE EXPRESSION** for the delayed **causal relation**. Does **not** approve a production Delayed Switch object. Existing lifecycle (`CANDIDATE`) preserved. |
| Counter | **USEFUL / CONDITIONAL.** Only W4 when event progression is used to predict future World State. Do not rewrite resource meanings to force W4 ownership. Existing lifecycle (`CANDIDATE`) preserved. |
| DSC-012 | Useful W4 application. Not a mandatory dedicated lesson. Intentional wait ≠ passive wait. |
| DSC-013 | Strong foundational expression candidate. Aligns with caused future / delayed result. |

##### Minimal expression hypothesis

Current leading candidate: **ONE DELAYED PERSISTENT STATE** on the existing W3 probe + separate activator.

Meaning: player causes state change → result is pending → after readable delay / progression → known World State changes → state remains until another explicit rule changes it.

Why preferred: introduces onset without also requiring expiry.

This is **not** sufficient if gameplay is only: activate → wait → continue.

A valid W4 expression must create a meaningful difference in: when the cause is created; **or** what the player prepares during the delay; **or** what state should still exist before the result.

Expression Audit v1 (below) recommends the smallest *viable* set as **W3 state + delayed onset + explicit progress cue**. Duration / Timed Gate / Counter / cycle are **not** required for minimum W4.

##### W4 Knowledge Expression Audit v1

**Status:** `CANDIDATE` — Creative Director review. Not implementation. Not room geometry. Not Human Validation. No temporal mechanic approved.

**Core question:** Can W4 emerge by adding **only one temporal relation** to the existing W3 SOLID/PASSABLE + separate-activator relation?

**Verdict:** **YES**, if and only if delayed onset is more than waiting time.

W3 physical foundation (not Human Validated): EXP-000 / 001 / 002 **PASS**. EXP-003A harness **READY**. **W3 Human Validation: PENDING.**

###### Minimum temporal requirement

| Candidate | Future fact | Present choice | New vs W3 | Reaction required? | New mechanic family? | Verdict |
| --- | --- | --- | --- | --- | --- | --- |
| A. Delayed onset | Known World State will change after this cause finishes progressing | When to activate; what to do while current state still holds | Same trade-off, **not immediate** | No, if delay is a planning band | No. Delay the existing activator→probe write | **MINIMUM** |
| B. Limited duration | New state will expire | Rush / repeat | Adds a second temporal fact (expiry) | High risk | Timed Gate identity | Not minimum |
| C. Event-based onset | Change after a known next event | Prepare before that event | Onset by event instead of elapsed progress | No | Event definition / Counter risk | Plan B |
| D. Periodic state | Phase will return | Wait for opening | World-driven; weak agency | Cue-reaction risk | Cycle | Later only |
| E. Smaller | — | — | “It happens later” is already A | — | — | No smaller relation |

Reject any temporal effect that only inserts idle wait between W3 cause and W3 result.

###### Delayed persistent-state audit

Candidate: SOLID → cause → PENDING → later PASSABLE → PASSABLE persists (or the reverse).

| Q | Answer |
| --- | --- |
| 1. Does PENDING create a real planning interval? | **Only if** the current state still has a use, or the future state must be met by a prepared Player State. Otherwise it is a loading bar. |
| 2. Meaningful action before result? | **Yes, required.** Use remaining SOLID support (X), or move to the Y approach. |
| 3. Can cause timing matter? | **Yes, if** starting the delay leaves too little remaining SOLID to still do X. Spatial / phase separation, not a race. |
| 4. Can preparation during delay matter? | **Yes** for getting to Y. **Not** if Y remains freely available forever *and* the player can prepare after arrival with no loss. For minimum W4, pair prepare-during-delay with a reason early cause is worse (lost X). |
| 5. Does activate-and-wait solve it? | **Yes → K01/K02 only.** That is W3 + waiting. **Not** sufficient for K03/K04. |

**Critical leak:** persistent PASSABLE after an instant-feeling delay makes “activate first” equal or *better* than W3 (X still exists during pending). Delayed persistent state **fails K03** unless remaining SOLID after the cause is not always enough to do unused X.

The delay is remaining duration of the **old** state after a known cause. That is **not** Timed Gate (expiry of the new state).

###### Per-knowledge expressions

**K01 — smallest.** NOW: SOLID (support, no traversal). KNOWN FUTURE: PASSABLE pending. Player sees current possibility ≠ later action possibility. Credibility: same W3 filled/hollow language plus a truthful pending/progress cue on the **same probe**. Distinguish pending from failed activation: contact ack + ongoing progress. Do not invent a third fill style that looks like a new physics state.

**K02 — prediction contract.** Activator contact → visible pending on the affected probe → known SOLID→PASSABLE after readable progression. No exact seconds.

| Progress class | Sufficient? |
| --- | --- |
| Continuous visual progress on the target | **Sufficient** (preferred first) |
| Discrete stages (2–3 truthful steps) | **Sufficient** |
| Known event marker | Sufficient as Plan B; Counter-risk |
| Audio / animation only | Supportive, not sufficient alone |
| Hidden elapsed time | **Rejected** |

**K03 — earlier is not always better.** Persistent result **can** do this. Expiry is **not** necessary.

Structure: SOLID support (X) is useful **now**. Scheduling PASSABLE will end X. Activating too early (from the separated activator, before X is used) spends the remaining SOLID on travel instead of support. Right plan: use X → activate → prepare Y during pending → PASSABLE → traverse.

**K04 — cleaner than W3 order.**

| | Sequence |
| --- | --- |
| W3-K04 | X → instant change → Y |
| Weaker W4 | cause → prepare during pending → Y (activate-and-wait at Y often still works) |
| **Cleaner W4** | **use X → cause delayed change → prepare Y during pending → future PASSABLE → Y** |

The W4 increment is not the X-before-change logic (that is W3). It is: after the cause, Y is **not yet** available, so present travel/prep happens under a known future; and causing too early removes X. Future need changes **when** to trigger and **what** to do while pending.

**K05 — no second temporal mechanic.** Same delayed-state relation in a new layout. Player diagnoses: wrong state (changed when they still needed SOLID, or never changed); wrong timing (cause too early / too late relative to X); wrong preparation (activated correctly but waited at the post instead of moving to Y). Timed Gate / Counter / Cycle not required unless a later gap is proven.

###### Pending model

**Pending is not a third World State and has no new physics law.**

```text
CURRENT WORLD STATE:  SOLID  (support still real)
TEMPORAL CONDITION:   PASSABLE is scheduled
FUTURE WORLD STATE:   PASSABLE
```

Keep **World State + Temporal Relation**. Reject SOLID / PENDING / PASSABLE as three equivalent collision states. Ontology inflation would force a new possibility table for “pending.”

###### Cause timing vs preparation timing

| | Question | K03 | K04 | Minimum W4 |
| --- | --- | --- | --- | --- |
| A. Cause timing | When should I activate the future change? | **Stronger** | Needed | Needed so earlier can be worse |
| B. Preparation timing | What should I do while it is pending? | Weaker alone if Y waits forever | **Stronger** with A | Needed so pending is not idle |

Both arise from **one** delayed persistent relation. They do **not** need dedicated devices or a two-lesson gimmick path.

###### Delay-length semantics (no production numbers)

| Band | Effect |
| --- | --- |
| Too short | Player only reacts. Hidden countdown. |
| Too long | Activate and wait. Cause/effect disconnects. X still always completable after activate. |
| **Useful** | Long enough to finish **one** already-understood preparation (leave activator → reach Y approach, or finish X if already on it). Short enough that a **farther unused** action (travel from activator to unused X, use it, then reach Y) is the wrong plan, not a tight race. |

**Readable useful delay:** the player can tell “I have time for this next known action, not for that farther unused one,” from progress + space, without milliseconds.

###### Delay readability

| Fact | Source |
| --- | --- |
| Current SOLID / PASSABLE | Inherit W3 |
| Activator contact succeeded | Inherit W3 contact flash / click |
| Affected target | Inherit W3 probe |
| Direction of future change | Temporal addition (pending toward hollow / filled) |
| Result is pending | **Temporal addition** |
| Progression toward result | **Temporal addition** |
| Result persists | Temporal addition (no expiry cue) |
| Reactivation while pending | Temporal addition (experiment: ignored) |

###### Hidden-countdown safeguards

Forbidden first expression: touch → nothing visible → sudden change.

Minimum truthful signals: activation ack; pending on the **target**; monotonic progress; W3 state language at completion. Numeric countdown is **not** required unless those cues still leave pending vs failed ambiguous.

###### Experiment contracts (not production rules)

**Reactivation while pending:** **IGNORE.** Lowest complexity. Survives Auto Bounce / contact spam. Restart invites stall-spam. Cancel / reverse / queue are second rules.

**Recovery after settle:** **same activator, immediate restore** (existing W3 TOGGLE once no longer pending) plus a diagnostic reset. Same delayed reverse is the same temporal relation in the other direction but slows the hypothesis loop. Do not add a second delay law. Immediate-only restore is experiment isolation, not a production commitment.

###### Alternatives

**Event-progression (Plan B):** “next bounce / one known event.” Strength: discrete, no invisible clock. Risk: Auto Bounce turns wait-in-place into a counter; quota reading; event-definition load. Prefer continuous/stage progress on the probe first.

**Scheduled / cycle:** can show K01/K02 (the world will change). Weak K03/K04 (player did not cause the future). **Later expression only.** Do not elevate because it is easy to implement.

###### Duration necessity

**K01–K04 can be expressed with delayed persistent state only**, using remaining SOLID after cause + coarse spatial phases.

Timed Gate / PASSABLE expiry is **not** needed for minimum W4. “More challenge” is not a reason to add it.

###### W3 trade-off reuse

Reuse SOLID = SUPPORT (X), PASSABLE = TRAVERSAL (Y).

| | Meaning |
| --- | --- |
| W3 + waiting | Activate, stand, then traverse. Order is still X-optional; delay adds no choice. |
| Genuine W4 | While pending, SOLID remains usable; **when** the cause starts determines whether X can still be used; during pending the player prepares Y. |

Present choice that must change: **not yet** vs **now** for the activator, because the future loss of support is already scheduled.

###### First Aha / earlier-is-not-always-better

Smallest Aha experience: cause → readable pending → player starts a useful preparation → result arrives. Failure first is **not** required. Anticipation is stronger evidence.

Physical reason earlier can be worse (known relations only): X needs SOLID; cause schedules SOLID’s end; activator is separated from X; early cause spends remaining SOLID on return travel. Conceptual middle: **planning phases**, not an execution race. If the delay always fits unused X after activate, timing does not matter. If it never fits a correct post-X walk to Y, it is reaction pressure.

###### Generous-window design

WRONG PLAN fails the option (X never used; Y approached while still SOLID). RIGHT PLAN survives ordinary Auto Bounce / travel variance.

Methods: coarse phases (X, activator, Y approach); qualitative delay bands; large spatial margins. Do **not** tune microseconds.

###### Information burden (first exposure)

**Budget: one new temporal fact** — this already-known change is **pending / progressing**.

Reuse W3 probe + Model B activator. Do **not** first-ship: new activator, new state object, countdown digits, expiry, event counter, new movement.

Pending should live on the existing probe (progress in the known form), not a new icon language.

###### Failure loop

Good: choose trigger timing → watch pending → see future state → compare → restore / reset → retry.

Reject: mistime → instant reset; mistime → long idle; mistime → high-execution replay.

###### Historical slot survival (delayed-persistent hypothesis)

IDs / titles preserved. Not a production count.

| Slot | Title | Classes |
| --- | --- | --- |
| 001 | One, Two, Three | COUNTER-DEPENDENT. **CUT CANDIDATE.** Counting alone is not W4. |
| 002 | Count Your Steps | COUNTER-DEPENDENT. **CUT CANDIDATE** unless rewritten as future-state prediction (then REPURPOSE). |
| 003 | One More Bounce | COUNTER-DEPENDENT. **CUT CANDIDATE.** |
| 004 | Don't Move | DELAY-DEPENDENT / REPURPOSE as **withhold activation** (intentional wait). Not a cycle lesson. Optional depth. |
| 005 | Open for a While | DURATION-DEPENDENT. **CUT CANDIDATE** for minimum W4. |
| 006 | Which Bounce? | DUPLICATE / REPURPOSE without BOOST. Not required. |
| 007 | Wait for the Window | CYCLE-DEPENDENT / DURATION-DEPENDENT. **CUT CANDIDATE** if cue-reaction. RISKY. |
| 008 | Not Yet | DELAY-DEPENDENT. **REUSABLE.** Foundational K01/K02 / DSC-013. |
| 009 | Leave Before It Happens | DELAY-DEPENDENT. **REUSABLE** preparation-during-pending. |
| 010 | Set the Future | COUNTER-DEPENDENT or W3 logical prereq. **CUT** if only “do these first.” REPURPOSE only if delayed progression is predicted. |
| 011 | Meet Me There | **REUSABLE** as K05 (same relation, new context). Carried motion optional only. |
| 012 | The Right Time | DUPLICATE if it stacks Counter+Delay+Duration+Waiting. **REPURPOSE** as K05 diagnosis, one relation only. |

###### Discovery minimums

**DSC-013:** existing activator contact → readable pending → existing World State changes later. **Sufficient** for the Discovery. No Delayed Switch object.

**DSC-012:** same relation supports **withholding** the cause while X is still needed. No separate cycle or timer. Optional W4 depth, not a graduation checklist.

###### Expression dependency matrix

Device names are not sufficient. Rows evaluate the **relation**.

| | Delayed Persistent State | Limited Duration | Event Progression | Cycle | Timed Gate | Counter | Other / None |
| --- | --- | --- | --- | --- | --- | --- | --- |
| W4-K01 | **SUFFICIENT** (with pending cue) | SUPPORTIVE | SUPPORTIVE | SUPPORTIVE | REDUNDANT | RISKY | — |
| W4-K02 | **SUFFICIENT** (with progress cue) | SUPPORTIVE | SUPPORTIVE | SUPPORTIVE | REDUNDANT | RISKY | Hidden time: **NOT NEEDED** / rejected |
| W4-K03 | **SUFFICIENT** if remaining old-state use can be lost | SUPPORTIVE (expiry path) | SUPPORTIVE | **RISKY** (wait-for-opening) | **RISKY** | RISKY | Activate-and-wait: **NOT NEEDED** |
| W4-K04 | **SUFFICIENT** as X → cause → prep Y → Y | SUPPORTIVE | SUPPORTIVE | RISKY | RISKY | RISKY | Instant W3 order: **NOT NEEDED** |
| W4-K05 | **SUFFICIENT** in a new context | NOT NEEDED | NOT NEEDED | NOT NEEDED | NOT NEEDED | NOT NEEDED | Second mechanic: **NOT NEEDED** |

###### Recommended minimal set

| Option | Verdict |
| --- | --- |
| A. W3 state + delayed onset, no progress cue | **NO-GO** (hidden countdown) |
| **B. W3 state + delayed onset + explicit progress cue** | **YES — smallest viable** |
| C. B + expiry | Not needed for K01–K04 |
| D. Counter / event progression | Plan B, not first |
| E. Cycle | Later / risky |
| F. Multiple temporal devices | Bloat |

###### Future prototype hypothesis order

No implementation prompts. No geometry.

| ID | Hypothesis | Why this order |
| --- | --- | --- |
| W4-EXP-000 | Can one caused readable delay produce a deterministic future World State? | Physical existence of the relation |
| W4-EXP-001 | Can the player use the pending interval to prepare before the result? | K01/K02 / first Aha. If this is only wait-then-walk, it is not yet W4 |
| W4-EXP-002 | Can activation timing change success without reaction pressure? | **Critical.** K03/K04. If activate-and-wait still clears, FAIL this hypothesis |
| W4-EXP-003 | Can the player distinguish wrong state vs wrong timing vs wrong preparation? | K05; same relation |
| W4-EXP-004 | Readability harness | After the physical relation is isolated |

Do not start EXP-002 until 000 shows a truthful pending→change. Do not treat 001 PASS as W4 complete.

###### Temporal-mechanic GO / NO-GO

**GO (relation, not object):** one caused, readable, delayed persistent write to the existing W3 probe.

**NO-GO now:** Timed Gate, Counter, cycle, Delayed Switch object, hidden countdown, shorter-timer-as-depth, input-spam solutions.

GO tests: predicts future change; pending readable; present choice changes; generous margin; planning not reaction; more than one useful application (X-before-cause, prep-during-pending, withhold).

###### Validation dependencies

| Class | Items |
| --- | --- |
| CAN DECIDE NOW | Pending ≠ third physics state; delay relation ≠ Delayed Switch object; duration not required for minimum W4; cycle later; experiment reactivation = ignore; experiment restore = immediate after settle + reset |
| NEEDS PHYSICAL TEMPORAL PROTOTYPE | Whether a qualitative delay band + activator/probe separation actually makes early cause lose X; whether pending reads; whether activate-and-wait fails EXP-002 |
| NEEDS HUMAN READABILITY | Pending vs failed; progress without numbers; K01–K04 understanding |
| NEEDS W3 HUMAN RESULT | Production rooms that assume humans already read SOLID/PASSABLE trade-off. Does **not** block W4 physical prototypes |
| NEEDS W2 HUMAN RESULT | **None** for minimum W4. Carried motion stays optional |

Unrelated company work (W3 Human Validation queue, W2 readability, movement validation) is **not** blocked.

###### Unassigned / Creative Director

**Unassigned:** exact progress representation (continuous vs 2–3 stages); production reactivation after EXP; whether settled reverse stays immediate; any numbers; any room.

**CD decisions requested:**

1. Accept delayed persistent + progress cue as the only first W4 relation?
2. Accept “remaining SOLID after cause” as K03, not Timed Gate?
3. Accept IGNORE-while-pending for first experiment?
4. Keep Counter / cycle / duration off the minimum path?
5. Allow W4-EXP-000…002 to proceed without waiting for W3 Human Validation?

##### Bloat warnings

Depth Over Quantity applies.

- Counter tutorial sequence
- Timed Gate tutorial sequence
- Delay tutorial sequence
- Cycle tutorial sequence
- All temporal devices combined
- Shorter timer = progression
- More exact timing = mastery
- Reaction cues replacing prediction
- Hidden countdown
- Multiple pending events before one is understood
- W2 / W3 / W4 novelty introduced simultaneously

##### Historical slot → current role

IDs and titles preserved. **Not** a production count, mandatory sequence, or graduation checklist.

| Slot | Title | Current alignment |
| --- | --- | --- |
| 001 | One, Two, Three | COUNTER-DEPENDENT. **CUT CANDIDATE.** Counting alone is not W4. |
| 002 | Count Your Steps | COUNTER-DEPENDENT. **CUT CANDIDATE** unless REPURPOSE as future-state prediction. |
| 003 | One More Bounce | COUNTER-DEPENDENT. **CUT CANDIDATE.** |
| 004 | Don't Move | DELAY-DEPENDENT. REPURPOSE as withhold-activation. Optional DSC-012 depth. |
| 005 | Open for a While | DURATION-DEPENDENT. **CUT CANDIDATE** for minimum W4. |
| 006 | Which Bounce? | DUPLICATE / REPURPOSE without BOOST. Not required. |
| 007 | Wait for the Window | CYCLE / DURATION-DEPENDENT. **CUT CANDIDATE** if cue-reaction. |
| 008 | Not Yet | DELAY-DEPENDENT. **REUSABLE.** Foundational K01/K02 / DSC-013. |
| 009 | Leave Before It Happens | DELAY-DEPENDENT. **REUSABLE** preparation-during-pending. |
| 010 | Set the Future | COUNTER-DEPENDENT or W3 prereq. **CUT** if only logical order. |
| 011 | Meet Me There | **REUSABLE** K05 (same relation, new context). Carried motion optional only. |
| 012 | The Right Time | DUPLICATE if device-stack. **REPURPOSE** as K05, one relation only. |

Historical slots remain lineage, not production count or teaching order.

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

IDs retained. Current W4 graduation is the W4-K evidence language above, not “used Counter / Gate / Delay.” W4-GATE-1 is TIME only if the count changes a predicted future state.

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
| Core Question | Under what conditions is the solution I treated as correct actually valid, and what becomes possible when I recombine known relationships differently? / 내가 정답처럼 쓰던 해법은 어떤 조건에서 유효하며, 이미 아는 관계를 다르게 연결하면 무엇이 가능한가? (historical label: What do I really know?) |
| Evolves from | “What is the rule?” → “Which known relationship should organize the plan under current conditions?” |
| Identity | **Synthesis / autonomy stage.** Not a fifth mechanic domain. Not Remix / Hard Mode. Not a harder W4. Not an all-mechanics finale. |
| New Rule target | **0** |
| New Gimmick target | **0** — new W5 gimmick **NOT REQUIRED** (default **NO-GO**) |
| Hidden mechanic | **0** |
| Exists to | Judge which known relationship is relevant under current conditions; retain still-valid knowledge; reorganize the plan when a familiar solution’s assumptions no longer hold. Reinterpretation is **not** unique to W5. |
| Graduation | See W5-K graduation. Insufficient: hard execution of an old solution; using many gimmicks; a longer sequence; all-mechanics finale. |
| Major Discoveries | Do **not** force mixed IDs here. DSC-015 is the strongest W5 candidate **only** when known relations form a genuinely new dependency. DSC-007 / DSC-016 remain mixed / unassigned. W5 assignment is not required. |
| Mastery Test | Historical: LVL-W05-012. Current: W5-K04 / autonomous plan + revision evidence. Room count is **not** protected. Do **not** require 4–5 concepts. |
| Transition to Next World | None recorded. |
| Visual / Audio Identity | **Not locked.** |

W5 may be intentionally compact. Scope is evidence-driven. If a distinct relation-selection ability remains untested, a new dependency adds real synthesis evidence, autonomy transfers, or mastery improves without repetition, expand. Otherwise **reduce W5 scope**. Do not steal reinterpretation from earlier Worlds. Do not put every gimmick in the finale. Prefer a few deeply interacting known relationships. Exact mix TBD after prototype / playtest. Do **not** preserve World length for symmetry.

#### W5 UNDERSTANDING Knowledge Architecture v1

**Status:** `CANDIDATE` — conceptual. Unvalidated. Not runtime objects. Not `VALIDATED` / `CORE`. No W5 room is `VALIDATED`. No W5 gimmick is approved.

This is the **authoritative current W5 planning model**. Role-based. Not slot-count-based. Not Remix / Hard Mode. Not a fifth mechanic tutorial. Not an all-mechanics finale.

**Core question:** Under what conditions is the solution I treated as correct actually valid, and what becomes possible when I recombine known relationships differently? / 내가 정답처럼 쓰던 해법은 어떤 조건에서 유효하며, 이미 아는 관계를 다르게 연결하면 무엇이 가능한가?

**Approved summary:** “현재 조건에서 어떤 알려진 관계가 유효한지 판단하고, 익숙한 해법의 전제가 맞지 않을 때에도 유효한 지식은 유지하면서 계획을 다시 구성하는 능력.”

W5 is **not** primarily: verbal explanation; designer terminology; memorized solution replay; every mechanic; high execution difficulty; a new gimmick; a harder earlier World.

W5 **is** UNDERSTANDING: the player chooses which known relationship should organize the plan.

##### Traceability

| Item | Status |
| --- | --- |
| W2-PHYS-001 / 002 | physical **PASS** |
| W2-PHYS-003 Human Readability | **PENDING** |
| W2 Human Validation | **PENDING** |
| W3 EXP-000 / 001 / 002 | physical **PASS** |
| W3 EXP-003A | Human harness **READY** |
| W3 Human Validation | **PENDING** |
| W4 EXP-000–004A | physical **PASS** where documented on the experiment lineage |
| W4 Human Validation | **PENDING** |
| W5 room | none `VALIDATED` |
| W5 gimmick | none approved |

W5 architecture may be documented. Conceptual design of condition-change / relation-selection / recombination hypotheses may proceed. Production dependencies on W2 / W3 / W4 **human** understanding remain unapproved. Do **not** document Human understanding as validated. Do **not** promote any movement technique because of W5.

##### UNDERSTANDING definition

Canonical vocabulary also lives in [DESIGN_SYSTEM.md](../DESIGN_SYSTEM.md). Restated here because W5 owns the planning use.

**UNDERSTANDING** means:

> 현재 조건에서 어떤 알려진 관계가 유효한지 판단하고, 익숙한 해법의 전제가 맞지 않을 때에도 유효한 지식은 유지하면서 계획을 다시 구성하는 능력.

English: the ability to judge which known relationship is relevant under current conditions, retain the knowledge that remains valid, and reorganize the plan when a familiar solution’s assumptions no longer hold.

UNDERSTANDING does **not** require: verbal explanation; designer terminology; memorized solution replay; every mechanic; high execution difficulty.

Behavioral evidence includes: changing a choice because conditions differ; testing the relevant condition; selecting a known relation without tutorial framing; recombining known relations; revising the relevant part of a plan from evidence.

##### New cognitive demand

W5 does **not** own reinterpretation itself.

| World | Already-owned revaluation |
| --- | --- |
| W2 | More motion is not always better. |
| W3 | State change / opening is not always progress. |
| W4 | Earlier activation is not always better. |

W5’s new central demand is:

> THE PLAYER CHOOSES WHICH KNOWN RELATIONSHIP SHOULD ORGANIZE THE PLAN.

Supporting processes: assumption audit; relation selection; relation recombination; solution autonomy.

If gameplay is behaviorally identical to an earlier World judgment, do **not** relabel it W5.

##### Compact role arc

```text
CHECK THE CONDITION
    → CHOOSE THE RELATION
        → CONNECT THE RELATIONS
            → OWN THE PLAN
```

| Role | Knowledge | Planning note |
| --- | --- | --- |
| CHECK THE CONDITION | K01 | Familiar solutions are conditional. The player audits whether the known condition still holds. |
| CHOOSE THE RELATION | K02 | Current readable conditions determine which known relation matters. |
| CONNECT THE RELATIONS | K03 | One known relation’s result can create or alter another’s condition. Stacking ≠ recombination. |
| OWN THE PLAN | K04 | Player builds a plan from known relationships and revises the relevant assumption from evidence. |

Roles may merge in actual content. This is **not** a fixed room sequence.

**IDs:** `W5-K01` … `W5-K04`. Permanent conceptual knowledge IDs. Do not recycle. Do not implement as game objects.

**World statement:** “현재 조건에서 어떤 알려진 관계가 유효한지 판단하고, 유효한 지식은 유지하면서 계획을 다시 구성한다.”

##### Knowledge nodes

| ID | Layer | Understanding | Prerequisite | Evidence | Misconception |
| --- | --- | --- | --- | --- | --- |
| W5-K01 | FOUNDATION | 이 해법은 그 조건이 있었기 때문에 유효했다. This solution was valid because a particular condition was true. | A known relation + readable conditions | Familiar solution is withheld or revised when its known condition differs. Player tests the relevant condition rather than blindly repeating the old solution. | It worked before, so it must be correct here too. |
| W5-K02 | DEVELOPMENT | 지금 중요한 관계를 내가 골라야 한다. I need to decide which known relationship matters here. | W5-K01 + multiple known candidate relationships | Player changes variables related to the actual problem and reduces irrelevant repetition. | The most visually prominent object is the answer. The most recently learned mechanic is the answer. Every available mechanic should be used. |
| W5-K03 | TRANSFER | 한 관계의 결과를 다른 관계의 조건으로 연결할 수 있다. I can use the result of one known relationship to create or alter the condition for another known relationship. | W5-K02 + independent understanding of the relations involved | Player selects an earlier action because of how it changes a later known relation. | Using each known tool one after another is enough. Mere gimmick stacking is **not** recombination. |
| W5-K04 | MASTERY | 알려진 관계로 계획을 만들고, 실제 결과에서 다시 판단할 수 있다. I can build a plan from known relationships and revise it from what actually happens. | W5-K01–K03 | In a composition not recently rehearsed, player selects relevant relations, forms a plan, and changes the relevant assumption / relation when evidence contradicts it. | The correct solution is a memorized sequence. |

##### Knowledge flow

```text
W5-K01  SOLUTION SCOPE
        ↓
W5-K02  RELATION SELECTION
        ↓
W5-K03  RELATION RECOMBINATION
        ↓
W5-K04  AUTONOMOUS PLAN + REVISION
```

This is a knowledge dependency. It is **not**: four mandatory room groups; four mechanic categories; a fixed final-exam sequence.

##### First true W5 Aha

Leading candidate: “전에 쓴 방법이 틀린 게 아니네. 그 방법이 통했던 조건이 여기서는 다르네.”

Then the W5-specific extension: “그러면 지금 중요한 조건에 맞는 내가 이미 아는 다른 관계를 써 볼 수 있겠다.”

English: “The method I used before wasn’t wrong. The condition that made it work is different here.” Then: “So I can try another relationship I already know that matches the condition that matters now.”

The first part alone may overlap with earlier World reinterpretation.

W5 evidence begins when the player: identifies the changed condition **and** selects another known relationship / plan accordingly.

##### Conditional-solution model

Known relation R + condition C + action A → useful result.

In a new context: R remains true, but C may differ. Therefore the usefulness of A may differ.

| Term | Meaning |
| --- | --- |
| RULE | Still works the same. |
| CONDITION | Readable context differs. |
| SOLUTION | Was useful under those conditions. |

Never change rules secretly and call it W5 reinterpretation.

##### Reinterpretation boundary

Single-variable revaluation is **not** sufficient for W5.

| Earlier World | Already-owned judgment | W5 ask |
| --- | --- | --- |
| Harder W1 | Narrower landing / longer path | Player determines whether landing planning is even the relevant relation. |
| Harder W2 | More exact speed preservation / reduction | Player determines whether motion state is the relevant cause, or another known relation changes the need. |
| Harder W3 | More state changes / longer logical sequence | Player determines which known possibility relation should organize the plan. |
| Harder W4 | More delays / tighter timing / more schedules | Player determines whether temporal planning is the relevant relation at all, or how it combines with another known relation. |

If gameplay is behaviorally identical to an earlier World judgment, do **not** relabel it W5.

##### Assumption audit

Process: expected result → compare actual / readable conditions → identify assumption candidate → change the relevant choice.

Failure is **not** required. Valid strong evidence: player observes a changed condition and avoids the familiar solution before failing.

Keeping the old solution when its conditions still hold is **valid** understanding.

##### Relation selection

Player-facing reasoning examples (situation, not World labels):

- Is next position / direction the real issue?
- Is carried motion the issue?
- Is World State blocking the action?
- Is the right state occurring at the wrong time?

Do **not** make this a quiz about W1 / W2 / W3 / W4 labels. The player reasons from the situation.

| Evidence | Meaning |
| --- | --- |
| GOOD | Selection changes the relevant variable. |
| WEAK | Randomly trying every mechanic. |

##### Recombination

Meaningful recombination exists when RELATION A’s result changes RELATION B’s condition / usefulness.

Designer audit:

1. If A changes, does B’s plan change?
2. If B’s future need is known, does A’s earlier choice change?
3. If one relation is removed, does the reasoning dependency disappear, or only one action disappear?

Mere sequential use of two mechanics is **not** sufficient. Mere gimmick stacking is **not** recombination.

##### Novelty without new rules

Acceptable W5 novelty: familiar conditions arranged differently; a different known relation becomes relevant; a known result becomes preparation for another known relation; a changed goal changes relation selection; a previously secondary fact becomes central; multiple known possibilities are available.

Reject: secret exception; hidden state; unexplained collision behavior; new input behavior; post-hoc-only surprise.

Novelty must be inferable before success.

Fair surprise rule: “The overlooked possibility was always present under known rules and inferable from readable facts.”

Reject as trick puzzles: hidden collision exception; one-pixel exploit; misleading art; unknown state; undocumented engine behavior; deliberate death-only discovery; arbitrary lateral-thinking gotcha.

##### Autonomy

Autonomy means: “게임이 목표와 사실을 명확히 제공한 상태에서, 플레이어가 적용할 관계와 검증할 가설을 선택하는 것.”

English: with goal and facts clearly provided, the player chooses which relation to apply and which hypothesis to test.

Autonomy reduces: intended-solution highlighting; recent-tutorial steering.

Autonomy does **not** reduce: goal clarity; state readability; causal feedback; recovery quality; rule consistency.

Autonomy ≠ ambiguity.

##### Multiple valid plans

Status: **USEFUL**, **NOT REQUIRED**.

Meaningfully different plans may differ in: what is prepared first; which relation organizes the solution; what is preserved / sacrificed; which condition no longer needs to be created.

Execution variations alone do not count. Do not require discovery of every valid plan.

##### Failure as information

| Kind | Pattern |
| --- | --- |
| Informative | Familiar action works mechanically but lacks the condition needed for later success. |
| Informative | Local success removes a later possibility, revealing dependency. |
| Uninformative | Reset removes evidence before the player can compare. |
| Misleading | Knowledge error looks like precision failure. |
| Accidental success | Randomly changing several variables clears the content. |

Observe what the player changes **next**.

##### Misconception design rules

- The prior solution was genuinely valid before.
- The prior rule was never false.
- The changed condition is readable.
- Physics remains consistent.
- The revised hypothesis is cheap to test.
- If the old solution is still valid here, success must be accepted.

Do **not** build W5 as “do the opposite of what earlier Worlds taught.” That simply creates a new overgeneralization.

##### Composition depth

| Stage | Recommendation |
| --- | --- |
| EARLY | One familiar relationship whose applicability must be scoped correctly. |
| DEVELOPMENT | Two known relationships with meaningful selection / dependency. |
| LATE | Optionally three, only if the third changes the plan. |
| 4+ actively tracked relationships | Default **HOLD** / warning. |

More relationships ≠ deeper understanding.

##### All-mechanics finale warning

“All mechanics once” is **not** a valid W5 mastery requirement.

It primarily risks testing: memory; long-sequence execution; accumulated motor consistency; fatigue.

A minimal W5 may reach mastery with only a small number of known relations.

##### Movement dependency rule

Any movement technique required by W5 must already have: stable physical behavior; stable input contract; readable result; player understanding evidence.

Do **not** reserve Charge, Wall Jump, or Air Reversal for W5 merely because they appear advanced.

W5 architecture must survive without them.

##### Foundation

Minimal foundation hypothesis: familiar-looking problem → one known relevant condition differs → player notices the difference → familiar solution is re-evaluated → another known relation / choice becomes relevant.

Requirements: no hidden rule; difference observable before action; alternative relation already known; low execution burden; no new gimmick.

##### Development

Smallest development burden: two known relations are plausible, and the player must select which is relevant, or connect them through a real dependency.

Possible increases: farther transfer from recent tutorial; same relation under unfamiliar presentation; one relation’s result changes another’s value.

Do **not** increase primarily through: path length; device count; reset cost; precision.

##### Mastery

“이미 학습하고 읽을 수 있는 관계로 구성된, 실행 부담이 적절한 낯선 상황에서 관련 조건을 선택하고 계획을 구성·수정한다.”

English: in an unfamiliar situation composed of already-learned, readable relationships, with appropriate execution burden, the player selects the relevant conditions and constructs / revises a plan.

| Candidate | Evidence |
| --- | --- |
| E2 | Player targets relevant conditions and intentionally reuses known relationships. |
| E3 | Player selects / combines relationships in a composition not recently rehearsed. |
| Mastery | Player’s actions show a coherent plan, and evidence causes correction of the relevant assumption / relation. |

No forced failure required.

##### W5 vs solution length

Designer tests:

1. If repeated movement is removed, does the key inference remain?
2. What assumption changed?
3. Which relation selection changed?
4. Is the extra sequence length adding dependency, or just memory burden?
5. If the intended relationship is told directly, does most difficulty disappear?

If difficulty remains mostly motor execution, it is not W5 knowledge depth.

##### W5 graduation evidence

Use **relation selection / recombination / revision**, not “used every World / mechanic.”

| Class | Items |
| --- | --- |
| MUST UNDERSTAND | Familiar solutions are conditional, not universal commands; current readable conditions determine which known relation matters; known relationships can be connected into a plan not previously rehearsed in exactly that form; evidence can justify revising the relevant part of the plan; knowledge can transfer without recent tutorial framing |
| MAY EXPERIENCE | Multiple valid plans; rejecting an irrelevant mechanic; same object / relation in another strategic role; solving with fewer actions than expected; detecting a bad assumption before failure |
| MUST NOT REQUIRE | All Worlds simultaneously; all mechanics simultaneously; all alternate solutions; mandatory intentional failure; exact verbal explanation; precision execution; new input grammar; new gimmick; designer-preferred solution only |

Insufficient: hard execution of an old solution; using many gimmicks; a longer sequence; all-mechanics finale; single-variable revaluation already owned by W2 / W3 / W4.

##### Gimmick necessity

| Item | Verdict |
| --- | --- |
| NEW W5 GIMMICK | **NOT REQUIRED** |
| Default | **NO-GO** |

Before any new gimmick, check: is the prerequisite actually learned? Is the current fact readable? Is the relation dependency real? Does the goal give a reason to select the relation?

A new rule should not be used to manufacture W5 novelty.

##### Early W5 information budget

Prefer: clear goal; small set of known relationships; one relevant changed condition; known actions; short recovery.

Avoid simultaneously requiring: unvalidated W2; unvalidated W3; unvalidated W4; new movement tech; new gimmick; ambiguous objective.

##### Validation dependencies

| Can document now | Can design conceptually now | Needs later evidence |
| --- | --- | --- |
| W5-K01–K04; graduation; boundaries; historical audit; expression principles | Condition-change hypotheses; relation-selection hypotheses; recombination hypotheses | **W2 Human:** production reliance on carried-motion understanding. **W3 Human:** production reliance on possibility / gain-loss understanding. **W4 Human:** production reliance on temporal prediction / cause timing. **Movement validation:** mandatory movement techniques. **Synthesis prototype:** whether the player independently selects / combines relations rather than following cues. |

##### Scope

| Scope | Record |
| --- | --- |
| MINIMUM COMPLETE W5 | Condition audit; relation selection; meaningful recombination; independent transfer / revision |
| BALANCED W5 | Minimum + another context / useful plan comparison if it adds distinct evidence |
| OVERBUILT | Re-test every World; every gimmick; long finale; all discoveries; high precision; device checklist; many relationships without new dependency |

##### World size

W5 may be intentionally compact. Scope is evidence-driven.

Expand only if: a distinct relation-selection ability remains untested; a new dependency adds real synthesis evidence; autonomy transfers to a broader context; mastery experience improves without repetition.

Do **not** preserve World length for symmetry.

##### Status lock

| Item | Record |
| --- | --- |
| W5 Knowledge Architecture | `CANDIDATE` |
| W5 room | none `VALIDATED` |
| W5 gimmick | none approved |
| W2 / W3 / W4 Human understanding | **not** assumed validated |
| Movement technique | none promoted because of W5 |

##### Expression alignments (not mandatory rooms)

| Topic | Record |
| --- | --- |
| DSC-015 | Strongest W5 candidate **only** when known relations form a genuinely new dependency. Combination is not automatically W5 remix. Meaning unchanged. |
| DSC-002 / 008 / 012 / 013 | Possible TRANSFER material if already understood. Do not move ownership to fill W5. |
| DSC-001 / 003 / 004 / 005 / 009 / 014 / 017 / 018 | Primarily earlier-World understanding. Do not move into W5 to fill scope. |
| DSC-006 / 007 / 010 / 011 / 016 | Remain unassigned / optional. W5 assignment not required. |
| PAT-009 / 014 / 015 / 016 / 017 / 003 / 020 / 022 | Strong support candidates. Pattern presence does **not** make content W5. |
| PAT-006 / 007 / 008 / 018 / 019 / 021 | Conditional support. The W5 criterion remains assumption / relation selection / meaningful recombination / autonomy. |
| New Pattern ID | **Not required now.** |
| Historical slots 001–012 | Lineage, not protected scope. See [LEVEL_LIBRARY.md](LEVEL_LIBRARY.md). |

#### Knowledge Graph (historical candidate inventory)

This graph is lineage. Current W5 planning is `W5-K01`–`W5-K04` above. W5 must not hide new rules inside “reinterpretation,” repeat W3 object-role lessons, or repeat W4 timing lessons. Do not relabel earlier-World single-variable revaluation as W5.

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

Rooms `LVL-W05-001` … `LVL-W05-012` are a **historical candidate inventory**. The 12-slot count is **not** protected. Historical slots are lineage, not protected scope. Current W5 graduation is the W5-K evidence language above, not “used every World / mechanic.”

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
| W5 | no new gimmicks. New W5 gimmick: **NOT REQUIRED** (default **NO-GO**). |

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

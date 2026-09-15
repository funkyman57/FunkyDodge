# World Library

Worlds sequence levels. They ask one core question at a time.

These five worlds are **conceptual CANDIDATES**.

Do **not** lock visual themes yet.

New Rule / Gimmick budget should remain intentionally small.

Depth over quantity (C-05).

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

## World progression

Favor this curve inside a world and across worlds:

```text
TEACH
↓
APPLY
↓
TEST
↓
REINTERPRET
↓
COMBINE
↓
MASTERY
```

Do not open a world with mastery. Do not end a world with an untaught new gimmick (ANTI-020).

---

## Conceptual structure

| ID | Core Question | Status |
| --- | --- | --- |
| WLD-01 | HOW DO I MOVE? | CANDIDATE |
| WLD-02 | WHAT CHANGES MY MOTION? | CANDIDATE |
| WLD-03 | WHAT CAN OBJECTS BECOME? | CANDIDATE |
| WLD-04 | WHEN SHOULD I ACT? | CANDIDATE |
| WLD-05 | WHAT DO I REALLY KNOW? | CANDIDATE |

Names in the Name field stay as the question until a later design pass chooses a public title. Visual Identity is unset on purpose.

---

### WLD-01 — HOW DO I MOVE?

| Field | Value |
| --- | --- |
| World ID | `WLD-01` |
| Name | HOW DO I MOVE? |
| Status | CANDIDATE |
| Core Question | How do I move? |
| Design Theme | Bounce identity and directional language. Not a visual theme. |
| Rules Emphasized | R-WORLD-001 Gravity; R-PLAYER-001 Auto Bounce; R-PLAYER-002 Directional Control; EXPERIMENTAL: R-PLAYER-003 Low Bounce, R-PLAYER-004 Landing Boost, R-PLAYER-005 Wall Jump; R-MOTION-001…003; R-CONTACT-001 |
| Existing Rules Recontextualized | none (first world) |
| New Rule Budget | Movement school only. **Zero candidate gimmicks.** Do not implement GIM-001–012 here. |
| Major Discoveries | D0 movement facts; DSC-005; DSC-006; DSC-010; possible DSC-017 seed. |
| Difficulty Curve | Teach bounce → steer → air position → LOW → BOOST → choice → wall → combine → reinterpret |
| Visual Identity | **Not locked.** |
| Audio Identity | **Not locked.** |
| Mastery Test | LVL-W01-012 (structural candidate) — first meaningful reinterpretation, no new gimmick |
| Transition to Next World | Player can move with intent. Next question is what *outside* the player changes motion. |

Structural rooms: LVL-W01-001 … LVL-W01-012. Not implemented.

PLAY-001B is still validating movement feel. Do not mark Low Bounce, Landing Boost, or Wall Jump `CORE` because they appear in this world’s candidate list.

---

### WLD-02 — WHAT CHANGES MY MOTION?

| Field | Value |
| --- | --- |
| World ID | `WLD-02` |
| Name | WHAT CHANGES MY MOTION? |
| Status | CANDIDATE |
| Core Question | What changes my motion? |
| Design Theme | External and surface configurations of existing motion/contact/force rules. Not a visual theme. |
| Rules Emphasized | R-CONTACT-003 Friction; R-FORCE-001 Directional Force; R-MOTION-001 Momentum; R-INFO-001 |
| Existing Rules Recontextualized | Auto Bounce, Momentum, Velocity Limit — same identities, new configurations |
| New Rule Budget | Prefer configurations (Ice / Rough / Wind as *candidates*) over new rule families. Budget intentionally small. Not a commitment to implement GIM-003–005. |
| Major Discoveries | DSC-002; DSC-003; DSC-004; DSC-009; DSC-017. |
| Difficulty Curve | Teach one motion-changer → apply → test → reinterpret (help vs hinder) → combine with World 1 movement → mastery |
| Visual Identity | **Not locked.** Do not assume “ice world” art. |
| Audio Identity | **Not locked.** |
| Mastery Test | TBD — must use taught motion-changers as tools, not as new props |
| Transition to Next World | Player treats surfaces and forces as choices. Next question is what *objects* can become. |

PLAY-002 has not started. Do not build this world.

---

### WLD-03 — WHAT CAN OBJECTS BECOME?

| Field | Value |
| --- | --- |
| World ID | `WLD-03` |
| Name | WHAT CAN OBJECTS BECOME? |
| Status | CANDIDATE |
| Core Question | What can objects become? |
| Design Theme | Second faces (C-07). Objects are not single-use keys. Not a visual theme. |
| Rules Emphasized | R-STATE-001; R-SIGNAL-001; R-CONTACT-001 variations; R-INFO-001 |
| Existing Rules Recontextualized | Movement rules from WLD-01–02 remain. Objects recontextualize them. |
| New Rule Budget | Small. Candidate gimmicks such as Door, Switch, One-way Surface, Moving Block are **not** a build list. C-05 still applies. |
| Major Discoveries | DSC-001; DSC-014; DSC-018. PAT-014 / PAT-016 style realizations. |
| Difficulty Curve | Teach first face → apply → surprise with second face → combine → mastery |
| Visual Identity | **Not locked.** |
| Audio Identity | **Not locked.** |
| Mastery Test | TBD — reinterpret an introduced object (not a new gimmick) |
| Transition to Next World | Objects have more than one job. Next question is *when*. |

Do not implement. Second faces in GIMMICK_LIBRARY are TBD and must be designed before any of these objects become important.

---

### WLD-04 — WHEN SHOULD I ACT?

| Field | Value |
| --- | --- |
| World ID | `WLD-04` |
| Name | WHEN SHOULD I ACT? |
| Status | CANDIDATE |
| Core Question | When should I act? |
| Design Theme | Time, delay, count, and windows as readable decisions. Not a visual theme. |
| Rules Emphasized | R-STATE-002 Timed State; R-STATE-003 Counter; R-SIGNAL-002 Delay; R-INFO-001 |
| Existing Rules Recontextualized | Auto Bounce as a clock or a countable resource (DSC-011) |
| New Rule Budget | Small. Timed Gate, Bounce Counter, Delayed Switch are candidates, not commitments. |
| Major Discoveries | DSC-011; DSC-012; DSC-013. PAT-010, PAT-011, PAT-012, PAT-020. |
| Difficulty Curve | Teach a readable clock → apply → test *when* → reinterpret the clock as a tool → combine → mastery |
| Visual Identity | **Not locked.** |
| Audio Identity | **Not locked.** |
| Mastery Test | TBD — timing as thought, not a reaction test (ANTI-004, ANTI-012) |
| Transition to Next World | Time is a choice. Next question challenges what the player thinks they know. |

Windows must stay generous. Do not freeze durations here.

---

### WLD-05 — WHAT DO I REALLY KNOW?

| Field | Value |
| --- | --- |
| World ID | `WLD-05` |
| Name | WHAT DO I REALLY KNOW? |
| Status | CANDIDATE |
| Core Question | What do I really know? |
| Design Theme | Reinterpretation and combination of the whole language. Not a new-gimmick world. Not a visual theme. |
| Rules Emphasized | Already-taught rules. Prefer PAT-009, PAT-015, PAT-016, PAT-017. |
| Existing Rules Recontextualized | Everything prior. This is the recontextualization world. |
| New Rule Budget | **Near zero.** New gimmicks are last resort (C-05, ANTI-010, ANTI-020). |
| Major Discoveries | DSC-015; DSC-016; DSC-017. D3 remains rare. Signature candidates may climax here if not spent earlier. |
| Difficulty Curve | Revisit → reverse order → reinterpret space/object → combine → mastery. Teach beats only if a leftover gap remains. |
| Visual Identity | **Not locked.** |
| Audio Identity | **Not locked.** |
| Mastery Test | TBD — must be fair (C-06), achievable once understood (C-02), and free of rule betrayal (ANTI-002) |
| Transition to Next World | None recorded. Do not invent WLD-06 in this bootstrap. |

D3 revelations stay rare.

---

## Shared constraints

- Do not lock art, palette, or music in v0.1.
- Do not implement candidate gimmicks or levels from these worlds.
- Do not grow the New Rule Budget to fill a world-length target. Short worlds with depth are preferred.
- Anti-Patterns apply to world-scale pacing (especially ANTI-010, ANTI-011, ANTI-017, ANTI-018, ANTI-020).

---

## Normalization needed later

- Public-facing world titles (if different from the questions).
- Actual New Rule Budget numbers after playtest — keep them small.
- World discovery lists above are conceptual homes, not a lock that those IDs cannot appear earlier or later.

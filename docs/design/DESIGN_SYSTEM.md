# FunkyDodge Design System v0.1

Architecture and operating rules for the design Source of Truth.

---

## Central philosophy

> We are not designing a game about collecting gimmicks.  
> We are designing a game about discovering rules.

---

## Architecture

```text
Constitution
      ↓ constrains

Rules
      ↓ combine into

Interactions
      ↓ embodied by

Gimmicks
      ↓ arranged through

Puzzle Patterns
      ↓ target

Discoveries
      ↓ instantiated as

Levels
      ↓ sequenced into

Worlds
```

**Anti-Patterns validate every layer.**

A proposal that cannot name the layer it belongs to is not ready to enter a library.

---

## Rule identity vs parameters

> Rule identity should remain stable while parameters may be tuned.

Example:

- Auto Bounce = Rule
- `bounceVelocity` = tunable parameter

Do not create separate rules merely because a parameter changes.

Example:

- Friction = Rule
- low friction / high friction = configurations of the same rule

If two behaviors share the same definition, applies-to, and player-readable identity, they are one rule with different parameter values.

---

## Status lifecycle

```text
IDEA
↓
CANDIDATE
↓
EXPERIMENTAL
↓
VALIDATED
↓
CORE

DEPRECATED
```

| Status | Meaning |
| --- | --- |
| `IDEA` | Unstructured possibility. |
| `CANDIDATE` | Worth investigating. |
| `EXPERIMENTAL` | Implemented or prototyped but not sufficiently validated. |
| `VALIDATED` | Playtesting supports the intended behavior/design. |
| `CORE` | Stable part of FunkyDodge's design language. |
| `DEPRECATED` | Retained for historical/rationale purposes but should not be used for new content. |

Do not promote an item to `CORE` merely because it has been implemented.

`CORE` requires explicit design approval after playtest evidence.

---

## ID conventions

IDs are permanent. If an item is deprecated, do not recycle its ID.

| Prefix | Layer | Example |
| --- | --- | --- |
| `R-WORLD-` | World rules | `R-WORLD-001` |
| `R-PLAYER-` | Player rules | `R-PLAYER-001` |
| `R-MOTION-` | Motion rules | `R-MOTION-001` |
| `R-CONTACT-` | Contact rules | `R-CONTACT-001` |
| `R-FORCE-` | Force rules | `R-FORCE-001` |
| `R-STATE-` | State rules | `R-STATE-001` |
| `R-SIGNAL-` | Signal rules | `R-SIGNAL-001` |
| `R-INFO-` | Information rules | `R-INFO-001` |
| `INT-` | Interactions | `INT-001` |
| `GIM-` | Gimmicks | `GIM-001` |
| `PAT-` | Puzzle patterns | `PAT-001` |
| `DSC-` | Discoveries | `DSC-001` |
| `W1-K` | W1 conceptual knowledge nodes (not runtime) | `W1-K01` |
| `W2-K` | W2 conceptual knowledge nodes (not runtime) | `W2-K01` |
| `DL-` | Discovery Language guides (not Constitution) | `DL-01` |
| `ANTI-` | Anti-patterns | `ANTI-001` |
| `LVL-W##-` | Levels | `LVL-W01-001` |
| `WLD-` | Worlds | `WLD-01` |

---

## How layers constrain each other

| From | Constraint |
| --- | --- |
| Constitution | May forbid a rule, gimmick, pattern, or room purpose. |
| Rules | Interactions must be predictable from named rules. |
| Interactions | Gimmicks embody interactions; they do not invent silent extra rules. Strong interactions should support more than one application (Second Face) without new IDs. |
| Gimmicks | Must have at least two meaningful faces before they can become important (C-07). |
| Puzzle Patterns | Arrange known interactions; they do not add hidden rules. |
| Discoveries | Must be fair given known rules and cues (C-06). Discovery requires setup. |
| Levels | Must have a purpose (C-08) and reference IDs. |
| Worlds | Sequence teach → apply → test → reinterpret → combine → mastery. |
| Anti-Patterns | Can reject a proposal at any layer. |

---

## Design vocabulary (DOC-002)

These terms are progression vocabulary. They are **not** Rules, Interactions, Gimmicks, or player-visible stats.

### Knowledge Graph

A Knowledge Graph is the dependency structure of **player understanding**.

It answers:

> What must the player understand before this idea can be meaningfully taught, tested, or reinterpreted?

It is not an implementation dependency graph. A later room may be moved, removed, or redesigned while the knowledge dependency stays.

World graphs live in [progression/WORLD_LIBRARY.md](progression/WORLD_LIBRARY.md).

W1 CONTROL Knowledge Architecture v1 (`W1-K01`–`W1-K08`) is the **current** W1 planning source (`CANDIDATE`). Conceptual player-understanding, not a runtime object graph.

W2 MOMENTUM Knowledge Architecture v1 (`W2-K01`–`W2-K05`) is the **current** W2 planning source (`CANDIDATE`). Role-based carried-motion knowledge, not a Wind / Ice / Rough tutorial and not “go faster.” Movement Validation #3 pending does **not** validate W2-K.

The DOC-003 12-slot W1 list is a **historical candidate inventory**. It is not the current production plan, not a required room count, and not the graduation checklist. Depth Over Quantity takes precedence over slot preservation.

### Knowledge Gate

A Knowledge Gate is a progression requirement: the player must demonstrate previously introduced knowledge.

It does **not** require a separate examination level. A normal room can be a gate when accidental completion is unlikely and the intended knowledge must be applied deliberately.

Gates validate **understanding**, not mechanical precision. They must respect C-02, ANTI-003, ANTI-004, and ANTI-006.

Gate labels (`W1-GATE-1`, …) are historical progression IDs, not extra rooms. Current W1 graduation is the W1-K evidence language in [WORLD_LIBRARY.md](progression/WORLD_LIBRARY.md). Historical W1-GATE-2 (LOW / NORMAL / BOOST) and W1-GATE-3 (Wall / Momentum) are **not** current W1 graduation gates.

### Movement State

> The player's current physical condition that determines what future movement possibilities are available.

Conceptual components may include position, velocity vector, direction, bounce state/type, directional intent, momentum, and current surface/environment influence.

Do **not** expose numerical Movement State to the player by default. Players should feel it:

- “I am too fast.”
- “I need to enter low.”
- “I need rightward momentum.”
- “I need to reach that wall with a different trajectory.”

Design question:

> Not only “Where should the player go?” but “In what Movement State should the player arrive there?”

Air steering / counter-steering names a change of directional intent in flight. It is not a new Rule ID.

---

## Progression principles

Progression should support Discovery → Knowledge → Future Tool. Canonical statement: [libraries/DISCOVERY_LIBRARY.md](libraries/DISCOVERY_LIBRARY.md).

Default difficulty target: Cognitive Difficulty >= Execution Difficulty. Once the solution is understood, execution should feel achievable (C-02).

Puzzle Patterns describe the **thinking problem**, not merely the spatial objective. Do not assign `PAT-001` because a room ends at an exit. Use it only when constructing a viable trajectory *is* the puzzle. See [libraries/PUZZLE_PATTERN_LIBRARY.md](libraries/PUZZLE_PATTERN_LIBRARY.md).

Worlds are **knowledge domains**, not mechanic or gimmick bundles. Canonical identities, graduation evidence, and transitions: [progression/WORLD_LIBRARY.md](progression/WORLD_LIBRARY.md) (World Knowledge Architecture).

High-level world arc (labels are roles; questions stay canonical):

| World | Role | Question |
| --- | --- | --- |
| WLD-01 | CONTROL | Where / in which direction should the next useful action begin? (historical: How do I move?) |
| WLD-02 | MOMENTUM | How does carried movement change what becomes possible? (historical: What changes my motion?) |
| WLD-03 | POSSIBILITY | When the world state changes, which actions appear and which disappear? (historical: What can objects become?) |
| WLD-04 | TIME | When will the needed state exist, and for how long? (historical: When should I act?) |
| WLD-05 | UNDERSTANDING | Which assumptions behind familiar solutions still apply? (historical: What do I really know?) |

Choose a knowledge question, then the smallest expression. Do **not** choose a gimmick, assign a World, and invent a room.

W1 current planning is role-based, not 12-slot. W1–W5 `LVL-` rows remain **historical candidate inventories** (IDs kept). Official lifecycle status stays `CANDIDATE`. Do not add `PROGRESSION CANDIDATE` to the lifecycle. Documentation is not validation. Do not read “60 slots” as a ship count. W5 is a synthesis stage; its room count is not protected.

### Cognitive Operation Variety

> Adjacent rooms should not demand the same cognitive operation merely because their discoveries or gimmicks differ.

Operations include trajectory construction, state preparation, route choice, momentum management, spatial detour, object reinterpretation, order reasoning, counting, waiting, prediction, synchronization, and alternate-solution formation.

Different objects with the same reasoning feel redundant. The same object with different reasoning can stay distinct. This prevents late-game “actually, do the opposite” loops.

Do **not** create a Pattern ID for this principle.

### World difficulty rhythm

Difficulty should not rise monotonically across all rooms.

Each new World should temporarily reduce cognitive pressure while introducing its new concept (TEACH → APPLY → TEST → REINTERPRET → COMBINE → MASTERY, then the next World's TEACH).

`W2-012 → W3-001` and `W3-012 → W4-001` (and the same for other world joins) should generally reset cognitive pressure.

Progression is a **rising sawtooth**, not a continuous ramp. Cognitive Difficulty should still generally remain >= Execution Difficulty.

### Reward rooms

> A Reward room lets the player enjoy knowledge they have already earned without immediately demanding another major inference.

Reward is not loot, currency, cutscene, or trivial filler. It can mean: “I learned this, and now the game lets me feel powerful/elegant using it.” APPLY / REWARD hybrids are allowed.

Do not add rooms solely to hit a Reward quota. Candidate hybrids (guidance only): `LVL-W01-005`, `LVL-W02-002`, `LVL-W02-006`, `LVL-W03-005`, `LVL-W04-003`, `LVL-W05-010`.

### Alternate solutions

Where appropriate, mastery rooms may support multiple rule-consistent solutions without breaking progression or relying on exploits. This is a level-design quality principle, not a Knowledge Gate. Players may clear a multi-solution room after finding one valid path. Do not add a gate that requires discovering every solution.

### Unused Interaction ≠ design debt

The Interaction Library is possibility space. Progression selects by teaching/discovery value. Unused IDs (e.g. INT-018, INT-019, INT-024) may stay unused. Do not add rooms to cover them.

---

## Geometry / physics boundary

Do not specify platform distance, gap width, ceiling height, wall spacing, wind strength, friction coefficients, required velocity, bounce height, frame windows, precise input timing, or momentum thresholds in design docs.

These depend on PLAY-001B and later human playtesting.

Use: `TBD — after PLAY-001B / relevant prototype validation`.

Also do not establish canonical bounce counts, Timed Gate durations, or Delay durations.

Progression constrains geometry later. Geometry must not prematurely constrain unvalidated physics.

---

## Current implementation boundary

Movement foundation is **not finalized**. Human Movement Validation #3 is **pending**. Protocol: `docs/playtest/MOVEMENT_VALIDATION_003.md` on `cursor/movement-validation-003-3f71`.

Pending experiment queue (no outcomes recorded here): AR-A2, WJ-B, Charge / Spin.

PLAY-002 remains **LOCKED**. Vertical Slice implementation remains **HOLD**.

Conceptual Vertical Slice candidate (unvalidated): A+B-1 → C-1 → D-1 → G-1. G-3 is backup / comparison. See [progression/WORLD_LIBRARY.md](progression/WORLD_LIBRARY.md).

W1 Knowledge Architecture, W2 Knowledge Architecture (`W2-K01`–`W2-K05`), Discovery Language System, and World Knowledge Architecture are **CANDIDATE**. Do not promote them to `VALIDATED` or `CORE`. Movement Validation #3 pending does **not** validate W2-K. This documentation pass does **not** validate W2 rooms, Wind / Ice / Rough, any gimmick, or movement experiments.

Therefore:

- Do not mark Low Bounce `CORE`.
- Do not mark Landing Boost `CORE`.
- Do not mark Wall Jump `CORE`.
- Do not freeze movement parameter values as design law.
- Do not implement the candidate gimmicks or levels from these docs.
- Do not implement the conceptual Vertical Slice from these docs.

Gravity, Auto Bounce, and Directional Control may be recorded as **CORE candidates**. They are not `CORE` until explicitly approved.

Parameter numbers that appear in code (`PhysicsConfig`) are implementation knobs, not constitutional values.

---

## DOC-001A import

`INT-001`–`INT-028` and `DSC-001`–`DSC-018` are imported as `CANDIDATE` entries.

Do not add `RESERVED` to the official lifecycle.

See [libraries/INTERACTION_LIBRARY.md](libraries/INTERACTION_LIBRARY.md) and [libraries/DISCOVERY_LIBRARY.md](libraries/DISCOVERY_LIBRARY.md).

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

### Knowledge Gate

A Knowledge Gate is a progression requirement: the player must demonstrate previously introduced knowledge.

It does **not** require a separate examination level. A normal room can be a gate when accidental completion is unlikely and the intended knowledge must be applied deliberately.

Gates validate **understanding**, not mechanical precision. They must respect C-02, ANTI-003, ANTI-004, and ANTI-006.

Gate labels (`W1-GATE-1`, …) are progression requirements, not library IDs and not extra rooms.

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

High-level world arc (labels are roles; questions stay canonical):

| World | Role | Question |
| --- | --- | --- |
| WLD-01 | CONTROL | How do I move? |
| WLD-02 | MOMENTUM | What changes my motion? |
| WLD-03 | POSSIBILITY | What can objects become? |
| WLD-04 | TIME | When should I act? |
| WLD-05 | UNDERSTANDING | What do I really know? |

W4 and W5 remain high-level conceptual candidates. Do not author detailed W4/W5 rooms in DOC-002.

W1–W3 room rows are **progression candidates**. Official lifecycle status stays `CANDIDATE`. Do not add `PROGRESSION CANDIDATE` to the lifecycle. Documentation is not validation.

---

## Geometry / physics boundary

Do not specify platform distance, gap width, ceiling height, wall spacing, wind strength, friction coefficients, required velocity, bounce height, frame windows, precise input timing, or momentum thresholds in design docs.

These depend on PLAY-001B and later human playtesting.

Use: `TBD — after PLAY-001B feel validation`.

Progression constrains geometry later. Geometry must not prematurely constrain unvalidated physics.

---

## Current implementation boundary

**Current development stage: PLAY-001B — Dynamic Movement Pass**

PLAY-002 has **not** started.

Movement feel is still being validated.

Therefore:

- Do not mark Low Bounce `CORE`.
- Do not mark Landing Boost `CORE`.
- Do not mark Wall Jump `CORE`.
- Do not freeze movement parameter values as design law.
- Do not implement the candidate gimmicks or levels from these docs.

Gravity, Auto Bounce, and Directional Control may be recorded as **CORE candidates**. They are not `CORE` until explicitly approved.

PLAY-001B is still tuning movement feel. Parameter numbers that appear in code (`PhysicsConfig`) are implementation knobs, not constitutional values.

---

## DOC-001A import

`INT-001`–`INT-028` and `DSC-001`–`DSC-018` are imported as `CANDIDATE` entries.

Do not add `RESERVED` to the official lifecycle.

See [libraries/INTERACTION_LIBRARY.md](libraries/INTERACTION_LIBRARY.md) and [libraries/DISCOVERY_LIBRARY.md](libraries/DISCOVERY_LIBRARY.md).

# FunkyDodge Design Documentation

These files are the design **Source of Truth** for FunkyDodge.

They describe what the game is allowed to be. They do not automatically describe what the current build is.

---

## How to use this documentation

1. **Constitution is the highest-level design authority.**  
   If a proposed mechanic, gimmick, level, or implementation contradicts `CONSTITUTION.md`, the Constitution wins.

2. **Libraries are referenced by stable IDs.**  
   Use `R-PLAYER-001`, `INT-001`, `GIM-001`, `PAT-001`, `DSC-001`, `W1-K01`, `DL-01`, `ANTI-001`, `LVL-W01-001`, `WLD-01`.  
   IDs are permanent. Deprecated items keep their ID. Never recycle an ID.

3. **Implementation does not automatically validate a design.**  
   Shipping a prototype does not promote a rule, gimmick, or interaction to `CORE`.

4. **Experimental mechanics remain EXPERIMENTAL until playtested.**  
   Playtesting must support the intended behavior before `VALIDATED`. `CORE` requires explicit design approval.

5. **New mechanics should first be evaluated as combinations or variations of existing rules.**  
   Follow C-05 before adding a new gimmick.

6. **Level implementation should reference its Rules, Interactions, Patterns, and Discovery target.**  
   A level without those references is incomplete as a design record.

7. **Rejected or deprecated ideas should retain rationale where useful.**  
   Keep the ID, mark `DEPRECATED`, and record why.

8. **Do not silently change design semantics from implementation code.**  
   If the code drifts, update the docs after playtest — or change the code to match the docs. Do not let a local patch become a secret rule.

---

## Document map

| Document | Role |
| --- | --- |
| [CONSTITUTION.md](CONSTITUTION.md) | Highest design authority. Eight principles + core experience. |
| [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) | Architecture, vocabulary (Knowledge Graph, Knowledge Gate, Movement State), lifecycle, current boundary. |
| [libraries/RULE_LIBRARY.md](libraries/RULE_LIBRARY.md) | Stable rules and tunable parameters. |
| [libraries/INTERACTION_LIBRARY.md](libraries/INTERACTION_LIBRARY.md) | What happens when rules combine. |
| [libraries/GIMMICK_LIBRARY.md](libraries/GIMMICK_LIBRARY.md) | Embodied objects / surfaces / devices. |
| [libraries/PUZZLE_PATTERN_LIBRARY.md](libraries/PUZZLE_PATTERN_LIBRARY.md) | Abstract puzzle structures. |
| [libraries/DISCOVERY_LIBRARY.md](libraries/DISCOVERY_LIBRARY.md) | Player realizations + Discovery Language System v1 (`DL-01`–`DL-08`). |
| [libraries/ANTI_PATTERN_LIBRARY.md](libraries/ANTI_PATTERN_LIBRARY.md) | What we refuse to ship. |
| [progression/LEVEL_LIBRARY.md](progression/LEVEL_LIBRARY.md) | Room-scale instantiations. |
| [progression/WORLD_LIBRARY.md](progression/WORLD_LIBRARY.md) | World-scale sequence, W1-K01–K08, conceptual Vertical Slice. |

---

## Design loop

```text
Design → Prototype → Playtest → Learn → Update Docs → Validate
```

This documentation is intended to evolve from playtesting.

It is not a frozen specification.

---

## Current implementation boundary

Movement foundation is **not finalized**. Human Movement Validation #3 is **pending**.

PLAY-002 remains **LOCKED**. Vertical Slice implementation remains **HOLD**.

W1 Knowledge Architecture and Discovery Language System: **CANDIDATE**. Do not promote to `VALIDATED` / `CORE`.

See [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) for the full boundary statement.

`INT-001`–`INT-028` and `DSC-001`–`DSC-018` are imported as `CANDIDATE` (DOC-001A). Documentation does not validate them.

W1–W5 room rows are 60 progression **slots** (`CANDIDATE` status), not a fixed ship count. Conceptual Vertical Slice (A+B-1 → C-1 → D-1 → G-1) is a separate unvalidated candidate. See [progression/WORLD_LIBRARY.md](progression/WORLD_LIBRARY.md). Do not implement them. Geometry, counts, and durations stay `TBD — after movement validation / relevant prototype validation`.

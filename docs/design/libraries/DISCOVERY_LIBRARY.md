# Discovery Library

Discoveries are player realizations the game should produce.

```text
Discovery
↓
Knowledge
↓
Future Tool
```

A discovery should normally become reusable player knowledge rather than a one-room trick.

Surprise comes from possibility inside known rules (C-06). D3 should be rare.

---

## Schema

```text
Discovery ID
Name
Status

Realization
Previous Assumption

Rules Involved
Interactions Involved
Gimmicks Involved
Puzzle Patterns

Required Setup
Expected Player Hypothesis
Trigger Context

Discovery Type
Intensity

Why It Is Fair
Required Cues

Potential Payoff
Future Reuse

Spoiler Risk
Validated Level
```

---

## Intensity

| Code | Name | Meaning |
| --- | --- | --- |
| D0 | Learning | The rule is shown. |
| D1 | Application | The player uses a known rule in a straightforward ask. |
| D2 | Reinterpretation | A known rule or object means something else. |
| D3 | Revelation | A large shift in what the player thinks the game is. Rare. |

---

## Signature discovery candidates

These four are named in the bootstrap brief. They are **CANDIDATES**, not `CORE`.

| ID | Realization |
| --- | --- |
| DSC-005 | Higher bounce is not always better. |
| DSC-006 | Low Bounce can be the beginning of a stronger route. |
| DSC-011 | Bounce count itself can be a resource. |
| DSC-017 | The same location behaves differently depending on entry velocity. |

---

## Source-note gap (DOC-001)

The bootstrap brief requires **DSC-001 through DSC-018** from the current design notes.

Those notes were **not present** in this repository at bootstrap time.

The brief itself named only DSC-005, DSC-006, DSC-011, and DSC-017.

Therefore:

- `DSC-001`–`DSC-004`, `DSC-007`–`DSC-010`, `DSC-012`–`DSC-016`, and `DSC-018` are **reserved**.
- Do not invent realizations for reserved IDs.
- Do not recycle reserved IDs if the notes later use them for different discoveries.

---

## Index

| ID | Name | Status | Intensity |
| --- | --- | --- | --- |
| DSC-001 | *(reserved — awaiting design notes)* | RESERVED | — |
| DSC-002 | *(reserved — awaiting design notes)* | RESERVED | — |
| DSC-003 | *(reserved — awaiting design notes)* | RESERVED | — |
| DSC-004 | *(reserved — awaiting design notes)* | RESERVED | — |
| DSC-005 | Higher bounce is not always better | CANDIDATE | D2 |
| DSC-006 | Low Bounce can begin a stronger route | CANDIDATE | D2 |
| DSC-007 | *(reserved — awaiting design notes)* | RESERVED | — |
| DSC-008 | *(reserved — awaiting design notes)* | RESERVED | — |
| DSC-009 | *(reserved — awaiting design notes)* | RESERVED | — |
| DSC-010 | *(reserved — awaiting design notes)* | RESERVED | — |
| DSC-011 | Bounce count itself can be a resource | CANDIDATE | D2 |
| DSC-012 | *(reserved — awaiting design notes)* | RESERVED | — |
| DSC-013 | *(reserved — awaiting design notes)* | RESERVED | — |
| DSC-014 | *(reserved — awaiting design notes)* | RESERVED | — |
| DSC-015 | *(reserved — awaiting design notes)* | RESERVED | — |
| DSC-016 | *(reserved — awaiting design notes)* | RESERVED | — |
| DSC-017 | Same location, different entry velocity | CANDIDATE | D2 |
| DSC-018 | *(reserved — awaiting design notes)* | RESERVED | — |

`RESERVED` is a bootstrap placeholder, not a lifecycle status.

---

### DSC-005 — Higher bounce is not always better

| Field | Value |
| --- | --- |
| Discovery ID | `DSC-005` |
| Name | Higher bounce is not always better |
| Status | CANDIDATE (signature candidate) |
| Realization | Higher bounce is not always better. |
| Previous Assumption | The full Auto Bounce is the good bounce. Short hops are a downgrade. |
| Rules Involved | R-PLAYER-001 Auto Bounce; R-PLAYER-003 Low Bounce |
| Interactions Involved | TBD — reserved INT set. Observed: fresh press × Auto Bounce. |
| Gimmicks Involved | none required |
| Puzzle Patterns | PAT-005 Kill Momentum; PAT-016 Same Tool, New Function; PAT-001 Reach (low ceiling) |
| Required Setup | A space where a full bounce fails (ceiling, overshoot, or wasted hang time) and a short bounce succeeds. |
| Expected Player Hypothesis | “I need more height.” |
| Trigger Context | After Auto Bounce and Low Bounce have been shown (D0/D1). |
| Discovery Type | Reinterpretation of bounce quality |
| Intensity | D2 |
| Why It Is Fair | Both bounce heights are already known rules. The room uses geometry, not a secret exception. |
| Required Cues | The failed full bounce must look too high or too long, not random. |
| Potential Payoff | Player starts choosing bounce height. |
| Future Reuse | Any later low-ceiling or precision landing. Must not be a one-room trick. |
| Spoiler Risk | Medium. Teaching rooms should show the contrast, not narrate it (ANTI-016). |
| Validated Level | none |

World 1 structural homes: LVL-W01-004, LVL-W01-005. Not implemented.

---

### DSC-006 — Low Bounce can be the beginning of a stronger route

| Field | Value |
| --- | --- |
| Discovery ID | `DSC-006` |
| Name | Low Bounce can be the beginning of a stronger route |
| Status | CANDIDATE (signature candidate) |
| Realization | Low Bounce can be the beginning of a stronger route. |
| Previous Assumption | Low Bounce is only for going under things. It is a lesser bounce. |
| Rules Involved | R-PLAYER-003 Low Bounce; R-MOTION-001 Momentum; R-PLAYER-001 |
| Interactions Involved | TBD. Observed: Low Bounce × takeoff carry. |
| Gimmicks Involved | none required |
| Puzzle Patterns | PAT-003 Setup → Payoff; PAT-004 Build Momentum; PAT-016 |
| Required Setup | A short bounce that places the player to land with a better next bounce (for example a Boost), not merely to crawl under a slab. |
| Expected Player Hypothesis | “Low Bounce is the whole solution” or “I should Boost from the start.” |
| Trigger Context | After Low Bounce intro and Landing Boost intro. |
| Discovery Type | Reinterpretation of Low Bounce as setup |
| Intensity | D2 |
| Why It Is Fair | Both tools are already taught. The new idea is sequence, not a new button. |
| Required Cues | The first landing after LOW should make the payoff readable. |
| Potential Payoff | LOW becomes a route-starter. Related to LVL-W01-008 / LVL-W01-012 candidates. |
| Future Reuse | Later combination rooms. Knowledge, not a trick. |
| Spoiler Risk | Medium–high. Easy to over-tutorialize. |
| Validated Level | none |

---

### DSC-011 — Bounce count itself can be a resource

| Field | Value |
| --- | --- |
| Discovery ID | `DSC-011` |
| Name | Bounce count itself can be a resource |
| Status | CANDIDATE (signature candidate) |
| Realization | Bounce count itself can be a resource. |
| Previous Assumption | Bounces are just how I move. The number of them does not matter. |
| Rules Involved | R-PLAYER-001 Auto Bounce; R-STATE-003 Counter; R-INFO-001 |
| Interactions Involved | TBD — reserved INT set |
| Gimmicks Involved | GIM-007 Bounce Counter (candidate, not committed) |
| Puzzle Patterns | PAT-011 Bounce Counting; PAT-021 Resource Allocation |
| Required Setup | A visible count that changes on bounce and gates a result. |
| Expected Player Hypothesis | “I just need to reach the exit.” |
| Trigger Context | After bounce identity is stable. Likely not World 1 movement school. Conceptual fit: WLD-04. |
| Discovery Type | Reinterpretation of the bounce event |
| Intensity | D2 |
| Why It Is Fair | The count is visible. Auto Bounce already happens. No hidden rule. |
| Required Cues | R-INFO-001 on the count at all times it matters. |
| Potential Payoff | Players spend or conserve hops on purpose. |
| Future Reuse | Later counters, timed-by-bounce rooms. Must remain reusable knowledge. |
| Spoiler Risk | Low if the counter is visible; high if explained in text. |
| Validated Level | none |

PLAY-002 has not started. Do not implement GIM-007 from this entry.

---

### DSC-017 — The same location behaves differently depending on entry velocity

| Field | Value |
| --- | --- |
| Discovery ID | `DSC-017` |
| Name | The same location behaves differently depending on entry velocity |
| Status | CANDIDATE (signature candidate) |
| Realization | The same location behaves differently depending on entry velocity. |
| Previous Assumption | A place is a place. If I am here, the outcome is the same. |
| Rules Involved | R-MOTION-001 Momentum; R-CONTACT-001 Solid Collision; often R-PLAYER-004 or R-CONTACT-003 |
| Interactions Involved | TBD. Observed: Momentum × same geometry. |
| Gimmicks Involved | none required; Ice / Rough / Force Switch are optional later embodiments |
| Puzzle Patterns | PAT-015 Reinterpret Space; PAT-004; PAT-005 |
| Required Setup | Unchanged geometry; two approach speeds; two readable outcomes. |
| Expected Player Hypothesis | “I am in the right spot, so it should work.” |
| Trigger Context | After Momentum is felt. Candidate World 1 mastery or later WLD-02 / WLD-05. |
| Discovery Type | Reinterpretation of space |
| Intensity | D2 (do not inflate to D3) |
| Why It Is Fair | Rules stay the same (C-01). Only the player's motion state changes. The difference must be visible. |
| Required Cues | Speed must be readable (trail, hang, or approach distance). Outcome difference must be attributable to speed. |
| Potential Payoff | Players choose approach speed as a verb. |
| Future Reuse | Any later room that asks for a specific entry state. |
| Spoiler Risk | Medium. Naming “speed gates” in text would flatten it (ANTI-016). |
| Validated Level | none |

---

## Reserved slots

Each reserved ID uses the same schema when the design notes arrive. Until then, do not fill Realization or assign levels.

Do not promote a discovery to `CORE` because a playground moment felt similar.

---

## Normalization needed later

- Import official names for reserved DSC IDs from the design notes.
- Confirm that DSC-005 / 006 / 011 / 017 in those notes match the realizations recorded here. If they differ, **do not overwrite silently** — keep these realizations and escalate the ID conflict. IDs are permanent.
- Attach reserved INT IDs once that library is filled.
- Attach validated levels after playtest.

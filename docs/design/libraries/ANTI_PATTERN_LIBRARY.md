# Anti-Pattern Library

Anti-Patterns validate every layer of the design system.

A proposal that matches a hard-reject anti-pattern should not ship, even if it is implemented.

> Once the player understands the solution, success should feel achievable.

Failure must normally teach something.

---

## Schema

```text
Anti-Pattern ID
Name
Status
Severity

Violates

Description
Symptoms
Detection

Replacement Patterns
Exceptions
Example Rejected Design
```

---

## Severity

| Label | Meaning |
| --- | --- |
| Hard Reject candidate | Named in the bootstrap brief as a hard reject. Do not ship. |
| Recorded | In the library. Severity not further graded in v0.1. Treat as reject-by-default until an exception is written. |

Do not invent a finer severity scale in this bootstrap.

---

## Hard Reject candidates

- ANTI-002 Rule Betrayal
- ANTI-005 Luck Solution
- ANTI-019 Mandatory Exploit

---

## Index

| ID | Name | Status | Severity |
| --- | --- | --- | --- |
| ANTI-001 | Hidden Information | CANDIDATE | Recorded |
| ANTI-002 | Rule Betrayal | CANDIDATE | Hard Reject candidate |
| ANTI-003 | Frame-Perfect Input | CANDIDATE | Recorded |
| ANTI-004 | Reaction Test | CANDIDATE | Recorded |
| ANTI-005 | Luck Solution | CANDIDATE | Hard Reject candidate |
| ANTI-006 | Execution Tax | CANDIDATE | Recorded |
| ANTI-007 | Fake Choice | CANDIDATE | Recorded |
| ANTI-008 | Single-Use Gimmick | CANDIDATE | Recorded |
| ANTI-009 | One-Face Gimmick | CANDIDATE | Recorded |
| ANTI-010 | Gimmick Flood | CANDIDATE | Recorded |
| ANTI-011 | Rule Overload | CANDIDATE | Recorded |
| ANTI-012 | Arbitrary Timing | CANDIDATE | Recorded |
| ANTI-013 | Punishing Reset | CANDIDATE | Recorded |
| ANTI-014 | Pixel Hunting | CANDIDATE | Recorded |
| ANTI-015 | Solution by Accident | CANDIDATE | Recorded |
| ANTI-016 | Tutorial by Text | CANDIDATE | Recorded |
| ANTI-017 | Redundant Puzzle | CANDIDATE | Recorded |
| ANTI-018 | Difficulty by Numbers | CANDIDATE | Recorded |
| ANTI-019 | Mandatory Exploit | CANDIDATE | Hard Reject candidate |
| ANTI-020 | New Gimmick as Solution | CANDIDATE | Recorded |

Status is `CANDIDATE` because the library itself is v0.1. Hard Reject candidates are still binding design refusals.

---

### ANTI-001 — Hidden Information

| Field | Value |
| --- | --- |
| Anti-Pattern ID | `ANTI-001` |
| Name | Hidden Information |
| Status | CANDIDATE |
| Severity | Recorded |
| Violates | C-06; R-INFO-001 |
| Description | A decision depends on a fact the player cannot fairly see or infer. |
| Symptoms | “I had no way to know.” Surprise from concealment. |
| Detection | Ask: if the cue is removed, can a careful player still decide? If no, reject. |
| Replacement Patterns | Visible State; teach by space; telegraph timers and counts |
| Exceptions | None recorded. Fog-of-war is not a FunkyDodge tool in v0.1. |
| Example Rejected Design | Invisible wind; unlabelled one-way floor; hidden count. |

---

### ANTI-002 — Rule Betrayal

| Field | Value |
| --- | --- |
| Anti-Pattern ID | `ANTI-002` |
| Name | Rule Betrayal |
| Status | CANDIDATE |
| Severity | Hard Reject candidate |
| Violates | C-01; C-06 |
| Description | A known rule produces a different result under identical relevant conditions because the room “needs” it. |
| Symptoms | “It usually bounces, but not here.” Secret exceptions. |
| Detection | Same inputs, same visible state, different outcome with no named rule. |
| Replacement Patterns | If the room needs a different result, change visible state or use a named variation — never a silent patch. |
| Exceptions | None. That is the point. |
| Example Rejected Design | Auto Bounce disabled in one pit so the player cannot escape, with no readable cue. |

---

### ANTI-003 — Frame-Perfect Input

| Field | Value |
| --- | --- |
| Anti-Pattern ID | `ANTI-003` |
| Name | Frame-Perfect Input |
| Status | CANDIDATE |
| Severity | Recorded |
| Violates | C-02 |
| Description | The intended solution is only possible on a single-frame or similarly tiny window. |
| Symptoms | Players who know the answer still fail repeatedly. |
| Detection | Window size vs human timing. If understanding does not make success likely, reject. |
| Replacement Patterns | Widen the window; change the ask to a cognitive one. |
| Exceptions | None recorded. Speedrun optional challenges are not a v0.1 exception. |
| Example Rejected Design | Low Bounce that only accepts one exact frame at contact. |

Landing windows in PLAY-001B are tunable knobs, not a license for frame-perfect rooms.

---

### ANTI-004 — Reaction Test

| Field | Value |
| --- | --- |
| Anti-Pattern ID | `ANTI-004` |
| Name | Reaction Test |
| Status | CANDIDATE |
| Severity | Recorded |
| Violates | C-02; C-03 |
| Description | Difficulty is a sudden prompt that must be mashed, not a plan the player formed. |
| Symptoms | Success feels like reflexes. Failure teaches nothing about the rules. |
| Detection | Could a player who already knows the solution still lose because a flash was late? |
| Replacement Patterns | PAT-010 with a generous, readable cycle; let the player choose when to start the clock. |
| Exceptions | None recorded. |
| Example Rejected Design | Gate slams with no telegraph and demands an instant direction tap. |

---

### ANTI-005 — Luck Solution

| Field | Value |
| --- | --- |
| Anti-Pattern ID | `ANTI-005` |
| Name | Luck Solution |
| Status | CANDIDATE |
| Severity | Hard Reject candidate |
| Violates | C-01; C-02; C-06 |
| Description | A correct run cannot be reliably repeated from knowledge. RNG, hidden collision, or unreadable thresholds decide. |
| Symptoms | “I got through but I don’t know why.” |
| Detection | Ask the player to explain the solution. If they cannot, and we cannot either, reject. |
| Replacement Patterns | Visible thresholds; deterministic contact; DSC fairness cues |
| Exceptions | None. |
| Example Rejected Design | Force Switch with an invisible random activation chance. |

---

### ANTI-006 — Execution Tax

| Field | Value |
| --- | --- |
| Anti-Pattern ID | `ANTI-006` |
| Name | Execution Tax |
| Status | CANDIDATE |
| Severity | Recorded |
| Violates | C-02 |
| Description | After the solution is known, the room still demands a second major test of hands. |
| Symptoms | Players say “I know what to do” and still dread the attempt. |
| Detection | Cognitive Difficulty should be >= Execution Difficulty as a default target. |
| Replacement Patterns | Shorten the grind; widen landings; split the room. |
| Exceptions | A short, fair physical follow-through after a discovery is allowed. A second boss of dexterity is not. |
| Example Rejected Design | A solved route that still requires ten precise boosts in a row. |

---

### ANTI-007 — Fake Choice

| Field | Value |
| --- | --- |
| Anti-Pattern ID | `ANTI-007` |
| Name | Fake Choice |
| Status | CANDIDATE |
| Severity | Recorded |
| Violates | C-07; gimmick principle (choice, not merely obstacle) |
| Description | The board presents two options; only one is real. The other is decorative or secretly impossible. |
| Symptoms | Players waste time “choosing.” PAT-002 without a second viable path. |
| Detection | Play both options. If one cannot succeed by design, it is not a choice. |
| Replacement Patterns | Real Route Choice; or one path with no pretense. |
| Exceptions | A readable dead-end used as teaching (the failure is the lesson) is not fake if it is clearly not a solution. |
| Example Rejected Design | Two doors; one is welded shut with no cue. |

---

### ANTI-008 — Single-Use Gimmick

| Field | Value |
| --- | --- |
| Anti-Pattern ID | `ANTI-008` |
| Name | Single-Use Gimmick |
| Status | CANDIDATE |
| Severity | Recorded |
| Violates | C-05; C-07; Discovery → Knowledge → Future Tool |
| Description | An object exists for one room and never becomes knowledge. |
| Symptoms | Content that does not transfer. Collection of novelties. |
| Detection | Can this gimmick appear again with a new job? If we never intend that, reject or demote. |
| Replacement Patterns | PAT-016; reuse the rule; C-05 ladder |
| Exceptions | A one-room *application* of a reusable gimmick is fine. A gimmick invented for one room is not. |
| Example Rejected Design | A unique launcher that never returns and teaches nothing reusable. |

---

### ANTI-009 — One-Face Gimmick

| Field | Value |
| --- | --- |
| Anti-Pattern ID | `ANTI-009` |
| Name | One-Face Gimmick |
| Status | CANDIDATE |
| Severity | Recorded |
| Violates | C-07 |
| Description | An important gimmick can only do the one action it was introduced to do. |
| Symptoms | The object is a key-shaped key. No second meaningful use. |
| Detection | Promotion criteria: Second Face missing → do not promote to important / CORE. |
| Replacement Patterns | Design the second face before the intro world ships it as important. |
| Exceptions | A minor, non-important prop may have one face. Important gimmicks may not. |
| Example Rejected Design | Wind that only ever pushes the player into a pit. |

Second Face in GIMMICK_LIBRARY is TBD. That is a bootstrap gap, not permission to ship one-face important gimmicks.

---

### ANTI-010 — Gimmick Flood

| Field | Value |
| --- | --- |
| Anti-Pattern ID | `ANTI-010` |
| Name | Gimmick Flood |
| Status | CANDIDATE |
| Severity | Recorded |
| Violates | C-05 |
| Description | Many new objects appear instead of new uses of known rules. |
| Symptoms | The game becomes a catalog. Worlds introduce more than their New Rule Budget. |
| Detection | Count new gimmicks vs new applications in a world. Budget should stay small. |
| Replacement Patterns | C-05 steps 1–3; PAT-016; PAT-017 |
| Exceptions | None recorded. |
| Example Rejected Design | Implementing all twelve candidate gimmicks in World 1. |

---

### ANTI-011 — Rule Overload

| Field | Value |
| --- | --- |
| Anti-Pattern ID | `ANTI-011` |
| Name | Rule Overload |
| Status | CANDIDATE |
| Severity | Recorded |
| Violates | C-03; C-05 |
| Description | A room requires holding too many active rules at once for the intended discovery. |
| Symptoms | Players cannot name what they failed at. PAT-017 without teaching the parts. |
| Detection | List required rules. If several were never taught, or more than the room’s purpose needs, cut. |
| Replacement Patterns | Teach → apply → then combine (world curve). |
| Exceptions | Mastery rooms may combine *taught* rules. They may not dump untaught ones. |
| Example Rejected Design | First combination room that also debuts wind, ice, and a counter. |

---

### ANTI-012 — Arbitrary Timing

| Field | Value |
| --- | --- |
| Anti-Pattern ID | `ANTI-012` |
| Name | Arbitrary Timing |
| Status | CANDIDATE |
| Severity | Recorded |
| Violates | C-01; C-06; R-INFO-001 |
| Description | A wait or window whose length cannot be read or inferred from a published clock. |
| Symptoms | Players count “maybe this long.” Success feels like luck. |
| Detection | Is there a visible or equivalently fair timer? If not, reject. |
| Replacement Patterns | PAT-010 with Visible State; R-SIGNAL-002 with telegraph |
| Exceptions | None recorded. |
| Example Rejected Design | Delayed Switch with no wind-up and a room-specific secret duration. |

---

### ANTI-013 — Punishing Reset

| Field | Value |
| --- | --- |
| Anti-Pattern ID | `ANTI-013` |
| Name | Punishing Reset |
| Status | CANDIDATE |
| Severity | Recorded |
| Violates | C-02; C-08 (failure should teach, not only tax) |
| Description | A small mistake returns a large, slow, or information-free reset. |
| Symptoms | Players fear experimenting (breaks Observe → Experiment). |
| Detection | Time-to-retry vs information gained. Long walks back with no new knowledge. |
| Replacement Patterns | Nearby restart; keep setup state if the lesson is elsewhere; R key already exists as session control |
| Exceptions | A commitment room (PAT-013) may make reversal costly if the cost is the lesson and retry stays reasonable. |
| Example Rejected Design | One missed landing replays a long unskippable approach. |

---

### ANTI-014 — Pixel Hunting

| Field | Value |
| --- | --- |
| Anti-Pattern ID | `ANTI-014` |
| Name | Pixel Hunting |
| Status | CANDIDATE |
| Severity | Recorded |
| Violates | C-02; C-06 |
| Description | The solution is a tiny unmarked spot or seam. |
| Symptoms | Players hug walls hoping. Success is a corner clip. |
| Detection | Would a reasonable screenshot show the landing? If only a pixel does, reject. |
| Replacement Patterns | Larger targets; visible one-way; PAT-015 with readable speed, not a secret lip |
| Exceptions | None recorded. |
| Example Rejected Design | Exit hidden on an unmarked one-pixel ledge. |

---

### ANTI-015 — Solution by Accident

| Field | Value |
| --- | --- |
| Anti-Pattern ID | `ANTI-015` |
| Name | Solution by Accident |
| Status | CANDIDATE |
| Severity | Recorded |
| Violates | Core Experience (Discover should follow Experiment with understanding); C-02 |
| Description | The player can clear the room without being able to say why. |
| Symptoms | Clear with confusion. No transferable knowledge. |
| Detection | Post-clear: can the player repeat on purpose? If no, reject or retune cues. |
| Replacement Patterns | Stronger failure cues; force the hypothesis to be tested |
| Exceptions | A first accidental trigger that is then *re-demonstrated* as knowledge can be a teaching beat — the room is not done until the player can repeat it. |
| Example Rejected Design | A Force Switch that fires on a random graze and opens the exit forever. |

---

### ANTI-016 — Tutorial by Text

| Field | Value |
| --- | --- |
| Anti-Pattern ID | `ANTI-016` |
| Name | Tutorial by Text |
| Status | CANDIDATE |
| Severity | Recorded |
| Violates | Core Experience; C-06 |
| Description | The room explains the rule in words instead of letting the player observe and try. |
| Symptoms | Signage does the thinking. Discovery is skipped. |
| Detection | Remove the text. If the room cannot teach, the room is wrong — do not add more text. |
| Replacement Patterns | LVL-W01-001 style observation; D0 spaces; failure cues |
| Exceptions | Accessibility or options text is out of scope for v0.1. Control glyphs (← →) are input labels, not rule essays. |
| Example Rejected Design | “Press LEFT near the ground for Low Bounce” as the lesson instead of a low ceiling. |

---

### ANTI-017 — Redundant Puzzle

| Field | Value |
| --- | --- |
| Anti-Pattern ID | `ANTI-017` |
| Name | Redundant Puzzle |
| Status | CANDIDATE |
| Severity | Recorded |
| Violates | C-08 |
| Description | A room repeats a previous ask without teach, apply, test, surprise, or reward. |
| Symptoms | Same hypothesis, same solution, no new mastery. |
| Detection | Diff the discovery target against the previous room. If identical, cut or restyle the purpose. |
| Replacement Patterns | Apply/Test of the same discovery is allowed when purpose is explicit. A clone is not. |
| Exceptions | A reward room may be easy on purpose (C-08 Reward). |
| Example Rejected Design | Two consecutive identical LOW-under-slab rooms. |

---

### ANTI-018 — Difficulty by Numbers

| Field | Value |
| --- | --- |
| Anti-Pattern ID | `ANTI-018` |
| Name | Difficulty by Numbers |
| Status | CANDIDATE |
| Severity | Recorded |
| Violates | C-02; C-05 |
| Description | The room is harder only because there are more of the same: longer ice, more hops, more movers. |
| Symptoms | No new hypothesis. Fatigue is the challenge. |
| Detection | If we only scaled a count or length, we did not design a puzzle. |
| Replacement Patterns | PAT-016; PAT-017; change the question, not the quantity |
| Exceptions | A short apply-after-teach repetition is allowed. A numeric grind is not. |
| Example Rejected Design | Bounce Counter threshold 3 in one room, 20 in the next, same idea. |

---

### ANTI-019 — Mandatory Exploit

| Field | Value |
| --- | --- |
| Anti-Pattern ID | `ANTI-019` |
| Name | Mandatory Exploit |
| Status | CANDIDATE |
| Severity | Hard Reject candidate |
| Violates | C-01; C-06 |
| Description | The intended solution is an edge-case the rules do not present as legal play — a clip, a skip, an engine quirk. |
| Symptoms | Designers say “the player has to abuse it.” |
| Detection | If we would call it a bug in any other room, it cannot be the only solution here. |
| Replacement Patterns | Promote the behavior to a named, cued rule — or remove the requirement. |
| Exceptions | None. Optional sequence breaks are not v0.1 content. |
| Example Rejected Design | Exit only reachable by tunneling through a solid corner. |

---

### ANTI-020 — New Gimmick as Solution

| Field | Value |
| --- | --- |
| Anti-Pattern ID | `ANTI-020` |
| Name | New Gimmick as Solution |
| Status | CANDIDATE |
| Severity | Recorded |
| Violates | C-05 |
| Description | The room is unsolvable until a brand-new object appears, and that object is the entire answer. |
| Symptoms | Depth is replaced by novelty. The player learns a prop, not a rule. |
| Detection | Could an existing rule, combination, or variation solve this? If yes, do that first. |
| Replacement Patterns | C-05 ladder; PAT-016; PAT-017 |
| Exceptions | A world’s *one* budgeted new gimmick may be introduced — as a teach, not as a surprise key in a mastery room. |
| Example Rejected Design | Mastery room whose only new idea is a never-seen launcher. |

---

## How to use in a level record

Every LEVEL_LIBRARY entry must run an Anti-Pattern Check against this list, especially ANTI-002, ANTI-005, and ANTI-019.

Do not start PLAY-002 or implement content to “prove” an anti-pattern.

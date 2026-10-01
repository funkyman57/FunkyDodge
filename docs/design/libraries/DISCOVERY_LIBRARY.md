# Discovery Library

Discoveries are player realizations the game should produce.

Surprise comes from possibility inside known rules (C-06).

---

## Discovery lifecycle

```text
Discovery
↓
Knowledge
↓
Future Tool
```

A strong discovery should normally become reusable player knowledge.

Avoid one-room revelations that never matter again.

Progression must reuse discoveries as later tools. World placement is **guidance, not ownership**. Do not lock a DSC to one world. Audit and long-range seeds (DSC-017, DSC-007, DSC-016): [progression/WORLD_LIBRARY.md](../progression/WORLD_LIBRARY.md).

---

## Required Setup

> Discovery requires setup.

A discovery is fair only when the player has already been given enough information to infer the possibility.

Example — before “a closed door can be used as a wall” (`DSC-001`), the player should already understand:

- Wall Jump works on solid surfaces.
- The door is visibly solid.
- The door follows normal collision rules.

The game should allow the player to think:

> “Wait... the door is a wall too.”

rather than:

> “How was I supposed to know that?”

This is an implementation of:

> Surprise should come from possibility, not hidden information.

---

## Discovery Language System v1

**Status:** `CANDIDATE`. Shared guidance for this library and for progression audits. **Not Constitution.** Do not promote to `VALIDATED` / `CORE`. Do not implement a hint system from this section.

W1 knowledge IDs live in [WORLD_LIBRARY.md](../progression/WORLD_LIBRARY.md). Movement validation is pending (`docs/playtest/MOVEMENT_VALIDATION_003.md` on `cursor/movement-validation-003-3f71`). Do not record AR-A2 / WJ-B / Charge outcomes here.

### Core statement

Discovery Language is **not** about hiding the answer.

It is about showing the facts and consequences honestly enough for the player to make a judgment.

| May remain undisclosed | Must not be hidden for difficulty |
| --- | --- |
| Strategic conclusion | Controls; actual state; actual action result; relevant contact / cause; essential readability |

### Discovery definition

The player observes a result, updates an expectation, and uses the revised understanding in later choices.

| Layer | Question | Code |
| --- | --- | --- |
| EVENT | What actually happened? | E1 |
| INTERPRETATION EVIDENCE | Did later behavior change based on the result? | E2 |
| USE / TRANSFER EVIDENCE | Was the relationship reused or transferred? | E3 |

Room clear alone is not proof.

### Discovery types (Language)

These classify a *learning event*. They do not replace existing DSC entry types (Function, Perspective, …).

| Type | Meaning | False positive |
| --- | --- | --- |
| ACTION | I can do X. | One accidental activation. |
| EFFECT | When I do X, Y changes. | Saw the effect but did not connect it to input. |
| RELATIONSHIP | X is useful because this situation has property Y. | Memorized local input sequence. |
| REINTERPRETATION | X has another useful meaning. | Same action succeeds accidentally in a new layout. |
| TRANSFER | The earlier relationship applies here too. | Same input sequence in a cosmetically different room. |
| MASTERY | I can organize known relationships into my own plan. | Precise execution of a memorized route. |

### Core candidates

| ID | Rule | Reason | Violation |
| --- | --- | --- | --- |
| DL-01 | Facts Are Not Hidden. Controls, state, and actual consequences needed for judgment must be accessible. | Confusion is not discovery. | Invisible activation condition used as difficulty. |
| DL-02 | Feedback Follows Reality. Visual, audio, and state feedback must match actual gameplay events. | Extends C-01 into communication. | LOW feedback plays when LOW did not trigger. |
| DL-03 | Leave the Conclusion to the Player. Provide evidence for a relationship; do not automatically provide the strategic conclusion. | Protects ownership of discovery. | Only the correct platform is highlighted. |
| DL-04 | Separate Outcome from Understanding. A clear is a real achievement; it does not automatically prove understanding. | Separates accidental success from knowledge evidence. | Room clear immediately marks a concept as mastered. |

### Supporting heuristics

| ID | Heuristic |
| --- | --- |
| DL-05 | Failure Should Help the Next Attempt. A failed hypothesis should narrow what the player thinks, or make intention vs result comparable. |
| DL-06 | Help the Actual Problem. Diagnose with K Knowledge / X Execution / R Readability / M Movement / A Ambiguity / U Unknown. Do not reveal a solution merely because attempts are numerous. |
| DL-07 | Make Comparison Causal. When comparing outcomes, the player should be able to track which difference mattered. |
| DL-08 | Leave Room for Reuse. After a relationship is discovered, provide opportunities for application / reinterpretation / transfer. Do not force every discovery through all stages. |

### Information ladder

Not a mandatory linear escalation. Basic control information and accessibility support may begin at L3. Do not force unreadability in order to preserve discovery.

| Level | Name | Meaning |
| --- | --- | --- |
| L0 | FACT | World behavior and real result. |
| L1 | READABILITY | Make an existing fact easier to perceive. |
| L2 | COMPARISON | Make differences between results easier to compare. |
| L3 | CONTROL / POSSIBILITY | Expose available action and input contract. |
| L4 | RELATIONSHIP CLUE | Point attention toward a relevant relationship. |
| L5 | RELATIONSHIP / SOLUTION EXPLANATION | Explicitly explain why or how to solve. |

### Failure as information

| Kind | Meaning | Example |
| --- | --- | --- |
| INFORMATIVE | The result supports or rejects part of a hypothesis. | Player overshoots a preparation landing and can see why the next action begins poorly. |
| UNINFORMATIVE | Only failure is clear. | Immediate reset after an unclear off-screen collision. |
| MISLEADING | Feedback suggests the wrong cause. | Showing LOW activation feedback when LOW did not trigger. |

### Recovery

Recovery is not merely “do not kill the player.” A recovery state should allow: intention → actual result → revised plan.

Audit: Can intended vs actual landing be compared? Does the result remain readable long enough? Is there room to think without immediate precision demand? Can known actions re-enter the problem? Is recovery itself not a new puzzle? Is Restart still available? Are alternate valid recovery plans allowed?

### Visible vs explained relationship

| Visible | Explained |
| --- | --- |
| The player can observe the relevant cause / result evidence. | The game provides the interpretation and/or the strategic choice. |

Target: facts should be visible; meaning may remain discoverable.

Readable: NORMAL and LOW produce different real trajectories.  
Not automatically explained: “Use LOW here.”

### Teach HOW / Discover WHY — REVISE

Previous principle: “Teach HOW. Let the player discover WHY.”

**Verdict:** REVISE.

Current candidate (Discovery Language common guide, **not Constitution**):

> 판단에 필요한 사실은 명확히 제공한다. 용도와 전략은 발견할 여지를 남긴다.

> Provide the facts needed for judgment clearly. Leave room for the player to discover use and strategy.

### Help / hint philosophy

Default flow candidate: free experiment → opportunity to form a hypothesis → meaningful stagnation → offer help → player chooses whether to reveal more.

Do **not**: failure count → automatic solution.

If help is accepted, reveal only the minimum appropriate information level. Behavior after explicit help is **not** unsupported discovery evidence.

Do not implement a hint system in this documentation pass.

### Confirmation

The game confirms **EVENTS**, not player thoughts.

Good: real movement change; contact response; sound tied to an actual event; visual state change; clean traversal; clear completion.

Avoid: “Discovery Complete!” / “Preparation Learned!”

The game knows what happened. It does not know the player's internal understanding.

### Misconception framework

Useful misconceptions should arise from reasonable over-generalization of true prior experience. The game must not lie to create them.

W1 examples (see W1-K):

- “Higher is always better.” → challenged by contextual LOW value.
- “LOW is the advanced/default move.” → challenged where NORMAL is better.
- “Closer to exit is always better.” → challenged by preparation / starting-position value.
- “There is one correct landing.” → challenged by valid alternative planning.
- “If I miss the intended landing, reset.” → challenged by readable recovery.

Pattern: validated relationship → natural generalization → different result under same rules → assumption revised → relationship reused.

### Discovery arc template

Role checklist. **Not** a fixed number of rooms. Phases may merge, be skipped, or repeat. Do not pad rooms to satisfy the template.

| Phase | Role |
| --- | --- |
| SEED | Give a safe reason to observe / try. |
| EXPOSE | Let action and effect become experienceable. |
| CONTRAST | Make hypotheses distinguishable. |
| DISCOVER | Give opportunity to use the relationship. |
| REINTERPRET | Reveal a new meaning of a known relationship. |
| TRANSFER | Use the relationship in a new context. |
| MASTER | Organize known relationships into a plan. |

### Discovery density

| Density | Meaning | Action |
| --- | --- | --- |
| UNDERLOADED | Same reasoning repeats without application / reward / pacing role. | Merge / remove candidate. |
| FOCUSED | One main question remains readable; known actions allow hypotheses to be tested. | Keep. |
| OVERLOADED | New control + new rule + unfamiliar geometry + high execution burden make failure cause unclear. | Separate burden or improve information. |

### Current slice discovery audit

Conceptual Vertical Slice only. Unvalidated. HOLD. Not `LVL-W01-*`.

| Slice | Language type | Primary channels | Must be obvious | Must remain unstated | Evidence |
| --- | --- | --- | --- | --- | --- |
| A+B-1 | ACTION / EFFECT | Motion, Consequence, Repetition | Auto Bounce; direction input affects landing | Exact correct landing / solution sequence | E2 |
| C-1 | RELATIONSHIP | Geometry, Contrast | LOW exists / can be performed; trajectory differs | “Use LOW here.” | E2 |
| D-1 | REINTERPRETATION | Consequence, Recovery, Spatial relationship | Preparation landing; exit; actual landing result | “Land on P so the next bounce works.” | E2 |
| G-1 | TRANSFER | Route connection, starting-position contrast | Route connectivity; final action context | “Take the detour.” | E3 candidate |

Slice knowledge mapping: [WORLD_LIBRARY.md](../progression/WORLD_LIBRARY.md).

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

Existing DSC-001–018 keep the schema above.

For **future** Discovery entries, prefer this compact permanent set. Do not copy the full Discovery Language essay into every entry.

```text
previous assumption
target understanding
Rule / Interaction dependencies
prerequisite knowledge
facts shown
strategic conclusion left to discover
primary communication channels
informative failure
behavioral evidence
representative false positive
validation status
playtest evidence reference
```

---

## Intensity

```text
D0 — Learning
D1 — Application
D2 — Reinterpretation
D3 — Revelation
```

| Code | Name | Meaning |
| --- | --- | --- |
| D0 | Learning | The rule is shown. |
| D1 | Application | The player uses a known rule in a straightforward ask. |
| D2 | Reinterpretation | A known rule or object means something else. |
| D3 | Revelation | A large shift in what the player thinks the game is. Rare. |

Do **not** assign a final intensity to every DSC in this library.

Intensity can depend on level context and prior player knowledge.

D3 should remain rare.

---

## Signature discovery candidates

These four are signature *candidates*. They are not `CORE`.

| ID | Name |
| --- | --- |
| DSC-005 | Higher Is Not Always Better |
| DSC-006 | Low Can Lead Farther |
| DSC-011 | Bounce Is a Resource |
| DSC-017 | Entry Velocity Changes the Space |

---

## Status

Imported entries are `CANDIDATE`.

Do not infer validation from documentation. Official lifecycle only:

`IDEA` → `CANDIDATE` → `EXPERIMENTAL` → `VALIDATED` → `CORE`, plus `DEPRECATED`.

---

## Index

| ID | Name | Status | Type | Signature |
| --- | --- | --- | --- | --- |
| DSC-001 | Door Before Doorway | CANDIDATE | Function | |
| DSC-002 | Use the Headwind | CANDIDATE | Function | |
| DSC-003 | Ice Stores Momentum | CANDIDATE | Function | |
| DSC-004 | Friction Can Help | CANDIDATE | Function | |
| DSC-005 | Higher Is Not Always Better | CANDIDATE | Perspective | yes |
| DSC-006 | Low Can Lead Farther | CANDIDATE | Perspective | yes |
| DSC-007 | Move Away to Move Toward | CANDIDATE | Order / Spatial | |
| DSC-008 | Build Before Spending | CANDIDATE | Setup | |
| DSC-009 | Lose Speed on Purpose | CANDIDATE | Perspective | |
| DSC-010 | Wall as Tool | CANDIDATE | Function | |
| DSC-011 | Bounce Is a Resource | CANDIDATE | System | yes |
| DSC-012 | Waiting Is an Action | CANDIDATE | Time | |
| DSC-013 | Action Now, Result Later | CANDIDATE | Delay | |
| DSC-014 | Opening the Door Can Be Wrong | CANDIDATE | Order | |
| DSC-015 | Familiar + Familiar = New | CANDIDATE | Combination | |
| DSC-016 | Apparent Failure Can Be Setup | CANDIDATE | Perspective | |
| DSC-017 | Entry Velocity Changes the Space | CANDIDATE | Physics | yes |
| DSC-018 | Same Object, Different Role | CANDIDATE | State | |

Intensity is not assigned in this index.

---

### DSC-001 — Door Before Doorway

| Field | Value |
| --- | --- |
| Discovery ID | `DSC-001` |
| Name | Door Before Doorway |
| Status | CANDIDATE |
| Realization | A closed door can be used as a wall before being opened. |
| Previous Assumption | Door = obstacle that should immediately be opened. |
| Rules Involved | R-STATE-001; R-CONTACT-001; R-PLAYER-005 (setup); R-INFO-001 |
| Interactions Involved | INT-021; INT-028 |
| Gimmicks Involved | GIM-001 Door (candidate, not committed) |
| Puzzle Patterns | PAT-014 Reinterpret Object |
| Required Setup | Player already knows Wall Jump works on solids; the door is visibly solid; the door follows normal collision rules. |
| Expected Player Hypothesis | “I should open this immediately.” |
| Trigger Context | After wall-as-solid and door-as-state have been taught separately. |
| Discovery Type | Function |
| Intensity | Not assigned — depends on prior knowledge. |
| Why It Is Fair | The player can infer “the door is a wall too” from already-taught solids. |
| Required Cues | Closed door looks and behaves solid. |
| Potential Payoff | Closed doors become geometry. |
| Future Reuse | Later door rooms, including `DSC-014`. Knowledge, not a one-room trick. |
| Spoiler Risk | Do not write the punchline as text (ANTI-016). |
| Validated Level | none |

PLAY-002 has not started. Do not implement GIM-001 from this entry.

---

### DSC-002 — Use the Headwind

| Field | Value |
| --- | --- |
| Discovery ID | `DSC-002` |
| Name | Use the Headwind |
| Status | CANDIDATE |
| Realization | Moving against wind can be useful. |
| Previous Assumption | Wind should always be followed. |
| Rules Involved | R-FORCE-001; R-PLAYER-001; R-MOTION-001 |
| Interactions Involved | INT-001; INT-017 |
| Gimmicks Involved | GIM-003 Wind (candidate, not committed) |
| Puzzle Patterns | Not further specified. |
| Required Setup | Player already knows Directional Force bends a bounce (`INT-001`) and that force exposure leaves momentum (`INT-017`). |
| Expected Player Hypothesis | “I should always go with the wind.” |
| Trigger Context | After wind’s first face (push toward / assist) is known. |
| Discovery Type | Function |
| Intensity | Not assigned. |
| Why It Is Fair | Headwind is the same force rule, opposite use — Second Face of `INT-001`, not a hidden rule. |
| Required Cues | Wind direction visible before the choice. |
| Potential Payoff | Wind is a tool in both directions. |
| Future Reuse | Later force rooms. |
| Spoiler Risk | Do not label “use headwind here.” |
| Validated Level | none |

---

### DSC-003 — Ice Stores Momentum

| Field | Value |
| --- | --- |
| Discovery ID | `DSC-003` |
| Name | Ice Stores Momentum |
| Status | CANDIDATE |
| Realization | A low-friction surface can preserve speed and act as momentum storage. |
| Previous Assumption | Ice = dangerous slippery surface. |
| Rules Involved | R-CONTACT-003 configured low; R-MOTION-001; R-PLAYER-001 |
| Interactions Involved | INT-003; INT-014; INT-009; INT-016; INT-020 where the room uses those pairs |
| Gimmicks Involved | GIM-004 Ice (candidate, not committed) |
| Puzzle Patterns | PAT-004 Build Momentum |
| Required Setup | Player already feels momentum and can see the surface is slick. |
| Expected Player Hypothesis | “Ice will make me lose control.” |
| Trigger Context | After momentum is known; ice first face may have been “hazard.” |
| Discovery Type | Function |
| Intensity | Not assigned. |
| Why It Is Fair | Low friction is a published configuration of one rule, not a new species. |
| Required Cues | Surface reads as slick before it preserves speed. |
| Potential Payoff | Ice becomes storage. |
| Future Reuse | Later carry rooms. |
| Spoiler Risk | Do not narrate “store your speed.” |
| Validated Level | none |

---

### DSC-004 — Friction Can Help

| Field | Value |
| --- | --- |
| Discovery ID | `DSC-004` |
| Name | Friction Can Help |
| Status | CANDIDATE |
| Realization | A rough/high-friction surface can intentionally remove unwanted speed. |
| Previous Assumption | A slowing surface is always harmful. |
| Rules Involved | R-CONTACT-003 configured high; R-MOTION-001 |
| Interactions Involved | INT-004; INT-015 |
| Gimmicks Involved | GIM-005 Rough Surface (candidate, not committed) |
| Puzzle Patterns | PAT-005 Kill Momentum |
| Required Setup | Player already values momentum and can see the grabby surface. |
| Expected Player Hypothesis | “Slowing ground is bad.” |
| Trigger Context | After speed has been useful (`DSC-003` or World 1 carry). |
| Discovery Type | Function |
| Intensity | Not assigned. |
| Why It Is Fair | High friction is the other configuration of the same rule as ice. |
| Required Cues | Surface reads as grabby before it dumps speed. |
| Potential Payoff | Braking is a choice (`DSC-009`). |
| Future Reuse | Later precision landings. |
| Spoiler Risk | Do not command “stop here.” |
| Validated Level | none |

---

### DSC-005 — Higher Is Not Always Better

| Field | Value |
| --- | --- |
| Discovery ID | `DSC-005` |
| Name | Higher Is Not Always Better |
| Status | CANDIDATE (signature candidate) |
| Realization | A higher bounce is not always the best movement choice. |
| Previous Assumption | More height = better movement. |
| Rules Involved | R-PLAYER-001; R-PLAYER-003 |
| Interactions Involved | INT-007 |
| Gimmicks Involved | none required |
| Puzzle Patterns | PAT-016 Same Tool, New Function; PAT-001 Reach |
| Required Setup | Auto Bounce and Low Bounce have been shown. A full bounce visibly fails a constraint a short bounce can pass. |
| Expected Player Hypothesis | “I need more height.” |
| Trigger Context | After Low Bounce intro. Structural home: LVL-W01-004 / LVL-W01-005. |
| Discovery Type | Perspective |
| Intensity | Not assigned — depends on how loudly height was taught as “good.” |
| Why It Is Fair | Both heights are known rules. Geometry, not a secret exception. |
| Required Cues | Failed full bounce looks too high or too long. |
| Potential Payoff | Player chooses bounce height. |
| Future Reuse | Any later low route. Must not be a one-room trick. |
| Spoiler Risk | Do not print “use Low Bounce.” |
| Validated Level | none |

---

### DSC-006 — Low Can Lead Farther

| Field | Value |
| --- | --- |
| Discovery ID | `DSC-006` |
| Name | Low Can Lead Farther |
| Status | CANDIDATE (signature candidate) |
| Realization | Low Bounce can sacrifice height while enabling a stronger or more useful horizontal route. |
| Previous Assumption | Low Bounce is merely a weaker bounce. |
| Rules Involved | R-PLAYER-003; R-MOTION-001; R-PLAYER-001 |
| Interactions Involved | INT-008 |
| Gimmicks Involved | none required |
| Puzzle Patterns | PAT-003 Setup → Payoff; PAT-004; PAT-016 |
| Required Setup | Low Bounce and horizontal carry are already known. The short bounce must set up a later payoff, not only crawl under a slab. |
| Expected Player Hypothesis | “Low Bounce is just a weaker bounce.” |
| Trigger Context | After Low Bounce and (typically) Landing Boost intros. Structural homes: LVL-W01-005 / LVL-W01-012. |
| Discovery Type | Perspective |
| Intensity | Not assigned. |
| Why It Is Fair | Sequence of known tools, not a new button. |
| Required Cues | The landing after LOW makes the payoff readable. |
| Potential Payoff | LOW becomes a route-starter. |
| Future Reuse | Later combination rooms. |
| Spoiler Risk | Easy to over-tutorialize. Show, do not tell. |
| Validated Level | none |

---

### DSC-007 — Move Away to Move Toward

| Field | Value |
| --- | --- |
| Discovery ID | `DSC-007` |
| Name | Move Away to Move Toward |
| Status | CANDIDATE |
| Realization | The correct route may begin by moving away from the destination. |
| Previous Assumption | Progress always means moving directly toward the goal. |
| Rules Involved | Depends on the room’s taught tools. No new rule. |
| Interactions Involved | Not uniquely bound to one INT. |
| Gimmicks Involved | none required |
| Puzzle Patterns | PAT-018 Intentional Detour |
| Required Setup | The straight path fails for a visible reason. The detour uses already-taught rules. |
| Expected Player Hypothesis | “I should go straight at the exit.” |
| Trigger Context | After basic Reach is fluent. |
| Discovery Type | Order / Spatial |
| Intensity | Not assigned. |
| Why It Is Fair | The false straight path fails readably. |
| Required Cues | Why the straight path fails is visible (ANTI-014 if the detour is a hidden alcove). |
| Potential Payoff | Detour becomes a legal plan. |
| Future Reuse | Later setup rooms (`DSC-008`). |
| Spoiler Risk | Do not draw an arrow away from the goal as the lesson. |
| Validated Level | none |

---

### DSC-008 — Build Before Spending

| Field | Value |
| --- | --- |
| Discovery ID | `DSC-008` |
| Name | Build Before Spending |
| Status | CANDIDATE |
| Realization | Momentum may need to be created before attempting the important traversal. |
| Previous Assumption | Movement toward the objective should begin immediately. |
| Rules Involved | R-MOTION-001; often R-PLAYER-004 or R-CONTACT-003 low |
| Interactions Involved | INT-006; INT-014 where a preserve surface is used |
| Gimmicks Involved | none required |
| Puzzle Patterns | PAT-003 Setup → Payoff; PAT-004 Build Momentum |
| Required Setup | Player already feels that speed persists and that a gap/ask needs more than a standing start. |
| Expected Player Hypothesis | “I should start toward the objective now.” |
| Trigger Context | After momentum is known. |
| Discovery Type | Setup |
| Intensity | Not assigned. |
| Why It Is Fair | The under-speed attempt fails by falling short, not by a secret rule. |
| Required Cues | Coming up short while slow is readable. |
| Potential Payoff | Runway / buildup is a tool. |
| Future Reuse | Later carry rooms. |
| Spoiler Risk | Do not mandate a lap count (ANTI-018). |
| Validated Level | none |

---

### DSC-009 — Lose Speed on Purpose

| Field | Value |
| --- | --- |
| Discovery ID | `DSC-009` |
| Name | Lose Speed on Purpose |
| Status | CANDIDATE |
| Realization | Discarding momentum can be the correct strategic action. |
| Previous Assumption | More momentum is always beneficial. |
| Rules Involved | R-MOTION-001; R-CONTACT-003 configured high when a dump surface is used |
| Interactions Involved | INT-015; INT-004 |
| Gimmicks Involved | GIM-005 when the dump is a rough surface (candidate) |
| Puzzle Patterns | PAT-005 Kill Momentum |
| Required Setup | Player has already benefited from speed, so discarding it is a reversal of a taught value. |
| Expected Player Hypothesis | “More speed is always better.” |
| Trigger Context | After `DSC-003` / build-momentum lessons, or equivalent. |
| Discovery Type | Perspective |
| Intensity | Not assigned. |
| Why It Is Fair | The overshoot from leftover speed is visible. |
| Required Cues | Too-fast failure reads as too fast. |
| Potential Payoff | Braking is a verb. |
| Future Reuse | Later precision rooms. |
| Spoiler Risk | Do not print “slow down.” |
| Validated Level | none |

---

### DSC-010 — Wall as Tool

| Field | Value |
| --- | --- |
| Discovery ID | `DSC-010` |
| Name | Wall as Tool |
| Status | CANDIDATE |
| Realization | A wall can redirect movement rather than merely prevent movement. |
| Previous Assumption | Wall = movement restriction. |
| Rules Involved | R-CONTACT-001; R-MOTION-001; R-PLAYER-005 when wall jump is the redirect |
| Interactions Involved | INT-013; INT-010 |
| Gimmicks Involved | none required |
| Puzzle Patterns | Not further specified beyond wall-as-geometry. |
| Required Setup | Solid collision and some form of rebound/wall jump are already known. |
| Expected Player Hypothesis | “Walls only block me.” |
| Trigger Context | After Wall Jump intro, or after boosted travel into solids. |
| Discovery Type | Function |
| Intensity | Not assigned. |
| Why It Is Fair | Same solids, new job. No secret clip (ANTI-019). |
| Required Cues | Contact and outbound trajectory are visible. |
| Potential Payoff | Walls are tools. |
| Future Reuse | Later redirect rooms. |
| Spoiler Risk | Do not require an unmarked seam (ANTI-014). |
| Validated Level | none |

---

### DSC-011 — Bounce Is a Resource

| Field | Value |
| --- | --- |
| Discovery ID | `DSC-011` |
| Name | Bounce Is a Resource |
| Status | CANDIDATE (signature candidate) |
| Realization | Bounce count itself can be measured and used as a puzzle resource. |
| Previous Assumption | Bouncing is merely automatic locomotion. |
| Rules Involved | R-PLAYER-001; R-STATE-003; R-INFO-001 |
| Interactions Involved | INT-005; INT-025; INT-026 |
| Gimmicks Involved | GIM-007 Bounce Counter (candidate, not committed) |
| Puzzle Patterns | PAT-011 Bounce Counting; PAT-021 Resource Allocation |
| Required Setup | Auto Bounce is stable. The count is visible before it gates a result. |
| Expected Player Hypothesis | “I just need to reach the exit.” |
| Trigger Context | After bounce identity is stable. Conceptual fit: WLD-04. Not World 1 movement school. |
| Discovery Type | System |
| Intensity | Not assigned. |
| Why It Is Fair | The count is visible. Auto Bounce already happens. No hidden rule. |
| Required Cues | `R-INFO-001` on the count whenever it matters. |
| Potential Payoff | Players spend or conserve hops. |
| Future Reuse | Later counters. Reusable knowledge. |
| Spoiler Risk | High if explained in text; low if the counter is visible. |
| Validated Level | none |

PLAY-002 has not started. Do not implement GIM-007 from this entry.

---

### DSC-012 — Waiting Is an Action

| Field | Value |
| --- | --- |
| Discovery ID | `DSC-012` |
| Name | Waiting Is an Action |
| Status | CANDIDATE |
| Realization | Choosing not to move immediately can be strategically meaningful. |
| Previous Assumption | Progress requires continuous movement. |
| Rules Involved | R-STATE-002 and/or R-SIGNAL-002 when a clock is present; R-INFO-001 |
| Interactions Involved | INT-023 when the window is a solid/passable clock |
| Gimmicks Involved | GIM-008 Timed Gate when that candidate is used |
| Puzzle Patterns | PAT-010 Timed Window |
| Required Setup | A readable cycle or window the player already understands. |
| Expected Player Hypothesis | “I must keep moving.” |
| Trigger Context | After a first timed object is taught as “go now.” |
| Discovery Type | Time |
| Intensity | Not assigned. |
| Why It Is Fair | The clock is visible. Waiting is using the known window, not an arbitrary pause (ANTI-012). |
| Required Cues | Open/closed and remaining time readable. |
| Potential Payoff | Stillness is a plan. |
| Future Reuse | Later sync and delay rooms. |
| Spoiler Risk | Do not become a reaction test (ANTI-004). |
| Validated Level | none |

---

### DSC-013 — Action Now, Result Later

| Field | Value |
| --- | --- |
| Discovery ID | `DSC-013` |
| Name | Action Now, Result Later |
| Status | CANDIDATE |
| Realization | A switch or trigger activated now may be intended for a future position/state. |
| Previous Assumption | Actions exist to solve the immediate situation. |
| Rules Involved | R-SIGNAL-001; R-SIGNAL-002; R-INFO-001 |
| Interactions Involved | INT-027 |
| Gimmicks Involved | GIM-012 Delayed Switch (candidate, not committed) |
| Puzzle Patterns | PAT-020 Delayed Consequence |
| Required Setup | Trigger and a telegraphed delay are already known as rules. Player can reach a later position during the wait. |
| Expected Player Hypothesis | “This should solve the thing in front of me.” |
| Trigger Context | After an immediate switch-door pair (`INT-022`). |
| Discovery Type | Delay |
| Intensity | Not assigned. |
| Why It Is Fair | The wait is telegraphed. The future board is inferable. |
| Required Cues | Delay telegraph; target state visible when it changes. |
| Potential Payoff | Players schedule effects. |
| Future Reuse | Later delay rooms. |
| Spoiler Risk | Hidden delay is ANTI-012. |
| Validated Level | none |

---

### DSC-014 — Opening the Door Can Be Wrong

| Field | Value |
| --- | --- |
| Discovery ID | `DSC-014` |
| Name | Opening the Door Can Be Wrong |
| Status | CANDIDATE |
| Realization | Opening a door immediately can remove something required to solve the room. |
| Previous Assumption | Door Open = Progress. |
| Rules Involved | R-STATE-001; R-CONTACT-001 |
| Interactions Involved | INT-021; INT-022 |
| Gimmicks Involved | GIM-001 Door (candidate, not committed) |
| Puzzle Patterns | PAT-008 Order Dependency; PAT-009 Order Reversal |
| Required Setup | `DSC-001` (or equivalent): closed door is already known to be a solid/wall. Opening is already known to make it passable. |
| Expected Player Hypothesis | “Door Open = Progress.” |
| Trigger Context | After door-as-wall has been available as knowledge. |
| Discovery Type | Order |
| Intensity | Not assigned. |
| Why It Is Fair | Both states were taught. The lost wall is a visible cost, not a betrayal. |
| Required Cues | What the closed door was doing must still be readable after it opens. |
| Potential Payoff | Players choose *when* to open. |
| Future Reuse | Later order rooms. |
| Spoiler Risk | Do not lock the door as a secret exception after teaching it opens (ANTI-002). |
| Validated Level | none |

---

### DSC-015 — Familiar + Familiar = New

| Field | Value |
| --- | --- |
| Discovery ID | `DSC-015` |
| Name | Familiar + Familiar = New |
| Status | CANDIDATE |
| Realization | Two already-understood mechanics can combine into a new capability. |
| Previous Assumption | Known gimmicks are understood independently. |
| Rules Involved | At least two already-taught rules or interactions. No new rule. |
| Interactions Involved | The specific pair is room-defined. Example already named: INT-016 (force then low friction). Do not treat that example as the only pair. |
| Gimmicks Involved | Prefer already-introduced candidates. |
| Puzzle Patterns | PAT-017 Combination Discovery |
| Required Setup | Each half has been taught alone. |
| Expected Player Hypothesis | “I use one tool at a time.” |
| Trigger Context | After two first faces exist. Structural World 1 seed: LVL-W01-011. |
| Discovery Type | Combination |
| Intensity | Not assigned. |
| Why It Is Fair | No new gimmick is the solution (ANTI-020). The combo is predictable from known rules. |
| Required Cues | Each half working alone should stall readably. |
| Potential Payoff | Combination becomes a habit. |
| Future Reuse | Mastery worlds. |
| Spoiler Risk | ANTI-011 if untaught parts are dumped in. |
| Validated Level | none |

---

### DSC-016 — Apparent Failure Can Be Setup

| Field | Value |
| --- | --- |
| Discovery ID | `DSC-016` |
| Name | Apparent Failure Can Be Setup |
| Status | CANDIDATE |
| Realization | A fall, block, or apparent setback can intentionally create the next useful state or route. |
| Previous Assumption | Moving away/downward or becoming blocked always means failure. |
| Rules Involved | Already-taught PLAYER / CONTACT / STATE rules. No new rule. |
| Interactions Involved | Not uniquely bound to one INT. |
| Gimmicks Involved | none required |
| Puzzle Patterns | PAT-019 Controlled Failure |
| Required Setup | The “failure” uses ordinary rules and leaves a readable next state. |
| Expected Player Hypothesis | “Down / blocked / miss = I failed.” |
| Trigger Context | Weak seed: LVL-W03-011 (apparent unproductive rebound as setup). Payoff: LVL-W05-004. Do not declare realized in W3. |
| Discovery Type | Perspective |
| Intensity | Not assigned. |
| Why It Is Fair | The intended miss is easy to perform on purpose and does not depend on an exploit (ANTI-019). |
| Required Cues | Accidental vs intended miss becomes distinguishable after learning. |
| Potential Payoff | Controlled failure is a setup (`PAT-003`). |
| Future Reuse | Later reinterpret rooms. |
| Spoiler Risk | Solution-by-accident if the first clear cannot be repeated (ANTI-015). |
| Validated Level | none |

---

### DSC-017 — Entry Velocity Changes the Space

| Field | Value |
| --- | --- |
| Discovery ID | `DSC-017` |
| Name | Entry Velocity Changes the Space |
| Status | CANDIDATE (signature candidate) |
| Realization | The same physical location creates different possibilities depending on the velocity with which the player enters it. |
| Previous Assumption | If the position is the same, the situation is essentially the same. |
| Rules Involved | R-MOTION-001; R-CONTACT-001 |
| Interactions Involved | INT-013; INT-006 |
| Gimmicks Involved | none required |
| Puzzle Patterns | PAT-015 Reinterpret Space; PAT-004; PAT-005 |
| Required Setup | Unchanged geometry; two approach speeds; two readable outcomes. Momentum is already felt. |
| Expected Player Hypothesis | “I am in the right spot, so it should work.” |
| Trigger Context | After Momentum is felt. Candidate World 1 mastery or later WLD-02 / WLD-05. |
| Discovery Type | Physics |
| Intensity | Not assigned. Do not inflate to D3 by default. D3 remains rare. |
| Why It Is Fair | Rules stay the same (C-01). Only motion state changes. The difference is visible. |
| Required Cues | Speed readable; outcome attributable to speed. |
| Potential Payoff | Approach speed is a verb. |
| Future Reuse | Any later entry-state room. |
| Spoiler Risk | Naming “speed gates” in text flattens it (ANTI-016). |
| Validated Level | none |

---

### DSC-018 — Same Object, Different Role

| Field | Value |
| --- | --- |
| Discovery ID | `DSC-018` |
| Name | Same Object, Different Role |
| Status | CANDIDATE |
| Realization | An object's useful role can change according to its current state. |
| Previous Assumption | Each object has one primary fixed function. |
| Rules Involved | R-STATE-001; R-INFO-001 |
| Interactions Involved | INT-021; INT-018; INT-019; INT-026 where count writes state |
| Gimmicks Involved | Any important gimmick that has more than one face (C-07). Door is the named door example (`GIM-001`). |
| Puzzle Patterns | PAT-014 Reinterpret Object |
| Required Setup | First face already taught. State change is visible (`INT-028`). |
| Expected Player Hypothesis | “This object always does the same job.” |
| Trigger Context | After first-face intro of the object. |
| Discovery Type | State |
| Intensity | Not assigned. |
| Why It Is Fair | The new role is the same object under a known state, not a swapped prop. |
| Required Cues | Current state visible before the new role is required. |
| Potential Payoff | C-07 becomes player knowledge. |
| Future Reuse | Later second-face rooms. |
| Spoiler Risk | One-face important gimmicks (ANTI-009) cannot host this fairly. |
| Validated Level | none |

---

## Scope boundary

Current development stage: **PLAY-001B — Dynamic Movement Pass**.

PLAY-002 has **not** started.

Do not implement candidate gimmicks or levels from these discoveries.

Do not add DSC-019+ in this pass.

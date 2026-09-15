# Rule Library

Rules are the stable identities of FunkyDodge.

> Rule identity should remain stable while parameters may be tuned.

Do not create a new rule merely because a parameter changes.

Anti-Patterns validate this layer. Constitution C-01 applies: under identical relevant conditions, rules produce consistent results.

---

## Schema

```text
Rule ID
Name
Family
Status

Definition
Parameters
Applies To

Player-readable Cue

Interactions
Constraints

Design Purpose
Discovery Potential
```

IDs are permanent. Deprecated rules keep their ID.

---

## Families

| Family | Prefix | Scope |
| --- | --- | --- |
| WORLD | `R-WORLD-` | Conditions of the space |
| PLAYER | `R-PLAYER-` | What the player is and can do |
| MOTION | `R-MOTION-` | How velocity changes over time |
| CONTACT | `R-CONTACT-` | What happens at surfaces |
| FORCE | `R-FORCE-` | External or instantaneous pushes |
| STATE | `R-STATE-` | Persistent or timed object state |
| SIGNAL | `R-SIGNAL-` | Events that fire and propagate |
| INFO | `R-INFO-` | What the player is allowed to know |

---

## Status notes (PLAY-001B)

Current development stage: **PLAY-001B — Dynamic Movement Pass**.

- Gravity, Auto Bounce, and Directional Control are **CORE candidates**. They are not `CORE`.
- Low Bounce, Landing Boost, and Wall Jump are `EXPERIMENTAL`.
- Do not mark those three `CORE`.
- Do not freeze movement parameter values as design law. Named parameters below are knobs, not constitutional numbers.
- PLAY-001B is still tuning movement feel.

`CORE` requires explicit design approval after playtest evidence. Implementation alone is not enough.

---

## Index

| ID | Name | Family | Status |
| --- | --- | --- | --- |
| R-WORLD-001 | Gravity | WORLD | CANDIDATE (CORE candidate) |
| R-PLAYER-001 | Auto Bounce | PLAYER | CANDIDATE (CORE candidate) |
| R-PLAYER-002 | Directional Control | PLAYER | CANDIDATE (CORE candidate) |
| R-PLAYER-003 | Low Bounce | PLAYER | EXPERIMENTAL |
| R-PLAYER-004 | Landing Boost | PLAYER | EXPERIMENTAL |
| R-PLAYER-005 | Wall Jump | PLAYER | EXPERIMENTAL |
| R-MOTION-001 | Momentum | MOTION | EXPERIMENTAL |
| R-MOTION-002 | Acceleration | MOTION | EXPERIMENTAL |
| R-MOTION-003 | Velocity Limit | MOTION | EXPERIMENTAL |
| R-CONTACT-001 | Solid Collision | CONTACT | EXPERIMENTAL |
| R-CONTACT-002 | Restitution | CONTACT | CANDIDATE |
| R-CONTACT-003 | Friction | CONTACT | CANDIDATE |
| R-FORCE-001 | Directional Force | FORCE | CANDIDATE |
| R-FORCE-002 | Impulse | FORCE | EXPERIMENTAL |
| R-STATE-001 | Binary State | STATE | CANDIDATE |
| R-STATE-002 | Timed State | STATE | CANDIDATE |
| R-STATE-003 | Counter | STATE | CANDIDATE |
| R-SIGNAL-001 | Trigger | SIGNAL | CANDIDATE |
| R-SIGNAL-002 | Delay | SIGNAL | CANDIDATE |
| R-INFO-001 | Visible State | INFO | CANDIDATE |

---

## WORLD

### R-WORLD-001 — Gravity

| Field | Value |
| --- | --- |
| Rule ID | `R-WORLD-001` |
| Name | Gravity |
| Family | WORLD |
| Status | CANDIDATE (CORE candidate; not `CORE`) |

**Definition**  
A constant downward acceleration acts on the player unless a later approved rule says otherwise. It is always on under identical conditions.

**Parameters**  
- `gravity` — downward acceleration magnitude. Tunable. Not design law.

**Applies To**  
Player body. Future objects only if a later approved rule says they share this world condition.

**Player-readable Cue**  
The ball falls when unsupported. Apex and hang time are visible.

**Interactions**  
Combines with Auto Bounce to produce a repeating vertical cycle. Combines with Momentum and Acceleration during flight.

**Constraints**  
C-01: do not secretly change gravity for a single room. A local gravity gimmick, if ever approved, would be a new application or variation — not a silent exception.

**Design Purpose**  
Give bounce a world to exist in. Make height, hang time, and landing predictable.

**Discovery Potential**  
Low as a standalone fact. High when the player uses hang time, apex, or fall speed as a tool.

---

## PLAYER

### R-PLAYER-001 — Auto Bounce

| Field | Value |
| --- | --- |
| Rule ID | `R-PLAYER-001` |
| Name | Auto Bounce |
| Family | PLAYER |
| Status | CANDIDATE (CORE candidate; not `CORE`) |

**Definition**  
On valid floor contact, the player automatically leaves the surface with an upward velocity. The player does not jump. Bounce is identity (C-04).

Current playground implementation applies an explicit upward velocity on contact. That is an implementation of this rule, not a second rule.

**Parameters**  
- `bounceVelocity` — default takeoff speed. Tunable. Not design law.

**Applies To**  
Player, on floor contact that qualifies as a bounce.

**Player-readable Cue**  
The ball leaves the floor by itself. There is no jump button.

**Interactions**  
Landing intent selects Low Bounce or Landing Boost as variations of this bounce, not replacements for it. See R-PLAYER-003 and R-PLAYER-004.

**Constraints**  
Do not add a conventional jump button. Do not silently disable bounce in a room that still presents as the same bounce world. Do not treat surface restitution (`R-CONTACT-002`) as this rule.

**Design Purpose**  
Establish FunkyDodge's movement identity. All later movement depth should hang off this cycle.

**Discovery Potential**  
The fact of bouncing is D0. What bounce *can do* is the rest of the game.

---

### R-PLAYER-002 — Directional Control

| Field | Value |
| --- | --- |
| Rule ID | `R-PLAYER-002` |
| Name | Directional Control |
| Family | PLAYER |
| Status | CANDIDATE (CORE candidate; not `CORE`) |

**Definition**  
The player steers with LEFT and RIGHT only. Depth comes from physics, timing, and rule interaction, not extra buttons (C-03).

**Parameters**  
None that define the rule. How strongly a press changes velocity belongs to Acceleration, Impulse, and Velocity Limit.

**Applies To**  
Player input. Restart is a session control, not a movement rule.

**Player-readable Cue**  
← / → (or A / D) change horizontal intent. No other movement keys.

**Interactions**  
Intent at landing selects bounce variation. Intent at a wall selects Wall Jump. Intent in air changes horizontal velocity through Acceleration and Impulse.

**Constraints**  
Do not add jump, dash, or crouch buttons to create depth. New verbs must first be evaluated as applications or combinations of existing rules (C-05).

**Design Purpose**  
Keep the input language small enough that every new outcome feels like a discovery about the world, not a new key.

**Discovery Potential**  
The buttons are obvious. What they mean at the moment of contact is not.

---

### R-PLAYER-003 — Low Bounce

| Field | Value |
| --- | --- |
| Rule ID | `R-PLAYER-003` |
| Name | Low Bounce |
| Family | PLAYER |
| Status | EXPERIMENTAL |

**Definition**  
A landing with a fresh directional press produces a shorter bounce. This is a variation of Auto Bounce, not a separate bounce species.

Current playground classification: fresh tap near landing → LOW. Exact window is a tunable parameter, not design law.

**Parameters**  
- low-bounce window  
- low-bounce height multiplier  
- optional takeoff horizontal minimum multiplier  

Values are implementation knobs. Do not freeze them here.

**Applies To**  
Player floor bounce when landing intent is a fresh press.

**Player-readable Cue**  
A late tap at the floor yields a visibly shorter hop. Playground tint is an implementation aid, not a locked visual language.

**Interactions**  
Competes with Landing Boost at the same contact moment. Intent classification decides; both are not applied at once. Related to DSC-005 and DSC-006.

**Constraints**  
Must remain a readable variation of Auto Bounce. Must not become a second jump button. Priority vs Boost is intent, not an arbitrary override.

**Design Purpose**  
Give the player a way to stay low, pass under constraints, and start routes that a full bounce would miss.

**Discovery Potential**  
High. Players may assume higher is always better (DSC-005). Low Bounce can begin a stronger route (DSC-006).

---

### R-PLAYER-004 — Landing Boost

| Field | Value |
| --- | --- |
| Rule ID | `R-PLAYER-004` |
| Name | Landing Boost |
| Family | PLAYER |
| Status | EXPERIMENTAL |

**Definition**  
A landing with sustained directional hold from before the fresh-press window produces extra horizontal carry on takeoff. Vertical bounce remains Auto Bounce unless a later approved rule says otherwise.

Current playground classification: sustained hold → BOOST. Multipliers and windows are tunable.

**Parameters**  
- hold-vs-fresh classification window  
- horizontal boost multiplier / cap behavior  

Do not freeze values here.

**Applies To**  
Player floor bounce when landing intent is a hold.

**Player-readable Cue**  
Holding through the landing carries farther than a neutral bounce. Exact VFX is not locked.

**Interactions**  
Competes with Low Bounce at the same contact. Combines with Momentum and Velocity Limit. World 1 candidate rooms contrast LOW vs BOOST (LVL-W01-008).

**Constraints**  
Must be predictable from hold vs tap. Must not secretly apply in some rooms and not others. Must not require frame-perfect timing (ANTI-003).

**Design Purpose**  
Reward planned horizontal commitment. Make distance a function of understood intent, not a new button.

**Discovery Potential**  
Medium–high. The hold is visible; that it is the *other* landing grammar beside Low Bounce is the lesson.

---

### R-PLAYER-005 — Wall Jump

| Field | Value |
| --- | --- |
| Rule ID | `R-PLAYER-005` |
| Name | Wall Jump |
| Family | PLAYER |
| Status | EXPERIMENTAL |

**Definition**  
Contact with a wall plus directional intent away from that wall produces a bounce that leaves up and away. This is Auto Bounce applied to a wall, not a conventional jump button.

**Parameters**  
- wall input buffer  
- outbound horizontal velocity  
- outbound vertical velocity  

Tunable. Not design law. Direction must remain up and away.

**Applies To**  
Player, on wall contact with opposing horizontal intent.

**Player-readable Cue**  
Pressing away from a touched wall sends the ball up and off the wall.

**Interactions**  
Requires Solid Collision. Uses Directional Control. Combines with Momentum for the next arc.

**Constraints**  
Must not send the player downward. Must not work without readable wall contact. Must not become a second jump button in open air. Still EXPERIMENTAL; do not mark `CORE`.

**Design Purpose**  
Extend bounce identity onto vertical surfaces so walls are tools, not only blockers.

**Discovery Potential**  
Medium. The first wall bounce is a lesson; later reuse is the test.

---

## MOTION

### R-MOTION-001 — Momentum

| Field | Value |
| --- | --- |
| Rule ID | `R-MOTION-001` |
| Name | Momentum |
| Family | MOTION |
| Status | EXPERIMENTAL |

**Definition**  
Horizontal velocity persists across air time and bounce unless another rule removes or redirects it. Movement is not a digital snap to a facing speed.

**Parameters**  
Persistence is the rule. How fast velocity decays belongs to Friction / drag configurations.

**Applies To**  
Player velocity. Future movable objects only if approved.

**Player-readable Cue**  
The ball keeps going after the key is released. Reversing takes time.

**Interactions**  
Build Momentum (PAT-004) and Kill Momentum (PAT-005) are patterns over this rule. Entry velocity can change how a place behaves (DSC-017).

**Constraints**  
Do not silently zero velocity on bounce unless a named rule says so. Do not treat “this room needs a stop” as a secret exception (C-01).

**Design Purpose**  
Make planning about the current speed, not only the current button.

**Discovery Potential**  
High. Same space, different entry speed, different outcome.

---

### R-MOTION-002 — Acceleration

| Field | Value |
| --- | --- |
| Rule ID | `R-MOTION-002` |
| Name | Acceleration |
| Family | MOTION |
| Status | EXPERIMENTAL |

**Definition**  
While a direction is held, horizontal velocity changes over time toward that intent. Ground, air, and air-reverse may use different parameter values of the same rule.

**Parameters**  
- ground acceleration  
- air acceleration  
- air-reverse acceleration  

Configurations of one rule. Not three rules. Values are not design law.

**Applies To**  
Player, while Directional Control is held.

**Player-readable Cue**  
Holding a direction speeds the ball up gradually. Reversing in air is slower to complete than tapping the new side.

**Interactions**  
Works with Impulse (press) then Acceleration (hold). Capped by Velocity Limit.

**Constraints**  
Do not snap to max speed as the identity of this rule. Parameter splits (air vs ground) stay configurations.

**Design Purpose**  
Make control feel physical. Give the player a reason to hold, not only tap.

**Discovery Potential**  
Useful and mostly expected (discovery potential 1) until combined with bounce timing.

---

### R-MOTION-003 — Velocity Limit

| Field | Value |
| --- | --- |
| Rule ID | `R-MOTION-003` |
| Name | Velocity Limit |
| Family | MOTION |
| Status | EXPERIMENTAL |

**Definition**  
Horizontal speed is capped. A boost may use a different cap. That is a configuration of this rule, not a second speed rule.

**Parameters**  
- max horizontal speed  
- optional boosted cap  

Tunable. Not design law.

**Applies To**  
Player horizontal velocity.

**Player-readable Cue**  
The ball stops gaining speed after a point.

**Interactions**  
Landing Boost may raise the effective cap. Impulse and Acceleration cannot exceed the active cap.

**Constraints**  
Do not secretly raise or remove the cap in one room. A visible wind or boost that changes the cap must be a named configuration, not a lie.

**Design Purpose**  
Keep execution readable and prevent runaway speed from becoming the skill test (C-02).

**Discovery Potential**  
Low alone. Medium when the player learns a boost uses a different cap.

---

## CONTACT

### R-CONTACT-001 — Solid Collision

| Field | Value |
| --- | --- |
| Rule ID | `R-CONTACT-001` |
| Name | Solid Collision |
| Family | CONTACT |
| Status | EXPERIMENTAL |

**Definition**  
Solid surfaces stop penetration. Floors, walls, and ceilings are the same rule with different normals.

**Parameters**  
Collision shape / skin. Implementation detail, not a new rule.

**Applies To**  
Player vs solid geometry. Future solids if approved.

**Player-readable Cue**  
The ball does not pass through painted solids.

**Interactions**  
Floor contact triggers Auto Bounce. Wall contact can trigger Wall Jump. Ceiling contact interrupts the upward arc.

**Constraints**  
Solids must look solid. One-way surfaces, if approved, are a gimmick embodying a variation — not a silent hole in this rule (see GIM-011).

**Design Purpose**  
Define the board. Make space readable.

**Discovery Potential**  
Engine-level (0) until a surface is reinterpreted (PAT-015, GIM-011).

---

### R-CONTACT-002 — Restitution

| Field | Value |
| --- | --- |
| Rule ID | `R-CONTACT-002` |
| Name | Restitution |
| Family | CONTACT |
| Status | CANDIDATE |

**Definition**  
A surface may return contact energy according to a restitution parameter. This is **not** Auto Bounce.

Auto Bounce is a player rule implemented with explicit takeoff velocity. Restitution is a contact-family parameter for surfaces that need bounciness as a configuration.

**Parameters**  
- restitution coefficient  

Low / high restitution = configurations, not new rules.

**Applies To**  
Surfaces that opt into this rule. Not automatically the player bounce.

**Player-readable Cue**  
If used, the surface must look like it returns energy differently from ordinary solids.

**Interactions**  
Must not silently replace or cancel Auto Bounce. Springs (GIM-006) should be evaluated as Impulse / bounce variation before inventing a new restitution species (C-05).

**Constraints**  
Do not create “sticky bounce” and “super bounce” as two rules if they are one parameter. Do not hide restitution changes (C-06, ANTI-001).

**Design Purpose**  
Allow surface bounce-back as a tunable contact property without forking Auto Bounce.

**Discovery Potential**  
Depends on whether a future gimmick makes restitution a player decision. Unassigned until then.

---

### R-CONTACT-003 — Friction

| Field | Value |
| --- | --- |
| Rule ID | `R-CONTACT-003` |
| Name | Friction | 
| Family | CONTACT |
| Status | CANDIDATE |

**Definition**  
Contact (or travel) can remove or preserve horizontal speed. Low friction and high friction are configurations of this rule.

Ice (GIM-004) and Rough Surface (GIM-005) are candidate gimmick embodiments, not separate friction rules.

**Parameters**  
- friction / drag magnitude  

The playground drag knob is an implementation value, not design law.

**Applies To**  
Surfaces or travel states that opt in.

**Player-readable Cue**  
The surface must read as slick or grabby before it changes speed.

**Interactions**  
Kill Momentum / Build Momentum patterns. Must remain predictable from Visible State.

**Constraints**  
Do not invent a new rule for each friction number. Do not apply invisible friction (ANTI-001).

**Design Purpose**  
Let the same motion rules feel different on different ground without adding buttons.

**Discovery Potential**  
High once players treat friction as a tool, not only a hazard.

---

## FORCE

### R-FORCE-001 — Directional Force

| Field | Value |
| --- | --- |
| Rule ID | `R-FORCE-001` |
| Name | Directional Force |
| Family | FORCE |
| Status | CANDIDATE |

**Definition**  
A region or object applies a continuous push in a direction. Wind (GIM-003) is a candidate embodiment.

This is not player Acceleration. Acceleration is the player's held-input rule. Directional Force is external.

**Parameters**  
- direction  
- magnitude  

**Applies To**  
Volumes or objects that opt in. Not implemented in PLAY-001B.

**Player-readable Cue**  
The force must be visible (R-INFO-001) before it matters.

**Interactions**  
Adds to Momentum. May fight or help Directional Control. Must not secretly change Auto Bounce.

**Constraints**  
PLAY-002 has not started. Do not implement candidate wind from this entry.

**Design Purpose**  
Change motion without adding a player button.

**Discovery Potential**  
Medium–high when the same wind is help and hindrance (C-07).

---

### R-FORCE-002 — Impulse

| Field | Value |
| --- | --- |
| Rule ID | `R-FORCE-002` |
| Name | Impulse |
| Family | FORCE |
| Status | EXPERIMENTAL |

**Definition**  
An instantaneous change in velocity. Distinct from continuous Acceleration and continuous Directional Force.

Current playground: a direction press applies a horizontal impulse, then Acceleration continues. That is a configuration of Impulse + Acceleration, not a new rule.

A future Spring (GIM-006) would be evaluated as this rule (or Auto Bounce variation) before inventing a new species.

**Parameters**  
- press impulse  
- air-reverse press impulse  
- any future contact impulse  

Configurations. Values are not design law.

**Applies To**  
Player input (current). Surfaces / objects (candidate).

**Player-readable Cue**  
A tap changes speed immediately; a hold continues to accelerate.

**Interactions**  
Landing intent uses press timing. Combined with Velocity Limit.

**Constraints**  
Do not split “ground impulse” and “air impulse” into two rules.

**Design Purpose**  
Make a tap feel different from a hold without adding buttons.

**Discovery Potential**  
Medium once players notice tap-at-contact vs hold-at-contact.

---

## STATE

These families exist so gimmicks can embody them. They are not a commitment to implement PLAY-002 objects.

### R-STATE-001 — Binary State

| Field | Value |
| --- | --- |
| Rule ID | `R-STATE-001` |
| Name | Binary State |
| Family | STATE |
| Status | CANDIDATE |

**Definition**  
A thing is in one of two named states (open/closed, on/off). It does not invent extra hidden modes.

**Parameters**  
The two state names. Default state.

**Applies To**  
Candidate gimmicks such as Door and Switch. Not implemented.

**Player-readable Cue**  
The current state must be visible (R-INFO-001).

**Interactions**  
Triggers flip or set this state. Timed State and Counter are other state shapes, not subtypes of Binary State.

**Constraints**  
Do not add a third silent state. Do not change what a state means mid-room (C-01).

**Design Purpose**  
Let objects remember a choice the player already understands.

**Discovery Potential**  
Low as a fact. High when the same state is used for a second face (C-07).

---

### R-STATE-002 — Timed State

| Field | Value |
| --- | --- |
| Rule ID | `R-STATE-002` |
| Name | Timed State |
| Family | STATE |
| Status | CANDIDATE |

**Definition**  
A state lasts for a duration, then ends or reverts by a known clock.

**Parameters**  
- duration  

Duration changes are configurations, not new rules.

**Applies To**  
Candidate Timed Gate and similar. Not implemented.

**Player-readable Cue**  
The remaining time, or an equivalent readable clock, must be available (ANTI-012 if not).

**Interactions**  
Often started by a Trigger. Combines with Delay when the start is postponed.

**Constraints**  
Do not use invisible timers as the puzzle. PLAY-002 has not started.

**Design Purpose**  
Ask *when* to act (WLD-04) without adding buttons.

**Discovery Potential**  
Medium. High if the player must choose to spend the window on a detour (PAT-018).

---

### R-STATE-003 — Counter

| Field | Value |
| --- | --- |
| Rule ID | `R-STATE-003` |
| Name | Counter |
| Family | STATE |
| Status | CANDIDATE |

**Definition**  
A visible integer that increments or decrements on a known event, then may fire a threshold.

**Parameters**  
- threshold  
- step  

**Applies To**  
Candidate Bounce Counter (GIM-007). Not implemented.

**Player-readable Cue**  
The count must be visible (R-INFO-001). Related to DSC-011.

**Interactions**  
Auto Bounce can be the event that increments. Threshold may Trigger a state change.

**Constraints**  
Counting must be fair and readable. Do not hide the count (ANTI-001). Do not make the solution luck (ANTI-005).

**Design Purpose**  
Turn bounce itself into a resource.

**Discovery Potential**  
High (DSC-011).

---

## SIGNAL

### R-SIGNAL-001 — Trigger

| Field | Value |
| --- | --- |
| Rule ID | `R-SIGNAL-001` |
| Name | Trigger |
| Family | SIGNAL |
| Status | CANDIDATE |

**Definition**  
When a known condition becomes true, a signal fires once or while held, according to a published rule.

**Parameters**  
- edge vs level  
- what condition counts  

**Applies To**  
Candidate Switch, Force Switch, pressure, or volume. Not implemented.

**Player-readable Cue**  
The triggerable object and its effect must be readable, immediately or after a published Delay.

**Interactions**  
Usually writes Binary State or starts Timed State. Delay can postpone the fire.

**Constraints**  
The condition must be learnable. Do not trigger from hidden geometry (ANTI-014).

**Design Purpose**  
Connect player action to world change without new buttons.

**Discovery Potential**  
Depends on the condition. “Touch switch” is expected; “velocity-gated switch” is a discovery.

---

### R-SIGNAL-002 — Delay

| Field | Value |
| --- | --- |
| Rule ID | `R-SIGNAL-002` |
| Name | Delay |
| Family | SIGNAL |
| Status | CANDIDATE |

**Definition**  
A signal waits a known time after its cause, then fires. Delayed Switch (GIM-012) is a candidate embodiment.

**Parameters**  
- delay duration  

**Applies To**  
Candidate delayed devices. Not implemented.

**Player-readable Cue**  
The wait must be telegraphed. Arbitrary unreadable delay is ANTI-012.

**Interactions**  
Always paired with a Trigger or state change. Enables PAT-020 Delayed Consequence.

**Constraints**  
PLAY-002 has not started. Do not implement from this entry.

**Design Purpose**  
Separate cause from effect so the player must plan across time.

**Discovery Potential**  
High when the player uses the wait as a tool, not only suffers it.

---

## INFO

### R-INFO-001 — Visible State

| Field | Value |
| --- | --- |
| Rule ID | `R-INFO-001` |
| Name | Visible State |
| Family | INFO |
| Status | CANDIDATE |

**Definition**  
If a state, timer, count, force, or surface property matters to a decision, the player can see it (or an equivalent fair cue) before the decision is required.

This is the information rule that C-06 and ANTI-001 enforce.

**Parameters**  
Cue channel (visual, audio). Channel is presentation, not a new rule.

**Applies To**  
Every gimmick and state that affects a choice.

**Player-readable Cue**  
The cue *is* the rule.

**Interactions**  
Required by Binary State, Timed State, Counter, Trigger, Delay, Friction, Directional Force.

**Constraints**  
Surprise comes from possibility, not from hiding the board (C-06).

**Design Purpose**  
Make discovery fair. Failure should teach (ANTI-PATTERN principle).

**Discovery Potential**  
0 as engine fairness. Unlocks every other discovery by making it attributable.

---

## Reserved / out of scope

- Do not add rule IDs in this bootstrap beyond the table above.
- Do not record PLAY-001B `PhysicsConfig` numbers as required values.
- Do not implement STATE / SIGNAL gimmicks from these definitions. PLAY-002 has not started.

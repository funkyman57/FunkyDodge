# Interaction Library

Interactions are what happens when named rules combine.

They do not invent silent extra rules. If a result cannot be predicted from the listed rules, it is not an interaction — it is a new rule or a rule betrayal (ANTI-002).

> Do not treat parameter configurations as independent rules.

Low friction and high friction are configurations of `R-CONTACT-003`, not separate rules.

Anti-Patterns validate this layer.

---

## Registration principle

The Interaction Library does **not** attempt to record every physically possible engine interaction.

Record interactions that meaningfully affect player decisions and have reusable puzzle/discovery value.

Registration criteria — normally require at least three YES answers:

1. Does it change a player decision?
2. Is it predictable from known rules?
3. Is it reusable?
4. Does it have discovery potential?

PLAY-001B engine couplings (gravity cycle, landing-intent classification, press impulse then acceleration) stay in the movement rules. They are not extra Interaction IDs.

---

## Schema

```text
Interaction ID
Name
Status

Rule A
Rule B

Result
Preconditions
Priority / Conflict Resolution

Player Cue
Discovery Potential

Design Uses
Test Case
```

`Rule A` / `Rule B` name the primary pair. A friction configuration is a parameter of `R-CONTACT-003`, not a third rule.

---

## Discovery Potential

```text
DP0 — engine-level only
DP1 — useful but expected
DP2 — puzzle-capable
DP3 — strong Aha/discovery potential
```

| Score | Meaning |
| --- | --- |
| DP0 | Engine-level only |
| DP1 | Useful but expected |
| DP2 | Puzzle-capable |
| DP3 | Strong Aha/discovery potential |

---

## Second Face

> Second Face applies to interactions as well as gimmicks.

Strong interactions should ideally support more than one meaningful application.

Example: Directional Force × Auto Bounce (`INT-001`) can support:

1. moving the player toward a destination
2. increasing/decreasing airtime
3. headwind intentionally reducing horizontal momentum

Do not turn each application into a separate Interaction ID unless its underlying rule relationship is materially different.

`INT-018` (force enabled/disabled by state) and `INT-019` (force *direction* changed by state) are different relationships. They keep separate IDs.

Do not create a State Toggle rule. Binary State may control a parameter of Directional Force (`INT-019`).

---

## Status

Imported entries are `CANDIDATE`.

Do not infer `EXPERIMENTAL`, `VALIDATED`, or `CORE` from this document. PLAY-001B implementation of movement feel does not validate a puzzle interaction.

Official lifecycle only:

`IDEA` → `CANDIDATE` → `EXPERIMENTAL` → `VALIDATED` → `CORE`, plus `DEPRECATED`.

---

## Index

| ID | Name | Status | DP |
| --- | --- | --- | --- |
| INT-001 | Auto Bounce × Directional Force | CANDIDATE | DP2 |
| INT-002 | Auto Bounce × Impulse | CANDIDATE | DP2 |
| INT-003 | Auto Bounce × Low Friction | CANDIDATE | DP2 |
| INT-004 | Auto Bounce × High Friction | CANDIDATE | DP2 |
| INT-005 | Auto Bounce × Counter | CANDIDATE | DP3 |
| INT-006 | Directional Control × Momentum | CANDIDATE | DP2 |
| INT-007 | Low Bounce × Solid Collision | CANDIDATE | DP2 |
| INT-008 | Low Bounce × Momentum | CANDIDATE | DP3 |
| INT-009 | Landing Boost × Low Friction | CANDIDATE | DP3 |
| INT-010 | Landing Boost × Solid Collision | CANDIDATE | DP3 |
| INT-011 | Wall Jump × Directional Force | CANDIDATE | DP2 |
| INT-012 | Wall Jump × Counter | CANDIDATE | DP2 |
| INT-013 | Momentum × Solid Collision | CANDIDATE | DP3 |
| INT-014 | Momentum × Low Friction | CANDIDATE | DP2 |
| INT-015 | Momentum × High Friction | CANDIDATE | DP3 |
| INT-016 | Directional Force × Low Friction | CANDIDATE | DP3 |
| INT-017 | Directional Force × Momentum | CANDIDATE | DP2 |
| INT-018 | Directional Force × Binary State | CANDIDATE | DP2 |
| INT-019 | Directional Force × Stateful Direction | CANDIDATE | DP3 |
| INT-020 | Impulse × Low Friction | CANDIDATE | DP2 |
| INT-021 | Binary State × Solid Collision | CANDIDATE | DP2 |
| INT-022 | Binary State × Trigger | CANDIDATE | DP2 |
| INT-023 | Timed State × Solid Collision | CANDIDATE | DP2 |
| INT-024 | Timed State × Directional Force | CANDIDATE | DP2 |
| INT-025 | Counter × Trigger | CANDIDATE | DP3 |
| INT-026 | Counter × Binary State | CANDIDATE | DP3 |
| INT-027 | Trigger × Delay | CANDIDATE | DP3 |
| INT-028 | Visible State × Binary State | CANDIDATE | DP1 |

---

### INT-001 — Auto Bounce × Directional Force

| Field | Value |
| --- | --- |
| Interaction ID | `INT-001` |
| Name | Auto Bounce × Directional Force |
| Status | CANDIDATE |
| Rule A | R-PLAYER-001 Auto Bounce |
| Rule B | R-FORCE-001 Directional Force |
| Result | External continuous force bends the player's bounce trajectory. |
| Preconditions | Auto Bounce cycle active; player is inside or leaving a force region. |
| Priority / Conflict Resolution | Force does not replace Auto Bounce. It bends the existing arc. |
| Player Cue | Force presence and direction must be visible before they matter (`R-INFO-001`). |
| Discovery Potential | DP2 |
| Design Uses | Wind-assisted traversal; trajectory correction; airtime manipulation. Second Face: tailwind, airtime change, or headwind that reduces horizontal momentum (`DSC-002`). |
| Test Case | Not specified. PLAY-002 has not started. |

Candidate embodiment: GIM-003 Wind.

---

### INT-002 — Auto Bounce × Impulse

| Field | Value |
| --- | --- |
| Interaction ID | `INT-002` |
| Name | Auto Bounce × Impulse |
| Status | CANDIDATE |
| Rule A | R-PLAYER-001 Auto Bounce |
| Rule B | R-FORCE-002 Impulse |
| Result | A contact or event can launch the bouncing player into an unusual trajectory. |
| Preconditions | A bounce cycle and an impulse event coincide or chain. |
| Priority / Conflict Resolution | Impulse adds a discrete velocity change. It does not become a jump button (C-04). |
| Player Cue | The impulse source must look launch-capable before use. |
| Discovery Potential | DP2 |
| Design Uses | Not further specified. |
| Test Case | Not specified. PLAY-002 has not started. |

Candidate embodiment: GIM-006 Spring, after C-05 checks.

---

### INT-003 — Auto Bounce × Low Friction

| Field | Value |
| --- | --- |
| Interaction ID | `INT-003` |
| Name | Auto Bounce × Low Friction |
| Status | CANDIDATE |
| Rule A | R-PLAYER-001 Auto Bounce |
| Rule B | R-CONTACT-003 Friction configured **low** |
| Result | Horizontal momentum is preserved strongly across landing/bounce. |
| Preconditions | Bounce lands on (or leaves) a low-friction surface. |
| Priority / Conflict Resolution | Same friction rule as `INT-004`. Configuration differs; do not fork a new rule. |
| Player Cue | Surface must read as slick before it preserves speed. |
| Discovery Potential | DP2 |
| Design Uses | Momentum storage across bounces (`DSC-003`). |
| Test Case | Not specified. PLAY-002 has not started. |

Candidate embodiment: GIM-004 Ice.

---

### INT-004 — Auto Bounce × High Friction

| Field | Value |
| --- | --- |
| Interaction ID | `INT-004` |
| Name | Auto Bounce × High Friction |
| Status | CANDIDATE |
| Rule A | R-PLAYER-001 Auto Bounce |
| Rule B | R-CONTACT-003 Friction configured **high** |
| Result | Landing strongly removes horizontal momentum. |
| Preconditions | Bounce lands on a high-friction surface. |
| Priority / Conflict Resolution | Same friction rule as `INT-003`. Configuration differs. |
| Player Cue | Surface must read as grabby before it dumps speed. |
| Discovery Potential | DP2 |
| Design Uses | Intentional stop on landing (`DSC-004`). |
| Test Case | Not specified. PLAY-002 has not started. |

Candidate embodiment: GIM-005 Rough Surface.

---

### INT-005 — Auto Bounce × Counter

| Field | Value |
| --- | --- |
| Interaction ID | `INT-005` |
| Name | Auto Bounce × Counter |
| Status | CANDIDATE |
| Rule A | R-PLAYER-001 Auto Bounce |
| Rule B | R-STATE-003 Counter |
| Result | Bounce count becomes a measurable puzzle resource. |
| Preconditions | A counter that increments on bounce events. Count must be visible (`INT-028` / `R-INFO-001`). |
| Priority / Conflict Resolution | Counting does not change bounce physics. |
| Player Cue | The count is visible at decision time. |
| Discovery Potential | DP3 |
| Design Uses | Bounce-as-resource rooms (`DSC-011`). |
| Test Case | Not specified. PLAY-002 has not started. |

Candidate embodiment: GIM-007 Bounce Counter.

---

### INT-006 — Directional Control × Momentum

| Field | Value |
| --- | --- |
| Interaction ID | `INT-006` |
| Name | Directional Control × Momentum |
| Status | CANDIDATE |
| Rule A | R-PLAYER-002 Directional Control |
| Rule B | R-MOTION-001 Momentum |
| Result | Previously accumulated horizontal speed affects subsequent bounce trajectories. |
| Preconditions | Non-zero or changing horizontal velocity; LEFT/RIGHT available. |
| Priority / Conflict Resolution | Velocity Limit still caps the result. Control steers; it does not instantly erase momentum. |
| Player Cue | The ball keeps traveling; reverse is not instant. |
| Discovery Potential | DP2 |
| Design Uses | Approach-speed choices (`DSC-017`). |
| Test Case | Not specified. Do not freeze PLAY-001B numbers as the test. |

---

### INT-007 — Low Bounce × Solid Collision

| Field | Value |
| --- | --- |
| Interaction ID | `INT-007` |
| Name | Low Bounce × Solid Collision |
| Status | CANDIDATE |
| Rule A | R-PLAYER-003 Low Bounce |
| Rule B | R-CONTACT-001 Solid Collision |
| Result | Low spaces and obstacle geometry can create routes unavailable to normal/high bounce. |
| Preconditions | Low Bounce is known; geometry has a low route. |
| Priority / Conflict Resolution | Low Bounce remains a variation of Auto Bounce, not a new collision rule. |
| Player Cue | Full bounce hits the constraint; the low route is visible. |
| Discovery Potential | DP2 |
| Design Uses | Low-ceiling application (`DSC-005`, LVL-W01-005 candidate). |
| Test Case | Not specified. PLAY-001B must not become frame-perfect (ANTI-003). |

---

### INT-008 — Low Bounce × Momentum

| Field | Value |
| --- | --- |
| Interaction ID | `INT-008` |
| Name | Low Bounce × Momentum |
| Status | CANDIDATE |
| Rule A | R-PLAYER-003 Low Bounce |
| Rule B | R-MOTION-001 Momentum |
| Result | The player can sacrifice vertical height while emphasizing horizontal travel. |
| Preconditions | Low Bounce takeoff with existing or intended horizontal speed. |
| Priority / Conflict Resolution | LOW sets height; momentum sets travel. Not a second movement rule. |
| Player Cue | After a short hop the ball is still moving. |
| Discovery Potential | DP3 |
| Design Uses | Low as the start of a stronger route (`DSC-006`). |
| Test Case | Not specified. |

---

### INT-009 — Landing Boost × Low Friction

| Field | Value |
| --- | --- |
| Interaction ID | `INT-009` |
| Name | Landing Boost × Low Friction |
| Status | CANDIDATE |
| Rule A | R-PLAYER-004 Landing Boost |
| Rule B | R-CONTACT-003 Friction configured **low** |
| Result | Landing propulsion can be preserved as long-distance horizontal momentum. |
| Preconditions | Boost landing on or into a low-friction surface. |
| Priority / Conflict Resolution | Boost remains a variation of Auto Bounce. Friction is a configuration, not a new rule. |
| Player Cue | Slick surface plus a held landing. |
| Discovery Potential | DP3 |
| Design Uses | Long carry after a boosted landing (`DSC-003`). |
| Test Case | Not specified. PLAY-002 has not started. |

Candidate embodiment: GIM-004 Ice.

---

### INT-010 — Landing Boost × Solid Collision

| Field | Value |
| --- | --- |
| Interaction ID | `INT-010` |
| Name | Landing Boost × Solid Collision |
| Status | CANDIDATE |
| Rule A | R-PLAYER-004 Landing Boost |
| Rule B | R-CONTACT-001 Solid Collision |
| Result | Strong horizontal propulsion followed by wall contact can create a new rebound or redirection route. |
| Preconditions | Boosted travel meets a solid. |
| Priority / Conflict Resolution | Does not silently rewrite Wall Jump. Redirection must follow named contact/bounce rules. |
| Player Cue | The wall and the boosted approach are both readable. |
| Discovery Potential | DP3 |
| Design Uses | Wall as tool after a boost (`DSC-010`). |
| Test Case | Not specified. |

---

### INT-011 — Wall Jump × Directional Force

| Field | Value |
| --- | --- |
| Interaction ID | `INT-011` |
| Name | Wall Jump × Directional Force |
| Status | CANDIDATE |
| Rule A | R-PLAYER-005 Wall Jump |
| Rule B | R-FORCE-001 Directional Force |
| Result | External force modifies the approach, exit, or trajectory of a wall jump. |
| Preconditions | Wall Jump and a force region can overlap. |
| Priority / Conflict Resolution | Force bends the wall-jump arc. It does not replace “up and away.” |
| Player Cue | Force and wall contact both visible. |
| Discovery Potential | DP2 |
| Design Uses | Not further specified. |
| Test Case | Not specified. PLAY-002 has not started. |

Candidate embodiment: GIM-003 Wind.

---

### INT-012 — Wall Jump × Counter

| Field | Value |
| --- | --- |
| Interaction ID | `INT-012` |
| Name | Wall Jump × Counter |
| Status | CANDIDATE |
| Rule A | R-PLAYER-005 Wall Jump |
| Rule B | R-STATE-003 Counter |
| Result | Wall contacts or wall jumps can become countable puzzle conditions. |
| Preconditions | A counter that measures wall events. Count visible. |
| Priority / Conflict Resolution | Counting does not change Wall Jump physics. |
| Player Cue | Visible count (`R-INFO-001`). |
| Discovery Potential | DP2 |
| Design Uses | Not further specified. Related resource language: `DSC-011`. |
| Test Case | Not specified. PLAY-002 has not started. |

---

### INT-013 — Momentum × Solid Collision

| Field | Value |
| --- | --- |
| Interaction ID | `INT-013` |
| Name | Momentum × Solid Collision |
| Status | CANDIDATE |
| Rule A | R-MOTION-001 Momentum |
| Rule B | R-CONTACT-001 Solid Collision |
| Result | A wall or solid object can become a trajectory-changing tool rather than merely an obstacle. |
| Preconditions | The player arrives with readable speed; the solid is visible. |
| Priority / Conflict Resolution | Geometry does not change. Outcome changes with entry velocity (`DSC-017`). |
| Player Cue | Fast vs slow approach is visible. |
| Discovery Potential | DP3 |
| Design Uses | Wall as tool (`DSC-010`); same space, different entry (`DSC-017`). |
| Test Case | Not specified. |

---

### INT-014 — Momentum × Low Friction

| Field | Value |
| --- | --- |
| Interaction ID | `INT-014` |
| Name | Momentum × Low Friction |
| Status | CANDIDATE |
| Rule A | R-MOTION-001 Momentum |
| Rule B | R-CONTACT-003 Friction configured **low** |
| Result | Acquired horizontal speed can be preserved over distance. |
| Preconditions | Player has speed; surface is low-friction. |
| Priority / Conflict Resolution | Same friction rule as high-friction rows. |
| Player Cue | Slick surface before the preserve happens. |
| Discovery Potential | DP2 |
| Design Uses | Ice as momentum storage (`DSC-003`). |
| Test Case | Not specified. PLAY-002 has not started. |

---

### INT-015 — Momentum × High Friction

| Field | Value |
| --- | --- |
| Interaction ID | `INT-015` |
| Name | Momentum × High Friction |
| Status | CANDIDATE |
| Rule A | R-MOTION-001 Momentum |
| Rule B | R-CONTACT-003 Friction configured **high** |
| Result | The player can intentionally discard accumulated speed. |
| Preconditions | Player has speed; surface is high-friction. |
| Priority / Conflict Resolution | Same friction rule as `INT-014`. |
| Player Cue | Grabby surface before the dump happens. |
| Discovery Potential | DP3 |
| Design Uses | Lose speed on purpose (`DSC-009`, `DSC-004`). |
| Test Case | Not specified. PLAY-002 has not started. |

---

### INT-016 — Directional Force × Low Friction

| Field | Value |
| --- | --- |
| Interaction ID | `INT-016` |
| Name | Directional Force × Low Friction |
| Status | CANDIDATE |
| Rule A | R-FORCE-001 Directional Force |
| Rule B | R-CONTACT-003 Friction configured **low** |
| Result | Speed gained inside a force region can remain after leaving that region. |
| Preconditions | Force region and a low-friction exit/runway. |
| Priority / Conflict Resolution | Force adds speed; low friction keeps it. Neither invents a new rule. |
| Player Cue | Both the force and the slick surface are visible. |
| Discovery Potential | DP3 |
| Design Uses | Carry wind-gained speed onto ice (`DSC-003`, `DSC-015`). |
| Test Case | Not specified. PLAY-002 has not started. |

---

### INT-017 — Directional Force × Momentum

| Field | Value |
| --- | --- |
| Interaction ID | `INT-017` |
| Name | Directional Force × Momentum |
| Status | CANDIDATE |
| Rule A | R-FORCE-001 Directional Force |
| Rule B | R-MOTION-001 Momentum |
| Result | Duration and direction of force exposure affect later trajectory even after the immediate interaction. |
| Preconditions | Player spends time in a force; then leaves. |
| Priority / Conflict Resolution | After exit, momentum persists under ordinary motion rules. |
| Player Cue | Time-in-wind is a visible choice. |
| Discovery Potential | DP2 |
| Design Uses | Headwind or tailwind as a later-route tool (`DSC-002`). |
| Test Case | Not specified. PLAY-002 has not started. |

---

### INT-018 — Directional Force × Binary State

| Field | Value |
| --- | --- |
| Interaction ID | `INT-018` |
| Name | Directional Force × Binary State |
| Status | CANDIDATE |
| Rule A | R-FORCE-001 Directional Force |
| Rule B | R-STATE-001 Binary State |
| Result | A directional force can be enabled or disabled according to state. |
| Preconditions | A published on/off state for the force. |
| Priority / Conflict Resolution | Distinct from `INT-019` (direction change). Do not merge the IDs. |
| Player Cue | On vs off must be visible (`INT-028`). |
| Discovery Potential | DP2 |
| Design Uses | Not further specified. |
| Test Case | Not specified. PLAY-002 has not started. |

---

### INT-019 — Directional Force × Stateful Direction

| Field | Value |
| --- | --- |
| Interaction ID | `INT-019` |
| Name | Directional Force × Stateful Direction |
| Status | CANDIDATE |
| Rule A | R-FORCE-001 Directional Force |
| Rule B | R-STATE-001 Binary State |
| Result | The state changes which direction the force applies. |
| Preconditions | The same force object; state selects direction. |
| Priority / Conflict Resolution | Distinct from `INT-018` (enable/disable). Earlier shorthand “State Toggle” is **not** a new rule. Binary State controls a parameter of Directional Force. |
| Player Cue | Current direction must be visible. |
| Discovery Potential | DP3 |
| Design Uses | Same object, different role by state (`DSC-018`). |
| Test Case | Not specified. PLAY-002 has not started. |

---

### INT-020 — Impulse × Low Friction

| Field | Value |
| --- | --- |
| Interaction ID | `INT-020` |
| Name | Impulse × Low Friction |
| Status | CANDIDATE |
| Rule A | R-FORCE-002 Impulse |
| Rule B | R-CONTACT-003 Friction configured **low** |
| Result | A momentary impulse can be converted into long-distance movement. |
| Preconditions | Impulse event; low-friction travel after. |
| Priority / Conflict Resolution | Impulse is instantaneous; friction configuration preserves the result. |
| Player Cue | Launch source and slick runway both readable. |
| Discovery Potential | DP2 |
| Design Uses | Not further specified. Candidate pair: GIM-006 with GIM-004. |
| Test Case | Not specified. PLAY-002 has not started. |

---

### INT-021 — Binary State × Solid Collision

| Field | Value |
| --- | --- |
| Interaction ID | `INT-021` |
| Name | Binary State × Solid Collision |
| Status | CANDIDATE |
| Rule A | R-STATE-001 Binary State |
| Rule B | R-CONTACT-001 Solid Collision |
| Result | The same object can alternate between blocking and passable states. |
| Preconditions | Object has two published states; collision follows the current state. |
| Priority / Conflict Resolution | Closed follows ordinary solids. Open is passable. No secret third state. |
| Player Cue | Open vs closed visible (`INT-028`). |
| Discovery Potential | DP2 |
| Design Uses | Closed door as wall (`DSC-001`); opening can be wrong (`DSC-014`). |
| Test Case | Not specified. PLAY-002 has not started. |

Candidate embodiment: GIM-001 Door.

---

### INT-022 — Binary State × Trigger

| Field | Value |
| --- | --- |
| Interaction ID | `INT-022` |
| Name | Binary State × Trigger |
| Status | CANDIDATE |
| Rule A | R-STATE-001 Binary State |
| Rule B | R-SIGNAL-001 Trigger |
| Result | An action/event changes another object's binary state. |
| Preconditions | A published cause and a published target. |
| Priority / Conflict Resolution | Trigger writes state. It does not invent hidden wiring. |
| Player Cue | Cause and effect attributable (`R-INFO-001`). |
| Discovery Potential | DP2 |
| Design Uses | Switch → door. Delay of that write is `INT-027`, not this ID. |
| Test Case | Not specified. PLAY-002 has not started. |

Candidate embodiments: GIM-002 Switch, GIM-001 Door.

---

### INT-023 — Timed State × Solid Collision

| Field | Value |
| --- | --- |
| Interaction ID | `INT-023` |
| Name | Timed State × Solid Collision |
| Status | CANDIDATE |
| Rule A | R-STATE-002 Timed State |
| Rule B | R-CONTACT-001 Solid Collision |
| Result | A route may become solid/passable only during a defined time window. |
| Preconditions | A readable clock; collision follows the timed state. |
| Priority / Conflict Resolution | Window must be fair (ANTI-003, ANTI-012). |
| Player Cue | Remaining time, or an equivalent clock, is visible. |
| Discovery Potential | DP2 |
| Design Uses | Waiting as an action (`DSC-012`). |
| Test Case | Not specified. PLAY-002 has not started. |

Candidate embodiment: GIM-008 Timed Gate.

---

### INT-024 — Timed State × Directional Force

| Field | Value |
| --- | --- |
| Interaction ID | `INT-024` |
| Name | Timed State × Directional Force |
| Status | CANDIDATE |
| Rule A | R-STATE-002 Timed State |
| Rule B | R-FORCE-001 Directional Force |
| Result | A directional force exists or changes only during a temporary state. |
| Preconditions | Force tied to a readable timed state. |
| Priority / Conflict Resolution | Distinct from `INT-018` (binary on/off) by using a clock. |
| Player Cue | Force and timer both visible. |
| Discovery Potential | DP2 |
| Design Uses | Not further specified. |
| Test Case | Not specified. PLAY-002 has not started. |

---

### INT-025 — Counter × Trigger

| Field | Value |
| --- | --- |
| Interaction ID | `INT-025` |
| Name | Counter × Trigger |
| Status | CANDIDATE |
| Rule A | R-STATE-003 Counter |
| Rule B | R-SIGNAL-001 Trigger |
| Result | After a defined number of events, another event is triggered. |
| Preconditions | Visible count; published threshold. |
| Priority / Conflict Resolution | Threshold fire is deterministic. Not luck (ANTI-005). |
| Player Cue | Count and threshold readable. |
| Discovery Potential | DP3 |
| Design Uses | Bounce-count gates (`DSC-011`). |
| Test Case | Not specified. PLAY-002 has not started. |

---

### INT-026 — Counter × Binary State

| Field | Value |
| --- | --- |
| Interaction ID | `INT-026` |
| Name | Counter × Binary State |
| Status | CANDIDATE |
| Rule A | R-STATE-003 Counter |
| Rule B | R-STATE-001 Binary State |
| Result | An object's state changes according to accumulated event count. |
| Preconditions | Visible count; published mapping to state. |
| Priority / Conflict Resolution | Count writes state. Distinct from `INT-025` (count fires a trigger). |
| Player Cue | Count and resulting state both visible. |
| Discovery Potential | DP3 |
| Design Uses | Same object, different role by count (`DSC-018`, `DSC-011`). |
| Test Case | Not specified. PLAY-002 has not started. |

---

### INT-027 — Trigger × Delay

| Field | Value |
| --- | --- |
| Interaction ID | `INT-027` |
| Name | Trigger × Delay |
| Status | CANDIDATE |
| Rule A | R-SIGNAL-001 Trigger |
| Rule B | R-SIGNAL-002 Delay |
| Result | An action produces its consequence after a predictable delay. |
| Preconditions | Published cause; telegraphed wait. |
| Priority / Conflict Resolution | Hidden delay is ANTI-012. |
| Player Cue | The wait is telegraphed. |
| Discovery Potential | DP3 |
| Design Uses | Action now, result later (`DSC-013`). |
| Test Case | Not specified. PLAY-002 has not started. |

Candidate embodiment: GIM-012 Delayed Switch.

---

### INT-028 — Visible State × Binary State

| Field | Value |
| --- | --- |
| Interaction ID | `INT-028` |
| Name | Visible State × Binary State |
| Status | CANDIDATE |
| Rule A | R-INFO-001 Visible State |
| Rule B | R-STATE-001 Binary State |
| Result | Important state changes are communicated clearly through visual and/or audio feedback. |
| Preconditions | A binary state that affects a decision. |
| Priority / Conflict Resolution | Fairness/readability support. Does not create a new gameplay verb. |
| Player Cue | The cue *is* the interaction. |
| Discovery Potential | DP1 |
| Design Uses | Fairness/readability support. Required by C-06 and ANTI-001. |
| Test Case | Not specified. |

---

## Scope boundary

Current development stage: **PLAY-001B — Dynamic Movement Pass**.

PLAY-002 has **not** started.

Do not implement candidate gimmicks to demonstrate these interactions.

Do not add INT-029+ in this pass.

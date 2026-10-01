# MOVEMENT_VALIDATION_003

Consolidated home playtest for Human Movement Validation #3.

Three **independent** experiment branches. Do not merge them. Do not tune during the session. Record what happened, then interpret.

Shared baseline: `cursor/validation-diagnostics-3f71` @ `226bcd3cb5eccb32e8674897f66631f400ca10e9`

Common setup for every experiment: **DYNAMIC** + **LEGACY LOW**. RHYTHM LOW is a DROP candidate. PLAY-002 is LOCKED. Vertical Slice is HOLD.

---

## 1. Test philosophy

- Human feel is authoritative for movement validation.
- Automated tests prove implementation contracts, not playfeel.
- AR-A2, WJ-B, and Charge / Spin are isolated experiments. Test them separately.
- Do not compare them as if they were already merged.
- Do not retune sliders or milliseconds during the session.
- Record behavior first, interpretation second.
- This session decides leading **movement contracts** only. Movement Fun, rooms, and discovery design are separate.

---

## 2. Before each experiment

A Vite server left running on another branch can serve the wrong build. **Restart the dev server after every branch switch.**

### Preflight

1. Stop the old Vite process (`Ctrl+C` in the terminal that is running `npm run dev`).
2. Switch to the target branch.
3. Confirm branch and HEAD.
4. Start the game.
5. Hard-refresh the browser.
6. Confirm Physics Lab: **DYNAMIC** + **LEGACY**.
7. Confirm the experiment-specific HUD / visual signal below.

```bash
# stop any running npm run dev first
git switch <BRANCH>
git branch --show-current
git rev-parse HEAD
git log -1 --oneline
npm run dev
```

Open `http://localhost:5173` and hard-refresh.

| Experiment | Branch | Expected HEAD | Confirm you are on this build |
|---|---|---|---|
| A. AR-A2 | `cursor/air-reversal-ara-3f71` | `a0448e02eed7d08b2dae0c246640070d7b2a5e63` | HUD can show `AR-A FIRE`. This is **not** WJ-B and **not** Charge. |
| B. WJ-B | `cursor/wall-jump-wjb-3f71` | `feaed067f9b1bf406164f01594cd764c8ae66c6f` | HUD can show `WJ WINDOW` / `WJ EXPIRED` / `WJ FIRE`. No AR-A2. No SPACE charge. |
| C. Charge / Spin | `cursor/charge-boost-3f71` | `325b38058673a381bc9c3aca78c2400cd702b27e` | Hold Space: ball spins, then READY halo. Direction-hold is **not** BOOST. |

If `git rev-parse HEAD` does not match the expected SHA, **stop**. Do not playtest that build.

---

## 3. Test order

Recommended order:

1. **AR-A2** — airborne directional correction
2. **WJ-B** — wall-contact intervention
3. **Charge / Spin** — new SPACE preparation input last

PASS or FAIL on one experiment does **not** change the others.

---

## 4. AR-A2 human procedure

**Build:** `cursor/air-reversal-ara-3f71` @ `a0448e02eed7d08b2dae0c246640070d7b2a5e63`

**Setup:** DYNAMIC + LEGACY. Do not tune sliders.

**Contract reminder:** airborne only; actual `vx` decides opposite; fresh opposite press; one special correction per flight; `vx_new = -vx * 0.5`; vertical unchanged; ordinary steering continues; floor bounce resets; Wall Jump wins if the same input qualifies; LOW unchanged.

Previous AR-A (subtractive impulse) failed: FIRE happened, but early and late corrections were almost imperceptible. This test asks whether **guaranteed sign reversal** is a real technique.

**A1. No reversal**  
Take off in one direction. No opposite press. Establish baseline trajectory.

**A2. Early reversal**  
Fresh opposite press early in flight. Watch `AR-A FIRE`, `vx` sign, and the path.

**A3. Late reversal**  
Fresh opposite press near apex / descent.

**A4. Repeat attempt**  
Try more than one special reversal in the same flight.

Record:

- FIRE visible? Y/N
- sign visibly changes? Y/N
- feel: imperceptible / braking / clear correction / too strong
- early vs late: same / somewhat different / clearly different
- repeated tapping becomes free zig-zag? Y/N
- starting direction still matters? Y/N
- LOW feels damaged? Y/N

Decision candidates: **KEEP** / **TUNE** / **REMOVE / REDESIGN**

If guaranteed sign reversal is still not meaningfully useful or fun, do not keep Air Reversal just because it works technically.

Human question: *Does this feel like an intentional airborne trajectory correction?*

---

## 5. WJ-B human procedure

**Build:** `cursor/wall-jump-wjb-3f71` @ `feaed067f9b1bf406164f01594cd764c8ae66c6f`

**Setup:** DYNAMIC + LEGACY.

**Watch HUD:** `Wall NEW` / `Wall STAY` / `WJ WINDOW` / `WJ EXPIRED` / `WJ FIRE`

**Contract reminder:** NEW wall contact opens a 300ms window; fresh press away from the wall during that window fires Wall Jump; pre-held opposite does not count; late STAY after expiration does not fire; one WJ per contact; exit + recontact restores; no pre-contact buffer; physical response unchanged (`vx ±320`, `vy -500`); LOW unchanged; AR-A / AR-A2 are not on this branch.

**B1. Just after contact**  
Touch wall. After perceiving contact, fresh-press away.

**B2. Late STAY**  
Touch wall. Wait noticeably. Then fresh-press away.

**B3. Pre-held opposite**  
Hold the away-from-wall direction **before** contact. Keep holding into the wall.

**B4. Recontact**  
Leave the wall. Contact it again. Fresh-press away inside the window.

Record:

- post-contact WJ easy enough? Y/N
- physical response still good? Y/N
- late STAY correctly blocked? Y/N
- pre-held accidental fire? Y/N
- naturally wanted to press BEFORE contact? Y/N
- feels reaction-test-like? Y/N
- LOW regression noticed? Y/N

Decision candidates: **KEEP WJ-B** / **TRY WJ-A** / **REDESIGN**

If the natural input is consistently slightly **before** contact, do not just make the 300ms window huge. Escalate to WJ-A: short pre-contact buffer + short post-contact window.

Human question: *Does post-contact-only Wall Jump feel natural and forgiving, or do I naturally press slightly before contact?*

---

## 6. Charge / Spin human procedure

**Build:** `cursor/charge-boost-3f71` @ `325b38058673a381bc9c3aca78c2400cd702b27e`

**Setup:** DYNAMIC + LEGACY.

**Watch:** ball spin (CHARGING), halo (READY), HUD `CHARGE —` / `CHARGING` / `READY` / `CANCEL` / `BOOST FIRE`. HUD is diagnostic. Judge READY without relying on it.

**Contract reminder:** SPACE hold → CHARGING → READY after 420ms → next floor bounce consumes READY; SPACE never jumps; release cancels; no auto-recharge after consume; wall contact does not consume; Wall Jump cancels charge; valid LEGACY LOW wins and cancels charge; hidden direction-hold BOOST is off; BOOST uses NORMAL vertical bounce and `1.35` horizontal multiplier.

**C1. NORMAL**  
Do not press SPACE. Observe baseline landing range.

**C2. Charge → BOOST**  
Hold SPACE until READY. Keep desired direction. Let the next floor bounce consume it.

**C3. Cancel**  
Start charging. Release before use.

**C4. Do not charge**  
Try nearby landing goals. Notice whether NORMAL is intentionally preferable.

**C5. Reuse**  
After one BOOST, keep holding SPACE (no automatic second charge). Release and press again (new CHARGING).

Record:

- understood how charge starts? Y/N
- READY readable without HUD? Y/N
- SPACE feels like jump button? Y/N
- BOOST distance clearly farther? Y/N
- sometimes intentionally charge? Y/N
- sometimes intentionally do NOT charge? Y/N
- cancellation understandable? Y/N
- auto-recharge prevented? Y/N
- LOW cancellation confusing? Y/N
- Auto Bounce still feels primary? Y/N

Decision candidates: **KEEP** / **TUNE** / **REMOVE BOOST**

If Charge is always better, do not immediately add penalties. If the player never wants it, do not add complexity. Reconsider whether BOOST belongs in Movement Foundation.

Human question: *Does this create a meaningful intentional choice between charging and not charging?*

---

## 7. Session record template

Copy this block back to HQ.

```text
# Human Movement Validation #3

Date:
Tester:

## AR-A2
Result:
Feel: imperceptible / braking / clear correction / too strong
Early:
Late:
Repeat:
LOW conflict:
Notes:

Decision candidate: KEEP / TUNE / REMOVE / REDESIGN

## WJ-B
Result:
Post-contact:
Late STAY:
Pre-held:
Recontact:
Reaction burden:
LOW conflict:
Notes:

Decision candidate: KEEP WJ-B / TRY WJ-A / REDESIGN

## Charge / Spin
Result:
Charge readability:
READY readability:
Farther travel:
Charge / no-charge choice:
SPACE jump feeling:
LOW conflict:
Notes:

Decision candidate: KEEP / TUNE / REMOVE BOOST
```

---

## 8. HQ decision matrix

| System | Candidate | Human question | PASS path | FAIL path |
|---|---|---|---|---|
| Air Reversal | AR-A2 reflection `0.5` | Intentional airborne trajectory correction? | Candidate for movement foundation | TUNE = one narrow follow-up only. FAIL = remove or rethink role. Do not keep it only because FIRE works. |
| Wall Jump | WJ-B 300ms post-contact window | Natural and forgiving, or naturally pre-contact? | WJ-B becomes leading contract | Too strict → WJ-A experiment. Physical feel bad → redesign separately. Do not just widen the window. |
| BOOST | SPACE charge 420ms / 1.35× horizontal | Meaningful choice to charge or not? | Charge becomes BOOST candidate | TUNE only if the role is already clear. FAIL → remove BOOST from foundation. Do not add penalties to rescue it. |

---

## 9. Do not decide yet

Human Validation #3 does **not** decide:

- PLAY-002 architecture
- Vertical Slice geometry
- W1 room count
- W2 Momentum
- Charged LOW
- future gimmicks
- final production VFX
- final numeric tuning

It only decides the leading movement contracts.

---

## 10. Post-session gate

After all three tests:

- Do **not** merge automatically.
- Return the human evidence to HQ.

HQ will decide:

- Air Reversal: **KEEP / TUNE / REMOVE**
- Wall Jump: **KEEP WJ-B / TEST WJ-A / REDESIGN**
- BOOST: **KEEP CHARGE / TUNE / REMOVE**

Only after those decisions should a consolidated movement branch be considered.

PLAY-002 remains locked until the movement foundation is sufficiently stable.

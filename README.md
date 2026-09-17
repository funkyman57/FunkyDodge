# FunkyDodge

Physics Playground (PLAY-000 through PLAY-001D physics lab).

This is not a complete game. It is a playable experiment for one question:

**Is controlling the bouncing ball fun?**

PLAY-001D adds a playground-only Physics Lab. Press `L` to hide or show it. CURRENT / DYNAMIC / AGGRESSIVE are comparison experiments, not validated game values.

The Lab also has a LOW input experiment: **LEGACY** (fresh press) vs **RHYTHM** (double-tap entry + tap continuation). Same physics settings. Timing seeds are provisional. Human playtest is required.

Repeated LOW needs a fresh tap near each landing. Holding a direction is BOOST, not a bunny-hop chain.

## Run

```bash
npm install
npm run dev
```

Open the printed local URL (default `http://localhost:5173`).

## Controls

| Input | Action |
| --- | --- |
| `←` / `A` | LEFT |
| `→` / `D` | RIGHT |
| `R` | Restart ball |

There is no jump button. The ball bounces on its own when it hits the floor or a platform.

## Landing grammar

| Input at landing | Result |
| --- | --- |
| Fresh LEFT/RIGHT tap near landing | LOW |
| Direction held from earlier | BOOST |
| No direction | NORMAL |

You do not need to release before landing for LOW. Tap again each bounce for `통통통` low hops. Keep holding for BOOST.

## Play tests

- **Air reverse**: build speed one way, then hold the opposite key in the air
- **Platform**: stay on it with short taps vs long holds
- **Low Ceiling**: fresh taps near landing to Low Bounce under the purple slab
- **Wall Jump**: touch the red wall and press the opposite direction — the ball should kick **up and away**

Movement is impulse + acceleration + momentum. A tap should feel like a kick, not a slow fade-in.

Tune feel in `src/game/physics/PhysicsConfig.ts`, then refresh.

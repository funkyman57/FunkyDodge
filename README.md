# FunkyDodge

Physics Playground (PLAY-000 / PLAY-001 / PLAY-001A).

This is not a complete game. It is a playable experiment for one question:

**Is controlling the bouncing ball fun?**

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

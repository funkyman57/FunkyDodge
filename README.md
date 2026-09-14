# FunkyDodge

Physics Playground (PLAY-000 / PLAY-001).

This is not a complete game. It is a playable experiment for one question:

**Is moving an auto-bouncing ball fun?**

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

## Play tests

- **Platform**: stay on it with short vs long LEFT/RIGHT holds
- **Low Ceiling**: tap-release LEFT or RIGHT just before landing to Low Bounce under the purple slab
- **Wall Jump**: touch the red wall and press the opposite direction

Tune feel in `src/game/physics/PhysicsConfig.ts`, then refresh.

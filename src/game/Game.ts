import Phaser from "phaser";
import { PhysicsConfig } from "./physics/PhysicsConfig";
import { PlaygroundScene } from "./scenes/PlaygroundScene";

export function createGame(parent: string | HTMLElement): Phaser.Game {
  return new Phaser.Game({
    type: Phaser.AUTO,
    parent,
    width: PhysicsConfig.width,
    height: PhysicsConfig.height,
    backgroundColor: "#12182b",
    physics: {
      default: "arcade",
      arcade: {
        gravity: { x: 0, y: PhysicsConfig.gravity },
        debug: false,
      },
    },
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [PlaygroundScene],
  });
}

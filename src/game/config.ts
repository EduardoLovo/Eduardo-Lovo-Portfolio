import * as Phaser from "phaser";
import { PreloadScene } from "./scenes/PreloadScene";
import { CafeScene } from "./scenes/CafeScene";
import { GAME_HEIGHT, GAME_WIDTH } from "./constants";

export function createGameConfig(parent: HTMLElement): Phaser.Types.Core.GameConfig {
  return {
    type: Phaser.AUTO,
    parent,
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    backgroundColor: "#1b1420",
    pixelArt: true,
    // Sem sons por enquanto: evita erros de AudioContext no remount do StrictMode. Reativar na etapa de sons.
    audio: { noAudio: true },
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: {
      default: "arcade",
      arcade: { debug: false },
    },
    scene: [PreloadScene, CafeScene],
  };
}

import * as Phaser from "phaser";
import { PreloadScene } from "./scenes/PreloadScene";
import { CafeScene } from "./scenes/CafeScene";
import { GAME_HEIGHT, GAME_WIDTH } from "./constants";

let audioContext: AudioContext | undefined;
function getAudioContext() {
  audioContext ??= new AudioContext();
  return audioContext;
}

export function createGameConfig(parent: HTMLElement): Phaser.Types.Core.GameConfig {
  return {
    type: Phaser.AUTO,
    parent,
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    backgroundColor: "#1b1420",
    pixelArt: true,
    // AudioContext próprio e reaproveitado: ao destruir o jogo o Phaser só o suspende (não fecha),
    // o que evita erros quando o React monta o jogo duas vezes em desenvolvimento
    audio: { context: getAudioContext() },
    // Em produção a arte e os sons vêm do Vercel Blob (outro domínio): precisa de CORS para o WebGL
    loader: { crossOrigin: "anonymous" },
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

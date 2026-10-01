// Catálogo de sons e preferência de mudo. Sem Phaser: o React pede um som pelo EventBus
// e a CafeScene toca com o gerenciador de áudio do Phaser.
import { EventBus } from "./EventBus";

export const SOUNDS = {
  bell: { file: "bell.wav", volume: 0.5 },
  door: { file: "door.ogg", volume: 0.5 },
  blip: { file: "blip.wav", volume: 0.12 },
  open: { file: "open.wav", volume: 0.35 },
  correct: { file: "correct.wav", volume: 0.4 },
  ok: { file: "ok.wav", volume: 0.4 },
  wrong: { file: "wrong.wav", volume: 0.4 },
  coins: { file: "coins.ogg", volume: 0.6 },
  fanfare: { file: "fanfare.wav", volume: 0.45 },
  footstep0: { file: "footstep0.ogg", volume: 0.12 },
  footstep1: { file: "footstep1.ogg", volume: 0.12 },
  footstep2: { file: "footstep2.ogg", volume: 0.12 },
  footstep3: { file: "footstep3.ogg", volume: 0.12 },
} as const;

export type SoundName = keyof typeof SOUNDS;

// "Jazz Piano Medley #81" — Tri-Tachyon (CC-BY 4.0). Carregada depois que o jogo abre.
export const MUSIC = { key: "music", file: "music.mp3", volume: 0.2 };

export function playSound(name: SoundName) {
  EventBus.emit("sound:play", name);
}

// Mudo é preferência do visitante (não é estado do jogo): fica salvo no navegador
const MUTE_KEY = "bean-there-cafe:muted";

export function isMuted() {
  try {
    return localStorage.getItem(MUTE_KEY) === "1";
  } catch {
    return false;
  }
}

export function setMuted(muted: boolean) {
  try {
    localStorage.setItem(MUTE_KEY, muted ? "1" : "0");
  } catch {
    // Sem acesso ao localStorage (aba privada, por exemplo): vale só nesta visita
  }
  EventBus.emit("sound:mute", muted);
}

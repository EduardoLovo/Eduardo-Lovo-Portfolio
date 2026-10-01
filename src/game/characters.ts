import * as Phaser from "phaser";

// Personagens prontos da LimeZu (0_Premade_Characters/32x32). Para trocar alguém, mude o número.
export const CHARACTERS = {
  player: "premade_11",
  emma: "premade_10",
  leo: "premade_12",
  mia: "premade_18",
  mr_brown: "premade_14",
  phone_customer: "premade_05",
} as const;

// Cada quadro tem 32x64 e cada linha da folha é uma animação, com 56 quadros por linha
export const FRAME = { width: 32, height: 64 };
const FRAMES_PER_ROW = 56;
const ROW = { idle: 1, walk: 2, sit: 4, phone: 6 };

// Nas linhas de idle e walk: 6 quadros por direção, nesta ordem
export const DIRECTIONS = ["right", "up", "left", "down"] as const;
export type Direction = (typeof DIRECTIONS)[number];

const frame = (row: number, index: number) => row * FRAMES_PER_ROW + index;

export function createCharacterAnimations(scene: Phaser.Scene, sheet: string) {
  const add = (key: string, frames: number[], frameRate: number) => {
    if (scene.anims.exists(`${sheet}-${key}`)) return;
    scene.anims.create({
      key: `${sheet}-${key}`,
      frames: frames.map((f) => ({ key: sheet, frame: f })),
      frameRate,
      repeat: -1,
    });
  };
  const range = (row: number, start: number, count: number) =>
    Array.from({ length: count }, (_, i) => frame(row, start + i));

  DIRECTIONS.forEach((direction, d) => {
    add(`idle-${direction}`, range(ROW.idle, d * 6, 6), 6);
    add(`walk-${direction}`, range(ROW.walk, d * 6, 6), 10);
  });
  // Linha de sentar: quadros 0-5 virado para a direita, 6-11 para a esquerda
  add("sit-right", range(ROW.sit, 0, 6), 4);
  add("sit-left", range(ROW.sit, 6, 6), 4);
  add("phone", range(ROW.phone, 4, 6), 6); // quadros 4-9 são o loop de mexer no celular
}

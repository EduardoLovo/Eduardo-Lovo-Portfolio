// Direções vindas dos controles de toque (React). O Player lê junto com o teclado.
// Sem dependência do Phaser, para o React poder escrever aqui sem puxar a biblioteca.
import type { Direction } from "./characters";

export const virtualInput: Record<Direction, boolean> = { up: false, down: false, left: false, right: false };

export function setVirtualDirections(directions: Partial<Record<Direction, boolean>>) {
  virtualInput.up = !!directions.up;
  virtualInput.down = !!directions.down;
  virtualInput.left = !!directions.left;
  virtualInput.right = !!directions.right;
}

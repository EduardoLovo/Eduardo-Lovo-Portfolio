import * as Phaser from "phaser";
import { CHARACTERS, type Direction } from "../characters";

const SPEED = 120;

type Keys = Record<Direction, Phaser.Input.Keyboard.Key[]>;

export class Player extends Phaser.Physics.Arcade.Sprite {
  // Parado durante diálogos
  frozen = false;

  private keys: Keys;
  private facing: Direction = "up";

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, CHARACTERS.player);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    // Origem nos pés; a colisão é só um retângulo pequeno na base do sprite
    this.setOrigin(0.5, 1);
    this.body!.setSize(18, 10).setOffset(7, 54);
    this.setCollideWorldBounds(true);

    const keyboard = scene.input.keyboard!;
    const cursors = keyboard.createCursorKeys();
    // Letras sem "capture", para não bloquear a digitação em campos de texto da página
    const letter = (key: string) => keyboard.addKey(key, false);
    this.keys = {
      up: [cursors.up, letter("W")],
      down: [cursors.down, letter("S")],
      left: [cursors.left, letter("A")],
      right: [cursors.right, letter("D")],
    };

    this.play(`${this.texture.key}-idle-${this.facing}`);
  }

  update() {
    const isDown = (direction: Direction) => !this.frozen && this.keys[direction].some((key) => key.isDown);
    const dx = Number(isDown("right")) - Number(isDown("left"));
    const dy = Number(isDown("down")) - Number(isDown("up"));

    // Normaliza para andar na mesma velocidade também na diagonal
    this.body!.velocity.set(dx, dy).normalize().scale(SPEED);

    if (dx !== 0 || dy !== 0) {
      // Na diagonal, prioriza a animação horizontal
      this.facing = dx > 0 ? "right" : dx < 0 ? "left" : dy > 0 ? "down" : "up";
      this.play(`${this.texture.key}-walk-${this.facing}`, true);
    } else {
      this.play(`${this.texture.key}-idle-${this.facing}`, true);
    }

    // Quem está mais embaixo na tela é desenhado na frente
    this.setDepth(this.y);
  }
}

import * as Phaser from "phaser";
import { EventBus } from "../EventBus";
import { GAME_HEIGHT, GAME_WIDTH, TILE } from "../constants";

const PLAYER_SPEED = 120;

// Versão provisória: piso quadriculado e um quadrado no lugar do personagem.
// Na etapa 2 o mapa do Tiled substitui o piso; na etapa 3 entra o sprite da LimeZu.
export class CafeScene extends Phaser.Scene {
  private player!: Phaser.GameObjects.Rectangle;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd!: Record<"up" | "down" | "left" | "right", Phaser.Input.Keyboard.Key>;

  constructor() {
    super("Cafe");
  }

  create() {
    this.drawPlaceholderFloor();

    this.player = this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT - TILE * 2, 24, 28, 0x7c5cff);
    this.physics.add.existing(this.player);
    (this.player.body as Phaser.Physics.Arcade.Body).setCollideWorldBounds(true);

    const keyboard = this.input.keyboard!;
    this.cursors = keyboard.createCursorKeys();
    this.wasd = {
      up: keyboard.addKey("W"),
      down: keyboard.addKey("S"),
      left: keyboard.addKey("A"),
      right: keyboard.addKey("D"),
    };

    this.add
      .text(8, 8, "Bean There Café — etapa 1", { fontFamily: "monospace", fontSize: "12px", color: "#e7e7ef" })
      .setAlpha(0.7);

    EventBus.emit("scene-ready", this.scene.key);
  }

  update() {
    const body = this.player.body as Phaser.Physics.Arcade.Body;
    const left = this.cursors.left.isDown || this.wasd.left.isDown;
    const right = this.cursors.right.isDown || this.wasd.right.isDown;
    const up = this.cursors.up.isDown || this.wasd.up.isDown;
    const down = this.cursors.down.isDown || this.wasd.down.isDown;

    body.setVelocity(Number(right) - Number(left), Number(down) - Number(up));
    // Normaliza para andar na mesma velocidade também na diagonal
    body.velocity.normalize().scale(PLAYER_SPEED);
  }

  private drawPlaceholderFloor() {
    const floor = this.add.graphics();
    for (let y = 0; y < GAME_HEIGHT; y += TILE) {
      for (let x = 0; x < GAME_WIDTH; x += TILE) {
        const even = (x / TILE + y / TILE) % 2 === 0;
        floor.fillStyle(even ? 0x3a2a32 : 0x33242c);
        floor.fillRect(x, y, TILE, TILE);
      }
    }
  }
}

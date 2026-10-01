import * as Phaser from "phaser";
import { GAME_HEIGHT, GAME_WIDTH } from "../constants";

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super("Preload");
  }

  preload() {
    const barWidth = 240;
    const x = (GAME_WIDTH - barWidth) / 2;
    const y = GAME_HEIGHT / 2;

    this.add
      .text(GAME_WIDTH / 2, y - 24, "Loading...", { fontFamily: "monospace", fontSize: "16px", color: "#e7e7ef" })
      .setOrigin(0.5);
    this.add.rectangle(x, y, barWidth, 12).setOrigin(0, 0.5).setStrokeStyle(2, 0xe7e7ef);
    const bar = this.add.rectangle(x + 2, y, 0, 8, 0x7c5cff).setOrigin(0, 0.5);

    this.load.on("progress", (value: number) => {
      bar.width = (barWidth - 4) * value;
    });

    // Etapa 2 em diante: tileset, mapa do Tiled e personagens entram aqui
    // ex.: this.load.image("tiles", assetUrl("tiles/interiors.png"));
  }

  create() {
    this.scene.start("Cafe");
  }
}

import * as Phaser from "phaser";
import { assetUrl } from "../assets";
import { CHARACTERS, FRAME } from "../characters";
import { GAME_HEIGHT, GAME_WIDTH, TILESETS } from "../constants";
import { SOUNDS } from "../sounds";

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

    // O mapa não tem arte (só índices), então fica no repositório; os tilesets vêm do storage
    this.load.tilemapTiledJSON("cafe-map", "/game/maps/cafe.tmj");
    for (const name of TILESETS) {
      this.load.image(name, assetUrl(`tilesets/${name}.png`));
    }
    for (const sheet of new Set(Object.values(CHARACTERS))) {
      this.load.spritesheet(sheet, assetUrl(`characters/${sheet}.png`), {
        frameWidth: FRAME.width,
        frameHeight: FRAME.height,
      });
    }
    this.load.spritesheet("emotes", assetUrl("ui/emotes.png"), { frameWidth: 32, frameHeight: 32 });
    // Efeitos são pequenos e entram já; a música (maior) é carregada depois, na CafeScene
    for (const [name, { file }] of Object.entries(SOUNDS)) {
      this.load.audio(name, assetUrl(`audio/${file}`));
    }
  }

  create() {
    this.scene.start("Cafe");
  }
}

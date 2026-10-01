import * as Phaser from "phaser";

// Balão "…" animado + tecla "E", mostrado sobre o NPC com quem dá para conversar
export class TalkPrompt extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene) {
    super(scene);
    scene.add.existing(this);

    if (!scene.anims.exists("talk-bubble")) {
      // Folha de emotes (10x10 quadros de 32px): linha 9, quadros 2 e 3 = balão com reticências
      scene.anims.create({
        key: "talk-bubble",
        frames: [{ key: "emotes", frame: 92 }, { key: "emotes", frame: 93 }],
        frameRate: 3,
        repeat: -1,
      });
    }
    const bubble = scene.add.sprite(0, 0, "emotes").setOrigin(0.5, 1).play("talk-bubble");
    const key = scene.add
      .text(13, -4, "E", {
        fontFamily: "monospace",
        fontSize: "10px",
        fontStyle: "bold",
        color: "#1b1420",
        backgroundColor: "#f3eee6",
        padding: { x: 3, y: 1 },
      })
      .setOrigin(0.5, 1)
      .setResolution(4);

    // Flutua de leve para chamar atenção (anima o conteúdo, a posição do container segue o NPC)
    const floating = scene.add.container(0, 0, [bubble, key]);
    scene.tweens.add({ targets: floating, y: -2, duration: 500, yoyo: true, repeat: -1, ease: "Sine.easeInOut" });

    this.add(floating);
    this.setDepth(20_000).setVisible(false);
  }

  showAbove(sprite: Phaser.GameObjects.Sprite) {
    // O personagem ocupa a parte de baixo do quadro de 32x64: a cabeça fica ~44px acima dos pés
    this.setPosition(sprite.x, sprite.y - 42).setVisible(true);
  }

  hide() {
    this.setVisible(false);
  }
}

import * as Phaser from "phaser";
import { NPCS, type NpcId } from "../npcs";
import { CHARACTERS } from "../characters";

export class Npc extends Phaser.GameObjects.Sprite {
  readonly id: NpcId;
  private alert: Phaser.GameObjects.Sprite;

  constructor(scene: Phaser.Scene, id: NpcId, x: number, y: number) {
    super(scene, x, y, CHARACTERS[id]);
    this.id = id;
    scene.add.existing(this);
    this.setOrigin(0.5, 1).setDepth(y);
    this.play(`${CHARACTERS[id]}-${NPCS[id].animation}`);

    if (!scene.anims.exists("alert-bubble")) {
      // Folha de emotes: linha 4, quadros 0 e 1 = balão com "!"
      scene.anims.create({
        key: "alert-bubble",
        frames: [{ key: "emotes", frame: 40 }, { key: "emotes", frame: 41 }],
        frameRate: 3,
        repeat: -1,
      });
    }
    // Mesma altura do balão de conversa (TalkPrompt): a cabeça fica ~42px acima dos pés
    this.alert = scene.add.sprite(x, y - 42, "emotes").setOrigin(0.5, 1).setDepth(20_000).setVisible(false);
    this.alert.play("alert-bubble");
  }

  /** "!" sobre a cabeça: o NPC tem algo novo para o jogador (ex.: pedido pronto) */
  setAlert(visible: boolean) {
    this.alert.setVisible(visible);
  }
}

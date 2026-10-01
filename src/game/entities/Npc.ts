import * as Phaser from "phaser";
import { NPCS, type NpcId } from "../npcs";
import { CHARACTERS } from "../characters";

export class Npc extends Phaser.GameObjects.Sprite {
  readonly id: NpcId;

  constructor(scene: Phaser.Scene, id: NpcId, x: number, y: number) {
    super(scene, x, y, CHARACTERS[id]);
    this.id = id;
    scene.add.existing(this);
    this.setOrigin(0.5, 1).setDepth(y);
    this.play(`${CHARACTERS[id]}-${NPCS[id].animation}`);
  }
}

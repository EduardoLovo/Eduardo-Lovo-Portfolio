import * as Phaser from "phaser";

export class Npc extends Phaser.GameObjects.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number, sheet: string, animation: string) {
    super(scene, x, y, sheet);
    scene.add.existing(this);
    this.setOrigin(0.5, 1).setDepth(y);
    this.play(`${sheet}-${animation}`);
  }
}

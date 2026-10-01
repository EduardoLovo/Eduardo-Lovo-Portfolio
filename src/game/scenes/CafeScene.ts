import * as Phaser from "phaser";
import { EventBus } from "../EventBus";
import { CHARACTERS, createCharacterAnimations } from "../characters";
import { Player } from "../entities/Player";
import { Npc } from "../entities/Npc";

// Animação de cada NPC no seu ponto do mapa (camada "Points" do Tiled)
const NPCS = [
  { point: "emma", animation: "idle-down" },
  { point: "leo", animation: "idle-down" },
  { point: "mia", animation: "idle-down" },
  { point: "mr_brown", animation: "sit-left" },
  { point: "phone_customer", animation: "phone" },
] as const;

// A camada "Above" fica sempre na frente dos personagens (que usam a posição y como profundidade)
const ABOVE_DEPTH = 10_000;

export class CafeScene extends Phaser.Scene {
  private player!: Player;

  constructor() {
    super("Cafe");
  }

  create() {
    const map = this.make.tilemap({ key: "cafe-map" });
    const tilesets = map.tilesets.map((tileset) => map.addTilesetImage(tileset.name, tileset.name)!);
    for (const name of ["Floor", "Walls", "Furniture", "Decor"]) map.createLayer(name, tilesets);
    map.createLayer("Above", tilesets)?.setDepth(ABOVE_DEPTH);

    for (const sheet of new Set(Object.values(CHARACTERS))) createCharacterAnimations(this, sheet);

    const colliders = this.createColliders(map);
    for (const { point, animation } of NPCS) {
      const { x, y } = this.getPoint(map, point);
      new Npc(this, x, y, CHARACTERS[point], animation);
      // Bloqueia os pés do NPC para o jogador não atravessar
      colliders.add(this.add.zone(x, y - 5, 18, 10));
    }

    const spawn = this.getPoint(map, "player");
    this.player = new Player(this, spawn.x, spawn.y);
    this.physics.add.collider(this.player, colliders);

    EventBus.emit("scene-ready", this.scene.key);
  }

  update() {
    this.player.update();
  }

  // Cada retângulo da camada "Collision" do Tiled vira um corpo estático invisível
  private createColliders(map: Phaser.Tilemaps.Tilemap) {
    const group = this.physics.add.staticGroup();
    for (const obj of map.getObjectLayer("Collision")?.objects ?? []) {
      group.add(this.add.zone(obj.x! + obj.width! / 2, obj.y! + obj.height! / 2, obj.width!, obj.height!));
    }
    return group;
  }

  private getPoint(map: Phaser.Tilemaps.Tilemap, name: string) {
    const point = map.findObject("Points", (obj) => obj.name === name);
    if (!point) throw new Error(`Ponto "${name}" não encontrado na camada Points do mapa`);
    return { x: point.x!, y: point.y! };
  }
}

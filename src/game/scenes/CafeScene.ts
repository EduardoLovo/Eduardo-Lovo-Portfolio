import * as Phaser from "phaser";
import { EventBus } from "../EventBus";
import { CHARACTERS, createCharacterAnimations } from "../characters";
import { NPCS, type NpcId } from "../npcs";
import { Player } from "../entities/Player";
import { Npc } from "../entities/Npc";
import { TalkPrompt } from "../entities/TalkPrompt";

// A camada "Above" fica sempre na frente dos personagens (que usam a posição y como profundidade)
const ABOVE_DEPTH = 10_000;

type InteractArea = { npc: Npc; area: Phaser.Geom.Rectangle };

export class CafeScene extends Phaser.Scene {
  private player!: Player;
  private interactAreas: InteractArea[] = [];
  private nearbyNpc: Npc | null = null;
  private prompt!: TalkPrompt;
  private talkKeys: Phaser.Input.Keyboard.Key[] = [];

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
    const npcs = new Map<NpcId, Npc>();
    for (const id of Object.keys(NPCS) as NpcId[]) {
      const { x, y } = this.getPoint(map, id);
      npcs.set(id, new Npc(this, id, x, y));
      // Bloqueia os pés do NPC para o jogador não atravessar
      colliders.add(this.add.zone(x, y - 5, 18, 10));
    }

    // Retângulos da camada "Interact": de onde o jogador consegue conversar com cada NPC
    for (const obj of map.getObjectLayer("Interact")?.objects ?? []) {
      const npc = npcs.get(obj.name as NpcId);
      if (npc) this.interactAreas.push({ npc, area: new Phaser.Geom.Rectangle(obj.x, obj.y, obj.width, obj.height) });
    }

    const spawn = this.getPoint(map, "player");
    this.player = new Player(this, spawn.x, spawn.y);
    this.physics.add.collider(this.player, colliders);

    this.prompt = new TalkPrompt(this);
    const keyboard = this.input.keyboard!;
    this.talkKeys = [keyboard.addKey("E", false), keyboard.addKey("SPACE"), keyboard.addKey("ENTER", false)];

    const onDialogEnd = () => {
      // Pequena espera: a tecla que fechou o diálogo não pode reabrir a conversa no quadro seguinte
      this.time.delayedCall(150, () => {
        this.player.frozen = false;
      });
    };
    EventBus.on("dialog:end", onDialogEnd);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => EventBus.off("dialog:end", onDialogEnd));
    this.events.once(Phaser.Scenes.Events.DESTROY, () => EventBus.off("dialog:end", onDialogEnd));

    EventBus.emit("scene-ready", this.scene.key);
  }

  update() {
    this.player.update();

    // Lê todas as teclas todo quadro, para um aperto longe do NPC não "sobrar" para depois
    const talkPressed = this.talkKeys.map((key) => Phaser.Input.Keyboard.JustDown(key)).includes(true);

    // Os pés do jogador precisam estar dentro da área de interação do NPC
    this.nearbyNpc = this.player.frozen
      ? null
      : (this.interactAreas.find(({ area }) => area.contains(this.player.x, this.player.y))?.npc ?? null);

    if (this.nearbyNpc) {
      this.prompt.showAbove(this.nearbyNpc);
      if (talkPressed) this.startDialog(this.nearbyNpc);
    } else {
      this.prompt.hide();
    }
  }

  private startDialog(npc: Npc) {
    this.player.frozen = true;
    this.prompt.hide();
    EventBus.emit("dialog:start", npc.id);
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

import * as Phaser from "phaser";
import { EventBus } from "../EventBus";
import { CHARACTERS, createCharacterAnimations } from "../characters";
import { NPCS, type NpcId } from "../npcs";
import { gameStore, hasFlag } from "../systems/GameStore";
import { Player } from "../entities/Player";
import { Npc } from "../entities/Npc";
import { TalkPrompt } from "../entities/TalkPrompt";

// A camada "Above" fica sempre na frente dos personagens (que usam a posição y como profundidade)
const ABOVE_DEPTH = 10_000;
// Tempo entre pagar e o Leo chamar o nome do jogador
const ORDER_READY_MS = 6000;

type InteractArea = { npc: Npc; area: Phaser.Geom.Rectangle };

export class CafeScene extends Phaser.Scene {
  private player!: Player;
  private npcs = new Map<NpcId, Npc>();
  private interactAreas: InteractArea[] = [];
  private exitArea!: Phaser.Geom.Rectangle;
  private nearbyNpc: Npc | null = null;
  private inDialog = false;
  private prompt!: TalkPrompt;
  private talkKeys: Phaser.Input.Keyboard.Key[] = [];

  constructor() {
    super("Cafe");
  }

  create() {
    // Em um restart da cena, o Phaser reaproveita esta instância: zera o que vem de fora do create
    this.npcs = new Map();
    this.interactAreas = [];
    this.inDialog = false;

    const map = this.make.tilemap({ key: "cafe-map" });
    const tilesets = map.tilesets.map((tileset) => map.addTilesetImage(tileset.name, tileset.name)!);
    for (const name of ["Floor", "Walls", "Furniture", "Decor"]) map.createLayer(name, tilesets);
    map.createLayer("Above", tilesets)?.setDepth(ABOVE_DEPTH);

    for (const sheet of new Set(Object.values(CHARACTERS))) createCharacterAnimations(this, sheet);

    const colliders = this.createColliders(map);
    for (const id of Object.keys(NPCS) as NpcId[]) {
      const { x, y } = this.getPoint(map, id);
      this.npcs.set(id, new Npc(this, id, x, y));
      // Bloqueia os pés do NPC para o jogador não atravessar
      colliders.add(this.add.zone(x, y - 5, 18, 10));
    }

    // Retângulos da camada "Interact": de onde o jogador consegue conversar com cada NPC
    for (const obj of map.getObjectLayer("Interact")?.objects ?? []) {
      const npc = this.npcs.get(obj.name as NpcId);
      if (npc) this.interactAreas.push({ npc, area: new Phaser.Geom.Rectangle(obj.x, obj.y, obj.width, obj.height) });
    }

    // Saída: o tapete em volta do ponto "exit"
    const exit = this.getPoint(map, "exit");
    this.exitArea = new Phaser.Geom.Rectangle(exit.x - 40, exit.y - 40, 80, 40);

    const spawn = this.getPoint(map, "player");
    this.player = new Player(this, spawn.x, spawn.y);
    this.physics.add.collider(this.player, colliders);

    this.prompt = new TalkPrompt(this);
    const keyboard = this.input.keyboard!;
    this.talkKeys = [keyboard.addKey("E", false), keyboard.addKey("SPACE"), keyboard.addKey("ENTER", false)];

    this.listen();
    EventBus.emit("scene-ready", this.scene.key);
  }

  update() {
    const playing = gameStore.get().screen === "playing";
    this.player.update(playing && !this.inDialog);

    // Lê todas as teclas todo quadro, para um aperto longe do NPC não "sobrar" para depois
    const talkPressed = this.talkKeys.map((key) => Phaser.Input.Keyboard.JustDown(key)).includes(true);
    const canTalk = playing && !this.inDialog;

    // Os pés do jogador precisam estar dentro da área de interação do NPC
    this.nearbyNpc = canTalk
      ? (this.interactAreas.find(({ area }) => area.contains(this.player.x, this.player.y))?.npc ?? null)
      : null;

    if (this.nearbyNpc) {
      this.prompt.showAbove(this.nearbyNpc);
      if (talkPressed) this.startDialog(this.nearbyNpc);
    } else {
      this.prompt.hide();
    }

    // Pedido pronto: "!" sobre o Leo (some quando o balão de conversa aparece no lugar)
    const state = gameStore.get();
    const leo = this.npcs.get("leo")!;
    leo.setAlert(hasFlag(state, "orderReady") && !hasFlag(state, "gotOrder") && this.nearbyNpc !== leo);

    // Com o pedido em mãos, pisar no tapete da saída dispara a despedida da Emma
    const leaving = hasFlag(state, "gotOrder") && !hasFlag(state, "finished");
    if (canTalk && leaving && this.exitArea.contains(this.player.x, this.player.y)) {
      this.startDialog(this.npcs.get("emma")!);
    }
  }

  private startDialog(npc: Npc) {
    this.inDialog = true;
    this.prompt.hide();
    EventBus.emit("dialog:start", npc.id);
  }

  // Eventos do React e mudanças no estado do jogo; tudo é desligado quando a cena termina
  private listen() {
    const offDialogEnd = EventBus.on("dialog:end", () => {
      // Pequena espera: a tecla que fechou o diálogo não pode reabrir a conversa no quadro seguinte
      this.time.delayedCall(150, () => {
        this.inDialog = false;
      });
    });

    const offRestart = EventBus.on("game:restart", () => this.scene.restart());

    let readyTimer: Phaser.Time.TimerEvent | null = null;
    const offStore = gameStore.subscribe(() => {
      const state = gameStore.get();
      if (hasFlag(state, "hasPaid") && !hasFlag(state, "orderReady") && !readyTimer) {
        readyTimer = this.time.delayedCall(ORDER_READY_MS, () =>
          gameStore.dispatch({ type: "effects", effects: [{ type: "setFlag", flag: "orderReady" }] }),
        );
      }
    });

    const cleanup = () => {
      offDialogEnd();
      offRestart();
      offStore();
      this.events.off(Phaser.Scenes.Events.SHUTDOWN, cleanup);
      this.events.off(Phaser.Scenes.Events.DESTROY, cleanup);
    };
    // SHUTDOWN no restart da cena; DESTROY quando o jogo é destruído (saída da página)
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, cleanup);
    this.events.once(Phaser.Scenes.Events.DESTROY, cleanup);
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

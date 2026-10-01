// Ponte entre o Phaser (mundo do jogo) e o React (interface).
// Não importa nada do Phaser, para a UI poder usar sem puxar a biblioteca.
import type { NpcId } from "./npcs";

// Eventos e o que cada um carrega
type Events = {
  "scene-ready": [sceneKey: string];
  "dialog:start": [npcId: NpcId]; // Phaser → React: jogador apertou E perto de um NPC
  "dialog:end": []; // React → Phaser: diálogo fechado, jogador volta a andar
};

type Handler<E extends keyof Events> = (...args: Events[E]) => void;

class Emitter {
  private handlers = new Map<keyof Events, Set<Handler<never>>>();

  on<E extends keyof Events>(event: E, handler: Handler<E>) {
    if (!this.handlers.has(event)) this.handlers.set(event, new Set());
    this.handlers.get(event)!.add(handler as Handler<never>);
    return () => this.off(event, handler);
  }

  off<E extends keyof Events>(event: E, handler: Handler<E>) {
    this.handlers.get(event)?.delete(handler as Handler<never>);
  }

  emit<E extends keyof Events>(event: E, ...args: Events[E]) {
    this.handlers.get(event)?.forEach((handler) => (handler as Handler<E>)(...args));
  }
}

export const EventBus = new Emitter();

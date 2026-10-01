// Ponte entre o Phaser (mundo do jogo) e o React (interface).
// Não importa nada do Phaser, para a UI poder usar sem puxar a biblioteca.

type Handler = (...args: unknown[]) => void;

class Emitter {
  private handlers = new Map<string, Set<Handler>>();

  on(event: string, handler: Handler) {
    if (!this.handlers.has(event)) this.handlers.set(event, new Set());
    this.handlers.get(event)!.add(handler);
    return () => this.off(event, handler);
  }

  off(event: string, handler: Handler) {
    this.handlers.get(event)?.delete(handler);
  }

  emit(event: string, ...args: unknown[]) {
    this.handlers.get(event)?.forEach((handler) => handler(...args));
  }
}

export const EventBus = new Emitter();

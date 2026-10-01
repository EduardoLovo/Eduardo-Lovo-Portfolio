// Tipos do conteúdo do jogo (dialogs.json, menu.json). Sem dependência do Phaser.
import type { NpcId } from "./npcs";

// natural = avança (+2) · ok = avança com dica (+1) · wrong = dica e tenta de novo (0)
export type ChoiceKind = "natural" | "ok" | "wrong";

// Mudanças no estado do jogo disparadas por uma escolha natural ou ok
export type Effect =
  | { type: "addToOrder"; item: string }
  | { type: "setOrderOption"; option: "size" | "takeaway"; value: string }
  | { type: "setFlag"; flag: string }
  | { type: "pay" }; // desconta o total do pedido da carteira e marca "hasPaid"

export interface Choice {
  text: string;
  kind: ChoiceKind;
  /** Próximo nó. Sem `next`: "wrong" repete o nó atual; "natural"/"ok" encerram o diálogo */
  next?: string;
  /** Dica em português (obrigatória em "ok" e "wrong") */
  feedback?: string;
  effects?: Effect[];
}

export interface DialogNode {
  text: string;
  /** Tradução da fala, mostrada pelo botão PT */
  translation: string;
  /** Pergunta em português mostrada acima das opções (ex.: "Quanto ela disse?") */
  prompt?: string;
  /** Sem opções: o jogador só aperta "continuar" */
  choices?: Choice[];
  /** Para nós sem opções. Sem `next`, o diálogo termina */
  next?: string;
  /** Expressões que vão para o glossário */
  learn?: string[];
}

export interface Dialog {
  npc: NpcId;
  /** Flags que precisam estar ligadas para este diálogo valer */
  requires?: string[];
  /** Flags que não podem estar ligadas */
  unless?: string[];
  start: string;
  nodes: Record<string, DialogNode>;
}

/** A ordem importa: para cada NPC vale o primeiro diálogo cujas condições batem */
export type Dialogs = Record<string, Dialog>;

export interface MenuItem {
  name: string;
  /** Em centavos */
  price: number;
  kind: "drink" | "food";
}

export interface Menu {
  items: Record<string, MenuItem>;
  /** Acréscimo por tamanho da bebida, em centavos */
  sizes: Record<string, number>;
}

// Tipos do conteúdo do jogo (dialogs.json). Sem dependência do Phaser.

// natural = avança (+2) · ok = avança com dica (+1) · wrong = dica e tenta de novo (0)
export type ChoiceKind = "natural" | "ok" | "wrong";

// Mudanças no estado do jogo disparadas por uma escolha (aplicadas a partir da etapa 6)
export type Effect =
  | { type: "addToOrder"; item: string }
  | { type: "setOrderOption"; option: "size" | "takeaway"; value: string }
  | { type: "setFlag"; flag: string };

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
  /** Tradução da fala, mostrada pelo botão 🇧🇷 */
  translation: string;
  /** Sem opções: o jogador só aperta "continuar" */
  choices?: Choice[];
  /** Para nós sem opções. Sem `next`, o diálogo termina */
  next?: string;
  /** Expressões que vão para o glossário */
  learn?: string[];
}

export interface Dialog {
  start: string;
  nodes: Record<string, DialogNode>;
}

export type Dialogs = Record<string, Dialog>;

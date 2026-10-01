// Estado do jogo: fonte única da verdade, sem Phaser nem React.
// O reducer é puro (testável); o store só guarda o estado atual e avisa quem assina.
import type { ChoiceKind, Effect } from "../types";
import { DEFAULT_PLAYER_NAME } from "../constants";
import { orderTotal, type Order } from "./order";

export const STARTING_WALLET = 1000; // $10.00, em centavos
const POINTS: Record<ChoiceKind, number> = { natural: 2, ok: 1, wrong: 0 };

export type Screen = "intro" | "playing" | "result";

export interface GameState {
  screen: Screen;
  playerName: string;
  wallet: number;
  order: Order;
  flags: Record<string, true>;
  glossary: string[];
  /** Primeira resposta de cada pergunta ("dialogo.no" → tipo): é o que vale ponto */
  firstAnswers: Record<string, ChoiceKind>;
  /** Todas as respostas, inclusive as tentativas repetidas */
  answers: Record<ChoiceKind, number>;
  translationsUsed: number;
}

export type Action =
  | { type: "start"; playerName: string }
  | { type: "effects"; effects: Effect[] }
  | { type: "answer"; question: string; kind: ChoiceKind }
  | { type: "learn"; expressions: string[] }
  | { type: "translationUsed" }
  | { type: "finish" }
  | { type: "restart" }
  | { type: "reset" };

export function initialState(playerName = DEFAULT_PLAYER_NAME): GameState {
  return {
    screen: "intro",
    playerName,
    wallet: STARTING_WALLET,
    order: { items: [] },
    flags: {},
    glossary: [],
    firstAnswers: {},
    answers: { natural: 0, ok: 0, wrong: 0 },
    translationsUsed: 0,
  };
}

export function reduce(state: GameState, action: Action): GameState {
  switch (action.type) {
    case "start":
      return { ...state, screen: "playing", playerName: action.playerName.trim() || DEFAULT_PLAYER_NAME };
    case "effects":
      return action.effects.reduce(applyEffect, state);
    case "answer":
      return {
        ...state,
        answers: { ...state.answers, [action.kind]: state.answers[action.kind] + 1 },
        firstAnswers:
          action.question in state.firstAnswers
            ? state.firstAnswers
            : { ...state.firstAnswers, [action.question]: action.kind },
      };
    case "learn": {
      const fresh = action.expressions.filter((expression) => !state.glossary.includes(expression));
      return fresh.length ? { ...state, glossary: [...state.glossary, ...fresh] } : state;
    }
    case "translationUsed":
      return { ...state, translationsUsed: state.translationsUsed + 1 };
    case "finish":
      return { ...state, screen: "result" };
    case "restart":
      // Mantém o nome e pula a tela de introdução
      return { ...initialState(state.playerName), screen: "playing" };
    case "reset":
      return initialState();
  }
}

function applyEffect(state: GameState, effect: Effect): GameState {
  switch (effect.type) {
    case "addToOrder":
      return { ...state, order: { ...state.order, items: [...state.order.items, effect.item] } };
    case "setOrderOption":
      return { ...state, order: { ...state.order, [effect.option]: effect.value } };
    case "setFlag":
      return { ...state, flags: { ...state.flags, [effect.flag]: true } };
    case "pay":
      return {
        ...state,
        wallet: state.wallet - orderTotal(state.order),
        flags: { ...state.flags, hasPaid: true },
      };
  }
}

export function hasFlag(state: GameState, flag: string) {
  return state.flags[flag] === true;
}

/** Resumo para a tela de resultado */
export function summarize(state: GameState) {
  const firstAnswers = Object.values(state.firstAnswers);
  const points = firstAnswers.reduce((sum, kind) => sum + POINTS[kind], 0);
  const maxPoints = firstAnswers.length * POINTS.natural;
  const percent = maxPoints ? Math.round((points / maxPoints) * 100) : 0;
  const bonus = hasFlag(state, "talkedToCustomer");

  let stars = hasFlag(state, "finished") ? 1 : 0;
  if (stars && percent >= 70) stars = 2;
  if (stars && percent >= 85 && bonus) stars = 3;

  return { points, maxPoints, percent, stars, bonus, ...state.answers, translationsUsed: state.translationsUsed };
}

function createStore() {
  let state = initialState();
  const listeners = new Set<() => void>();
  return {
    get: () => state,
    dispatch(action: Action) {
      const next = reduce(state, action);
      if (next === state) return;
      state = next;
      listeners.forEach((listener) => listener());
    },
    subscribe(listener: () => void) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
  };
}

export const gameStore = createStore();

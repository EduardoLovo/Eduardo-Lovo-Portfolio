import { describe, expect, it } from "vitest";
import { initialState, reduce, summarize, STARTING_WALLET, type Action, type GameState } from "./GameStore";
import { describeOrder, formatMoney, orderTotal } from "./order";

const run = (actions: Action[], state: GameState = initialState()) => actions.reduce(reduce, state);

// O pedido da missão, do jeito que o diálogo do Leo monta
const missionOrder: Action = {
  type: "effects",
  effects: [
    { type: "addToOrder", item: "latte" },
    { type: "setOrderOption", option: "size", value: "medium" },
    { type: "setOrderOption", option: "takeaway", value: "to go" },
    { type: "addToOrder", item: "blueberry_muffin" },
  ],
};

describe("pedido", () => {
  it("a missão custa $6.75 e o troco de $10 é $3.25 (como dizem os diálogos da Mia)", () => {
    const { order } = run([missionOrder]);
    expect(formatMoney(orderTotal(order))).toBe("$6.75");
    expect(formatMoney(STARTING_WALLET - orderTotal(order))).toBe("$3.25");
  });

  it("descreve o pedido para o HUD", () => {
    expect(describeOrder(run([missionOrder]).order)).toEqual(["Medium latte (to go)", "Blueberry muffin"]);
  });

  it("acusa item fora do cardápio", () => {
    expect(() => orderTotal({ items: ["pizza"] })).toThrow();
  });
});

describe("GameStore", () => {
  it("começa na introdução e usa o nome digitado (ou o padrão)", () => {
    expect(initialState().screen).toBe("intro");
    expect(run([{ type: "start", playerName: "  Bia " }]).playerName).toBe("Bia");
    expect(run([{ type: "start", playerName: "   " }]).playerName).toBe("Alex");
  });

  it("pagar desconta o total da carteira e marca hasPaid", () => {
    const state = run([missionOrder, { type: "effects", effects: [{ type: "pay" }] }]);
    expect(state.wallet).toBe(325);
    expect(state.flags.hasPaid).toBe(true);
  });

  it("só a primeira resposta de cada pergunta vale ponto, mas todas são contadas", () => {
    const state = run([
      { type: "answer", question: "leo.greet", kind: "wrong" },
      { type: "answer", question: "leo.greet", kind: "natural" },
      { type: "answer", question: "leo.size", kind: "natural" },
    ]);
    expect(state.firstAnswers).toEqual({ "leo.greet": "wrong", "leo.size": "natural" });
    expect(state.answers).toEqual({ natural: 2, ok: 0, wrong: 1 });
    expect(summarize(state)).toMatchObject({ points: 2, maxPoints: 4, percent: 50 });
  });

  it("glossário não repete expressões", () => {
    const state = run([
      { type: "learn", expressions: ["to go", "cash / card"] },
      { type: "learn", expressions: ["to go"] },
    ]);
    expect(state.glossary).toEqual(["to go", "cash / card"]);
  });

  it("estrelas: 1 por terminar, 2 com 70%+, 3 com 85%+ e a conversa bônus", () => {
    const finished: Action = { type: "effects", effects: [{ type: "setFlag", flag: "finished" }] };
    const perfect = run([finished, { type: "answer", question: "a", kind: "natural" }]);
    expect(summarize(perfect).stars).toBe(2);

    const bonus = run([{ type: "effects", effects: [{ type: "setFlag", flag: "talkedToCustomer" }] }], perfect);
    expect(summarize(bonus).stars).toBe(3);

    const weak = run([finished, { type: "answer", question: "a", kind: "wrong" }]);
    expect(summarize(weak).stars).toBe(1);
    expect(summarize(initialState()).stars).toBe(0);
  });

  it("jogar de novo zera tudo, mas mantém o nome e pula a introdução", () => {
    const played = run([{ type: "start", playerName: "Bia" }, missionOrder, { type: "finish" }]);
    const again = reduce(played, { type: "restart" });
    expect(again).toMatchObject({ screen: "playing", playerName: "Bia", wallet: STARTING_WALLET, order: { items: [] } });
  });
});

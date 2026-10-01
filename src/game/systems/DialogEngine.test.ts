import { describe, expect, it } from "vitest";
import { advance, choose, currentNode, renderText, startDialog, validateDialogs } from "./DialogEngine";
import type { Dialog, Dialogs } from "../types";
import dialogsJson from "../../data/cafe/dialogs.json";

const dialog: Dialog = {
  start: "greet",
  nodes: {
    greet: {
      text: "How are you?",
      translation: "Como vai?",
      choices: [
        { text: "I'm good!", kind: "natural", next: "bye" },
        { text: "I am fine.", kind: "ok", next: "bye", feedback: "Formal demais" },
        { text: "Yes.", kind: "wrong", feedback: "Não é sim/não" },
      ],
    },
    bye: { text: "See you!", translation: "Até mais!" },
  },
};

describe("DialogEngine", () => {
  it("começa no nó inicial", () => {
    const state = startDialog(dialog);
    expect(state).toEqual({ nodeId: "greet", ended: false });
    expect(currentNode(dialog, state).text).toBe("How are you?");
  });

  it("resposta natural ou ok avança para o próximo nó", () => {
    for (const index of [0, 1]) {
      const { state, choice } = choose(dialog, startDialog(dialog), index);
      expect(state.nodeId).toBe("bye");
      expect(choice.kind).not.toBe("wrong");
    }
  });

  it("resposta errada mantém o jogador no mesmo nó", () => {
    const start = startDialog(dialog);
    const { state, choice } = choose(dialog, start, 2);
    expect(state).toEqual(start);
    expect(choice.feedback).toBe("Não é sim/não");
  });

  it("nó sem opções e sem next encerra ao continuar", () => {
    const { state } = choose(dialog, startDialog(dialog), 0);
    expect(advance(dialog, state).ended).toBe(true);
  });

  it("opção natural sem next encerra o diálogo", () => {
    const single: Dialog = {
      start: "a",
      nodes: { a: { text: "Bye!", translation: "Tchau!", choices: [{ text: "Bye!", kind: "natural" }] } },
    };
    expect(choose(single, startDialog(single), 0).state.ended).toBe(true);
  });

  it("não deixa usar advance() em nó com opções", () => {
    expect(() => advance(dialog, startDialog(dialog))).toThrow();
  });

  it("troca variáveis no texto e mantém as desconhecidas", () => {
    expect(renderText("It's {playerName}. {other}", { playerName: "Alex" })).toBe("It's Alex. {other}");
  });

  it("aponta problemas no conteúdo", () => {
    const broken: Dialogs = {
      x: {
        start: "missing",
        nodes: {
          a: {
            text: "Hi",
            translation: "",
            choices: [
              { text: "?", kind: "wrong" },
              { text: "!", kind: "ok", next: "nowhere" },
            ],
          },
        },
      },
    };
    const errors = validateDialogs(broken);
    expect(errors).toContain('x: nó inicial "missing" não existe');
    expect(errors).toContain("x.a: sem tradução");
    expect(errors).toContain('x.a[0]: resposta "wrong" sem dica');
    expect(errors).toContain('x.a[1]: next "nowhere" não existe');
  });
});

describe("dialogs.json", () => {
  it("não tem nós quebrados, traduções ou dicas faltando", () => {
    expect(validateDialogs(dialogsJson as Dialogs)).toEqual([]);
  });

  it("todo nó com opções tem uma resposta natural", () => {
    for (const [dialogId, d] of Object.entries(dialogsJson as Dialogs)) {
      for (const [nodeId, node] of Object.entries(d.nodes)) {
        if (node.choices) expect(node.choices.some((c) => c.kind === "natural"), `${dialogId}.${nodeId}`).toBe(true);
      }
    }
  });
});

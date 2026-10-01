import { describe, expect, it } from "vitest";
import { advance, choose, currentNode, pickDialog, renderText, startDialog, validateDialogs } from "./DialogEngine";
import type { Dialog, Dialogs } from "../types";
import dialogsJson from "../../data/cafe/dialogs.json";
import { NPCS } from "../npcs";

const npcIds = Object.keys(NPCS);
const dialogs = dialogsJson as Dialogs;

const dialog: Dialog = {
  npc: "emma",
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
      npc: "emma",
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
        npc: "emma",
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

describe("pickDialog", () => {
  const routed: Dialogs = {
    late: { npc: "leo", requires: ["paid"], start: "a", nodes: { a: { text: "x", translation: "x" } } },
    blocked: { npc: "leo", unless: ["angry"], start: "a", nodes: { a: { text: "x", translation: "x" } } },
    fallback: { npc: "leo", start: "a", nodes: { a: { text: "x", translation: "x" } } },
  };

  it("escolhe o primeiro diálogo cujas condições batem", () => {
    expect(pickDialog(routed, "leo", { paid: true })).toBe("late");
    expect(pickDialog(routed, "leo", {})).toBe("blocked");
    expect(pickDialog(routed, "leo", { angry: true })).toBe("fallback");
    expect(pickDialog(routed, "mia", {})).toBeNull();
  });

  it("acusa NPC sem fallback e diálogo inalcançável", () => {
    const errors = validateDialogs({ fallback: routed.fallback, late: routed.late }, ["leo", "mia"]);
    expect(errors).toContain("mia: falta um diálogo sem condições (fallback)");
    expect(errors).toContain("late: nunca é escolhido (vem depois do fallback)");
  });
});

describe("dialogs.json", () => {
  it("não tem nós quebrados, traduções, dicas ou fallbacks faltando", () => {
    expect(validateDialogs(dialogs, npcIds)).toEqual([]);
  });

  it("segue o roteiro conforme o andamento do jogo", () => {
    const at = (...flags: string[]) => Object.fromEntries(flags.map((flag) => [flag, true as const]));
    expect(pickDialog(dialogs, "mia", at())).toBe("mia_wait");
    expect(pickDialog(dialogs, "mia", at("hasOrdered"))).toBe("mia");
    expect(pickDialog(dialogs, "leo", at("hasOrdered"))).toBe("leo_after_order");
    expect(pickDialog(dialogs, "leo", at("hasOrdered", "hasPaid"))).toBe("leo_waiting");
    expect(pickDialog(dialogs, "leo", at("hasOrdered", "hasPaid", "orderReady"))).toBe("leo_pickup");
    expect(pickDialog(dialogs, "emma", at("metEmma", "gotOrder"))).toBe("emma_goodbye");
  });

  it("todo nó com opções tem uma resposta natural", () => {
    for (const [dialogId, d] of Object.entries(dialogs)) {
      for (const [nodeId, node] of Object.entries(d.nodes)) {
        if (node.choices) expect(node.choices.some((c) => c.kind === "natural"), `${dialogId}.${nodeId}`).toBe(true);
      }
    }
  });
});

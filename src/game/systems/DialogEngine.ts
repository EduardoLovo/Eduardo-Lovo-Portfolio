// Percorre a árvore de diálogo. Funções puras: recebem o estado e devolvem um novo,
// sem Phaser nem React — por isso dá para testar isoladamente.
import type { Choice, Dialog, DialogNode, Dialogs } from "../types";

export interface DialogState {
  nodeId: string;
  ended: boolean;
}

/**
 * Escolhe o diálogo do NPC conforme o andamento do jogo: vale o primeiro (na ordem do JSON)
 * cujas flags `requires` estão todas ligadas e nenhuma `unless` está ligada.
 */
export function pickDialog(dialogs: Dialogs, npc: string, flags: Record<string, true>): string | null {
  const matches = ([, dialog]: [string, Dialog]) =>
    dialog.npc === npc &&
    (dialog.requires ?? []).every((flag) => flags[flag]) &&
    !(dialog.unless ?? []).some((flag) => flags[flag]);
  return Object.entries(dialogs).find(matches)?.[0] ?? null;
}

export function startDialog(dialog: Dialog): DialogState {
  return { nodeId: dialog.start, ended: false };
}

export function currentNode(dialog: Dialog, state: DialogState): DialogNode {
  const node = dialog.nodes[state.nodeId];
  if (!node) throw new Error(`Nó de diálogo "${state.nodeId}" não existe`);
  return node;
}

/** Escolhe uma opção do nó atual. Resposta errada mantém o jogador no mesmo nó. */
export function choose(dialog: Dialog, state: DialogState, choiceIndex: number): { state: DialogState; choice: Choice } {
  const choice = currentNode(dialog, state).choices?.[choiceIndex];
  if (!choice) throw new Error(`Opção ${choiceIndex} não existe no nó "${state.nodeId}"`);

  if (choice.next) return { state: { nodeId: choice.next, ended: false }, choice };
  if (choice.kind === "wrong") return { state, choice };
  return { state: { ...state, ended: true }, choice };
}

/** Avança um nó sem opções (o "continuar"). */
export function advance(dialog: Dialog, state: DialogState): DialogState {
  const node = currentNode(dialog, state);
  if (node.choices?.length) throw new Error(`O nó "${state.nodeId}" tem opções: use choose()`);
  return node.next ? { nodeId: node.next, ended: false } : { ...state, ended: true };
}

/** Troca variáveis como {playerName} pelo valor correspondente. */
export function renderText(text: string, vars: Record<string, string>) {
  return text.replace(/\{(\w+)\}/g, (match, key: string) => vars[key] ?? match);
}

/** Confere se o conteúdo é consistente. Devolve a lista de problemas (vazia = tudo certo). */
export function validateDialogs(dialogs: Dialogs, npcs: readonly string[] = []): string[] {
  const errors: string[] = [];
  // Todo NPC precisa de um diálogo sem condições, para nunca ficar sem resposta
  for (const npc of npcs) {
    const fallback = Object.values(dialogs).some((d) => d.npc === npc && !d.requires?.length && !d.unless?.length);
    if (!fallback) errors.push(`${npc}: falta um diálogo sem condições (fallback)`);
  }
  const npcsWithFallback = new Set<string>();
  for (const [dialogId, dialog] of Object.entries(dialogs)) {
    if (npcs.length && !npcs.includes(dialog.npc)) errors.push(`${dialogId}: NPC "${dialog.npc}" não existe`);
    // Depois do diálogo sem condições de um NPC, os seguintes dele nunca seriam escolhidos
    if (npcsWithFallback.has(dialog.npc)) errors.push(`${dialogId}: nunca é escolhido (vem depois do fallback)`);
    if (!dialog.requires?.length && !dialog.unless?.length) npcsWithFallback.add(dialog.npc);
    const where = (nodeId: string) => `${dialogId}.${nodeId}`;
    if (!dialog.nodes[dialog.start]) errors.push(`${dialogId}: nó inicial "${dialog.start}" não existe`);

    for (const [nodeId, node] of Object.entries(dialog.nodes)) {
      if (!node.text.trim()) errors.push(`${where(nodeId)}: fala vazia`);
      if (!node.translation?.trim()) errors.push(`${where(nodeId)}: sem tradução`);
      if (node.next && !dialog.nodes[node.next]) errors.push(`${where(nodeId)}: next "${node.next}" não existe`);
      if (node.choices && node.next) errors.push(`${where(nodeId)}: nó com opções não deve ter next`);

      node.choices?.forEach((choice, i) => {
        if (choice.next && !dialog.nodes[choice.next])
          errors.push(`${where(nodeId)}[${i}]: next "${choice.next}" não existe`);
        if (choice.kind !== "natural" && !choice.feedback?.trim())
          errors.push(`${where(nodeId)}[${i}]: resposta "${choice.kind}" sem dica`);
      });
      if (node.choices && !node.choices.some((choice) => choice.kind !== "wrong"))
        errors.push(`${where(nodeId)}: nenhuma opção avança`);
    }
  }
  return errors;
}

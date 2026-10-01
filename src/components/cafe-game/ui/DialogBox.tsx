"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { EventBus } from "@/game/EventBus";
import { NPCS, type NpcId } from "@/game/npcs";
import { DEFAULT_PLAYER_NAME } from "@/game/constants";
import { advance, choose, currentNode, renderText, startDialog, type DialogState } from "@/game/systems/DialogEngine";
import type { ChoiceKind, Dialogs } from "@/game/types";
import dialogsJson from "@/data/cafe/dialogs.json";

const dialogs = dialogsJson as Dialogs;
const TYPING_MS = 22;
const vars = { playerName: DEFAULT_PLAYER_NAME };

// typing: texto aparecendo · choosing: opções na tela · feedback: dica após a escolha · continue: nó sem opções
type Phase = "typing" | "choosing" | "feedback" | "continue";
type Feedback = { kind: Exclude<ChoiceKind, "natural">; text: string; after: DialogState };

export default function DialogBox() {
  const [npcId, setNpcId] = useState<NpcId | null>(null);
  const [state, setState] = useState<DialogState | null>(null);
  const [typed, setTyped] = useState(0);
  const [selected, setSelected] = useState(0);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [showTranslation, setShowTranslation] = useState(false);

  const dialog = npcId ? dialogs[npcId] : null;
  const node = dialog && state ? currentNode(dialog, state) : null;
  const text = node ? renderText(node.text, vars) : "";
  const phase: Phase = feedback
    ? "feedback"
    : typed < text.length
      ? "typing"
      : node?.choices?.length
        ? "choosing"
        : "continue";

  // Opções embaralhadas (a natural nem sempre é a primeira), mas estáveis enquanto o nó está na tela
  const options = useMemo(
    () => (node?.choices ? shuffle(node.choices.map((choice, index) => ({ choice, index })), `${npcId}.${state?.nodeId}`) : []),
    [node, npcId, state?.nodeId],
  );

  const goTo = useCallback((next: DialogState) => {
    setState(next);
    setTyped(0);
    setSelected(0);
    setFeedback(null);
    setShowTranslation(false);
  }, []);

  const close = useCallback(() => {
    setNpcId(null);
    setState(null);
    window.speechSynthesis?.cancel();
    EventBus.emit("dialog:end");
  }, []);

  // Phaser avisa que o jogador apertou E perto de um NPC
  useEffect(
    () =>
      EventBus.on("dialog:start", (id) => {
        const npcDialog = dialogs[id];
        if (!npcDialog) {
          EventBus.emit("dialog:end");
          return;
        }
        setNpcId(id);
        goTo(startDialog(npcDialog));
      }),
    [goTo],
  );

  // Efeito de digitação: revela uma letra por vez até completar o texto
  const typing = phase === "typing";
  useEffect(() => {
    if (!typing) return;
    const timer = setInterval(() => setTyped((count) => Math.min(count + 1, text.length)), TYPING_MS);
    return () => clearInterval(timer);
  }, [typing, text]);

  const pick = useCallback(
    (optionIndex: number) => {
      if (!dialog || !state) return;
      const option = options[optionIndex];
      if (!option) return;
      const result = choose(dialog, state, option.index);
      // TODO etapa 6: aplicar result.choice.effects, pontos e glossário no GameState
      if (result.choice.kind === "natural") {
        if (result.state.ended) close();
        else goTo(result.state);
      } else {
        setFeedback({ kind: result.choice.kind, text: result.choice.feedback ?? "", after: result.state });
      }
    },
    [dialog, state, options, close, goTo],
  );

  // Botão principal: pula a digitação, confirma a opção, sai da dica ou continua
  const confirm = useCallback(() => {
    if (!dialog || !state || !node) return;
    if (phase === "typing") {
      setTyped(text.length);
    } else if (phase === "choosing") {
      pick(selected);
    } else if (phase === "feedback" && feedback) {
      if (feedback.kind === "wrong") setFeedback(null);
      else if (feedback.after.ended) close();
      else goTo(feedback.after);
    } else if (phase === "continue") {
      const next = advance(dialog, state);
      if (next.ended) close();
      else goTo(next);
    }
  }, [dialog, state, node, phase, text, selected, feedback, pick, close, goTo]);

  // Teclado: E/Enter/Espaço confirmam, setas ou W/S escolhem, 1-3 escolhem direto, T traduz, Esc fecha
  useEffect(() => {
    if (!npcId) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.repeat) return;
      const key = event.key.toLowerCase();
      const handled = () => event.preventDefault();

      if (key === "escape") return handled(), close();
      if (key === "t") return handled(), setShowTranslation((value) => !value);
      if (["e", "enter", " "].includes(key)) return handled(), confirm();
      if (phase !== "choosing") return;
      if (key === "arrowdown" || key === "s") return handled(), setSelected((i) => (i + 1) % options.length);
      if (key === "arrowup" || key === "w") return handled(), setSelected((i) => (i - 1 + options.length) % options.length);
      const number = Number(key);
      if (number >= 1 && number <= options.length) return handled(), pick(number - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [npcId, phase, options.length, confirm, pick, close]);

  if (!npcId || !node) return null;

  const speak = () => {
    const synth = window.speechSynthesis;
    if (!synth) return;
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.9;
    synth.speak(utterance);
  };

  return (
    <div
      role="dialog"
      aria-label={`Conversa com ${NPCS[npcId].name}`}
      className="absolute inset-x-2 bottom-2 flex max-h-[85%] flex-col gap-2 overflow-y-auto rounded-lg border-4 border-[#3b2a33] bg-[#f3eee6] p-3 text-[#1b1420] shadow-xl sm:inset-x-3 sm:bottom-3 sm:p-4"
      style={{ fontFamily: "var(--font-pixel), monospace" }}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="rounded bg-[#3b2a33] px-2 py-0.5 text-sm text-[#f3eee6]">{NPCS[npcId].name}</span>
        <div className="flex gap-1">
          <IconButton label="Ouvir a fala (inglês)" onClick={speak}>
            🔊
          </IconButton>
          {/* Texto em vez de 🇧🇷: o Windows não desenha emojis de bandeira */}
          <IconButton label="Mostrar tradução (T)" active={showTranslation} onClick={() => setShowTranslation((v) => !v)}>
            PT
          </IconButton>
          <IconButton label="Fechar (Esc)" onClick={close}>
            ✕
          </IconButton>
        </div>
      </div>

      <p className="min-h-[1.5em] text-base leading-snug sm:text-lg" aria-live="polite">
        {text.slice(0, typed)}
        {phase === "typing" && <span className="animate-pulse">▌</span>}
      </p>
      {showTranslation && (
        <p className="text-sm italic text-[#6b5560]">{renderText(node.translation, vars)}</p>
      )}

      {phase === "choosing" && (
        <ol className="flex flex-col gap-1">
          {options.map(({ choice }, i) => (
            <li key={choice.text}>
              <button
                type="button"
                onClick={() => pick(i)}
                onMouseEnter={() => setSelected(i)}
                className={`w-full rounded px-2 py-1 text-left text-sm transition sm:text-base ${
                  i === selected ? "bg-[#3b2a33] text-[#f3eee6]" : "hover:bg-[#e4dccf]"
                }`}
              >
                <span className="mr-2 opacity-60">{i + 1}.</span>
                {renderText(choice.text, vars)}
              </button>
            </li>
          ))}
        </ol>
      )}

      {phase === "feedback" && feedback && (
        <div
          className={`rounded border-2 p-2 text-sm sm:text-base ${
            feedback.kind === "ok" ? "border-[#c9a227] bg-[#fbf1c7]" : "border-[#c0392b] bg-[#fbe0dc]"
          }`}
        >
          <p className="font-bold">{feedback.kind === "ok" ? "🟡 Entendível!" : "❌ Hmm, não foi bem isso."}</p>
          <p className="mt-1">
            <RichText text={feedback.text} />
          </p>
        </div>
      )}

      {(phase === "feedback" || phase === "continue") && (
        <button
          type="button"
          onClick={confirm}
          className="self-end rounded bg-[#3b2a33] px-3 py-1 text-sm text-[#f3eee6] hover:bg-[#5a4050]"
        >
          {phase === "feedback" && feedback?.kind === "wrong" ? "Tentar de novo" : "Continuar"} ▶ <kbd>E</kbd>
        </button>
      )}
    </div>
  );
}

function IconButton({
  label,
  active,
  onClick,
  children,
}: {
  label: string;
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active}
      onClick={onClick}
      className={`h-7 min-w-7 rounded px-1 text-sm leading-none ${active ? "bg-[#3b2a33] text-[#f3eee6]" : "hover:bg-[#e4dccf]"}`}
    >
      {children}
    </button>
  );
}

// Suporta **negrito** nas dicas do dialogs.json
function RichText({ text }: { text: string }) {
  return text.split(/(\*\*.+?\*\*)/g).map((part, i) =>
    part.startsWith("**") ? <strong key={i}>{part.slice(2, -2)}</strong> : <span key={i}>{part}</span>,
  );
}

// Embaralhamento determinístico (mesma ordem sempre para o mesmo nó)
function shuffle<T>(items: T[], seed: string): T[] {
  let hash = 0;
  for (const char of seed) hash = (hash * 31 + char.charCodeAt(0)) | 0;
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    hash = (hash * 1103515245 + 12345) | 0;
    const j = Math.abs(hash) % (i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

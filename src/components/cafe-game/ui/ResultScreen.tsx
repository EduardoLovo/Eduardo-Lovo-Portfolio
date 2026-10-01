"use client";

import { useState } from "react";
import { EventBus } from "@/game/EventBus";
import { gameStore, summarize } from "@/game/systems/GameStore";
import { useGameState } from "../useGameState";
import { PANEL, PIXEL_FONT } from "./pixel";

export default function ResultScreen() {
  const state = useGameState();
  const [showGlossary, setShowGlossary] = useState(false);
  if (state.screen !== "result") return null;

  const result = summarize(state);
  const playAgain = () => {
    setShowGlossary(false);
    gameStore.dispatch({ type: "restart" });
    EventBus.emit("game:restart");
  };

  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center overflow-y-auto bg-[#1b1420]/70 p-2 sm:p-4">
      <div
        className={`${PANEL} flex w-full max-w-md flex-col gap-2 p-3 text-sm sm:gap-3 sm:p-5 sm:text-base`}
        style={PIXEL_FONT}
      >
        <h2 className="text-center text-lg font-bold sm:text-2xl">☕ Mission complete!</h2>
        <p className="text-center text-2xl tracking-widest sm:text-3xl" aria-label={`${result.stars} de 3 estrelas`}>
          {"⭐".repeat(result.stars)}
          <span className="opacity-25">{"⭐".repeat(3 - result.stars)}</span>
        </p>

        <ul className="flex flex-col gap-1">
          <li>
            🎯 Fluência: <strong>{result.percent}%</strong> ({result.points}/{result.maxPoints} pontos na primeira
            tentativa)
          </li>
          <li>
            💬 Respostas naturais: {result.natural} · Entendíveis: {result.ok} · Erradas: {result.wrong}
          </li>
          <li>🌐 Traduções usadas: {result.translationsUsed}</li>
          <li>{result.bonus ? "🗣️ Bônus: conversou com o Mr. Brown ✔" : "🗣️ Bônus: faltou conversar com o Mr. Brown"}</li>
        </ul>

        <button
          type="button"
          onClick={() => setShowGlossary((value) => !value)}
          className="rounded border-2 border-[#3b2a33] px-3 py-1 hover:bg-[#e4dccf]"
        >
          📘 Você aprendeu {state.glossary.length} expressões {showGlossary ? "▲" : "▼"}
        </button>
        {showGlossary && (
          <ul className="grid grid-cols-1 gap-x-4 rounded bg-[#e4dccf] p-2 text-sm sm:grid-cols-2">
            {state.glossary.map((expression) => (
              <li key={expression}>• {expression}</li>
            ))}
          </ul>
        )}

        <p className="text-xs opacity-70 sm:text-sm">
          {result.stars < 3 && "Para 3 estrelas: acerte 85% de primeira e converse com o Mr. Brown."}
        </p>
        <button
          type="button"
          onClick={playAgain}
          className="rounded bg-[#3b2a33] px-4 py-2 text-[#f3eee6] hover:bg-[#5a4050]"
        >
          Jogar de novo ↻
        </button>
      </div>
    </div>
  );
}

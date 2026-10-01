"use client";

import { useState } from "react";
import { gameStore } from "@/game/systems/GameStore";
import { DEFAULT_PLAYER_NAME } from "@/game/constants";
import { useGameState } from "../useGameState";
import { PANEL, PIXEL_FONT } from "./pixel";

// Cena 0 do roteiro: história, missão e nome do jogador
export default function IntroScreen({ docked = false }: { docked?: boolean }) {
  const { screen } = useGameState();
  const [name, setName] = useState("");

  if (screen !== "intro") return null;

  return (
    <div
      className={
        docked
          ? "flex justify-center"
          : "absolute inset-0 z-30 flex items-center justify-center overflow-y-auto bg-[#1b1420]/70 p-2 sm:p-4"
      }
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
          gameStore.dispatch({ type: "start", playerName: name });
        }}
        className={`${PANEL} flex w-full max-w-md flex-col gap-2 p-3 text-sm sm:gap-3 sm:p-5 sm:text-base`}
        style={PIXEL_FONT}
      >
        <h2 className="text-lg font-bold sm:text-2xl">☕ Bean There Café</h2>
        <p>
          Você acabou de chegar aos Estados Unidos e entrou numa cafeteria pela primeira vez. Ninguém aqui fala
          português!
        </p>
        <div className="rounded border-2 border-[#3b2a33] bg-[#fbf1c7] p-2">
          <p className="font-bold">📋 Missão</p>
          <p>
            Pedir um <strong>latte médio para viagem</strong> e um <strong>muffin de blueberry</strong>, pagar e
            retirar o pedido.
          </p>
          <p className="mt-1">💵 Você tem $10.00.</p>
        </div>
        <label className="flex flex-col gap-1">
          <span>Como você se chama?</span>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder={DEFAULT_PLAYER_NAME}
            maxLength={12}
            autoComplete="off"
            className="rounded border-2 border-[#3b2a33] bg-white px-2 py-1"
          />
        </label>
        <p className="text-xs opacity-70 sm:text-sm">
          {docked
            ? "Arraste o direcional para andar e toque em E para conversar."
            : "Setas/WASD andam · E conversa · 1-3 respondem · T traduz"}
        </p>
        <button type="submit" className="rounded bg-[#3b2a33] px-4 py-2 text-[#f3eee6] hover:bg-[#5a4050]">
          Começar ▶
        </button>
      </form>
    </div>
  );
}

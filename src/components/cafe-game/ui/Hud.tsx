"use client";

import { useState } from "react";
import { hasFlag } from "@/game/systems/GameStore";
import { isMuted, setMuted } from "@/game/sounds";
import { describeOrder, formatMoney } from "@/game/systems/order";
import { useGameState } from "../useGameState";
import { PIXEL_FONT } from "./pixel";

// Carteira, pedido e checklist da missão, por cima do jogo
export default function Hud() {
  const state = useGameState();
  const [muted, setMutedState] = useState(isMuted);
  if (state.screen !== "playing") return null;

  const toggleMute = () => {
    setMuted(!muted);
    setMutedState(!muted);
  };

  const steps = [
    { label: "Fazer o pedido com o Leo", done: hasFlag(state, "hasOrdered") },
    { label: "Pagar no caixa com a Mia", done: hasFlag(state, "hasPaid") },
    { label: "Retirar o pedido", done: hasFlag(state, "gotOrder") },
    { label: "Despedir-se na saída", done: hasFlag(state, "finished") },
  ];
  const order = describeOrder(state.order);
  const box = "rounded border-2 border-[#3b2a33] bg-[#f3eee6]/90 px-2 py-1 text-[#1b1420] shadow";

  return (
    <div
      className="pointer-events-none absolute inset-x-2 top-2 z-10 flex items-start justify-between gap-2 text-[10px] leading-tight sm:text-xs"
      style={PIXEL_FONT}
    >
      <div className={`${box} flex flex-col gap-0.5`}>
        <div className="flex items-center justify-between gap-2">
          <span className="font-bold">💵 {formatMoney(state.wallet)}</span>
          <button
            type="button"
            onClick={toggleMute}
            aria-label={muted ? "Ligar som" : "Desligar som"}
            title={muted ? "Ligar som" : "Desligar som"}
            className="pointer-events-auto rounded px-1 hover:bg-[#e4dccf]"
          >
            {muted ? "🔇" : "🔊"}
          </button>
        </div>
        {order.length > 0 && (
          <ul>
            {order.map((item) => (
              <li key={item}>☕ {item}</li>
            ))}
          </ul>
        )}
      </div>
      <ul className={`${box} hidden sm:block`}>
        {steps.map((step) => (
          <li key={step.label} className={step.done ? "line-through opacity-50" : ""}>
            {step.done ? "☑" : "☐"} {step.label}
          </li>
        ))}
        <li className={`mt-0.5 ${hasFlag(state, "talkedToCustomer") ? "line-through opacity-50" : "opacity-80"}`}>
          ⭐ Bônus: conversar com o Mr. Brown
        </li>
      </ul>
    </div>
  );
}

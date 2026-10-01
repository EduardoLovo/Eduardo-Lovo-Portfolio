"use client";

import { useEffect, useRef, useState } from "react";
import { EventBus } from "@/game/EventBus";
import { setVirtualDirections } from "@/game/input";
import type { Direction } from "@/game/characters";
import { useGameState } from "../useGameState";
import { PIXEL_FONT } from "./pixel";

// Distância mínima do centro (fração do raio) para contar como direção: evita andar com um toque no meio
const DEAD_ZONE = 0.3;

const ARROWS: { direction: Direction; label: string; className: string }[] = [
  { direction: "up", label: "▲", className: "left-1/2 top-1 -translate-x-1/2" },
  { direction: "down", label: "▼", className: "bottom-1 left-1/2 -translate-x-1/2" },
  { direction: "left", label: "◀", className: "left-1 top-1/2 -translate-y-1/2" },
  { direction: "right", label: "▶", className: "right-1 top-1/2 -translate-y-1/2" },
];

// Direcional (arrastar o dedo funciona, inclusive na diagonal) + botão "E"
export default function TouchControls() {
  const { screen } = useGameState();
  const [inDialog, setInDialog] = useState(false);
  const [active, setActive] = useState<Partial<Record<Direction, boolean>>>({});
  const pad = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const offStart = EventBus.on("dialog:start", () => {
      // O direcional some durante o diálogo: solta qualquer direção que estava pressionada
      setVirtualDirections({});
      setActive({});
      setInDialog(true);
    });
    const offEnd = EventBus.on("dialog:end", () => setInDialog(false));
    return () => {
      offStart();
      offEnd();
      setVirtualDirections({}); // não deixa o jogador andando sozinho ao desmontar
    };
  }, []);

  if (screen !== "playing" || inDialog) return null;

  const update = (event: React.PointerEvent) => {
    const rect = pad.current!.getBoundingClientRect();
    const radius = rect.width / 2;
    const dx = (event.clientX - rect.left - radius) / radius;
    const dy = (event.clientY - rect.top - radius) / radius;
    const directions = { up: dy < -DEAD_ZONE, down: dy > DEAD_ZONE, left: dx < -DEAD_ZONE, right: dx > DEAD_ZONE };
    setVirtualDirections(directions);
    setActive(directions);
  };
  const release = () => {
    setVirtualDirections({});
    setActive({});
  };

  return (
    <div className="flex touch-none select-none items-center justify-between px-2" style={PIXEL_FONT}>
      <div
        ref={pad}
        role="group"
        aria-label="Direcional: arraste para andar"
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId);
          update(event);
        }}
        onPointerMove={(event) => {
          if (event.currentTarget.hasPointerCapture(event.pointerId)) update(event);
        }}
        onPointerUp={release}
        onPointerCancel={release}
        className="relative h-32 w-32 rounded-full border-4 border-[#3b2a33] bg-[#f3eee6]/90 shadow-lg"
      >
        {ARROWS.map(({ direction, label, className }) => (
          <span
            key={direction}
            aria-hidden
            className={`absolute flex h-10 w-10 items-center justify-center rounded-lg text-lg text-[#3b2a33] ${className} ${
              active[direction] ? "bg-[#3b2a33] text-[#f3eee6]" : ""
            }`}
          >
            {label}
          </span>
        ))}
      </div>

      <button
        type="button"
        aria-label="Conversar (E)"
        onPointerDown={(event) => {
          event.preventDefault();
          EventBus.emit("input:action");
        }}
        className="h-20 w-20 rounded-full border-4 border-[#3b2a33] bg-[#7c5cff] text-3xl font-bold text-white shadow-lg active:scale-95"
      >
        E
      </button>
    </div>
  );
}

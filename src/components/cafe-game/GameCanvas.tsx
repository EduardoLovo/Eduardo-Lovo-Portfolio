"use client";

import { useEffect, useRef } from "react";
import * as Phaser from "phaser";
import { createGameConfig } from "@/game/config";
import DialogBox from "./ui/DialogBox";

// Cria a instância do Phaser ao montar e destrói ao sair da página.
// Este arquivo só é baixado depois do clique em "Play" (ver GameLauncher).
export default function GameCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const game = new Phaser.Game(createGameConfig(containerRef.current!));
    // Facilita depurar pelo console do navegador (só em desenvolvimento)
    if (process.env.NODE_ENV === "development") Object.assign(window, { cafeGame: game });
    return () => game.destroy(true);
  }, []);

  // A interface (diálogos, HUD) fica em HTML por cima do canvas
  return (
    <div className="relative h-full w-full">
      <div ref={containerRef} className="h-full w-full" />
      <DialogBox />
    </div>
  );
}

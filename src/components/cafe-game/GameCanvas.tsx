"use client";

import { useEffect, useRef } from "react";
import * as Phaser from "phaser";
import { createGameConfig } from "@/game/config";

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

  return <div ref={containerRef} className="h-full w-full" />;
}

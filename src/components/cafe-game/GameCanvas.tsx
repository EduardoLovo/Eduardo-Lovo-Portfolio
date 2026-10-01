"use client";

import { useEffect, useRef } from "react";
import * as Phaser from "phaser";
import { createGameConfig } from "@/game/config";
import { gameStore } from "@/game/systems/GameStore";
import DialogBox from "./ui/DialogBox";
import Hud from "./ui/Hud";
import IntroScreen from "./ui/IntroScreen";
import ResultScreen from "./ui/ResultScreen";
import TouchControls from "./ui/TouchControls";
import { GameFrame } from "./GameFrame";
import { useIsTouch } from "./useIsTouch";

// Cria a instância do Phaser ao montar e destrói ao sair da página.
// Este arquivo só é baixado depois do clique em "Play" (ver GameLauncher).
export default function GameCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouch();

  useEffect(() => {
    // O estado vive num módulo: zera ao (re)entrar na página
    gameStore.dispatch({ type: "reset" });
    const game = new Phaser.Game(createGameConfig(containerRef.current!));
    // Facilita depurar pelo console do navegador (só em desenvolvimento)
    if (process.env.NODE_ENV === "development") Object.assign(window, { cafeGame: game });
    return () => game.destroy(true);
  }, []);

  // A interface fica em HTML: por cima do canvas no computador, abaixo dele no celular (onde a tela é pequena)
  return (
    <div className="flex flex-col gap-3">
      <GameFrame>
        <div ref={containerRef} className="h-full w-full" />
        <Hud />
        {!isTouch && (
          <>
            <DialogBox />
            <IntroScreen />
            <ResultScreen />
          </>
        )}
      </GameFrame>
      {isTouch && (
        <>
          <DialogBox docked />
          <IntroScreen docked />
          <ResultScreen docked />
          <TouchControls />
        </>
      )}
    </div>
  );
}

"use client";

import { useSyncExternalStore } from "react";
import { gameStore } from "@/game/systems/GameStore";

/** Estado do jogo no React; re-renderiza quando o store muda */
export function useGameState() {
  return useSyncExternalStore(gameStore.subscribe, gameStore.get, gameStore.get);
}

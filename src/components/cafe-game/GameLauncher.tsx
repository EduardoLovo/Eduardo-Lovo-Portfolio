"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { FiPlay } from "react-icons/fi";

// O Phaser só entra no bundle desta página, e só é baixado quando o jogo é renderizado
const GameCanvas = dynamic(() => import("./GameCanvas"), {
  ssr: false,
  loading: () => <p className="font-mono text-sm text-muted">Carregando o jogo...</p>,
});

export default function GameLauncher() {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="flex aspect-[640/352] w-full items-center justify-center overflow-hidden rounded-2xl border border-border bg-[#1b1420]">
      {playing ? (
        <GameCanvas />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-mono text-lg font-medium text-white transition hover:scale-105"
        >
          <FiPlay /> Play
        </button>
      )}
    </div>
  );
}

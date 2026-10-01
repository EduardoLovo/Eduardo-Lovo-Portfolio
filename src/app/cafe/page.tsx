import type { Metadata } from "next";
import Link from "next/link";
import { Pixelify_Sans } from "next/font/google";
import { FiArrowLeft } from "react-icons/fi";
import { personal } from "@/data/portfolio";
import GameLauncher from "@/components/cafe-game/GameLauncher";

// Fonte pixel dos diálogos do jogo (usada via var(--font-pixel))
const pixelFont = Pixelify_Sans({ subsets: ["latin"], variable: "--font-pixel" });

export const metadata: Metadata = {
  title: `Bean There Café — ${personal.name}`,
  description: "Mini jogo em pixel art para praticar inglês numa cafeteria.",
};

export default function CafePage() {
  return (
    <main className={`${pixelFont.variable} mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-8`}>
      <Link
        href="/"
        className="flex w-fit items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-foreground hover:bg-card"
      >
        <FiArrowLeft /> Voltar ao site
      </Link>

      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Bean There Café ☕</h1>
        <p className="text-muted">
          Mini jogo em pixel art para praticar inglês: converse com os clientes, faça seu pedido e pague — tudo em
          inglês.
        </p>
      </header>

      <GameLauncher />

      <p className="text-sm text-muted">
        <span className="pointer-coarse:hidden">
          Controles: setas ou WASD para andar · E (ou Espaço) para conversar e confirmar · 1-3 para responder · T traduz ·
          Esc fecha.
        </span>
        <span className="hidden pointer-coarse:inline">
          Controles: arraste o direcional para andar e toque em E para conversar. Nas conversas, toque na resposta.
        </span>
      </p>
    </main>
  );
}

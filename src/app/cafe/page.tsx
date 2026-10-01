import type { Metadata } from "next";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { personal } from "@/data/portfolio";
import GameLauncher from "@/components/cafe-game/GameLauncher";

export const metadata: Metadata = {
  title: `Bean There Café — ${personal.name}`,
  description: "Mini jogo em pixel art para praticar inglês numa cafeteria.",
};

export default function CafePage() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-8">
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

      <p className="text-sm text-muted">Controles: setas ou WASD para andar.</p>
    </main>
  );
}

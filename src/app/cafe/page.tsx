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

      <footer className="border-t border-border pt-4 text-xs text-muted">
        <h2 className="mb-2 font-semibold text-foreground">Créditos</h2>
        <ul className="flex flex-col gap-1">
          <li>
            Arte:{" "}
            <a href="https://limezu.itch.io/moderninteriors" target="_blank" rel="noreferrer" className="underline">
              Modern Interiors
            </a>{" "}
            por LimeZu
          </li>
          <li>
            Música: &quot;Jazz Piano Medley #81&quot; —{" "}
            <a href="https://soundcloud.com/tri-tachyon/albums" target="_blank" rel="noreferrer" className="underline">
              Music by Tri-Tachyon
            </a>{" "}
            (
            <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noreferrer" className="underline">
              CC-BY 4.0
            </a>
            )
          </li>
          <li>
            Efeitos sonoros:{" "}
            <a href="https://kenney.nl/assets/rpg-audio" target="_blank" rel="noreferrer" className="underline">
              Kenney
            </a>{" "}
            (CC0) e sons gerados por código
          </li>
          <li>Fonte: Pixelify Sans (SIL Open Font License)</li>
        </ul>
      </footer>
    </main>
  );
}

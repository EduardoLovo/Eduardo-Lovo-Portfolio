"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiCheckCircle, FiGithub, FiPlay } from "react-icons/fi";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { game } from "@/data/portfolio";

export default function GameShowcase() {
  return (
    <section id="jogo" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-24">
      <SectionHeading eyebrow="Projeto pessoal" title="Aprenda inglês jogando" />

      <Reveal delay={0.1} className="mt-6 max-w-3xl space-y-3 text-muted">
        {game.intro.map((paragraph) => (
          <p key={paragraph} className="leading-relaxed">
            {paragraph}
          </p>
        ))}
      </Reveal>

      <motion.article
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
        className="mt-10 grid grid-cols-1 overflow-hidden rounded-3xl border border-border bg-card lg:grid-cols-[3fr_2fr]"
      >
        {/* Screenshot clicável: leva direto para o jogo */}
        <Link href={game.playUrl} className="group relative block bg-[#1b1420]" aria-label={`Jogar ${game.title}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={game.image}
            alt={`Tela do jogo ${game.title}: a cafeteria com os personagens`}
            className="aspect-[640/352] h-full w-full object-cover [image-rendering:pixelated] transition-transform duration-500 group-hover:scale-[1.02]"
          />
          <span className="absolute inset-0 flex items-center justify-center bg-background/0 transition-colors group-hover:bg-background/40">
            <span className="flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
              <FiPlay /> Jogar
            </span>
          </span>
          <span className="absolute left-4 top-4 rounded-full bg-background/80 px-3 py-1 font-mono text-xs font-medium text-accent-2 backdrop-blur">
            🎮 Jogável no navegador
          </span>
        </Link>

        <div className="flex flex-col p-8">
          <h3 className="text-2xl font-bold">{game.title} ☕</h3>
          <p className="mt-1 font-medium text-accent-2">{game.subtitle}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted">{game.description}</p>

          <ul className="mt-4 space-y-2">
            {game.highlights.map((h) => (
              <li key={h} className="flex gap-2 text-sm text-foreground/90">
                <FiCheckCircle className="mt-0.5 shrink-0 text-accent" />
                <span>{h}</span>
              </li>
            ))}
          </ul>

          <ul className="mt-5 flex flex-wrap gap-2">
            {game.tags.map((tag) => (
              <li key={tag} className="rounded-md bg-background px-2.5 py-1 font-mono text-xs text-accent-2">
                {tag}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={game.playUrl}
              className="flex items-center gap-2 rounded-full bg-accent px-5 py-2 text-sm font-medium text-white transition-transform hover:scale-105"
            >
              <FiPlay /> Jogar agora
            </Link>
            <a
              href={game.codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
            >
              <FiGithub /> Ver o código
            </a>
          </div>
        </div>
      </motion.article>
    </section>
  );
}

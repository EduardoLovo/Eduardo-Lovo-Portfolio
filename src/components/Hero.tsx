"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FiDownload, FiArrowDown } from "react-icons/fi";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { personal, socials } from "@/data/portfolio";
import ParticleField from "./ParticleField";

const iconMap: Record<string, React.ReactNode> = {
  github: <FaGithub />,
  linkedin: <FaLinkedin />,
  whatsapp: <FaWhatsapp />,
  email: <HiOutlineMail />,
};

export default function Hero() {
  return (
    <section
      id="topo"
      className="bg-grid relative flex min-h-screen items-center overflow-hidden pt-24"
    >
      <ParticleField className="pointer-events-none absolute inset-0 h-full w-full" />

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-16 md:grid-cols-[1.2fr_1fr]">
        {/* Texto */}
        <div>
          {personal.available && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-sm text-muted"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-400" />
              </span>
              Disponível para novas vagas
            </motion.div>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl"
          >
            Olá, eu sou{" "}
            <span className="text-gradient">{personal.name}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 font-mono text-lg text-accent-2"
          >
            {personal.role}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 max-w-xl text-lg text-muted"
          >
            {personal.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <a
              href={personal.cvUrl}
              download
              className="flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-white shadow-lg shadow-accent/25 transition-transform hover:scale-105"
            >
              <FiDownload /> Baixar Currículo
            </a>
            <a
              href="#projetos"
              className="flex items-center gap-2 rounded-full border border-border px-6 py-3 font-medium text-foreground transition-colors hover:bg-card"
            >
              Ver projetos
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 flex items-center gap-5 text-2xl text-muted"
          >
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className="transition-colors hover:text-accent"
              >
                {iconMap[s.icon]}
              </a>
            ))}
          </motion.div>
        </div>

        {/* Foto */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative mx-auto"
        >
          <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-accent to-accent-2 opacity-30 blur-2xl" />
          <div className="relative h-64 w-64 overflow-hidden rounded-full border-2 border-border sm:h-72 sm:w-72 md:h-80 md:w-80">
            <Image
              src={personal.photo}
              alt={personal.name}
              fill
              priority
              sizes="320px"
              className="object-cover"
            />
          </div>
        </motion.div>
      </div>

      {/* Indicador de scroll */}
      <motion.a
        href="#sobre"
        aria-label="Rolar para baixo"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ opacity: { delay: 1 }, y: { repeat: Infinity, duration: 1.8 } }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-2xl text-muted"
      >
        <FiArrowDown />
      </motion.a>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiDownload, FiMenu, FiX } from "react-icons/fi";
import { personal } from "@/data/portfolio";

const links = [
  { href: "#sobre", label: "Sobre" },
  { href: "#skills", label: "Skills" },
  { href: "#projetos", label: "Projetos" },
  { href: "#experiencia", label: "Experiência" },
  { href: "#contato", label: "Contato" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#topo" className="font-mono text-lg font-bold">
          <span className="text-gradient">{"</>"}</span>{" "}
          {personal.name.split(" ")[0]}
        </a>

        {/* Links desktop */}
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={personal.cvUrl}
            download
            className="hidden items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-transform hover:scale-105 sm:flex"
          >
            <FiDownload /> Baixar CV
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="text-2xl md:hidden"
            aria-label="Abrir menu"
          >
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      {/* Menu mobile */}
      {open && (
        <motion.ul
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="flex flex-col gap-1 border-t border-border bg-background px-6 py-4 md:hidden"
        >
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-2 text-muted hover:text-foreground"
              >
                {l.label}
              </a>
            </li>
          ))}
          <a
            href={personal.cvUrl}
            download
            className="mt-2 flex items-center justify-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-white"
          >
            <FiDownload /> Baixar CV
          </a>
        </motion.ul>
      )}
    </motion.header>
  );
}

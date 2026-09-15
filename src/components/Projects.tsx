"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiExternalLink, FiCheckCircle, FiGithub } from "react-icons/fi";
import SectionHeading from "./SectionHeading";
import { projects, type Project } from "@/data/portfolio";

function LinkButton({ link }: { link: { label: string; url: string } }) {
  const isGithub = /github\.com/.test(link.url);
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
    >
      {isGithub ? <FiGithub /> : <FiExternalLink />}
      {link.label}
    </a>
  );
}

function TechTags({ tags }: { tags: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-md bg-background px-2.5 py-1 font-mono text-xs text-accent-2"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

/** Card grande em destaque, com imagem, highlights e badges. */
function FeaturedCard({ p }: { p: Project }) {
  const [imgOk, setImgOk] = useState(true);
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
      className="mb-6 grid grid-cols-1 overflow-hidden rounded-3xl border border-border bg-card md:grid-cols-2"
    >
      {/* Imagem / preview */}
      <div className="relative min-h-56 bg-gradient-to-tr from-accent/30 to-accent-2/30">
        {p.image && imgOk && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={p.image}
            alt={p.title}
            onError={() => setImgOk(false)}
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
        )}
        <span className="absolute left-4 top-4 rounded-full bg-background/80 px-3 py-1 text-xs font-medium text-accent-2 backdrop-blur">
          ★ Projeto em destaque
        </span>
      </div>

      {/* Conteúdo */}
      <div className="flex flex-col p-8">
        <h3 className="text-2xl font-bold">{p.title}</h3>
        {p.subtitle && (
          <p className="mt-1 font-medium text-accent-2">{p.subtitle}</p>
        )}
        <p className="mt-3 text-sm leading-relaxed text-muted">{p.description}</p>

        {p.highlights && (
          <ul className="mt-4 space-y-2">
            {p.highlights.map((h) => (
              <li key={h} className="flex gap-2 text-sm text-foreground/90">
                <FiCheckCircle className="mt-0.5 shrink-0 text-accent" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-5">
          <TechTags tags={p.tags} />
        </div>

        {p.links && (
          <div className="mt-6 flex flex-wrap gap-3">
            {p.links.map((l) => (
              <LinkButton key={l.url} link={l} />
            ))}
          </div>
        )}
      </div>
    </motion.article>
  );
}

/** Card padrão (grid). */
function NormalCard({ p, i }: { p: Project; i: number }) {
  const [imgOk, setImgOk] = useState(true);
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: i * 0.1 }}
      whileHover={{ y: -6 }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-accent"
    >
      {p.image && imgOk ? (
        <div className="h-40 overflow-hidden border-b border-border bg-gradient-to-tr from-accent/20 to-accent-2/20">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={p.image}
            alt={p.title}
            onError={() => setImgOk(false)}
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col p-6">
        {!(p.image && imgOk) && (
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-accent to-accent-2 font-mono text-lg font-bold text-white">
            {p.title.charAt(0)}
          </div>
        )}
      <h3 className="text-xl font-semibold">{p.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
        {p.description}
      </p>
      <div className="mt-4">
        <TechTags tags={p.tags} />
      </div>
        {p.links && (
          <div className="mt-5 flex flex-wrap gap-3">
            {p.links.map((l) => (
              <LinkButton key={l.url} link={l} />
            ))}
          </div>
        )}
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projetos" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-24">
      <SectionHeading eyebrow="Meu trabalho" title="Projetos em destaque" />

      <div className="mt-10">
        {featured.map((p) => (
          <FeaturedCard key={p.title} p={p} />
        ))}

        {rest.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((p, i) => (
              <NormalCard key={p.title} p={p} i={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

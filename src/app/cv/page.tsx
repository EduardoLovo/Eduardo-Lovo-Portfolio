import type { Metadata } from "next";
import Image from "next/image";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiGithub,
  FiLinkedin,
  FiExternalLink,
  FiDownload,
  FiArrowLeft,
} from "react-icons/fi";
import { personal, skills } from "@/data/portfolio";
import { cv } from "@/data/cv";

export const metadata: Metadata = {
  title: `Currículo — ${personal.name}`,
};

export default function CVPage() {
  return (
    <div className="cv-page flex min-h-screen flex-col items-center bg-background py-8">
      {/* Barra de ações (não aparece na impressão/PDF) */}
      <div className="no-print mb-6 flex items-center gap-4">
        <a
          href="/"
          className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-foreground hover:bg-card"
        >
          <FiArrowLeft /> Voltar ao site
        </a>
        <a
          href={personal.cvUrl}
          download
          className="flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-white"
        >
          <FiDownload /> Baixar PDF
        </a>
      </div>

      {/* Folha A4 */}
      <div className="cv-sheet flex shadow-2xl">
        {/* Sidebar */}
        <aside className="cv-sidebar flex w-[38%] flex-col gap-7 p-8">
          <img
            src={personal.photo}
            alt={personal.name}
            className="mx-auto h-36 w-36 rounded-full object-cover ring-4 ring-white"
          />

          <div>
            <h3 className="mb-3 border-b border-gray-300 pb-1 text-xs font-bold uppercase tracking-widest cv-accent">
              Contato
            </h3>
            <ul className="space-y-2 text-[13px] text-gray-700">
              <li className="flex items-center gap-2">
                <FiPhone className="shrink-0 cv-accent" /> {personal.phone}
              </li>
              <li className="flex items-center gap-2 break-all">
                <FiMail className="shrink-0 cv-accent" /> {personal.email}
              </li>
              <li className="flex items-center gap-2">
                <FiMapPin className="shrink-0 cv-accent" /> {personal.location}
              </li>
              <li className="flex items-center gap-2 break-all">
                <FiGithub className="shrink-0 cv-accent" /> github.com/EduardoLovo
              </li>
              <li className="flex items-center gap-2 break-all">
                <FiLinkedin className="shrink-0 cv-accent" /> /in/eduardo-felipe-lovo
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 border-b border-gray-300 pb-1 text-xs font-bold uppercase tracking-widest cv-accent">
              Competências
            </h3>
            <div className="space-y-3">
              {skills.map((g) => (
                <div key={g.category}>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                    {g.category}
                  </p>
                  <p className="text-[13px] leading-relaxed text-gray-700">
                    {g.items.join(" · ")}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-3 border-b border-gray-300 pb-1 text-xs font-bold uppercase tracking-widest cv-accent">
              Idiomas
            </h3>
            <ul className="space-y-1 text-[13px] text-gray-700">
              {cv.languages.map((l) => (
                <li key={l.name} className="flex justify-between">
                  <span>{l.name}</span>
                  <span className="text-gray-500">{l.level}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 border-b border-gray-300 pb-1 text-xs font-bold uppercase tracking-widest cv-accent">
              Formação
            </h3>
            <ul className="space-y-3 text-[13px]">
              {cv.education.map((e, i) => (
                <li key={i}>
                  <p className="font-semibold text-gray-800">{e.course}</p>
                  <p className="text-gray-600">{e.place}</p>
                  <p className="text-gray-500">{e.year}</p>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Conteúdo principal */}
        <main className="flex-1 p-9">
          <header className="mb-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              {personal.name}
            </h1>
            <p className="mt-1 text-lg font-medium cv-accent">{personal.role}</p>
          </header>

          <section className="mb-7">
            <h2 className="mb-2 text-sm font-bold uppercase tracking-widest text-gray-800">
              Resumo
            </h2>
            <p className="text-[13.5px] leading-relaxed text-gray-700">
              {cv.summary}
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-gray-800">
              Experiência
            </h2>
            <div className="space-y-5">
              {cv.experience.map((exp, i) => (
                <div key={i} className="relative border-l-2 border-gray-200 pl-4">
                  <span className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-[#5b3df0]" />
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="text-[15px] font-semibold text-gray-900">
                      {exp.role}
                    </h3>
                    {exp.period && (
                      <span className="shrink-0 text-xs font-medium text-gray-500">
                        {exp.period}
                      </span>
                    )}
                  </div>
                  <p className="text-[13px] font-medium cv-accent">
                    {exp.company}
                    {exp.location ? ` · ${exp.location}` : ""}
                  </p>
                  <ul className="mt-2 space-y-1">
                    {exp.bullets.map((b, j) => (
                      <li
                        key={j}
                        className="flex gap-2 text-[13px] leading-snug text-gray-700"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gray-400" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  {exp.links.length > 0 && (
                    <ul className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1">
                      {exp.links.map((link) => (
                        <li
                          key={link}
                          className="flex items-center gap-1 text-[12px] cv-accent"
                        >
                          <FiExternalLink className="shrink-0" />
                          {link.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>

        </main>
      </div>

      {/* Página 2 — Projetos Dev (folha própria, sem a lateral) */}
      <div className="cv-sheet cv-sheet-next mt-8 p-12 shadow-2xl">
        <header className="mb-8 border-b border-[#e5e7eb] pb-4">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Projetos Dev
          </h2>
          <p className="mt-0.5 text-sm font-medium cv-accent">
            {personal.name} · {personal.role}
          </p>
        </header>

        <div className="space-y-4">
          {cv.projects.map((p) => (
            <div key={p.name} className="flex items-center gap-6">
              <div className="min-w-0 flex-1">
                <h3 className="text-[15px] font-semibold text-gray-900">
                  {p.name}
                </h3>
                <p className="text-[12px] font-medium cv-accent">{p.stack}</p>
                <p className="mt-1 text-[13px] leading-snug text-gray-700">
                  {p.description}
                </p>
                <ul className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1">
                  {p.links.map((link) => (
                    <li
                      key={link}
                      className="flex items-center gap-1 text-[12px] cv-accent"
                    >
                      <FiExternalLink className="shrink-0" />
                      {link.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
                    </li>
                  ))}
                </ul>
              </div>
              <Image
                src={p.image}
                alt={p.name}
                width={640}
                height={400}
                sizes="260px"
                className="aspect-[16/10] w-[48mm] shrink-0 rounded-lg border border-[#e5e7eb] object-cover object-top"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

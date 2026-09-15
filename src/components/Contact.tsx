import Reveal from "./Reveal";
import { FiDownload, FiMail } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { personal } from "@/data/portfolio";

export default function Contact() {
  return (
    <section id="contato" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-24">
      <Reveal>
        <div className="bg-grid relative overflow-hidden rounded-3xl border border-border bg-card p-10 text-center sm:p-16">
          <p className="font-mono text-sm uppercase tracking-widest text-accent-2">
            Vamos conversar
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Procurando um dev <span className="text-gradient">júnior</span> para o
            time?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted">
            Estou aberto a novas oportunidades. Me chame no WhatsApp, baixe meu
            currículo ou mande um e-mail — respondo rápido!
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={personal.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-white shadow-lg shadow-accent/25 transition-transform hover:scale-105"
            >
              <FaWhatsapp /> WhatsApp
            </a>
            <a
              href={`mailto:${personal.email}`}
              className="flex items-center gap-2 rounded-full border border-border px-6 py-3 font-medium text-foreground transition-colors hover:bg-background"
            >
              <FiMail /> {personal.email}
            </a>
            <a
              href={personal.cvUrl}
              download
              className="flex items-center gap-2 rounded-full border border-border px-6 py-3 font-medium text-foreground transition-colors hover:bg-background"
            >
              <FiDownload /> Baixar Currículo
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

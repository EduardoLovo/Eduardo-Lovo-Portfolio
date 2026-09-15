import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { about } from "@/data/portfolio";

export default function About() {
  return (
    <section id="sobre" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-24">
      <SectionHeading eyebrow="Quem sou eu" title="Sobre mim" />

      <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-[1.5fr_1fr]">
        <div className="space-y-4">
          {about.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <p className="text-lg leading-relaxed text-muted">{p}</p>
            </Reveal>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 md:grid-cols-1">
          {about.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1}>
              <div className="rounded-2xl border border-border bg-card p-5 text-center md:text-left">
                <p className="text-3xl font-bold text-gradient">{s.value}</p>
                <p className="mt-1 text-sm text-muted">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

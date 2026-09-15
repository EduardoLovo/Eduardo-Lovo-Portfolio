import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { experience } from "@/data/portfolio";

export default function Experience() {
  return (
    <section
      id="experiencia"
      className="scroll-mt-20 border-y border-border bg-card/30"
    >
      <div className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeading eyebrow="Trajetória" title="Experiência & Formação" />

        <div className="mt-12 space-y-2">
          {experience.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.1}>
              <div className="relative grid grid-cols-1 gap-2 border-l border-border pb-10 pl-8 last:pb-0 md:grid-cols-[200px_1fr] md:gap-8">
                <span className="absolute -left-[7px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-accent bg-background" />
                <p className="font-mono text-sm text-accent-2">{item.period}</p>
                <div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted">{item.place}</p>
                  <p className="mt-2 text-muted">{item.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

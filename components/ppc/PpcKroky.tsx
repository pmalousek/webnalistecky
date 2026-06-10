"use client";

import PaperGrain, { PaperPasparta } from "./PaperGrain";
import { useStaggerFade } from "./_anim";

type Step = {
  n: string;
  title: string;
  body: React.ReactNode;
};

const steps: Step[] = [
  {
    n: "01",
    title: "Dnes",
    body: <>Zavolám vám. Já, ne asistentka. Domluvíme schůzku — nic víc.</>,
  },
  {
    n: "02",
    title: "Tento týden",
    body: <>Přijedu, projdu nemovitost, vyslechnu vaši situaci.</>,
  },
  {
    n: "03",
    title: "Do 24 hodin po schůzce",
    body: (
      <>
        Máte v&nbsp;ruce písemný odhad se srovnatelnými prodeji a&nbsp;plán prodeje.
      </>
    ),
  },
  {
    n: "04",
    title: "Pak je to na vás",
    body: <>Klidně si vezměte týden na&nbsp;rozmyšlenou. Obvolávat vás nebudu.</>,
  },
];

export default function PpcKroky() {
  return (
    <section className="px-4 py-10 md:py-14">
      <div className="max-w-container mx-auto">
        <p className="font-plex-mono text-[12px] uppercase tracking-[0.15em] text-dark-secondary mb-3">
          05
        </p>
        <h2 className="font-plex-serif text-dark-text text-[clamp(1.9rem,3.5vw,2.6rem)] leading-[1.15] mb-6">
          Co se stane, když teď necháte číslo
        </h2>
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {steps.map((s, i) => (
            <StepItem key={s.n} step={s} index={i} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function StepItem({ step, index }: { step: Step; index: number }) {
  const { ref, style } = useStaggerFade<HTMLLIElement>(index, 80);
  return (
    <li
      ref={ref}
      style={{ ...style, willChange: "opacity, transform" }}
      className="flex flex-col"
    >
      <span className="font-plex-mono text-dark-text text-[26px] md:text-[30px] leading-none mb-3 block nums-tabular">
        {step.n}
      </span>
      <div className="bg-paper text-paper-ink shadow-paper p-5 md:p-6 flex-1 relative isolate">
        <PaperGrain />
        <PaperPasparta />
        <div className="relative z-10">
          <h3 className="font-plex-serif text-[19px] md:text-[20px] leading-snug mb-2">
            {step.title}
          </h3>
          <p className="font-plex-sans text-[15px] md:text-[16px] leading-[1.6]">
            {step.body}
          </p>
        </div>
      </div>
    </li>
  );
}

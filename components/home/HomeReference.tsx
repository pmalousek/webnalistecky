"use client";

import PaperGrain, { PaperPasparta } from "@/components/ppc/PaperGrain";
import { useStaggerFade } from "@/components/ppc/_anim";

type Testimonial = {
  text: string;
  name: string;
  city: string;
  date: string;
};

const testimonials: Testimonial[] = [
  {
    text: "Moc děkuji za profesionální spolupráci s makléřem Pavlem Malouškem. Byla jsem velmi spokojena s koupí bytu na Arménské. Kdykoli bylo třeba, hned poradil, vysvětlil i zařídil. Není to vždy samozřejmé – mám zkušenosti i s jinými makléři. Pavel Maloušek je profesionál na svém místě a doporučím ho vždy, kdy bude potřeba.",
    name: "Ludmila Pardusová",
    city: "Brno",
    date: "4. 3. 2026",
  },
  {
    text: "Pan Maloušek je velmi profesionální makléř. Vstřícný, s příjemným vystupováním, pomohl a zařídil vše, co bylo třeba. Doporučuji 11/10. Pokud bych v budoucnu opět řešil něco s nemovitostmi, pravděpodobně se na něj znovu obrátím.",
    name: "Dominik Holub",
    city: "Rosice u Brna",
    date: "13. 1. 2026",
  },
  {
    text: "We are very satisfied with the approach and all services provided by Mr. Pavel Maloušek. Everything was smooth and easy throughout the purchasing process. Very professional – thank you a lot.",
    name: "Makram Saadi",
    city: "Brno",
    date: "28. 10. 2025",
  },
  {
    text: "Pan Maloušek je opravdu člověk na svém místě. Vždy perfektní domluva, úžasný profesionál, sympatický a vstřícný. Za mě 100 bodů ze 70. :-) Trošku jsme zaškobrtli s původní makléřkou z jiné realitky – ale pan Maloušek všechna negativa nahradil velkými plusy. Děkuji za spolupráci.",
    name: "Věra Kučerová",
    city: "Ivančice",
    date: "25. 7. 2025",
  },
];

export default function HomeReference() {
  return (
    <section className="px-4 py-10 md:py-14">
      <div className="max-w-container mx-auto">
        <p className="font-plex-mono text-[12px] uppercase tracking-[0.15em] text-dark-secondary mb-3">
          04
        </p>
        <h2 className="font-plex-serif text-dark-text text-[clamp(1.9rem,3.5vw,2.6rem)] leading-[1.15] mb-8">
          Co říkají lidé, kteří prodávali nebo kupovali
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {testimonials.map((t, i) => (
            <Card key={t.name} t={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({ t, index }: { t: Testimonial; index: number }) {
  const { ref, style } = useStaggerFade<HTMLElement>(index, 80);
  return (
    <article
      ref={ref}
      style={{ ...style, willChange: "opacity, transform" }}
      className="bg-paper text-paper-ink shadow-paper p-6 md:p-7 flex flex-col relative isolate"
    >
      <PaperGrain />
      <PaperPasparta />
      <div className="relative z-10 flex flex-col flex-1">
        <p className="font-plex-sans text-[15px] leading-[1.6] flex-1 text-justify">
          {t.text}
        </p>
        <div className="mt-6 pt-4 border-t border-paper-ink/25 flex items-end justify-between gap-4">
          <div>
            <p className="font-plex-sans text-[14px] font-medium text-paper-ink">
              {t.name}
            </p>
            <p className="font-plex-sans text-[13px] text-paper-secondary mt-0.5">
              {t.city}
            </p>
          </div>
          <p className="font-plex-mono text-[12px] text-paper-secondary shrink-0 nums-tabular">
            {t.date}
          </p>
        </div>
      </div>
    </article>
  );
}

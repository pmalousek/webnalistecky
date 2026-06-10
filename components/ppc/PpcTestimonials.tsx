"use client";

import PaperGrain, { PaperPasparta } from "./PaperGrain";
import { useStaggerFade } from "./_anim";

type Testimonial = {
  text: string;
  name: string;
  city: string;
};

const testimonials: Testimonial[] = [
  {
    text: "Pan Maloušek je opravdu člověk na svém místě. Vždy perfektní domluva, úžasný profesionál, sympatický a vstřícný. Za mě 100 bodů ze 70. :-) Trošku jsme zaškobrtli s původní makléřkou z jiné realitky – ale pan Maloušek všechna negativa nahradil velkými plusy.",
    name: "Věra Kučerová",
    city: "Ivančice",
  },
  {
    text: "Pan Maloušek je velmi profesionální makléř. Vstřícný, s příjemným vystupováním, pomohl a zařídil vše, co bylo třeba. Doporučuji 11/10. Pokud bych v budoucnu opět řešil něco s nemovitostmi, pravděpodobně se na něj znovu obrátím.",
    name: "Dominik Holub",
    city: "Rosice u Brna",
  },
  {
    text: "Moc děkuji za profesionální spolupráci s makléřem Pavlem Malouškem. Byla jsem velmi spokojena s koupí bytu na Arménské. Kdykoli bylo třeba, hned poradil, vysvětlil i zařídil. Není to vždy samozřejmé – mám zkušenosti i s jinými makléři. Pavel Maloušek je profesionál na svém místě.",
    name: "Ludmila Pardusová",
    city: "Brno",
  },
];

export default function PpcTestimonials() {
  return (
    <section className="px-4 py-10 md:py-14">
      <div className="max-w-container mx-auto">
        <p className="font-plex-mono text-[12px] uppercase tracking-[0.15em] text-dark-secondary mb-3">
          08
        </p>
        <h2 className="font-plex-serif text-dark-text text-[clamp(1.9rem,3.5vw,2.6rem)] leading-[1.15] mb-6">
          Co říkají klienti
        </h2>
        <p className="font-plex-sans text-[17px] md:text-[18px] leading-[1.6] text-dark-text max-w-[38rem] mb-8">
          Nebudu o&nbsp;sobě tvrdit, že jsem nejdoporučovanější makléř na&nbsp;jižní Moravě — to se nedá změřit, je to věta z&nbsp;letáku. Můžu říct jen to, co mám v&nbsp;evidenci: 9 z&nbsp;10 zakázek dostávám na&nbsp;doporučení. Posuďte sami proč:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
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
        <p className="font-plex-sans text-[15px] leading-[1.6] flex-1">
          {t.text}
        </p>
        <div className="mt-6 pt-4 border-t border-paper-ink/25">
          <p className="font-plex-sans text-[14px] font-medium text-paper-ink">
            {t.name}
          </p>
          <p className="font-plex-sans text-[13px] text-paper-secondary mt-0.5">
            {t.city}
          </p>
        </div>
      </div>
    </article>
  );
}

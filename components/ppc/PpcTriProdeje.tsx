"use client";

import PaperGrain, { PaperPasparta } from "./PaperGrain";
import { useStaggerFade } from "./_anim";

type CardData = {
  label: string;
  title: string;
  story: React.ReactNode;
  resultPrice: string;
  resultDetail: React.ReactNode;
};

// Non-breaking spaces inside prices so "7 850 000 Kč" never wraps mid-number.
const cards: CardData[] = [
  {
    label: "PRODÁNO · 23 DNÍ",
    title: "Byt 3+kk, 68 m², Brno-Líšeň",
    story: (
      <>
        Majitelé si pozvali tři makléře. První řekl 8,2&nbsp;milionu, druhý 8,4. Já řekl 7,79 — a&nbsp;jako jediný jsem položil na&nbsp;stůl prodeje srovnatelných bytů z&nbsp;okolí.
      </>
    ),
    resultPrice: "7 850 000 Kč",
    resultDetail: (
      <>
        Dva vážní zájemci, výsledná cena nad inzerovanou. Za „8,4 milionu" by ten byt visel dodnes&nbsp;— pravděpodobně s&nbsp;cenou kolem{" "}
        <span className="whitespace-nowrap nums-tabular">7&nbsp;500&nbsp;000&nbsp;Kč</span>.
      </>
    ),
  },
  {
    label: "PRODÁNO · 31 DNÍ",
    title: "Byt 2+1, 55 m², Brno-Královo Pole",
    story: (
      <>
        Dědictví. Tři sourozenci, tři představy o&nbsp;ceně, rodinné dusno. Písemný odhad doložený prodeji srovnal očekávání za&nbsp;jeden den — o&nbsp;číslech se hádá hůř než o&nbsp;pocitech.
      </>
    ),
    resultPrice: "5 990 000 Kč",
    resultDetail: <>Peníze rozdělené přes úschovu, vztahy přežily.</>,
  },
  {
    label: "PRODÁNO · DUBEN",
    title: "Dům 4+1, Rosice u Brna",
    story: (
      <>
        Majitelé chtěli prodávat v&nbsp;prosinci. Řekl jsem: nedělejte to, vánoční kupci sráží cenu — počkejte do&nbsp;jara a&nbsp;investujte 25 tisíc do&nbsp;drobných oprav. Přišel jsem tím o&nbsp;zakázku na&nbsp;tři měsíce.
      </>
    ),
    resultPrice: "8 480 000 Kč",
    resultDetail: (
      <>
        V&nbsp;dubnu prodáno — o&nbsp;{" "}
        <span className="whitespace-nowrap nums-tabular">380&nbsp;000</span> víc, než nabízel nejvyšší podzimní zájemce.
      </>
    ),
  },
];

export default function PpcTriProdeje() {
  return (
    <section className="px-4 py-10 md:py-14">
      <div className="max-w-container mx-auto">
        <p className="font-plex-mono text-[12px] uppercase tracking-[0.15em] text-dark-secondary mb-3">
          04
        </p>
        <h2 className="font-plex-serif text-dark-text text-[clamp(1.9rem,3.5vw,2.6rem)] leading-[1.15] mb-6 max-w-[38rem]">
          Tři prodeje místo tisíce slibů
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {cards.map((c, i) => (
            <Card key={c.title} card={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({ card, index }: { card: CardData; index: number }) {
  const { ref, style } = useStaggerFade<HTMLElement>(index, 80);
  return (
    <article
      ref={ref}
      style={{ ...style, willChange: "opacity, transform" }}
      className="bg-paper text-paper-ink shadow-paper p-6 md:p-7 flex flex-col hover:-translate-y-0.5 transition-transform relative isolate"
    >
      <PaperGrain />
      <PaperPasparta />
      <div className="relative z-10 flex flex-col flex-1">
        <p className="font-plex-mono text-[11px] uppercase tracking-[0.15em] text-paper-secondary mb-4">
          {card.label}
        </p>
        <h3 className="font-plex-serif text-[20px] md:text-[21px] leading-snug mb-4">
          {card.title}
        </h3>
        <p className="font-plex-sans text-[15px] leading-[1.6] mb-6 flex-1">
          {card.story}
        </p>
        <div className="border-t border-paper-ink/30 pt-5">
          <p className="font-plex-mono text-[11px] uppercase tracking-[0.15em] text-paper-secondary mb-2">
            Výsledek
          </p>
          <p className="font-plex-serif text-[26px] leading-tight mb-3 whitespace-nowrap nums-tabular">
            {card.resultPrice}
          </p>
          <p className="font-plex-sans text-[14px] leading-[1.55]">
            {card.resultDetail}
          </p>
        </div>
      </div>
    </article>
  );
}

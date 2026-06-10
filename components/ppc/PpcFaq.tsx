import PaperGrain, { PaperPasparta } from "./PaperGrain";

type Item = { q: string; a: React.ReactNode };

const items: Item[] = [
  {
    q: "Kolik si berete provizi?",
    a: (
      <>
        Konkrétní číslo vám řeknu na&nbsp;první schůzce — záleží na&nbsp;nemovitosti a&nbsp;rozsahu práce. Co platí vždy: v&nbsp;provizi je všechno (právní servis, focení, inzerce), platí se až z&nbsp;prodejní ceny po&nbsp;prodeji a&nbsp;žádné další poplatky neexistují. Když se vám nebude zdát, podáme si ruce a&nbsp;rozejdeme se.
      </>
    ),
  },
  {
    q: "Na bytě je hypotéka. Dá se prodat?",
    a: (
      <>
        Dá, řeším to běžně. Hypotéka se vyplatí z&nbsp;kupní ceny přes advokátní úschovu. S&nbsp;bankou to vykomunikuju já, vy podepisujete připravené dokumenty.
      </>
    ),
  },
  {
    q: "Budete chtít exkluzivní smlouvu?",
    a: (
      <>
        Ano — protože jinak nemůžu do&nbsp;prodeje investovat naplno. Ale podepisuje se, až když máte v&nbsp;ruce odhad i&nbsp;plán a&nbsp;dává vám to smysl. Na&nbsp;první schůzce nikdy.
      </>
    ),
  },
  {
    q: "Jak dlouho to bude trvat?",
    a: (
      <>
        Můj průměr je 35 dní od&nbsp;inzerce k&nbsp;rezervační smlouvě. Správně naceněná nemovitost v&nbsp;Brně se prodá do&nbsp;šesti týdnů. Když visí déle, je špatně cena — a&nbsp;tu řešíme na&nbsp;začátku, ne po&nbsp;třech měsících slev.
      </>
    ),
  },
  {
    q: "V bytě bydlí nájemník. Vadí to?",
    a: (
      <>
        Nevadí, mění to jen strategii: buď prodej investorovi i&nbsp;s&nbsp;nájemníkem, nebo koordinace konce nájmu. Obojí jsem dělal mnohokrát.
      </>
    ),
  },
  {
    q: "Zdědili jsme nemovitost ve více lidech a neshodneme se.",
    a: (
      <>
        Řeším několikrát ročně. Začínáme doloženým odhadem — na&nbsp;čísla z&nbsp;reálných prodejů se hádá hůř než na&nbsp;názory. Pak teprve strategie prodeje.
      </>
    ),
  },
];

export default function PpcFaq() {
  return (
    <section className="px-4 py-10 md:py-14">
      <div className="max-w-container mx-auto">
        <p className="font-plex-mono text-[12px] uppercase tracking-[0.15em] text-dark-secondary mb-3">
          09
        </p>
        <h2 className="font-plex-serif text-dark-text text-[clamp(1.9rem,3.5vw,2.6rem)] leading-[1.15] mb-6">
          Na rovinu: co se mě lidi ptají nejčastěji
        </h2>
        <div className="bg-paper text-paper-ink shadow-paper max-w-[860px] relative isolate">
          <PaperGrain />
          <PaperPasparta />
          <div className="relative z-10">
            {items.map((item, i) => (
              <details
                key={item.q}
                className={
                  "group" +
                  (i === items.length - 1
                    ? ""
                    : " border-b border-paper-ink/25")
                }
              >
                <summary className="flex items-start gap-4 cursor-pointer list-none p-5 md:p-6 hover:bg-paper-ink/[0.04] transition-colors">
                  <span className="font-plex-mono text-[22px] text-paper-secondary leading-none w-5 shrink-0 group-open:hidden">
                    +
                  </span>
                  <span className="font-plex-mono text-[22px] text-paper-secondary leading-none w-5 shrink-0 hidden group-open:inline">
                    −
                  </span>
                  <span className="font-plex-serif text-[18px] md:text-[19px] leading-snug flex-1 pt-0.5">
                    {item.q}
                  </span>
                </summary>
                <div className="px-5 md:px-6 pb-5 md:pb-6 pl-[2.25rem] md:pl-[2.5rem]">
                  <p className="font-plex-sans text-[16px] leading-[1.65] max-w-[38rem]">
                    {item.a}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

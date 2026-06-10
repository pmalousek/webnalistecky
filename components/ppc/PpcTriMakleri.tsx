import PaperGrain, { PaperPasparta } from "./PaperGrain";

export default function PpcTriMakleri() {
  return (
    <section className="px-4 py-10 md:py-14">
      <div className="max-w-container mx-auto">
        <div className="bg-paper text-paper-ink shadow-paper p-10 md:p-12 max-w-card relative isolate">
          <PaperGrain />
          <PaperPasparta />
          <div className="relative z-10">
            <p className="font-plex-mono text-[12px] uppercase tracking-[0.15em] text-paper-secondary mb-3">
              01
            </p>
            <h2 className="font-plex-serif text-[clamp(1.9rem,3.8vw,2.8rem)] leading-[1.15] mb-6">
              Pozvete si tři makléře na&nbsp;odhad. Zakázku dostane ten, kdo řekne nejvyšší číslo.
            </h2>
            <div className="space-y-4 font-plex-sans text-[17px] md:text-[18px] leading-[1.6]">
              <p>
                Takhle to v&nbsp;Česku chodí: majitel dá byt tomu, kdo slíbí nejvíc. Makléři to vědí, a&nbsp;tak licitují. Pak byt visí na&nbsp;Srealitách, týdny se nic neděje a&nbsp;přijde první „doporučuji mírně upravit cenu". Po&nbsp;třech slevách a&nbsp;čtyřech měsících prodáte — pod skutečnou tržní cenou. Kupci totiž vidí, jak dlouho inzerát visí, a&nbsp;smlouvají o&nbsp;to tvrději.
              </p>
              <p>
                Nadsazený odhad není příslib vyšší ceny. Je to návnada. A&nbsp;zaplatíte ji vy.
              </p>
              <p>
                Já vám řeknu cenu doloženou reálnými prodeji z&nbsp;vašeho okolí — ne přáním. Někdy je vyšší, než čekáte. Někdy nižší. V&nbsp;obou případech uslyšíte pravdu, i&nbsp;kdyby mě měla stát zakázku.
              </p>
            </div>
            <p className="font-plex-serif italic text-[clamp(1.5rem,3.2vw,2.1rem)] leading-snug text-paper-ink mt-8">
              Já vám lhát nebudu.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

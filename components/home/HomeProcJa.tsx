import Image from "next/image";

// 03 — "Proč zrovna já a ne velká realitka?" Root content, /ppc visual:
// serif heading + sans body on dark, working photo in a paper-card frame.
export default function HomeProcJa() {
  return (
    <section className="px-4 py-10 md:py-14">
      <div className="max-w-container mx-auto">
        <div className="grid gap-8 md:gap-12 md:grid-cols-[1.35fr_1fr] items-start">
          {/* Text */}
          <div>
            <p className="font-plex-mono text-[12px] uppercase tracking-[0.15em] text-dark-secondary mb-3">
              03
            </p>
            <h2 className="font-plex-serif text-dark-text text-[clamp(1.9rem,3.8vw,2.8rem)] leading-[1.15] mb-6">
              Proč zrovna já a&nbsp;ne velká realitka?
            </h2>
            <div className="space-y-4 max-w-[38rem] font-plex-sans text-[17px] md:text-[18px] leading-[1.6] text-dark-text">
              <p>
                Velké realitky jsou stroj na&nbsp;nábor nováčků. Každý měsíc
                do&nbsp;nich nastoupí desítky lidí, kteří „chtějí dělat
                reality&rdquo;. Týden školení, vizitka, telefon, jdou. První,
                druhá, třetí zakázka je trénink — a&nbsp;tím tréninkem je často
                Váš byt. Když to nevyjde, vy přijdete o&nbsp;tři měsíce, dvě
                snížení ceny a&nbsp;kus nervů. On o&nbsp;nic. Jde dál.
              </p>
              <p>
                Já dělám reality v&nbsp;Brně 17 let, prošel jsem si pozicí
                vedoucího pobočky velké sítě a&nbsp;vím přesně, jak ten stroj
                funguje zevnitř. Dnes po&nbsp;velkých zkušenostech pracuji sám.
                Žádná centrála, žádný junior, kterého „zaučuji na&nbsp;Vašem
                bytě&rdquo; — a&nbsp;že se to standardně děje, poznáte to tak, že
                mluví jen jeden ze&nbsp;dvojice. Když mi zavoláte, mluvíte
                se&nbsp;mnou — a&nbsp;se&nbsp;mnou a&nbsp;mým zkušeným týmem to
                taky dotáhnete. Za&nbsp;výsledek ručím osobně, protože nemám
                (a&nbsp;ani nechci se mít) za&nbsp;koho se schovat.
              </p>
            </div>
          </div>

          {/* Foto v papírové kartě */}
          <div className="w-full max-w-[360px] mx-auto md:mx-0 md:max-w-none">
            <div className="bg-paper p-3 md:p-3.5 shadow-paper">
              <div className="border border-paper-line">
                <Image
                  src="/pavel-pracovni.jpg"
                  alt="Pavel Maloušek při práci s klientem"
                  width={480}
                  height={600}
                  quality={70}
                  sizes="(max-width: 768px) 100vw, 440px"
                  className="w-full h-auto object-cover block"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

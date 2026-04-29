import Image from "next/image";

export default function ProcZrovnaJa() {
  return (
    <section className="bg-soft-bg py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col-reverse md:flex-row gap-12 items-start">
          {/* Text – left on desktop, bottom on mobile */}
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Proč zrovna já a ne velká realitka?
            </h2>
            <div className="space-y-5 text-gray-700 text-lg leading-relaxed">
              <p>
                Velké realitky najímají desítky nových makléřů ročně. Většina z
                nich má za sebou týdenní školení a Váš byt je možná jejich první
                nebo druhá zakázka. Učí se na Vás. Když to nevyjde, vy přijdete o
                čas, peníze a nervy – on jde dál.
              </p>
              <p>
                Já dělám reality v Brně a okolí 17 let. Mám za sebou přes 700
                dokončených prodejů. Pracuji sám, takže za výsledek ručím osobně –
                nemůžu se schovat za centrálu, juniora ani „kolegyni z marketingu&rdquo;.
                Když mi zavoláte, ozvu se vám já.
              </p>
            </div>
          </div>
          {/* Photo – right on desktop, top on mobile */}
          {/* TODO: nahradit public/pavel-pracovni.jpg skutečnou pracovní fotografií */}
          <div className="w-full md:w-2/5 flex-none">
            <Image
              src="/pavel-pracovni.jpg"
              alt="Pavel Maloušek při práci s klientem"
              width={480}
              height={600}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

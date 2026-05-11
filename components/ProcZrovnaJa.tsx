import Image from "next/image";

export default function ProcZrovnaJa() {
  return (
    <section className="bg-soft-bg py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col-reverse md:flex-row gap-6 md:gap-12 items-start">
          {/* Text – left on desktop, bottom on mobile */}
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Proč zrovna já a ne velká realitka?
            </h2>
            <div className="space-y-5 text-gray-700 text-lg leading-relaxed text-justify">
              <p>
                Velké realitky jsou stroj na nábor nováčků. Každý měsíc do nich
                nastoupí desítky lidí, kteří „chtějí dělat reality&rdquo;. Týden
                školení, vizitka, telefon, jdou. První, druhá, třetí zakázka je
                trénink – a tím tréninkem je často Váš byt. Když to nevyjde, vy
                přijdete o tři měsíce, dvě snížení ceny a kus nervů. On o nic.
                Jde dál.
              </p>
              <p>
                Já dělám reality v Brně 17 let, prošel jsem si pozicí vedoucího
                pobočky velké sítě a vím přesně, jak ten stroj funguje zevnitř.
                Dnes po velkých zkušenostech pracuji sám. Žádná centrála, žádný
                junior, kterého „zaučuji na Vašem bytě&rdquo; - a že se to standardně
                děje, poznáte to tak, že mluví jen jeden ze dvojice. Když mi
                zavoláte, mluvíte se mnou – a se mnou a mým zkušeným týmem to taky
                dotáhnete. Za výsledek ručím osobně, protože nemám (a ani nechci
                se mít) za koho se schovat.
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
              quality={60}
              sizes="(max-width: 768px) 100vw, 480px"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

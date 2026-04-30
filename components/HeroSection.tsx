import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white pt-16 pb-32 md:pb-44 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col-reverse md:flex-row gap-10 items-center">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-5">
              Realitka Vám nemusí vadit. Nováček se učící na&nbsp;Vás ano.
            </h1>
            <p className="text-lg text-gray-700 max-w-prose mb-8">
              Desítky lístečků „KOUPÍM BYT NA TÉTO ULICI&rdquo; ve schránce
              týdně. Většina je od juniorních makléřů, kteří před týdnem nastoupili.
              Já jdu na to opačně: do schránky Vám hodím lísteček s tím, že Váš byt
              nekoupím – ale přečtěte si, proč Vám to říkám.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://www.realitakbrno.cz"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-brand text-white font-medium rounded-none min-h-[48px] hover:bg-brand-dark transition-colors"
              >
                Mrkněte na realitakbrno.cz →
              </a>
              <a
                href="tel:+420777759590"
                className="inline-flex items-center justify-center px-6 py-3 border border-brand text-ink font-medium rounded-none min-h-[48px] hover:bg-gray-100 transition-colors md:hidden"
              >
                Zavolat 777&nbsp;759&nbsp;590
              </a>
            </div>
            <p className="mt-6 text-sm text-gray-500">
              17 let v Brně · 700+ prodejů · Bc. Pavel Maloušek
            </p>
          </div>
          <div className="flex-shrink-0 w-[220px] md:w-[260px]">
            <Image
              src="/pavel-foto.jpg"
              alt="Pavel Maloušek"
              width={260}
              height={310}
              priority
              className="object-cover w-full h-auto"
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brno-silueta.svg" alt="" className="w-full h-auto block" />
      </div>
    </section>
  );
}

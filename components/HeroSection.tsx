import Image from "next/image";

const stats = [
  { n: "17", l: "let praxe" },
  { n: "700+", l: "dokončených prodejů" },
  { n: "27", l: "obcí na jižní Moravě" },
  { n: "1", l: "makléř – osobní zodpovědnost" },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white pt-16 pb-36 md:pb-44 px-4">
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

            <div className="flex flex-wrap gap-3">
              <a
                href="tel:+420777759590"
                className="inline-flex items-center justify-center px-6 py-3 bg-brand text-white font-medium rounded-none min-h-[48px] hover:bg-brand-dark transition-colors"
              >
                Zavolat 777&nbsp;759&nbsp;590
              </a>
              <a
                href="sms:+420777759590"
                className="inline-flex items-center justify-center px-6 py-3 border border-brand text-ink font-medium rounded-none min-h-[48px] hover:bg-gray-100 transition-colors"
              >
                Napsat SMS
              </a>
            </div>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {stats.map(({ n, l }) => (
                <div key={l} className="border border-border-line p-3">
                  <div className="text-2xl font-bold text-brand">{n}</div>
                  <div className="text-xs text-gray-500 mt-1 leading-snug">{l}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex">
              <a
                href="#cisla"
                aria-label="Srolovat dolů"
                className="text-brand/40 hover:text-brand transition-colors animate-bounce"
              >
                <svg
                  width="30"
                  height="30"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </a>
            </div>
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

import Image from "next/image";
import HandDrawnUnderline from "@/components/ppc/HandDrawnUnderline";
import WhatsAppLink from "@/components/ppc/WhatsAppLink";
import PhoneCallLink from "./PhoneCallLink";

// Root hero — anti-lísteček narrative in the /ppc visual language.
export default function HomeHero() {
  return (
    <section className="px-4 pt-12 pb-12 md:pt-16 md:pb-16">
      <div className="max-w-container mx-auto">
        <div className="grid gap-y-8 md:gap-y-10 md:grid-cols-[1.35fr_1fr] md:gap-x-12 lg:gap-x-16">
          {/* Text — col 1 row 1 on desktop */}
          <div className="md:col-start-1 md:row-start-1">
            <p className="font-plex-mono text-[12px] uppercase tracking-[0.18em] text-dark-secondary mb-5">
              Realitní makléř · Brno a jižní Morava · 17 let praxe
            </p>
            <h1 className="font-plex-serif text-[clamp(2.2rem,5vw,4rem)] leading-[1.08] text-dark-text mb-6">
              Realitka Vám nemusí vadit.{" "}
              <span className="relative inline-block whitespace-nowrap">
                Nováček
                <HandDrawnUnderline />
              </span>{" "}
              se učící na&nbsp;Vás ano.
            </h1>
            <p className="font-plex-sans text-[17px] md:text-[18px] leading-[1.6] text-dark-text max-w-[38rem]">
              Desítky lístečků „KOUPÍM BYT NA&nbsp;TÉTO ULICI&rdquo; ve&nbsp;schránce
              týdně. Většina je od&nbsp;juniorních makléřů, kteří před týdnem
              nastoupili. Já jdu na&nbsp;to opačně: do&nbsp;schránky Vám hodím
              lísteček s&nbsp;tím, že Váš byt nekoupím — ale přečtěte si, proč
              Vám to říkám.
            </p>

            <p className="font-plex-serif italic text-[clamp(1.5rem,3vw,2.1rem)] leading-snug text-dark-text mt-7 max-w-[38rem]">
              Já vám lhát nebudu.
            </p>
          </div>

          {/* Foto — col 2 spans all rows on desktop, between text & contacts on mobile */}
          <div className="md:col-start-2 md:row-start-1 md:row-span-2 md:self-start mx-auto md:mx-0 w-full max-w-[300px] md:max-w-none">
            <div className="bg-paper p-3 md:p-3.5 shadow-paper">
              <div className="border border-paper-line">
                <Image
                  src="/pavel-foto.jpg"
                  alt="Bc. Pavel Maloušek, realitní makléř Brno"
                  width={480}
                  height={576}
                  quality={75}
                  priority
                  sizes="(max-width: 768px) 280px, 460px"
                  className="w-full h-auto block"
                />
              </div>
            </div>
            <p className="font-plex-sans text-[13px] text-dark-secondary mt-3 leading-snug">
              Tohle není fotka z fotobanky.
              <br />
              To jsem já.
            </p>
          </div>

          {/* Contacts — col 1 row 2 on desktop */}
          <div className="md:col-start-1 md:row-start-2 flex flex-wrap items-center gap-x-6 gap-y-3">
            <PhoneCallLink location="hero" />
            <WhatsAppLink location="hero" variant="dark" />
          </div>
        </div>
      </div>
    </section>
  );
}

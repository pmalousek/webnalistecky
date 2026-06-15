"use client";

import Image from "next/image";
import HandDrawnUnderline from "./HandDrawnUnderline";
import CallbackForm from "./CallbackForm";
import WhatsAppLink from "./WhatsAppLink";
import { IconPhone } from "./Icons";
import { trackPhoneClick } from "./ConversionTracker";

const TEL = "+420777759590";
const TEL_DISPLAY = "777 759 590";

export default function PpcHero() {
  return (
    <section className="px-4 pt-10 pb-12 md:pt-16 md:pb-16">
      <div className="max-w-container mx-auto">
        <div className="grid gap-y-8 md:gap-y-10 md:grid-cols-[1.35fr_1fr] md:gap-x-12 lg:gap-x-16">
          {/* Text — col 1 row 1 on desktop */}
          <div className="md:col-start-1 md:row-start-1">
            <p className="font-plex-mono text-[12px] uppercase tracking-[0.18em] text-dark-secondary mb-5">
              Realitní makléř · Brno a jižní Morava · 17 let praxe
            </p>
            <h1 className="font-plex-serif text-[clamp(2.4rem,5.5vw,4.5rem)] leading-[1.05] text-dark-text mb-6">
              Prodáváte byt nebo dům v&nbsp;Brně a&nbsp;okolí?
            </h1>
            <p className="font-plex-sans text-[17px] md:text-[18px] leading-[1.6] text-dark-text max-w-[38rem]">
              Většina makléřů vám cenu nadsadí, aby získala zakázku. Pak se měsíce slevuje — z&nbsp;vašich peněz. Já vám řeknu cenu, za kterou{" "}
              <span className="relative inline-block whitespace-nowrap">
                opravdu prodáte
                <HandDrawnUnderline />
              </span>
              . Proto je můj průměr 35&nbsp;dní.
            </p>
          </div>

          {/* Foto — col 2 spans all rows on desktop, between text & contacts on mobile */}
          <div className="md:col-start-2 md:row-start-1 md:row-span-3 md:self-start mx-auto md:mx-0 w-full max-w-[300px] md:max-w-none">
            <div className="bg-paper p-3 md:p-3.5 shadow-paper">
              <div className="border border-paper-line">
                <Image
                  src="/pavel-foto.jpg"
                  alt="Bc. Pavel Maloušek, realitní makléř Brno"
                  width={480}
                  height={576}
                  quality={75}
                  priority
                  fetchPriority="high"
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
            <a
              href={`tel:${TEL}`}
              onClick={() => trackPhoneClick("hero")}
              className="inline-flex items-center gap-2 font-plex-sans text-[15px] text-dark-text hover:text-dark-text/80 transition-colors min-h-[44px]"
            >
              <IconPhone />
              <span>
                Zavolejte:{" "}
                <span className="font-plex-mono underline">{TEL_DISPLAY}</span>
              </span>
            </a>
            <WhatsAppLink location="hero" variant="dark" />
          </div>

          {/* Form — col 1 row 3 on desktop */}
          <div id="formular" className="md:col-start-1 md:row-start-3">
            <CallbackForm location="hero" />
          </div>
        </div>
      </div>
    </section>
  );
}

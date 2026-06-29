"use client";

import Image from "next/image";
import HandDrawnUnderline from "./HandDrawnUnderline";
import CallbackForm from "./CallbackForm";
import HeroLeadForm from "./HeroLeadForm";
import WhatsAppLink from "./WhatsAppLink";
import { IconPhone } from "./Icons";
import { trackPhoneClick } from "./ConversionTracker";

const TEL = "+420777759590";
const TEL_DISPLAY = "777 759 590";

// A/B test (mobile hero only — WS2 is mobile-scoped). Flip H1_VARIANT to swap
// the headline between the current question and a benefit-led variant. Both
// strings live here so the switch is a one-line change.   = non-breaking
// space (keeps "v Brně" / "a okolí" from wrapping mid-phrase).
const H1_VARIANT: "question" | "benefit" = "question";
const H1_QUESTION = "Prodáváte byt nebo dům v Brně a okolí?";
const H1_BENEFIT = "Zjistěte, za kolik váš byt/dům v Brně reálně prodáte.";

// Trust badges shown right above the lead form so credibility is visible
// without scrolling (mirrors the numbers in PpcStats, which sit below the fold).
const HERO_TRUST = ["17 let praxe", "700+ prodejů", "průměr 35 dní"];

export default function PpcHero() {
  return (
    <section id="formular" className="px-4 pt-6 pb-10 md:pt-16 md:pb-16">
      <div className="max-w-container mx-auto">
        {/* ===== MOBILE hero — compact, lead form above the fold ===== */}
        <div className="md:hidden">
          <p className="font-plex-mono text-[11px] uppercase tracking-[0.16em] text-dark-secondary mb-3">
            Realitní makléř · Brno a jižní Morava · 17 let praxe
          </p>

          <div className="flex items-start gap-3 mb-4">
            <div className="flex-1 min-w-0">
              <h1 className="font-plex-serif text-[clamp(1.6rem,7vw,2.1rem)] leading-[1.1] text-dark-text mb-2.5">
                {H1_VARIANT === "benefit" ? H1_BENEFIT : H1_QUESTION}
              </h1>
              <p className="font-plex-sans text-[14px] leading-[1.5] text-dark-text">
                Většina makléřů cenu nadsadí, aby získala zakázku. Já vám řeknu{" "}
                <span className="relative inline-block whitespace-nowrap">
                  férovou cenu
                  <HandDrawnUnderline />
                </span>
                , za&nbsp;kterou opravdu prodáte — průměr 35&nbsp;dní.
              </p>
            </div>

            <div className="shrink-0 w-[84px]">
              <div className="bg-paper p-1.5 shadow-paper">
                <div className="border border-paper-line">
                  <Image
                    src="/pavel-foto.jpg"
                    alt="Bc. Pavel Maloušek, realiťák Brno"
                    width={200}
                    height={240}
                    quality={70}
                    sizes="84px"
                    className="w-full h-auto block"
                  />
                </div>
              </div>
            </div>
          </div>

          <ul className="flex flex-wrap items-center gap-x-2.5 gap-y-1 mb-2.5 font-plex-mono text-[11px] uppercase tracking-[0.08em] text-dark-secondary">
            {HERO_TRUST.map((item, i) => (
              <li key={item} className="inline-flex items-center gap-2.5">
                {i > 0 && (
                  <span aria-hidden className="text-dark-line">
                    ·
                  </span>
                )}
                {item}
              </li>
            ))}
          </ul>

          <div>
            <HeroLeadForm location="hero" />
          </div>

          <a
            href={`tel:${TEL}`}
            onClick={() => trackPhoneClick("hero")}
            className="mt-3 inline-flex items-center gap-2 font-plex-sans text-[14px] text-dark-secondary hover:text-dark-text transition-colors min-h-[40px]"
          >
            <IconPhone size={18} />
            <span>
              Nebo zavolejte:{" "}
              <span className="font-plex-mono underline text-dark-text">
                {TEL_DISPLAY}
              </span>
            </span>
          </a>
        </div>

        {/* ===== DESKTOP hero — unchanged ===== */}
        <div className="hidden md:block">
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
            <div className="md:col-start-1 md:row-start-3">
              <CallbackForm location="hero" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

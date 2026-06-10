"use client";

import Image from "next/image";
import { trackPhoneClick } from "./ConversionTracker";
import CallbackForm from "./CallbackForm";
import WhatsAppLink from "./WhatsAppLink";
import Razitko from "./Razitko";
import { IconPhone } from "./Icons";

const TEL = "+420777759590";
const TEL_DISPLAY = "777 759 590";

export default function PpcZaver() {
  return (
    <section className="px-4 py-10 md:py-14">
      <div className="max-w-container mx-auto">
        <div className="grid gap-10 md:gap-12 md:grid-cols-2 items-start">
          <div>
            <p className="font-plex-mono text-[12px] uppercase tracking-[0.15em] text-dark-secondary mb-3">
              10
            </p>
            <h2 className="font-plex-serif text-dark-text text-[clamp(2rem,4vw,3rem)] leading-[1.1] mb-6">
              Jsem jeden člověk. A&nbsp;je to záměr.
            </h2>
            <div className="space-y-4 max-w-[38rem] font-plex-sans text-[17px] md:text-[18px] leading-[1.6] text-dark-text">
              <p>
                Beru jen tolik nemovitostí, kolika se dokážu věnovat naplno. Když mám plno, řeknu vám to na&nbsp;rovinu a&nbsp;domluvíme se na&nbsp;termínu.
              </p>
              <p>
                První schůzka i&nbsp;písemný odhad jsou zdarma a&nbsp;bez závazku. Nic nepodepisujete.
              </p>
            </div>

            <p className="font-plex-serif italic text-[clamp(1.6rem,3.2vw,2.2rem)] leading-snug text-dark-text mt-8 max-w-[38rem]">
              Jediné, co riskujete, je, že uslyšíte pravdu.
            </p>

            <div className="mt-10 flex items-end gap-8 flex-wrap">
              <Image
                src="/podpis.png"
                alt="Podpis Pavel Maloušek"
                width={220}
                height={90}
                quality={80}
                className="h-auto w-[180px] md:w-[220px]"
                style={{
                  filter: "invert(1) brightness(0.95)",
                  mixBlendMode: "screen",
                }}
              />
              <Razitko size={130} />
            </div>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-6">
              <a
                href={`tel:${TEL}`}
                onClick={() => trackPhoneClick("final_cta")}
                className="inline-flex items-center gap-2 font-plex-sans text-[15px] text-dark-text hover:text-dark-text/80 transition-colors min-h-[44px]"
              >
                <IconPhone />
                <span>
                  Zavolejte:{" "}
                  <span className="font-plex-mono underline nums-tabular">{TEL_DISPLAY}</span>
                </span>
              </a>
              <WhatsAppLink location="final_cta" variant="dark" />
            </div>
            <CallbackForm location="final_cta" />
          </div>
        </div>
      </div>
    </section>
  );
}

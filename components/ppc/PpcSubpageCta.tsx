"use client";

import Link from "next/link";
import { trackPhoneClick } from "./ConversionTracker";
import WhatsAppLink from "./WhatsAppLink";
import { IconPhone } from "./Icons";

const TEL = "+420777759590";
const TEL_DISPLAY = "777 759 590";

export default function PpcSubpageCta() {
  return (
    <section className="border-t border-dark-line px-4 py-10 md:py-14">
      <div className="max-w-container mx-auto">
        <p className="font-plex-sans text-[17px] md:text-[18px] leading-[1.6] text-dark-text max-w-[38rem] mb-6">
          První schůzka i&nbsp;písemný odhad jsou zdarma a&nbsp;bez závazku. Nic nepodepisujete.
        </p>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center flex-wrap gap-3 sm:gap-4">
          <a
            href={`tel:${TEL}`}
            onClick={() => trackPhoneClick("final_cta")}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-dark-line text-dark-text font-plex-sans font-medium text-[15px] hover:bg-dark-line/30 transition-colors min-h-[48px]"
          >
            <IconPhone />
            <span>
              Zavolejte:{" "}
              <span className="font-plex-mono underline">{TEL_DISPLAY}</span>
            </span>
          </a>
          <WhatsAppLink location="final_cta" variant="dark" />
          <Link
            href="/ppc#formular"
            className="inline-flex items-center justify-center px-7 py-4 bg-paper text-paper-ink font-plex-sans font-semibold text-[16px] hover:-translate-y-px transition-transform min-h-[48px]"
          >
            Chci znát skutečnou cenu
          </Link>
        </div>
      </div>
    </section>
  );
}

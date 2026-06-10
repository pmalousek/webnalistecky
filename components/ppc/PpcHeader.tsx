"use client";

import Link from "next/link";
import { trackPhoneClick } from "./ConversionTracker";

const TEL = "+420777759590";
const TEL_DISPLAY = "777 759 590";

function scrollToFirstFormOrAnchor() {
  const forms = document.querySelectorAll<HTMLElement>('[data-form="callback"]');
  if (forms.length === 0) {
    window.location.href = "/ppc#formular";
    return;
  }
  forms[0].scrollIntoView({ behavior: "smooth", block: "center" });
}

// Desktop-only header. Mobile keeps the bottom sticky bar instead of a
// top bar (avoids stealing scroll space + duplicating the CTA).
export default function PpcHeader() {
  return (
    <header className="hidden md:block border-b border-dark-line">
      <div className="max-w-container mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          href="/ppc"
          className="flex items-center text-dark-text hover:opacity-80 transition-opacity"
          aria-label="PMRE — Pavel Maloušek, Brno"
        >
          {/* public/logo.svg ships as a black square with "PM" text — not the
              cream/transparent version asked for. Falling back to Serif text
              per spec; logo asset flagged in report. */}
          <span className="font-plex-serif text-[19px] font-medium tracking-wide">
            PMRE
          </span>
        </Link>
        <nav className="flex items-center gap-6 lg:gap-8">
          <a
            href={`tel:${TEL}`}
            onClick={() => trackPhoneClick("header")}
            className="inline-flex items-center font-plex-sans text-[14px] text-dark-text hover:text-dark-text/80 transition-colors min-h-[44px]"
          >
            <span>
              Zavolejte:{" "}
              <span className="font-plex-mono underline nums-tabular">{TEL_DISPLAY}</span>
            </span>
          </a>
          <button
            type="button"
            data-track="cta_chci_znat"
            data-location="header"
            onClick={scrollToFirstFormOrAnchor}
            className="inline-flex items-center px-5 py-2.5 bg-paper text-paper-ink font-plex-sans font-semibold text-[14px] hover:-translate-y-px transition-transform min-h-[40px]"
          >
            Chci znát cenu
          </button>
        </nav>
      </div>
    </header>
  );
}

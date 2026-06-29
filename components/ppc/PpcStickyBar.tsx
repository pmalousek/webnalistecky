"use client";

import { useConsent } from "@/lib/consent";
import { trackPhoneClick } from "./ConversionTracker";
import { IconPhone, IconWhatsApp } from "./Icons";

const TEL = "+420777759590";
const WA_URL =
  "https://wa.me/420777759590?text=Dobr%C3%BD%20den%2C%20m%C3%A1m%20z%C3%A1jem%20o%20odhad%20nemovitosti.";

// A/B test: the dominant sticky CTA label. Phone generates ~0 calls, so the
// form CTA gets the visual weight and phone/WhatsApp drop to secondary icons.
const STICKY_CTA_LABEL = "Chci znát cenu";

function scrollToNextFormFromMidViewport() {
  const forms = Array.from(
    document.querySelectorAll<HTMLElement>('[data-form="callback"]')
  );
  if (forms.length === 0) {
    // Subpage with no form — jump to root /ppc form anchor.
    window.location.href = "/ppc#formular";
    return;
  }
  const originY = window.scrollY + window.innerHeight / 2;
  const next = forms.find(
    (f) => f.getBoundingClientRect().top + window.scrollY > originY
  );
  const target = next ?? forms[0];
  target.scrollIntoView({ behavior: "smooth", block: "center" });
  const input = target.querySelector<HTMLInputElement>('input[type="tel"]');
  setTimeout(() => input?.focus({ preventScroll: true }), 600);
}

export default function PpcStickyBar() {
  const { status } = useConsent();
  // Hide while consent banner is shown (status === 'pending') so we don't
  // double-stack at the viewport bottom. Read-only consumer of useConsent —
  // consent state machine itself is untouched.
  if (status === "pending") return null;

  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-dark-bg border-t border-dark-line flex"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0)" }}
    >
      {/* Secondary contacts — narrow, icon-only (labels via aria-label). */}
      <a
        href={`tel:${TEL}`}
        onClick={() => trackPhoneClick("sticky_bar")}
        className="flex-none inline-flex items-center justify-center px-5 py-3 text-dark-secondary min-h-[48px]"
        aria-label="Zavolat Pavlovi"
      >
        <IconPhone size={20} />
      </a>
      <a
        href={WA_URL}
        target="_blank"
        rel="noopener noreferrer"
        data-track="whatsapp_click"
        data-location="sticky_bar"
        className="flex-none inline-flex items-center justify-center px-5 py-3 text-dark-secondary border-l border-dark-line min-h-[48px]"
        aria-label="Napsat WhatsApp"
      >
        <IconWhatsApp size={20} />
      </a>
      {/* Primary CTA — dominant width + paper fill. */}
      <button
        type="button"
        data-track="cta_chci_znat"
        data-location="sticky_bar"
        onClick={scrollToNextFormFromMidViewport}
        className="flex-1 inline-flex items-center justify-center py-3 bg-paper text-paper-ink text-[14px] font-plex-sans font-semibold border-l border-dark-line min-h-[48px]"
      >
        {STICKY_CTA_LABEL}
      </button>
    </div>
  );
}

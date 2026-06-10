"use client";

import { IconWhatsApp } from "./Icons";

const WA_URL =
  "https://wa.me/420777759590?text=Dobr%C3%BD%20den%2C%20m%C3%A1m%20z%C3%A1jem%20o%20odhad%20nemovitosti.";

type Location = "hero" | "final_cta" | "sticky_bar";

type Props = {
  location: Location;
  variant?: "dark" | "paper" | "sticky";
  withIcon?: boolean;
  label?: string;
};

const variants: Record<NonNullable<Props["variant"]>, string> = {
  dark:
    "inline-flex items-center gap-2 px-6 py-3 border border-dark-line text-dark-text font-plex-sans font-medium text-[15px] hover:bg-dark-line/30 transition-colors min-h-[48px]",
  paper:
    "inline-flex items-center gap-2 px-6 py-3 border border-paper-ink text-paper-ink font-plex-sans font-medium text-[15px] hover:bg-paper-ink/5 transition-colors min-h-[48px]",
  sticky:
    "flex-1 inline-flex items-center justify-center gap-1.5 py-3 text-dark-text text-[13px] font-plex-sans font-medium border-l border-dark-line min-h-[48px]",
};

export default function WhatsAppLink({
  location,
  variant = "dark",
  withIcon = true,
  label = "Napište na WhatsApp",
}: Props) {
  return (
    <a
      href={WA_URL}
      target="_blank"
      rel="noopener noreferrer"
      data-track="whatsapp_click"
      data-location={location}
      className={variants[variant]}
    >
      {withIcon && <IconWhatsApp />}
      <span>{label}</span>
    </a>
  );
}

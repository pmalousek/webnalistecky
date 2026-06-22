"use client";

import { usePathname } from "next/navigation";
import { useConsent } from "@/lib/consent";

const GDPR_URL =
  "https://www.realitakbrno.cz/gdpr-zpracovani-osobnich-udaju/";

export default function CookieConsent() {
  const { status, grant, deny } = useConsent();
  const pathname = usePathname();

  if (status !== "pending") return null;

  // /ppc gets a slim bar so it never dominates the screen or covers the
  // above-the-fold lead form. Root keeps its original banner (out of scope).
  if (pathname?.startsWith("/ppc")) {
    return (
      <div
        className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-t border-border-line px-3 py-2 shadow-[0_-2px_8px_rgba(0,0,0,0.08)]"
        style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom, 0))" }}
      >
        <div className="max-w-container mx-auto flex items-center gap-2.5">
          <p className="flex-1 min-w-0 text-[11px] leading-tight text-gray-600">
            Cookies pro měření a&nbsp;reklamu.{" "}
            <a
              href={GDPR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-ink"
            >
              Více
            </a>
          </p>
          <button
            onClick={deny}
            className="shrink-0 px-3.5 py-2 text-[12px] border border-border-line text-gray-600 hover:bg-soft-bg transition-colors min-h-[40px]"
          >
            Odmítnout
          </button>
          <button
            onClick={grant}
            className="shrink-0 px-3.5 py-2 text-[12px] font-medium bg-brand text-white hover:bg-brand-dark transition-colors min-h-[40px]"
          >
            Přijmout vše
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border-line px-4 py-4 shadow-lg">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
        <p className="text-sm text-gray-600 max-w-prose">
          Tento web používá cookies pro měření návštěvnosti a vyhodnocení
          výkonu reklam. Vaše volba se uloží do prohlížeče.{" "}
          <a
            href={GDPR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-ink"
          >
            Více informací
          </a>
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={deny}
            className="px-4 py-2 text-sm border border-border-line text-gray-600 hover:bg-soft-bg transition-colors"
          >
            Odmítnout
          </button>
          <button
            onClick={grant}
            className="px-4 py-2 text-sm bg-brand text-white hover:bg-brand-dark transition-colors"
          >
            Přijmout vše
          </button>
        </div>
      </div>
    </div>
  );
}

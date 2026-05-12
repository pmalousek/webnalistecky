"use client";

import { useConsent } from "@/lib/consent";

export default function CookieConsent() {
  const { status, grant, deny } = useConsent();

  if (status !== "pending") return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border-line px-4 py-4 shadow-lg">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
        <p className="text-sm text-gray-600 max-w-prose">
          Tento web používá cookies pro měření návštěvnosti a vyhodnocení
          výkonu reklam. Vaše volba se uloží do prohlížeče.{" "}
          <a
            href="https://www.realitakbrno.cz/gdpr-zpracovani-osobnich-udaju/"
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

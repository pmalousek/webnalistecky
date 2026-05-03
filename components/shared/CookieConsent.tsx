"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "cookie_consent_v1";

type ConsentChoice = {
  marketing: boolean;
  analytics: boolean;
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function applyConsent({ marketing, analytics }: ConsentChoice) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("consent", "update", {
    ad_storage: marketing ? "granted" : "denied",
    ad_user_data: marketing ? "granted" : "denied",
    ad_personalization: marketing ? "granted" : "denied",
    analytics_storage: analytics ? "granted" : "denied",
  });
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      setVisible(true);
    } else {
      applyConsent(JSON.parse(stored) as ConsentChoice);
    }
  }, []);

  const save = (choice: ConsentChoice) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(choice));
    applyConsent(choice);
    setVisible(false);
  };

  if (!visible) return null;

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
            onClick={() => save({ marketing: false, analytics: false })}
            className="px-4 py-2 text-sm border border-border-line text-gray-600 hover:bg-soft-bg transition-colors"
          >
            Odmítnout
          </button>
          <button
            onClick={() => save({ marketing: true, analytics: true })}
            className="px-4 py-2 text-sm bg-brand text-white hover:bg-brand-dark transition-colors"
          >
            Přijmout vše
          </button>
        </div>
      </div>
    </div>
  );
}

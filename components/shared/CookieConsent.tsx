"use client";

import { useEffect, useState } from "react";
import { fireLetakLandingEvent } from "@/lib/utm";

const STORAGE_KEY = "cookie_consent_v1";

type ConsentChoice = {
  analytics: boolean;
  ads: boolean;
  timestamp: number;
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function applyConsent({ ads, analytics }: ConsentChoice) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("consent", "update", {
    ad_storage: ads ? "granted" : "denied",
    ad_user_data: ads ? "granted" : "denied",
    ad_personalization: ads ? "granted" : "denied",
    analytics_storage: analytics ? "granted" : "denied",
  });
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      setVisible(true);
      return;
    }

    // Validate stored schema. Re-prompt if invalid (e.g. legacy {marketing}).
    let consent: ConsentChoice;
    try {
      const raw = JSON.parse(stored);
      if (
        typeof raw?.analytics !== "boolean" ||
        typeof raw?.ads !== "boolean"
      ) {
        setVisible(true);
        return;
      }
      consent = { analytics: raw.analytics, ads: raw.ads, timestamp: raw.timestamp ?? 0 };
    } catch {
      setVisible(true);
      return;
    }

    // gtag is loaded via Next.js Script strategy="lazyOnload" — initialized
    // after window.load + requestIdleCallback. Retry applyConsent until
    // window.gtag is defined (max 5x, 200ms apart = up to 1s total).
    let attempts = 0;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const tryApply = () => {
      if (window.gtag) {
        applyConsent(consent);
        if (consent.analytics) fireLetakLandingEvent();
        return;
      }
      if (++attempts < 5) {
        timeoutId = setTimeout(tryApply, 200);
      }
    };
    tryApply();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const save = (choice: Omit<ConsentChoice, "timestamp">) => {
    const full: ConsentChoice = { ...choice, timestamp: Date.now() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(full));
    applyConsent(full);
    if (full.analytics) fireLetakLandingEvent();
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
            onClick={() => save({ ads: false, analytics: false })}
            className="px-4 py-2 text-sm border border-border-line text-gray-600 hover:bg-soft-bg transition-colors"
          >
            Odmítnout
          </button>
          <button
            onClick={() => save({ ads: true, analytics: true })}
            className="px-4 py-2 text-sm bg-brand text-white hover:bg-brand-dark transition-colors"
          >
            Přijmout vše
          </button>
        </div>
      </div>
    </div>
  );
}

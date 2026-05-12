"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { fireLetakLandingEvent } from "@/lib/utm";

const STORAGE_KEY = "cookie_consent_v1";

export type ConsentStatus = "pending" | "granted" | "denied";

type ConsentChoice = {
  analytics: boolean;
  ads: boolean;
  timestamp: number;
};

type ConsentContextValue = {
  status: ConsentStatus;
  analytics: boolean;
  ads: boolean;
  grant: () => void;
  deny: () => void;
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const ConsentContext = createContext<ConsentContextValue | null>(null);

function applyConsent(ads: boolean, analytics: boolean) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("consent", "update", {
    ad_storage: ads ? "granted" : "denied",
    ad_user_data: ads ? "granted" : "denied",
    ad_personalization: ads ? "granted" : "denied",
    analytics_storage: analytics ? "granted" : "denied",
  });
}

// 5x200ms retry — migrated from CookieConsent.tsx (S02N01 race fix).
// gtag.js loads via Next/Script lazyOnload = post-window.load + requestIdleCallback,
// so window.gtag may not be defined immediately on mount or after grant().
function retryUntilGtag(action: () => void): () => void {
  let attempts = 0;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  const tryAction = () => {
    if (window.gtag) {
      action();
      return;
    }
    if (++attempts < 5) {
      timeoutId = setTimeout(tryAction, 200);
    }
  };
  tryAction();
  return () => {
    if (timeoutId) clearTimeout(timeoutId);
  };
}

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<ConsentStatus>("pending");
  const [analytics, setAnalytics] = useState(false);
  const [ads, setAds] = useState(false);

  // Hydrate from localStorage on mount. SSR-safe: server render = 'pending'.
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return;

    let consent: ConsentChoice;
    try {
      const raw = JSON.parse(stored);
      if (
        typeof raw?.analytics !== "boolean" ||
        typeof raw?.ads !== "boolean"
      ) {
        return; // invalid schema → stay 'pending' → banner re-prompts
      }
      consent = {
        analytics: raw.analytics,
        ads: raw.ads,
        timestamp: raw.timestamp ?? 0,
      };
    } catch {
      return;
    }

    setAnalytics(consent.analytics);
    setAds(consent.ads);
    // Both true → Přijmout vše → 'granted'. Both false → Odmítnout → 'denied'.
    // Granular not possible in current UI (all-or-nothing buttons).
    setStatus(consent.analytics || consent.ads ? "granted" : "denied");

    return retryUntilGtag(() => {
      applyConsent(consent.ads, consent.analytics);
      if (consent.analytics) fireLetakLandingEvent();
    });
  }, []);

  const grant = useCallback(() => {
    const full: ConsentChoice = {
      analytics: true,
      ads: true,
      timestamp: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(full));
    setAnalytics(true);
    setAds(true);
    setStatus("granted");
    // gtag.js Script tag mounts on next render (gated by analytics=true).
    // Retry covers the window between state update and lazyOnload completion.
    retryUntilGtag(() => {
      applyConsent(true, true);
      fireLetakLandingEvent();
    });
  }, []);

  const deny = useCallback(() => {
    const full: ConsentChoice = {
      analytics: false,
      ads: false,
      timestamp: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(full));
    setAnalytics(false);
    setAds(false);
    setStatus("denied");
    // gtag.js will not be rendered. If a stale instance exists from a prior
    // session, update its consent state defensively.
    if (typeof window !== "undefined" && window.gtag) {
      applyConsent(false, false);
    }
  }, []);

  return (
    <ConsentContext.Provider value={{ status, analytics, ads, grant, deny }}>
      {children}
    </ConsentContext.Provider>
  );
}

export function useConsent(): ConsentContextValue {
  const ctx = useContext(ConsentContext);
  if (!ctx) {
    throw new Error("useConsent must be used within ConsentProvider");
  }
  return ctx;
}

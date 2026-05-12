"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

type UtmKey = (typeof UTM_KEYS)[number];

export type UtmParams = Partial<Record<UtmKey, string>>;

export function useUtmParams(): UtmParams {
  const [params, setParams] = useState<UtmParams>({});

  useEffect(() => {
    const search = new URLSearchParams(window.location.search);
    const result: UtmParams = {};

    UTM_KEYS.forEach((key) => {
      const fromUrl = search.get(key);
      if (fromUrl) {
        sessionStorage.setItem(key, fromUrl);
        result[key] = fromUrl;
      } else {
        const saved = sessionStorage.getItem(key);
        if (saved) result[key] = saved;
      }
    });

    setParams(result);
  }, []);

  return params;
}

export type TrafficSourceType = "letak" | "ppc" | "organic";

/**
 * GA4 custom dimension `traffic_source_type` per session.
 * - 'ppc'     if pathname starts with /ppc
 * - 'letak'   if sessionStorage utm_source === 'letak'
 * - 'organic' otherwise
 * SSR-safe: returns 'organic' on first render, updates after mount.
 */
/**
 * Fire GA4 custom event `letak_landing` if session originated from utm_source=letak.
 * Safe to call any time — no-op if utm_source !== 'letak' or gtag not (yet) loaded.
 * Retries gtag access (same lazyOnload pattern as CookieConsent).
 */
export function fireLetakLandingEvent(): void {
  if (typeof window === "undefined") return;
  const utmSource = sessionStorage.getItem("utm_source");
  if (utmSource !== "letak") return;
  // Dedupe per session — sessionStorage clears on tab close, so a new tab
  // (new touchpoint) fires letak_landing again. Refresh in same tab: skip.
  if (sessionStorage.getItem("letak_landing_fired") === "true") return;

  let attempts = 0;
  const tryFire = () => {
    if (window.gtag) {
      window.gtag("event", "letak_landing", {
        campaign: sessionStorage.getItem("utm_campaign") ?? "",
        source: utmSource,
        medium: sessionStorage.getItem("utm_medium") ?? "",
        traffic_source_type: "letak",
      });
      sessionStorage.setItem("letak_landing_fired", "true");
      return;
    }
    if (++attempts < 5) {
      setTimeout(tryFire, 200);
    }
  };
  tryFire();
}

export function useTrafficSourceType(): TrafficSourceType {
  const pathname = usePathname();
  const [type, setType] = useState<TrafficSourceType>("organic");

  useEffect(() => {
    if (pathname?.startsWith("/ppc")) {
      setType("ppc");
      return;
    }
    const utmSource = sessionStorage.getItem("utm_source");
    if (utmSource === "letak") {
      setType("letak");
      return;
    }
    setType("organic");
  }, [pathname]);

  return type;
}

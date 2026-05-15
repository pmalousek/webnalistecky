"use client";

import { useEffect } from "react";
import { TRACKING } from "@/lib/tracking-config";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

// Mirror of useTrafficSourceType (lib/utm.ts) — non-hook variant for
// imperative event handlers. Keep in sync with hook detection order.
function getTrafficSourceType(): "ppc" | "letak" | "organic" {
  if (typeof window === "undefined") return "organic";
  if (window.location.pathname.startsWith("/ppc")) return "ppc";
  if (sessionStorage.getItem("utm_source") === "letak") return "letak";
  return "organic";
}

// Fail-loud: if either env var is unset, skip the Google Ads conversion
// rather than firing gtag with `undefined/undefined` and silently losing
// attribution data. Browser console will surface the misconfiguration.
function fireGoogleAdsConversion() {
  const id = TRACKING.GOOGLE_ADS_CONVERSION_ID;
  const label = TRACKING.GOOGLE_ADS_LEAD_LABEL;
  if (!id || !label) {
    console.warn(
      "[tracking] Google Ads env vars missing " +
        "(NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID / NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL) — " +
        "skipping conversion event."
    );
    return;
  }
  window.gtag?.("event", "conversion", { send_to: `${id}/${label}` });
}

/** Fire GA4 + Google Ads pageview on mount. */
export default function ConversionTracker() {
  useEffect(() => {
    window.gtag?.("event", "page_view", {
      send_to: TRACKING.GA4_MEASUREMENT_ID,
    });
  }, []);

  return null;
}

export type CtaLocation = "hero" | "final_cta";

/** Call on tel: link click. */
export function trackPhoneClick(location: CtaLocation) {
  if (typeof window === "undefined") return;

  fireGoogleAdsConversion();

  // GA4 event
  window.gtag?.("event", "phone_click", {
    event_category: "engagement",
    event_label: `ppc_${location}`,
    traffic_source_type: getTrafficSourceType(),
  });

  // Meta Pixel
  window.fbq?.("track", "Contact");
}

/** Call on successful callback form submission. */
export function trackFormSubmit(location: CtaLocation) {
  if (typeof window === "undefined") return;

  fireGoogleAdsConversion();

  // GA4 event
  window.gtag?.("event", "qualify_lead", {
    event_category: "engagement",
    event_label: `callback_form_${location}`,
    traffic_source_type: getTrafficSourceType(),
  });

  // Meta Pixel
  window.fbq?.("track", "Lead");
}

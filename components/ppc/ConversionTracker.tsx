"use client";

import { useEffect } from "react";
import { TRACKING } from "@/lib/tracking-config";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
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

  // Google Ads conversion
  window.gtag?.("event", "conversion", {
    send_to: `${TRACKING.GOOGLE_ADS_ID}/${TRACKING.GOOGLE_ADS_CONVERSION_LABEL}`,
  });

  // GA4 event
  window.gtag?.("event", "phone_click", {
    event_category: "engagement",
    event_label: `ppc_${location}`,
  });

  // Meta Pixel
  window.fbq?.("track", "Contact");
}

/** Call on successful callback form submission. */
export function trackFormSubmit(location: CtaLocation) {
  if (typeof window === "undefined") return;

  // Google Ads conversion
  window.gtag?.("event", "conversion", {
    send_to: `${TRACKING.GOOGLE_ADS_ID}/${TRACKING.GOOGLE_ADS_CONVERSION_LABEL}`,
  });

  // GA4 event
  window.gtag?.("event", "qualify_lead", {
    event_category: "engagement",
    event_label: `callback_form_${location}`,
  });

  // Meta Pixel
  window.fbq?.("track", "Lead");
}

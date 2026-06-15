"use client";

import { useEffect } from "react";
import { TRACKING } from "@/lib/tracking-config";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    // Sklik (Seznam) rc.js — loaded consent-gated in PpcTrackingScripts.
    rc?: {
      conversionHit?: (o: {
        id: number;
        value: number | null;
        consent: 0 | 1;
      }) => void;
      retargetingHit?: (o: { rtgId: number; consent: 0 | 1 }) => void;
    };
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

// Fail-loud: if the conversion ID or label is unset, skip the Google Ads
// conversion rather than firing gtag with `undefined/undefined` and silently
// losing attribution data. Browser console surfaces the misconfiguration.
// `label` defaults to the lead label (phone_click / qualify_lead / cta /
// whatsapp); page_engagement passes the page-engagement label instead.
function fireGoogleAdsConversion(
  label: string | undefined = TRACKING.GOOGLE_ADS_LEAD_LABEL
) {
  const id = TRACKING.GOOGLE_ADS_CONVERSION_ID;
  if (!id || !label) {
    console.warn(
      "[tracking] Google Ads conversion skipped — missing " +
        "NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID or the conversion label env var."
    );
    return;
  }
  window.gtag?.("event", "conversion", { send_to: `${id}/${label}` });
}

// Sklik (Seznam) conversion — fires alongside the Google Ads conversion on the
// same lead actions (phone_click, qualify_lead). No-op until rc.js is loaded
// (consent-gated in PpcTrackingScripts), so 0 requests before consent.
function fireSklikConversion() {
  const id = TRACKING.SKLIK_CONVERSION_ID;
  if (!id) return;
  window.rc?.conversionHit?.({ id: Number(id), value: null, consent: 1 });
}

/**
 * /ppc tracking hub. Mounted once on the /ppc page. Fires page_view on mount
 * and wires the DOM-declared trackers via a single delegated click listener
 * (data-track + data-location), plus a page-engagement signal (75% scroll OR
 * 60s, once). gtag/fbq are optional-chained → before consent (gtag unloaded)
 * everything is a no-op = 0 requests (hard consent gating, unchanged).
 */
export default function ConversionTracker() {
  useEffect(() => {
    window.gtag?.("event", "page_view", {
      send_to: TRACKING.GA4_MEASUREMENT_ID,
    });

    // Delegated click handler for DOM-declared CTAs. Capture phase so it still
    // runs when the target is an <a> that navigates (WhatsApp opens a new tab).
    const onClick = (e: Event) => {
      const target = e.target as Element | null;
      const el = target?.closest?.("[data-track]");
      if (!el) return;
      const kind = el.getAttribute("data-track");
      const location = el.getAttribute("data-location") || "unknown";
      if (kind === "whatsapp_click") trackWhatsAppClick(location);
      else if (kind === "cta_chci_znat") trackCtaClick(location);
    };
    document.addEventListener("click", onClick, true);

    // Page engagement: fire once at 75% scroll depth OR 60s dwell.
    let fired = false;
    let timer: ReturnType<typeof setTimeout>;
    function cleanupEngagement() {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    }
    function fireEngagement(trigger: "scroll_75" | "time_60s") {
      if (fired) return;
      fired = true;
      cleanupEngagement();
      trackPageEngagement(trigger);
    }
    function onScroll() {
      const doc = document.documentElement;
      const ratio =
        (window.scrollY + window.innerHeight) / (doc.scrollHeight || 1);
      if (ratio >= 0.75) fireEngagement("scroll_75");
    }
    timer = setTimeout(() => fireEngagement("time_60s"), 60000);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      document.removeEventListener("click", onClick, true);
      cleanupEngagement();
    };
  }, []);

  return null;
}

export type CtaLocation = "hero" | "final_cta" | "sticky_bar" | "header";

type PhoneClickOptions = {
  /**
   * Fire the marketing conversions (Google Ads lead conversion + Meta Pixel)
   * alongside the GA4 event. Default `true` — /ppc keeps firing them.
   * The root passes `false`: organic/leták phone clicks are measured in GA4
   * only, so they don't pollute paid-campaign conversion data.
   */
  adsConversion?: boolean;
  /** event_label prefix. Default `"ppc"`; root passes `"root"`. */
  labelPrefix?: string;
};

/** Call on tel: link click. */
export function trackPhoneClick(
  location: CtaLocation,
  options: PhoneClickOptions = {}
) {
  if (typeof window === "undefined") return;

  const { adsConversion = true, labelPrefix = "ppc" } = options;

  if (adsConversion) {
    fireGoogleAdsConversion();
    fireSklikConversion();
  }

  // GA4 event — always fires (measurement).
  window.gtag?.("event", "phone_click", {
    event_category: "engagement",
    event_label: `${labelPrefix}_${location}`,
    traffic_source_type: getTrafficSourceType(),
  });

  // Meta Pixel — marketing conversion, /ppc only.
  if (adsConversion) window.fbq?.("track", "Contact");
}

/** Call on successful callback form submission. */
export function trackFormSubmit(location: CtaLocation) {
  if (typeof window === "undefined") return;

  fireGoogleAdsConversion();
  fireSklikConversion();

  // GA4 event
  window.gtag?.("event", "qualify_lead", {
    event_category: "engagement",
    event_label: `callback_form_${location}`,
    traffic_source_type: getTrafficSourceType(),
  });

  // Meta Pixel
  window.fbq?.("track", "Lead");
}

/**
 * WhatsApp link click. Wired via the delegated listener in ConversionTracker
 * (data-track="whatsapp_click"). /ppc → adsConversion default (lead label).
 */
export function trackWhatsAppClick(location: string) {
  if (typeof window === "undefined") return;

  fireGoogleAdsConversion();

  window.gtag?.("event", "whatsapp_click", {
    event_category: "engagement",
    event_label: `ppc_${location}`,
    traffic_source_type: getTrafficSourceType(),
  });

  // Meta Pixel
  window.fbq?.("track", "Contact");
}

/**
 * "Chci znát cenu" CTA click (data-track="cta_chci_znat"). data-location
 * distinguishes header vs sticky_bar. /ppc → adsConversion default (lead label).
 */
export function trackCtaClick(location: string) {
  if (typeof window === "undefined") return;

  fireGoogleAdsConversion();

  window.gtag?.("event", "cta_chci_znat", {
    event_category: "engagement",
    event_label: `ppc_${location}`,
    traffic_source_type: getTrafficSourceType(),
  });
}

/**
 * Page-engagement signal — fires once at 75% scroll OR 60s dwell. Uses the
 * dedicated Google Ads page-engagement label (not the lead label).
 */
export function trackPageEngagement(trigger: "scroll_75" | "time_60s") {
  if (typeof window === "undefined") return;

  fireGoogleAdsConversion(TRACKING.GOOGLE_ADS_PAGE_ENGAGEMENT_LABEL);

  window.gtag?.("event", "page_engagement", {
    event_category: "engagement",
    event_label: `ppc_${trigger}`,
    traffic_source_type: getTrafficSourceType(),
  });
}

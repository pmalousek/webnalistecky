"use client";

import { useEffect } from "react";
import Script from "next/script";
import { TRACKING } from "@/lib/tracking-config";
import { useTrafficSourceType, useUtmParams } from "@/lib/utm";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/**
 * GA4 + Google Ads with Consent Mode v2 — ADVANCED — mounted ONCE in the root
 * layout (covers /ppc via nesting).
 *
 * Advanced mode: gtag.js loads UNCONDITIONALLY. Consent defaults to denied
 * (set before gtag.js, with wait_for_update), so before a choice and on Deny,
 * GA4 + Ads send cookieless modeling pings (gcs=G100) and set NO cookies.
 * ConsentProvider.grant() fires gtag('consent','update', granted) → the session
 * upgrades live to full measurement (gcs=G111, _ga/_gid cookies).
 *
 * Sklik (rc.js) stays HARD-gated separately in PpcTrackingScripts (no gcs
 * equivalent). Meta stays gated. Clarity is unconditional (unchanged).
 */
export default function GoogleAnalytics() {
  const trafficSourceType = useTrafficSourceType();
  useUtmParams(); // capture URL UTM params to sessionStorage on first mount

  useEffect(() => {
    let attempts = 0;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const trySet = () => {
      if (window.gtag) {
        window.gtag("set", { traffic_source_type: trafficSourceType });
        return;
      }
      if (++attempts < 5) {
        timeoutId = setTimeout(trySet, 200);
      }
    };
    trySet();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [trafficSourceType]);

  return (
    <>
      {/*
       * Consent Mode v2 — MUST run before gtag.js (first in dataLayer).
       * Default all denied + wait_for_update so a fast Accept upgrades the very
       * first hit. url_passthrough + ads_data_redaction harden the cookieless
       * (denied) state for Ads.
       */}
      <Script id="gtag-consent-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'denied',
            wait_for_update: 500
          });
          gtag('set', 'url_passthrough', true);
          gtag('set', 'ads_data_redaction', true);
        `}
      </Script>

      {/* Advanced mode: load gtag.js ALWAYS — no consent gate. Denied state
          still emits cookieless modeling pings. afterInteractive so a late
          mount (e.g. client navigation) still injects. */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${TRACKING.GA4_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />

      <Script id="gtag-config" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          // Determine traffic_source_type at script execution time (browser API).
          // Order: pathname (/ppc) → URL utm_source=letak → sessionStorage utm_source → 'organic'
          var __tstPath = window.location.pathname || '';
          var __tstUrlSrc = new URLSearchParams(window.location.search).get('utm_source');
          var __tstSessSrc = sessionStorage.getItem('utm_source');
          var __tstSrc = __tstUrlSrc || __tstSessSrc;
          var __tst = __tstPath.indexOf('/ppc') === 0
            ? 'ppc'
            : (__tstSrc === 'letak' ? 'letak' : 'organic');

          // Pass traffic_source_type as default config param — propagates to
          // auto page_view + all subsequent events from this config.
          // (gtag('set') alone doesn't propagate for event-scoped dimensions.)
          gtag('config', '${TRACKING.GA4_MEASUREMENT_ID}', {
            custom_map: { dimension1: 'traffic_source_type' },
            traffic_source_type: __tst
          });
          ${
            TRACKING.GOOGLE_ADS_CONVERSION_ID
              ? `gtag('config', '${TRACKING.GOOGLE_ADS_CONVERSION_ID}');`
              : "/* Google Ads config skipped: NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID unset */"
          }
        `}
      </Script>
    </>
  );
}

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
 * GA4 + Consent Mode v2 — mounted ONCE in root layout (covers /ppc via nesting).
 * Sets custom dimension `traffic_source_type` per session, retried until
 * gtag is initialized (same pattern as CookieConsent — lazyOnload timing).
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
       * Consent Mode v2 — must initialize BEFORE gtag.js loads.
       * Default all denied; CookieConsent component updates on user grant.
       */}
      <Script id="gtag-consent-init" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'denied'
          });
        `}
      </Script>

      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${TRACKING.GA4_MEASUREMENT_ID}`}
        strategy="lazyOnload"
      />

      <Script id="gtag-config" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${TRACKING.GA4_MEASUREMENT_ID}', {
            custom_map: { dimension1: 'traffic_source_type' }
          });
          gtag('config', '${TRACKING.GOOGLE_ADS_ID}');
        `}
      </Script>
    </>
  );
}

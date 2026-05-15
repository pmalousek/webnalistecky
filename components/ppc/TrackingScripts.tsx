"use client";

import Script from "next/script";
import { TRACKING } from "@/lib/tracking-config";
import { useConsent } from "@/lib/consent";

/**
 * /ppc-only tracking pixels. Gated by ads consent (Meta + Sklik are
 * advertising/retargeting trackers — load only after user grants ads storage).
 * Each pixel additionally requires its env var to be set; unset = skip render.
 */
export default function PpcTrackingScripts() {
  const { ads } = useConsent();
  if (!ads) return null;

  return (
    <>
      {TRACKING.META_PIXEL_ID && (
        <Script id="meta-pixel" strategy="lazyOnload">
          {`
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){
            n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;
            s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
            (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init','${TRACKING.META_PIXEL_ID}');
            fbq('track','PageView');
          `}
        </Script>
      )}

      {TRACKING.SKLIK_CONVERSION_ID && (
        <Script id="sklik-pixel" strategy="lazyOnload">
          {`
            var seznam_retargeting_id = '${TRACKING.SKLIK_CONVERSION_ID}';
            (function(w,d,t,n){w[n]=w[n]||[];w[n].push({id:seznam_retargeting_id});
            var s=d.createElement(t);s.async=!0;s.src='https://c.imedia.cz/js/retargeting.js';
            var f=d.getElementsByTagName(t)[0];f.parentNode.insertBefore(s,f);}
            )(window,document,'script','_sz_retargeting');
          `}
        </Script>
      )}
    </>
  );
}

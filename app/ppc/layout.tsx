import type { Metadata } from "next";
import Script from "next/script";
import { TRACKING } from "@/lib/tracking-config";
import CookieConsent from "@/components/shared/CookieConsent";

export const metadata: Metadata = {
  title: "Prodej bytu v Brně — Pavel Maloušek, 17 let praxe",
  description:
    "17 let zkušeností, 700+ prodaných bytů. Žádné lístečky do schránek, žádné callcentrum. Zavolejte přímo Pavlovi.",
  robots: { index: false, follow: false },
};

export default function PpcLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/*
       * Consent Mode v2 — musí se inicializovat PŘED načtením gtag.js.
       * Defaultně vše denied; CookieConsent client komponent aktualizuje
       * po souhlasu uživatele pomocí gtag('consent', 'update', {...}).
       */}
      <Script id="gtag-consent-init" strategy="afterInteractive">
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

      {/* Google tag (gtag.js) */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${TRACKING.GA4_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-config" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${TRACKING.GA4_MEASUREMENT_ID}');
          gtag('config', '${TRACKING.GOOGLE_ADS_ID}');
        `}
      </Script>

      {/* Meta Pixel */}
      <Script id="meta-pixel" strategy="afterInteractive">
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

      {/* Sklik retargeting */}
      <Script id="sklik-pixel" strategy="afterInteractive">
        {`
          var seznam_retargeting_id = ${TRACKING.SKLIK_CONVERSION_ID};
          (function(w,d,t,n){w[n]=w[n]||[];w[n].push({id:seznam_retargeting_id});
          var s=d.createElement(t);s.async=!0;s.src='https://c.imedia.cz/js/retargeting.js';
          var f=d.getElementsByTagName(t)[0];f.parentNode.insertBefore(s,f);}
          )(window,document,'script','_sz_retargeting');
        `}
      </Script>

      {children}
      <CookieConsent />
    </>
  );
}

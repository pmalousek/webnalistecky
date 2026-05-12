import type { Metadata } from "next";
import Script from "next/script";
import { TRACKING } from "@/lib/tracking-config";
import CookieConsent from "@/components/shared/CookieConsent";

export const metadata: Metadata = {
  title: "Prodej bytu v Brně — Pavel Maloušek, 17 let praxe",
  description:
    "17 let zkušeností, 700+ prodaných nemovitostí. Žádné lístečky do schránek, žádné callcentrum. Zavolejte přímo Pavlovi.",
  robots: { index: false, follow: false },
};

export default function PpcLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* GA4 + Consent Mode v2 are mounted in root layout — covers /ppc via nesting. */}

      {/* Meta Pixel */}
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

      {/* Sklik retargeting */}
      <Script id="sklik-pixel" strategy="lazyOnload">
        {`
          var seznam_retargeting_id = '${TRACKING.SKLIK_CONVERSION_ID}';
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

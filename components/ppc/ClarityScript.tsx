import Script from "next/script";

// Microsoft Clarity — /ppc-only session recording / heatmaps.
//
// DELIBERATELY NOT consent-gated (Pavel's explicit decision for the PPC
// landing): loads unconditionally on first paint, outside the ConsentProvider /
// cookie_consent_v1 architecture. Kept fully separate from the GA4 / Google Ads
// stack — does not touch dataLayer or consent logic.
//
// Scoped to /ppc and /ppc/* purely by living in app/ppc/layout.tsx, which only
// renders for that route segment (the root "/" never mounts this layout).
const CLARITY_PROJECT_ID =
  process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID ?? "x7e6lklq5x";

export default function ClarityScript() {
  return (
    <Script id="ms-clarity" strategy="afterInteractive">
      {`(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");`}
    </Script>
  );
}

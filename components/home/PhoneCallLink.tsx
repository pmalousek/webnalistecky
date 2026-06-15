"use client";

import { IconPhone } from "@/components/ppc/Icons";
import { trackPhoneClick, type CtaLocation } from "@/components/ppc/ConversionTracker";

const TEL = "+420777759590";
const TEL_DISPLAY = "777 759 590";

// Root tel: link wired to the SAME handler as /ppc (trackPhoneClick), but with
// adsConversion:false → GA4 phone_click only, NO Google Ads conversion and NO
// Meta Pixel. Root traffic (leták/organic, not paid) must not feed campaign
// conversion data.
// On the root path getTrafficSourceType() resolves to "letak" (utm_source=letak
// session, same value as letak_landing) or "organic" — never "ppc" — so root
// calls are segmented apart from /ppc by the traffic_source_type dimension.
// Consent gating is inherited: gtag is optional-chained, so with no consent
// (gtag unloaded) the call is a no-op = 0 requests.
export default function PhoneCallLink({ location }: { location: CtaLocation }) {
  return (
    <a
      href={`tel:${TEL}`}
      onClick={() =>
        trackPhoneClick(location, { adsConversion: false, labelPrefix: "root" })
      }
      className="inline-flex items-center gap-2 font-plex-sans text-[15px] text-dark-text hover:text-dark-text/80 transition-colors min-h-[44px]"
    >
      <IconPhone />
      <span>
        Zavolejte:{" "}
        <span className="font-plex-mono underline nums-tabular">
          {TEL_DISPLAY}
        </span>
      </span>
    </a>
  );
}

// PPC tracking IDs — read from NEXT_PUBLIC_* env vars (client-side visible).
// Names match the Vercel project Environment Variables.
//
// No fallbacks for Google Ads / Meta / Sklik — undefined means "not configured":
// callers must check and skip the event (fail-loud via console.warn).
//
// GA4 retains a fallback because the production measurement ID is stable
// and known (G-TD4YCWXN88). P2 cleanup to add the env var is tracked
// separately in vercel-env-audit-checklist.md.
export const TRACKING = {
  GOOGLE_ADS_CONVERSION_ID: process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID,
  GOOGLE_ADS_LEAD_LABEL: process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL,
  GOOGLE_ADS_PAGE_ENGAGEMENT_LABEL:
    process.env.NEXT_PUBLIC_GOOGLE_ADS_PAGE_ENGAGEMENT_LABEL,
  META_PIXEL_ID: process.env.NEXT_PUBLIC_META_PIXEL_ID,
  SKLIK_CONVERSION_ID: process.env.NEXT_PUBLIC_SKLIK_CONVERSION_ID,
  GA4_MEASUREMENT_ID:
    process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID ?? "G-TD4YCWXN88",
} as const;

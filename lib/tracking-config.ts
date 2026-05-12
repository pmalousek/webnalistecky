// PPC tracking IDs — read from NEXT_PUBLIC_* env vars (client-side visible).
// Fallback values: dev-friendly for GA4 (real measurement ID), X-padded
// placeholders for the rest until Friday launch (S02-04).
// Production: set all NEXT_PUBLIC_* in Vercel Project Settings → Environment.
export const TRACKING = {
  GOOGLE_ADS_ID:
    process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? "AW-XXXXXXXXXX",
  GOOGLE_ADS_CONVERSION_LABEL:
    process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL ?? "XXXXXXXX",
  META_PIXEL_ID:
    process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "XXXXXXXXXX",
  SKLIK_CONVERSION_ID:
    process.env.NEXT_PUBLIC_SKLIK_CONVERSION_ID ?? "XXXXXXX",
  GA4_MEASUREMENT_ID:
    process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID ?? "G-TD4YCWXN88",
} as const;

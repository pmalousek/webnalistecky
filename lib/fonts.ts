import { IBM_Plex_Mono, IBM_Plex_Sans, IBM_Plex_Serif } from "next/font/google";

/**
 * Shared IBM Plex trio for the "dokument na tmavém stole" design system.
 * Originally defined inline in app/ppc/layout.tsx; extracted here so the root
 * route can adopt the same visual language without a second font definition.
 * (/ppc keeps its own inline copy — that file is out of scope to edit.)
 *
 * Serif → headings · Mono → kickers, section numbers, stats · Sans → body.
 */
export const plexSerif = IBM_Plex_Serif({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-serif",
  display: "swap",
});

export const plexSans = IBM_Plex_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
  display: "swap",
});

export const plexMono = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const plexFontVariables = `${plexSerif.variable} ${plexSans.variable} ${plexMono.variable}`;

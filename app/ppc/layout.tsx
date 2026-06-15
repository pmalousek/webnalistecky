import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, IBM_Plex_Serif } from "next/font/google";
import PpcTrackingScripts from "@/components/ppc/TrackingScripts";
import ClarityScript from "@/components/ppc/ClarityScript";
import PpcGrainOverlay from "@/components/ppc/PpcGrainOverlay";
import PpcHeader from "@/components/ppc/PpcHeader";

const plexSerif = IBM_Plex_Serif({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-serif",
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "Skutečná cena vaší nemovitosti — písemný odhad zdarma | Pavel Maloušek, Brno",
  description:
    "Většina makléřů cenu nadsadí, aby získala zakázku. Já vám řeknu cenu, za kterou opravdu prodáte — písemně, zdarma, do 24 hodin od schůzky. 17 let praxe, 700+ prodejů.",
  robots: { index: false, follow: false },
};

export default function PpcLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${plexSerif.variable} ${plexSans.variable} ${plexMono.variable} font-plex-sans bg-dark-bg text-dark-text min-h-screen relative isolate`}
    >
      <PpcGrainOverlay />
      {/* Clarity: unconditional, NOT consent-gated (separate from PpcTrackingScripts). */}
      <ClarityScript />
      <PpcTrackingScripts />
      <div className="relative z-10">
        <PpcHeader />
        {children}
      </div>
    </div>
  );
}

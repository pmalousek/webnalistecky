import type { Metadata } from "next";
import PpcTrackingScripts from "@/components/ppc/TrackingScripts";

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
      {/* Meta Pixel + Sklik retargeting are ads-consent-gated (client component). */}
      <PpcTrackingScripts />
      {children}
    </>
  );
}

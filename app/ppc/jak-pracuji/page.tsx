import type { Metadata } from "next";
import ConversionTracker from "@/components/ppc/ConversionTracker";
import PpcSliby from "@/components/ppc/PpcSliby";
import PpcKroky from "@/components/ppc/PpcKroky";
import PpcProcPracuju from "@/components/ppc/PpcProcPracuju";
import PpcSubpageCta from "@/components/ppc/PpcSubpageCta";
import PpcFooter from "@/components/ppc/PpcFooter";
import PpcStickyBar from "@/components/ppc/PpcStickyBar";

export const metadata: Metadata = {
  title: "Jak pracuju | Pavel Maloušek, Brno",
  description:
    "Co slíbím a co ne, kroky od telefonátu k odhadu, a proč pracuju sám bez centrály.",
  robots: { index: false, follow: false },
};

export default function PpcJakPracujiPage() {
  return (
    <main className="pb-16 md:pb-0">
      <ConversionTracker />
      <section className="px-4 pt-10 pb-4 md:pt-14 md:pb-6">
        <div className="max-w-container mx-auto">
          <h1 className="font-plex-serif text-dark-text text-[clamp(2.4rem,5vw,4rem)] leading-[1.05]">
            Jak pracuju
          </h1>
        </div>
      </section>
      <PpcSliby />
      <PpcKroky />
      <PpcProcPracuju />
      <PpcSubpageCta />
      <PpcFooter />
      <PpcStickyBar />
    </main>
  );
}

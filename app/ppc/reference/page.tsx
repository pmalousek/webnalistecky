import type { Metadata } from "next";
import ConversionTracker from "@/components/ppc/ConversionTracker";
import PpcTriProdeje from "@/components/ppc/PpcTriProdeje";
import PpcTestimonials from "@/components/ppc/PpcTestimonials";
import PpcSubpageCta from "@/components/ppc/PpcSubpageCta";
import PpcFooter from "@/components/ppc/PpcFooter";
import PpcStickyBar from "@/components/ppc/PpcStickyBar";

export const metadata: Metadata = {
  title: "Reference a výsledky | Pavel Maloušek, Brno",
  description:
    "Tři konkrétní prodeje a recenze klientů. 9 z 10 zakázek dostávám na doporučení.",
  robots: { index: false, follow: false },
};

export default function PpcReferencePage() {
  return (
    <main className="pb-16 md:pb-0">
      <ConversionTracker />
      <section className="px-4 pt-10 pb-4 md:pt-14 md:pb-6">
        <div className="max-w-container mx-auto">
          <h1 className="font-plex-serif text-dark-text text-[clamp(2.4rem,5vw,4rem)] leading-[1.05]">
            Reference a&nbsp;výsledky
          </h1>
        </div>
      </section>
      <PpcTriProdeje />
      <PpcTestimonials />
      <PpcSubpageCta />
      <PpcFooter />
      <PpcStickyBar />
    </main>
  );
}

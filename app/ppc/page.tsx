import PpcHero from "@/components/ppc/PpcHero";
import PpcStats from "@/components/ppc/PpcStats";
import PpcWhyListek from "@/components/ppc/PpcWhyListek";
import PpcHowDifferent from "@/components/ppc/PpcHowDifferent";
import PpcTestimonials from "@/components/ppc/PpcTestimonials";
import PpcFinalCta from "@/components/ppc/PpcFinalCta";
import PpcFooter from "@/components/ppc/PpcFooter";
import ConversionTracker from "@/components/ppc/ConversionTracker";

export default function PpcPage() {
  return (
    <main>
      <ConversionTracker />
      <PpcHero />
      <PpcStats />
      <PpcWhyListek />
      <PpcHowDifferent />
      <PpcTestimonials />
      <PpcFinalCta />
      <PpcFooter />
    </main>
  );
}

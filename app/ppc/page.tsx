import ConversionTracker from "@/components/ppc/ConversionTracker";
import PpcHero from "@/components/ppc/PpcHero";
import PpcStats from "@/components/ppc/PpcStats";
import PpcTriMakleri from "@/components/ppc/PpcTriMakleri";
import PpcSliby from "@/components/ppc/PpcSliby";
import PpcProcPracuju from "@/components/ppc/PpcProcPracuju";
import PpcTriProdeje from "@/components/ppc/PpcTriProdeje";
import PpcKroky from "@/components/ppc/PpcKroky";
import PpcTestimonials from "@/components/ppc/PpcTestimonials";
import PpcFaq from "@/components/ppc/PpcFaq";
import PpcZaver from "@/components/ppc/PpcZaver";
import PpcVygooglujte from "@/components/ppc/PpcVygooglujte";
import PpcFooter from "@/components/ppc/PpcFooter";
import PpcStickyBar from "@/components/ppc/PpcStickyBar";

export default function PpcPage() {
  return (
    <main className="pb-16 md:pb-0">
      <ConversionTracker />
      <PpcHero />
      <PpcStats />
      <PpcTriMakleri />
      <PpcSliby />
      <PpcProcPracuju />
      <PpcTriProdeje />
      <PpcKroky />
      <PpcTestimonials />
      <PpcFaq />
      <PpcZaver />
      <PpcVygooglujte />
      <PpcFooter />
      <PpcStickyBar />
    </main>
  );
}

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
      <section className="bg-white py-10 px-4 text-center">
        <a
          href="https://www.google.com/search?q=bc.+pavel+malou%C5%A1ek"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-5 py-2 border-2 border-brand text-brand font-semibold text-sm hover:bg-brand hover:text-white transition-colors"
        >
          Vygooglujte si mě
        </a>
      </section>
      <PpcFooter />
    </main>
  );
}

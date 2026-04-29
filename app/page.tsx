import HeroSection from "@/components/HeroSection";
import CislaSection from "@/components/CislaSection";
import ProcZrovnaJa from "@/components/ProcZrovnaJa";
import EbookSection from "@/components/EbookSection";
import KontaktSection from "@/components/KontaktSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <CislaSection />
      <ProcZrovnaJa />
      <EbookSection />
      <KontaktSection />
      <Footer />
    </main>
  );
}

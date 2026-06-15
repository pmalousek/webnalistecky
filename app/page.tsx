import PpcGrainOverlay from "@/components/ppc/PpcGrainOverlay";
import PpcStats from "@/components/ppc/PpcStats";
import PpcMapa from "@/components/ppc/PpcMapa";
import HomeHero from "@/components/home/HomeHero";
import HomeProcJa from "@/components/home/HomeProcJa";
import HomeReference from "@/components/home/HomeReference";
import HomeEbook from "@/components/home/HomeEbook";
import HomeKontakt from "@/components/home/HomeKontakt";
import HomeFooter from "@/components/home/HomeFooter";

// Root landing rebuilt in the /ppc "dokument na tmavém stole" design system.
// Sections 01 (statistiky) and 02 (mapa) are the /ppc components reused 1:1;
// the rest keep the root's anti-lísteček narrative in the same visual language.
// Indexability + GA4 (letak_landing, consent gating) live in the root layout
// and are intentionally untouched here.
export default function Home() {
  return (
    <div className="font-plex-sans bg-dark-bg text-dark-text min-h-screen relative isolate">
      <PpcGrainOverlay />
      <div className="relative z-10">
        <main>
          <HomeHero />
          <PpcStats />
          <PpcMapa />
          <HomeProcJa />
          <HomeReference />
          <HomeEbook />
          <HomeKontakt />
          <HomeFooter />
        </main>
      </div>
    </div>
  );
}

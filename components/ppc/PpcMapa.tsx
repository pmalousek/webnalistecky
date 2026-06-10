import Image from "next/image";
import PaperGrain, { PaperPasparta } from "./PaperGrain";

export default function PpcMapa() {
  return (
    <section className="px-4 py-10 md:py-14">
      <div className="max-w-container mx-auto">
        <p className="font-plex-mono text-[12px] uppercase tracking-[0.15em] text-dark-secondary mb-3">
          02
        </p>
        <h2 className="font-plex-serif text-dark-text text-[clamp(1.9rem,3.5vw,2.6rem)] leading-[1.15] mb-6">
          Každý špendlík je jeden prodaný domov.
        </h2>

        <div className="bg-paper text-paper-ink shadow-paper relative isolate">
          <PaperGrain />
          <PaperPasparta />
          <div className="relative z-10 p-3 md:p-4">
            <div className="border border-paper-ink/10">
              <Image
                src="/mapa-prodeju.png"
                alt="Mapa jižní Moravy se stovkami špendlíků označujícími prodané nemovitosti, nejhustěji v Brně a okolí."
                width={1600}
                height={1000}
                quality={70}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1080px"
                className="w-full h-auto block"
              />
            </div>
            <p className="font-plex-mono text-[12px] uppercase tracking-[0.15em] text-paper-secondary mt-4">
              700+ prodejů · 17 let · Brno a jižní Morava
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

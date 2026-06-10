import { IconCheck, IconCross } from "./Icons";
import PaperGrain, { PaperPasparta } from "./PaperGrain";

export default function PpcSliby() {
  return (
    <section className="px-4 py-10 md:py-14">
      <div className="max-w-container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-start">
          <div>
            <p className="font-plex-mono text-[12px] uppercase tracking-[0.15em] text-dark-secondary mb-3">
              04
            </p>
            <h2 className="font-plex-serif text-dark-text text-[clamp(1.9rem,3.5vw,2.6rem)] leading-[1.15] mb-6">
              Co vám neslíbím
            </h2>
            <ul className="space-y-6 max-w-[38rem]">
              <li className="flex gap-4">
                <IconCross className="text-stamp-dark mt-1 shrink-0" />
                <p className="font-plex-sans text-[17px] md:text-[18px] leading-[1.6] text-dark-text">
                  <span className="font-semibold">Cenu do telefonu.</span> Kdo vám ocení byt, aniž ho viděl, hádá. Nebo lže.
                </p>
              </li>
              <li className="flex gap-4">
                <IconCross className="text-stamp-dark mt-1 shrink-0" />
                <p className="font-plex-sans text-[17px] md:text-[18px] leading-[1.6] text-dark-text">
                  <span className="font-semibold">Kupce, kterého nemám.</span>{" "}
                  „Koupím byt na vaší ulici" píšou do schránek makléři, kteří žádného kupce nemají. Proto se tenhle web jmenuje nekoupimbyt.cz.
                </p>
              </li>
              <li className="flex gap-4">
                <IconCross className="text-stamp-dark mt-1 shrink-0" />
                <div className="space-y-3">
                  <p className="font-plex-sans text-[17px] md:text-[18px] leading-[1.6] text-dark-text">
                    <span className="font-semibold">Prodej za týden.</span> Slibovat rychlost dopředu je marketing. Můj průměr je 35 dní — to není slib, to je statistika ze 700 prodejů.
                  </p>
                  <p className="font-plex-sans text-[17px] md:text-[18px] leading-[1.6] text-dark-text">
                    Pokud byste přesto potřebovali prodat rychle, mám investory, kteří umí nemovitost koupit rychle. Samozřejmě za&nbsp;nižší cenu, ale klidně do&nbsp;dvou dnů. Ale není to to hlavní, co pro&nbsp;klienty dělám.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-paper text-paper-ink shadow-paper p-7 md:p-9 relative isolate">
            <PaperGrain />
            <PaperPasparta />
            <div className="relative z-10">
              <h3 className="font-plex-serif text-[clamp(1.6rem,3vw,2.2rem)] leading-tight mb-6">
                A co slíbím
              </h3>
              <ul className="space-y-5">
                <li className="flex gap-4">
                  <IconCheck className="text-stamp-paper mt-1 shrink-0" />
                  <p className="font-plex-sans text-[16px] md:text-[17px] leading-[1.6]">
                    <span className="font-semibold">Písemný rozsáhlý strukturovaný odhad do 24 hodin od schůzky.</span> Se srovnatelnými prodeji, ať si každé číslo ověříte.
                  </p>
                </li>
                <li className="flex gap-4">
                  <IconCheck className="text-stamp-paper mt-1 shrink-0" />
                  <p className="font-plex-sans text-[16px] md:text-[17px] leading-[1.6]">
                    <span className="font-semibold">Na první schůzce nemusíte nic podepsat.</span> Bez výjimky.
                  </p>
                </li>
                <li className="flex gap-4">
                  <IconCheck className="text-stamp-paper mt-1 shrink-0" />
                  <p className="font-plex-sans text-[16px] md:text-[17px] leading-[1.6]">
                    <span className="font-semibold">Platíte až po prodeji.</span> Žádné zálohy, žádné poplatky předem. Pokud neprodám, neplatíte nic.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

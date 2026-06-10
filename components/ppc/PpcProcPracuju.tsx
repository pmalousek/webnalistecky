import PaperGrain, { PaperPasparta } from "./PaperGrain";

export default function PpcProcPracuju() {
  return (
    <section className="px-4 py-10 md:py-14">
      <div className="max-w-container mx-auto">
        <div className="bg-paper text-paper-ink shadow-paper p-10 md:p-12 max-w-card relative isolate">
          <PaperGrain />
          <PaperPasparta />
          <div className="relative z-10">
            <p className="font-plex-mono text-[12px] uppercase tracking-[0.15em] text-paper-secondary mb-3">
              05
            </p>
            <h2 className="font-plex-serif text-[clamp(1.9rem,3.8vw,2.8rem)] leading-[1.15] mb-6">
              Proč pracuju takhle
            </h2>
            <div className="space-y-4 font-plex-sans text-[17px] md:text-[18px] leading-[1.6]">
              <p>
                Dělal jsem vedoucího pobočky velké realitní sítě a&nbsp;patřil jsem mezi jejích 50 nejlepších makléřů z&nbsp;více než 2000. Neodešel jsem, protože by mi to nešlo. Odešel jsem, protože jsem viděl, jak ten stroj funguje zevnitř: nábor nováčků, plány náběrů, tlak na&nbsp;nadsazené odhady, lístečky do&nbsp;schránek. Váš byt je pro čerstvého makléře cvičiště. Učí se na&nbsp;něm — a&nbsp;vy to platíte časem, slevami a&nbsp;nervy.
              </p>
              <p>
                Dnes pracuju sám. Bez centrály, bez juniorů, bez callcentra. Když zavoláte, mluvíte se mnou — od&nbsp;první schůzky po&nbsp;předání klíčů.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

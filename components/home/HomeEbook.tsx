import EbookForm from "@/components/EbookForm";
import PaperGrain, { PaperPasparta } from "@/components/ppc/PaperGrain";

// 05 — ebook lead magnet "Než podepíšete cokoli s realitkou…" as a paper card.
export default function HomeEbook() {
  return (
    <section id="ebook" className="px-4 py-10 md:py-14">
      <div className="max-w-container mx-auto">
        <div className="bg-paper text-paper-ink shadow-paper p-8 md:p-12 max-w-card relative isolate">
          <PaperGrain />
          <PaperPasparta />
          <div className="relative z-10">
            <p className="font-plex-mono text-[12px] uppercase tracking-[0.15em] text-paper-secondary mb-3">
              05
            </p>
            <h2 className="font-plex-serif text-[clamp(1.9rem,3.8vw,2.8rem)] leading-[1.15] mb-6">
              Než podepíšete cokoli s&nbsp;realitkou, přečtěte si tohle.
            </h2>
            <p className="font-plex-sans text-[17px] md:text-[18px] leading-[1.6] mb-8 max-w-[40rem]">
              6 věcí, které jsem za&nbsp;17 let v&nbsp;branži viděl zevnitř
              a&nbsp;které Vám velké realitky neřeknou — ne protože by chtěly
              škodit, ale protože by přišly o&nbsp;byznys. Žádná senzace, žádné
              konspirace. Jen rozdíly, které byste měli vědět dřív, než svěříte
              největší majetek své rodiny někomu, kdo se to teprve učí. Pošlu
              Vám PDF na&nbsp;e-mail.
            </p>
            <EbookForm />
          </div>
        </div>
      </div>
    </section>
  );
}

import ContactForm from "@/components/ContactForm";
import WhatsAppLink from "@/components/ppc/WhatsAppLink";
import PhoneCallLink from "./PhoneCallLink";
import PaperGrain, { PaperPasparta } from "@/components/ppc/PaperGrain";

// 06 — closing contact section. Root content, /ppc závěr layout:
// narrative + contacts on the dark left, form in a paper card on the right.
export default function HomeKontakt() {
  return (
    <section id="kontakt" className="px-4 py-10 md:py-14">
      <div className="max-w-container mx-auto">
        <div className="grid gap-10 md:gap-12 md:grid-cols-2 items-start">
          <div>
            <p className="font-plex-mono text-[12px] uppercase tracking-[0.15em] text-dark-secondary mb-3">
              06
            </p>
            <h2 className="font-plex-serif text-dark-text text-[clamp(2rem,4vw,3rem)] leading-[1.1] mb-6">
              Pojďme si o&nbsp;tom v&nbsp;klidu popovídat.
            </h2>
            <p className="font-plex-sans text-[17px] md:text-[18px] leading-[1.6] text-dark-text max-w-[38rem]">
              Konzultace zdarma znamená přesně to, co píšu: přijdu, podíváme se
              na&nbsp;byt, řekneme si, co se za&nbsp;něj reálně dá dostat
              a&nbsp;jakou strategií. Pokud Vám mé pojetí nebude sedět, žádný
              problém — nemusíme nic podepsat na&nbsp;první schůzce, a&nbsp;vlastně
              vůbec. Žádný tlak, žádné „ale podepište mi to dnes&rdquo;. Jen
              rozhovor dvou dospělých lidí, kteří mají stejný cíl.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <PhoneCallLink location="final_cta" />
              <WhatsAppLink location="final_cta" variant="dark" />
            </div>

            <p className="mt-4 font-plex-sans text-[15px] text-dark-secondary">
              Nebo pište:{" "}
              <a
                href="mailto:info@realitakbrno.cz"
                className="text-dark-text underline hover:text-dark-text/80 transition-colors"
              >
                info@realitakbrno.cz
              </a>
            </p>
          </div>

          <div className="bg-paper text-paper-ink shadow-paper p-6 sm:p-8 relative isolate">
            <PaperGrain />
            <PaperPasparta />
            <div className="relative z-10">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

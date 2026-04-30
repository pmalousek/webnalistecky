import ContactForm from "./ContactForm";

export default function KontaktSection() {
  return (
    <section id="kontakt" className="bg-soft-bg py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Pojďme si o tom v klidu popovídat.
        </h2>
        <p className="text-lg text-gray-700 max-w-prose mb-8">
          Konzultace zdarma znamená přesně to, co píšu: přijdu, podíváme se na
          byt, řekneme si, co se za něj reálně dá dostat a jakou strategií.
          Pokud Vám mé pojetí nebude sedět, žádný problém – nemusíme nic
          podepsat na první schůzce - a vlastně vůbec. Žádný tlak, žádné „ale
          podepište mi to dnes&rdquo;. Jen rozhovor dvou dospělých lidí, kteří mají
          stejný cíl.
        </p>
        <ContactForm />
        <div className="mt-8 space-y-1 text-gray-700">
          <p>
            Nebo rovnou volejte:{" "}
            <a
              href="tel:+420777759590"
              className="font-medium text-ink hover:underline"
            >
              777&nbsp;759&nbsp;590
            </a>
          </p>
          <p>
            Pište:{" "}
            <a
              href="mailto:info@realitakbrno.cz"
              className="font-medium text-ink hover:underline"
            >
              info@realitakbrno.cz
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

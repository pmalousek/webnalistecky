import ContactForm from "./ContactForm";

export default function KontaktSection() {
  return (
    <section id="kontakt" className="bg-soft-bg py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Když si chcete o prodeji popovídat
        </h2>
        <p className="text-lg text-gray-700 max-w-prose mb-8">
          Žádný tlak. Sednu si s Vámi, podívám se na byt, řekneme si, co by se
          za něj reálně dalo dostat a jak postupovat. Když Vám to nebude sedět,
          nic se neděje – konzultace je zdarma.
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

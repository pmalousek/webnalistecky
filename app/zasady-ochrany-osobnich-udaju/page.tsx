// TODO: Nechte právníka zkontrolovat a doplnit kompletní znění před spuštěním webu.
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Zásady ochrany osobních údajů – Pavel Maloušek",
};

export default function GdprPage() {
  return (
    <main className="py-16 px-4">
      <div className="max-w-prose mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Zásady ochrany osobních údajů
        </h1>

        <div className="space-y-8 text-gray-700">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Správce osobních údajů
            </h2>
            <p>
              Pavel Maloušek, IČO&nbsp;87615614
              <br />
              Kontakt:{" "}
              <a
                href="mailto:info@realitakbrno.cz"
                className="text-ink hover:underline"
              >
                info@realitakbrno.cz
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Jaké údaje sbíráme
            </h2>
            <p>V rámci tohoto webu zpracováváme tyto osobní údaje:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Jméno</li>
              <li>Telefonní číslo</li>
              <li>E-mailová adresa</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Účel zpracování
            </h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Vyřízení Vašeho dotazu a zpětné kontaktování</li>
              <li>Zaslání požadovaného ebooku</li>
              <li>
                Zasílání tipů a článků o prodeji nemovitostí (pouze se Vaším
                výslovným souhlasem)
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Doba uchování
            </h2>
            <p>
              Osobní údaje uchováváme po dobu 3 let od posledního kontaktu.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Vaše práva
            </h2>
            <p>Máte právo na:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Přístup ke svým osobním údajům</li>
              <li>Opravu nepřesných údajů</li>
              <li>Výmaz údajů (za zákonných podmínek)</li>
              <li>Odvolání souhlasu se zpracováním</li>
              <li>
                Podání stížnosti u Úřadu pro ochranu osobních údajů (uoou.cz)
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Kontakt pro výkon práv
            </h2>
            <p>
              Pro uplatnění svých práv nás kontaktujte na:{" "}
              <a
                href="mailto:info@realitakbrno.cz"
                className="text-ink hover:underline"
              >
                info@realitakbrno.cz
              </a>
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-border-line">
          <Link href="/" className="text-ink hover:underline">
            ← Zpět na hlavní stránku
          </Link>
        </div>
      </div>
    </main>
  );
}

import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ebook je na cestě – Pavel Maloušek",
};

export default function EbookOdeslanPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-prose text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Ebook je na cestě!
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Zkontrolujte prosím doručenou poštu (případně složku se spamem).
          Pokud e-mail nepřijde do 5 minut, napište na{" "}
          <a
            href="mailto:info@realitakbrno.cz"
            className="font-medium text-ink hover:underline"
          >
            info@realitakbrno.cz
          </a>
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 border border-brand text-ink font-medium rounded-none min-h-[48px] hover:bg-gray-100 transition-colors"
        >
          ← Zpět na hlavní stránku
        </Link>
      </div>
    </main>
  );
}

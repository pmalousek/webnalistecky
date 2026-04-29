import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Děkujeme – Pavel Maloušek",
};

export default function DekujemePage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-prose text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Děkujeme!</h1>
        <p className="text-lg text-gray-700 mb-8">
          Ozvu se Vám co nejdříve. Pokud nechcete čekat, klidně zavolejte
          rovnou:{" "}
          <a
            href="tel:+420777759590"
            className="font-medium text-ink hover:underline"
          >
            777 759 590
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

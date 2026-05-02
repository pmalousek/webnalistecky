import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-border-line py-8 px-4">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-600 text-sm">
        <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-start">
          <Image
            src="/logo.png"
            alt="Logo Pavel Maloušek"
            width={28}
            height={28}
            className="w-7 h-7 flex-none"
          />
          <div className="flex flex-col leading-tight">
            <span className="font-medium text-ink">Pavel Maloušek</span>
            <p className="text-xs text-gray-400 italic">Reality s úsměvem</p>
          </div>
          <span aria-hidden="true">·</span>
          <a
            href="https://www.realitakbrno.cz"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-ink hover:underline"
          >
            realitakbrno.cz
          </a>
          <span aria-hidden="true">·</span>
          <span>IČ&nbsp;17288576</span>
        </div>
        <a
          href="https://www.realitakbrno.cz/gdpr-zpracovani-osobnich-udaju/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-ink hover:underline"
        >
          Zásady ochrany osobních údajů
        </a>
      </div>
    </footer>
  );
}

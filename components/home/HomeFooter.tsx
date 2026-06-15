import Image from "next/image";

// Dark footer in the /ppc visual language, root content preserved.
export default function HomeFooter() {
  return (
    <footer className="px-4 pt-6 pb-10 border-t border-dark-line">
      <div className="max-w-container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-dark-secondary font-plex-sans text-[13px]">
        <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-start">
          <Image
            src="/logo.png"
            alt="Logo Pavel Maloušek"
            width={28}
            height={28}
            className="w-7 h-7 flex-none"
          />
          <div className="flex flex-col leading-tight">
            <span className="font-medium text-dark-text">Pavel Maloušek</span>
            <span className="text-[12px] italic">Reality s úsměvem</span>
          </div>
          <span aria-hidden="true">·</span>
          <a
            href="https://www.realitakbrno.cz"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-dark-text transition-colors"
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
          className="hover:text-dark-text transition-colors"
        >
          Zásady ochrany osobních údajů
        </a>
      </div>
    </footer>
  );
}

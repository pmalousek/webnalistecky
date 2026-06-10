import Link from "next/link";

export default function PpcFooter() {
  return (
    <footer className="px-4 pt-2 pb-8">
      <div className="max-w-container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-dark-secondary font-plex-sans text-[13px]">
        <div className="flex flex-wrap gap-x-3 gap-y-1 justify-center sm:justify-start">
          <span>Bc. Pavel Maloušek · PMRE s.r.o.</span>
          <span aria-hidden="true">·</span>
          <span>IČ&nbsp;17288576</span>
          <span aria-hidden="true">·</span>
          <a
            href="tel:+420777759590"
            className="hover:text-dark-text transition-colors"
          >
            +420&nbsp;777&nbsp;759&nbsp;590
          </a>
          <span aria-hidden="true">·</span>
          <a
            href="mailto:info@realitakbrno.cz"
            className="hover:text-dark-text transition-colors"
          >
            info@realitakbrno.cz
          </a>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="https://www.realitakbrno.cz"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-dark-text hover:underline transition-colors"
          >
            realitakbrno.cz
          </a>
          <span aria-hidden="true">·</span>
          <Link
            href="/verze"
            className="hover:text-dark-text transition-colors"
          >
            VERZE
          </Link>
        </div>
      </div>
    </footer>
  );
}

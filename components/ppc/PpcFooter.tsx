export default function PpcFooter() {
  return (
    <footer className="bg-white border-t border-border-line py-6 px-4">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-gray-500 text-xs">
        <div className="flex flex-wrap gap-x-3 gap-y-1 justify-center sm:justify-start">
          <span>Bc. Pavel Maloušek · PMRE s.r.o.</span>
          <span>·</span>
          <span>IČ&nbsp;17288576</span>
          <span>·</span>
          <a
            href="tel:+420777759590"
            className="hover:text-ink transition-colors"
          >
            +420&nbsp;777&nbsp;759&nbsp;590
          </a>
          <span>·</span>
          <a
            href="mailto:info@realitakbrno.cz"
            className="hover:text-ink transition-colors"
          >
            info@realitakbrno.cz
          </a>
        </div>
        <a
          href="https://www.realitakbrno.cz"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-ink hover:underline transition-colors"
        >
          realitakbrno.cz
        </a>
      </div>
    </footer>
  );
}

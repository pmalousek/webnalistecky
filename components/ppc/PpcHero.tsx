"use client";

import Image from "next/image";
import { trackPhoneClick } from "./ConversionTracker";
import CallbackForm from "./CallbackForm";

const TEL = "+420777759590";
const TEL_DISPLAY = "777 759 590";

export default function PpcHero() {
  return (
    <section className="bg-white px-4 pt-14 pb-16">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col-reverse md:flex-row gap-10 items-start">
          {/* Text */}
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-5">
              Dostáváte lístečky „Koupím byt na&nbsp;této ulici&rdquo;?
              <br />
              <br />
              Většina těch makléřů žádného kupce nemá.
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-prose">
              17 let v&nbsp;Brně. 700+ prodaných bytů. 27 měst a obcí na&nbsp;jižní
              Moravě. Bc. Pavel Maloušek.
            </p>

            {/* Primary CTA */}
            <a
              href={`tel:${TEL}`}
              onClick={() => trackPhoneClick()}
              className="inline-flex items-center gap-3 px-8 py-4 bg-brand text-white font-bold text-lg rounded-none hover:bg-brand-dark transition-colors min-h-[56px] mb-4"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
              </svg>
              Zavolejte: {TEL_DISPLAY}
            </a>

            {/* Secondary: callback form */}
            <p className="text-sm text-gray-500 mb-3">
              nebo nechte číslo, ozvu se ještě dnes
            </p>
            <CallbackForm />
          </div>

          {/* Photo */}
          {/* TODO: replace with PPC-specific hero photo */}
          <div className="flex-shrink-0 w-[200px] md:w-[240px]">
            <Image
              src="/pavel-foto.jpg"
              alt="Bc. Pavel Maloušek, realitní makléř Brno"
              width={240}
              height={290}
              priority
              className="w-full h-auto object-cover"
            />
            <p className="text-xs text-gray-400 mt-2 text-center">
              Bc. Pavel Maloušek · Brno
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

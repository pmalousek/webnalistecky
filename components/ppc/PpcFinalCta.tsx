"use client";

import { trackPhoneClick } from "./ConversionTracker";
import CallbackForm from "./CallbackForm";

const TEL = "+420777759590";
const TEL_DISPLAY = "777 759 590";

export default function PpcFinalCta() {
  return (
    <section className="bg-brand py-16 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
          První konzultace zdarma a bez závazku.
        </h2>
        <p className="text-brand-mist mb-8 text-lg">
          Přijdu, podívám se na byt, řekneme si reálnou cenu a postup.
          Nic nepodepisujeme na první schůzce.
        </p>
        <a
          href={`tel:${TEL}`}
          onClick={() => trackPhoneClick()}
          className="inline-flex items-center gap-3 px-8 py-4 bg-white text-brand font-bold text-lg rounded-none hover:bg-brand-mist transition-colors min-h-[56px] mb-6"
        >
          Zavolejte: {TEL_DISPLAY}
        </a>
        <p className="text-brand-mist text-sm mb-4">nebo zanechte číslo</p>
        <div className="flex justify-center">
          <CallbackForm />
        </div>
      </div>
    </section>
  );
}

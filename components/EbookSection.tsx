import EbookForm from "./EbookForm";

export default function EbookSection() {
  return (
    <section id="ebook" className="bg-white py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Než podepíšete cokoli s realitkou, přečtěte si tohle.
        </h2>
        <p className="text-lg text-gray-700 max-w-prose mb-8 text-justify">
          6 věcí, které jsem za 17 let v branži viděl zevnitř a které Vám velké
          realitky neřeknou – ne protože by chtěly škodit, ale protože by přišly
          o byznys. Žádná senzace, žádné konspirace. Jen rozdíly, které byste
          měli vědět dřív, než svěříte největší majetek své rodiny někomu, kdo
          se to teprve učí. Pošlu Vám PDF na e-mail.
        </p>
        <EbookForm />
      </div>
    </section>
  );
}

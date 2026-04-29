import EbookForm from "./EbookForm";

export default function EbookSection() {
  return (
    <section id="ebook" className="bg-white py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Než podepíšete cokoli s realitkou, přečtěte si tohle.
        </h2>
        <p className="text-lg text-gray-700 max-w-prose mb-8">
          Sepsal jsem 6 věcí, které jsem za 17 let v branži viděl zevnitř.
          Nejsou to senzace ani útok – jen rozdíly, které byste měli vědět,
          než svěříte největší majetek nezkušenému makléři. Pošlu Vám PDF na
          e-mail.
        </p>
        <EbookForm />
      </div>
    </section>
  );
}

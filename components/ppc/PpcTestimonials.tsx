const testimonials = [
  {
    text: "Moc děkuji za profesionální spolupráci s makléřem Pavlem Malouškem. Była jsem velmi spokojena s koupí bytu na Arménské. Kdykoli bylo třeba, hned poradil, vysvětlil i zařídil. Není to vždy samozřejmé – mám zkušenosti i s jinými makléři. Pavel Maloušek je profesionál na svém místě.",
    name: "Ludmila Pardusová",
    city: "Brno",
  },
  {
    text: "Pan Maloušek je velmi profesionální makléř. Vstřícný, s příjemným vystupováním, pomohl a zařídil vše, co bylo třeba. Doporučuji 11/10. Pokud bych v budoucnu opět řešil něco s nemovitostmi, pravděpodobně se na něj znovu obrátím.",
    name: "Dominik Holub",
    city: "Rosice u Brna",
  },
  {
    text: "Pan Maloušek je opravdu člověk na svém místě. Vždy perfektní domluva, úžasný profesionál, sympatický a vstřícný. Za mě 100 bodů ze 70. :-) Trošku jsme zaškobrtli s původní makléřkou z jiné realitky – ale pan Maloušek všechna negativa nahradil velkými plusy.",
    name: "Věra Kučerová",
    city: "Ivančice",
  },
];

export default function PpcTestimonials() {
  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10">
          Co říkají klienti
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(({ text, name, city }) => (
            <div
              key={name}
              className="bg-soft-bg border border-border-line p-6 flex flex-col"
            >
              <span
                className="text-3xl font-serif leading-none text-brand mb-3 select-none"
                aria-hidden="true"
              >
                &ldquo;
              </span>
              <p className="text-gray-700 text-sm leading-relaxed flex-1">
                {text}
              </p>
              <div className="mt-5 pt-4 border-t border-border-line">
                <p className="font-semibold text-ink text-sm">{name}</p>
                <p className="text-xs text-gray-500">{city}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

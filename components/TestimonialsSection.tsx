const testimonials = [
  {
    text: "Moc děkuji za profesionální spolupráci s makléřem Pavlem Malouškem. Byla jsem velmi spokojena s koupí bytu na Arménské. Kdykoli bylo třeba, hned poradil, vysvětlil i zařídil. Není to vždy samozřejmé – mám zkušenosti i s jinými makléři. Pavel Maloušek je profesionál na svém místě a doporučím ho vždy, kdy bude potřeba.",
    name: "Ludmila Pardusová",
    city: "Brno",
    date: "4. 3. 2026",
  },
  {
    text: "Pan Maloušek je velmi profesionální makléř. Vstřícný, s příjemným vystupováním, pomohl a zařídil vše, co bylo třeba. Doporučuji 11/10. Pokud bych v budoucnu opět řešil něco s nemovitostmi, pravděpodobně se na něj znovu obrátím.",
    name: "Dominik Holub",
    city: "Rosice u Brna",
    date: "13. 1. 2026",
  },
  {
    text: "We are very satisfied with the approach and all services provided by Mr. Pavel Maloušek. Everything was smooth and easy throughout the purchasing process. Very professional – thank you a lot.",
    name: "Makram Saadi",
    city: "Brno",
    date: "28. 10. 2025",
  },
  {
    text: "Pan Maloušek je opravdu člověk na svém místě. Vždy perfektní domluva, úžasný profesionál, sympatický a vstřícný. Za mě 100 bodů ze 70. :-) Trošku jsme zaškobrtli s původní makléřkou z jiné realitky – ale pan Maloušek všechna negativa nahradil velkými plusy. Děkuji za spolupráci.",
    name: "Věra Kučerová",
    city: "Ivančice",
    date: "25. 7. 2025",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-soft-bg py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10">
          Co říkají lidé, kteří prodávali nebo kupovali
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map(({ text, name, city, date }) => (
            <div
              key={name}
              className="bg-white border border-border-line p-7 flex flex-col"
            >
              <span
                className="text-4xl font-serif leading-none text-brand mb-4 select-none"
                aria-hidden="true"
              >
                &ldquo;
              </span>
              <p className="text-gray-700 leading-relaxed flex-1">{text}</p>
              <div className="mt-6 pt-5 border-t border-border-line flex items-end justify-between gap-4">
                <div>
                  <p className="font-semibold text-ink text-sm">{name}</p>
                  <p className="text-xs text-gray-500">{city}</p>
                </div>
                <p className="text-xs text-gray-400 shrink-0">{date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

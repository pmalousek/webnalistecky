const points = [
  {
    n: "1",
    title: "Profesionální příprava k dosažení nejvyšší ceny",
    text: "Připravím byt na focení a prohlídky. Žádná ‚fotka telefonem'.",
  },
  {
    n: "2",
    title: "Profesionální fotografie",
    text: "Spolupracuji s fotografem specializujícím se na nemovitosti. Vizuál rozhoduje ještě před první prohlídkou.",
  },
  {
    n: "3",
    title: "Cenová strategie, ne slevy",
    text: "Správná cena hned na začátku. Přecenění vede ke slevám a ztrátě zájmu — tomu předcházíme.",
  },
  {
    n: "4",
    title: "Osobní zodpovědnost",
    text: "Jednáte se mnou od začátku do konce. Ne s kolegou, ne s asistentkou.",
  },
];

export default function PpcHowDifferent() {
  return (
    <section className="bg-soft-bg py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10">
          Jak to dělám jinak
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {points.map(({ n, title, text }) => (
            <div key={n} className="flex gap-5">
              <span className="text-4xl font-bold text-brand/20 leading-none select-none shrink-0">
                {n}
              </span>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

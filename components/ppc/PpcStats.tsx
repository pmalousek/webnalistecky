"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: "17", label: "let praxe v Brně a okolí" },
  { value: "700+", label: "dokončených prodejů" },
  { value: "27", label: "měst a obcí na jižní Moravě" },
  { value: "35 dní", label: "průměrná doba prodeje" },
];

function useFadeIn(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

export default function PpcStats() {
  return (
    <section className="bg-brand-mist py-14 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map(({ value, label }, i) => (
            <StatCard key={label} value={value} label={label} delay={i * 120} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({
  value,
  label,
  delay,
}: {
  value: string;
  label: string;
  delay: number;
}) {
  const { ref, visible } = useFadeIn(0.15);

  return (
    <div
      ref={ref}
      className="bg-white border border-border-line p-6"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(18px)",
        transition: `opacity 600ms ease ${delay}ms, transform 600ms ease ${delay}ms`,
      }}
    >
      <div className="text-2xl md:text-4xl font-bold text-brand leading-tight">{value}</div>
      <div className="text-sm text-gray-500 mt-2 leading-snug">{label}</div>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

const DIGIT_H = 64; // px — height of one digit slot

const stats = [
  { value: 17, suffix: "", label: "let praxe v realitách" },
  { value: 700, suffix: "+", label: "dokončených prodejů" },
  { value: 27, suffix: "", label: "měst a obcí na jižní Moravě" },
  { value: 1, suffix: "", label: "makléř, který za vše ručí osobně" },
];

function OdometerDigit({
  target,
  triggered,
  delay,
}: {
  target: number;
  triggered: boolean;
  delay: number;
}) {
  return (
    <div className="overflow-hidden" style={{ height: DIGIT_H }}>
      <div
        style={{
          transform: triggered
            ? `translateY(-${target * DIGIT_H}px)`
            : "translateY(0)",
          transition: triggered
            ? `transform 1500ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`
            : "none",
          willChange: "transform",
        }}
      >
        {Array.from({ length: 10 }, (_, d) => (
          <div
            key={d}
            className="flex items-center justify-center font-bold text-brand font-sans"
            style={{ height: DIGIT_H, fontSize: 58, lineHeight: 1 }}
          >
            {d}
          </div>
        ))}
      </div>
    </div>
  );
}

function OdometerNumber({
  value,
  suffix,
  triggered,
}: {
  value: number;
  suffix: string;
  triggered: boolean;
}) {
  const digits = String(value).split("").map(Number);

  return (
    <div className="flex items-end">
      {digits.map((digit, i) => (
        <OdometerDigit
          key={i}
          target={digit}
          triggered={triggered}
          delay={i * 100}
        />
      ))}
      {suffix && (
        <span
          className="font-bold text-brand font-sans mb-1"
          style={{ fontSize: 44, lineHeight: 1 }}
        >
          {suffix}
        </span>
      )}
    </div>
  );
}

export default function CislaSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="cisla" className="bg-brand-mist py-16 px-4" ref={sectionRef}>
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white p-6 md:p-8 border border-border-line"
            >
              <OdometerNumber
                value={stat.value}
                suffix={stat.suffix}
                triggered={triggered}
              />
              <p className="text-sm text-gray-500 mt-3 leading-snug">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

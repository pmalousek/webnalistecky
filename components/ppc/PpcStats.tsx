"use client";

import { useEffect, useRef, useState } from "react";

type Stat = {
  value: string;
  label: string;
  countTo: number | null;
  suffix?: string;
};

const stats: Stat[] = [
  { value: "17", label: "let praxe v Brně a okolí", countTo: 17 },
  { value: "700+", label: "dokončených prodejů", countTo: 700, suffix: "+" },
  { value: "9 z 10", label: "zakázek mám na doporučení", countTo: null },
  { value: "35 dní", label: "průměrná doba prodeje", countTo: 35, suffix: " dní" },
];

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T>(null);
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

function useCountUp(target: number, start: boolean, durationMs = 1200): number {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / durationMs);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, start, durationMs]);
  return val;
}

export default function PpcStats() {
  return (
    <section className="px-4 py-8 md:py-10">
      <div className="max-w-container mx-auto border-t border-l border-dark-line">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <StatCell key={s.label} stat={s} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCell({ stat, delay }: { stat: Stat; delay: number }) {
  const { ref, visible } = useInView<HTMLDivElement>(0.25);
  const reducedMotion = useReducedMotion();
  const animate = stat.countTo !== null && !reducedMotion;
  const counted = useCountUp(stat.countTo ?? 0, visible && animate);

  const display =
    stat.countTo === null ? stat.value : `${counted}${stat.suffix ?? ""}`;

  return (
    <div
      ref={ref}
      className="border-r border-b border-dark-line px-5 py-7 md:px-6 md:py-8 min-h-[140px] md:min-h-[156px] flex flex-col justify-center"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(10px)",
        transition: `opacity 200ms ease ${delay}ms, transform 200ms ease ${delay}ms`,
      }}
    >
      <div className="font-plex-mono text-dark-text text-[clamp(2rem,3.5vw,3.4rem)] leading-none tracking-tight whitespace-nowrap">
        {display}
      </div>
      <div className="font-plex-mono text-dark-secondary uppercase text-[11px] md:text-[12px] tracking-[0.12em] mt-3 leading-tight">
        {stat.label}
      </div>
    </div>
  );
}

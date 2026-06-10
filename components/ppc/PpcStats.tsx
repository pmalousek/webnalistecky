"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "./_anim";

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

// SSR-safe useLayoutEffect: silences React's "useLayoutEffect on the server"
// warning by falling back to useEffect during SSR (where layout effects are
// a no-op anyway).
const useIsoLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

export default function PpcStats() {
  return (
    <section className="px-4 py-8 md:py-10">
      <div className="max-w-container mx-auto">
        <p className="font-plex-mono text-[12px] uppercase tracking-[0.15em] text-dark-secondary mb-3">
          01
        </p>
        <div className="border-t border-l border-dark-line">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((s, i) => (
              <StatCell key={s.label} stat={s} delay={i * 70} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCell({ stat, delay }: { stat: Stat; delay: number }) {
  const { ref, visible } = useInView<HTMLDivElement>();
  const reducedMotion = useReducedMotion();

  // RQ-12: server emits the final numeric value (no "0" in SSR HTML).
  // After hydration we drop to 0 in a layout effect (runs before paint, so
  // the user never sees the final value flash before the count-up starts).
  // Non-animatable cells ("9 z 10") never reset.
  const [val, setVal] = useState<number>(stat.countTo ?? 0);
  const animKickoff = useRef(false);

  useIsoLayoutEffect(() => {
    if (stat.countTo === null || reducedMotion) return;
    setVal(0);
  }, [stat.countTo, reducedMotion]);

  useEffect(() => {
    if (stat.countTo === null || reducedMotion) return;
    if (!visible || animKickoff.current) return;
    animKickoff.current = true;

    const target = stat.countTo;
    const duration = 800;
    let raf = 0;
    const t0 = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [visible, reducedMotion, stat.countTo]);

  const display =
    stat.countTo === null ? stat.value : `${val}${stat.suffix ?? ""}`;

  // Reserve horizontal room for the final string length so a count-up from
  // "0" → "17" doesn't shift the label or the cell underneath.
  const reservedCh = stat.value.length;

  return (
    <div
      ref={ref}
      className="border-r border-b border-dark-line px-5 py-7 md:px-6 md:py-8 min-h-[140px] md:min-h-[156px] flex flex-col justify-center"
      style={{
        opacity: visible || reducedMotion ? 1 : 0.25,
        transform:
          visible || reducedMotion ? "translateY(0)" : "translateY(10px)",
        transition: reducedMotion
          ? "none"
          : `opacity 200ms ease-out ${delay}ms, transform 200ms ease-out ${delay}ms`,
      }}
    >
      <div
        className="font-plex-mono text-dark-text text-[clamp(2rem,3.5vw,3.4rem)] leading-none tracking-tight whitespace-nowrap nums-tabular"
        style={{ minWidth: `${reservedCh}ch` }}
      >
        {display}
      </div>
      <div className="font-plex-mono text-dark-secondary uppercase text-[11px] md:text-[12px] tracking-[0.12em] mt-3 leading-tight">
        {stat.label}
      </div>
    </div>
  );
}

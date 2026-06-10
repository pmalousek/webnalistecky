"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

export function useReducedMotion(): boolean {
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

// IntersectionObserver-based "is visible" detector.
//
// RQ-12 tuning:
// - Lower threshold + negative bottom rootMargin: a card starts animating as
//   soon as it enters the viewport, not when it's fully in. Prevents the
//   "all cards are still grey after scroll stops" symptom.
// - 1.5 s safety fallback: on a fast scroll the observer can miss a card
//   entirely (it never crosses the threshold while in the viewport), so we
//   force-visible at 1.5 s.
export function useInView<T extends HTMLElement>(
  threshold = 0.1,
  rootMargin = "0px 0px -10% 0px",
  fallbackMs = 1500
) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fallback = window.setTimeout(() => setVisible(true), fallbackMs);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.clearTimeout(fallback);
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(el);

    return () => {
      window.clearTimeout(fallback);
      observer.disconnect();
    };
  }, [threshold, rootMargin, fallbackMs]);
  return { ref, visible };
}

// Stagger appearance: opacity 0.25→1, translateY 10px→0, 200 ms, fires once.
// Initial opacity 0.25 (not 0): a card never goes fully black-hole even
// before the fade has fired, so a rapid scroll never reveals a void.
// Respects prefers-reduced-motion (returns fully-visible state with no
// transition).
export function useStaggerFade<T extends HTMLElement>(
  index = 0,
  staggerMs = 70
): { ref: React.RefObject<T | null>; style: CSSProperties } {
  const { ref, visible } = useInView<T>();
  const reduced = useReducedMotion();
  const animated = reduced ? true : visible;
  const delay = reduced ? 0 : index * staggerMs;

  return {
    ref,
    style: {
      opacity: animated ? 1 : 0.25,
      transform: animated ? "translateY(0)" : "translateY(10px)",
      transition: reduced
        ? "none"
        : `opacity 200ms ease-out ${delay}ms, transform 200ms ease-out ${delay}ms`,
    },
  };
}

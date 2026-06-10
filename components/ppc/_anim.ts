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

export function useInView<T extends HTMLElement>(threshold = 0.2) {
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

// Stagger appearance: opacity 0→1, translateY 10px→0, 200ms, fires once,
// with `index * 60ms` delay. Respects prefers-reduced-motion (returns
// fully-visible style immediately).
export function useStaggerFade<T extends HTMLElement>(
  index = 0,
  staggerMs = 60
): { ref: React.RefObject<T | null>; style: CSSProperties } {
  const { ref, visible } = useInView<T>(0.2);
  const reduced = useReducedMotion();
  const delay = reduced ? 0 : index * staggerMs;
  const animated = reduced ? true : visible;
  return {
    ref,
    style: {
      opacity: animated ? 1 : 0,
      transform: animated ? "translateY(0)" : "translateY(10px)",
      transition: reduced
        ? "none"
        : `opacity 200ms ease ${delay}ms, transform 200ms ease ${delay}ms`,
    },
  };
}

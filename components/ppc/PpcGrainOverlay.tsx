// Warm paper grain over the dark PPC surface.
// Absolute-positioned (not fixed) so it sits *under* the cards rather than
// veiling them. Higher opacity than iter 1 — visible on a 27" display but
// still well below any text.
export default function PpcGrainOverlay() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-[0.08]"
      aria-hidden="true"
      style={{ mixBlendMode: "overlay" }}
    >
      <filter id="ppc-grain-bg">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.85"
          numOctaves="2"
          stitchTiles="stitch"
        />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.96
                  0 0 0 0 0.9
                  0 0 0 0 0.78
                  0 0 0 1 0"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#ppc-grain-bg)" />
    </svg>
  );
}

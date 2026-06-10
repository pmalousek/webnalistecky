// Dark-toned fine grain rendered on top of paper cards. Sits inside each
// paper surface, never extends past the card edge.
export default function PaperGrain() {
  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.045]"
      style={{ mixBlendMode: "multiply" }}
    >
      <filter id="paper-card-grain">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="1.3"
          numOctaves="2"
          stitchTiles="stitch"
        />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.11
                  0 0 0 0 0.1
                  0 0 0 0 0.085
                  0 0 0 1 0"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#paper-card-grain)" />
    </svg>
  );
}

// Inner ink line at 10px inset — the "pasparta" detail repeated from the photo.
// Renders as a span so it can sit alongside grain inside any paper card.
export function PaperPasparta() {
  return (
    <span
      aria-hidden="true"
      className="absolute inset-[10px] border border-paper-ink/45 pointer-events-none"
    />
  );
}

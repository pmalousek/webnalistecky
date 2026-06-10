type Props = { size?: number };

export default function Razitko({ size = 140 }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 140 140"
      style={{ transform: "rotate(-8deg)" }}
      role="img"
      aria-label="Razítko PMRE Brno, 17 let praxe"
    >
      <defs>
        <path
          id="razitko-circle-path"
          d="M 70 70 m -52 0 a 52 52 0 1 1 104 0 a 52 52 0 1 1 -104 0"
        />
      </defs>
      <circle
        cx="70"
        cy="70"
        r="62"
        stroke="#C2362A"
        strokeWidth="2.5"
        fill="none"
      />
      <circle
        cx="70"
        cy="70"
        r="48"
        stroke="#C2362A"
        strokeWidth="1.2"
        fill="none"
      />
      <text
        fill="#C2362A"
        fontSize="9"
        fontWeight="500"
        letterSpacing="3.2"
        fontFamily="var(--font-plex-mono), ui-monospace, monospace"
      >
        <textPath href="#razitko-circle-path" startOffset="0">
          PMRE · BRNO · 17 LET PRAXE · PMRE · BRNO · 17 LET PRAXE ·
        </textPath>
      </text>
      <text
        x="70"
        y="68"
        textAnchor="middle"
        fill="#C2362A"
        fontSize="10"
        fontWeight="500"
        letterSpacing="2.5"
        fontFamily="var(--font-plex-mono), ui-monospace, monospace"
      >
        PMRE
      </text>
      <text
        x="70"
        y="82"
        textAnchor="middle"
        fill="#C2362A"
        fontSize="8"
        letterSpacing="1.5"
        fontFamily="var(--font-plex-mono), ui-monospace, monospace"
      >
        BRNO
      </text>
    </svg>
  );
}

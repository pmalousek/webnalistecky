import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#515F6C",
          dark: "#404B57",
          mist: "#D6DADE",
        },
        ink: "#0A0A0A",
        "soft-bg": "#F5F5F5",
        "border-line": "#E6E6E6",
        // PPC offer rebuild — "dokument na tmavém stole" design tokens
        "dark-bg": "#14120F",
        "dark-text": "#EFE8DA",
        "dark-secondary": "#A89F8F",
        "dark-line": "#3A352C",
        paper: "#F1EBDE",
        "paper-ink": "#1C1A16",
        "paper-secondary": "#5C564C",
        "paper-line": "#1C1A16",
        "stamp-paper": "#A6271C",
        "stamp-dark": "#C2362A",
      },
      fontFamily: {
        sans: ["var(--font-montserrat)", "system-ui", "sans-serif"],
        "plex-serif": ["var(--font-plex-serif)", "Georgia", "serif"],
        "plex-sans": ["var(--font-plex-sans)", "system-ui", "sans-serif"],
        "plex-mono": ["var(--font-plex-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        paper: "4px 4px 0 rgba(0, 0, 0, 0.55)",
      },
      maxWidth: {
        prose: "38rem",
        card: "52rem",
        container: "1140px",
      },
    },
  },
  plugins: [],
};
export default config;

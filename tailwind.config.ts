import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0A0E17",
        panel: "#111726",
        panelLight: "#161D2F",
        line: "#232C42",
        paper: "#EDEFF4",
        muted: "#8C93A8",
        mutedDark: "#5B6478",
        gold: "#D8A945",
        goldDim: "#8C7433",
        teal: "#3FD8C4",
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-plex-sans)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
      backgroundImage: {
        grid:
          "linear-gradient(to right, rgba(35,44,66,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(35,44,66,0.5) 1px, transparent 1px)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      animation: {
        marquee: "marquee 38s linear infinite",
        blink: "blink 1.1s step-end infinite",
      },
    },
  },
  plugins: [],
};
export default config;

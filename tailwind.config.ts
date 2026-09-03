import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
      },
    },
    extend: {
      colors: {
        page: "var(--ivory)",
        surface: "var(--cream)",
        muted: "var(--soft-sage)",
        accent: "var(--sage)",
        "accent-warm": "var(--tan)",
        ink: "var(--ink)",
        rule: "var(--rule)",
        card: "#FFFFFF",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": [
          "clamp(2.75rem, 5.2vw, 4.5rem)",
          { lineHeight: "1.05", letterSpacing: "-0.015em", fontWeight: "500" },
        ],
        "display-lg": [
          "clamp(2.25rem, 4vw, 3.5rem)",
          { lineHeight: "1.08", letterSpacing: "-0.012em", fontWeight: "500" },
        ],
        "display-md": [
          "clamp(1.75rem, 2.8vw, 2.5rem)",
          { lineHeight: "1.15", letterSpacing: "-0.008em", fontWeight: "500" },
        ],
        "h-lg": ["1.375rem", { lineHeight: "1.3", fontWeight: "500" }],
        "h-md": ["1.125rem", { lineHeight: "1.35", fontWeight: "500" }],
        body: ["0.9375rem", { lineHeight: "1.65" }],
        "body-lg": ["1rem", { lineHeight: "1.7" }],
        label: [
          "0.75rem",
          { lineHeight: "1", letterSpacing: "0.14em", fontWeight: "500" },
        ],
        caption: ["0.75rem", { lineHeight: "1.35" }],
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        DEFAULT: "var(--radius-md)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
      },
      boxShadow: {
        1: "var(--shadow-1)",
        2: "var(--shadow-2)",
      },
      spacing: {
        section: "clamp(4rem, 8vw, 8rem)",
        block: "clamp(2rem, 4vw, 3.5rem)",
      },
      maxWidth: {
        prose: "62ch",
        editorial: "72ch",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.2, 0.7, 0.2, 1)",
      },
    },
  },
  plugins: [],
};

export default config;

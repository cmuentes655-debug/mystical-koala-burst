import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', "Inter", "system-ui", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        komite: {
          deep: "#00211D",
          base: "#003D35",
          mid: "#014A3F",
          turquoise: "#00B398",
          glow: "#5FE3CC",
          accent: "#FC4C02",
          ink: "#F2FBF9",
          soft: "#DCDDDB",
          faint: "#51534A",
        },
        // Tokens de la página de Recursos: se resuelven contra el marco
        // ([data-resource-palette="a"]) definido en globals.css.
        // `page/heading/body/muted/surface/field*` viven en el lienzo;
        // `card*` y `cover-*` viven dentro de la card.
        resource: {
          page: "var(--res-page)",
          heading: "var(--res-heading)",
          body: "var(--res-body)",
          muted: "var(--res-muted)",
          surface: "var(--res-surface)",
          "surface-2": "var(--res-surface-2)",
          border: "var(--res-border)",
          field: "var(--res-field)",
          "field-border": "var(--res-field-border)",
          "field-text": "var(--res-field-text)",
          card: "var(--res-card)",
          "card-text": "var(--res-card-text)",
          "card-muted": "var(--res-card-muted)",
          "card-border": "var(--res-card-border)",
          "cover-bg": "var(--res-cover-bg)",
          "cover-fg": "var(--res-cover-fg)",
          tag: "var(--res-tag)",
          "tag-fg": "var(--res-tag-fg)",
          accent: "var(--res-accent)",
          action: "var(--res-action)",
          "action-fg": "var(--res-action-fg)",
          chip: "var(--res-chip)",
          "chip-fg": "var(--res-chip-fg)",
          public: "var(--res-public)",
          member: "var(--res-member)",
          focus: "var(--res-focus)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "soft-pulse": {
          "0%, 100%": { opacity: "0.35", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(1.06)" },
        },
        "slow-drift": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "soft-pulse": "soft-pulse 6s ease-in-out infinite",
        "slow-drift": "slow-drift 9s ease-in-out infinite",
        marquee: "marquee 40s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

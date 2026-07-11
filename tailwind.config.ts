import type { Config } from "tailwindcss";

/**
 * TravelX Design System — Tailwind configuration.
 *
 * Colors are wired to CSS variables (see app/globals.css) so that light/dark
 * themes swap cleanly. Brand tokens (primary/secondary/accent) are also exposed
 * as fixed HEX scales for marketing surfaces that should not invert with theme.
 */
const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./features/**/*.{ts,tsx}",
  ],
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
        "2xl": "1360px",
      },
    },
    extend: {
      colors: {
        // Theme-aware semantic tokens (HSL via CSS vars)
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          50: "#eef5fb",
          100: "#d6e6f4",
          200: "#adcde9",
          300: "#7fb0dc",
          400: "#4c8ecb",
          500: "#2b72b3",
          600: "#0F4C81", // brand primary
          700: "#0c3e6a",
          800: "#0a3355",
          900: "#082943",
          950: "#05192a",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          50: "#effcf9",
          100: "#c8f6ec",
          200: "#93ebdb",
          300: "#57dac5",
          400: "#2bc1ad",
          500: "#14B8A6", // brand secondary (teal)
          600: "#0d9488",
          700: "#0f766e",
          800: "#115e59",
          900: "#134e4a",
          950: "#042f2c",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          50: "#fff9eb",
          100: "#ffefc6",
          200: "#ffdd88",
          300: "#ffc44a",
          400: "#ffab20",
          500: "#F59E0B", // brand accent (amber)
          600: "#d97706",
          700: "#b45309",
          800: "#923c0e",
          900: "#78320f",
          950: "#451a03",
        },
        success: {
          DEFAULT: "#22C55E",
          foreground: "#052e16",
        },
        danger: {
          DEFAULT: "#EF4444",
          foreground: "#450a0a",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
      },
      fontFamily: {
        heading: ["var(--font-poppins)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 4px)",
        sm: "calc(var(--radius) - 8px)",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
        "4xl": "2.25rem",
      },
      boxShadow: {
        soft: "0 2px 8px -2px rgb(15 23 42 / 0.08), 0 4px 24px -4px rgb(15 23 42 / 0.06)",
        card: "0 1px 2px rgb(15 23 42 / 0.04), 0 8px 30px -12px rgb(15 23 42 / 0.12)",
        "card-hover": "0 12px 40px -12px rgb(15 76 129 / 0.28)",
        glow: "0 0 0 1px rgb(255 255 255 / 0.06), 0 20px 50px -20px rgb(15 76 129 / 0.45)",
        "inner-soft": "inset 0 1px 0 0 rgb(255 255 255 / 0.06)",
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(135deg, #0F4C81 0%, #0d9488 55%, #14B8A6 100%)",
        "accent-gradient": "linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)",
        "glass-gradient":
          "linear-gradient(135deg, rgb(255 255 255 / 0.14), rgb(255 255 255 / 0.04))",
        "sheen":
          "linear-gradient(110deg, transparent 30%, rgb(255 255 255 / 0.35) 50%, transparent 70%)",
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
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "gradient-pan": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.7" },
          "70%, 100%": { transform: "scale(1.6)", opacity: "0" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in-up": "fade-in-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2s infinite",
        "gradient-pan": "gradient-pan 8s ease infinite",
        "pulse-ring": "pulse-ring 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        marquee: "marquee 28s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;

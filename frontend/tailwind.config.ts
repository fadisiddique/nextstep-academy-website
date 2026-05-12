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
        maroon: {
          50:  "#fdf2f4",
          100: "#fce7ea",
          200: "#f8d0d7",
          300: "#f2aab6",
          400: "#e97b8e",
          500: "#dc4f67",
          600: "#c93050",
          700: "#a92040",
          800: "#6B1A2A",
          900: "#4A1019",
          950: "#2d0810",
        },
        gold: {
          50:  "#fdf9ec",
          100: "#faf0cb",
          200: "#f5de92",
          300: "#f0c959",
          400: "#eab530",
          500: "#C9973A",
          600: "#b07a1e",
          700: "#8c5d1c",
          800: "#74491e",
          900: "#633d1d",
        },
        peach: {
          400: "#f0a080",
          500: "#E8936A",
          600: "#d4714a",
        },
        cream: {
          50:  "#FDFBF7",
          100: "#FAF7F2",
          200: "#F5EFE6",
          300: "#EDE4D8",
        },
        charcoal: {
          800: "#2C2C2E",
          900: "#1C1C1E",
          950: "#0F0F10",
        },
      },
      fontFamily: {
        outfit: ["var(--font-outfit)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      fontSize: {
        "display": ["4rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "h1": ["3.5rem", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "h2": ["2.5rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "h3": ["1.75rem", { lineHeight: "1.3" }],
        "h4": ["1.25rem", { lineHeight: "1.4" }],
        "body-lg": ["1.125rem", { lineHeight: "1.7" }],
        "body": ["1rem", { lineHeight: "1.6" }],
        "small": ["0.875rem", { lineHeight: "1.5" }],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
      },
      borderRadius: {
        "sm": "6px",
        "md": "12px",
        "lg": "20px",
        "xl": "28px",
        "2xl": "40px",
      },
      boxShadow: {
        "sm": "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        "md": "0 4px 16px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.04)",
        "lg": "0 12px 40px rgba(0,0,0,0.10), 0 4px 12px rgba(0,0,0,0.06)",
        "xl": "0 24px 64px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.06)",
        "maroon": "0 8px 32px rgba(107,26,42,0.25)",
        "gold": "0 4px 16px rgba(201,151,58,0.30)",
        "card": "0 2px 8px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)",
        "card-hover": "0 12px 32px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.06)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        "fade-in": "fadeIn 0.4s ease forwards",
        "slide-in-right": "slideInRight 0.5s ease forwards",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "pulse-slow": "pulse 4s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideInRight: {
          from: { opacity: "0", transform: "translateX(24px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          from: { backgroundPosition: "-200% 0" },
          to: { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
export default config;

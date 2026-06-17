/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Pretendard",
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          "sans-serif",
        ],
        display: [
          "Space Grotesk",
          "Pretendard",
          "sans-serif",
        ],
        mono: ["JetBrains Mono", "Fira Code", "Consolas", "monospace"],
      },
      colors: {
        accent: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: "none",
            color: theme("colors.gray.700"),
            a: {
              color: theme("colors.accent.600"),
              "&:hover": { color: theme("colors.accent.800") },
            },
            code: {
              color: theme("colors.accent.700"),
              backgroundColor: theme("colors.gray.100"),
              borderRadius: theme("borderRadius.sm"),
              padding: "0.125rem 0.375rem",
            },
            "code::before": { content: "none" },
            "code::after": { content: "none" },
          },
        },
        invert: {
          css: {
            color: theme("colors.gray.300"),
            a: {
              color: theme("colors.accent.400"),
              "&:hover": { color: theme("colors.accent.300") },
            },
            code: {
              color: theme("colors.accent.300"),
              backgroundColor: theme("colors.gray.800"),
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

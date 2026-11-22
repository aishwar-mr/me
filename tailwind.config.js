/** @type {import('tailwindcss').Config} */
// Colours as channel triplets, not hex, so `bg-paper`, `text-ink/70` and the
// rest resolve against the :root variables defined in src/index.css.
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        paper: "rgb(var(--paper-rgb) / <alpha-value>)",
        // Greys that flip with the theme (see :root in src/index.css).
        muted: "rgb(var(--muted-rgb) / <alpha-value>)",
        soft: "rgb(var(--soft-rgb) / <alpha-value>)",
        faint: "rgb(var(--faint-rgb) / <alpha-value>)",
        chip: "rgb(var(--chip-rgb) / <alpha-value>)",
        ink: "rgb(var(--ink-rgb) / <alpha-value>)",
        line: "rgb(var(--line-rgb) / <alpha-value>)",
        vermilion: "rgb(var(--vermilion-rgb) / <alpha-value>)",
        // Darker variant for small text on the light ground: plain vermilion
        // is under the 4.5:1 normal-text minimum there.
        "vermilion-text": "rgb(var(--vermilion-text-rgb) / <alpha-value>)",
      },
      // Display sizes scale with the viewport: --u is one design pixel of the
      // 1440px-wide layout (see src/index.css). The floor keeps small ones legible.
      fontSize: Object.fromEntries(
        [30, 32, 36, 40, 44, 72, 80, 88, 112, 128, 150, 170, 220, 250].map((n) => [
          `u${n}`,
          `max(${Math.round(n * 0.6)}px, calc(var(--u) * ${n}))`,
        ])
      ),
      fontFamily: {
        display: ['"Instrument Serif"', "serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
    },
  },
  plugins: [],
};

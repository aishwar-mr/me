/** @type {import('tailwindcss').Config} */
// Colours as channel triplets, not hex, so `bg-paper`, `text-ink/70` and the
// rest resolve against the :root variables defined in src/index.css.
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        paper: "rgb(var(--paper-rgb) / <alpha-value>)",
        ink: "rgb(var(--ink-rgb) / <alpha-value>)",
        line: "rgb(var(--line-rgb) / <alpha-value>)",
        vermilion: "rgb(var(--vermilion-rgb) / <alpha-value>)",
        // Darker variant for small text on the light ground: plain vermilion
        // is under the 4.5:1 normal-text minimum there.
        "vermilion-text": "rgb(var(--vermilion-text-rgb) / <alpha-value>)",
      },
      fontFamily: {
        display: ['"Instrument Serif"', "serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
    },
  },
  plugins: [],
};

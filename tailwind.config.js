/** @type {import('tailwindcss').Config} */
// Recreated config: the original project's tailwind.config wasn't in the source
// map, and its custom colours never made it into the compiled CSS, so classes
// like text-ink / text-vermilion rendered unstyled on the live preview.
// Values come from the :root variables in src/index.css.
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  corePlugins: { preflight: false }, // base styles already live in index.css
  theme: {
    extend: {
      // Channel triplets rather than hex, so `bg-paper`, `text-ink/70` and the
      // rest follow the theme: index.css redefines the same variables under
      // [data-theme="dark"], and every utility re-resolves without a dark:
      // variant on each class.
      colors: {
        paper: "rgb(var(--paper-rgb) / <alpha-value>)",
        ink: "rgb(var(--ink-rgb) / <alpha-value>)",
        vermilion: "rgb(var(--vermilion-rgb) / <alpha-value>)",
        // Darker variant for small text on the light ground: plain vermilion
        // is under the 4.5:1 normal-text minimum there.
        "vermilion-text": "rgb(var(--vermilion-text-rgb) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};

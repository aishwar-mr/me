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
      colors: {
        paper: "#f4f0ea",
        ink: "#0a0a0a",
        vermilion: "#d94a38",
        // Darker variant for small text on paper: the original vermilion
        // is 3.7:1 against #f4f0ea, under the 4.5:1 normal-text minimum.
        "vermilion-text": "#b83323",
      },
    },
  },
  plugins: [],
};

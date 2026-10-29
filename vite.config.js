import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The original app was Create React App (craco) with an "@" -> src alias and
// JSX inside .js files; both are reproduced here.
//
// `base` matches this repo's GitHub Pages path (served at
// https://<user>.github.io/me/); src/index.js's BrowserRouter basename
// matches it too, so built asset URLs and client-side routes both resolve
// under /me/. Override via VITE_BASE for a root-path deploy elsewhere.
export default defineConfig({
  base: process.env.VITE_BASE ?? "/me/",
  plugins: [react({ include: /\.(js|jsx)$/ })],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  esbuild: { loader: "jsx", include: /src\/.*\.jsx?$/, exclude: [] },
  optimizeDeps: { esbuildOptions: { loader: { ".js": "jsx" } } },
});

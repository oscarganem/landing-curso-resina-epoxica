import path from "node:path";
import { defineConfig, mergeConfig } from "vite";
import baseConfig from "./vite.config";

const outDir = path.resolve(import.meta.dirname, "sites/merida/dist");

export default mergeConfig(baseConfig, defineConfig({
  build: { outDir },
  plugins: [{
    name: "sites-merida-only",
    transformIndexHtml: {
      order: "pre",
      // Reuse the existing HTML, including its exact Meta Pixel installation.
      handler: (html) => html.replace('src="/src/main.tsx"', 'src="/src/sites-merida.tsx"'),
    },
  }],
}));

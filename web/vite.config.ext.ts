/// <reference types="vitest" />
/// <reference types="vite/client" />

import { resolve } from "path";

import yaml from "@rollup/plugin-yaml";
import react from "@vitejs/plugin-react";
import externalGlobals from "rollup-plugin-external-globals";
// import visualizer from "rollup-plugin-visualizer";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  envPrefix: "REEARTH_",
  plugins: [
    react({
      jsxRuntime: "classic",
    }),
    yaml(),
    // visualizer(),
  ],
  resolve: {
    alias: [{ find: "@", replacement: resolve(__dirname, "src") }],
  },
  build: {
    emptyOutDir: false,
    lib: {
      entry: "src/extension.ts",
      fileName: () => "reearth-marketplace-ext.js",
      name: "ReearthMarketplaceExt",
      formats: ["es"],
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
      plugins: [
        externalGlobals({
          react: "React",
          "react-dom": "ReactDOM",
        }),
      ],
    },
  },
});

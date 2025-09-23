import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // optimizeDeps: {
  //   exclude: ["localstorage-viewer-toolbar"],
  // },
  resolve: {
    alias: {
      "@localstorage/viewer-toolbar": path.resolve(
        __dirname,
        "../localstorage-viewer-toolbar/src"
      ),
    },
  },
});

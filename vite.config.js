import { defineConfig } from "vite";

export default defineConfig({
  // Relative asset paths work on GitHub project pages and on the custom domain.
  base: "./",
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
    cssMinify: true,
  },
});

// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "lib",
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: [
        "src/index.ts",
        "src/BinaryHeap.ts",
        "src/PairingHeap.ts",
        "src/SkewHeap.ts",
      ].map((filepath) => resolve(__dirname, filepath)),
      formats: ["es", "cjs"],
    },
    sourcemap: true,
    rollupOptions: {
      output: {
        exports: "named",
      },
    },
  },
  test: {
    include: ["src/**/*.test.*", "src/__tests__/**/*"],
  },
});

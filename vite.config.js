// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "lib",
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, "src/index.ts"),
      name: "PriorityQueue",
      // the proper extensions will be added
      fileName: "priorityqueue",
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

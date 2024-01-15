/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import pkg from "./package.json" with { type: "json" };

export default defineConfig({
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: ["./__tests__/setup.ts"],
  },
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  },
  plugins: [react(), TanStackRouterVite()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

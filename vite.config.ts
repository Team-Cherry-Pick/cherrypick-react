import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { vitePluginErrorOverlay } from "@hiogawa/vite-plugin-error-overlay";
import path from "path";

export default defineConfig({
  plugins: [react(), vitePluginErrorOverlay()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from 'vite-plugin-svgr';
import { vitePluginErrorOverlay } from "@hiogawa/vite-plugin-error-overlay";
import path from "path";

export default defineConfig({
    plugins: [
        react(),
        vitePluginErrorOverlay(),
        svgr(),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
    },
});

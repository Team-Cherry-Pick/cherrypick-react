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
    server: {
        port: 3000,
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
    },
});

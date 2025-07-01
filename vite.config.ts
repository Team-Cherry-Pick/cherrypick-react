import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { vitePluginErrorOverlay } from '@hiogawa/vite-plugin-error-overlay';
import path from 'path';

export default defineConfig({
    plugins: [react(), vitePluginErrorOverlay(), svgr()],
    server: {
        port: 3000,
        proxy: {
            '/api': {
                target: 'https://api.repik.kr',
                changeOrigin: true,
            },
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
});

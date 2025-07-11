import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { vitePluginErrorOverlay } from '@hiogawa/vite-plugin-error-overlay';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import path from 'path';

export default defineConfig({
    plugins: [
        react(),
        viteStaticCopy({
            targets: [
                {
                    src: path.resolve(__dirname, 'src/assets/*'),
                    dest: 'assets'
                }
            ]
        }),
        vitePluginErrorOverlay(), svgr()],
    server: {
        port: 3000,
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    define: {
        __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    },
});

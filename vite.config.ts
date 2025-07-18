import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';
import AutoImport from 'unplugin-auto-import/vite';

const host = process.env.TAURI_DEV_HOST;
const port = parseInt(process.env.TAURI_DEV_PORT || '1420', 10);
const hmrPort = parseInt(process.env.TAURI_DEV_HMR_PORT || '1421', 10);
const proxyUrl = process.env.VITE_PROXY_URL || 'http://localhost:3000';

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [
    react(),
    tailwindcss(),
    AutoImport({
      imports: [
        'react',
        // 可按需添加其他库，如'react-router-dom', 'zustand'等
      ],
      dts: 'src/auto-imports.d.ts',
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: port,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
          protocol: 'ws',
          host,
          port: hmrPort,
        }
      : undefined,
    watch: {
      // 3. tell vite to ignore watching `src-tauri`
      ignored: ['**/src-tauri/**'],
    },
    proxy: {
      '/api': {
        target: proxyUrl,
        changeOrigin: true,
        secure: true,
      },
    },
  },
}));

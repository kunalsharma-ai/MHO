import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Deploying under a sub-path? set VITE_BASE=/healthcare-professionals/ before `npm run build`.
export default defineConfig({
  base: process.env.VITE_BASE || '/',
  plugins: [react()],
  build: {
    target: ['es2020', 'chrome90', 'safari15', 'firefox90'],
    cssCodeSplit: true,
    assetsInlineLimit: 0,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: { react: ['react', 'react-dom'] },
      },
    },
  },
  server: { port: 5173 },
});

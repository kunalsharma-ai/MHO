import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const jsxRuntime = (file) => fileURLToPath(new URL(`./src/jsx/${file}`, import.meta.url));

export default defineConfig({
  // "mho-jsx" = React's JSX runtime plus style-prop → CSS class (src/jsx/atomic.js), so pages ship
  // without inline style attributes.
  plugins: [react({ jsxImportSource: 'mho-jsx' })],

  resolve: {
    alias: [
      { find: /^mho-jsx\/jsx-runtime$/, replacement: jsxRuntime('jsx-runtime.js') },
      { find: /^mho-jsx\/jsx-dev-runtime$/, replacement: jsxRuntime('jsx-dev-runtime.js') },
    ],
  },

  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
  },

  build: {
    target: 'es2019',
    cssCodeSplit: true,
    sourcemap: false,
    chunkSizeWarningLimit: 700,
  },

  ssr: {
    noExternal: ['react-router-dom', 'react-router'],
  },
});

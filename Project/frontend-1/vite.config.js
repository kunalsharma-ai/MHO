import { fileURLToPath } from 'node:url';
import { readdirSync, readFileSync } from 'node:fs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { singleFileBuildOptions } from './vite/build.js';
import { singleFilePreview } from './vite/plugins/single-file-preview.js';

const jsxRuntime = (file) => fileURLToPath(new URL(`./src/jsx/${file}`, import.meta.url));
const root = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig(({ mode }) => {
  // `vite build --mode singlefile` (npm run build:preview-html): one self-contained review file in preview/,
  // hash routing and simulated forms. Never deployed.
  const single = mode === 'singlefile';
  if (single) {
    process.env.VITE_ROUTER_MODE = 'hash';
    process.env.VITE_PREVIEW_FORMS = 'true';
  }
  // Country flags live in public/flags/<iso2>.webp. The single-file preview has no public folder, so there the
  // flags are embedded as data URIs (about 280 KB) and work offline; normal builds load the small files.
  const flagDir = fileURLToPath(new URL('./public/flags/', import.meta.url));
  const flagData = single
    ? Object.fromEntries(readdirSync(flagDir).filter((f) => f.endsWith('.webp')).map((f) => [f.slice(0, -5), `data:image/webp;base64,${readFileSync(flagDir + f).toString('base64')}`]))
    : null;
  return {
    define: { __FLAG_DATA__: JSON.stringify(flagData) },
    // "mho-jsx" = React's JSX runtime plus style-prop → CSS class (src/jsx/atomic.js), so pages ship
    // without inline style attributes.
    plugins: [react({ jsxImportSource: 'mho-jsx' }), ...(single ? [viteSingleFile(), singleFilePreview(root)] : [])],

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

    build: single
      ? { ...singleFileBuildOptions(), assetsInlineLimit: 100000000, cssCodeSplit: false }
      : {
          target: 'es2019',
          cssCodeSplit: true,
          sourcemap: false,
          chunkSizeWarningLimit: 700,
        },

    ssr: {
      noExternal: ['react-router-dom', 'react-router'],
    },
  };
});

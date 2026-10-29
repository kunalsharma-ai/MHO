// Generates branded SVG QR codes for each social profile into public/images/qr/.
// Usage: npm run qr   (re-run whenever a social URL changes in src/data/site.js)
import QRCode from 'qrcode';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const outDir = path.join(root, 'public/images/qr');
await mkdir(outDir, { recursive: true });

// Read URLs from site.js without importing Vite-only code
const site = await readFile(path.join(root, 'src/data/site.js'), 'utf8');
const socials = [...site.matchAll(/id: '(\w+)', name: '[^']+', handle: '[^']+', url: '([^']+)'/g)].map((m) => ({ id: m[1], url: m[2] }));

for (const s of socials) {
  const svg = await QRCode.toString(s.url, {
    type: 'svg',
    errorCorrectionLevel: 'M',
    margin: 1,
    color: { dark: '#0B1E5B', light: '#FFFFFF' },
  });
  await writeFile(path.join(outDir, `${s.id}.svg`), svg);
  console.log('QR', s.id, '→', s.url);
}

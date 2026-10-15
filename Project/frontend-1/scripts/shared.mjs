// Shared build helpers: .env loading, public env exposure, esbuild options.
// Only variables prefixed with PUBLIC_ are exposed to the browser bundle.
// Anything in a frontend bundle is public — never put secrets in PUBLIC_* variables.
import fs from 'node:fs';
import path from 'node:path';

export const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');

function parseEnvFile(file) {
  const out = {};
  if (!fs.existsSync(file)) return out;
  for (const raw of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const i = line.indexOf('=');
    if (i < 0) continue;
    const key = line.slice(0, i).trim();
    let val = line.slice(i + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) val = val.slice(1, -1);
    out[key] = val;
  }
  return out;
}

/** Load .env, .env.<mode>, then real process.env (highest priority). */
export function loadEnv(mode) {
  const merged = {
    ...parseEnvFile(path.join(ROOT, '.env')),
    ...parseEnvFile(path.join(ROOT, `.env.${mode}`)),
  };
  for (const [k, v] of Object.entries(process.env)) if (k.startsWith('PUBLIC_')) merged[k] = v;
  const pub = {};
  for (const [k, v] of Object.entries(merged)) if (k.startsWith('PUBLIC_')) pub[k] = v;
  pub.PUBLIC_SITE_URL = (pub.PUBLIC_SITE_URL || 'https://www.myhealthopinions.com').replace(/\/+$/, '');
  return pub;
}

export function defines({ env, mode, routerMode, previewForms }) {
  return {
    'process.env.NODE_ENV': JSON.stringify(mode === 'development' ? 'development' : 'production'),
    'import.meta.env': JSON.stringify({ ...env, MODE: mode }),
    __ROUTER_MODE__: JSON.stringify(routerMode),
    __PREVIEW_FORMS__: JSON.stringify(Boolean(previewForms)),
  };
}

export function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

export const assetLoaders = {
  '.webp': 'file',
  '.png': 'file',
  '.jpg': 'file',
  '.svg': 'file',
  '.woff2': 'file',
};

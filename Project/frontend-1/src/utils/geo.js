// src/utils/geo.js
// Best-effort IP -> country (ISO-2, lowercase). Never throws, never blocks signup.
// Uses the same backend endpoint as the MHO app's telemetry.ip(): GET /api/v1/get-country -> { country }.
// Override with VITE_GEO_ENDPOINT if needed.
import { API_BASE } from '../data/site.js';

const GEO_ENDPOINT = import.meta.env.VITE_GEO_ENDPOINT || `${API_BASE}/api/v1/get-country`;
const CACHE_KEY = 'mfr.geo.country';
const TIMEOUT_MS = 4000;

function readCache() {
  try { return sessionStorage.getItem(CACHE_KEY) || ''; } catch { return ''; }
}
function writeCache(iso) {
  try { sessionStorage.setItem(CACHE_KEY, iso); } catch { /* storage blocked */ }
}

export async function detectCountry({ signal } = {}) {
  const cached = readCache();
  if (cached) return cached;
  if (!GEO_ENDPOINT) return '';

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  const onAbort = () => ctrl.abort();
  signal?.addEventListener('abort', onAbort, { once: true });

  try {
    const res = await fetch(GEO_ENDPOINT, { signal: ctrl.signal, credentials: 'omit' });
    if (!res.ok) return '';
    const json = await res.json();
    const raw = json?.country ?? json?.data?.country ?? json?.country_code ?? json?.countryCode ?? '';
    const iso = typeof raw === 'string' ? raw.trim().toLowerCase() : '';
    if (!/^[a-z]{2}$/.test(iso)) return '';
    writeCache(iso);
    return iso;
  } catch {
    return '';
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener('abort', onAbort);
  }
}
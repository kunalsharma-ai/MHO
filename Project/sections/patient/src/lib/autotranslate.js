/**
 * Runtime translation for the 80 "more languages" (ported from MyFrequentRewards' contentTranslator).
 * Sources, fastest first:
 *   1. in-memory cache   2. localStorage cache from earlier visits
 *   3. your endpoint (config.translateEndpoint: POST { source:'en', target, q:[…] } → { translations:[…] })
 *   4. the browser's on-device Translator API (Chrome 138+), when config.useBrowserTranslator is true
 * If nothing is available the English text stays on screen — the section never blocks or breaks.
 * Stored answer VALUES are never translated, so your backend always receives the same data.
 */
import { cfg } from './config.js';

const mem = new Map();
const listeners = new Set();
const status = new Map(); // lang -> true | false | undefined
const LS = (lang) => 'mho:tr:' + lang;
const MAX_LS = 900_000;

function bucket(lang) {
  if (!mem.has(lang)) {
    const m = new Map();
    try { const saved = JSON.parse(localStorage.getItem(LS(lang)) || 'null'); if (saved) for (const k in saved) m.set(k, saved[k]); } catch {}
    mem.set(lang, m);
  }
  return mem.get(lang);
}
let pt = 0;
function persist(lang) {
  clearTimeout(pt);
  pt = setTimeout(() => {
    const obj = {}; let size = 0;
    for (const [k, v] of bucket(lang)) { size += k.length + v.length; if (size > MAX_LS) break; obj[k] = v; }
    try { localStorage.setItem(LS(lang), JSON.stringify(obj)); } catch {}
  }, 800);
}

/* placeholders like {n} are swapped for ⟦0⟧ so translators keep them intact */
const protect = (s) => { const ph = []; return { text: s.replace(/\{(\w+)\}/g, (m) => '⟦' + (ph.push(m) - 1) + '⟧'), ph }; };
const restore = (s, ph) => {
  let ok = true;
  const out = s.replace(/⟦\s*(\d+)\s*⟧/g, (m, i) => ph[+i] ?? m);
  ph.forEach((p) => { if (!out.includes(p)) ok = false; });
  return ok ? out : null;
};

async function viaEndpoint(texts, lang) {
  const ep = cfg().translateEndpoint;
  if (!ep) return null;
  const out = [];
  for (let i = 0; i < texts.length; i += 100) {
    const chunk = texts.slice(i, i + 100);
    const r = await fetch(ep, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ source: 'en', target: lang, q: chunk }) });
    if (!r.ok) throw new Error('translate ' + r.status);
    const j = await r.json();
    if (!Array.isArray(j.translations) || j.translations.length !== chunk.length) throw new Error('bad translate response');
    out.push(...j.translations);
  }
  return out;
}
const browserTr = new Map();
async function viaBrowser(texts, lang) {
  if (!cfg().useBrowserTranslator || typeof self === 'undefined' || !('Translator' in self)) return null;
  const target = lang === 'zh-TW' ? 'zh-Hant' : lang === 'fil' ? 'tl' : lang;
  try {
    if (!browserTr.has(target)) {
      browserTr.set(target, (async () => {
        const av = await self.Translator.availability({ sourceLanguage: 'en', targetLanguage: target });
        if (av === 'unavailable') return null;
        return self.Translator.create({ sourceLanguage: 'en', targetLanguage: target });
      })().catch(() => null));
    }
    const tr = await browserTr.get(target);
    if (!tr) return null;
    const out = [];
    for (const t of texts) out.push(await tr.translate(t));
    return out;
  } catch {
    browserTr.delete(target);
    return null;
  }
}

const queues = new Map();
function flush(lang) {
  const q = queues.get(lang);
  queues.delete(lang);
  const texts = [...q.set];
  (async () => {
    const prot = texts.map(protect);
    let res = null;
    try { res = await viaEndpoint(prot.map((p) => p.text), lang); } catch (e) { console.warn('[mho i18n] endpoint failed', e); }
    if (!res) res = await viaBrowser(prot.map((p) => p.text), lang);
    const m = bucket(lang);
    if (res) {
      status.set(lang, true);
      texts.forEach((t, i) => { const v = res[i] && restore(res[i], prot[i].ph); if (v) m.set(t, v); });
      persist(lang);
    } else if (status.get(lang) !== true) status.set(lang, false);
    q.waiters.forEach((w) => w());
    listeners.forEach((l) => l(lang));
  })();
}
function enqueue(texts, lang) {
  return new Promise((resolve) => {
    let q = queues.get(lang);
    if (!q) { q = { set: new Set(), waiters: [] }; queues.set(lang, q); setTimeout(() => flush(lang), 60); }
    texts.forEach((t) => q.set.add(t));
    q.waiters.push(resolve);
  });
}

/** synchronous lookup; undefined when not translated yet */
export const peek = (text, lang) => (text ? bucket(lang).get(text) : text);
/** ask for a translation in the background (re-render happens through onTranslated) */
const asked = new Map();
export function request(text, lang) {
  if (!text || !/[A-Za-z]/.test(text) || status.get(lang) === false) return;
  let s = asked.get(lang);
  if (!s) asked.set(lang, (s = new Set()));
  if (s.has(text) || bucket(lang).has(text)) return;
  s.add(text);
  enqueue([text], lang);
}
export async function translateMany(texts, lang) {
  const m = bucket(lang);
  const missing = [...new Set(texts.filter((t) => t && !m.has(t) && /[A-Za-z]/.test(t)))];
  if (missing.length) await enqueue(missing, lang);
  return texts.map((t) => m.get(t) || t);
}
export const onTranslated = (fn) => (listeners.add(fn), () => listeners.delete(fn));
/** true = working, false = no translator available on this device, undefined = not tried yet */
export const translatorStatus = (lang) => status.get(lang);

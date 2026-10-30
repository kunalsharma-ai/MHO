// npm run i18n:extract  (after npm run build)
//
// Collects every visible, translatable text of the whole site from the prerendered pages in dist/
// (all routes and blog posts) using the same rules as the in-browser engine (src/i18n/engine.js):
// text nodes, sentences split by inline tags, and the placeholder / aria-label / title / alt attributes.
// Skips <script>/<style>/<svg>/<code>, translate="no" and .notranslate.
//
// Output: i18n/source-strings.json  →  [{ "text": "...", "pages": 12 }, …]  (sorted by how often used)
// That file is the input for `npm run i18n:generate` (machine translation into every language) or for a
// professional translation vendor / TMS.
//
// Note: text that only appears after interaction (chat answers, form steps, tab panels not shown first)
// is not in the static HTML; the browser engine still translates it live through the provider.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
if (!fs.existsSync(DIST)) {
  console.error('✖ dist/ not found — run `npm run build` first.');
  process.exit(1);
}

const files = [];
(function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (f.endsWith('.html')) files.push(p);
  }
})(DIST);

const INLINE = new Set(['span', 'b', 'strong', 'em', 'i', 'small', 'mark', 'br', 'sup', 'sub', 'abbr', 'u', 's', 'q', 'cite', 'time', 'data', 'wbr']);
const SKIP = new Set(['script', 'style', 'svg', 'code', 'pre', 'textarea', 'noscript', 'head']);
const decode = (s) =>
  s.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n));
const norm = (s) => decode(s).replace(/\s+/g, ' ').trim();
const LETTER = /\p{L}/u;

/** Tiny HTML tokenizer → nested text runs. Inline-only runs inside one block become one sentence. */
function extract(html) {
  const out = [];
  const body = html.split(/<body[^>]*>/)[1] || html;
  const re = /<!--[\s\S]*?-->|<(\/?)([a-zA-Z][\w-]*)([^>]*)>|([^<]+)/g;
  const stack = [];
  let run = [];
  let skipDepth = 0;
  // A run of text split by inline tags is emitted as the whole sentence AND as its pieces: the browser
  // engine decides at runtime (from CSS display) whether it is one sentence or separate labels.
  const flush = () => {
    const t = norm(run.join(''));
    if (t && LETTER.test(t)) out.push(t);
    const pieces = run.map(norm).filter((p) => p && LETTER.test(p));
    if (pieces.length > 1) out.push(...pieces);
    run = [];
  };
  for (const m of body.matchAll(re)) {
    if (m[0].startsWith('<!--')) continue;
    if (m[4] !== undefined) {
      if (!skipDepth) run.push(m[4]);
      continue;
    }
    const closing = m[1] === '/';
    const tag = m[2].toLowerCase();
    const attrs = m[3] || '';
    const selfClosing = /\/\s*$/.test(attrs) || ['br', 'img', 'input', 'meta', 'link', 'hr', 'wbr', 'source'].includes(tag);
    if (!closing) {
      for (const a of ['placeholder', 'aria-label', 'title', 'alt']) {
        const v = attrs.match(new RegExp(`\\s${a}="([^"]*)"`));
        if (v && !skipDepth && LETTER.test(v[1])) out.push(norm(v[1]));
      }
    }
    const isSkip = SKIP.has(tag) || /translate="no"|class="[^"]*\bnotranslate\b/.test(attrs);
    if (!INLINE.has(tag)) flush();
    if (selfClosing) continue;
    if (!closing) {
      stack.push({ tag, skip: isSkip });
      if (isSkip) skipDepth++;
    } else {
      // pop to the matching tag
      for (let i = stack.length - 1; i >= 0; i--) {
        if (stack[i].tag === tag) {
          for (let j = stack.length - 1; j >= i; j--) if (stack[j].skip) skipDepth--;
          stack.length = i;
          break;
        }
      }
    }
  }
  flush();
  return out;
}

const count = new Map();
for (const f of files) {
  const seen = new Set(extract(fs.readFileSync(f, 'utf8')));
  for (const t of seen) count.set(t, (count.get(t) || 0) + 1);
}
const list = [...count].map(([text, pages]) => ({ text, pages })).sort((a, b) => b.pages - a.pages || a.text.localeCompare(b.text));
fs.mkdirSync(path.join(ROOT, 'i18n'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'i18n/source-strings.json'), JSON.stringify(list, null, 1));
const words = list.reduce((n, s) => n + s.text.split(/\s+/).length, 0);
const chars = list.reduce((n, s) => n + s.text.length, 0);
console.log(`✔ ${files.length} pages · ${list.length} unique strings · ${words.toLocaleString()} words · ${chars.toLocaleString()} characters → i18n/source-strings.json`);

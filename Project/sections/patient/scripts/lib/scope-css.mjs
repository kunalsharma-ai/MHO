/**
 * Scopes a stylesheet to the section root so it can live inside any dashboard without leaking styles.
 *
 *   :root / html / body          → .mho-app                (the section root element)
 *   :root[data-theme=dark] .x    → .mho-app[data-theme=dark] .x
 *   .card                        → .mho-app .card
 *   @media / @supports / @container / @layer → recursed
 *   @keyframes / @font-face / @property / @view-transition → untouched (global by nature)
 *
 * Authoring rule: anything that targets the section root itself is written with :root.
 * Usage: scopeCss(cssText, '.mho-app')
 */
export function scopeCss(css, scope = '.mho-app') {
  let i = 0;
  const n = css.length;
  const out = [];

  const skipStringOrComment = () => {
    const c = css[i];
    if (c === '/' && css[i + 1] === '*') { const e = css.indexOf('*/', i + 2); const end = e < 0 ? n : e + 2; out.push(css.slice(i, end)); i = end; return true; }
    if (c === '"' || c === "'") { let j = i + 1; while (j < n && css[j] !== c) { if (css[j] === '\\') j++; j++; } out.push(css.slice(i, j + 1)); i = j + 1; return true; }
    return false;
  };
  // read until one of the stop chars at depth 0 (parentheses/brackets aware), returns text
  const readUntil = (stops) => {
    const s = i; let depth = 0;
    while (i < n) {
      const c = css[i];
      if (c === '"' || c === "'") { let j = i + 1; while (j < n && css[j] !== c) { if (css[j] === '\\') j++; j++; } i = j + 1; continue; }
      if (c === '/' && css[i + 1] === '*') { const e = css.indexOf('*/', i + 2); i = e < 0 ? n : e + 2; continue; }
      if (c === '(' || c === '[') depth++;
      else if (c === ')' || c === ']') depth--;
      else if (depth === 0 && stops.includes(c)) break;
      i++;
    }
    return css.slice(s, i);
  };
  // read a balanced { ... } block body (i at '{'), returns inner text
  const readBlock = () => {
    const s = ++i; let depth = 1;
    while (i < n && depth) {
      const c = css[i];
      if (c === '"' || c === "'") { let j = i + 1; while (j < n && css[j] !== c) { if (css[j] === '\\') j++; j++; } i = j + 1; continue; }
      if (c === '/' && css[i + 1] === '*') { const e = css.indexOf('*/', i + 2); i = e < 0 ? n : e + 2; continue; }
      if (c === '{') depth++;
      else if (c === '}') depth--;
      i++;
    }
    return css.slice(s, i - 1);
  };

  while (i < n) {
    if (/\s/.test(css[i])) { out.push(css[i++]); continue; }
    if (skipStringOrComment()) continue;
    if (css[i] === '@') {
      const prelude = readUntil(['{', ';']);
      if (css[i] === ';') { out.push(prelude + ';'); i++; continue; }
      const body = readBlock();
      const name = /^@([\w-]+)/.exec(prelude)?.[1] || '';
      if (/^(media|supports|container|layer|document|scope)$/.test(name)) out.push(prelude + '{' + scopeCss(body, scope) + '}');
      else out.push(prelude + '{' + body + '}');
      continue;
    }
    const sel = readUntil(['{']);
    if (i >= n) { out.push(sel); break; }
    const body = readBlock();
    out.push(scopeSelectorList(sel, scope) + '{' + body + '}');
  }
  return out.join('');
}

function splitTop(sel) {
  const parts = []; let depth = 0, s = 0;
  for (let k = 0; k < sel.length; k++) {
    const c = sel[k];
    if (c === '(' || c === '[') depth++;
    else if (c === ')' || c === ']') depth--;
    else if (c === ',' && depth === 0) { parts.push(sel.slice(s, k)); s = k + 1; }
  }
  parts.push(sel.slice(s));
  return parts;
}

export function scopeSelectorList(sel, scope) {
  return splitTop(sel).map((raw) => {
    const s = raw.trim();
    if (!s) return s;
    if (/^(from|to|\d+%)$/.test(s)) return s;
    if (s.startsWith('::view-transition') || s.startsWith(scope)) return s;
    // root-level tokens
    const m = /^(:root|html|body)(?![\w-])/.exec(s);
    if (m) return scope + s.slice(m[0].length);
    if (s === '*' ) return scope + ' *';
    return scope + ' ' + s;
  }).join(',');
}

/** Prefix every @keyframes name (and its uses in animation / animation-name) so they never clash with the host page. */
export function prefixKeyframes(css, prefix = 'mho-') {
  const names = new Set();
  css.replace(/@(?:-webkit-)?keyframes\s+([\w-]+)/g, (m, k) => names.add(k));
  if (!names.size) return css;
  css = css.replace(/(@(?:-webkit-)?keyframes\s+)([\w-]+)/g, (m, a, k) => a + prefix + k);
  return css.replace(/(animation(?:-name)?\s*:)([^;}]*)/g, (m, prop, val) =>
    prop + val.replace(/[\w-]+/g, (tok) => (names.has(tok) ? prefix + tok : tok)));
}

export const scopeAll = (css, scope = '.mho-app') => prefixKeyframes(scopeCss(css, scope));

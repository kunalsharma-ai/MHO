/**
 * Scopes a stylesheet to one root class so the section can live inside any dashboard without
 * touching the host page:   .btn → .mho-pp .btn   ·   :root / html / body → .mho-pp
 *   [data-theme='dark'] .x → .mho-pp[data-theme='dark'] .x   ·   [dir='rtl'] .x → .mho-pp[dir='rtl'] .x
 * @keyframes / @font-face are left as they are; html.lock (page scroll lock) and ::view-transition stay global.
 */
export function scopeCss(css, scope = '.mho-pp') {
  let out = '';
  let i = 0;
  const n = css.length;
  const readBlock = (start) => { // returns index after the matching }
    let depth = 0;
    for (let k = start; k < n; k++) {
      if (css[k] === '{') depth++;
      else if (css[k] === '}') { depth--; if (depth === 0) return k + 1; }
    }
    return n;
  };
  const splitSel = (s) => {
    const parts = []; let depth = 0; let cur = '';
    for (const ch of s) {
      if (ch === '(' || ch === '[') depth++;
      if (ch === ')' || ch === ']') depth--;
      if (ch === ',' && depth === 0) { parts.push(cur); cur = ''; } else cur += ch;
    }
    parts.push(cur);
    return parts.map((x) => x.trim()).filter(Boolean);
  };
  const one = (sel) => {
    if (/^html\.lock\b/.test(sel) || /^::view-transition/.test(sel) || /^(from|to|\d+%)/.test(sel)) return sel;
    let m;
    if ((m = /^(?::root|html|body)((?:\[[^\]]*\]|\.[\w-]+|:not\([^)]*\))*)(.*)$/.exec(sel))) return scope + m[1] + m[2];
    if ((m = /^((?:\[(?:data-theme|data-lang|dir|lang)[^\]]*\])+)(.*)$/.exec(sel))) return scope + m[1] + m[2];
    if (sel === '*' || sel.startsWith('*')) return scope + ' ' + sel + ', ' + scope + sel.slice(1);
    return scope + ' ' + sel;
  };
  while (i < n) {
    // skip whitespace / comments
    if (/\s/.test(css[i])) { out += css[i++]; continue; }
    if (css.startsWith('/*', i)) { const e = css.indexOf('*/', i + 2); i = e < 0 ? n : e + 2; continue; }
    const brace = css.indexOf('{', i);
    const semi = css.indexOf(';', i);
    if (css[i] === '@' && semi >= 0 && (brace < 0 || semi < brace)) { out += css.slice(i, semi + 1); i = semi + 1; continue; } // @import / @charset
    if (brace < 0) { out += css.slice(i); break; }
    const head = css.slice(i, brace).trim();
    const end = readBlock(brace);
    const body = css.slice(brace + 1, end - 1);
    if (/^@(media|supports|container|layer)\b/.test(head)) out += head + '{' + scopeCss(body, scope) + '}';
    else if (head.startsWith('@')) out += head + '{' + body + '}';
    else out += splitSel(head).map(one).join(',') + '{' + body + '}';
    i = end;
  }
  return out;
}

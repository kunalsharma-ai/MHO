// Project JSX runtime (configured in vite.config.js as jsxImportSource "mho-jsx").
// Identical to React's, except that `style={{…}}` on DOM elements becomes a generated class (see ./atomic.js),
// so the HTML has no inline style attributes. Components (non-string types) receive their props untouched.
import { jsx as reactJsx, jsxs as reactJsxs, Fragment } from 'react/jsx-runtime';
import { styleToClass } from './atomic.js';

export function moveStyle(type, props) {
  if (typeof type !== 'string' || !props) return props;
  const style = props.style;
  if (!style || typeof style !== 'object') return props;
  const cls = styleToClass(style);
  if (cls === null) return props;
  const next = { ...props };
  delete next.style;
  if (cls) next.className = next.className ? `${next.className} ${cls}` : cls;
  return next;
}

export function jsx(type, props, key) {
  return reactJsx(type, moveStyle(type, props), key);
}

export function jsxs(type, props, key) {
  return reactJsxs(type, moveStyle(type, props), key);
}

export { Fragment };

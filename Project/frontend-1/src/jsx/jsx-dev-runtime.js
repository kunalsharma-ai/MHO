// Development twin of ./jsx-runtime.js (used by `npm run dev`).
import { jsxDEV as reactJsxDEV, Fragment } from 'react/jsx-dev-runtime';
import { moveStyle } from './jsx-runtime.js';

export function jsxDEV(type, props, key, isStatic, source, self) {
  return reactJsxDEV(type, moveStyle(type, props), key, isStatic, source, self);
}

export { Fragment };

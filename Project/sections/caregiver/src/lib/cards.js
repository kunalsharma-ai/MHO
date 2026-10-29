const subs = new Set();
const keys = new Map();
let entries = [];
let counter = 0;

const emit = () => subs.forEach((fn) => fn());

export const cards = {
  set(el, item) {
    if (!keys.has(el)) keys.set(el, `card-${++counter}`);
    entries = [...entries.filter((e) => e.el !== el), { el, item, key: keys.get(el) }];
    emit();
  },
  remove(el) {
    entries = entries.filter((e) => e.el !== el);
    keys.delete(el);
    emit();
  },
  subscribe(fn) {
    subs.add(fn);
    return () => subs.delete(fn);
  },
  snapshot: () => entries,
};

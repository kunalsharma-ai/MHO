const listeners = new Set();
let list = [];
let actions = null;

export const controller = {
  attach(next) { actions = next; },
  publish(next) {
    list = next;
    listeners.forEach((fn) => fn(list));
  },
  items: () => list,
  open: (id) => actions?.open(id),
  subscribe(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
};

import { useSyncExternalStore } from 'react';

/** Tiny toast queue (MyFrequentRewards style): toast('Text', 'kind', '🌐') */
let list = [];
const subs = new Set();
const emit = () => subs.forEach((f) => f());
export function toast(text, kind = 'info', icon = '') {
  const id = Date.now() + Math.random();
  list = [...list.slice(-2), { id, text, kind, icon }];
  emit();
  setTimeout(() => { list = list.filter((x) => x.id !== id); emit(); }, 2800);
}
const sub = (f) => (subs.add(f), () => subs.delete(f));
const snap = () => list;
const empty = [];

export default function Toasts() {
  const items = useSyncExternalStore(sub, snap, () => empty);
  return (
    <div className="toasts" role="status" aria-live="polite">
      {items.map((x) => (
        <div key={x.id} className={'toast toast-' + x.kind}>
          {x.icon && <span className="emo" aria-hidden="true">{x.icon}</span>} {x.text}
        </div>
      ))}
    </div>
  );
}

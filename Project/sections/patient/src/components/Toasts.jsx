import { createContext, useCallback, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { getLayer } from '../lib/root.js';

const Ctx = createContext(() => {});
export const useToast = () => useContext(Ctx);

export function ToastProvider({ children }) {
  const [items, setItems] = useState([]);
  const push = useCallback((text, kind = 'info', icon = '', ms = 2800) => {
    const id = Math.random().toString(36).slice(2);
    setItems((x) => [...x.slice(-2), { id, text, kind, icon }]);
    setTimeout(() => setItems((x) => x.filter((i) => i.id !== id)), ms);
  }, []);
  return (
    <Ctx.Provider value={push}>
      {children}
      {typeof document !== 'undefined' && createPortal(
        <div className="toasts" role="status" aria-live="polite">
          {items.map((t) => (
            <div key={t.id} className={'toast toast-' + t.kind}>{t.icon && <span className="emo" aria-hidden="true">{t.icon}</span>} {t.text}</div>
          ))}
        </div>,
        getLayer()
      )}
    </Ctx.Provider>
  );
}

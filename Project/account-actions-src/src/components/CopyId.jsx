import { useRef, useState } from 'react';
import { Icon } from './Icon.jsx';

/** Request ID chip with a copy button (falls back to selecting the text if clipboard access is blocked). */
export function CopyId({ id, prefix }) {
  const [state, setState] = useState('idle');
  const textRef = useRef(null);
  const copy = async () => {
    try { await navigator.clipboard.writeText(id); setState('copied'); }
    catch {
      const r = document.createRange(); r.selectNodeContents(textRef.current);
      const s = window.getSelection(); s.removeAllRanges(); s.addRange(r); setState('selected');
    }
    setTimeout(() => setState('idle'), 1800);
  };
  return (
    <span className="rid">
      {prefix && <span className="rid-pre">{prefix}</span>}
      <span ref={textRef} className="mono">{id}</span>
      <button type="button" onClick={copy} data-sfx="copy" aria-label={`Copy request ID ${id}`} title="Copy">
        <Icon name={state === 'copied' ? 'check' : 'copy'} />
      </button>
      <span className="sr-only" aria-live="polite">{state === 'copied' ? 'Copied' : state === 'selected' ? 'Selected. Press Ctrl+C to copy.' : ''}</span>
    </span>
  );
}

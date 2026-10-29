// Square crop window for a profile photo: drag to move, slider (or +/-) to zoom, Save gives a 512 x 512 picture.
// The picture is redrawn on a canvas, so the saved file is small and carries no camera / location metadata.
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Icon from './Icon.jsx';

const MAX_VIEW = 300; // size of the crop window on screen (px), smaller on very narrow phones
const OUT = 512; // size of the saved picture (px)

export default function PhotoCropper({ file, onCancel, onSave, busy = false, error = '' }) {
  const [VIEW] = useState(() => Math.max(200, Math.min(MAX_VIEW, (typeof window === 'undefined' ? MAX_VIEW : window.innerWidth) - 90)));
  const [src, setSrc] = useState('');
  const [nat, setNat] = useState(null); // natural size of the picture { w, h }
  const [bad, setBad] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 }); // picture centre, as an offset from the window centre (px)
  const drag = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const url = URL.createObjectURL(file);
    setSrc(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  useEffect(() => {
    const esc = (e) => { if (e.key === 'Escape' && !busy) onCancel(); };
    window.addEventListener('keydown', esc);
    document.documentElement.classList.add('modal-open');
    return () => { window.removeEventListener('keydown', esc); document.documentElement.classList.remove('modal-open'); };
  }, [busy, onCancel]);

  const base = nat ? Math.max(VIEW / nat.w, VIEW / nat.h) : 1; // scale at which the picture just covers the window
  const scale = base * zoom;
  const clamp = (p, sc) => {
    if (!nat) return p;
    const mx = Math.max(0, (nat.w * sc - VIEW) / 2);
    const my = Math.max(0, (nat.h * sc - VIEW) / 2);
    return { x: Math.min(mx, Math.max(-mx, p.x)), y: Math.min(my, Math.max(-my, p.y)) };
  };
  const zoomTo = (z) => {
    const v = Math.min(3, Math.max(1, z));
    setZoom(v);
    setPos((p) => clamp(p, base * v));
  };

  const down = (e) => {
    if (busy) return;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    drag.current = { sx: e.clientX, sy: e.clientY, ox: pos.x, oy: pos.y };
  };
  const move = (e) => {
    const d = drag.current;
    if (!d) return;
    setPos(clamp({ x: d.ox + e.clientX - d.sx, y: d.oy + e.clientY - d.sy }, scale));
  };
  const up = () => { drag.current = null; };
  const key = (e) => {
    const step = 12;
    const delta = { ArrowLeft: [step, 0], ArrowRight: [-step, 0], ArrowUp: [0, step], ArrowDown: [0, -step] }[e.key];
    if (!delta) return;
    e.preventDefault();
    setPos((p) => clamp({ x: p.x + delta[0], y: p.y + delta[1] }, scale));
  };

  const save = () => {
    if (!nat || !imgRef.current || busy) return;
    const canvas = document.createElement('canvas');
    canvas.width = OUT;
    canvas.height = OUT;
    const g = canvas.getContext('2d');
    const side = VIEW / scale; // the window, in picture pixels
    const sx = nat.w / 2 - pos.x / scale - side / 2;
    const sy = nat.h / 2 - pos.y / scale - side / 2;
    g.fillStyle = '#fff';
    g.fillRect(0, 0, OUT, OUT);
    g.drawImage(imgRef.current, sx, sy, side, side, 0, 0, OUT, OUT);
    canvas.toBlob((blob) => { if (blob) onSave(blob); }, 'image/webp', 0.9);
  };

  // rendered on <body>: inside the left panel it would sit under the form card (stacking context of the animated panel)
  return createPortal(
    <div className="ph-modal" role="dialog" aria-modal="true" aria-label="Adjust your photo" onMouseDown={(e) => { if (e.target === e.currentTarget && !busy) onCancel(); }}>
      <div className="ph-card">
        <h2>Adjust your photo</h2>
        <p className="ph-hint">Drag to move, use the slider to zoom.</p>
        {bad ? (
          <p className="form-alert" role="alert">That file could not be read as a picture. Please choose a JPG, PNG or WebP photo.</p>
        ) : (
          <div className="ph-view" style={{ width: VIEW, height: VIEW }} tabIndex={0} role="group" aria-label="Photo crop area. Use the arrow keys to move the photo." onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} onKeyDown={key}>
            {src && (
              <img
                ref={imgRef}
                src={src}
                alt=""
                draggable="false"
                onLoad={(e) => setNat({ w: e.currentTarget.naturalWidth, h: e.currentTarget.naturalHeight })}
                onError={() => setBad(true)}
                style={nat ? { width: nat.w * scale, height: nat.h * scale, transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px))` } : { visibility: 'hidden' }}
              />
            )}
            <span className="ph-mask" aria-hidden="true" />
          </div>
        )}
        {!bad && (
          <label className="ph-zoom">
            <button type="button" onClick={() => zoomTo(zoom - 0.25)} aria-label="Zoom out" disabled={busy || zoom <= 1}><Icon name="minus" size={16} /></button>
            <input type="range" min="1" max="3" step="0.05" value={zoom} onChange={(e) => zoomTo(Number(e.target.value))} aria-label="Zoom" disabled={busy} />
            <button type="button" onClick={() => zoomTo(zoom + 0.25)} aria-label="Zoom in" disabled={busy || zoom >= 3}><Icon name="plus" size={16} /></button>
          </label>
        )}
        {error && <p className="form-alert" role="alert">{error}</p>}
        <div className="ph-actions">
          <button type="button" className="btn btn-ghost" onClick={onCancel} disabled={busy}><span className="btn-label">Cancel</span></button>
          <button type="button" className="btn btn-primary" onClick={save} disabled={busy || bad || !nat}><span className="btn-label">{busy ? 'Saving…' : 'Save photo'}</span></button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

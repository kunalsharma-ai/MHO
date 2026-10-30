
import { useRef, useState } from 'react';
import Persona from './Persona.jsx';
import PhotoCropper from './PhotoCropper.jsx';
import { API } from '../config/site.js';
import { auth, apiRequest } from '../utils/helpers.js';
import { clearSession } from '../utils/session.js';

const API_BASE = String(API.me).replace(/\/me\/?$/, ''); 
const UPLOAD_URL = `${API_BASE}/upload/image`;
const MAX_BYTES = 10 * 1024 * 1024; 

const Camera = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 8h3l1.6-2.4h6.8L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
    <circle cx="12" cy="13" r="3.6" />
  </svg>
);

async function uploadImage(blob) {
  const form = new FormData();
  const ext = blob.type === 'image/png' ? 'png' : blob.type === 'image/jpeg' ? 'jpg' : 'webp';
  form.append('file', new File([blob], `profile.${ext}`, { type: blob.type || 'image/webp' }));
  const token = auth.getToken();
  const headers = { Accept: 'application/json' }; 
  if (token) headers.Authorization = `Bearer ${token}`;
  try {
    const res = await fetch(UPLOAD_URL, { method: 'POST', headers, credentials: 'same-origin', body: form });
    const data = await res.json().catch(() => ({}));
    const url = data?.file?.url;
    return res.ok && data.status === 'success' && url ? { ok: true, url } : { ok: false, message: data?.message || '' };
  } catch {
    return { ok: false, message: '' };
  }
}

export default function ProfileAvatar({ role, size = 120, photo = '', editable = false, onSaved, bob = true }) {
  const input = useRef(null);
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [note, setNote] = useState({ text: '', ok: true });
  const [broken, setBroken] = useState(false);

  const choose = (e) => {
    const f = e.target.files?.[0];
    e.target.value = '';
    setNote({ text: '', ok: true });
    if (!f) return;
    if (!/^image\//.test(f.type)) { setNote({ text: 'Please choose a picture (JPG, PNG or WebP).', ok: false }); return; }
    if (f.size > MAX_BYTES) { setNote({ text: 'That picture is too big. Please choose one under 10 MB.', ok: false }); return; }
    setError('');
    setFile(f);
  };

  const save = async (blob) => {
    setBusy(true);
    setError('');
    const up = await uploadImage(blob);
    if (!up.ok) { setBusy(false); setError(up.message || 'We could not upload your photo. Please try again.'); return; }
    const saved = await apiRequest('PUT', API.me, { profilePicture: up.url });
    setBusy(false);
    if (!saved.ok) { setError(saved.data?.message || 'We could not save your photo. Please try again.'); return; }
    setFile(null);
    setBroken(false);
    setNote({ text: 'Photo saved.', ok: true });
    clearSession(); // the header picks up the new photo
    onSaved?.(up.url);
  };

  const showPhoto = photo && !broken;
  return (
    <div className="js-avatar">
      <div className={`ja-pic ${bob ? 'bob' : ''}`} style={{ width: size, height: size }}>
        {showPhoto ? (
          <img className="persona jsp-photo" src={photo} alt={role.title} width={size} height={size} style={{ width: size, height: size }} onError={() => setBroken(true)} />
        ) : (
          <Persona kind={role.persona[0]} skin={role.persona[1]} hair={role.persona[2]} hairStyle={role.persona[3]} size={size} label={role.title} />
        )}
        {editable && (
          <button type="button" className="ja-cam" onClick={() => input.current?.click()} aria-label={showPhoto ? 'Change your photo' : 'Add your photo'} title={showPhoto ? 'Change photo' : 'Add photo'}>
            <Camera />
          </button>
        )}
      </div>
      {editable && (
        <>
          <button type="button" className="ja-btn" onClick={() => input.current?.click()}>
            <Camera />{showPhoto ? 'Change photo' : 'Add your photo'}
          </button>
          <input ref={input} type="file" accept="image/*" onChange={choose} hidden />
          <p className={`ja-note ${note.ok ? '' : 'bad'}`} role="status" aria-live="polite">{note.text}</p>
        </>
      )}
      {file && <PhotoCropper file={file} busy={busy} error={error} onCancel={() => { if (!busy) { setFile(null); setError(''); } }} onSave={save} />}
    </div>
  );
}

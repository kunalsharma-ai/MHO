import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import Icon from './Icon.jsx';

// CAPTCHA
// • If VITE_TURNSTILE_SITE_KEY is set → Cloudflare Turnstile (token MUST be verified on the server).
// • Otherwise → built-in visual code (with an accessible text-question alternative).
//   The built-in check deters casual bots only; production should verify a server-side CAPTCHA (README → Security).

const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY;
const CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

const randCode = () => Array.from({ length: 5 }, () => CHARS[Math.floor(Math.random() * CHARS.length)]).join('');
const randMath = () => {
  const a = 2 + Math.floor(Math.random() * 8);
  const b = 1 + Math.floor(Math.random() * 9);
  return { q: `What is ${a} plus ${b}?`, a: String(a + b) };
};

const Captcha = forwardRef(function Captcha({ onChange, error }, ref) {
  const canvas = useRef(null);
  const [code, setCode] = useState('');
  const [math, setMath] = useState({ q: '', a: '' });
  const [mode, setMode] = useState('visual');
  const [value, setValue] = useState('');
  const [token, setToken] = useState('');
  const tsRef = useRef(null);

  const draw = useCallback((c) => {
    const cv = canvas.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    const W = cv.width;
    const H = cv.height;
    const g = ctx.createLinearGradient(0, 0, W, H);
    g.addColorStop(0, '#EEF2FF');
    g.addColorStop(1, '#FFF4E5');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
    for (let i = 0; i < 6; i++) {
      ctx.strokeStyle = `hsla(${Math.random() * 360},70%,55%,.45)`;
      ctx.lineWidth = 1 + Math.random() * 1.5;
      ctx.beginPath();
      ctx.moveTo(Math.random() * W, Math.random() * H);
      ctx.bezierCurveTo(Math.random() * W, Math.random() * H, Math.random() * W, Math.random() * H, Math.random() * W, Math.random() * H);
      ctx.stroke();
    }
    c.split('').forEach((ch, i) => {
      ctx.save();
      ctx.translate(18 + i * 30, 30 + Math.random() * 8);
      ctx.rotate((Math.random() - 0.5) * 0.6);
      ctx.font = `700 ${24 + Math.random() * 6}px "Manrope", system-ui, sans-serif`;
      ctx.fillStyle = ['#0B1E5B', '#FF8A00', '#2F6BFF', '#8B5CF6', '#E1306C'][i % 5];
      ctx.fillText(ch, 0, 0);
      ctx.restore();
    });
    for (let i = 0; i < 40; i++) {
      ctx.fillStyle = 'rgba(11,30,91,.25)';
      ctx.fillRect(Math.random() * W, Math.random() * H, 2, 2);
    }
  }, []);

  const refresh = useCallback(() => {
    const c = randCode();
    setCode(c);
    setMath(randMath());
    setValue('');
    onChange && onChange(false);
    setTimeout(() => draw(c), 0);
  }, [draw, onChange]);

  useEffect(() => {
    if (SITE_KEY) {
      const render = () => {
        if (window.turnstile && tsRef.current && !tsRef.current.dataset.done) {
          tsRef.current.dataset.done = '1';
          window.turnstile.render(tsRef.current, {
            sitekey: SITE_KEY,
            callback: (t) => {
              setToken(t);
              onChange && onChange(true, t);
            },
            'expired-callback': () => {
              setToken('');
              onChange && onChange(false);
            },
          });
        }
      };
      if (!document.getElementById('cf-turnstile')) {
        const s = document.createElement('script');
        s.id = 'cf-turnstile';
        s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
        s.async = true;
        s.onload = render;
        document.head.appendChild(s);
      } else render();
      return;
    }
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useImperativeHandle(ref, () => ({ refresh, token: () => token }));

  const check = (v) => {
    setValue(v);
    const ok = mode === 'visual' ? v.trim().toUpperCase() === code : v.trim() === math.a;
    onChange && onChange(ok);
  };

  if (SITE_KEY) return <div className="captcha-ts" ref={tsRef} />;

  return (
    <div className={`captcha ${error ? 'has-error' : ''}`}>
      <div className="captcha-row">
        {mode === 'visual' ? (
          <canvas ref={canvas} width="170" height="50" className="captcha-canvas" role="img" aria-label="Security code image. Use the text question option if you cannot read it." />
        ) : (
          <p className="captcha-q" id="captcha-q">{math.q}</p>
        )}
        <button type="button" className="captcha-refresh" onClick={refresh} aria-label="Get a new security challenge"><Icon name="refresh" size={18} /></button>
      </div>
      <label htmlFor="captcha-input" className="f-label">{mode === 'visual' ? 'Type the code shown' : 'Your answer'}</label>
      <input
        id="captcha-input"
        className="f-input"
        value={value}
        onChange={(e) => check(e.target.value)}
        autoComplete="off"
        inputMode={mode === 'visual' ? 'text' : 'numeric'}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? 'captcha-err' : mode === 'math' ? 'captcha-q' : undefined}
        maxLength={6}
      />
      <button
        type="button"
        className="captcha-mode"
        onClick={() => {
          setMode((m) => (m === 'visual' ? 'math' : 'visual'));
          setValue('');
          onChange && onChange(false);
          setTimeout(() => draw(code), 0);
        }}
      >
        {mode === 'visual' ? 'Can’t read it? Use a text question' : 'Use the image code instead'}
      </button>
      {error ? <p className="f-err" id="captcha-err" role="alert">{error}</p> : null}
    </div>
  );
});

export default Captcha;

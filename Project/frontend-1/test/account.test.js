// The website's side of sign-up, log-in, confirmation mail and social sign-in: how it reads the API's answers
// ({ status, message, data: [] }) and where it sends people back from a social sign-in. Run: npm test
import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import { accountCall, ACCOUNT } from '../src/components/AccountKit.jsx';
import { apiRequest, auth, socialTokenFromHash, socialReturnTarget, loadProviders, validateEmail } from '../src/utils/helpers.js';

/* A minimal browser: localStorage and fetch. */
let store;
let calls;
function answer(status, body, { json = true } = {}) {
  return vi.fn(async (url, init) => {
    calls.push({ url, init });
    return { ok: status >= 200 && status < 300, status, json: async () => { if (!json) throw new SyntaxError('not JSON'); return body; } };
  });
}
beforeEach(() => {
  store = new Map();
  calls = [];
  globalThis.window = { localStorage: { getItem: (k) => store.get(k) ?? null, setItem: (k, v) => store.set(k, String(v)), removeItem: (k) => store.delete(k) } };
});
afterEach(() => { vi.unstubAllGlobals(); delete globalThis.window; });

describe('accountCall reads the API answer { status, message, data: [] }', () => {
  test('sign-up success: ok, the message, data [] and an empty row', async () => {
    vi.stubGlobal('fetch', answer(200, { status: 'success', message: 'Check your inbox.', data: [] }));
    const r = await accountCall('POST', '/register', { email: 'a@example.com' });
    expect(r).toMatchObject({ ok: true, status: 200, code: '', message: 'Check your inbox.', data: [], row: {}, errors: {} });
    expect(calls[0].url).toBe(`${ACCOUNT}/register`);
    expect(calls[0].init.method).toBe('POST');
    expect(JSON.parse(calls[0].init.body)).toEqual({ email: 'a@example.com' });
    expect(calls[0].init.headers['Content-Type']).toBe('application/json');
  });

  test('mail down: HTTP 502 with status "error" is not ok, and the message is kept for the form', async () => {
    vi.stubGlobal('fetch', answer(502, { status: 'error', message: 'We couldn’t send the email just now.', data: [] }));
    const r = await accountCall('POST', '/resend-verification', { email: 'a@example.com' });
    expect(r.ok).toBe(false);
    expect(r.status).toBe(502);
    expect(r.message).toMatch(/couldn’t send/);
    expect(r.data).toEqual([]);
    expect(r.row).toEqual({});
  });

  test('a 200 answer that says status "error" is still not ok', async () => {
    vi.stubGlobal('fetch', answer(200, { status: 'error', message: 'nope', data: [] }));
    expect((await accountCall('POST', '/forgot-password', {})).ok).toBe(false);
  });

  test('row is the first entry of data: the email of an unconfirmed log-in, the person of a link', async () => {
    vi.stubGlobal('fetch', answer(403, { status: 'error', code: 'EMAIL_UNVERIFIED', message: 'Please verify your email first.', data: [{ email: 'a@example.com' }] }));
    const r = await accountCall('POST', '/login', {});
    expect(r).toMatchObject({ ok: false, status: 403, code: 'EMAIL_UNVERIFIED', row: { email: 'a@example.com' } });
    vi.stubGlobal('fetch', answer(200, { status: 'success', message: '', data: [{ firstName: 'Asha', email: 'a@example.com', segment: 'patient' }] }));
    expect((await accountCall('POST', '/link', {})).row).toEqual({ firstName: 'Asha', email: 'a@example.com', segment: 'patient' });
  });

  test('log-in: data as an object (the journey) is the row', async () => {
    vi.stubGlobal('fetch', answer(200, { status: 'success', message: 'Login successful', token: 't', data: { journey: { next: 'consent' } } }));
    const r = await accountCall('POST', '/login', {});
    expect(r.ok).toBe(true);
    expect(r.body.token).toBe('t');
    expect(r.row).toEqual({ journey: { next: 'consent' } });
  });

  test('form errors and codes come through: email taken, failed human check, invalid fields', async () => {
    vi.stubGlobal('fetch', answer(409, { status: 'error', code: 'EMAIL_TAKEN', message: 'This email is already registered. Please log in.', errors: { email: 'This email is already registered. Please log in.' } }));
    expect(await accountCall('POST', '/register', {})).toMatchObject({ ok: false, status: 409, code: 'EMAIL_TAKEN', errors: { email: expect.stringMatching(/already registered/) } });
    vi.stubGlobal('fetch', answer(400, { status: 'error', code: 'CAPTCHA_FAILED', message: 'x', errors: { captcha: 'The security check didn’t match.' } }));
    expect((await accountCall('POST', '/login', {})).errors.captcha).toMatch(/security check/);
  });

  test('no connection: status 0 and not ok, never a crash', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => { throw new TypeError('Failed to fetch'); }));
    const r = await accountCall('POST', '/register', {});
    expect(r).toMatchObject({ ok: false, status: 0 });
  });

  test('an HTML error page (not JSON) is not ok and gives an empty message', async () => {
    vi.stubGlobal('fetch', answer(500, null, { json: false }));
    const r = await accountCall('POST', '/register', {});
    expect(r).toMatchObject({ ok: false, status: 500, message: '', row: {} });
  });

  test('GET sends no body and no Content-Type', async () => {
    vi.stubGlobal('fetch', answer(200, { status: 'success', message: '', data: { id: 'c1' } }));
    await accountCall('GET', '/captcha');
    expect(calls[0].init.body).toBeUndefined();
    expect(calls[0].init.headers['Content-Type']).toBeUndefined();
  });
});

describe('the login token', () => {
  test('a stored token is sent as Bearer', async () => {
    auth.setToken('abc.def.ghi');
    vi.stubGlobal('fetch', answer(200, { status: 'success', message: '', data: [] }));
    await apiRequest('POST', '/api/v1/me', {});
    expect(calls[0].init.headers.Authorization).toBe('Bearer abc.def.ghi');
  });

  test('a 401 or an expired token answer removes the stored token', async () => {
    auth.setToken('old');
    vi.stubGlobal('fetch', answer(401, { status: 'error', message: 'Unauthorized' }));
    await apiRequest('POST', '/api/v1/me', {});
    expect(auth.getToken()).toBe('');
    auth.setToken('old2');
    vi.stubGlobal('fetch', answer(404, { status: 'error', message: 'jwt expired' }));
    await apiRequest('POST', '/api/v1/me', {});
    expect(auth.getToken()).toBe('');
  });

  test('a mail error (502) does not sign the person out', async () => {
    auth.setToken('keep');
    vi.stubGlobal('fetch', answer(502, { status: 'error', message: 'We couldn’t send the email just now.', data: [] }));
    await apiRequest('POST', '/api/v1/account/resend-verification', {});
    expect(auth.getToken()).toBe('keep');
  });
});

describe('back from a social sign-in (issue #47)', () => {
  test('the token is read from "#social-token=…"', () => {
    expect(socialTokenFromHash('#social-token=abc.def.ghi')).toBe('abc.def.ghi');
    expect(socialTokenFromHash('#social-token=a%2Eb%2Ec')).toBe('a.b.c');
    expect(socialTokenFromHash('#x=1&social-token=tok')).toBe('tok');
  });

  test('no token, another hash, or a broken one gives ""', () => {
    expect(socialTokenFromHash('')).toBe('');
    expect(socialTokenFromHash(undefined)).toBe('');
    expect(socialTokenFromHash('#/about-us/')).toBe('');
    expect(socialTokenFromHash('#not-social-token=tok')).toBe('');
    expect(socialTokenFromHash('#social-token=%E0%A4%A')).toBe('');
  });

  test('"/?verifyemail=…" goes to the join page that offers Resend', () => {
    expect(socialReturnTarget('?verifyemail=a%40example.com')).toBe('/join/?verifyemail=a%40example.com');
    expect(socialReturnTarget('?verifyemail=%20a@example.com%20')).toBe('/join/?verifyemail=a%40example.com');
  });

  test('"/?signup=1&…" goes to /join with only the name and email fields', () => {
    const to = socialReturnTarget('?signup=1&given_name=Neha&family_name=Rao&email=n%40example.com&token=SECRET&role=admin');
    const u = new URL(to, 'https://x');
    expect(u.pathname).toBe('/join/');
    expect(Object.fromEntries(u.searchParams)).toEqual({ given_name: 'Neha', family_name: 'Rao', email: 'n@example.com' });
    expect(socialReturnTarget('?signup=1')).toBe('/join/');
  });

  test('a referral code is kept on the way to sign-up', () => {
    expect(socialReturnTarget('?signup=1&ref=FRIEND1')).toBe('/join/?ref=FRIEND1');
  });

  test('any other address is not a social return', () => {
    expect(socialReturnTarget('')).toBe('');
    expect(socialReturnTarget('?utm_source=mail')).toBe('');
  });
});

describe('social sign-in buttons', () => {
  test('only providers with an https link become buttons', async () => {
    vi.stubGlobal('fetch', answer(200, { status: 'success', data: [
      { name: 'Google', authUrl: ' https://signon.example/google ' },
      { name: 'LinkedIn', authUrl: 'http://signon.example/linkedin' },
      { name: 'Evil', authUrl: 'javascript:alert(1)' },
      { name: '', authUrl: 'https://signon.example/x' },
      null,
    ] }));
    expect(await loadProviders()).toEqual([{ name: 'Google', authUrl: 'https://signon.example/google' }]);
  });

  test('no buttons when social sign-on is off or unreachable', async () => {
    vi.stubGlobal('fetch', answer(404, { status: 'error', message: 'Social signon is not allowed' }));
    expect(await loadProviders()).toEqual([]);
    vi.stubGlobal('fetch', vi.fn(async () => { throw new TypeError('offline'); }));
    expect(await loadProviders()).toEqual([]);
  });
});

describe('email field', () => {
  test.each([
    ['', /enter your email/],
    ['   ', /enter your email/],
    ['asha', /does not look right/],
    ['asha@example', /does not look right/],
    ['asha @example.com', /does not look right/],
  ])('"%s" is refused', (v, msg) => { expect(validateEmail(v)).toMatch(msg); });

  test.each(['asha@example.com', ' Asha.Rao+mho@Example.co.in '])('"%s" is accepted', (v) => { expect(validateEmail(v)).toBe(''); });
});

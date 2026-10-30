// Production API client. Endpoints and payloads are documented in docs/02-API-SPEC.md and docs/openapi.yaml.
// Every method resolves to a plain object; network/server failures throw ApiError.

export class ApiError extends Error {
  constructor(message, { status = 0, code = 'network_error', data = null } = {}) {
    super(message);
    this.status = status; this.code = code; this.data = data;
  }
}

export function createHttpApi({ baseUrl = '/api', csrfToken, fetchImpl } = {}) {
  const doFetch = fetchImpl || ((...a) => fetch(...a));
  const token = () => csrfToken || document.querySelector('meta[name="csrf-token"]')?.content || '';

  async function call(method, path, body) {
    let res;
    try {
      res = await doFetch(`${baseUrl}${path}`, {
        method,
        credentials: 'include',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-CSRF-Token': token() },
        body: body ? JSON.stringify(body) : undefined,
      });
    } catch (e) {
      throw new ApiError('We could not reach the server. Check your connection and try again.');
    }
    let data = null;
    try { data = await res.json(); } catch { /* empty body */ }
    if (!res.ok) throw new ApiError(data?.message || 'Something went wrong. Please try again.', { status: res.status, code: data?.error || 'server_error', data });
    return data;
  }

  return {
    mode: 'http',
    /** -> { status: 'active'|'hold'|'deactivated'|'deleted', days?, deactivatedUntil? } */
    getAccountStatus: () => call('GET', '/account/status'),
    /** -> request | null */
    getCurrentRequest: () => call('GET', '/account/requests/current'),
    /**
     * -> { ok: true, token } on success
     * -> { ok: false, error: 'incorrect_password', attemptsRemaining }
     * -> { ok: false, error: 'too_many_attempts', retryAfter }
     */
    async verifyPassword(password) {
      try {
        const d = await call('POST', '/account/verify-password', { password });
        return { ok: true, token: d.verificationToken };
      } catch (e) {
        if (e.status === 401) return { ok: false, error: 'incorrect_password', attemptsRemaining: e.data?.attemptsRemaining };
        if (e.status === 429) return { ok: false, error: 'too_many_attempts', retryAfter: e.data?.retryAfter ?? 60 };
        throw e;
      }
    },
    /** -> request { id, action, status, submittedAt, history } */
    createRequest: (action, verificationToken) =>
      call('POST', '/account/requests', { action, verificationToken, confirmed: true }),
    /** -> request */
    cancelRequest: (id) => call('POST', `/account/requests/${encodeURIComponent(id)}/cancel`),
  };
}

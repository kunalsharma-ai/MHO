import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react';
import { KEY_BY_API, TERMINAL } from '../config/actions.js';

const AccountCtx = createContext(null);
export const useAccount = () => useContext(AccountCtx);

const initial = { loading: true, error: null, account: { status: 'active', days: 0 }, request: null };

function reducer(s, a) {
  switch (a.type) {
    case 'loaded': return { ...s, loading: false, error: null, account: a.account || s.account, request: a.request ?? null };
    case 'error': return { ...s, loading: false, error: a.error };
    case 'request': return { ...s, request: a.request };
    case 'account': return { ...s, account: a.account };
    default: return s;
  }
}

/** Loads account status + current request from the API and exposes the actions the UI needs. */
export function AccountProvider({ api, user, children }) {
  const [state, dispatch] = useReducer(reducer, initial);

  const refresh = useCallback(async () => {
    try {
      const [account, request] = await Promise.all([api.getAccountStatus(), api.getCurrentRequest()]);
      dispatch({ type: 'loaded', account, request });
    } catch (e) {
      dispatch({ type: 'error', error: e.message || 'Could not load your account.' });
    }
  }, [api]);

  useEffect(() => { refresh(); }, [refresh]);

  const submit = useCallback(async (key, token, apiAction) => {
    const req = await api.createRequest(apiAction, token);
    dispatch({ type: 'request', request: req });
    return req;
  }, [api]);

  const cancel = useCallback(async (id) => {
    const req = await api.cancelRequest(id);
    dispatch({ type: 'request', request: req });
    return req;
  }, [api]);

  // Preview-only Support simulation (mock API)
  const dev = useMemo(() => {
    if (!api.dev) return null;
    const sync = () => { const s = api.dev.snapshot(); dispatch({ type: 'loaded', account: s.account, request: s.request }); return s; };
    return {
      password: api.dev.password,
      setAccountStatus: (st) => { api.dev.setAccountStatus(st); return sync(); },
      advance: () => { api.dev.advance(); return sync(); },
      markUnable: () => { api.dev.markUnable(); return sync(); },
      reset: () => { api.dev.reset(); return sync(); },
    };
  }, [api]);

  const request = state.request;
  const requestKey = request ? KEY_BY_API[request.action] : null;
  const pending = !!request && !TERMINAL.includes(request.status);

  const value = useMemo(() => ({ ...state, user, requestKey, pending, refresh, submit, cancel, verifyPassword: api.verifyPassword, dev }),
    [state, user, requestKey, pending, refresh, submit, cancel, api, dev]);

  return <AccountCtx.Provider value={value}>{children}</AccountCtx.Provider>;
}

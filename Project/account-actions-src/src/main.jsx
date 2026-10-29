// Standalone mount: reads window.MHO_CONFIG (set by the host page / server template).
import { createRoot } from 'react-dom/client';
import AccountActionsPage from './AccountActionsPage.jsx';
import { createHttpApi } from './services/httpApi.js';
import { createMockApi } from './services/mockApi.js';

const cfg = window.MHO_CONFIG || {};
const useMock = cfg.mock === true;
const api = useMock ? createMockApi() : createHttpApi({ baseUrl: cfg.apiBaseUrl || '/api', csrfToken: cfg.csrfToken });

const user = cfg.user || { name: 'Member', email: '', id: '' };

createRoot(document.getElementById(cfg.mountId || 'mho-account-actions')).render(
  <AccountActionsPage
    api={api}
    user={user}
    links={cfg.links}
    showDevTools={useMock}
    showInternalPreviews={useMock}
    theme={cfg.theme}
  />,
);

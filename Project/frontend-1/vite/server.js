// Dev-server and preview-server options, driven by optional DEV_* variables (see .env.example).
// DEV_* variables are deliberately NOT prefixed with VITE_, so they never reach the browser bundle.

const bool = (v) => ['1', 'true', 'yes', 'on'].includes(String(v ?? '').toLowerCase());
const list = (v) => String(v ?? '').split(',').map((s) => s.trim()).filter(Boolean);
const num = (v, fallback) => (Number.isFinite(Number(v)) && Number(v) > 0 ? Number(v) : fallback);

/** Options shared by `vite` (dev) and `vite preview`. */
function common(env, defaultPort) {
  return {
    // true = listen on 0.0.0.0, so Docker / WSL / other devices can reach the server (localhost-only otherwise).
    host: env.DEV_HOST || true,
    port: num(env.DEV_PORT, defaultPort),
    // Behind a gateway/reverse proxy the Host header differs from "localhost"; list the names in
    // DEV_ALLOWED_HOSTS (comma separated). Unset = any host (development convenience only).
    allowedHosts: env.DEV_ALLOWED_HOSTS ? list(env.DEV_ALLOWED_HOSTS) : true,
  };
}

export function devServerOptions(env) {
  const hmrPort = num(env.DEV_HMR_CLIENT_PORT, 0);
  return {
    ...common(env, 5173),
    // Docker publishes a fixed port, so fail loudly instead of silently moving to another one.
    strictPort: bool(env.DEV_STRICT_PORT),
    // Bind mounts on Docker Desktop / WSL do not emit file events: set DEV_USE_POLLING=true for hot reload.
    watch: bool(env.DEV_USE_POLLING) ? { usePolling: true, interval: 300 } : undefined,
    // Browser-side websocket port when the dev server is published/proxied on a different port.
    hmr: hmrPort ? { clientPort: hmrPort } : undefined,
    // Optional: forward /api/* to a backend (e.g. DEV_API_PROXY=http://localhost:8080) to avoid CORS in dev.
    proxy: env.DEV_API_PROXY ? { '/api': { target: env.DEV_API_PROXY, changeOrigin: true } } : undefined,
  };
}

export function previewServerOptions(env) {
  return common(env, 4173);
}

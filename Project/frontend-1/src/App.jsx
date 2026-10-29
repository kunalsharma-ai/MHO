import { useContext, useEffect, useReducer } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import { PAGE_ROUTES, PagesContext } from './router/pages.js';

// Renders a page from the registry. Prerendered/first pages are already loaded (no flash);
// later navigations show a light skeleton for the few ms the chunk takes to arrive.
function RoutePage({ name, props }) {
  const reg = useContext(PagesContext);
  const [, force] = useReducer((x) => x + 1, 0);
  const C = reg.get(name);
  useEffect(() => {
    if (!C) reg.load(name).then(force).catch(() => window.location.reload());
  }, [name, C, reg]);
  if (!C) return <div className="page-loading" role="status" aria-label="Loading page"><span /><span /><span /></div>;
  return <C {...props} />;
}

export default function App() {
  return (
    <Layout>
      <Routes>
        {PAGE_ROUTES.map((r) => (
          <Route key={r.path} path={r.path} element={<RoutePage key={r.path} name={r.page} props={r.props} />} />
        ))}
      </Routes>
    </Layout>
  );
}

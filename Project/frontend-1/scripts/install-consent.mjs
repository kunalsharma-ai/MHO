// Installs the three supplied consent packages (built dist/ folders) under public/consent/<segment>/ and wires each
// one to the MHO API, so the right document is shown after login and the signature is stored server-side.
//
//   node scripts/install-consent.mjs --healthcare <dist> --caregiver <dist> --patient <dist>
//
// The target folder must not exist yet (move an older install aside first); nothing is deleted by this script.
//
// What the patch does to each index.html:
//   - replaces the empty config line with a gate: no login → /login; wrong segment → that segment's page;
//     consent already valid → dashboard; otherwise fills window.MHO_*_CONSENT from GET /api/v1/me/consent
//     (member, version, submitUrl = POST /api/v1/me/consent with the login token, decline → record + log out)
//   - loads the app script only after the gate passed, and keeps the page hidden until then.
// The packages' own content (clauses, approvals, translations) is not touched.
import fs from 'node:fs';
import path from 'node:path';

const PAGES = {
  healthcare: { global: 'MHO_PRO_CONSENT', segment: 'hcp' },
  caregiver: { global: 'MHO_CARE_CONSENT', segment: 'caregiver' },
  patient: { global: 'MHO_PATIENT_CONSENT', segment: 'patient' },
};
const args = Object.fromEntries(process.argv.slice(2).reduce((a, v, i, all) => (v.startsWith('--') ? [...a, [v.slice(2), all[i + 1]]] : a), []));
const outRoot = path.resolve('public/consent');

const gate = ({ global, segment }) => `<script>
(function () {
  var KEY = ${JSON.stringify(global)}, SEG = ${JSON.stringify(segment)};
  window[KEY] = window[KEY] || {};
  document.documentElement.style.visibility = 'hidden';
  var token = '';
  try { token = localStorage.getItem('token') || ''; } catch (e) {}
  var toLogin = function () { location.replace('/login?next=' + encodeURIComponent(location.pathname)); return false; };
  var auth = { Authorization: 'Bearer ' + token, Accept: 'application/json' };
  window.__mhoConsentGate = !token ? Promise.resolve(toLogin()) : fetch('/api/v1/me/consent', { headers: auth, cache: 'no-store' })
    .then(function (r) { return r.json().then(function (j) { return { r: r, j: j }; }); })
    .then(function (x) {
      if (x.r.status === 401) { try { localStorage.removeItem('token'); } catch (e) {} return toLogin(); }
      var d = x.j && x.j.data;
      if (!d) { location.replace('/member/support'); return false; }
      if (d.segment !== SEG) { location.replace(d.page); return false; } // never show another segment's document
      if (d.status === 'valid') { location.replace(d.continueUrl); return false; }
      var c = window[KEY];
      c.member = { id: d.member.id, firstName: d.member.firstName, lastName: d.member.lastName };
      c.termsVersion = d.termsVersion;
      c.submitUrl = '/api/v1/me/consent';
      c.headers = { Authorization: 'Bearer ' + token };
      c.continueUrl = d.continueUrl;
      c.onDecline = function () {
        fetch('/api/v1/me/consent/decline', { method: 'POST', headers: Object.assign({ 'Content-Type': 'application/json' }, auth), body: '{}' })
          .catch(function () {})
          .then(function () { return fetch('/api/v1/me', { method: 'DELETE', headers: auth }).catch(function () {}); })
          .then(function () { try { localStorage.removeItem('token'); } catch (e) {} location.replace('/?consent=declined'); });
      };
      return true;
    })
    .catch(function () { document.documentElement.style.visibility = ''; return false; });
})();
</script>`;

const loader = (src) => `<script>
window.__mhoConsentGate.then(function (ok) {
  if (!ok) return;
  var s = document.createElement('script'); s.type = 'module'; s.src = ${JSON.stringify(src)};
  document.body.appendChild(s);
  document.documentElement.style.visibility = '';
});
</script>`;

for (const [name, page] of Object.entries(PAGES)) {
  const src = args[name];
  if (!src) continue;
  const out = path.join(outRoot, name);
  if (fs.existsSync(out)) throw new Error(`${out} already exists: move it aside first`);
  fs.cpSync(src, out, { recursive: true, filter: (f) => !/embed-example|\.(br|gz)$|llms\.txt/.test(f) });
  let html = fs.readFileSync(path.join(out, 'index.html'), 'utf8');
  const cfgLine = `<script>window.${page.global} = window.${page.global} || {};</script>`;
  if (!html.includes(cfgLine)) throw new Error(`${name}: config line not found`);
  html = html.replace(cfgLine, gate(page));
  const m = html.match(/<script type="module" src="([^"]+)"><\/script>/);
  if (!m) throw new Error(`${name}: app script not found`);
  html = html.replace(m[0], loader(m[1]));
  html = html.replace(/<link rel="modulepreload"[^>]*>/g, '');
  fs.writeFileSync(path.join(out, 'index.html'), html);
  console.log(`installed ${name} → ${path.relative(process.cwd(), out)}`);
}

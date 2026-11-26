#!/usr/bin/env node
// Builds the three "My Profile" section packages and puts them where the member area loads them from:
//   <out>/hcp/        mho-hcp-section.js + .css, data/, locales/, images/, fonts/     (window.MHOProfileSection)
//   <out>/caregiver/  mho-profile-section.js + .css, data/, images/, fonts/          (window.MHOProfileSection)
//   <out>/patient/    embed/mho-patient-section.js, data/, images/, fonts/, config.js (window.MHOPatient)
// The web app serves <out> as /mho-sections (web/src/app/member/components/ProfileSection.jsx).
//
//   node Project/sections/tools/build-for-web.mjs [out]      out defaults to Project/web/public/mho-sections
//
// Each package needs its own node_modules (npm install) and its public/ folder (data, images, fonts), which is in git.
// If a bundle is missing the member area shows "Your panel's profile section could not be loaded" (Kunal, 2026-11-26).
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import url from "node:url";

const HERE = path.dirname(url.fileURLToPath(import.meta.url));
const SECTIONS = path.resolve(HERE, "..");
const OUT = path.resolve(process.argv[2] || path.join(SECTIONS, "..", "web", "public", "mho-sections"));

const PACKAGES = [
  { name: "hcp", build: ["scripts/build-embed.mjs"], from: "dist-embed", must: ["mho-hcp-section.js", "mho-hcp-section.css", "data", "locales"] },
  { name: "caregiver", build: ["scripts/build-embed.mjs"], from: "dist-embed", must: ["mho-profile-section.js", "mho-profile-section.css", "data"] },
  { name: "patient", build: ["scripts/build.mjs"], from: "dist", must: ["embed/mho-patient-section.js", "data", "config.js"] },
];

for (const p of PACKAGES) {
  const dir = path.join(SECTIONS, p.name);
  if (!fs.existsSync(path.join(dir, "public"))) throw new Error(`${p.name}: public/ is missing (data, images and fonts the section loads)`);
  if (!fs.existsSync(path.join(dir, "node_modules"))) execFileSync("npm", ["install", "--no-audit", "--no-fund", "--ignore-scripts"], { cwd: dir, stdio: "inherit" });
  execFileSync(process.execPath, p.build, { cwd: dir, stdio: "inherit" });
  const src = path.join(dir, p.from);
  for (const f of p.must) if (!fs.existsSync(path.join(src, f))) throw new Error(`${p.name}: the build did not write ${f}`);
  const dst = path.join(OUT, p.name);
  fs.rmSync(dst, { recursive: true, force: true });
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  fs.cpSync(src, dst, { recursive: true });
  console.log(`✔ ${p.name} → ${path.relative(process.cwd(), dst) || dst}`);
}

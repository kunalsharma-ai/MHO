#!/usr/bin/env python3
"""Generates the glossy pseudo-3D illustrations in public/images (profiles, hero objects, vault).
Hand-tunable: each drawing is a small SVG string below. Run: python3 scripts/gen_svgs.py"""
import os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "public", "images")
os.makedirs(os.path.join(OUT, "profiles"), exist_ok=True)
os.makedirs(os.path.join(OUT, "hero"), exist_ok=True)

def svg(body, defs="", vb="0 0 160 160", title=""):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}" role="img">'
            f'<title>{title}</title><defs>{defs}'
            '<filter id="sh" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="4"/></filter>'
            '<radialGradient id="gl" cx="35%" cy="25%" r="60%"><stop offset="0" stop-color="#fff" stop-opacity=".85"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>'
            f'</defs><ellipse cx="80" cy="146" rx="46" ry="7" fill="#000" opacity=".18" filter="url(#sh)"/>{body}</svg>')

def lg(id_, a, b, x2="1", y2="1"):
    return f'<linearGradient id="{id_}" x1="0" y1="0" x2="{x2}" y2="{y2}"><stop offset="0" stop-color="{a}"/><stop offset="1" stop-color="{b}"/></linearGradient>'

P = {}
P["basic"] = svg(
    '<rect x="26" y="40" width="112" height="80" rx="16" fill="#b3123f" transform="translate(4 6)"/>'
    '<rect x="26" y="40" width="112" height="80" rx="16" fill="url(#a)"/>'
    '<circle cx="56" cy="72" r="14" fill="#fff" opacity=".95"/><path d="M38 104c3-12 33-12 36 0" fill="#fff" opacity=".95"/>'
    '<rect x="82" y="62" width="42" height="7" rx="3.5" fill="#fff" opacity=".9"/><rect x="82" y="76" width="30" height="7" rx="3.5" fill="#fff" opacity=".7"/>'
    '<path d="M80 100h12l5-10 7 20 6-14 4 4h12" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>'
    '<ellipse cx="60" cy="52" rx="34" ry="8" fill="url(#gl)" opacity=".7"/>',
    lg("a", "#ff5d8a", "#ff2d55"), title="Basic profile")
P["professional-category"] = svg(
    '<path d="M30 60l50-26 50 26v70H30z" fill="#0d3fae" transform="translate(4 5)"/>'
    '<path d="M30 60l50-26 50 26v70H30z" fill="url(#a)"/>'
    '<rect x="66" y="96" width="28" height="34" rx="4" fill="#0b2f7f"/>'
    '<g fill="#fff" opacity=".9"><rect x="40" y="76" width="14" height="12" rx="3"/><rect x="106" y="76" width="14" height="12" rx="3"/><rect x="40" y="100" width="14" height="12" rx="3"/><rect x="106" y="100" width="14" height="12" rx="3"/></g>'
    '<circle cx="80" cy="68" r="16" fill="#fff"/><path d="M80 58v20M70 68h20" stroke="#ff3b5c" stroke-width="7" stroke-linecap="round"/>'
    '<ellipse cx="64" cy="54" rx="26" ry="6" fill="url(#gl)" opacity=".6"/>',
    lg("a", "#4c8dff", "#1f5bff"), title="Professional profile")
P["professional"] = svg(
    '<path d="M50 28v34a30 30 0 0 0 60 0V28" fill="none" stroke="#4b1aa8" stroke-width="12" stroke-linecap="round" transform="translate(3 4)"/>'
    '<path d="M50 28v34a30 30 0 0 0 60 0V28" fill="none" stroke="url(#a)" stroke-width="10" stroke-linecap="round"/>'
    '<path d="M80 92v14a20 20 0 0 0 40 0v-8" fill="none" stroke="url(#a)" stroke-width="9" stroke-linecap="round"/>'
    '<circle cx="120" cy="92" r="15" fill="#4b1aa8" transform="translate(2 3)"/><circle cx="120" cy="92" r="15" fill="url(#b)"/><circle cx="120" cy="92" r="6" fill="#fff" opacity=".9"/>'
    '<circle cx="50" cy="26" r="7" fill="#e3d4ff"/><circle cx="110" cy="26" r="7" fill="#e3d4ff"/>'
    '<ellipse cx="114" cy="85" rx="8" ry="4" fill="url(#gl)"/>',
    lg("a", "#b07aff", "#6a2cff") + lg("b", "#d9b8ff", "#7a3cff"), title="Speciality")
P["educational"] = svg(
    '<path d="M80 36l60 26-60 26-60-26z" fill="#9a5b00" transform="translate(0 6)"/>'
    '<path d="M80 36l60 26-60 26-60-26z" fill="url(#a)"/>'
    '<path d="M48 76v24c0 10 64 10 64 0V76l-32 14z" fill="url(#b)"/>'
    '<path d="M134 64v34" stroke="#ffd85a" stroke-width="4"/><circle cx="134" cy="102" r="6" fill="#ff9f1a"/>'
    '<rect x="22" y="112" width="70" height="20" rx="10" fill="#fff6dc" stroke="#e7b84a" stroke-width="3"/><circle cx="84" cy="122" r="7" fill="#ff5d5d"/>'
    '<ellipse cx="70" cy="52" rx="30" ry="6" fill="url(#gl)" opacity=".7"/>',
    lg("a", "#3b3b58", "#1b1b2f") + lg("b", "#ffb72b", "#f08a00"), title="Education")
P["experience"] = svg(
    '<path d="M58 20h18l10 40H68zM102 20H84l-10 40h18z" fill="url(#r)"/>'
    '<circle cx="80" cy="92" r="38" fill="#a8430a" transform="translate(3 4)"/><circle cx="80" cy="92" r="38" fill="url(#a)"/>'
    '<circle cx="80" cy="92" r="28" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="3"/>'
    '<path d="M80 72l6 13 14 2-10 10 2 14-12-7-12 7 2-14-10-10 14-2z" fill="#fff"/>'
    '<ellipse cx="66" cy="72" rx="16" ry="8" fill="url(#gl)"/>',
    lg("a", "#ffb36b", "#ff5e00") + lg("r", "#3c82ff", "#1748c9"), title="Experience")
P["professional-address"] = svg(
    '<path d="M20 112l38-14 44 14 38-14v34l-38 14-44-14-38 14z" fill="url(#m)"/>'
    '<path d="M58 98v34M102 112v34" stroke="#0b6b60" stroke-opacity=".4" stroke-width="2"/>'
    '<path d="M80 22a30 30 0 0 0-30 30c0 24 30 54 30 54s30-30 30-54a30 30 0 0 0-30-30z" fill="#00695d" transform="translate(3 4)"/>'
    '<path d="M80 22a30 30 0 0 0-30 30c0 24 30 54 30 54s30-30 30-54a30 30 0 0 0-30-30z" fill="url(#a)"/>'
    '<circle cx="80" cy="52" r="12" fill="#fff"/><ellipse cx="68" cy="36" rx="12" ry="6" fill="url(#gl)"/>',
    lg("a", "#2ee6c8", "#00a693") + lg("m", "#d6fff7", "#8ee9da"), title="Address")
P["technical"] = svg(
    '<rect x="30" y="32" width="100" height="68" rx="10" fill="#065a70" transform="translate(3 4)"/>'
    '<rect x="30" y="32" width="100" height="68" rx="10" fill="url(#a)"/>'
    '<rect x="38" y="40" width="84" height="52" rx="5" fill="#04263a"/>'
    '<path d="M44 68h16l6-12 9 24 8-18 5 6h18" fill="none" stroke="#6ff0ff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>'
    '<path d="M18 106h124l-10 14H28z" fill="url(#b)"/><ellipse cx="62" cy="46" rx="22" ry="5" fill="url(#gl)" opacity=".5"/>',
    lg("a", "#2bc4e6", "#0a7ea3") + lg("b", "#c9f6ff", "#7cc9da"), title="Technology")
P["survey-participation"] = svg(
    '<path d="M22 40h76a12 12 0 0 1 12 12v32a12 12 0 0 1-12 12H56l-18 16v-16H22a12 12 0 0 1-12-12V52a12 12 0 0 1 12-12z" fill="url(#a)"/>'
    '<g fill="#fff"><circle cx="40" cy="68" r="6"/><circle cx="60" cy="68" r="6"/><circle cx="80" cy="68" r="6"/></g>'
    '<path d="M86 76h52a10 10 0 0 1 10 10v26a10 10 0 0 1-10 10h-8v14l-16-14H86a10 10 0 0 1-10-10V86a10 10 0 0 1 10-10z" fill="url(#b)"/>'
    '<path d="M96 98l8 8 16-16" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>'
    '<ellipse cx="44" cy="48" rx="22" ry="5" fill="url(#gl)" opacity=".7"/>',
    lg("a", "#ff6fb5", "#e0267d") + lg("b", "#a46bff", "#6b2cff"), title="Survey participation")
P["documents"] = svg(
    '<rect x="26" y="26" width="76" height="98" rx="10" fill="#fff" stroke="#bfe9d6" stroke-width="3"/>'
    '<g fill="#bfe9d6"><rect x="38" y="44" width="50" height="6" rx="3"/><rect x="38" y="58" width="40" height="6" rx="3"/><rect x="38" y="72" width="46" height="6" rx="3"/></g>'
    '<path d="M104 54l34 12v22c0 22-16 36-34 42-18-6-34-20-34-42V66z" fill="#03784f" transform="translate(3 4)"/>'
    '<path d="M104 54l34 12v22c0 22-16 36-34 42-18-6-34-20-34-42V66z" fill="url(#a)"/>'
    '<path d="M90 92l10 10 20-22" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>'
    '<ellipse cx="96" cy="66" rx="16" ry="6" fill="url(#gl)"/>',
    lg("a", "#3fe0a0", "#05a36b"), title="Documents")
P["social-media"] = svg(
    '<g><ellipse cx="62" cy="118" rx="30" ry="10" fill="#a87100"/><rect x="32" y="100" width="60" height="18" fill="#c98a00"/><ellipse cx="62" cy="100" rx="30" ry="10" fill="url(#a)"/></g>'
    '<g><ellipse cx="62" cy="96" rx="30" ry="10" fill="#a87100"/><rect x="32" y="80" width="60" height="16" fill="#c98a00"/><ellipse cx="62" cy="80" rx="30" ry="10" fill="url(#a)"/><text x="62" y="85" font-size="14" font-family="Arial" font-weight="700" text-anchor="middle" fill="#8a5a00">$</text></g>'
    '<path d="M118 40c-8-12-28-6-24 10 3 10 24 24 24 24s21-14 24-24c4-16-16-22-24-10z" fill="url(#b)"/>'
    '<ellipse cx="108" cy="44" rx="8" ry="4" fill="url(#gl)"/><circle cx="130" cy="96" r="12" fill="#1f6bff"/><path d="M126 96h8M130 92v8" stroke="#fff" stroke-width="3" stroke-linecap="round"/>',
    lg("a", "#ffe45c", "#ffb800") + lg("b", "#ff6f91", "#ff2d55"), title="Rewards")
P["additional-details"] = svg(
    '<g stroke="#7d8cff" stroke-width="5" stroke-linecap="round"><path d="M80 80L44 52M80 80l40-24M80 80l-6 44M80 80l42 30"/></g>'
    '<circle cx="80" cy="80" r="20" fill="url(#a)"/><circle cx="44" cy="52" r="13" fill="url(#b)"/><circle cx="120" cy="56" r="15" fill="url(#c)"/>'
    '<circle cx="74" cy="124" r="11" fill="url(#c)"/><circle cx="122" cy="110" r="12" fill="url(#b)"/>'
    '<ellipse cx="74" cy="72" rx="8" ry="5" fill="url(#gl)"/><ellipse cx="114" cy="50" rx="6" ry="3" fill="url(#gl)"/>',
    lg("a", "#7d74ff", "#3b2fd6") + lg("b", "#5ff0ff", "#0bb5d6") + lg("c", "#ff8ad8", "#e0267d"), title="Additional details")

for k, v in P.items():
    open(os.path.join(OUT, "profiles", f"{k}.svg"), "w").write(v)

H = {}
H["capsule"] = svg(
    '<g transform="rotate(-35 80 80)"><rect x="30" y="56" width="100" height="48" rx="24" fill="url(#a)"/>'
    '<path d="M80 56h26a24 24 0 0 1 0 48H80z" fill="url(#b)"/><rect x="40" y="62" width="80" height="10" rx="5" fill="#fff" opacity=".55"/></g>',
    lg("a", "#ff6b8b", "#e11d48", "0", "1") + lg("b", "#ffffff", "#cfd8e6", "0", "1"), title="Capsule")
H["cross"] = svg(
    '<path d="M60 24h40v36h36v40h-36v36H60v-36H24V60h36z" fill="#0b8f80" transform="translate(4 5)"/>'
    '<path d="M60 24h40v36h36v40h-36v36H60v-36H24V60h36z" fill="url(#a)"/><ellipse cx="74" cy="40" rx="14" ry="8" fill="url(#gl)"/>',
    lg("a", "#4ff5de", "#0aa89b"), title="Medical cross")
H["heart"] = svg(
    '<path d="M80 136S20 98 20 58c0-22 18-36 36-36 12 0 20 6 24 14 4-8 12-14 24-14 18 0 36 14 36 36 0 40-60 78-60 78z" fill="url(#a)"/>'
    '<path d="M34 72h22l8-16 12 32 10-24 6 8h34" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>'
    '<ellipse cx="54" cy="44" rx="16" ry="9" fill="url(#gl)"/>',
    lg("a", "#ff9a5a", "#ff2d55"), title="Heart")
H["dna"] = svg(
    ''.join(f'<line x1="{58+22*__import__("math").sin(i*0.7)}" y1="{20+i*10}" x2="{102-22*__import__("math").sin(i*0.7)}" y2="{20+i*10}" stroke="#9bb8ff" stroke-width="4" stroke-linecap="round" opacity=".8"/>' for i in range(13))
    + '<path d="' + 'M' + ' L'.join(f'{80+22*__import__("math").sin(i*0.35)},{20+i*5}' for i in range(25)) + '" fill="none" stroke="url(#a)" stroke-width="8" stroke-linecap="round"/>'
    + '<path d="' + 'M' + ' L'.join(f'{80-22*__import__("math").sin(i*0.35)},{20+i*5}' for i in range(25)) + '" fill="none" stroke="url(#b)" stroke-width="8" stroke-linecap="round"/>',
    lg("a", "#7d74ff", "#22d3ee", "0", "1") + lg("b", "#ff6fb5", "#ffb36b", "0", "1"), title="DNA")
H["stethoscope"] = P["professional"].replace('<title>Speciality</title>', '<title>Stethoscope</title>')
H["microscope"] = svg(
    '<rect x="40" y="128" width="84" height="10" rx="5" fill="url(#b)"/><path d="M60 128c0-20 14-34 34-34" fill="none" stroke="url(#b)" stroke-width="9" stroke-linecap="round"/>'
    '<g transform="rotate(-30 88 60)"><rect x="76" y="20" width="24" height="70" rx="8" fill="url(#a)"/><rect x="72" y="86" width="32" height="10" rx="4" fill="#22304d"/><rect x="80" y="24" width="6" height="56" rx="3" fill="#fff" opacity=".45"/></g>'
    '<rect x="64" y="104" width="44" height="8" rx="4" fill="#22304d"/>',
    lg("a", "#7cc4ff", "#2f6bff") + lg("b", "#5a6b8c", "#2a3550"), title="Microscope")
for k, v in H.items():
    open(os.path.join(OUT, "hero", f"{k}.svg"), "w").write(v)

vault = svg(
    '<rect x="58" y="14" width="44" height="12" rx="6" fill="#c9d4e8"/>'
    '<path d="M62 26h36v86a18 18 0 0 1-36 0z" fill="#ffffff" fill-opacity=".25" stroke="#c9d4e8" stroke-width="3"/>'
    '<path d="M64 70h32v42a16 16 0 0 1-32 0z" fill="url(#a)"/><circle cx="74" cy="96" r="4" fill="#fff" opacity=".7"/><circle cx="86" cy="84" r="3" fill="#fff" opacity=".6"/>',
    lg("a", "#ffe45c", "#ff8a00", "0", "1"), title="Reward vial")
open(os.path.join(OUT, "vault.svg"), "w").write(vault)
print("ok", len(P), len(H))

# ---- inline copies of the hero objects (ids namespaced) so they are painted without extra requests
import re, json
inline = {}
for k, v in H.items():
    s = v
    ids = set(re.findall(r'id="([^"]+)"', s))
    for i in ids:
        s = s.replace(f'id="{i}"', f'id="{k}-{i}"').replace(f'url(#{i})', f'url(#{k}-{i})')
    s = re.sub(r'<title>.*?</title>', '', s).replace(' role="img"', ' aria-hidden="true" focusable="false"')
    inline[k] = s
with open(os.path.join(ROOT, "src", "data", "heroArt.js"), "w") as f:
    f.write("// Generated by scripts/gen_svgs.py — inline hero objects (ids namespaced). Do not edit by hand.\n")
    f.write("export const HERO_ART = " + json.dumps(inline, indent=1) + ";\n")
print("inline hero art written")

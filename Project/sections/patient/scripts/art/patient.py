"""3D "glass orb" illustrations for the 25 patient profiles (200x200).

Each profile gets a glossy glass sphere tinted in its own palette, with a
floating 3D object inside it and a little orbit ring around it.

    python3 scripts/art/patient.py  →  public/images/profiles/*.svg
"""
import os, sys, json, math
sys.path.insert(0, os.path.dirname(__file__))
from lib import Art, shade

ROOT = os.path.join(os.path.dirname(__file__), '..', '..')
OUT = os.path.join(ROOT, 'public', 'images', 'profiles')
os.makedirs(OUT, exist_ok=True)
META = {p['id']: p for p in json.load(open(os.path.join(ROOT, 'public', 'data', 'patient.json')))['profiles']}

NAVY = '#0E3F5F'
SKIN = '#F2C29B'


def orb(a, p1, p2, p3):
    """glass sphere + glow + orbit ring (behind the object)"""
    a.add(f'<ellipse cx="100" cy="186" rx="54" ry="8" fill="{p1}" opacity=".28"/>')
    a.add(f'<circle cx="100" cy="98" r="94" fill="{a.rad("glow", [(0, p2, .45), (.7, p2, .12), (1, p2, 0)])}"/>')
    a.add(f'<circle cx="100" cy="98" r="76" fill="{a.rad("glass", [(0, "#ffffff", .95), (.35, p3, .9), (.78, p2, .85), (1, p1, .95)], .36, .3, .78)}"/>')
    a.add(f'<circle cx="100" cy="98" r="74.5" fill="none" stroke="#ffffff" stroke-opacity=".55" stroke-width="2"/>')
    a.add(f'<ellipse cx="100" cy="150" rx="46" ry="16" fill="{p3}" opacity=".45"/>')


def orb_front(a, p1, p2):
    """gloss highlight + orbit ring in front of the object"""
    a.add('<path d="M44 78 A60 60 0 0 1 104 34" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".7"/>')
    a.add('<circle cx="122" cy="34" r="3.5" fill="#fff" opacity=".8"/>')
    a.add(f'<ellipse cx="100" cy="112" rx="96" ry="22" transform="rotate(-16 100 112)" fill="none" stroke="#fff" stroke-opacity=".75" stroke-width="2.2" stroke-dasharray="120 18 6 18"/>')
    a.add(f'<circle cx="182" cy="84" r="6" fill="{a.grad(p2, "diag", .4, -.1)}" stroke="#fff" stroke-width="2"/>')
    a.add(f'<circle cx="20" cy="140" r="4.5" fill="{a.grad(p1, "diag", .4, -.1)}" stroke="#fff" stroke-width="1.6"/>')
    a.plus(168, 30, 2.2, '#F7B547')
    a.plus(28, 50, 1.6, '#ffffff')


def gloss(a, x, y, rx, ry, rot=-25, op=.5):
    a.add(f'<ellipse cx="{x}" cy="{y}" rx="{rx}" ry="{ry}" transform="rotate({rot} {x} {y})" fill="#ffffff" opacity="{op}"/>')


def drop_shadow(a, cx, cy, rx, op=.22):
    a.add(f'<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{rx * .2}" fill="{NAVY}" opacity="{op}"/>')


def heart_path(cx, cy, s):
    return (f'M{cx} {cy + 30 * s} C{cx - 34 * s} {cy + 8 * s} {cx - 40 * s} {cy - 6 * s} {cx - 40 * s} {cy - 16 * s} '
            f'C{cx - 40 * s} {cy - 30 * s} {cx - 28 * s} {cy - 38 * s} {cx - 18 * s} {cy - 38 * s} C{cx - 9 * s} {cy - 38 * s} {cx - 3 * s} {cy - 33 * s} {cx} {cy - 26 * s} '
            f'C{cx + 3 * s} {cy - 33 * s} {cx + 9 * s} {cy - 38 * s} {cx + 18 * s} {cy - 38 * s} C{cx + 28 * s} {cy - 38 * s} {cx + 40 * s} {cy - 30 * s} {cx + 40 * s} {cy - 16 * s} '
            f'C{cx + 40 * s} {cy - 6 * s} {cx + 34 * s} {cy + 8 * s} {cx} {cy + 30 * s}Z')


def capsule(a, cx, cy, l, w, rot, c1, c2):
    """two-tone pill"""
    a.add(f'<g transform="rotate({rot} {cx} {cy})">')
    r = w / 2
    a.add(f'<path d="M{cx - l / 2 + r} {cy - r} H{cx} V{cy + r} H{cx - l / 2 + r} A{r} {r} 0 0 1 {cx - l / 2 + r} {cy - r}Z" fill="{a.grad(c1, "v", .35, -.2)}"/>')
    a.add(f'<path d="M{cx} {cy - r} H{cx + l / 2 - r} A{r} {r} 0 0 1 {cx + l / 2 - r} {cy + r} H{cx}Z" fill="{a.grad(c2, "v", .35, -.2)}"/>')
    a.add(f'<rect x="{cx - l / 2 + r * .6}" y="{cy - r * .62}" width="{l - r * 1.2}" height="{r * .32}" rx="{r * .16}" fill="#fff" opacity=".55"/>')
    a.add('</g>')


def save(a, name):
    open(os.path.join(OUT, name + '.svg'), 'w').write(a.svg())


def make(pid, title, draw):
    p = META[pid]
    p1, p2, p3 = p['palette']
    a = Art(200, 200, title)
    orb(a, p1, p2, p3)
    draw(a, p1, p2, p3)
    orb_front(a, p1, p2)
    save(a, pid)


# ---------------------------------------------------------------------- objects
def basic(a, p1, p2, p3):
    drop_shadow(a, 98, 150, 46)
    a.add('<g transform="rotate(-8 96 104)">')
    a.add(f'<rect x="44" y="66" width="108" height="74" rx="14" fill="{shade(p1, -.25)}"/>')
    a.add(f'<rect x="42" y="62" width="108" height="74" rx="14" fill="#fff"/>')
    a.add(f'<path d="M42 76 a14 14 0 0 1 14 -14 h80 a14 14 0 0 1 14 14 v8 h-108z" fill="{a.grad(p1, "h", .15, -.1)}"/>')
    a.add(f'<circle cx="68" cy="108" r="16" fill="{a.grad(p3, "diag", .3, -.1)}"/>')
    a.add(f'<circle cx="68" cy="103" r="7" fill="{SKIN}"/><path d="M56 120 q12 -14 24 0" fill="{p2}"/><path d="M61 100 q7 -9 14 0 q-3 -4 -7 -4 q-4 0 -7 4z" fill="#3b2a24"/>')
    for i, w in enumerate((44, 34, 40)):
        a.add(f'<rect x="92" y="{96 + i * 12}" width="{w}" height="6.5" rx="3.2" fill="{p3 if i else shade(p2, .3)}"/>')
    a.add('</g>')
    a.add(f'<path d="M146 148 C132 128 126 118 126 108 C126 96 135 87 146 87 C157 87 166 96 166 108 C166 118 160 128 146 148Z" fill="{a.grad("#F2611B", "diag", .25, -.2)}"/><circle cx="146" cy="107" r="7.5" fill="#fff"/>')
    gloss(a, 139, 97, 5, 2.5)


def general_health(a, p1, p2, p3):
    drop_shadow(a, 100, 152, 44)
    for k in range(12):
        ang = k * 30
        a.add(f'<rect x="113" y="30" width="6" height="16" rx="3" fill="#FFC23A" transform="rotate({ang} 116 76)"/>')
    a.add(f'<circle cx="116" cy="76" r="28" fill="{a.rad("sun", [(0, "#FFF3B0", 1), (.6, "#FFC23A", 1), (1, "#F59E0B", 1)], .4, .35, .7)}"/>')
    a.add('<circle cx="107" cy="72" r="3" fill="#7a3d0a"/><circle cx="125" cy="72" r="3" fill="#7a3d0a"/><path d="M106 84 q10 9 20 0" stroke="#7a3d0a" stroke-width="3" fill="none" stroke-linecap="round"/>')
    a.add(f'<path d="M50 140 a22 22 0 0 1 6 -43 a28 28 0 0 1 52 -6 a20 20 0 0 1 32 22 a18 18 0 0 1 -6 27z" fill="#fff"/>')
    a.add(f'<path d="M50 140 h84 a18 18 0 0 0 6 -10 q-40 8 -96 -2 a22 22 0 0 0 6 12z" fill="{p3}"/>')
    a.add(f'<path d="{heart_path(80, 118, .42)}" fill="{a.grad("#F43F5E", "diag", .25, -.2)}"/>')


def conditions(a, p1, p2, p3):
    drop_shadow(a, 100, 152, 46)
    a.add(f'<rect x="56" y="56" width="74" height="92" rx="12" fill="{shade(p1, -.2)}"/><rect x="52" y="52" width="74" height="92" rx="12" fill="#fff"/>')
    a.add(f'<rect x="72" y="44" width="34" height="16" rx="6" fill="{a.grad(p1, "v", .2, -.2)}"/>')
    for i in range(4):
        a.add(f'<rect x="64" y="{74 + i * 15}" width="9" height="9" rx="2.5" fill="{p2 if i < 3 else p3}"/><rect x="78" y="{76 + i * 15}" width="{36 - i * 4}" height="5" rx="2.5" fill="{p3}"/>')
        if i < 3:
            a.add(f'<path d="M66 {78 + i * 15} l2.5 2.5 l4 -5" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round"/>')
    tube = a.grad('#1F2937', 'diag', .35, -.1)
    a.add(f'<path d="M118 58 C118 96 160 92 156 124 C152 150 120 150 122 126" fill="none" stroke="{tube}" stroke-width="7" stroke-linecap="round"/>')
    a.add(f'<path d="M110 50 q8 -10 16 0" stroke="{tube}" stroke-width="6" fill="none" stroke-linecap="round"/>')
    a.add(f'<circle cx="122" cy="128" r="15" fill="{a.grad("#CBD5E1", "diag", .4, -.25)}" stroke="#94A3B8" stroke-width="3"/><circle cx="122" cy="128" r="8" fill="{a.grad(p2, "diag", .3, -.2)}"/>')
    gloss(a, 117, 123, 4, 2)


def symptoms(a, p1, p2, p3):
    drop_shadow(a, 100, 154, 40)
    a.add('<g transform="rotate(28 100 100)">')
    a.add('<rect x="88" y="34" width="24" height="96" rx="12" fill="#fff" stroke="#CBD5E1" stroke-width="3"/>')
    a.add(f'<rect x="95" y="70" width="10" height="62" rx="5" fill="{a.grad("#EF4444", "h", .2, -.15)}"/>')
    a.add(f'<circle cx="100" cy="140" r="17" fill="{a.grad("#EF4444", "diag", .25, -.2)}" stroke="#fff" stroke-width="3"/>')
    for i in range(5):
        a.add(f'<rect x="112" y="{44 + i * 14}" width="{8 if i % 2 else 5}" height="2.5" rx="1.2" fill="#94A3B8"/>')
    gloss(a, 94, 134, 4, 2.5)
    a.add('</g>')
    for i, r in enumerate((20, 30, 40)):
        a.add(f'<path d="M{52 - i * 4} {70 + i * 2} a{r} {r} 0 0 0 0 {40 - i * 2}" fill="none" stroke="{p2}" stroke-width="4" stroke-linecap="round" opacity="{.9 - i * .25}"/>')


def personal_health(a, p1, p2, p3):
    drop_shadow(a, 100, 150, 46)
    a.add(f'<path d="{heart_path(100, 104, 1.15)}" fill="{shade(p1, -.25)}" transform="translate(0 4)"/>')
    a.add(f'<path d="{heart_path(100, 104, 1.15)}" fill="{a.lin("hg", [(0, "#FF5A6E"), (.55, "#F2611B"), (1, "#FFC23A")], False)}"/>')
    gloss(a, 72, 74, 13, 6)
    a.add('<g transform="rotate(-32 102 102)"><rect x="70" y="90" width="64" height="24" rx="12" fill="#FDE2C4" stroke="#F3C08F" stroke-width="2"/><rect x="92" y="90" width="20" height="24" fill="#F8CFA2"/>')
    for x in (96, 102, 108):
        for y in (96, 102, 108):
            a.add(f'<circle cx="{x}" cy="{y}" r="1.3" fill="#E2A26C"/>')
    a.add('</g>')
    a.add('<polyline points="56,128 74,128 80,118 88,138 96,120 102,128 120,128" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" opacity=".9"/>')


def treatment(a, p1, p2, p3):
    drop_shadow(a, 100, 154, 46)
    a.add('<g transform="rotate(-40 100 100)">')
    a.add('<rect x="66" y="84" width="76" height="30" rx="7" fill="#fff" stroke="#CBD5E1" stroke-width="3"/>')
    a.add(f'<rect x="72" y="90" width="44" height="18" rx="4" fill="{a.grad(p2, "v", .25, -.15)}" opacity=".9"/>')
    for i in range(5):
        a.add(f'<rect x="{78 + i * 10}" y="84" width="2.5" height="{10 if i % 2 else 6}" fill="#94A3B8"/>')
    a.add(f'<rect x="142" y="94" width="20" height="10" rx="3" fill="{a.grad("#94A3B8", "v", .3, -.2)}"/><rect x="160" y="84" width="8" height="30" rx="3" fill="{a.grad(p1, "v", .3, -.2)}"/>')
    a.add('<rect x="34" y="97" width="32" height="4" rx="2" fill="#CBD5E1"/><rect x="58" y="94" width="10" height="10" rx="2" fill="#E2E8F0"/>')
    gloss(a, 92, 92, 12, 2.5, 0)
    a.add('</g>')
    a.add(f'<path d="M60 128 q-8 12 0 18 q8 -6 0 -18z" fill="{a.grad(p2, "v", .3, -.2)}"/>')
    a.plus(140, 140, 2.6, p1)


def medication(a, p1, p2, p3):
    drop_shadow(a, 100, 154, 50)
    a.add(f'<rect x="48" y="96" width="80" height="50" rx="10" fill="#E2E8F0" transform="rotate(-10 88 121)"/>')
    a.add('<g transform="rotate(-10 88 121)">')
    a.add('<rect x="48" y="94" width="80" height="50" rx="10" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="2"/>')
    for i in range(3):
        for j in range(2):
            a.add(f'<ellipse cx="{64 + i * 24}" cy="{108 + j * 22}" rx="9" ry="7" fill="{a.grad("#FFFFFF", "diag", 0, -.12)}" stroke="#CBD5E1" stroke-width="1.5"/>')
            if (i + j) % 2 == 0:
                a.add(f'<ellipse cx="{64 + i * 24}" cy="{107 + j * 22}" rx="6" ry="4.5" fill="{a.grad(p3, "diag", 0, -.15)}"/>')
    a.add('</g>')
    capsule(a, 118, 72, 76, 28, -32, p1, '#FFFFFF')
    a.add(f'<circle cx="62" cy="68" r="17" fill="{a.grad(p2, "diag", .35, -.15)}"/><rect x="48" y="66" width="28" height="4" rx="2" fill="#fff" opacity=".7" transform="rotate(-20 62 68)"/>')
    gloss(a, 56, 61, 5, 2.5)


def providers(a, p1, p2, p3):
    drop_shadow(a, 100, 158, 48)
    a.add(f'<path d="M52 160 Q52 116 100 112 Q148 116 148 160Z" fill="#fff"/>')
    a.add(f'<path d="M86 114 L100 140 L114 114 Q108 112 100 112 Q92 112 86 114Z" fill="{a.grad(p2, "v", .2, -.1)}"/>')
    a.add('<path d="M84 115 L100 160 M116 115 L100 160" stroke="#E2E8F0" stroke-width="3"/>')
    a.add(f'<path d="M76 118 q-4 26 10 30 q10 2 10 -10" stroke="{NAVY}" stroke-width="3.5" fill="none" stroke-linecap="round"/><circle cx="96" cy="138" r="5" fill="#94A3B8"/>')
    a.add(f'<rect x="116" y="128" width="16" height="16" rx="3" fill="{a.grad(p1, "diag", .2, -.1)}"/><path d="M124 131v10M119 136h10" stroke="#fff" stroke-width="3"/>')
    a.add(f'<circle cx="100" cy="84" r="24" fill="{a.grad(SKIN, "diag", .15, -.1)}"/>')
    a.add('<path d="M76 82 Q74 56 100 56 Q126 56 124 82 Q118 68 104 68 Q88 70 76 82Z" fill="#3b2a24"/>')
    a.add('<circle cx="91" cy="86" r="2.6" fill="#2b1a26"/><circle cx="109" cy="86" r="2.6" fill="#2b1a26"/><path d="M93 96 q7 6 14 0" stroke="#7a2e3b" stroke-width="2.6" fill="none" stroke-linecap="round"/>')
    a.add('<circle cx="84" cy="94" r="3.5" fill="#ff7b8a" opacity=".45"/><circle cx="116" cy="94" r="3.5" fill="#ff7b8a" opacity=".45"/>')
    a.add(f'<path d="M78 66 Q100 50 122 66" stroke="#94A3B8" stroke-width="3" fill="none"/><circle cx="100" cy="58" r="8" fill="{a.grad("#E2E8F0", "diag", .3, -.25)}" stroke="#94A3B8" stroke-width="2"/>')


def diagnostics(a, p1, p2, p3):
    drop_shadow(a, 100, 156, 48)
    a.add(f'<rect x="58" y="142" width="84" height="12" rx="6" fill="{a.grad(NAVY, "v", .2, -.1)}"/>')
    a.add(f'<path d="M84 142 q-4 -14 10 -18 h24 q8 0 8 8 v10z" fill="{a.grad(p1, "v", .15, -.15)}"/>')
    a.add(f'<rect x="96" y="58" width="16" height="70" rx="6" fill="{a.grad(p1, "h", .2, -.2)}" transform="rotate(-22 104 93)"/>')
    a.add(f'<rect x="82" y="40" width="22" height="34" rx="6" fill="{a.grad("#334155", "h", .3, -.1)}" transform="rotate(-22 93 57)"/>')
    a.add(f'<rect x="100" y="116" width="40" height="8" rx="3" fill="{a.grad("#94A3B8", "v", .3, -.2)}"/>')
    a.add(f'<circle cx="62" cy="102" r="16" fill="{a.grad(p3, "diag", .3, -.05)}" stroke="#fff" stroke-width="3"/>')
    for x, y in ((57, 98), (66, 104), (60, 108)):
        a.add(f'<circle cx="{x}" cy="{y}" r="3" fill="{p2}"/>')
    gloss(a, 96, 70, 3, 9, -22, .45)


def devices(a, p1, p2, p3):
    drop_shadow(a, 100, 158, 40)
    a.add(f'<rect x="80" y="30" width="40" height="40" rx="10" fill="{a.grad("#334155", "v", .2, -.1)}"/><rect x="80" y="128" width="40" height="36" rx="10" fill="{a.grad("#334155", "v", .1, -.2)}"/>')
    a.add(f'<rect x="64" y="58" width="72" height="84" rx="22" fill="{a.grad("#1E293B", "diag", .25, -.15)}"/>')
    a.add(f'<rect x="71" y="65" width="58" height="70" rx="16" fill="{a.lin("scr", [(0, shade(p1, -.2)), (1, "#0B1220")])}"/>')
    a.add(f'<path d="{heart_path(100, 88, .28)}" fill="#F43F5E"/>')
    a.add(f'<polyline points="76,112 88,112 92,104 98,120 104,100 108,112 124,112" fill="none" stroke="{p2}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>')
    a.add('<text x="100" y="130" text-anchor="middle" font-family="Arial, sans-serif" font-weight="700" font-size="10" fill="#fff">72 bpm</text>')
    a.add(f'<rect x="136" y="86" width="6" height="16" rx="3" fill="{p2}"/>')
    gloss(a, 82, 72, 7, 3)


def hospital(a, p1, p2, p3):
    drop_shadow(a, 100, 156, 52)
    a.add(f'<rect x="48" y="84" width="104" height="66" rx="6" fill="{a.grad("#F8FAFC", "v", 0, -.08)}"/>')
    a.add(f'<rect x="74" y="50" width="52" height="100" rx="6" fill="#fff"/><rect x="74" y="50" width="52" height="12" rx="6" fill="{a.grad(p1, "h", .2, -.1)}"/>')
    a.add(f'<rect x="88" y="66" width="24" height="24" rx="5" fill="{a.grad(p2, "diag", .2, -.15)}"/><path d="M100 70v16M92 78h16" stroke="#fff" stroke-width="5" stroke-linecap="round"/>')
    for r in range(2):
        for c in range(2):
            a.add(f'<rect x="{56 + c * 0}" y="{96 + r * 22}" width="12" height="12" rx="2.5" fill="{p3}"/><rect x="{132}" y="{96 + r * 22}" width="12" height="12" rx="2.5" fill="{p3}"/>')
    for r in range(2):
        a.add(f'<rect x="{82}" y="{100 + r * 16}" width="12" height="10" rx="2" fill="{p3}"/><rect x="{106}" y="{100 + r * 16}" width="12" height="10" rx="2" fill="{p3}"/>')
    a.add(f'<rect x="90" y="132" width="20" height="18" rx="3" fill="{a.grad(NAVY, "v", .2, -.1)}"/>')


def insurance(a, p1, p2, p3):
    drop_shadow(a, 100, 158, 44)
    sh = 'M100 40 L146 56 V96 C146 124 126 146 100 156 C74 146 54 124 54 96 V56Z'
    a.add(f'<path d="{sh}" fill="{shade(p1, -.25)}" transform="translate(3 4)"/>')
    a.add(f'<path d="{sh}" fill="{a.lin("shg", [(0, p2), (1, p1)])}"/>')
    a.add('<path d="M100 52 L136 64 V96 C136 118 120 136 100 144 C80 136 64 118 64 96 V64Z" fill="#fff" opacity=".2"/>')
    a.add('<path d="M80 98 l14 14 l26 -28" stroke="#fff" stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round"/>')
    gloss(a, 78, 64, 10, 4, -20, .55)
    a.add(f'<circle cx="146" cy="132" r="15" fill="{a.grad("#FFC23A", "diag", .3, -.2)}" stroke="#E59E0B" stroke-width="2"/><text x="146" y="137" text-anchor="middle" font-family="Arial" font-weight="700" font-size="14" fill="#8a5300">$</text>')


def lifestyle(a, p1, p2, p3):
    drop_shadow(a, 100, 152, 50)
    for ang, col in ((-60, p1), (60, p1), (-30, shade(p1, .2)), (30, shade(p1, .2))):
        a.add(f'<path d="M100 132 C84 112 86 82 100 64 C114 82 116 112 100 132Z" fill="{a.grad(col, "v", .3, -.15)}" transform="rotate({ang} 100 132)"/>')
    a.add(f'<path d="M100 134 C82 112 84 76 100 54 C116 76 118 112 100 134Z" fill="{a.grad(p2, "v", .35, -.1)}"/>')
    a.add(f'<path d="M100 132 C96 112 96 86 100 66" stroke="#fff" stroke-width="2" opacity=".6" fill="none"/>')
    a.add(f'<ellipse cx="100" cy="138" rx="46" ry="9" fill="{a.grad(p1, "v", .1, -.25)}"/>')
    a.add(f'<circle cx="100" cy="56" r="6" fill="#FFC23A"/>')
    for i, (x, y) in enumerate(((58, 70), (144, 66), (150, 108))):
        a.add(f'<circle cx="{x}" cy="{y}" r="{4 - i * .6}" fill="#fff" opacity=".9"/>')


def food(a, p1, p2, p3):
    drop_shadow(a, 100, 156, 52)
    a.add(f'<circle cx="74" cy="92" r="14" fill="{a.grad("#EF4444", "diag", .3, -.2)}"/><circle cx="92" cy="80" r="12" fill="{a.grad("#F97316", "diag", .3, -.2)}"/>')
    for x, y, r in ((106, 84, 16), (124, 92, 14), (88, 98, 13), (116, 104, 12)):
        a.add(f'<circle cx="{x}" cy="{y}" r="{r}" fill="{a.grad(p2, "diag", .25, -.2)}"/>')
    a.add(f'<ellipse cx="136" cy="84" rx="11" ry="6" fill="#FDE047" transform="rotate(-30 136 84)"/>')
    a.add(f'<path d="M44 100 H156 C156 132 132 150 100 150 C68 150 44 132 44 100Z" fill="{a.grad("#FFFFFF", "v", 0, -.12)}"/>')
    a.add(f'<path d="M44 100 H156 C156 106 155 110 153 114 H47 C45 110 44 106 44 100Z" fill="{p3}"/>')
    a.add(f'<path d="M58 116 Q100 126 142 116" stroke="{p1}" stroke-width="3" fill="none" opacity=".5"/>')
    a.add(f'<path d="M150 58 q-2 -10 8 -12 q2 10 -8 12z" fill="{p1}"/><circle cx="146" cy="72" r="13" fill="{a.grad("#EF4444", "diag", .3, -.2)}"/>')
    gloss(a, 140, 66, 4, 2)


def decisions(a, p1, p2, p3):
    drop_shadow(a, 100, 158, 44)
    gold = a.grad(p2, 'h', .25, -.2)
    a.add(f'<rect x="96" y="54" width="8" height="92" rx="4" fill="{gold}"/><rect x="72" y="142" width="56" height="12" rx="6" fill="{a.grad(p1, "v", .2, -.1)}"/>')
    a.add(f'<rect x="40" y="58" width="120" height="7" rx="3.5" fill="{gold}" transform="rotate(-8 100 61)"/>')
    a.add(f'<circle cx="100" cy="52" r="9" fill="{a.grad(p2, "diag", .35, -.2)}"/>')
    a.add(f'<path d="M48 70 L36 104 M48 70 L60 104" stroke="{shade(p1, -.1)}" stroke-width="2"/><path d="M30 104 h36 a18 10 0 0 1 -36 0z" fill="{a.grad(p2, "v", .2, -.2)}"/>')
    a.add(f'<path d="M152 58 L140 92 M152 58 L164 92" stroke="{shade(p1, -.1)}" stroke-width="2"/><path d="M134 92 h36 a18 10 0 0 1 -36 0z" fill="{a.grad(p2, "v", .2, -.2)}"/>')
    capsule(a, 48, 96, 26, 11, -15, '#F43F5E', '#fff')
    a.add(f'<path d="{heart_path(152, 84, .26)}" fill="#F43F5E"/>')


def info(a, p1, p2, p3):
    drop_shadow(a, 100, 156, 50)
    a.add(f'<rect x="44" y="50" width="96" height="84" rx="12" fill="{shade(p1, -.25)}" transform="translate(3 4)"/><rect x="44" y="50" width="96" height="84" rx="12" fill="#fff"/>')
    a.add(f'<path d="M44 62 a12 12 0 0 1 12 -12 h72 a12 12 0 0 1 12 12 v6 h-96z" fill="{a.grad(p1, "h", .1, -.1)}"/>')
    for i, c in enumerate(('#F43F5E', '#FBBF24', '#34D399')):
        a.add(f'<circle cx="{54 + i * 9}" cy="59" r="2.6" fill="{c}"/>')
    a.add(f'<rect x="54" y="78" width="40" height="28" rx="5" fill="{p3}"/><path d="{heart_path(74, 92, .22)}" fill="#F43F5E"/>')
    for i, w in enumerate((30, 24, 28, 60)):
        a.add(f'<rect x="{100 if i < 3 else 54}" y="{80 + i * 9 if i < 3 else 114}" width="{w}" height="5" rx="2.5" fill="{p3}"/>')
    a.add(f'<circle cx="132" cy="118" r="22" fill="{a.rad("lens", [(0, "#ffffff", .9), (1, p2, .45)], .4, .35, .7)}" stroke="{a.grad(NAVY, "diag", .3, -.1)}" stroke-width="7"/>')
    a.add(f'<rect x="146" y="132" width="10" height="28" rx="5" fill="{a.grad(NAVY, "h", .3, -.1)}" transform="rotate(-45 151 146)"/>')
    gloss(a, 125, 111, 7, 3)


def digital(a, p1, p2, p3):
    drop_shadow(a, 100, 160, 40)
    a.add(f'<rect x="66" y="36" width="68" height="120" rx="16" fill="{shade(p1, -.3)}" transform="translate(3 4)"/>')
    a.add(f'<rect x="66" y="36" width="68" height="120" rx="16" fill="{a.grad("#1E1B4B", "diag", .2, -.1)}"/>')
    a.add(f'<rect x="72" y="46" width="56" height="100" rx="10" fill="{a.lin("ph", [(0, p2), (1, p1)])}"/>')
    a.add('<rect x="92" y="40" width="16" height="3" rx="1.5" fill="#475569"/>')
    a.add(f'<circle cx="100" cy="78" r="16" fill="#fff" opacity=".95"/><path d="{heart_path(100, 80, .3)}" fill="#F43F5E"/>')
    for i in range(3):
        a.add(f'<rect x="80" y="{102 + i * 12}" width="{40 - i * 8}" height="7" rx="3.5" fill="#fff" opacity="{.85 - i * .2}"/>')
    a.add(f'<path d="M138 58 h28 a8 8 0 0 1 8 8 v12 a8 8 0 0 1 -8 8 h-18 l-8 7 v-7 a8 8 0 0 1 -8 -8 v-12 a8 8 0 0 1 6 -8z" fill="#fff"/>')
    for i in range(3):
        a.add(f'<circle cx="{148 + i * 8}" cy="72" r="2.4" fill="{p1}"/>')
    gloss(a, 82, 56, 6, 2.5)


def education(a, p1, p2, p3):
    drop_shadow(a, 100, 156, 50)
    a.add(f'<path d="M54 120 L100 108 L146 120 L146 148 L100 160 L54 148Z" fill="{a.grad(p2, "v", .2, -.1)}"/>')
    a.add('<path d="M58 122 L100 112 L142 122 L142 144 L100 154 L58 144Z" fill="#fff"/><path d="M100 112 V154" stroke="#CBD5E1" stroke-width="2"/>')
    for i in range(3):
        a.add(f'<path d="M66 {128 + i * 7} L92 {122 + i * 7} M108 {122 + i * 7} L134 {128 + i * 7}" stroke="#CBD5E1" stroke-width="2"/>')
    a.add(f'<path d="M78 76 V96 Q100 110 122 96 V76Z" fill="{a.grad(NAVY, "v", .2, -.15)}"/>')
    a.add(f'<path d="M100 48 L156 72 L100 96 L44 72Z" fill="{a.grad("#1E293B", "diag", .3, -.1)}"/>')
    a.add('<path d="M100 54 L144 72 L100 90 L56 72Z" fill="#fff" opacity=".12"/>')
    a.add(f'<path d="M146 76 V108" stroke="#FFC23A" stroke-width="3"/><circle cx="146" cy="112" r="6" fill="#FFC23A"/><circle cx="100" cy="72" r="5" fill="#FFC23A"/>')


def work(a, p1, p2, p3):
    drop_shadow(a, 100, 156, 52)
    a.add(f'<path d="M82 66 V58 a8 8 0 0 1 8 -8 h20 a8 8 0 0 1 8 8 v8" stroke="{a.grad(NAVY, "v", .2, -.1)}" stroke-width="7" fill="none"/>')
    a.add(f'<rect x="46" y="66" width="108" height="78" rx="14" fill="{shade(p1, -.25)}" transform="translate(3 4)"/><rect x="46" y="66" width="108" height="78" rx="14" fill="{a.grad(p1, "v", .25, -.1)}"/>')
    a.add(f'<path d="M46 96 Q100 112 154 96" stroke="{shade(p1, -.3)}" stroke-width="3" fill="none"/>')
    a.add(f'<rect x="90" y="96" width="20" height="16" rx="4" fill="{a.grad(p2, "v", .3, -.1)}"/>')
    gloss(a, 66, 78, 12, 4, -8)
    a.add(f'<circle cx="150" cy="58" r="13" fill="{a.grad(p2, "diag", .35, -.15)}"/><path d="M144 58 l4 4 l8 -8" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/>')


def research(a, p1, p2, p3):
    drop_shadow(a, 100, 158, 46)
    a.add('<path d="M86 42 h28 v8 h-4 v24 l30 56 a12 12 0 0 1 -10 18 h-60 a12 12 0 0 1 -10 -18 l30 -56 v-24 h-4z" fill="#fff" opacity=".92" stroke="#CBD5E1" stroke-width="3"/>')
    a.add(f'<path d="M78 104 h44 l18 26 a12 12 0 0 1 -10 18 h-60 a12 12 0 0 1 -10 -18z" fill="{a.lin("liq", [(0, p2), (1, p1)])}"/>')
    for x, y, r in ((86, 124, 5), (104, 116, 3.5), (114, 132, 6), (96, 138, 3)):
        a.add(f'<circle cx="{x}" cy="{y}" r="{r}" fill="#fff" opacity=".6"/>')
    gloss(a, 92, 70, 3, 12, 0, .55)
    for i in range(8):
        y = 50 + i * 12
        dx = 10 * math.sin(i * .9)
        a.add(f'<line x1="{146 - dx}" y1="{y}" x2="{146 + dx}" y2="{y}" stroke="#fff" stroke-width="2" opacity=".8"/>')
        a.add(f'<circle cx="{146 - dx}" cy="{y}" r="3.6" fill="{p2 if i % 2 else "#F43F5E"}"/><circle cx="{146 + dx}" cy="{y}" r="3.6" fill="{"#FBBF24" if i % 2 else p1}"/>')


def eligibility(a, p1, p2, p3):
    drop_shadow(a, 100, 156, 50)
    for r, c in ((52, '#FFFFFF'), (40, p1), (28, '#FFFFFF'), (16, p2)):
        a.add(f'<circle cx="96" cy="100" r="{r}" fill="{a.grad(c, "diag", .15, -.1)}"/>')
    a.add(f'<circle cx="96" cy="100" r="6" fill="#F43F5E"/>')
    a.add(f'<path d="M100 96 L150 46" stroke="{a.grad(NAVY, "diag", .3, -.1)}" stroke-width="5" stroke-linecap="round"/>')
    a.add(f'<path d="M150 46 l4 -16 l8 8 l-4 4 l12 4 l-8 8z" fill="#F43F5E"/>')
    a.add(f'<circle cx="146" cy="134" r="16" fill="{a.grad("#22C55E", "diag", .3, -.15)}" stroke="#fff" stroke-width="3"/><path d="M139 134 l5 5 l10 -10" stroke="#fff" stroke-width="3.5" fill="none" stroke-linecap="round"/>')
    gloss(a, 74, 72, 10, 4)


def verification(a, p1, p2, p3):
    drop_shadow(a, 100, 158, 46)
    a.add(f'<path d="M58 40 h58 l26 26 v86 a8 8 0 0 1 -8 8 h-76 a8 8 0 0 1 -8 -8 v-104 a8 8 0 0 1 8 -8z" fill="{shade(p1, -.25)}" transform="translate(3 4)"/>')
    a.add('<path d="M58 40 h58 l26 26 v86 a8 8 0 0 1 -8 8 h-76 a8 8 0 0 1 -8 -8 v-104 a8 8 0 0 1 8 -8z" fill="#fff"/>')
    a.add(f'<path d="M116 40 v18 a8 8 0 0 0 8 8 h18z" fill="{p3}"/>')
    for i, w in enumerate((50, 64, 44, 58, 36)):
        a.add(f'<rect x="64" y="{66 + i * 12}" width="{w}" height="5" rx="2.5" fill="{p3 if i else p2}"/>')
    a.add(f'<g transform="rotate(-14 118 132)"><circle cx="118" cy="132" r="24" fill="none" stroke="{p1}" stroke-width="4" stroke-dasharray="4 3"/><circle cx="118" cy="132" r="17" fill="{a.grad(p1, "diag", .25, -.1)}" opacity=".95"/>'
          f'<path d="M110 132 l6 6 l12 -12" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round"/></g>')


def survey(a, p1, p2, p3):
    drop_shadow(a, 100, 158, 50)
    a.add(f'<rect x="48" y="86" width="104" height="68" rx="8" fill="{a.grad(p1, "v", .2, -.15)}"/>')
    a.add(f'<rect x="42" y="70" width="116" height="24" rx="8" fill="{a.grad(p2, "v", .3, -.05)}"/>')
    a.add(f'<rect x="92" y="70" width="16" height="84" fill="{a.grad("#FFC23A", "h", .3, -.15)}"/>')
    a.add(f'<path d="M100 70 C80 40 58 52 74 66 C80 72 92 72 100 70Z" fill="{a.grad("#FFC23A", "diag", .3, -.2)}"/><path d="M100 70 C120 40 142 52 126 66 C120 72 108 72 100 70Z" fill="{a.grad("#FFC23A", "diag", .3, -.2)}"/>')
    a.add('<circle cx="100" cy="70" r="7" fill="#F59E0B"/>')
    gloss(a, 62, 80, 10, 3, 0)
    for x, y, c in ((44, 54, '#F43F5E'), (150, 48, '#38BDF8'), (160, 118, '#A3E635')):
        a.add(f'<rect x="{x}" y="{y}" width="9" height="4" rx="2" fill="{c}" transform="rotate(35 {x} {y})"/>')


def social(a, p1, p2, p3):
    drop_shadow(a, 100, 158, 52)
    a.add(f'<rect x="58" y="56" width="74" height="46" rx="8" fill="{a.grad("#38BDF8", "diag", .2, -.15)}" transform="rotate(-14 95 79)"/>')
    a.add(f'<rect x="44" y="76" width="112" height="72" rx="16" fill="{shade(p1, -.3)}" transform="translate(3 4)"/><rect x="44" y="76" width="112" height="72" rx="16" fill="{a.grad(p1, "v", .25, -.1)}"/>')
    a.add(f'<rect x="120" y="98" width="44" height="28" rx="10" fill="{a.grad(p2, "v", .2, -.1)}"/><circle cx="136" cy="112" r="6" fill="#fff"/>')
    gloss(a, 66, 88, 12, 4, -6)
    for i in range(3):
        a.add(f'<ellipse cx="66" cy="{150 - i * 7}" rx="16" ry="6" fill="{a.grad("#FFC23A", "v", .25, -.2)}" stroke="#E59E0B" stroke-width="1.5"/>')
    a.add(f'<path d="M134 40 h30 a8 8 0 0 1 8 8 v12 a8 8 0 0 1 -8 8 h-20 l-8 7 v-7 a8 8 0 0 1 -8 -8 v-12 a8 8 0 0 1 6 -8z" fill="#fff"/><path d="{heart_path(150, 56, .18)}" fill="#F43F5E"/>')


def additional(a, p1, p2, p3):
    drop_shadow(a, 100, 156, 44)
    a.add(f'<circle cx="100" cy="102" r="36" fill="{a.rad("pl", [(0, "#FFC9F2", 1), (.6, p2, 1), (1, p1, 1)], .35, .3, .75)}"/>')
    a.add(f'<ellipse cx="100" cy="104" rx="62" ry="14" transform="rotate(-18 100 104)" fill="none" stroke="#FFC23A" stroke-width="6"/>')
    a.add(f'<path d="M64 112 A36 36 0 0 0 136 92" fill="none" stroke="{shade(p1, -.2)}" stroke-width="0"/>')
    gloss(a, 86, 86, 10, 5)
    for x, y, s in ((150, 52, 3.2), (52, 60, 2.2), (142, 146, 2)):
        a.add(f'<path d="M0 -4 L1 -1 L4 0 L1 1 L0 4 L-1 1 L-4 0 L-1 -1Z" transform="translate({x} {y}) scale({s})" fill="#FFC23A"/>')


DRAW = [
    ('basic', 'A patient ID card with a smiling avatar and a location pin inside a blue glass orb', basic),
    ('general-health', 'A smiling sun rising behind a cloud with a small red heart', general_health),
    ('conditions', 'A medical clipboard with ticked boxes and a stethoscope', conditions),
    ('symptoms', 'A red thermometer with warm waves around it', symptoms),
    ('personal-health', 'A glossy heart with a sticking plaster and a heartbeat line', personal_health),
    ('treatment', 'A syringe with a drop of medicine', treatment),
    ('medication', 'A two-tone capsule, a round tablet and a blister pack of pills', medication),
    ('providers', 'A smiling doctor with a head mirror, white coat and stethoscope', providers),
    ('diagnostics', 'A laboratory microscope with a sample slide of cells', diagnostics),
    ('devices', 'A smartwatch showing a heart and a heart rate of 72 bpm', devices),
    ('hospital', 'A hospital building with a red cross sign', hospital),
    ('insurance', 'A blue shield with a white tick and a gold coin', insurance),
    ('lifestyle', 'A blooming lotus flower on calm water', lifestyle),
    ('food', 'A bowl of fresh salad with tomatoes and greens next to an apple', food),
    ('decisions', 'A golden balance scale weighing a pill against a heart', decisions),
    ('info', 'A web page about heart health under a magnifying glass', info),
    ('digital', 'A smartphone with a health app and a chat bubble', digital),
    ('education', 'A graduation cap resting above an open book', education),
    ('work', 'A briefcase with a green tick badge', work),
    ('research', 'A laboratory flask with bubbling liquid next to a DNA strand', research),
    ('eligibility', 'A target with an arrow in the bullseye and a green tick', eligibility),
    ('verification', 'A document with a round verification stamp and a tick', verification),
    ('survey', 'A gift box with a golden bow and confetti', survey),
    ('social', 'A wallet with a bank card, gold coins and a chat bubble with a heart', social),
    ('additional', 'A glowing ringed planet with golden sparkles', additional),
]

if __name__ == '__main__':
    alts = {}
    for pid, title, fn in DRAW:
        make(pid, title, fn)
        alts[pid] = title
    json.dump(alts, open(os.path.join(os.path.dirname(__file__), 'patient-alt.json'), 'w'), indent=1)
    print('✔', len(DRAW), 'profile illustrations →', os.path.relpath(OUT, ROOT))

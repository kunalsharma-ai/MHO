"""3D "clay diorama" illustrations for the 12 caregiver profiles (200x200).
python3 scripts/art/profiles.py  →  public/images/profiles/*.svg"""
import os, sys, math
sys.path.insert(0, os.path.dirname(__file__))
from lib import Art, shade

OUT = os.path.join(os.path.dirname(__file__), '..', '..', 'public', 'images', 'profiles')
os.makedirs(OUT, exist_ok=True)


def stage(a, base, tint):
    """Floating round pedestal in the profile colour."""
    a.add(f'<ellipse cx="100" cy="174" rx="72" ry="13" fill="#140b2a" opacity=".16"/>')
    a.add(f'<ellipse cx="100" cy="160" rx="70" ry="20" fill="{shade(base, -.25)}"/>')
    a.add(f'<rect x="30" y="148" width="140" height="12" fill="{shade(base, -.25)}"/>')
    a.add(f'<ellipse cx="100" cy="148" rx="70" ry="20" fill="{a.lin("top", [(0, shade(tint, .3)), (1, tint)])}"/>')
    a.add(f'<ellipse cx="100" cy="148" rx="54" ry="13" fill="#ffffff" opacity=".35"/>')


def gloss(a, x, y, rx, ry, rot=-25, op=.45):
    a.add(f'<ellipse cx="{x}" cy="{y}" rx="{rx}" ry="{ry}" transform="rotate({rot} {x} {y})" fill="#ffffff" opacity="{op}"/>')


def save(a, name):
    open(os.path.join(OUT, name + '.svg'), 'w').write(a.svg())


def care_role():
    a = Art(200, 200, 'Two caring hands holding a glowing heart with a heartbeat line')
    stage(a, '#D7263D', '#FFE0B8')
    a.add(f'<circle cx="100" cy="82" r="62" fill="{a.rad("glow", [(0, "#FFD27A", .7), (1, "#FFD27A", 0)])}"/>')
    hg = a.lin('hg', [(0, '#E1192F'), (.55, '#F86B1D'), (1, '#FFC23A')])
    a.add(f'<path d="M100 132 C64 108 48 92 48 70 C48 54 60 42 75 42 C86 42 95 48 100 58 C105 48 114 42 125 42 C140 42 152 54 152 70 C152 92 136 108 100 132Z" fill="{hg}" stroke="#123F5E" stroke-width="5" stroke-linejoin="round"/>')
    a.add('<polyline points="60,82 80,82 87,68 96,98 105,58 113,90 118,82 140,82" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>')
    gloss(a, 72, 58, 12, 6)
    skin = a.grad('#F3B98F', 'diag', .15, -.12)
    a.add(f'<path d="M26 112 Q40 96 60 110 L96 136 Q104 142 96 148 L50 150 Q30 148 26 132Z" fill="{skin}"/>')
    a.add(f'<path d="M174 112 Q160 96 140 110 L104 136 Q96 142 104 148 L150 150 Q170 148 174 132Z" fill="{skin}"/>')
    a.add('<path d="M44 122 q10 6 20 4 M156 122 q-10 6 -20 4" stroke="#d48d65" stroke-width="2.5" fill="none" stroke-linecap="round"/>')
    for x, y, s in ((158, 34, 2.4), (170, 52, 1.6), (34, 40, 1.8)):
        a.plus(x, y, s, '#F7A23B')
    save(a, 'care-role')


def basic():
    a = Art(200, 200, 'An identity card with a person avatar, a location pin and a globe')
    stage(a, '#0F6E8F', '#C9F3EE')
    a.add(f'<circle cx="150" cy="58" r="26" fill="{a.grad("#2BB3C0")}"/><path d="M128 52 q12 8 26 -4 q8 10 18 4 M132 72 q14 -6 30 4" stroke="#fff" stroke-width="3" fill="none" opacity=".7"/>')
    a.add('<g transform="rotate(-8 92 104)">')
    a.add(f'<rect x="38" y="64" width="112" height="76" rx="14" fill="#ffffff"/><rect x="38" y="64" width="112" height="22" rx="14" fill="{a.grad("#0F6E8F", "h", .2, -.1)}"/><rect x="38" y="76" width="112" height="10" fill="{shade("#0F6E8F", .05)}"/>')
    a.add('<circle cx="66" cy="110" r="15" fill="#FFD7B5"/><path d="M52 132 q14 -18 28 0" fill="#2BB3C0"/><path d="M53 104 q13 -16 26 0 q-6 -6 -13 -6 q-7 0 -13 6z" fill="#3b2a24"/>')
    a.add('<rect x="90" y="100" width="46" height="7" rx="3.5" fill="#9FDDE2"/><rect x="90" y="113" width="36" height="7" rx="3.5" fill="#CDEFF1"/><rect x="90" y="126" width="42" height="7" rx="3.5" fill="#CDEFF1"/>')
    a.add('</g>')
    a.add(f'<path d="M150 150 C134 128 128 118 128 108 C128 96 138 86 150 86 C162 86 172 96 172 108 C172 118 166 128 150 150Z" fill="{a.grad("#FF5A5F")}"/><circle cx="150" cy="107" r="8" fill="#fff"/>')
    gloss(a, 142, 98, 6, 3)
    a.sparkle(30, 46, 2, '#ffffff')
    save(a, 'basic')


def education():
    a = Art(200, 200, 'A stack of books with a graduation cap and a rolled certificate')
    stage(a, '#5B2A86', '#EBD9FF')
    for i, (c, w, dx) in enumerate((('#9B5DE5', 96, -4), ('#F15BB5', 88, 6), ('#00BBF9', 92, -2))):
        y = 128 - i * 20
        a.add(f'<rect x="{52 + dx}" y="{y}" width="{w}" height="18" rx="5" fill="{a.grad(c, "v", .2, -.15)}"/><rect x="{52 + dx + w - 12}" y="{y + 3}" width="9" height="12" rx="2" fill="#fff" opacity=".85"/>')
    a.add(f'<path d="M100 44 L154 64 L100 84 L46 64Z" fill="{a.grad("#3A1C5C", "diag", .2, -.1)}"/><path d="M72 74 V90 Q100 104 128 90 V74 L100 84Z" fill="#2B1446"/>')
    a.add('<path d="M140 69 V96" stroke="#FFC23A" stroke-width="3"/><circle cx="140" cy="99" r="5" fill="#FFC23A"/>')
    a.add(f'<g transform="rotate(-18 152 128)"><rect x="128" y="120" width="54" height="16" rx="8" fill="#FFF7E3"/><rect x="150" y="118" width="7" height="20" fill="#E63946"/></g>')
    a.add('<path d="M40 40 l4 8 l8 2 l-8 3 l-4 8 l-4 -8 l-8 -3 l8 -2z" fill="#FFD166"/>')
    save(a, 'education')


def professional():
    a = Art(200, 200, 'A teal medical bag with a red cross, a stethoscope and a clipboard')
    stage(a, '#08776A', '#CDF7EA')
    a.add(f'<rect x="132" y="56" width="44" height="64" rx="8" fill="{a.grad("#F7EDD6")}"/><rect x="146" y="50" width="16" height="10" rx="4" fill="#8D6E63"/><path d="M140 74 h28 M140 86 h22 M140 98 h26" stroke="#9CC9C0" stroke-width="4" stroke-linecap="round"/><path d="M139 108 l5 5 l9 -10" stroke="#2EC4A6" stroke-width="4" fill="none" stroke-linecap="round"/>')
    a.add('<path d="M78 70 V58 Q78 48 88 48 H112 Q122 48 122 58 V70" stroke="#0B4F47" stroke-width="7" fill="none"/>')
    a.add(f'<rect x="40" y="68" width="120" height="78" rx="18" fill="{a.grad("#2EC4A6", "diag", .2, -.2)}"/><rect x="40" y="94" width="120" height="6" fill="#08776A" opacity=".5"/>')
    a.add('<circle cx="100" cy="106" r="20" fill="#fff"/><path d="M100 94 v24 M88 106 h24" stroke="#E63946" stroke-width="8" stroke-linecap="round"/>')
    gloss(a, 62, 80, 14, 5)
    a.add('<path d="M44 66 Q20 90 36 120 Q48 140 70 136" stroke="#37474F" stroke-width="5" fill="none" stroke-linecap="round"/><circle cx="72" cy="136" r="9" fill="#90A4AE"/><circle cx="72" cy="136" r="4" fill="#CFD8DC"/>')
    save(a, 'professional')


def health():
    a = Art(200, 200, 'A glossy heart with a pulse line, a stethoscope and a green plus sign')
    stage(a, '#D62839', '#FFD9DE')
    hg = a.lin('hh', [(0, '#FF8A9B'), (1, '#D62839')])
    a.add(f'<path d="M100 140 C58 112 40 94 40 70 C40 52 54 38 72 38 C84 38 94 44 100 56 C106 44 116 38 128 38 C146 38 160 52 160 70 C160 94 142 112 100 140Z" fill="{hg}"/>')
    a.add('<polyline points="50,86 76,86 84,70 94,104 104,60 112,94 118,86 150,86" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>')
    gloss(a, 68, 56, 13, 6)
    a.add('<path d="M150 44 Q174 70 160 100 Q150 120 128 128" stroke="#455A64" stroke-width="5" fill="none" stroke-linecap="round"/><circle cx="126" cy="129" r="9" fill="#B0BEC5"/><circle cx="150" cy="44" r="5" fill="#455A64"/>')
    a.add(f'<circle cx="44" cy="40" r="16" fill="{a.grad("#2EC4A6")}"/><path d="M44 32 v16 M36 40 h16" stroke="#fff" stroke-width="5" stroke-linecap="round"/>')
    save(a, 'health')


def insurance():
    a = Art(200, 200, 'A blue shield with a heart and tick protecting a small family under an umbrella')
    stage(a, '#1D3FA8', '#D6E3FF')
    a.add(f'<path d="M100 28 L150 46 V86 C150 116 128 136 100 146 C72 136 50 116 50 86 V46Z" fill="{a.grad("#4C7DFF", "diag", .25, -.25)}"/>')
    a.add('<path d="M100 38 L140 52 V86 C140 110 122 126 100 134Z" fill="#ffffff" opacity=".18"/>')
    a.add('<path d="M78 88 l15 15 l30 -32" stroke="#fff" stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round"/>')
    a.add(f'<path d="M20 70 Q40 44 62 70Z" fill="{a.grad("#FFB703")}"/><path d="M41 68 V96 q0 6 -6 6" stroke="#7a5230" stroke-width="3" fill="none" stroke-linecap="round"/>')
    for x, c, r in ((150, '#FF6B6B', 9), (166, '#FFD166', 7), (178, '#06D6A0', 6)):
        a.add(f'<circle cx="{x}" cy="{136 - r}" r="{r}" fill="{c}"/><rect x="{x - r}" y="{136}" width="{2 * r}" height="{r * 1.6}" rx="{r * .8}" fill="{shade(c, -.15)}"/>')
    a.heart(100, 20, 2.2, '#FF4D6D')
    save(a, 'insurance')


def food():
    a = Art(200, 200, 'A fresh salad bowl with fruit, an apple and a glass of juice')
    stage(a, '#2F7D32', '#EAF8C4')
    a.add(f'<rect x="138" y="70" width="32" height="60" rx="8" fill="#FFFFFF" opacity=".75"/><rect x="141" y="88" width="26" height="39" rx="6" fill="{a.grad("#FF9F1C", "v")}"/><path d="M160 70 L170 40" stroke="#FF4D6D" stroke-width="4" stroke-linecap="round"/><circle cx="152" cy="80" r="6" fill="#FFD166" stroke="#fff" stroke-width="2"/>')
    for x, y, r, c in ((62, 78, 16, '#4CAF50'), (84, 70, 18, '#66BB6A'), (108, 72, 17, '#43A047'), (128, 82, 14, '#81C784')):
        a.add(f'<circle cx="{x}" cy="{y}" r="{r}" fill="{c}"/>')
    a.add('<circle cx="76" cy="86" r="8" fill="#E63946"/><circle cx="104" cy="86" r="8" fill="#FF6B6B"/><circle cx="92" cy="80" r="6" fill="#FFD166"/><circle cx="118" cy="90" r="6" fill="#FF9F1C"/>')
    a.add(f'<path d="M40 88 H144 Q140 138 92 140 Q44 138 40 88Z" fill="{a.grad("#FFFFFF", "v", 0, -.12)}"/><path d="M40 88 H144" stroke="#E0E0E0" stroke-width="4" stroke-linecap="round"/>')
    a.add('<path d="M52 104 q40 14 80 0" stroke="#8CC63F" stroke-width="5" fill="none" stroke-linecap="round" opacity=".7"/>')
    a.add(f'<circle cx="44" cy="134" r="15" fill="{a.grad("#E63946")}"/><path d="M44 120 q2 -8 8 -10" stroke="#5D4037" stroke-width="3" fill="none"/><path d="M47 117 q8 -6 12 0 q-6 4 -12 0z" fill="#4CAF50"/>')
    gloss(a, 39, 128, 4, 2.5)
    save(a, 'food')


def fitness():
    a = Art(200, 200, 'A dumbbell, a running shoe and a stopwatch with an energy bolt')
    stage(a, '#E0520C', '#FFE7C2')
    a.add(f'<circle cx="138" cy="66" r="30" fill="{a.grad("#FFFFFF", "diag", 0, -.12)}" stroke="#FFA62B" stroke-width="7"/><rect x="132" y="26" width="12" height="10" rx="3" fill="#E0520C"/><path d="M138 66 V48 M138 66 L150 74" stroke="#2D3142" stroke-width="5" stroke-linecap="round"/>')
    a.add('<path d="M58 26 L44 54 H60 L48 82" stroke="#FFD166" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>')
    a.add(f'<rect x="38" y="108" width="14" height="36" rx="5" fill="{a.grad("#3D405B")}"/><rect x="52" y="100" width="16" height="52" rx="6" fill="{a.grad("#3D405B")}"/><rect x="68" y="120" width="60" height="12" rx="6" fill="#9AA0B8"/><rect x="128" y="100" width="16" height="52" rx="6" fill="{a.grad("#3D405B")}"/><rect x="144" y="108" width="14" height="36" rx="5" fill="{a.grad("#3D405B")}"/>')
    a.add(f'<path d="M64 100 Q66 82 84 84 L104 88 Q120 92 124 104 Q126 112 116 112 H70 Q62 112 64 100Z" fill="{a.grad("#FF5A36", "diag", .2, -.15)}"/><path d="M64 108 H124" stroke="#fff" stroke-width="5" stroke-linecap="round"/><path d="M84 90 l6 8 M94 91 l6 8" stroke="#fff" stroke-width="3" stroke-linecap="round"/>')
    save(a, 'fitness')


def tech():
    a = Art(200, 200, 'A smartphone showing a heart-rate graph next to a smartwatch and a chart bubble')
    stage(a, '#5A12D6', '#F2D4FF')
    a.add(f'<rect x="58" y="26" width="64" height="118" rx="14" fill="{a.grad("#2A1155", "diag", .2, -.1)}"/><rect x="64" y="36" width="52" height="96" rx="8" fill="{a.lin("scr", [(0, "#7C4DFF"), (1, "#D600B0")])}"/>')
    a.add('<polyline points="68,86 78,86 83,74 90,100 97,66 103,92 108,86 114,86" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>')
    a.add('<rect x="70" y="46" width="28" height="6" rx="3" fill="#fff" opacity=".8"/><rect x="70" y="110" width="40" height="14" rx="7" fill="#fff" opacity=".9"/>')
    a.heart(104, 50, 1.6, '#fff')
    a.add(f'<rect x="132" y="96" width="14" height="52" rx="6" fill="#2A1155"/><rect x="124" y="104" width="36" height="38" rx="11" fill="{a.grad("#1F0B44")}"/><rect x="129" y="109" width="26" height="28" rx="7" fill="#00E5FF"/>')
    a.add('<path d="M133 124 h4 l3 -6 l4 12 l3 -6 h5" stroke="#1F0B44" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>')
    a.add(f'<rect x="132" y="30" width="48" height="36" rx="10" fill="#ffffff"/><path d="M144 66 l-6 10 l12 -10z" fill="#ffffff"/><rect x="140" y="48" width="6" height="12" rx="2" fill="#7C4DFF"/><rect x="150" y="42" width="6" height="18" rx="2" fill="#D600B0"/><rect x="160" y="36" width="6" height="24" rx="2" fill="#00BBF9"/>')
    gloss(a, 76, 44, 8, 3)
    save(a, 'tech')


def survey():
    a = Art(200, 200, 'A survey clipboard with ticked boxes beside a pink gift box and a star')
    stage(a, '#B5175A', '#FFD6E5')
    a.add(f'<rect x="36" y="34" width="72" height="104" rx="10" fill="{a.grad("#B5175A", "diag", .1, -.15)}"/><rect x="43" y="44" width="58" height="88" rx="6" fill="#ffffff"/><rect x="58" y="28" width="28" height="12" rx="5" fill="#FFC23A"/>')
    for i in range(3):
        y = 58 + i * 24
        a.add(f'<rect x="50" y="{y}" width="12" height="12" rx="3" fill="#FFD6E5"/><path d="M52 {y + 6} l4 4 l8 -10" stroke="#B5175A" stroke-width="3" fill="none" stroke-linecap="round"/><rect x="68" y="{y + 3}" width="26" height="6" rx="3" fill="#F8BBD0"/>')
    a.add(f'<rect x="108" y="90" width="66" height="54" rx="6" fill="{a.grad("#FF5C8A", "diag", .2, -.15)}"/><rect x="102" y="78" width="78" height="18" rx="6" fill="{a.grad("#FF85A2")}"/><rect x="136" y="78" width="12" height="66" fill="#FFC23A"/>')
    a.add('<path d="M142 78 C126 58 112 66 120 74 C126 80 136 80 142 78 C148 80 158 80 164 74 C172 66 158 58 142 78Z" fill="#FFC23A"/>')
    a.add('<path d="M166 30 l5 10 l11 2 l-8 8 l2 11 l-10 -5 l-10 5 l2 -11 l-8 -8 l11 -2z" fill="#FFD166"/>')
    save(a, 'survey')


def social():
    a = Art(200, 200, 'A green wallet with a payment card, a stack of coins and a chat bubble with a heart')
    stage(a, '#00695C', '#CBF3F2')
    a.add(f'<rect x="42" y="38" width="66" height="42" rx="8" fill="{a.grad("#FFC23A", "diag", .2, -.1)}" transform="rotate(-10 75 59)"/>')
    a.add(f'<rect x="34" y="62" width="110" height="78" rx="16" fill="{a.grad("#12B5CB", "diag", .15, -.25)}"/><rect x="108" y="86" width="44" height="30" rx="10" fill="#00695C"/><circle cx="124" cy="101" r="6" fill="#FFC23A"/>')
    gloss(a, 56, 74, 14, 5)
    for i in range(4):
        a.add(f'<ellipse cx="158" cy="{140 - i * 9}" rx="18" ry="6" fill="{shade("#FFC23A", -.18)}"/><ellipse cx="158" cy="{136 - i * 9}" rx="18" ry="6" fill="#FFD166"/>')
    a.add('<path d="M128 26 H178 Q186 26 186 34 V56 Q186 64 178 64 H146 L136 74 V64 H128 Q120 64 120 56 V34 Q120 26 128 26Z" fill="#ffffff"/>')
    a.heart(153, 45, 2.2, '#FF4D6D')
    save(a, 'social')


def additional():
    a = Art(200, 200, 'A rocket launching from a cloud with a ringed planet and twinkling stars')
    stage(a, '#26287A', '#FFC9F2')
    a.add(f'<circle cx="44" cy="52" r="18" fill="{a.grad("#FF9F1C")}"/><ellipse cx="44" cy="52" rx="30" ry="8" fill="none" stroke="#FFD6A5" stroke-width="4" transform="rotate(-20 44 52)"/>')
    for x, y, s in ((160, 30, 2.2), (176, 70, 1.4), (24, 104, 1.6), (78, 22, 1.2)):
        a.sparkle(x, y, s, '#FFD166')
    a.add('<path d="M100 22 C122 40 126 72 120 108 H80 C74 72 78 40 100 22Z" fill="url(#rk)"/>')
    a.defs.append('<linearGradient id="rk" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ffffff"/><stop offset=".6" stop-color="#E8E2FF"/><stop offset="1" stop-color="#B9AEF0"/></linearGradient>')
    a.add('<circle cx="100" cy="64" r="11" fill="#7C4DFF" stroke="#fff" stroke-width="4"/><path d="M80 90 L62 112 L82 108Z M120 90 L138 112 L118 108Z" fill="#FF4D6D"/><path d="M90 108 H110 L104 124 H96Z" fill="#7C4DFF"/>')
    a.add('<path d="M92 124 Q100 152 108 124" fill="#FFC23A"/><path d="M96 124 Q100 140 104 124" fill="#FFF3B0"/>')
    for x, y, r in ((74, 140, 16), (98, 146, 20), (124, 140, 16), (60, 148, 10), (140, 148, 11)):
        a.add(f'<circle cx="{x}" cy="{y}" r="{r}" fill="#ffffff"/>')
    save(a, 'additional')


for fn in (care_role, basic, education, professional, health, insurance, food, fitness, tech, survey, social, additional):
    fn()
print('profile illustrations written')

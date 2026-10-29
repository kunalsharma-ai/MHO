"""Caregiver "care moment" illustrations for the hero carousel (240x300 each).
python3 scripts/art/scenes.py  →  public/images/scenes/*.svg"""
import os, sys
sys.path.insert(0, os.path.dirname(__file__))
from lib import Art, shade

OUT = os.path.join(os.path.dirname(__file__), '..', '..', 'public', 'images', 'scenes')
os.makedirs(OUT, exist_ok=True)
SK = {'a': '#F6C9A6', 'b': '#E0A47E', 'c': '#B87452', 'd': '#8A5134'}


def card(a, top, bottom, r=26):
    g = a.lin('bg', [(0, top), (1, bottom)])
    a.add(f'<rect width="{a.w}" height="{a.h}" rx="{r}" fill="{g}"/>')


def save(a, name):
    open(os.path.join(OUT, name + '.svg'), 'w').write(a.svg())


# ---------------------------------------------------------------- 1. walk together
def walk():
    a = Art(240, 300, 'A caregiver walking arm in arm with an elderly man who uses a cane')
    card(a, '#FFE7C7', '#FFC6A5')
    a.add(f'<circle cx="182" cy="66" r="44" fill="{a.rad("sunglow", [(0, "#FFE9A3", .9), (1, "#FFE9A3", 0)])}"/>')
    a.add('<circle cx="182" cy="66" r="24" fill="#FFD25E"/>')
    a.add('<path d="M0 205 Q60 170 130 192 T240 180 V300 H0Z" fill="#A6DB8F"/>')
    a.add('<path d="M0 232 Q80 205 150 226 T240 220 V300 H0Z" fill="#7EC870"/>')
    a.add('<path d="M70 300 Q110 250 150 236 Q170 230 200 232 L215 240 Q165 248 140 300Z" fill="#F7E4C4" opacity=".9"/>')
    for x, y, s in ((30, 60, 1.6), (60, 38, 1), (210, 120, 1.2)):
        a.sparkle(x, y, s, '#ffffff', .9)
    # trees
    a.add('<rect x="24" y="168" width="7" height="34" rx="3" fill="#8B5E3C"/><circle cx="27" cy="160" r="20" fill="#5DB663"/><circle cx="18" cy="150" r="12" fill="#77C97B"/>')
    # elder (left)
    a.shadow(92, 262, 34)
    a.limb([(80, 205), (77, 256)], 13, '#4A4E6E', foot='#2C2F45')
    a.limb([(100, 205), (104, 256)], 13, '#4A4E6E', foot='#2C2F45')
    a.torso(66, 140, 48, 70, '#6E7FE0')
    a.add('<path d="M90 142 V208" stroke="#5565c4" stroke-width="2"/><circle cx="90" cy="160" r="2.2" fill="#fff"/><circle cx="90" cy="176" r="2.2" fill="#fff"/><circle cx="90" cy="192" r="2.2" fill="#fff"/>')
    a.limb([(70, 152), (60, 182), (56, 204)], 12, '#6E7FE0', hand=SK['a'])
    a.add('<path d="M56 204 L48 262" stroke="#7A4B2A" stroke-width="5" stroke-linecap="round"/><path d="M56 204 q-8 -6 -14 2" stroke="#7A4B2A" stroke-width="5" fill="none" stroke-linecap="round"/>')
    a.head(90, 116, 21, SK['a'], '#D9DCE6', 'gray', look=1)
    a.glasses(90, 116, 21, look=1)
    # caregiver (right)
    a.shadow(156, 262, 32)
    a.limb([(146, 198), (142, 256)], 13, '#2E3A59', foot='#1C2338')
    a.limb([(166, 198), (172, 256)], 13, '#2E3A59', foot='#1C2338')
    a.torso(132, 126, 46, 78, '#15A4A8')
    a.limb([(136, 140), (118, 160), (106, 166)], 12, '#15A4A8', hand=SK['c'])
    a.limb([(174, 140), (182, 172), (178, 196)], 12, '#15A4A8', hand=SK['c'])
    a.head(155, 102, 21, SK['c'], '#3B2420', 'bun', look=-1)
    a.heart(124, 78, 3.2, '#FF4D6D')
    a.heart(140, 60, 2, '#FF8FA3', .9, 12)
    save(a, 'walk')


# ---------------------------------------------------------------- 2. medicine on time
def meds():
    a = Art(240, 300, 'A caregiver handing medicine and a glass of water to an older woman in an armchair')
    card(a, '#F3E8FF', '#E3D2FF')
    a.add('<rect x="0" y="214" width="240" height="86" rx="0" fill="#CDB6F5"/><rect x="0" y="274" width="240" height="26" fill="#BCA2EE"/>')
    # window
    a.add('<rect x="150" y="34" width="70" height="76" rx="10" fill="#FFFFFF" opacity=".85"/><rect x="155" y="39" width="60" height="66" rx="7" fill="#BDE8FF"/><path d="M185 39 V105 M155 72 H215" stroke="#fff" stroke-width="4"/><circle cx="200" cy="56" r="8" fill="#FFE07A"/>')
    # wall clock
    a.add('<circle cx="56" cy="52" r="20" fill="#fff" stroke="#9B7BE0" stroke-width="5"/><path d="M56 52 V40 M56 52 L65 57" stroke="#5B3FA8" stroke-width="3" stroke-linecap="round"/>')
    # armchair
    a.shadow(82, 270, 56, 9)
    a.add(f'<rect x="28" y="150" width="108" height="94" rx="26" fill="{a.grad("#F2683C")}"/>')
    a.add(f'<rect x="18" y="186" width="30" height="62" rx="14" fill="{a.grad("#E5532B")}"/><rect x="116" y="186" width="30" height="62" rx="14" fill="{a.grad("#E5532B")}"/>')
    a.add('<rect x="34" y="248" width="8" height="20" rx="3" fill="#7A3A22"/><rect x="122" y="248" width="8" height="20" rx="3" fill="#7A3A22"/>')
    # elder woman sitting
    a.limb([(70, 222), (98, 222), (100, 258)], 14, '#7B5CC9', foot='#3E2C6E')
    a.limb([(84, 224), (112, 226), (114, 260)], 14, '#7B5CC9', foot='#3E2C6E')
    a.torso(56, 160, 46, 66, '#FF9EB5')
    a.add('<path d="M60 170 h38 M60 184 h38 M60 198 h38" stroke="#ff86a2" stroke-width="3" opacity=".7"/>')
    a.limb([(96, 172), (118, 186), (128, 180)], 11, '#FF9EB5', hand=SK['b'])
    a.head(79, 136, 20, SK['b'], '#E9E6F0', 'grandma', look=1)
    a.glasses(79, 136, 20, look=1)
    # side table + organizer
    a.add('<rect x="160" y="214" width="56" height="8" rx="4" fill="#8A5A3B"/><rect x="184" y="222" width="8" height="46" fill="#8A5A3B"/>')
    for i, c in enumerate(('#FF5A5F', '#FFB703', '#06D6A0', '#4CC9F0')):
        a.add(f'<rect x="{163 + i * 12.5}" y="202" width="11" height="12" rx="3" fill="{c}"/>')
    # caregiver standing
    a.shadow(176, 272, 28)
    a.limb([(168, 214), (164, 266)], 13, '#2B2F55', foot='#1A1D38')
    a.limb([(186, 214), (190, 266)], 13, '#2B2F55', foot='#1A1D38')
    a.torso(154, 142, 44, 78, '#3FB8AF')
    a.add('<rect x="170" y="150" width="12" height="16" rx="3" fill="#fff" opacity=".8"/><path d="M176 153 v10 M171 158 h10" stroke="#3FB8AF" stroke-width="2.6"/>')
    a.limb([(158, 156), (142, 176), (134, 176)], 11, '#3FB8AF', hand=SK['d'])
    a.limb([(194, 156), (204, 182), (200, 196)], 11, '#3FB8AF', hand=SK['d'])
    a.add('<rect x="193" y="182" width="14" height="20" rx="3" fill="#BDEBFF" stroke="#fff" stroke-width="2"/><rect x="195" y="190" width="10" height="10" rx="2" fill="#7CCFF5"/>')
    a.add('<rect x="127" y="170" width="12" height="6" rx="3" fill="#FF5A5F"/><rect x="133" y="170" width="6" height="6" rx="3" fill="#fff"/>')
    a.head(176, 118, 20, SK['d'], '#1F1A24', 'short', look=-1)
    a.heart(130, 150, 2.4, '#FF4D6D')
    a.sparkle(110, 120, 1.4, '#fff')
    save(a, 'meds')


# ---------------------------------------------------------------- 3. bedtime story
def story():
    a = Art(240, 300, 'A parent reading a bedtime story to a sleepy child in bed under the moon')
    card(a, '#25306A', '#4A3E8F')
    a.add('<path d="M196 44 a24 24 0 1 0 14 42 a18 18 0 1 1 -14 -42Z" fill="#FFE59A"/>')
    for x, y, s in ((40, 40, 1.5), (80, 70, 1), (130, 34, 1.3), (150, 92, .9), (30, 110, 1), (214, 128, 1.1)):
        a.sparkle(x, y, s, '#FFF6CF', .95)
    # lamp glow
    a.add(f'<circle cx="52" cy="170" r="70" fill="{a.rad("lamp", [(0, "#FFD27A", .55), (1, "#FFD27A", 0)])}"/>')
    a.add('<rect x="46" y="176" width="12" height="60" rx="4" fill="#C98A4B"/><path d="M30 178 L74 178 L64 146 L40 146Z" fill="#FFC857"/>')
    # bed
    a.add('<rect x="70" y="190" width="160" height="64" rx="14" fill="#8D5A3B"/><rect x="200" y="150" width="22" height="104" rx="10" fill="#A26A45"/>')
    a.add('<rect x="70" y="182" width="150" height="40" rx="14" fill="#F8F4FF"/>')
    a.add(f'<path d="M86 200 Q150 180 214 196 L214 240 Q150 250 86 240Z" fill="{a.grad("#37C3B6")}"/>')
    for x in (104, 134, 164, 194):
        a.add(f'<circle cx="{x}" cy="220" r="5" fill="#ffffff" opacity=".45"/>')
    a.add('<ellipse cx="190" cy="186" rx="26" ry="14" fill="#ffffff"/>')
    a.head(186, 176, 17, SK['b'], '#5A3A26', 'curly', face='closed')
    a.add('<text x="206" y="152" font-family="sans-serif" font-size="14" font-weight="700" fill="#CFE6FF">z</text><text x="216" y="138" font-family="sans-serif" font-size="11" font-weight="700" fill="#CFE6FF" opacity=".8">z</text>')
    # parent sitting on edge with book
    a.shadow(108, 270, 30, 6, .25)
    a.limb([(98, 230), (100, 266)], 13, '#3A3F73', foot='#1E2148')
    a.limb([(114, 230), (118, 266)], 13, '#3A3F73', foot='#1E2148')
    a.torso(88, 150, 44, 82, '#FF8C61')
    a.limb([(94, 166), (110, 190), (124, 186)], 11, '#FF8C61', hand=SK['a'])
    a.limb([(128, 166), (140, 186), (134, 192)], 11, '#FF8C61', hand=SK['a'])
    a.add('<path d="M112 172 L134 178 L156 172 L156 196 L134 202 L112 196Z" fill="#FFFFFF"/><path d="M134 178 V202" stroke="#E2D9FF" stroke-width="2"/><path d="M112 172 L134 178 L156 172" stroke="#F25F5C" stroke-width="3" fill="none"/>')
    a.head(110, 126, 21, SK['a'], '#B0532E', 'long', look=1)
    a.heart(160, 130, 2.4, '#FF8FA3', .9)
    save(a, 'story')


# ---------------------------------------------------------------- 4. wheelchair walk in the park
def wheel():
    a = Art(240, 300, 'A caregiver pushing a smiling man in a wheelchair through a sunny park')
    card(a, '#D6F3FF', '#E8FFF0')
    a.add('<path d="M0 196 Q120 176 240 198 V300 H0Z" fill="#9BE19A"/><path d="M0 250 Q120 236 240 252 V300 H0Z" fill="#7BCF7E"/>')
    a.add('<ellipse cx="60" cy="44" rx="26" ry="10" fill="#fff"/><ellipse cx="78" cy="38" rx="16" ry="10" fill="#fff"/><ellipse cx="180" cy="66" rx="22" ry="8" fill="#fff" opacity=".9"/>')
    a.add('<rect x="196" y="140" width="9" height="60" rx="4" fill="#8B5E3C"/><circle cx="200" cy="128" r="28" fill="#4FB36A"/><circle cx="188" cy="116" r="16" fill="#6DCB7F"/><circle cx="214" cy="120" r="10" fill="#E94B6A"/>')
    # balloon
    a.add('<path d="M128 192 Q140 140 150 86" stroke="#6B5A7A" stroke-width="1.6" fill="none"/>')
    a.heart(150, 72, 4.2, '#FF4D6D', 1, 8)
    a.add('<path d="M144 64 q4 -4 9 -3" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round" opacity=".7"/>')
    # wheelchair
    a.shadow(104, 270, 56, 8)
    a.add('<circle cx="94" cy="234" r="32" fill="none" stroke="#2C3149" stroke-width="7"/><circle cx="94" cy="234" r="24" fill="none" stroke="#9AA3C7" stroke-width="2"/>')
    for ang in range(0, 180, 30):
        import math
        x1 = 94 + 24 * math.cos(math.radians(ang)); y1 = 234 + 24 * math.sin(math.radians(ang))
        x2 = 94 - 24 * math.cos(math.radians(ang)); y2 = 234 - 24 * math.sin(math.radians(ang))
        a.add(f'<path d="M{x1:.1f} {y1:.1f} L{x2:.1f} {y2:.1f}" stroke="#9AA3C7" stroke-width="1.6"/>')
    a.add('<circle cx="94" cy="234" r="5" fill="#2C3149"/><circle cx="140" cy="258" r="9" fill="none" stroke="#2C3149" stroke-width="5"/>')
    a.add('<path d="M70 196 H130 L136 250" stroke="#2C3149" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>')
    a.add('<path d="M70 196 L66 150 L58 146" stroke="#2C3149" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>')
    a.add('<rect x="64" y="186" width="70" height="12" rx="6" fill="#F05D5E"/>')
    # seated man
    a.limb([(84, 192), (120, 194), (126, 238)], 14, '#3E5BA9', foot='#1F2A4F')
    a.limb([(96, 194), (132, 198), (138, 240)], 14, '#3E5BA9', foot='#1F2A4F')
    a.torso(70, 132, 44, 64, '#FFC23C')
    a.limb([(108, 146), (124, 168), (122, 180)], 11, '#FFC23C', hand=SK['d'])
    a.limb([(76, 146), (70, 170), (82, 182)], 11, '#FFC23C', hand=SK['d'])
    a.head(92, 108, 20, SK['d'], '#1D1620', 'curly', look=1)
    # caregiver pushing
    a.shadow(36, 272, 22, 5)
    a.limb([(30, 214), (24, 266)], 12, '#2A2F4F', foot='#151832')
    a.limb([(44, 214), (46, 266)], 12, '#2A2F4F', foot='#151832')
    a.torso(16, 140, 40, 78, '#EF476F')
    a.limb([(50, 154), (58, 150)], 11, '#EF476F', hand=SK['a'])
    a.head(36, 116, 19, SK['a'], '#E0A43B', 'long', look=1)
    a.sparkle(150, 100, 1.4, '#fff')
    a.sparkle(170, 150, 1, '#fff')
    save(a, 'wheel')


# ---------------------------------------------------------------- 5. home-cooked care
def meal():
    a = Art(240, 300, 'A caregiver carrying a tray with a warm bowl of soup, steam curling into hearts')
    card(a, '#FFF3CF', '#FFD9A3')
    a.add('<rect x="0" y="210" width="240" height="90" fill="#F7B267"/><rect x="0" y="206" width="240" height="10" fill="#E8964A"/>')
    # shelf + plants + pot
    a.add('<rect x="20" y="70" width="80" height="6" rx="3" fill="#C27C3E"/><rect x="28" y="50" width="16" height="20" rx="4" fill="#4CC9A0"/><path d="M36 50 q-8 -14 2 -20 q4 10 -2 20 M36 50 q10 -12 14 -4" fill="#3BA776"/><rect x="58" y="54" width="14" height="16" rx="3" fill="#FF6B6B"/><rect x="78" y="58" width="14" height="12" rx="3" fill="#FFD166"/>')
    a.add('<rect x="166" y="176" width="54" height="34" rx="8" fill="#5A6AA8"/><rect x="160" y="172" width="66" height="8" rx="4" fill="#45538C"/><path d="M178 160 q-6 -10 2 -18 M194 160 q-6 -10 2 -18" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" opacity=".7"/>')
    # veggies
    a.add('<path d="M28 238 l26 -8 l-4 10z" fill="#FF8C1A"/><path d="M52 230 l6 -6 m-4 8 l8 -2" stroke="#3BA776" stroke-width="3" stroke-linecap="round"/><circle cx="76" cy="236" r="9" fill="#EF3E36"/><path d="M73 227 q3 -3 6 0" stroke="#3BA776" stroke-width="2.5" fill="none"/>')
    # caregiver with tray
    a.shadow(128, 278, 30)
    a.limb([(118, 224), (114, 272)], 13, '#2B3A67', foot='#18213E')
    a.limb([(138, 224), (142, 272)], 13, '#2B3A67', foot='#18213E')
    a.torso(104, 140, 48, 90, '#06A77D')
    a.add('<path d="M110 176 H146 V230 H110Z" fill="#FFFFFF" opacity=".85"/><path d="M110 176 Q128 168 146 176" stroke="#fff" stroke-width="3" fill="none"/>')
    a.limb([(108, 156), (96, 178), (104, 186)], 12, '#06A77D', hand=SK['c'])
    a.limb([(148, 156), (160, 178), (152, 186)], 12, '#06A77D', hand=SK['c'])
    a.add('<rect x="86" y="182" width="84" height="8" rx="4" fill="#C9813F"/>')
    a.add(f'<path d="M104 166 Q128 194 152 166Z" fill="{a.grad("#FF7F50")}"/><ellipse cx="128" cy="166" rx="24" ry="5" fill="#FFB37A"/><ellipse cx="128" cy="166" rx="18" ry="3" fill="#F7D774"/>')
    a.head(128, 118, 21, SK['c'], '#2C1B18', 'short', look=0)
    a.add('<path d="M106 162 q-16 -2 -20 -14 q-4 -12 -16 -14" stroke="#ffffff" stroke-width="3.6" fill="none" stroke-linecap="round" opacity=".95"/><path d="M150 162 q16 -2 20 -14 q4 -12 16 -14" stroke="#ffffff" stroke-width="3.6" fill="none" stroke-linecap="round" opacity=".95"/>')
    a.heart(160, 92, 3, '#FF4D6D')
    a.sparkle(196, 110, 1.3, '#fff')
    save(a, 'meal')


# ---------------------------------------------------------------- 6. always there (hug)
def hug():
    a = Art(240, 300, 'A daughter warmly hugging her elderly mother as hearts float above them')
    card(a, '#FFB199', '#FFE4C8')
    a.add(f'<circle cx="120" cy="150" r="96" fill="{a.rad("halo", [(0, "#FFFFFF", .75), (1, "#FFFFFF", 0)])}"/>')
    a.add('<path d="M0 236 Q120 214 240 236 V300 H0Z" fill="#FF8C78"/><path d="M0 262 Q120 248 240 262 V300 H0Z" fill="#F2705E"/>')
    for x, y, s, c, r in ((60, 60, 3.2, '#FF4D6D', -12), (178, 48, 2.6, '#FF7B9C', 10), (120, 34, 2, '#FFFFFF', 0), (200, 104, 1.8, '#FF4D6D', 14), (34, 118, 1.8, '#FFFFFF', -8)):
        a.heart(x, y, s, c, .95, r)
    # mother (right, shorter)
    a.shadow(144, 276, 30)
    a.limb([(136, 226), (134, 272)], 13, '#5C4BA3', foot='#2E2457')
    a.limb([(152, 226), (156, 272)], 13, '#5C4BA3', foot='#2E2457')
    a.torso(122, 158, 46, 74, '#9B7BE0')
    a.head(145, 132, 20, SK['a'], '#ECE8F2', 'grandma', face='closed', look=-1)
    # daughter (left, taller) hugging
    a.shadow(96, 276, 30)
    a.limb([(88, 214), (84, 272)], 13, '#203A6B', foot='#101F3F')
    a.limb([(104, 214), (108, 272)], 13, '#203A6B', foot='#101F3F')
    a.torso(74, 136, 46, 84, '#FF5D73')
    a.head(98, 110, 21, SK['c'], '#2C1A14', 'longwave', face='closed', look=1)
    # arms around each other (drawn on top)
    a.limb([(114, 152), (140, 166), (160, 170)], 11, '#FF5D73', hand=SK['c'])
    a.limb([(160, 176), (132, 186), (112, 182)], 11, '#9B7BE0', hand=SK['a'])
    a.sparkle(200, 170, 1.4, '#fff')
    save(a, 'hug')


for fn in (walk, meds, story, wheel, meal, hug):
    fn()
print('scenes written to', os.path.abspath(OUT))

"""Animated "Circle of Care" banner for the caregiver reminder e-mail (public/images/email/circle-of-care.gif).
A plum night with a glass heart that slowly fills with warm light while twelve care beads light up one by one
around it, each tied to the heart by a golden bond. GIFs animate in Gmail, Apple Mail, Yahoo and most mobile
apps; Outlook desktop shows the first frame (already a complete, attractive picture).
    python3 scripts/art/email_circle.py
"""
import math, os
from PIL import Image, ImageDraw, ImageFilter

W, H, N, S = 600, 240, 26, 2          # size, frames, supersampling
OUT = os.path.join(os.path.dirname(__file__), '..', '..', 'public', 'images', 'email', 'circle-of-care.gif')
BEADS = ['#D7263D', '#0E7490', '#7B3FB8', '#0F9D7A', '#7C3AED', '#DB2777', '#0EA5A4', '#E11D48', '#2563EB', '#16A34A', '#EA580C', '#4F46E5']
hexrgb = lambda h: tuple(int(h[i:i + 2], 16) for i in (1, 3, 5))

def heart(cx, cy, s):
    pts = []
    for k in range(120):
        t = k / 120 * 2 * math.pi
        x = 16 * math.sin(t) ** 3
        y = 13 * math.cos(t) - 5 * math.cos(2 * t) - 2 * math.cos(3 * t) - math.cos(4 * t)
        pts.append((cx + x * s, cy - y * s))
    return pts

def bg():
    im = Image.new('RGB', (W * S, H * S))
    d = ImageDraw.Draw(im)
    for y in range(H * S):
        k = y / (H * S)
        d.line([(0, y), (W * S, y)], fill=(int(58 - 18 * k), int(18 - 4 * k), int(54 - 8 * k)))
    glow = Image.new('RGBA', im.size, (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    for cx, cy, r, c in [(150, 60, 160, (255, 122, 89, 70)), (470, 40, 150, (176, 106, 179, 80)), (300, 230, 180, (255, 198, 92, 50))]:
        gd.ellipse([(cx - r) * S, (cy - r) * S, (cx + r) * S, (cy + r) * S], fill=c)
    glow = glow.filter(ImageFilter.GaussianBlur(60 * S))
    im.paste(glow, (0, 0), glow)
    d = ImageDraw.Draw(im)
    import random
    random.seed(4)
    for _ in range(70):
        x, y, r = random.random() * W, random.random() * H, random.choice([1, 1, 1.4, 2])
        d.ellipse([(x - r) * S, (y - r) * S, (x + r) * S, (y + r) * S], fill=(255, 220, 232))
    return im

BASE = bg()
CX, CY, R = W / 2, H / 2 + 4, 92
frames = []
for i in range(N):
    t = i / N
    im = BASE.copy()
    lit = (int(t * 14) + 5) % 13    # beads lit so far (0..12), loops; frame 1 (Outlook) already shows 5
    fill = min(1, lit / 12)
    layer = Image.new('RGBA', im.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    # orbit
    d.ellipse([(CX - R * 1.65) * S, (CY - R * .62) * S, (CX + R * 1.65) * S, (CY + R * .62) * S], outline=(255, 214, 230, 70), width=2 * S)
    pos = []
    for k in range(12):
        a = k / 12 * 2 * math.pi + t * 2 * math.pi * .25
        pos.append((CX + math.cos(a) * R * 1.65, CY + math.sin(a) * R * .62, math.sin(a), k))
    # bonds behind
    for x, y, z, k in pos:
        if k < lit: d.line([(CX * S, CY * S), (x * S, y * S)], fill=(255, 198, 92, 120), width=2 * S)
    im.paste(layer, (0, 0), layer)
    # heart (glass + warm fill)
    hb = 1 + .05 * max(0, math.sin(t * 2 * math.pi * 3)) ** 8
    hs = 3.0 * hb
    hp = [(x * S, y * S) for x, y in heart(CX, CY - 4, hs)]
    mask = Image.new('L', im.size, 0)
    ImageDraw.Draw(mask).polygon(hp, fill=255)
    top = (CY - 4 - 16 * hs) * S
    bot = (CY - 4 + 17 * hs) * S
    level = bot - (bot - top) * max(.12, fill)
    grad = Image.new('RGB', im.size)
    gd = ImageDraw.Draw(grad)
    for y in range(int(top), int(bot) + 1):
        k = (y - top) / max(1, bot - top)
        c = (int(255 - 23 * k), int(198 - 129 * k), int(92 + 32 * k)) if y >= level else (43, 15, 46)
        gd.line([(0, y), (W * S, y)], fill=c)
    # little wave on the surface
    wave = Image.new('L', im.size, 0)
    wd = ImageDraw.Draw(wave)
    poly = [(x, level + math.sin(x / (14 * S) + t * 2 * math.pi * 2) * 3 * S) for x in range(0, W * S, 4)] + [(W * S, H * S), (0, H * S)]
    wd.polygon(poly, fill=255)
    dark = Image.new('RGB', im.size, (43, 15, 46))
    filled = Image.composite(grad, dark, wave)
    im.paste(filled, (0, 0), mask)
    o = Image.new('RGBA', im.size, (0, 0, 0, 0))
    od = ImageDraw.Draw(o)
    od.line(hp + [hp[0]], fill=(255, 211, 107, 255), width=4 * S)
    od.ellipse([(CX - 26) * S, (CY - 34) * S, (CX - 8) * S, (CY - 24) * S], fill=(255, 255, 255, 90))
    im.paste(o, (0, 0), o)
    # beads (front/back order)
    b = Image.new('RGBA', im.size, (0, 0, 0, 0))
    bd = ImageDraw.Draw(b)
    for x, y, z, k in sorted(pos, key=lambda p: p[2]):
        r = (13 + 3 * z) * S
        on = k < lit
        c = hexrgb(BEADS[k]) if on else (90, 70, 92)
        if on and k == lit - 1:
            bd.ellipse([x * S - r * 1.9, y * S - r * 1.9, x * S + r * 1.9, y * S + r * 1.9], outline=(255, 211, 107, 200), width=3 * S)
        if on: bd.ellipse([x * S - r - 3 * S, y * S - r - 3 * S, x * S + r + 3 * S, y * S + r + 3 * S], fill=(255, 211, 107, 255))
        bd.ellipse([x * S - r, y * S - r, x * S + r, y * S + r], fill=c + (255,))
        bd.ellipse([x * S - r * .55, y * S - r * .6, x * S - r * .05, y * S - r * .2], fill=(255, 255, 255, 120 if on else 50))
    im.paste(b, (0, 0), b)
    frames.append(im.resize((W, H), Image.LANCZOS))
os.makedirs(os.path.dirname(OUT), exist_ok=True)
pal = frames[-1].quantize(colors=96, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.NONE)  # one shared palette → tiny frame diffs
frames = [f.quantize(palette=pal, dither=Image.Dither.NONE) for f in frames]
frames[0].save(OUT, save_all=True, append_images=frames[1:], duration=120, loop=0, optimize=True, disposal=1)
print('✔', os.path.relpath(OUT), os.path.getsize(OUT) // 1024, 'KB')

#!/usr/bin/env python3
"""Generate lightweight, on-brand abstract WebP cover art for every blog post.
Usage: npm run covers   (requires Python 3 + Pillow)
Covers are decorative; titles are rendered in HTML for SEO and accessibility.
Replace any cover with real photography of the same filename/size (1200x675, WebP) at any time.
"""
import glob, hashlib, math, os, random, re
from PIL import Image, ImageDraw, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'public', 'images', 'blog')
os.makedirs(OUT, exist_ok=True)

PALETTES = {
    'Getting Started': [(255, 138, 0), (255, 194, 51), (11, 30, 91)],
    'Earning Ideas': [(20, 201, 181), (47, 107, 255), (11, 30, 91)],
    'Students': [(139, 92, 246), (255, 94, 126), (20, 22, 70)],
    'Rewards': [(255, 194, 51), (255, 138, 0), (6, 15, 51)],
    'India': [(255, 138, 0), (20, 201, 181), (11, 30, 91)],
    'Professionals': [(47, 107, 255), (139, 92, 246), (6, 15, 51)],
    'Safety': [(20, 201, 181), (47, 107, 255), (6, 24, 51)],
    'Tips': [(255, 94, 126), (255, 194, 51), (20, 22, 70)],
    'Behind the Scenes': [(47, 107, 255), (255, 138, 0), (6, 15, 51)],
}

posts = []
for f in sorted(glob.glob(os.path.join(ROOT, 'src', 'data', 'blogs', 'part*.js'))):
    src = open(f, encoding='utf-8').read()
    for m in re.finditer(r"slug: '([^']+)'.*?category: '([^']+)'", src, re.S):
        posts.append((m.group(1), m.group(2)))

W, H = 1200, 675
for slug, cat in posts:
    seed = int(hashlib.md5(slug.encode()).hexdigest()[:8], 16)
    rnd = random.Random(seed)
    a, b, bg = PALETTES.get(cat, PALETTES['Getting Started'])
    img = Image.new('RGB', (W, H), bg)
    d = ImageDraw.Draw(img)
    for y in range(H):  # vertical gradient
        t = y / H
        d.line([(0, y), (W, y)], fill=tuple(int(bg[i] * (1 - t * 0.4) + b[i] * t * 0.25) for i in range(3)))
    glow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    g = ImageDraw.Draw(glow)
    for _ in range(3):
        r = rnd.randint(140, 300)
        x, y = rnd.randint(0, W), rnd.randint(0, H)
        col = a if rnd.random() > 0.4 else b
        g.ellipse((x - r, y - r, x + r, y + r), fill=col + (85,))
    glow = glow.filter(ImageFilter.GaussianBlur(80))
    img.paste(glow, (0, 0), glow)
    layer = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    l = ImageDraw.Draw(layer)
    cx, cy = rnd.randint(650, 950), rnd.randint(220, 450)
    for i in range(7):  # orbit rings
        r = 70 + i * 52
        l.ellipse((cx - r, cy - r * 0.42, cx + r, cy + r * 0.42), outline=(255, 255, 255, 40 + i * 6), width=2)
    for i in range(26):  # coins / data points
        ang = rnd.random() * math.tau
        r = rnd.randint(70, 380)
        x, y = cx + math.cos(ang) * r, cy + math.sin(ang) * r * 0.42
        s = rnd.randint(5, 16)
        col = (a if i % 2 else b) + (230,)
        l.ellipse((x - s, y - s, x + s, y + s), fill=col)
    for _ in range(90):  # dot grid sparkle
        x, y = rnd.randint(0, W), rnd.randint(0, H)
        l.ellipse((x, y, x + 2, y + 2), fill=(255, 255, 255, rnd.randint(30, 120)))
    img.paste(layer, (0, 0), layer)
    img.save(os.path.join(OUT, slug + '.webp'), 'WEBP', quality=72, method=6)
print(f'Generated {len(posts)} covers in {OUT}')

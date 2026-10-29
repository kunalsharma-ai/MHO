#!/usr/bin/env python3
"""
Animated "Synapse" banner for the HCP reminder e-mail → public/images/email/synapse.gif (+ synapse.png first frame).
Navy console with a blueprint grid, a golden-angle network of hexagon neurons around the Evidence Core; neurons fire one
after another, pulses run to the core and the core ring fills. Shared palette, small file, Outlook shows frame 1.
  python3 scripts/art/email_synapse.py
"""
import math, os
from PIL import Image, ImageChops, ImageDraw, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
OUT = os.path.join(ROOT, 'public', 'images', 'email')
W, H, S = 560, 220, 2  # draw at 2x, downsample
COLS = [('#ff3d6e', '#ff9a8b'), ('#1f6bff', '#3cc8ff'), ('#7a3cff', '#d18bff'), ('#f59e0b', '#ffd85a'), ('#ff6a13', '#ffb36b'),
        ('#00a693', '#5ff0d6'), ('#05a36b', '#7cf0b9'), ('#d99a00', '#ffe45c'), ('#0891b2', '#6ff0ff'), ('#e0267d', '#ff9cd0'), ('#4f46e5', '#22d3ee')]
N = len(COLS)
GOLD = math.pi * (3 - math.sqrt(5))
cx, cy = W * S // 2, H * S // 2
core_r = 46 * S

def hexpts(x, y, r):
    return [(x + r * math.cos(math.radians(60 * k - 90)), y + r * math.sin(math.radians(60 * k - 90))) for k in range(6)]

def rgb(h):
    h = h.lstrip('#'); return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))

def mix(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))

# node positions: ellipse spiral (wide banner)
pts = []
for i in range(N):
    r = 0.52 + 0.48 * math.sqrt((i + 0.35) / (N - 0.4))
    a = i * GOLD - math.pi / 2
    pts.append((cx + math.cos(a) * r * 235 * S, cy + math.sin(a) * r * 80 * S))

def frame(t, lit):
    im = Image.new('RGB', (W * S, H * S), rgb('#06192A'))
    d = ImageDraw.Draw(im)
    for x in range(0, W * S, 22 * S): d.line([(x, 0), (x, H * S)], fill=rgb('#0C2A40'), width=1)
    for y in range(0, H * S, 22 * S): d.line([(0, y), (W * S, y)], fill=rgb('#0C2A40'), width=1)
    glow = Image.new('RGB', im.size, (0, 0, 0)); g = ImageDraw.Draw(glow)
    g.ellipse([cx - 120 * S, cy - 90 * S, cx + 120 * S, cy + 90 * S], fill=rgb('#0F4C5C'))
    glow = glow.filter(ImageFilter.GaussianBlur(40 * S))

    im = ImageChops.add(im, glow)
    d = ImageDraw.Draw(im)
    # dendrites
    for i, p in enumerate(pts):
        j = min(range(i), key=lambda k: (p[0] - pts[k][0]) ** 2 + (p[1] - pts[k][1]) ** 2) if i else -1
        tgt = (cx, cy) if (i < 4 or j < 0) else pts[j]
        on = i < lit and (j < 0 or i < 4 or j < lit)
        d.line([p, tgt], fill=rgb('#2EE6C5') if on else rgb('#23435C'), width=3 * S if on else 1 * S)
    # pulse travelling
    if 0 < lit <= N and t < 1:
        p = pts[lit - 1]; x = p[0] + (cx - p[0]) * t; y = p[1] + (cy - p[1]) * t
        d.ellipse([x - 7 * S, y - 7 * S, x + 7 * S, y + 7 * S], fill=rgb('#E9FFFB'), outline=rgb('#2EE6C5'), width=3 * S)
    # core
    d.ellipse([cx - core_r, cy - core_r, cx + core_r, cy + core_r], fill=rgb('#0B2A45'), outline=rgb('#2EE6C5'), width=2 * S)
    frac = min(lit, N) / N
    if frac:
        d.arc([cx - core_r - 6 * S, cy - core_r - 6 * S, cx + core_r + 6 * S, cy + core_r + 6 * S], -90, -90 + 360 * frac, fill=rgb('#2EE6C5'), width=5 * S)
    # core heart-cross
    c = rgb('#2EE6C5'); s = 13 * S
    d.rectangle([cx - s / 2.6, cy - s * 1.4, cx + s / 2.6, cy + s * 1.4], fill=c)
    d.rectangle([cx - s * 1.4, cy - s / 2.6, cx + s * 1.4, cy + s / 2.6], fill=c)
    hr = 9 * S
    d.ellipse([cx - hr * 1.15, cy - hr * .9, cx - hr * .05, cy + hr * .2], fill=rgb('#FF5A6E'))
    d.ellipse([cx + hr * .05, cy - hr * .9, cx + hr * 1.15, cy + hr * .2], fill=rgb('#FF5A6E'))
    d.polygon([(cx - hr * 1.1, cy - hr * .2), (cx + hr * 1.1, cy - hr * .2), (cx, cy + hr * 1.1)], fill=rgb('#FF5A6E'))
    # neurons
    for i, p in enumerate(pts):
        a, b = COLS[i]
        r = 17 * S
        if i < lit:
            d.polygon(hexpts(p[0], p[1], r + 4 * S), fill=mix(rgb(a), rgb('#06192A'), .55))
            d.polygon(hexpts(p[0], p[1], r), fill=rgb(a))
            d.polygon(hexpts(p[0] - 3 * S, p[1] - 3 * S, r * .55), fill=rgb(b))
            d.ellipse([p[0] + r * .45, p[1] - r - 2 * S, p[0] + r * .45 + 12 * S, p[1] - r + 10 * S], fill=rgb('#2EE6C5'))
        else:
            d.polygon(hexpts(p[0], p[1], r), fill=rgb('#1A3550'), outline=mix(rgb(a), rgb('#1A3550'), .4))
            d.polygon(hexpts(p[0], p[1], r * .4), fill=mix(rgb(a), rgb('#1A3550'), .45))
    return im.resize((W, H), Image.LANCZOS)

frames, durs = [], []
for k in range(N + 1):
    if k:
        for t in (0.0, 0.5):
            frames.append(frame(t, k)); durs.append(90)
    frames.append(frame(1, k)); durs.append(260 if k < N else 1800)
pal = frames[-1].convert('P', palette=Image.ADAPTIVE, colors=64)
q = [f.quantize(palette=pal, dither=Image.Dither.NONE) for f in frames]
os.makedirs(OUT, exist_ok=True)
q[0].save(os.path.join(OUT, 'synapse.gif'), save_all=True, append_images=q[1:], duration=durs, loop=0, disposal=1, optimize=True)
frames[-1].save(os.path.join(OUT, 'synapse.png'))
print('synapse.gif', os.path.getsize(os.path.join(OUT, 'synapse.gif')) // 1024, 'KB', len(frames), 'frames')

"""Tiny SVG illustration kit (gradients, sparkles, hearts, people).
Used by scripts/art/patient.py to draw the patient profile illustrations."""
import colorsys

def _rgb(h):
    h = h.lstrip('#')
    if len(h) == 3:
        h = ''.join(c * 2 for c in h)
    return tuple(int(h[i:i + 2], 16) / 255 for i in (0, 2, 4))

def _hex(rgb):
    return '#' + ''.join(f'{max(0, min(255, round(c * 255))):02x}' for c in rgb)

def shade(h, f):
    """f>0 lighter, f<0 darker (HLS lightness)."""
    r, g, b = _rgb(h)
    hh, l, s = colorsys.rgb_to_hls(r, g, b)
    l = l + (1 - l) * f if f > 0 else l * (1 + f)
    return _hex(colorsys.hls_to_rgb(hh, l, s))


class Art:
    def __init__(self, w, h, title):
        self.w, self.h, self.title = w, h, title
        self.defs, self.body, self._g = [], [], {}

    # ---------- paint ----------
    def grad(self, color, angle='diag', light=0.28, dark=-0.18):
        key = (color, angle, light, dark)
        if key in self._g:
            return f'url(#{self._g[key]})'
        gid = f'g{len(self._g)}'
        self._g[key] = gid
        x1, y1, x2, y2 = {'diag': (0, 0, 1, 1), 'v': (0, 0, 0, 1), 'h': (0, 0, 1, 0)}[angle]
        self.defs.append(f'<linearGradient id="{gid}" x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}"><stop offset="0" stop-color="{shade(color, light)}"/><stop offset="1" stop-color="{shade(color, dark)}"/></linearGradient>')
        return f'url(#{gid})'

    def lin(self, gid, stops, v=True):
        x2, y2 = (0, 1) if v else (1, 0)
        s = ''.join(f'<stop offset="{o}" stop-color="{c}"/>' for o, c in stops)
        self.defs.append(f'<linearGradient id="{gid}" x1="0" y1="0" x2="{x2}" y2="{y2}">{s}</linearGradient>')
        return f'url(#{gid})'

    def rad(self, gid, stops, cx=.5, cy=.5, r=.5):
        s = ''.join(f'<stop offset="{o}" stop-color="{c}" stop-opacity="{op}"/>' for o, c, op in stops)
        self.defs.append(f'<radialGradient id="{gid}" cx="{cx}" cy="{cy}" r="{r}">{s}</radialGradient>')
        return f'url(#{gid})'

    def add(self, s):
        self.body.append(s)

    # ---------- primitives ----------
    def shadow(self, cx, cy, rx, ry=None, op=.18):
        self.add(f'<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry or rx * .22}" fill="#1b1030" opacity="{op}"/>')

    def heart(self, cx, cy, s, color, op=1, rot=0):
        p = f'M0 3.2 C-2.4 1.4 -4 0 -4 -1.6 C-4 -3 -2.9 -4 -1.7 -4 C-0.9 -4 -0.3 -3.6 0 -3 C0.3 -3.6 0.9 -4 1.7 -4 C2.9 -4 4 -3 4 -1.6 C4 0 2.4 1.4 0 3.2Z'
        self.add(f'<path d="{p}" transform="translate({cx} {cy}) rotate({rot}) scale({s})" fill="{color}" opacity="{op}"/>')

    def sparkle(self, cx, cy, s, color='#ffffff', op=1):
        self.add(f'<path d="M0 -4 L1 -1 L4 0 L1 1 L0 4 L-1 1 L-4 0 L-1 -1Z" transform="translate({cx} {cy}) scale({s})" fill="{color}" opacity="{op}"/>')

    def plus(self, cx, cy, s, color):
        self.add(f'<path d="M-1 -3h2v2h2v2h-2v2h-2v-2h-2v-2h2z" transform="translate({cx} {cy}) scale({s})" fill="{color}"/>')

    # ---------- people ----------
    def head(self, cx, cy, r, skin, hair, style='short', face='smile', look=0):
        hg = self.grad(hair, 'diag', .25, -.25)
        sk = self.grad(skin, 'diag', .18, -.1)
        if style in ('long', 'longwave'):
            self.add(f'<path d="M{cx - r * 1.08} {cy - r * .1} Q{cx - r * 1.25} {cy + r * 1.5} {cx - r * .55} {cy + r * 1.75} L{cx + r * .55} {cy + r * 1.75} Q{cx + r * 1.25} {cy + r * 1.5} {cx + r * 1.08} {cy - r * .1}Z" fill="{hg}"/>')
        if style == 'bun':
            self.add(f'<circle cx="{cx + r * .55}" cy="{cy - r * 1.0}" r="{r * .48}" fill="{hg}"/>')
        # ears + face
        self.add(f'<circle cx="{cx - r * .95}" cy="{cy + r * .12}" r="{r * .2}" fill="{shade(skin, -.08)}"/><circle cx="{cx + r * .95}" cy="{cy + r * .12}" r="{r * .2}" fill="{shade(skin, -.08)}"/>')
        self.add(f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{sk}"/>')
        # hair cap
        if style in ('short', 'long', 'bun', 'longwave', 'child'):
            self.add(f'<path d="M{cx - r * 1.02} {cy + r * .05} Q{cx - r * 1.05} {cy - r * 1.18} {cx} {cy - r * 1.12} Q{cx + r * 1.05} {cy - r * 1.18} {cx + r * 1.02} {cy + r * .05} Q{cx + r * .7} {cy - r * .55} {cx + r * .1} {cy - r * .5} Q{cx - r * .55} {cy - r * .2} {cx - r * 1.02} {cy + r * .05}Z" fill="{hg}"/>')
        elif style == 'gray':
            self.add(f'<path d="M{cx - r * 1.0} {cy + r * .15} Q{cx - r * 1.1} {cy - r * .9} {cx - r * .3} {cy - r * 1.02} Q{cx + r * .9} {cy - r * 1.1} {cx + r * 1.0} {cy + r * .15} Q{cx + r * .85} {cy - r * .45} {cx + r * .25} {cy - r * .62} Q{cx - r * .5} {cy - r * .6} {cx - r * 1.0} {cy + r * .15}Z" fill="{hg}"/>')
        elif style == 'grandma':
            self.add(f'<circle cx="{cx}" cy="{cy - r * 1.05}" r="{r * .42}" fill="{hg}"/>')
            self.add(f'<path d="M{cx - r * 1.05} {cy + r * .35} Q{cx - r * 1.15} {cy - r * 1.15} {cx} {cy - r * 1.1} Q{cx + r * 1.15} {cy - r * 1.15} {cx + r * 1.05} {cy + r * .35} Q{cx + r * .8} {cy - r * .5} {cx} {cy - r * .62} Q{cx - r * .8} {cy - r * .5} {cx - r * 1.05} {cy + r * .35}Z" fill="{hg}"/>')
        elif style == 'curly':
            for dx, dy, rr in ((-.75, -.55, .42), (-.35, -.9, .45), (.15, -1.0, .45), (.6, -.75, .45), (.9, -.3, .35), (-.95, -.15, .32)):
                self.add(f'<circle cx="{cx + r * dx}" cy="{cy + r * dy}" r="{r * rr}" fill="{hg}"/>')
        # face
        ex = r * .36
        lx = r * .12 * look
        if face == 'closed':
            self.add(f'<path d="M{cx - ex - r * .14 + lx} {cy + r * .08} q{r * .14} {r * .12} {r * .28} 0 M{cx + ex - r * .14 + lx} {cy + r * .08} q{r * .14} {r * .12} {r * .28} 0" stroke="#3a2230" stroke-width="{r * .09}" fill="none" stroke-linecap="round"/>')
        else:
            self.add(f'<circle cx="{cx - ex + lx}" cy="{cy + r * .08}" r="{r * .1}" fill="#2b1a26"/><circle cx="{cx + ex + lx}" cy="{cy + r * .08}" r="{r * .1}" fill="#2b1a26"/>')
            self.add(f'<circle cx="{cx - ex + lx + r * .035}" cy="{cy + r * .05}" r="{r * .035}" fill="#fff"/><circle cx="{cx + ex + lx + r * .035}" cy="{cy + r * .05}" r="{r * .035}" fill="#fff"/>')
        self.add(f'<path d="M{cx - r * .26 + lx} {cy + r * .42} Q{cx + lx} {cy + r * .66} {cx + r * .26 + lx} {cy + r * .42}" stroke="#7a2e3b" stroke-width="{r * .1}" fill="none" stroke-linecap="round"/>')
        self.add(f'<circle cx="{cx - r * .62 + lx}" cy="{cy + r * .38}" r="{r * .16}" fill="#ff7b8a" opacity=".45"/><circle cx="{cx + r * .62 + lx}" cy="{cy + r * .38}" r="{r * .16}" fill="#ff7b8a" opacity=".45"/>')
        if style == 'gray' or style == 'grandma':
            self.add(f'<path d="M{cx - ex - r * .2 + lx} {cy + r * .1} h{r * .4} M{cx + ex - r * .2 + lx} {cy + r * .1} h{r * .4}" stroke="#5b4a5a" stroke-width="{r * .05}" opacity=".0"/>')

    def glasses(self, cx, cy, r, look=0):
        lx = r * .12 * look
        self.add(f'<g fill="none" stroke="#3b2d3a" stroke-width="{r * .07}"><circle cx="{cx - r * .36 + lx}" cy="{cy + r * .08}" r="{r * .22}"/><circle cx="{cx + r * .36 + lx}" cy="{cy + r * .08}" r="{r * .22}"/><path d="M{cx - r * .14 + lx} {cy + r * .08} h{r * .28}"/></g>')

    def torso(self, x, y, w, h, color, rr=None):
        rr = rr if rr is not None else w * .38
        self.add(f'<path d="M{x + rr} {y} H{x + w - rr} Q{x + w} {y} {x + w} {y + rr} V{y + h} H{x} V{y + rr} Q{x} {y} {x + rr} {y}Z" fill="{self.grad(color)}"/>')

    def limb(self, pts, w, color, hand=None, foot=None):
        d = 'M' + ' L'.join(f'{x} {y}' for x, y in pts)
        self.add(f'<path d="{d}" stroke="{shade(color, -.05)}" stroke-width="{w}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>')
        if hand:
            x, y = pts[-1]
            self.add(f'<circle cx="{x}" cy="{y}" r="{w * .55}" fill="{self.grad(hand, "diag", .15, -.1)}"/>')
        if foot:
            x, y = pts[-1]
            self.add(f'<ellipse cx="{x + w * .35}" cy="{y + w * .15}" rx="{w * .8}" ry="{w * .45}" fill="{foot}"/>')

    def svg(self, extra_attrs=''):
        return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {self.w} {self.h}" width="{self.w}" height="{self.h}" role="img" aria-label="{self.title}" {extra_attrs}>'
                f'<title>{self.title}</title><defs>{"".join(self.defs)}</defs>{"".join(self.body)}</svg>')

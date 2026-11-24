"use client";
// Real-time 3D art for each panel, drawn with three.js (loaded only when a scene is on screen):
//   HCP        a glossy DNA double helix with a glass medical cross and capsules orbiting it ("Clinical Genome")
//   Caregiver  a beating glossy heart inside a ring of glowing beads ("Circle of Care")
//   Patient    a glass orb with a glowing heartbeat line and orbiting rings ("Health Pulse")
// The scene follows the pointer, pauses when it is off screen or the tab is hidden, draws a single still frame with
// prefers-reduced-motion, and shows the panel's flat art instead when WebGL is not available.
import React from "react";

const COLORS = {
  hcp: { a: "#5B4BFF", b: "#FF5A78", c: "#22C3F5", glow: "#8B7CFF" },
  caregiver: { a: "#E8457C", b: "#FF7A59", c: "#FFC65C", glow: "#FF8FB1" },
  patient: { a: "#14B8C4", b: "#3B82F6", c: "#8B5CF6", glow: "#5CC8F0" },
};

function heartShape(THREE, s = 1) {
  const h = new THREE.Shape();
  h.moveTo(0, -1.05 * s);
  h.bezierCurveTo(-0.15 * s, -0.85 * s, -1.25 * s, -0.25 * s, -1.05 * s, 0.38 * s);
  h.bezierCurveTo(-0.9 * s, 0.95 * s, -0.2 * s, 1.0 * s, 0, 0.55 * s);
  h.bezierCurveTo(0.2 * s, 1.0 * s, 0.9 * s, 0.95 * s, 1.05 * s, 0.38 * s);
  h.bezierCurveTo(1.25 * s, -0.25 * s, 0.15 * s, -0.85 * s, 0, -1.05 * s);
  return h;
}

function crossShape(THREE, s = 1) {
  const c = new THREE.Shape();
  const a = 0.32 * s, b = 1 * s;
  c.moveTo(-a, b); c.lineTo(a, b); c.lineTo(a, a); c.lineTo(b, a); c.lineTo(b, -a); c.lineTo(a, -a);
  c.lineTo(a, -b); c.lineTo(-a, -b); c.lineTo(-a, -a); c.lineTo(-b, -a); c.lineTo(-b, a); c.lineTo(-a, a); c.closePath();
  return c;
}

function build(THREE, panel, scene, colors, compact) {
  const C = (x) => new THREE.Color(x);
  const glossy = (color, extra = {}) => new THREE.MeshPhysicalMaterial({ color: C(color), roughness: 0.18, metalness: 0.05, clearcoat: 1, clearcoatRoughness: 0.08, sheen: 0.4, ...extra });
  const glass = (color) => new THREE.MeshPhysicalMaterial({ color: C(color), roughness: 0.05, transmission: 0.92, thickness: 0.6, ior: 1.35, clearcoat: 1, transparent: true, opacity: 0.95 });
  const glow = (color, o = 0.9) => new THREE.MeshBasicMaterial({ color: C(color), transparent: true, opacity: o });
  const root = new THREE.Group();
  scene.add(root);
  const tick = [];

  // soft particle dust shared by every panel
  const dust = new THREE.BufferGeometry();
  const N = compact ? 70 : 160;
  const pos = new Float32Array(N * 3);
  for (let i = 0; i < N; i += 1) { pos[i * 3] = (Math.random() - 0.5) * 9; pos[i * 3 + 1] = (Math.random() - 0.5) * 6; pos[i * 3 + 2] = (Math.random() - 0.5) * 4 - 1; }
  dust.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  const dots = new THREE.Points(dust, new THREE.PointsMaterial({ color: C(colors.glow), size: 0.045, transparent: true, opacity: 0.75, depthWrite: false }));
  scene.add(dots);
  tick.push((t) => { dots.rotation.y = t * 0.03; dots.position.y = Math.sin(t * 0.4) * 0.08; });

  if (panel === "hcp") {
    const helix = new THREE.Group();
    const ball = new THREE.SphereGeometry(0.17, 32, 24);
    const rung = new THREE.CylinderGeometry(0.035, 0.035, 1, 12);
    const mA = glossy(colors.a), mB = glossy(colors.b), mR = glossy("#ffffff", { roughness: 0.3, transparent: true, opacity: 0.7 });
    const steps = compact ? 12 : 16;
    for (let i = 0; i < steps; i += 1) {
      const y = (i - (steps - 1) / 2) * 0.2;
      const ang = i * 0.55;
      const r = 0.7;
      const p1 = new THREE.Vector3(Math.cos(ang) * r, y, Math.sin(ang) * r);
      const p2 = new THREE.Vector3(-Math.cos(ang) * r, y, -Math.sin(ang) * r);
      const s1 = new THREE.Mesh(ball, mA); s1.position.copy(p1); helix.add(s1);
      const s2 = new THREE.Mesh(ball, mB); s2.position.copy(p2); helix.add(s2);
      const rr = new THREE.Mesh(rung, mR);
      rr.position.set(0, y, 0); rr.scale.y = r * 2; rr.rotation.z = Math.PI / 2; rr.rotation.y = -ang; helix.add(rr);
    }
    helix.rotation.z = 0.5;
    root.add(helix);
    tick.push((t) => { helix.rotation.y = t * 0.45; });

    const cross = new THREE.Mesh(new THREE.ExtrudeGeometry(crossShape(THREE, 0.42), { depth: 0.22, bevelEnabled: true, bevelThickness: 0.08, bevelSize: 0.06, bevelSegments: 6 }), glossy("#FF4D6D", { clearcoat: 1 }));
    cross.geometry.center();
    const capsule = (c1, c2) => {
      const g = new THREE.Group();
      const body = new THREE.CapsuleGeometry(0.16, 0.36, 8, 24);
      const half = (m, up) => { const x = new THREE.Mesh(body, m); x.scale.y = 0.5; x.position.y = up ? 0.13 : -0.13; return x; };
      g.add(half(glossy(c1), true)); g.add(half(glossy(c2), false));
      return g;
    };
    const sats = [[cross, 2.05, 0.0, 0.7], [capsule(colors.c, "#F4F7FF"), 1.9, 2.1, 0.9], [capsule("#FFC65C", "#FF7A45"), 2.15, 4.2, 0.8]];
    sats.forEach(([m, rad, off, sp]) => {
      root.add(m);
      tick.push((t) => {
        const a = t * 0.35 * sp + off;
        m.position.set(Math.cos(a) * rad, Math.sin(a * 1.3) * 0.6, Math.sin(a) * rad * 0.7);
        m.rotation.set(t * 0.6 * sp, t * 0.8, t * 0.3);
      });
    });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(2.05, 0.012, 8, 160), glow(colors.glow, 0.5));
    ring.rotation.x = Math.PI / 2.3; root.add(ring);
    tick.push((t) => { ring.rotation.z = t * 0.1; });
  }

  if (panel === "caregiver") {
    const heart = new THREE.Mesh(
      new THREE.ExtrudeGeometry(heartShape(THREE, 0.95), { depth: 0.55, bevelEnabled: true, bevelThickness: 0.28, bevelSize: 0.22, bevelSegments: 12, curveSegments: 48 }),
      glossy(colors.a, { sheen: 1, sheenColor: C("#FFC2D6"), roughness: 0.22 }),
    );
    heart.geometry.center();
    root.add(heart);
    tick.push((t) => {
      const beat = 1 + Math.max(0, Math.sin(t * 5.2)) ** 8 * 0.08 + Math.max(0, Math.sin(t * 5.2 - 0.9)) ** 8 * 0.05;
      heart.scale.setScalar(beat);
      heart.rotation.y = Math.sin(t * 0.6) * 0.45;
      heart.rotation.x = Math.sin(t * 0.4) * 0.08;
    });
    const beads = new THREE.Group();
    const bead = new THREE.SphereGeometry(0.11, 24, 16);
    const palette = [colors.a, colors.b, colors.c, "#B06AB3", "#2BAE8C"];
    const nb = compact ? 14 : 22;
    for (let i = 0; i < nb; i += 1) {
      const a = (i / nb) * Math.PI * 2;
      const m = new THREE.Mesh(bead, glossy(palette[i % palette.length], { emissive: C(palette[i % palette.length]), emissiveIntensity: 0.25 }));
      m.position.set(Math.cos(a) * 1.75, Math.sin(a) * 1.75, 0);
      beads.add(m);
    }
    beads.rotation.x = 1.15;
    root.add(beads);
    tick.push((t) => { beads.rotation.z = t * 0.25; beads.children.forEach((b, i) => b.scale.setScalar(1 + Math.sin(t * 2 + i * 0.7) * 0.18)); });
    const small = new THREE.ExtrudeGeometry(heartShape(THREE, 0.18), { depth: 0.08, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.04, bevelSegments: 4 });
    small.center();
    for (let i = 0; i < 5; i += 1) {
      const m = new THREE.Mesh(small, glossy(i % 2 ? colors.b : "#FF8FB1"));
      root.add(m);
      const off = i * 1.3;
      tick.push((t) => {
        const k = ((t * 0.18 + off / 6.5) % 1);
        m.position.set(Math.sin(off * 3) * 2.1, -1.6 + k * 3.4, Math.cos(off) * 0.8 + 0.4);
        m.rotation.y = t + off;
        m.scale.setScalar(Math.sin(k * Math.PI));
      });
    }
  }

  if (panel === "patient") {
    const orb = new THREE.Mesh(new THREE.SphereGeometry(1.25, 64, 48), glass("#CFF3FF"));
    root.add(orb);
    const core = new THREE.Mesh(new THREE.SphereGeometry(0.55, 48, 32), new THREE.MeshPhysicalMaterial({ color: C(colors.b), emissive: C(colors.a), emissiveIntensity: 0.7, roughness: 0.3, transparent: true, opacity: 0.55 }));
    root.add(core);
    const pts = [[-1.6, 0], [-0.55, 0], [-0.38, 0.28], [-0.2, -0.55], [0, 0.8], [0.2, -0.3], [0.35, 0.12], [0.5, 0], [1.6, 0]].map(([x, y]) => new THREE.Vector3(x, y, 0.05));
    const curve = new THREE.CatmullRomCurve3(pts, false, "catmullrom", 0.05);
    const line = new THREE.Mesh(new THREE.TubeGeometry(curve, 200, 0.045, 12, false), new THREE.MeshBasicMaterial({ color: C("#E1192F") }));
    root.add(line);
    const spark = new THREE.Mesh(new THREE.SphereGeometry(0.09, 16, 12), glow("#FFFFFF", 1));
    root.add(spark);
    tick.push((t) => {
      const k = (t * 0.45) % 1;
      spark.position.copy(curve.getPointAt(k));
      const beat = 1 + Math.max(0, Math.sin(t * 2 * Math.PI * 0.45 * 2)) ** 10 * 0.12;
      core.scale.setScalar(beat);
      orb.rotation.y = t * 0.2;
      root.rotation.y = Math.sin(t * 0.3) * 0.35;
    });
    [[1.75, 0.02, 1.2, colors.a], [2.05, 0.014, 0.6, colors.c], [1.55, 0.01, 2.0, colors.b]].forEach(([r, th, tilt, col], i) => {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(r, th, 8, 180), glow(col, 0.65));
      ring.rotation.x = tilt; root.add(ring);
      const moon = new THREE.Mesh(new THREE.SphereGeometry(0.08 + i * 0.02, 20, 14), glossy(col, { emissive: C(col), emissiveIntensity: 0.6 }));
      root.add(moon);
      tick.push((t) => {
        ring.rotation.z = t * (0.15 + i * 0.07);
        const a = t * (0.5 + i * 0.2) + i * 2;
        const v = new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, 0).applyEuler(new THREE.Euler(tilt, 0, t * (0.15 + i * 0.07)));
        moon.position.copy(v);
      });
    });
  }
  return { root, tick };
}

export default function Scene3D({ panel = "patient", compact = false, className = "", fallback = null, label }) {
  const ref = React.useRef(null);
  const [failed, setFailed] = React.useState(false);
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => {
    const host = ref.current;
    if (!host) return undefined;
    let disposed = false;
    let cleanup = () => {};
    (async () => {
      let THREE; let RoomEnvironment;
      try {
        THREE = await import("three");
        ({ RoomEnvironment } = await import("three/examples/jsm/environments/RoomEnvironment.js"));
      } catch (e) { if (!disposed) setFailed(true); return; }
      if (disposed) return;
      let renderer;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
      } catch (e) { setFailed(true); return; }
      renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;
      host.appendChild(renderer.domElement);
      const scene = new THREE.Scene();
      const pmrem = new THREE.PMREMGenerator(renderer);
      scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
      const colors = COLORS[panel] || COLORS.patient;
      const key = new THREE.DirectionalLight(0xffffff, 1.6); key.position.set(3, 4, 5); scene.add(key);
      const rim = new THREE.PointLight(new THREE.Color(colors.b), 18, 12); rim.position.set(-3, -1, 2); scene.add(rim);
      const fill = new THREE.PointLight(new THREE.Color(colors.a), 14, 12); fill.position.set(3, -2, 3); scene.add(fill);
      scene.add(new THREE.AmbientLight(0xffffff, 0.35));
      const camera = new THREE.PerspectiveCamera(compact ? 38 : 34, 1, 0.1, 50);
      camera.position.set(0, 0, compact ? 6.2 : 6.6);
      const { root, tick } = build(THREE, panel, scene, colors, compact);
      const size = () => {
        const w = host.clientWidth || 300; const h = host.clientHeight || 300;
        renderer.setSize(w, h, false);
        camera.aspect = w / h; camera.updateProjectionMatrix();
      };
      size();
      const ro = new ResizeObserver(size); ro.observe(host);
      const target = { x: 0, y: 0 };
      const onMove = (e) => {
        const r = host.getBoundingClientRect();
        target.x = ((e.clientX - r.left) / r.width - 0.5) * 0.6;
        target.y = ((e.clientY - r.top) / r.height - 0.5) * 0.4;
      };
      window.addEventListener("pointermove", onMove, { passive: true });
      const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
      let visible = true; let raf = 0; const t0 = performance.now();
      const frame = (now) => {
        const t = Math.max(0, (now - t0) / 1000); // the first animation frame can be stamped before t0
        tick.forEach((f) => f(reduce ? 1.2 : t));
        root.rotation.x += (target.y - root.rotation.x) * 0.05;
        root.rotation.y += (target.x - root.rotation.y) * 0.05 * (panel === "patient" ? 0 : 1);
        renderer.render(scene, camera);
        if (!reduce && visible && !document.hidden) raf = requestAnimationFrame(frame);
      };
      const io = new IntersectionObserver(([e]) => {
        visible = e.isIntersecting;
        cancelAnimationFrame(raf);
        if (visible) raf = requestAnimationFrame(frame);
      });
      io.observe(host);
      const onVis = () => { cancelAnimationFrame(raf); if (!document.hidden && visible) raf = requestAnimationFrame(frame); };
      document.addEventListener("visibilitychange", onVis);
      raf = requestAnimationFrame(frame);
      setReady(true);
      cleanup = () => {
        cancelAnimationFrame(raf); io.disconnect(); ro.disconnect();
        window.removeEventListener("pointermove", onMove); document.removeEventListener("visibilitychange", onVis);
        scene.traverse((o) => { o.geometry?.dispose?.(); if (o.material) [].concat(o.material).forEach((m) => m.dispose?.()); });
        pmrem.dispose(); renderer.dispose(); renderer.domElement.remove();
      };
    })();
    return () => { disposed = true; cleanup(); };
  }, [panel, compact]);
  if (failed) return fallback;
  return <div ref={ref} className={`mx-3d ${ready ? "on" : ""} ${className}`} role="img" aria-label={label || "Animated 3D illustration"} />;
}

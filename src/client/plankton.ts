/**
 * Deep-sea plankton background for the conversation column (L2 阅读区).
 *
 * A lightweight canvas overlay (no dependencies): glowing particles are
 * carried by one global OCEAN CURRENT — same drift direction for all, with
 * the flow direction and speed varying periodically (a slow tide-like sway),
 * plus a tiny per-particle wobble so they still feel alive. Bioluminescence
 * pulses per particle. Cost discipline:
 *   - pre-rendered glow sprite (one radial gradient, drawn once) → per frame
 *     is just N×drawImage + a little math (~1-2% CPU at 60fps);
 *   - pointer-events: none; canvas sits as the first child of the column so
 *     message content stacks above it;
 *   - rAF pauses automatically in background tabs;
 *   - prefers-reduced-motion: renders one static frame, no loop.
 */
export interface PlanktonOptions {
  /** Particle count (default 90). */
  count?: number
  /** Base opacity multiplier — keep low so text stays readable. */
  opacity?: number
  /** Base current speed, fraction of viewport per second (default 0.0007). */
  speed?: number
  /** Base flow direction in radians (0 = rightward, -π/2 = straight up; default -1.28 ≈ diagonal up). */
  baseAngle?: number
  /** Direction swing amplitude in radians (default 0.18 ≈ ±10°). */
  swing?: number
  /** Direction swing period in seconds (default 55). */
  swingPeriod?: number
  /** Flow-speed pulsation depth, 0..1 (default 0.45). */
  flowPulse?: number
  /** Flow-speed pulsation period in seconds (default 42). */
  flowPulsePeriod?: number
  /** Global particle size multiplier (default 1). */
  sizeScale?: number
  /** Particle count multiplier during dive mode — more light points surge up (default 1.6). */
  diveCountScale?: number
  /** Overall brightness multiplier during dive mode (default 1.35). */
  diveBrightness?: number
  /** Panel glow intensity during dive mode, 0 = off (default 0.5). */
  diveGlow?: number
}

interface Plankton {
  x: number
  y: number
  size: number
  phase: number
  pulseFreq: number
  wobbleFreq: number
  wobbleSeed: number
  alpha: number
  sprite: number // index into sprite cache
}

const GLOW_COLORS = [
  '94, 192, 226',   // sea-glass cyan (inline code / accents)
  '63, 200, 232',   // fluorescent cyan (brand)
  '146, 180, 222',  // steel blue (strong/headings)
  '167, 139, 250',  // fluorescent purple (shiki function)
]

function makeSprite(color: string, size: number): HTMLCanvasElement {
  const s = document.createElement('canvas')
  s.width = size
  s.height = size
  const g = s.getContext('2d')
  if (g === null) return s
  const grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  grad.addColorStop(0, 'rgba(' + color + ', 1)')
  grad.addColorStop(0.35, 'rgba(' + color + ', 0.55)')
  grad.addColorStop(1, 'rgba(' + color + ', 0)')
  g.fillStyle = grad
  g.fillRect(0, 0, size, size)
  return s
}

/** Built-in defaults — effective config = defaults + CSS vars + window overrides. */
export const DEFAULT_PLANKTON: Required<PlanktonOptions> = {
  count: 90,
  opacity: 0.32,
  speed: 0.0007,
  baseAngle: -1.28,
  swing: 0.18,
  swingPeriod: 55,
  flowPulse: 0.45,
  flowPulsePeriod: 42,
  sizeScale: 1,
  diveCountScale: 1.6,
  diveBrightness: 1.15,
  diveGlow: 0.22,
}

/** Motion mode: drift = slow ocean-current drift; dive = fast upward rush
 * (linked to the "Deep diving..." working state). */
export type PlanktonMode = 'drift' | 'dive'

/** Handle returned by mountPlankton. */
export interface PlanktonHandle {
  dispose(): void
  setMode(mode: PlanktonMode): void
}

/** Mount the plankton overlay into a conversation column root; returns a handle. */
export function mountPlankton(root: HTMLElement, options: PlanktonOptions = {}): PlanktonHandle {
  const count = options.count ?? DEFAULT_PLANKTON.count
  const opacity = options.opacity ?? DEFAULT_PLANKTON.opacity
  const baseSpeed = options.speed ?? DEFAULT_PLANKTON.speed
  const baseAngle = options.baseAngle ?? DEFAULT_PLANKTON.baseAngle
  const swing = options.swing ?? DEFAULT_PLANKTON.swing
  const swingPeriod = options.swingPeriod ?? DEFAULT_PLANKTON.swingPeriod
  const flowPulse = options.flowPulse ?? DEFAULT_PLANKTON.flowPulse
  const flowPulsePeriod = options.flowPulsePeriod ?? DEFAULT_PLANKTON.flowPulsePeriod
  const sizeScale = options.sizeScale ?? DEFAULT_PLANKTON.sizeScale
  const diveCountScale = options.diveCountScale ?? DEFAULT_PLANKTON.diveCountScale
  const diveBrightness = options.diveBrightness ?? DEFAULT_PLANKTON.diveBrightness
  const diveGlow = options.diveGlow ?? DEFAULT_PLANKTON.diveGlow
  const reduced = typeof matchMedia !== 'undefined'
    && matchMedia('(prefers-reduced-motion: reduce)').matches

  const canvas = document.createElement('canvas')
  canvas.dataset.plankton = ''
  canvas.style.cssText =
    'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;'
  if (getComputedStyle(root).position === 'static') root.style.position = 'relative'
  root.insertBefore(canvas, root.firstChild)

  const ctx = canvas.getContext('2d')
  if (ctx === null) return { dispose: () => { canvas.remove() }, setMode: () => {} }

  let w = 0
  let h = 0
  let dpr = 1
  // Soft light well for the panel pulse — pre-rendered once per resize, drawn
  // each dive frame with a varying alpha (1 extra drawImage, ~free). Declared
  // BEFORE the resize definition so the initial resize() call below can run
  // rebuildGlow() without a let-TDZ ReferenceError (glowSprite used to be
  // declared after resize() had already executed).
  let glowSprite: HTMLCanvasElement | null = null
  const resize = (): void => {
    const r = root.getBoundingClientRect()
    dpr = Math.min(2, window.devicePixelRatio || 1)
    w = Math.max(1, Math.round(r.width))
    h = Math.max(1, Math.round(r.height))
    canvas.width = Math.round(w * dpr)
    canvas.height = Math.round(h * dpr)
    rebuildGlow()
  }
  resize()
  const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(resize) : null
  ro?.observe(root)

  function rebuildGlow(): void {
    if (glowSprite !== null) { glowSprite.remove(); glowSprite = null }
    const c = document.createElement('canvas')
    c.width = Math.max(1, w)
    c.height = Math.max(1, h)
    const g = c.getContext('2d')
    if (g !== null) {
      // Surface light: soft white near the top fading down into the deep dark
      // (下深上白 — the sea is darker at depth, lighter toward the surface).
      const grad = g.createLinearGradient(0, 0, 0, h)
      grad.addColorStop(0, 'rgba(230, 238, 250, 0.16)')
      grad.addColorStop(0.45, 'rgba(148, 178, 255, 0.05)')
      grad.addColorStop(1, 'rgba(63, 200, 232, 0)')
      g.fillStyle = grad
      g.fillRect(0, 0, c.width, c.height)
    }
    glowSprite = c
  }
  rebuildGlow()

  // Sprite cache: one glow sprite per color, scaled per particle.
  const sprites = GLOW_COLORS.map((c) => makeSprite(c, 22))
  const rand = (a: number, b: number): number => a + Math.random() * (b - a)
  const particles: Plankton[] = []
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random(),                 // 0..1 relative coords
      y: Math.random(),
      size: rand(1.6, 9),
      phase: rand(0, Math.PI * 2),
      pulseFreq: rand(0.3, 1.1),       // bioluminescence blink rate
      wobbleFreq: rand(0.08, 0.3),     // tiny individual swim wobble
      wobbleSeed: rand(0, Math.PI * 2),
      alpha: rand(0.25, 1),
      sprite: Math.floor(Math.random() * sprites.length),
    })
  }

  // Extra light points that surge up from below while diving ("more light
  // when the sub goes deep"): seeded below the bottom edge on each dive entry,
  // drawn only in dive mode, smaller and brighter than the base population.
  const diveParticles: Plankton[] = []
  const diveExtra = Math.max(0, Math.round(count * (diveCountScale - 1)))
  const reseedDive = (): void => {
    diveParticles.length = 0
    for (let i = 0; i < diveExtra; i++) {
      diveParticles.push({
        x: Math.random(),
        y: rand(1.03, 1.15),       // just below the bottom edge → rise in with the rush
        size: rand(1.3, 4.2),      // small sparks
        phase: rand(0, Math.PI * 2),
        pulseFreq: rand(0.5, 1.4), // livelier blink
        wobbleFreq: rand(0.1, 0.32),
        wobbleSeed: rand(0, Math.PI * 2),
        alpha: rand(0.55, 1),      // brighter population
        sprite: Math.floor(Math.random() * sprites.length),
      })
    }
  }

  let raf = 0
  let t = 0
  let mode: PlanktonMode = 'drift'
  const TWO_PI = Math.PI * 2
  const setMode = (m: PlanktonMode): void => {
    if (m === 'dive' && mode !== 'dive') reseedDive()
    mode = m
    canvas.dataset.mode = m   // observable state (debug/verify)
  }
  const frame = (): void => {
    t += 0.016
    // Global ocean current: same direction for every particle, with a slow
    // periodic sway of direction and a tide-like pulsation of flow speed.
    // dive = "Deep diving..." working state: everyone rushes nearly straight up,
    // wobble and bioluminescence intensify (startled biota).
    const diving = mode === 'dive'
    const angle = diving
      ? -1.5
      : baseAngle + swing * Math.sin((TWO_PI * t) / swingPeriod)
    const tide = diving
      ? 1
      : 1 - flowPulse + flowPulse * (0.5 + 0.5 * Math.sin((TWO_PI * t) / flowPulsePeriod + 1.7))
    const flowVx = Math.cos(angle) * baseSpeed * tide
    const flowVy = Math.sin(angle) * baseSpeed * tide
    const wobbleK = diving ? 0.0004 : 0.00022   // dive: smaller wobble — the rush dominates
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, w, h)
    const bright = diving ? diveBrightness : 1
    const step = (p: Plankton): void => {
      // dive = periodic surge upward: each particle surges in its own phase
      // (0.1x..2.5x of the rush speed, ~3s cycle) → wave-like pulsing ascent,
      // like pressure-breathing on a deep descent.
      const surge = diving
        ? 0.1 + 2.4 * (0.5 + 0.5 * Math.sin(t * 2.0 + p.wobbleSeed * 2))
        : 1
      const rushK = diving ? 40 : 1
      // carried by the current + a faint individual wobble (alive, not rigid)
      p.x += flowVx * surge * rushK + Math.sin(t * p.wobbleFreq + p.wobbleSeed) * wobbleK
      p.y += flowVy * surge * rushK + Math.cos(t * p.wobbleFreq * 1.31 + p.wobbleSeed) * (diving ? wobbleK * 1.3 : 0.00018)
      // wrap around (population stays constant)
      if (p.x < -0.06) p.x += 1.12
      if (p.x > 1.06) p.x -= 1.12
      if (p.y < -0.06) p.y += 1.12
      if (p.y > 1.06) p.y -= 1.12
      // bioluminescence pulse (brighter while diving)
      const pulse = diving
        ? 0.35 + 0.65 * Math.sin(t * p.pulseFreq + p.phase)
        : 0.55 + 0.45 * Math.sin(t * p.pulseFreq + p.phase)
      const a = opacity * p.alpha * pulse * bright
      if (a < 0.012) return
      const sprite = sprites[p.sprite]
      if (sprite === undefined) return
      const drawSize = p.size * 2.2 * sizeScale
      ctx.globalAlpha = a
      ctx.drawImage(sprite, p.x * w - drawSize / 2, p.y * h - drawSize / 2, drawSize, drawSize)
    }
    for (const p of particles) step(p)
    // dive-only extras: the "more light points" surge from below
    if (diving) for (const p of diveParticles) step(p)
    // panel light pulse, breathing with the dive rhythm (same 2.0 rad/s as the
    // surge → one coherent ~3.1s breath). One extra drawImage — negligible cost.
    if (diving && diveGlow > 0 && glowSprite !== null) {
      // Gentle breathing: 70%..100% of the glow intensity (was 40%..100%).
      const glow = diveGlow * (0.7 + 0.3 * (0.5 + 0.5 * Math.sin(t * 2.0 + 1.1)))
      ctx.globalAlpha = Math.min(1, glow)
      ctx.drawImage(glowSprite, 0, 0, w, h)
    }
    ctx.globalAlpha = 1
    raf = requestAnimationFrame(frame)
  }

  if (reduced) {
    // static single frame (no loop)
    t = 1.5
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, w, h)
    for (const p of particles) {
      const sprite = sprites[p.sprite]
      if (sprite === undefined) continue
      const drawSize = p.size * 2.2 * sizeScale
      ctx.globalAlpha = opacity * p.alpha
      ctx.drawImage(sprite, p.x * w - drawSize / 2, p.y * h - drawSize / 2, drawSize, drawSize)
    }
    ctx.globalAlpha = 1
  } else {
    raf = requestAnimationFrame(frame)
  }

  return {
    dispose: () => {
      if (raf !== 0) cancelAnimationFrame(raf)
      ro?.disconnect()
      canvas.remove()
    },
    setMode,
  }
}
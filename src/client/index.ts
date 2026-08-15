/**
 * Deep Sea (深海世界) theme client half.
 *
 * 1. Stylesheet injection (deepsea.css) at module evaluation — after the dist
 *    token sheet, so it wins the cascade at equal specificity.
 * 2. Configurable plankton background for the conversation column (L2 阅读区):
 *    - jellyfish ◉ toggle parked outside the column's left edge, vertically
 *      centred (on/off, persisted), ⚙ opens the parameter panel (sliders, live
 *      apply, persisted in localStorage);
 *    - parameters resolve: defaults < CSS vars (--dsh-plankton-*) <
 *      window.__DSH_DEEPSEA_PLANKTON__ < panel/localStorage overrides;
 *    - console API: window.__DSH_DEEPSEA__.setPlankton/getPlankton.
 *
 * No client services are needed: inject is empty, apply is the mount point.
 */
import { DEEP_SEA_CSS } from './deepsea.css'
import { DEFAULT_PLANKTON, mountPlankton, type PlanktonHandle, type PlanktonMode, type PlanktonOptions } from './plankton.ts'
import { createParamsPanel, type ParamsPanelEnv } from './params-panel.ts'
import { customSlenderJellyfishSvg } from './icons.ts'

export const inject: string[] = []

interface DeepSeaWindow {
  __DSH_DEEPSEA_PLANKTON__?: Partial<PlanktonOptions> | false
  __DSH_DEEPSEA__?: {
    setPlankton: (opts: Partial<PlanktonOptions>) => PlanktonOptions
    getPlankton: () => PlanktonOptions
  }
}

// Key bumped ('.enabled') so a previously persisted 'off' is ignored and the
// plankton effect starts ON by default (user request); the toggle keeps the
// new key.
const LS_ENABLED = 'dsh.deepsea.plankton.enabled'
const LS_PARAMS = 'dsh.deepsea.plankton.params'

const CSS_PARAMS: Array<[keyof PlanktonOptions, string]> = [
  ['count', '--dsh-plankton-count'],
  ['opacity', '--dsh-plankton-opacity'],
  ['speed', '--dsh-plankton-speed'],
  ['baseAngle', '--dsh-plankton-angle'],
  ['swing', '--dsh-plankton-swing'],
  ['swingPeriod', '--dsh-plankton-swing-period'],
  ['flowPulse', '--dsh-plankton-flow-pulse'],
  ['flowPulsePeriod', '--dsh-plankton-flow-pulse-period'],
  ['sizeScale', '--dsh-plankton-size'],
  ['diveCountScale', '--dsh-plankton-dive-count-scale'],
  ['diveBrightness', '--dsh-plankton-dive-brightness'],
  ['diveGlow', '--dsh-plankton-dive-glow'],
]

function cssNumber(name: string): number | undefined {
  try {
    const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
    if (v === '') return undefined
    const n = Number.parseFloat(v)
    return Number.isFinite(n) ? n : undefined
  } catch {
    return undefined
  }
}

function readPlanktonConfig(): Required<PlanktonOptions> {
  const fromCss: Partial<PlanktonOptions> = {}
  for (const [key, cssName] of CSS_PARAMS) {
    const n = cssNumber(cssName)
    if (n !== undefined) (fromCss as Record<string, unknown>)[key] = n
  }
  const win = window as DeepSeaWindow
  const fromWindow = typeof win.__DSH_DEEPSEA_PLANKTON__ === 'object'
    ? win.__DSH_DEEPSEA_PLANKTON__ : {}
  return { ...DEFAULT_PLANKTON, ...fromCss, ...fromWindow }
}

/** Jellyfish button diameter (px) — 60 → 40 → 27 (v0.2.1, ~2/3 of v0.2.0's 40px).
 * Keep in sync with positionJelly()'s math and the icon size in icons.ts. */
const BTN_SIZE = 27

/** The jellyfish button icon — custom clean slender design (narrow tall bell
 * + 4 parallel long tentacles; no crown spots, no crossing tentacle).
 * Finalised by the user after the in-app picker. */
function currentIconSvg(): string {
  return customSlenderJellyfishSvg()
}

/** Round jellyfish button, parked just OUTSIDE the INPUT BOX's left edge (10px
 * gap), vertically centred on the input box (the composer at the bottom of the
 * conversation column). It lives on document.body with position:fixed — fixed
 * elements escape the AppFrame panes' overflow:hidden clipping and the
 * sidebar's stacking, so an outside placement actually paints (an absolutely
 * positioned child of the column is clipped the moment it pokes out of the
 * pane). positionJelly() in apply() tracks the anchor's rect on every
 * mutation/resize. Click opens the params panel. No ring border; float + glow
 * animations come from deepsea.css ([data-dsh-jelly]), active only while the
 * background is enabled (.on). Size = BTN_SIZE (27px, ~2/3 of v0.2.0's 40px);
 * centring is done via top = anchor centre - BTN_SIZE/2 so the CSS float
 * animation (transform) never fights it. */
function createJellyfishButton(title: string): HTMLButtonElement {
  const btn = document.createElement('button')
  btn.type = 'button'
  btn.title = title
  btn.setAttribute('aria-label', title)
  btn.dataset.dshJelly = ''
  btn.innerHTML = currentIconSvg()
  btn.style.cssText =
    'position:fixed;z-index:9999;width:' + BTN_SIZE + 'px;height:' + BTN_SIZE + 'px;' +
    'border-radius:50%;display:flex;align-items:center;justify-content:center;' +
    'line-height:1;padding:0;cursor:pointer;border:0;' +
    'background:transparent;opacity:.6;transition:opacity .15s;display:none;' +
    'color:rgb(63,200,232);'
  btn.addEventListener('mouseenter', () => { btn.style.opacity = '.95' })
  btn.addEventListener('mouseleave', () => { btn.style.opacity = '.6' })
  document.body.appendChild(btn)
  return btn
}

/** True while the LLM is generating ("Deep diving..." turn status is live). */
function isDeepDiving(): boolean {
  const status = document.querySelector('[role="status"]')
  return status !== null && status.textContent !== null && status.textContent.includes('Deep diving')
}

/**
 * Move the "Session log" header button into the sidebar settings area so it
 * sits next to 设置 (user request). Runs on every DOM mutation; harmless when
 * the button is absent.
 *
 * The header slot re-renders and React can create a SECOND button in the chat
 * header while the already-moved copy stays in the settings area (the move is
 * an external DOM mutation React never reconciles; on a later remount it
 * inserts a fresh node and leaves the orphaned copy behind). A plain
 * querySelector would then always find the settled copy first and skip the
 * stray, so the live header button stays on the right — the observed bug.
 *
 * Instead, reconcile ALL copies on every pass: keep the newest one (the last
 * in document order — the conversation header sits after the sidebar, so a
 * freshly re-rendered header copy wins over the settled stale one), discard
 * the rest, and settle the survivor into the settings area. The survivor is
 * always the live React copy: in-place re-renders update the settled node (no
 * duplicate), remounts create a new node in the header which document order
 * picks over the orphaned copy.
 */
function rearrangeSidebar(): void {
  const settingsArea = document.querySelector('.hHd-Xa_settingsArea')
  if (settingsArea === null) return
  const buttons = Array.from(document.querySelectorAll('.nL4_yW_sessionLogButton'))
  if (buttons.length === 0) return
  // keep the newest copy (last in document order); drop stale duplicates
  const keep = buttons[buttons.length - 1] as HTMLElement
  for (const btn of buttons) {
    if (btn !== keep) btn.remove()
  }
  if (keep.parentElement !== settingsArea) settingsArea.appendChild(keep)
}

/** Mount the plankton overlay on the conversation column when it appears. */
export function apply(_ctx: unknown): void {
  if (typeof document === 'undefined') return
  const win = window as DeepSeaWindow
  if (win.__DSH_DEEPSEA_PLANKTON__ === false) return

  // restore persisted panel overrides into the window config layer
  try {
    const saved = localStorage.getItem(LS_PARAMS)
    if (saved !== null) {
      const parsed = JSON.parse(saved) as Partial<PlanktonOptions>
      if (parsed !== null && typeof parsed === 'object') {
        const base = typeof win.__DSH_DEEPSEA_PLANKTON__ === 'object'
          ? { ...win.__DSH_DEEPSEA_PLANKTON__ } : {}
        win.__DSH_DEEPSEA_PLANKTON__ = { ...base, ...parsed }
      }
    }
  } catch { /* ignore */ }

  let dispose: (() => void) | null = null
  let enabled = true
  try { enabled = localStorage.getItem(LS_ENABLED) !== 'off' } catch { /* private mode */ }

  const jellyBtn = createJellyfishButton('浮游生物参数')

  let plankton: PlanktonHandle | null = null
  let wasDiving = false

  function mount(): void {
    if (dispose !== null) return
    const root = document.querySelector<HTMLElement>('.wSkVaW_root')
    if (root === null) return
    plankton = mountPlankton(root, readPlanktonConfig())
    dispose = () => { plankton?.dispose(); plankton = null }
    syncDiveMode()
  }

  function syncDiveMode(): void {
    const diving = isDeepDiving()
    if (diving !== wasDiving) {
      wasDiving = diving
      plankton?.setMode(diving ? 'dive' : ('drift' as PlanktonMode))
    }
  }

  function unmount(): void {
    if (dispose !== null) { dispose(); dispose = null }
  }

  function applyPlankton(opts: Partial<PlanktonOptions>): Required<PlanktonOptions> {
    const cur = typeof win.__DSH_DEEPSEA_PLANKTON__ === 'object'
      ? { ...win.__DSH_DEEPSEA_PLANKTON__ } : {}
    win.__DSH_DEEPSEA_PLANKTON__ = { ...cur, ...opts }
    try {
      localStorage.setItem(LS_PARAMS, JSON.stringify(win.__DSH_DEEPSEA_PLANKTON__))
    } catch { /* ignore */ }
    unmount()
    mount()
    return readPlanktonConfig()
  }

  function resetPlankton(): void {
    win.__DSH_DEEPSEA_PLANKTON__ = {}
    try { localStorage.removeItem(LS_PARAMS) } catch { /* ignore */ }
    unmount()
    mount()
  }

  function updateToggle(): void {
    // jellyfish glows + floats while enabled; static grey while disabled
    jellyBtn.classList.toggle('on', enabled)
    jellyBtn.style.color = enabled ? 'rgb(63,200,232)' : 'rgba(148,178,255,.35)'
  }

  /** Park the jellyfish just OUTSIDE the input box's left edge (10px gap),
   * vertically centred on the INPUT BOX. The anchor is the composer card (the
   * bordered box wrapping the textarea), so the button centres on the whole
   * input box. Fixed-on-body so no ancestor clips it. Falls back to the
   * composer seat, then the column. */
  function positionJelly(): void {
    const root = document.querySelector<HTMLElement>('.wSkVaW_root')
    if (root === null) return
    let anchor: HTMLElement | null =
      root.querySelector<HTMLElement>('textarea, [contenteditable="true"]')
    if (anchor !== null) {
      // climb from the textarea to the composer card (first ancestor with a
      // border) so centring matches the visible input box, not the bare field
      let el: HTMLElement | null = anchor.parentElement
      while (el !== null && el !== root && parseFloat(getComputedStyle(el).borderTopWidth) === 0) {
        el = el.parentElement
      }
      if (el !== null && el !== root) anchor = el
    }
    if (anchor === null) anchor = root.querySelector<HTMLElement>('.wSkVaW_composerSeat')
    if (anchor === null) anchor = root
    const r = anchor.getBoundingClientRect()
    const left = Math.max(4, Math.round(r.left - BTN_SIZE - 10))   // left-outside, 10px gap
    const top = Math.round(r.top + r.height / 2 - BTN_SIZE / 2)    // centred on the input box
    jellyBtn.style.left = left + 'px'
    jellyBtn.style.top = top + 'px'
  }

  function sync(): void {
    rearrangeSidebar()
    syncDiveMode()
    const hasRoot = document.querySelector('.wSkVaW_root') !== null
    const show = hasRoot ? 'flex' : 'none'
    jellyBtn.style.display = show
    if (!hasRoot) panel.hide()
    if (hasRoot && enabled) mount()
    else unmount()
    if (hasRoot) positionJelly()
  }

  const panel = createParamsPanel({
    getConfig: readPlanktonConfig,
    setPlankton: applyPlankton,
    getEnabled: () => enabled,
    setEnabled: (v: boolean) => {
      enabled = v
      try { localStorage.setItem(LS_ENABLED, enabled ? 'on' : 'off') } catch { /* ignore */ }
      sync()
      updateToggle()
    },
    syncToggle: updateToggle,
    reset: resetPlankton,
  } as ParamsPanelEnv)
  // single click on the jellyfish opens the params panel (enable/disable lives
  // inside); anchor the panel just below the button so it stays close to it.
  jellyBtn.addEventListener('click', () => {
    panel.anchor(jellyBtn.getBoundingClientRect())
    panel.toggle()
  })
  updateToggle()

  sync()
  const mo = new MutationObserver(sync)
  mo.observe(document.body, { childList: true, subtree: true })
  window.addEventListener('resize', () => positionJelly())

  // Console API:
  //   window.__DSH_DEEPSEA__.setPlankton({ speed: 0.001, baseAngle: -1.2 })
  //   window.__DSH_DEEPSEA__.getPlankton()
  win.__DSH_DEEPSEA__ = {
    setPlankton: applyPlankton,
    getPlankton: readPlanktonConfig,
  }
}

export { DEEP_SEA_CSS }
export { mountPlankton, type PlanktonOptions } from './plankton.ts'
export { createParamsPanel, type ParamsPanelEnv, type ParamsPanelHandle } from './params-panel.ts'
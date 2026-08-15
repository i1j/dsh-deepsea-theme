/**
 * Plankton parameter panel — a small floating dialog (bottom-right, above the
 * toggle buttons) with one slider per tunable, applying changes live via the
 * setPlankton API and persisting them to localStorage. Deep-sea styled.
 */
import type { PlanktonOptions } from './plankton.ts'

export interface ParamsPanelEnv {
  getConfig(): Required<PlanktonOptions>
  setPlankton(o: Partial<PlanktonOptions>): Required<PlanktonOptions>
  getEnabled(): boolean
  setEnabled(v: boolean): void
  syncToggle(): void
  reset(): void
}

export interface ParamsPanelHandle {
  /** Anchor the panel just below the given rect (e.g. the jellyfish button). */
  anchor(rect: DOMRect): void
  toggle(): void
  show(): void
  hide(): void
  isVisible(): boolean
}

interface ParamSpec {
  key: keyof PlanktonOptions
  label: string
  min: number
  max: number
  step: number
  /** Convert a slider value (raw) to a config value. */
  fromRange?: (v: number) => number
  /** Convert a config value to a slider value. */
  toRange?: (v: number) => number
  /** Human-readable display of the config value. */
  display?: (v: number) => string
}

/** Section divider row in the panel. */
interface DividerSpec {
  divider: string
}

type RowSpec = ParamSpec | DividerSpec

function isDivider(spec: RowSpec): spec is DividerSpec {
  return 'divider' in spec
}

const D2R = Math.PI / 180
const R2D = 180 / Math.PI

const SPECS: RowSpec[] = [
  { key: 'count', label: '粒子数', min: 20, max: 200, step: 5, display: (v) => String(Math.round(v)) },
  { key: 'opacity', label: '透明度', min: 0.05, max: 0.8, step: 0.01, display: (v) => v.toFixed(2) },
  { key: 'speed', label: '流速', min: 0.0001, max: 0.004, step: 0.0001, display: (v) => v.toFixed(4) },
  {
    key: 'baseAngle', label: '流向', min: -175, max: -5, step: 1,
    fromRange: (v) => v * D2R,
    toRange: (v) => v * R2D,
    display: (v) => Math.round(v * R2D) + '°',
  },
  {
    key: 'swing', label: '摆动', min: 0, max: 40, step: 1,
    fromRange: (v) => v * D2R,
    toRange: (v) => v * R2D,
    display: (v) => '±' + Math.round(v * R2D) + '°',
  },
  { key: 'swingPeriod', label: '摆动周期', min: 10, max: 120, step: 1, display: (v) => Math.round(v) + 's' },
  { key: 'flowPulse', label: '流速脉动', min: 0, max: 0.9, step: 0.05, display: (v) => v.toFixed(2) },
  { key: 'flowPulsePeriod', label: '脉动周期', min: 10, max: 120, step: 1, display: (v) => Math.round(v) + 's' },
  { key: 'sizeScale', label: '粒子大小', min: 0.5, max: 2.5, step: 0.1, display: (v) => v.toFixed(1) + '×' },
  { divider: '深潜增强' },
  { key: 'diveCountScale', label: '深潜光点', min: 1, max: 3, step: 0.05, display: (v) => v.toFixed(2) + '×' },
  { key: 'diveBrightness', label: '深潜亮度', min: 1, max: 2.5, step: 0.05, display: (v) => v.toFixed(2) + '×' },
  { key: 'diveGlow', label: '面板辉光', min: 0, max: 1, step: 0.05, display: (v) => v.toFixed(2) },
]

function el<K extends keyof HTMLElementTagNameMap>(tag: K, style: string, text?: string): HTMLElementTagNameMap[K] {
  const e = document.createElement(tag)
  e.style.cssText = style
  if (text !== undefined) e.textContent = text
  return e
}

export function createParamsPanel(env: ParamsPanelEnv): ParamsPanelHandle {
  // Neutral blue-grey palette (mid-lightness, slight blue tint) that reads
  // on BOTH sea surfaces — deep-sea dark and shallow-sea light — instead of a
  // dark-only cyan-tinted navy. Translucent + backdrop blur so it sits softly
  // over either background (user request, 2026-08-15).
  const panel = el('div',
    'position:fixed;left:8px;bottom:8px;width:268px;z-index:10000;box-sizing:border-box;' +
    'background:rgba(118,133,155,.92);border:1px solid rgba(64,84,110,.5);border-radius:10px;' +
    'backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);' +
    'padding:10px 12px 12px;color:rgb(36,48,66);font-size:12px;line-height:1.5;' +
    'box-shadow:0 10px 28px rgba(20,30,45,.35);display:none;' +
    'max-height:calc(100vh - 24px);overflow-y:auto;')
  document.body.appendChild(panel)

  // header
  const header = el('div', 'display:flex;align-items:center;gap:8px;margin-bottom:8px;')
  header.appendChild(el('span', 'flex:1;font-weight:600;font-size:12px;letter-spacing:.03em;color:rgb(28,40,58)', '浮游生物参数'))
  const closeBtn = el('button',
    'border:0;background:none;cursor:pointer;color:rgb(58,72,94);font-size:14px;padding:2px 4px;', '✕')
  closeBtn.addEventListener('click', hide)
  header.appendChild(closeBtn)
  panel.appendChild(header)

  // enable toggle row
  const toggleRow = el('div', 'display:flex;align-items:center;gap:8px;margin-bottom:10px;padding-bottom:8px;border-bottom:1px solid rgba(64,84,110,.35);')
  const toggle = el('input', 'accent-color:rgb(28,70,128);cursor:pointer;')
  toggle.type = 'checkbox'
  toggleRow.appendChild(toggle)
  toggleRow.appendChild(el('span', 'flex:1;', '启用背景'))
  panel.appendChild(toggleRow)

  // sliders
  const rows: Array<{ spec: ParamSpec; input: HTMLInputElement; value: HTMLSpanElement }> = []
  for (const spec of SPECS) {
    if (isDivider(spec)) {
      panel.appendChild(el('div',
        'margin:6px 0 7px;padding-top:7px;border-top:1px solid rgba(64,84,110,.35);' +
        'color:rgb(52,74,104);font-size:11px;letter-spacing:.05em;', spec.divider))
      continue
    }
    const row = el('div', 'display:flex;align-items:center;gap:8px;margin-bottom:7px;')
    row.appendChild(el('label', 'flex:none;width:56px;color:rgb(44,58,78);font-size:11px;', spec.label))
    const input = el('input', 'flex:1;min-width:0;accent-color:rgb(28,70,128);cursor:pointer;height:14px;')
    input.type = 'range'
    input.min = String(spec.min)
    input.max = String(spec.max)
    input.step = String(spec.step)
    const value = el('span', 'flex:none;width:58px;text-align:right;color:rgb(44,58,78);font-size:11px;font-variant-numeric:tabular-nums;')
    row.appendChild(input)
    row.appendChild(value)
    panel.appendChild(row)
    rows.push({ spec, input, value })
  }

  // reset row
  const resetBtn = el('button',
    'width:100%;margin-top:4px;padding:5px 0;border:1px solid rgba(28,70,128,.55);border-radius:6px;' +
    'background:rgba(28,70,128,.18);color:rgb(24,56,100);font-size:11px;cursor:pointer;', '恢复默认')
  resetBtn.addEventListener('click', () => { env.reset(); refresh() })
  panel.appendChild(resetBtn)

  let visible = false
  function anchor(rect: DOMRect): void {
    // Panel is 268px wide; keep it fully on-screen, opening UPWARD: its bottom
    // edge sits 8px above the anchor (the jellyfish button), never covering
    // the input box below it. max-height + overflow-y keep it on-screen.
    const left = Math.min(Math.max(8, rect.left), window.innerWidth - 268 - 8)
    panel.style.left = left + 'px'
    panel.style.top = 'auto'
    panel.style.bottom = Math.max(8, window.innerHeight - rect.top + 8) + 'px'
    // cap the height to the room above the anchor (floor 120px → internal scroll)
    panel.style.maxHeight = Math.max(120, Math.round(rect.top - 24)) + 'px'
  }
  function show(): void {
    visible = true
    panel.style.display = 'block'
    refresh()
  }
  function hide(): void {
    visible = false
    panel.style.display = 'none'
  }

  function refresh(): void {
    const cfg = env.getConfig()
    toggle.checked = env.getEnabled()
    for (const { spec, input, value } of rows) {
      const sliderVal = spec.toRange ? spec.toRange(cfg[spec.key]) : cfg[spec.key]
      input.value = String(sliderVal)
      value.textContent = spec.display ? spec.display(cfg[spec.key]) : String(sliderVal)
    }
  }

  toggle.addEventListener('change', () => { env.setEnabled(toggle.checked) })
  for (const { spec, input, value } of rows) {
    input.addEventListener('input', () => {
      const raw = Number(input.value)
      const cfgVal = spec.fromRange ? spec.fromRange(raw) : raw
      const next = env.setPlankton({ [spec.key]: cfgVal } as Partial<PlanktonOptions>)
      const shown = next[spec.key]
      value.textContent = spec.display ? spec.display(shown) : String(raw)
    })
  }

  return {
    anchor,
    toggle() { visible ? hide() : show() },
    show,
    hide,
    isVisible: () => visible,
  }
}
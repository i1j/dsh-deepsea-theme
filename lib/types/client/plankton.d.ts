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
    count?: number;
    /** Base opacity multiplier — keep low so text stays readable. */
    opacity?: number;
    /** Base current speed, fraction of viewport per second (default 0.0007). */
    speed?: number;
    /** Base flow direction in radians (0 = rightward, -π/2 = straight up; default -1.28 ≈ diagonal up). */
    baseAngle?: number;
    /** Direction swing amplitude in radians (default 0.18 ≈ ±10°). */
    swing?: number;
    /** Direction swing period in seconds (default 55). */
    swingPeriod?: number;
    /** Flow-speed pulsation depth, 0..1 (default 0.45). */
    flowPulse?: number;
    /** Flow-speed pulsation period in seconds (default 42). */
    flowPulsePeriod?: number;
    /** Global particle size multiplier (default 1). */
    sizeScale?: number;
    /** Particle count multiplier during dive mode — more light points surge up (default 1.6). */
    diveCountScale?: number;
    /** Overall brightness multiplier during dive mode (default 1.35). */
    diveBrightness?: number;
    /** Panel glow intensity during dive mode, 0 = off (default 0.5). */
    diveGlow?: number;
}
/** Built-in defaults — effective config = defaults + CSS vars + window overrides. */
export declare const DEFAULT_PLANKTON: Required<PlanktonOptions>;
/** Motion mode: drift = slow ocean-current drift; dive = fast upward rush
 * (linked to the "Deep diving..." working state). */
export type PlanktonMode = 'drift' | 'dive';
/** Handle returned by mountPlankton. */
export interface PlanktonHandle {
    dispose(): void;
    setMode(mode: PlanktonMode): void;
}
/** Mount the plankton overlay into a conversation column root; returns a handle. */
export declare function mountPlankton(root: HTMLElement, options?: PlanktonOptions): PlanktonHandle;
//# sourceMappingURL=plankton.d.ts.map
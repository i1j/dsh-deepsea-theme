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
import { DEEP_SEA_CSS } from './deepsea.css';
export declare const inject: string[];
/** Mount the plankton overlay on the conversation column when it appears. */
export declare function apply(_ctx: unknown): void;
export { DEEP_SEA_CSS };
export { mountPlankton, type PlanktonOptions } from './plankton.ts';
export { createParamsPanel, type ParamsPanelEnv, type ParamsPanelHandle } from './params-panel.ts';
//# sourceMappingURL=index.d.ts.map
/**
 * Plankton parameter panel — a small floating dialog (bottom-right, above the
 * toggle buttons) with one slider per tunable, applying changes live via the
 * setPlankton API and persisting them to localStorage. Deep-sea styled.
 */
import type { PlanktonOptions } from './plankton.ts';
export interface ParamsPanelEnv {
    getConfig(): Required<PlanktonOptions>;
    setPlankton(o: Partial<PlanktonOptions>): Required<PlanktonOptions>;
    getEnabled(): boolean;
    setEnabled(v: boolean): void;
    syncToggle(): void;
    reset(): void;
}
export interface ParamsPanelHandle {
    /** Anchor the panel just below the given rect (e.g. the jellyfish button). */
    anchor(rect: DOMRect): void;
    toggle(): void;
    show(): void;
    hide(): void;
    isVisible(): boolean;
}
export declare function createParamsPanel(env: ParamsPanelEnv): ParamsPanelHandle;
//# sourceMappingURL=params-panel.d.ts.map
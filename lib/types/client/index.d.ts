/**
 * Deep Sea (深海世界) theme client half — a pure-CSS surface plugin.
 *
 * The stylesheet (deepsea.css) is inlined by the raw-css tsdown plugin and
 * injected into document.head once at bundle evaluation time (idempotent
 * style[data-plugin-css] guard — the same timing as the fork's DeepSeaTheme
 * block: after the dist token sheet, so it wins the cascade at equal
 * specificity). All rules are scoped under body[data-ds-dark-theme] (except
 * the markdown color-scheme section), so the light theme is untouched.
 *
 * No client services are needed, so inject is empty and apply is a no-op:
 * the loader still activates the bundle (empty inject = immediate).
 */
import { DEEP_SEA_CSS } from './deepsea.css';
export declare const inject: string[];
/** No runtime behavior — the stylesheet is already in the document. */
export declare function apply(_ctx: unknown): void;
export { DEEP_SEA_CSS };
//# sourceMappingURL=index.d.ts.map
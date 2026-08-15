window.__ModuleLoader__.load({ id: "dsh-deepsea-theme", factory: (require) => {
var module = { exports: {} }; var exports = module.exports;

//#region \0dsh-css:/home/i1j/dsh-workspace/dsh-deepsea-theme/src/client/deepsea.css.mjs
const css = "/*\n * Deep Sea (深海世界) dual-mode theme for DeepSeek Harness (DSH).\n * Deep-sea dark (body[data-ds-dark-theme]) + shallow-sea light\n * (body:not([data-ds-dark-theme])) in ONE stylesheet — a complete look:\n * token-override layer, L2 conversation column, L3/L4 markdown text,\n * and the markdown color scheme (行内代码/引用/h6/表头).\n *\n * Mechanism: every dsh component reads --dsw-alias-* / --dsw-static-* /\n * --shiki-* tokens, so redefining them under body[data-ds-dark-theme] in ONE\n * late-injected sheet re-themes the whole UI (sidebar / conversation / dock /\n * overlays / menus / settings). This plugin's stylesheet is injected after the\n * dist token sheet, so at equal specificity it wins the cascade. Upgrade-proof:\n * the theme only depends on token names, not on component class names — except\n * the four component-scoped rules at the bottom, which pin hashed class names\n * of @deepseek-ai/dsh-client-ui-conversation (wSkVaW_root, Sxvs8a_body,\n * hHd-Xa_root); re-check those names after a conversation dist upgrade.\n *\n * Brightness encodes information hierarchy (照亮度看信息):\n *   L0 环境   global bg / sidebar / dock — darkest sea blue-black\n *   L1 结构   panels, borders, code blocks — slightly brighter blue-grey\n *   L2 阅读区 conversation column — the one clearly lit area\n *   L3 正文   LLM answers / user text — brightest bioluminescent soft-white\n *   L4 强调   links / buttons / status — fluorescent accents\n *   L-1 降噪  timestamps / meta — dimmed, skipped by the eye\n * v0.2.0 (2026-08-15): the plugin now covers BOTH modes — deep-sea dark\n * (scoped to body[data-ds-dark-theme]) and shallow-sea light (scoped to\n * body:not([data-ds-dark-theme]), v1.5, appended at the bottom:\n * sea-foam backgrounds, deep-water ink, shallow-sea turquoise accents).\n * The markdown color-scheme section applies in both modes (ChatGPT-like\n * markdown colors).\n */\n\n/* ============ L0/L1 背景与边框（深海蓝黑） ============ */\nbody[data-ds-dark-theme] {\n  --dsw-alias-bg-base: rgb(10, 14, 22);\n  --dsw-alias-bg-layer-1: rgb(13, 18, 28);\n  --dsw-alias-bg-layer-2: rgb(17, 23, 35);\n  --dsw-alias-bg-layer-3: rgb(20, 27, 41);\n  --dsw-alias-bg-overlay: rgb(30, 38, 56);\n  --dsw-alias-bg-module-platform: rgb(13, 18, 28);\n  --dsw-alias-bg-multi-select: rgb(13, 18, 28);\n  --dsw-alias-bg-skeleton: rgba(255, 255, 255, 0.05);\n  --dsw-alias-border-l1: rgba(148, 178, 255, 0.07);\n  --dsw-alias-border-l2-darkmode-thin: rgba(148, 178, 255, 0.07);\n  --dsw-alias-border-l2: rgba(148, 178, 255, 0.12);\n  --dsw-alias-border-l3: rgba(148, 178, 255, 0.16);\n  --dsw-alias-border-l4: rgba(148, 178, 255, 0.22);\n  --dsw-alias-border-inverted: rgba(148, 178, 255, 0.08);\n  --dsw-alias-border-inverted2: rgba(148, 178, 255, 0.1);\n}\n\n/* ============ L4 品牌/按钮/交互（深海生物荧光） ============ */\nbody[data-ds-dark-theme] {\n  --dsw-alias-brand-primary: rgb(63, 200, 232);\n  --dsw-alias-brand-primary-invert: rgb(214, 222, 238);\n  --dsw-alias-brand-primary-new-colorprimary-new-color: rgb(63, 200, 232);\n  --dsw-alias-brand-text: rgb(214, 222, 238);\n  --dsw-alias-button-contrast-fill: rgb(8, 12, 20);\n  --dsw-alias-button-elevated-fill: rgb(17, 23, 35);\n  --dsw-alias-button-floating-fill: rgb(17, 23, 35);\n  --dsw-alias-button-floating-hover: rgb(24, 32, 48);\n  --dsw-alias-button-ghost-active-border: rgb(63, 200, 232);\n  --dsw-alias-button-ghost-active-fill: rgb(24, 32, 48);\n  --dsw-alias-button-ghost-active-hover: rgb(30, 40, 60);\n  /* 发送按钮实际用 info-fill：官方深色 = deepseek-400 #679EFE（工作图标同色） */\n  --dsw-alias-button-info-fill: rgb(103, 158, 254);\n  --dsw-alias-button-info-hover: rgb(65, 118, 230);\n  --dsw-alias-button-primary-dimmed: rgb(14, 42, 52);\n  --dsw-alias-button-primary-fill: rgb(63, 200, 232);\n  --dsw-alias-button-primary-hover: rgb(83, 212, 240);\n  --dsw-alias-interactive-bg-active: rgba(63, 200, 232, 0.16);\n  --dsw-alias-interactive-bg-hover: rgba(63, 200, 232, 0.08);\n  --dsw-alias-interactive-bg-hover-accent: rgba(63, 200, 232, 0.18);\n  --dsw-alias-interactive-bg-hover-danger: rgba(224, 85, 85, 0.14);\n  --dsw-alias-interactive-bg-hover-solid: rgb(26, 36, 54);\n}\n\n/* ============ L3/L-1 文字（生物荧光层级，同一蓝灰族系） ============ */\nbody[data-ds-dark-theme] {\n  --dsw-alias-label-caption: rgb(80, 92, 113);\n  --dsw-alias-label-dimmed: rgb(110, 122, 148);\n  --dsw-alias-label-primary: rgb(170, 182, 206);\n  --dsw-alias-label-primary-bluish: rgb(214, 222, 238);\n  --dsw-alias-label-primary-dimmed: rgb(168, 179, 204);\n  --dsw-alias-label-primary-foreground: rgb(8, 12, 20);\n  --dsw-alias-label-primary-inverted: rgb(8, 12, 20);\n  --dsw-alias-label-secondary: rgb(143, 155, 180);\n  --dsw-alias-label-tertiary: rgb(105, 117, 142);\n}\n\n/* ============ Markdown 容器（代码块/行内代码/引用/占位） ============ */\nbody[data-ds-dark-theme] {\n  --dsw-alias-markdown-citation: rgb(26, 36, 54);\n  --dsw-alias-markdown-code-block: rgb(13, 18, 28);\n  --dsw-alias-markdown-code-block-banner: rgb(17, 24, 38);\n  --dsw-alias-markdown-code-segment-selected: rgb(24, 32, 48);\n  --dsw-alias-markdown-code-segment-unselected: rgb(15, 21, 33);\n  --dsw-alias-markdown-inline-code: rgb(26, 36, 54);\n  --dsw-alias-markdown-placeholder: rgb(13, 18, 28);\n  --dsw-alias-markdown-tag: rgb(26, 36, 54);\n}\n\n/* ============ 滚动条 / 状态（成功/警告/错误/业务） ============ */\nbody[data-ds-dark-theme] {\n  --dsw-alias-scrollbar-bg-l1: rgb(24, 32, 48);\n  --dsw-alias-scrollbar-bg-l2: rgb(24, 32, 48);\n  --dsw-alias-scrollbar-hover-l1: rgb(40, 52, 74);\n  --dsw-alias-scrollbar-hover-l2: rgb(40, 52, 74);\n  --dsw-alias-state-business-primary: rgb(63, 200, 232);\n  --dsw-alias-state-business-tertiary: rgb(15, 48, 60);\n  --dsw-alias-state-error-primary: rgb(224, 85, 85);\n  --dsw-alias-state-error-secondary: rgb(242, 110, 110);\n  --dsw-alias-state-success-primary: rgb(61, 214, 140);\n  --dsw-alias-state-success-secondary: rgb(80, 230, 160);\n  --dsw-alias-state-success-tertiary: rgb(13, 46, 36);\n  --dsw-alias-state-warn-label: rgb(232, 163, 61);\n  --dsw-alias-state-warn-primary: rgb(232, 163, 61);\n  --dsw-alias-state-warn-secondary: rgb(240, 184, 90);\n  --dsw-alias-state-warn-tertiary: rgb(50, 40, 20);\n  --dsw-alias-toast-bg: rgb(26, 36, 54);\n  --dsw-alias-tooltip-bg: rgb(26, 36, 54);\n}\n\n/* ============ 组件专属表面（气泡/输入栏/侧栏/菜单/登录） ============ */\nbody[data-ds-dark-theme] {\n  --dsw-specific-bubble: rgb(29, 40, 58);       // 用户气泡：比输入框浅一档（输入框为 17,23,35）\n  --dsw-specific-bubble-highlight: rgb(38, 50, 70);\n  --dsw-specific-input-major: rgb(17, 23, 35);\n  --dsw-specific-login-input: rgb(13, 18, 28);\n  --dsw-specific-menu: rgb(20, 27, 41);\n  --dsw-specific-selector: rgb(20, 27, 41);\n  --dsw-specific-sidebar-fill: rgb(9, 13, 21);\n  --dsw-specific-sidebar-nav-item-active: rgb(24, 36, 52);\n  --dsw-specific-sidebar-nav-item-active-accent: rgb(20, 38, 50);\n  --dsw-specific-sidebar-nav-item-hover: rgb(24, 36, 52);\n  --dsw-specific-tip: rgb(13, 18, 28);\n  --dsw-linear-gradient-think: linear-gradient(180deg, rgb(13, 18, 28) 20.19%, rgba(13, 18, 28, 0) 100%);\n  --dsw-linear-think-select: linear-gradient(180deg, rgb(22, 30, 45) 20.19%, rgba(22, 30, 45, 0) 100%);\n}\n\n/* ============ 代码高亮（shiki 荧光系） ============ */\nbody[data-ds-dark-theme] {\n  --shiki-foreground: rgb(170, 180, 204);\n  --shiki-background: var(--dsw-alias-markdown-code-block);\n  --shiki-token-constant: rgb(56, 189, 248);\n  --shiki-token-string: rgb(74, 222, 128);\n  --shiki-token-comment: rgb(100, 116, 139);\n  --shiki-token-keyword: rgb(222, 156, 186);\n  --shiki-token-parameter: rgb(251, 191, 36);\n  --shiki-token-function: rgb(167, 139, 250);\n  --shiki-token-string-expression: rgb(74, 222, 128);\n  --shiki-token-punctuation: rgb(142, 153, 174);\n  --shiki-token-link: rgb(63, 200, 232);\n}\n\n/* ============ 侧栏文字降噪（作用域覆盖：只暗化侧栏容器内 label-primary） ============ */\nbody[data-ds-dark-theme] .hHd-Xa_root {\n  --dsw-alias-label-primary: rgb(158, 170, 196);\n}\n\n/* ============ L2 阅读区：对话栏背景（唯一明显更亮的区域） ============ */\nbody[data-ds-dark-theme] .wSkVaW_root {\n  background: rgb(28, 35, 49);\n}\n\n/* ============ L3/L4 正文与标题（对话栏专属，六轮微调后的最终亮度层级） ============ */\nbody[data-ds-dark-theme] .Sxvs8a_body {\n  color: rgb(170, 182, 206);\n}\nbody[data-ds-dark-theme] .Sxvs8a_body :where(h1, h2, h3, h4, h5) {\n  color: rgb(100, 128, 168);\n}\nbody[data-ds-dark-theme] .Sxvs8a_body :not(pre) > code {\n  color: rgb(94, 192, 226);\n}\nbody[data-ds-dark-theme] .Sxvs8a_body strong {\n  color: rgb(146, 180, 222);\n}\nbody[data-ds-dark-theme] .Sxvs8a_body h6 {\n  color: rgb(104, 118, 148);\n}\n\n/* ============ Markdown 配色（ChatGPT 风，双模式生效；去深色化可注释本段） ============ */\n.Sxvs8a_body :not(pre) > code {\n  color: var(--shiki-token-keyword);\n}\n.Sxvs8a_body blockquote {\n  color: var(--dsw-alias-label-secondary);\n  border-left: 2px solid var(--dsw-alias-state-business-primary);\n}\n.Sxvs8a_body h6 {\n  color: var(--dsw-alias-label-secondary);\n}\n.Sxvs8a_body th {\n  background: var(--dsw-alias-markdown-inline-code);\n}\n/* ============ dsh-sidechain 适配（外部插件变量映射，仅深色作用域） ============ */\n/* dsh-sidechain 的面板（SidechainPanel）使用私有 --ds-color-* 变量 + 硬编码\n * fallback（白底 #ffffff / 浅灰 #f2f3f5），未接入 --dsw-alias-* token，故深海\n * token 层覆盖不到。sidechain 的每个颜色都经 var(--ds-color-*, fallback) 引用\n * （源码注释：falls back gracefully when the app lacks the variables），因此\n * 只需定义这几个变量即可整面板跟随深海主题——零类名耦合，sidechain 升级不破。\n * 亮色模式不定义 → fallback 保持原样。若 sidechain 上游自行定义变量（根因修复），\n * 本段可安全删除。\n */\nbody[data-ds-dark-theme] {\n  /* 侧链是旁路次级面板：比侧栏 rgb(9,13,21) 更沉（L-2 退后层），视觉上\n     沉入深海最暗处，主对话栏(28,35,49)保持唯一焦点；文字整体暗一档。 */\n  --ds-color-bg-1: rgb(7, 10, 16);\n  --ds-color-bg-2: rgb(11, 15, 23);\n  --ds-color-surface-2: rgb(13, 18, 27);\n  --ds-color-text-1: rgb(145, 158, 185);\n  --ds-color-text-2: rgb(118, 131, 157);\n  --ds-color-text-3: rgb(92, 104, 128);\n  --ds-color-hover: rgba(63, 200, 232, 0.08);\n  --ds-color-border-1: rgba(148, 178, 255, 0.12);\n  --ds-color-primary: rgb(63, 200, 232);\n  --ds-color-danger: rgb(224, 85, 85);\n}\n/* ============ 侧栏底部操作区重排（session log ↔ 设置 并排） ============ */\n/* 用户要求：把对话栏 header 的 \"Session log\" 按钮移到侧栏底部与\"设置\"并列，\n * 并把全宽(264px)的\"设置\"按钮变窄。纯 CSS + 一次 DOM 移动（见 client 的\n * rearrangeSidebar）。类名为哈希类（sidebar 包 hHd-Xa_/VOzbGW_、\n * session-log-export 包 nL4_yW_），升级换代需复查。 */\n.hHd-Xa_settingsArea {\n  display: flex;\n  gap: 8px;\n  padding: 8px 8px 10px;\n}\n.hHd-Xa_settingsArea .VOzbGW_trigger {\n  flex: 1 1 50%;\n  min-width: 0;\n}\n/* 与\"设置\"按钮完全同平面：无边框、透明背景、同高/同 padding/同 gap 的扁平按钮 */\n.nL4_yW_sessionLogButton {\n  flex: 1 1 50%;\n  min-width: 0;\n  height: 34px;\n  margin: 4px 0 4px;           /* 同\"设置\"按钮（宽屏 4px 上下 margin） */\n  padding: 6px 2px 6px 10px;  /* 与\"设置\"按钮逐值一致 */\n  border: 0;\n  border-radius: 0;\n  background: transparent;\n  color: var(--dsw-alias-label-primary);\n  font-size: 14px;             /* 同\"设置\" */\n  line-height: 22px;           /* 同\"设置\" */\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  justify-content: flex-start;\n  gap: 8px;\n}\n.nL4_yW_sessionLogButton:hover {\n  background: var(--dsw-alias-interactive-bg-hover);\n}\n.nL4_yW_sessionLogButton:disabled {\n  opacity: 0.6;\n  cursor: default;\n}\n/* ============ 水母按钮（浮游生物参数入口） ============ */\n/* 无圆环边框；启用时整体浮动 + 光晕呼吸，触手各自摆动；关闭时静止变灰。 */\n@keyframes dsh-jelly-float {\n  0%, 100% { transform: translateY(0); }\n  50% { transform: translateY(-2px); }\n}\n@keyframes dsh-jelly-glow {\n  0%, 100% { filter: drop-shadow(0 0 1.5px rgba(63, 200, 232, 0.35)); }\n  50% { filter: drop-shadow(0 0 6px rgba(63, 200, 232, 1)); }\n}\n@keyframes dsh-jelly-sway {\n  0%, 100% { transform: rotate(-4deg); }\n  50% { transform: rotate(4deg); }\n}\n@keyframes dsh-jelly-bell-sway {\n  0%, 100% { transform: rotate(-1.5deg); }\n  50% { transform: rotate(1.5deg); }\n}\n[data-dsh-jelly] svg.dsh-jelly {\n  display: block;\n}\n[data-dsh-jelly].on {\n  animation: dsh-jelly-float 2.8s ease-in-out infinite;\n}\n/* 光晕贴水母轮廓（drop-shadow），只在小半径内呼吸，不散成一大圈 */\n[data-dsh-jelly].on svg.dsh-jelly {\n  animation: dsh-jelly-glow 3.2s ease-in-out infinite;\n}\n/* 伞盖轻摆（带动整体，触手随后跟随） */\n[data-dsh-jelly] .jelly-bell {\n  transform-origin: 50% 30%;\n  animation: dsh-jelly-bell-sway 5.2s ease-in-out infinite;\n}\n/* 触手：周期与负 delay 错开 → 波浪式先后摆动（跟随性） */\n[data-dsh-jelly] .jelly-tentacle-l {\n  transform-origin: 50% 0;\n  animation: dsh-jelly-sway 2.2s ease-in-out -0.4s infinite;\n}\n[data-dsh-jelly] .jelly-tentacle-l2 {\n  transform-origin: 50% 0;\n  animation: dsh-jelly-sway 2.5s ease-in-out -1.1s infinite;\n}\n[data-dsh-jelly] .jelly-tentacle-c {\n  transform-origin: 50% 0;\n  animation: dsh-jelly-sway 2.8s ease-in-out -1.8s infinite;\n}\n[data-dsh-jelly] .jelly-tentacle-r2 {\n  transform-origin: 50% 0;\n  animation: dsh-jelly-sway 2.6s ease-in-out -2.4s infinite;\n}\n[data-dsh-jelly] .jelly-tentacle-r {\n  transform-origin: 50% 0;\n  animation: dsh-jelly-sway 2.3s ease-in-out -3s infinite reverse;\n}\n/* ============ 对话栏 header：比对话栏浅 + 向下渐变衔接 ============ */\n/* header 原为透明（露出对话栏底色）。深色下给 header 一个从上(浅)到\n * 对话栏色(28,35,49) 的垂直渐变：顶部更亮的结构区，向下自然沉入 L2 阅读区。 */\nbody[data-ds-dark-theme] .wSkVaW_header {\n  background: linear-gradient(180deg, rgb(35, 44, 62) 0%, rgb(30, 38, 54) 55%, rgb(28, 35, 49) 100%);\n}\nbody[data-ds-dark-theme] .wSkVaW_header:after {\n  background: linear-gradient(90deg, rgba(148, 178, 255, 0), rgba(148, 178, 255, 0.12) 20%, rgba(148, 178, 255, 0.12) 80%, rgba(148, 178, 255, 0));\n}\n/* ============ 发送按钮：DeepSeek 蓝 + 深海脉动 ============ */\n@keyframes dsh-send-pulse {\n  0%, 100% { box-shadow: 0 0 4px rgba(86, 134, 254, 0.35); }\n  50% { box-shadow: 0 0 11px rgba(103, 158, 254, 0.65); }\n}\nbody[data-ds-dark-theme] .P2QtVG_primary {\n  animation: dsh-send-pulse 2.6s ease-in-out infinite;\n}\n/* ======================================================================\n * 浅海世界（Shallow Sea）亮色段 — 深海主题的亮色半区（v1.5）\n * ======================================================================\n * 用户裁定（2026-08-15）：浅海是深海的亮色色系，归并进深海主题插件——\n * 本段与上方深色段在同一个样式表内，选择器 body:not([data-ds-dark-theme])\n * 与 body[data-ds-dark-theme] 互斥（同特异性），亮色模式默认浅海化。\n *\n * 设计逻辑（清澈度编码信息层级，深海亮度逻辑的反演）：\n *   L0 环境   global bg / sidebar / dock — 海沫灰蓝，退后（v1.4 调低、v1.5 调深）\n *   L2 阅读区 conversation column — 阳光水面，全站最白 rgb(252,253,255)\n *   L3 正文   deep-water ink rgb(41,52,70)（~10:1）\n *   L4 强调   shallow-sea turquoise rgb(8,126,164)（白底加深档，4.64:1 白字）\n *   L-1 降噪  浪沫灰\n * 深色段完全不动；浮游生物（plankton）在亮色下自动切深色粒子（见 plankton.ts）。\n */\n/* ============ L0/L1 背景与边框（海沫灰蓝，v1.5 调深一档） ============ */\nbody:not([data-ds-dark-theme]) {\n  --dsw-alias-bg-base: rgb(222, 230, 240);\n  --dsw-alias-bg-layer-1: rgb(230, 236, 245);\n  --dsw-alias-bg-layer-2: rgb(235, 240, 247);\n  --dsw-alias-bg-layer-3: rgb(239, 243, 249);\n  --dsw-alias-bg-overlay: rgb(255, 255, 255);\n  --dsw-alias-bg-module-platform: rgb(230, 236, 245);\n  --dsw-alias-bg-multi-select: rgb(230, 236, 245);\n  --dsw-alias-bg-skeleton: rgba(0, 0, 0, 0.04);\n  --dsw-alias-border-l1: rgba(38, 86, 148, 0.06);\n  --dsw-alias-border-l2-darkmode-thin: rgba(38, 86, 148, 0.08);\n  --dsw-alias-border-l2: rgba(38, 86, 148, 0.12);\n  --dsw-alias-border-l3: rgba(38, 86, 148, 0.16);\n  --dsw-alias-border-l4: rgba(38, 86, 148, 0.22);\n  --dsw-alias-border-inverted: rgba(38, 86, 148, 0.08);\n  --dsw-alias-border-inverted2: rgba(38, 86, 148, 0.1);\n}\n\n/* ============ L4 品牌/按钮/交互（浅海荧光族 · 白底加深档） ============ */\nbody:not([data-ds-dark-theme]) {\n  --dsw-alias-brand-primary: rgb(8, 126, 164);\n  --dsw-alias-brand-primary-invert: rgb(255, 255, 255);\n  --dsw-alias-brand-primary-new-colorprimary-new-color: rgb(8, 126, 164);\n  --dsw-alias-brand-text: rgb(41, 52, 70);\n  --dsw-alias-button-contrast-fill: rgb(41, 52, 70);\n  --dsw-alias-button-elevated-fill: rgb(255, 255, 255);\n  --dsw-alias-button-floating-fill: rgb(255, 255, 255);\n  --dsw-alias-button-floating-hover: rgb(230, 236, 245);\n  --dsw-alias-button-ghost-active-border: rgb(8, 126, 164);\n  --dsw-alias-button-ghost-active-fill: rgb(218, 232, 245);\n  --dsw-alias-button-ghost-active-hover: rgb(211, 227, 242);\n  --dsw-alias-button-info-fill: rgb(8, 126, 164);\n  --dsw-alias-button-info-hover: rgb(7, 107, 141);\n  --dsw-alias-button-primary-dimmed: rgb(204, 223, 241);\n  --dsw-alias-button-primary-fill: rgb(8, 126, 164);\n  --dsw-alias-button-primary-hover: rgb(7, 107, 141);\n  --dsw-alias-interactive-bg-active: rgba(8, 126, 164, 0.14);\n  --dsw-alias-interactive-bg-hover: rgba(8, 126, 164, 0.07);\n  --dsw-alias-interactive-bg-hover-accent: rgba(8, 126, 164, 0.16);\n  --dsw-alias-interactive-bg-hover-danger: rgba(190, 44, 44, 0.07);\n  --dsw-alias-interactive-bg-hover-solid: rgb(230, 236, 245);\n}\n\n/* ============ L3/L-1 文字（深海军墨，同一蓝灰族系） ============ */\nbody:not([data-ds-dark-theme]) {\n  --dsw-alias-label-caption: rgb(140, 154, 178);\n  --dsw-alias-label-dimmed: rgb(120, 134, 158);\n  --dsw-alias-label-primary: rgb(41, 52, 70);\n  --dsw-alias-label-primary-bluish: rgb(38, 86, 148);\n  --dsw-alias-label-primary-dimmed: rgb(54, 66, 86);\n  --dsw-alias-label-primary-foreground: rgb(255, 255, 255);\n  --dsw-alias-label-primary-inverted: rgb(255, 255, 255);\n  --dsw-alias-label-secondary: rgb(84, 98, 122);\n  --dsw-alias-label-tertiary: rgb(118, 132, 156);\n}\n\n/* ============ Markdown 容器（代码块/行内代码/引用/占位） ============ */\nbody:not([data-ds-dark-theme]) {\n  --dsw-alias-markdown-citation: rgb(222, 233, 245);\n  --dsw-alias-markdown-code-block: rgb(232, 237, 246);\n  --dsw-alias-markdown-code-block-banner: rgb(224, 231, 242);\n  --dsw-alias-markdown-code-segment-selected: rgb(255, 255, 255);\n  --dsw-alias-markdown-code-segment-unselected: rgb(224, 231, 242);\n  --dsw-alias-markdown-inline-code: rgb(222, 233, 245);\n  --dsw-alias-markdown-placeholder: rgb(230, 236, 245);\n  --dsw-alias-markdown-tag: rgb(222, 233, 245);\n}\n\n/* ============ 滚动条 / 状态（海绿/沙琥珀/珊瑚红深档） ============ */\nbody:not([data-ds-dark-theme]) {\n  --dsw-alias-scrollbar-bg-l1: rgb(197, 207, 220);\n  --dsw-alias-scrollbar-bg-l2: rgb(197, 207, 220);\n  --dsw-alias-scrollbar-hover-l1: rgb(172, 187, 208);\n  --dsw-alias-scrollbar-hover-l2: rgb(172, 187, 208);\n  --dsw-alias-state-business-primary: rgb(8, 126, 164);\n  --dsw-alias-state-business-tertiary: rgb(204, 223, 241);\n  --dsw-alias-state-error-primary: rgb(190, 44, 44);\n  --dsw-alias-state-error-secondary: rgb(200, 56, 56);\n  --dsw-alias-state-success-primary: rgb(14, 128, 90);\n  --dsw-alias-state-success-secondary: rgb(18, 150, 105);\n  --dsw-alias-state-success-tertiary: rgb(226, 244, 236);\n  --dsw-alias-state-warn-label: rgb(178, 116, 18);\n  --dsw-alias-state-warn-primary: rgb(160, 104, 16);\n  --dsw-alias-state-warn-secondary: rgb(178, 116, 18);\n  --dsw-alias-state-warn-tertiary: rgb(250, 238, 215);\n  --dsw-alias-toast-bg: rgb(41, 52, 70);\n  --dsw-alias-tooltip-bg: rgb(41, 52, 70);\n}\n\n/* ============ 组件专属表面（气泡/输入栏/侧栏/菜单） ============ */\nbody:not([data-ds-dark-theme]) {\n  --dsw-specific-bubble: rgb(218, 232, 245);\n  --dsw-specific-bubble-highlight: rgb(207, 225, 242);\n  --dsw-specific-input-major: rgb(255, 255, 255);\n  --dsw-specific-login-input: rgb(230, 236, 245);\n  --dsw-specific-menu: rgb(255, 255, 255);\n  --dsw-specific-selector: rgb(255, 255, 255);\n  --dsw-specific-sidebar-fill: rgb(214, 224, 236);\n  --dsw-specific-sidebar-nav-item-active: rgb(208, 220, 235);\n  --dsw-specific-sidebar-nav-item-active-accent: rgb(204, 223, 241);\n  --dsw-specific-sidebar-nav-item-hover: rgb(214, 225, 238);\n  --dsw-specific-tip: rgb(230, 236, 245);\n  --dsw-linear-gradient-think: linear-gradient(180deg,rgb(230, 236, 245) 20.19%,rgba(230, 236, 245, 0) 100%);\n  --dsw-linear-think-select: linear-gradient(180deg,rgb(218, 232, 245) 20.19%,rgba(218, 232, 245, 0) 100%);\n}\n\n/* ============ 代码高亮（shiki 白底可读系） ============ */\nbody:not([data-ds-dark-theme]) {\n  --shiki-foreground: rgb(41, 52, 70);\n  --shiki-background: var(--dsw-alias-markdown-code-block);\n  --shiki-token-constant: rgb(28, 126, 214);\n  --shiki-token-string: rgb(47, 158, 68);\n  --shiki-token-comment: rgb(134, 142, 150);\n  --shiki-token-keyword: rgb(214, 51, 108);\n  --shiki-token-parameter: rgb(232, 89, 12);\n  --shiki-token-function: rgb(103, 65, 217);\n  --shiki-token-string-expression: rgb(43, 138, 62);\n  --shiki-token-punctuation: rgb(73, 80, 87);\n  --shiki-token-link: rgb(25, 113, 194);\n}\n\n/* ============ 侧栏文字降噪（亮色：左侧工作区文字退后） ============ */\nbody:not([data-ds-dark-theme]) .hHd-Xa_root {\n  --dsw-alias-label-primary: rgb(70, 84, 106);\n}\n\n/* ============ L2 阅读区：对话栏 = 阳光水面（全站最白，与海沫灰蓝背景对比） ============ */\nbody:not([data-ds-dark-theme]) .wSkVaW_root {\n  background: rgb(252, 253, 255);\n}\n\n/* ============ L3/L4 正文与标题（亮色覆写，对比度层级与深色一一对应） ============ */\nbody:not([data-ds-dark-theme]) .Sxvs8a_body {\n  color: rgb(41, 52, 70);\n}\nbody:not([data-ds-dark-theme]) .Sxvs8a_body :where(h1, h2, h3, h4, h5) {\n  color: rgb(52, 94, 160);\n}\nbody:not([data-ds-dark-theme]) .Sxvs8a_body :not(pre) > code {\n  color: rgb(0, 110, 144);\n}\nbody:not([data-ds-dark-theme]) .Sxvs8a_body strong {\n  color: rgb(26, 78, 148);\n}\nbody:not([data-ds-dark-theme]) .Sxvs8a_body h6 {\n  color: rgb(120, 134, 158);\n}\n";
const tagId = "dsh-deepsea-theme/DeepSeaTheme.css";
if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
	const tag = document.createElement("style");
	tag.dataset.plugin = "dsh-deepsea-theme";
	tag.dataset.pluginCss = tagId;
	tag.textContent = css;
	document.head.appendChild(tag);
}
const DEEP_SEA_CSS = css;

//#endregion
//#region src/client/plankton.ts
const GLOW_COLORS = [
	"94, 192, 226",
	"63, 200, 232",
	"146, 180, 222",
	"167, 139, 250"
];
function makeSprite(color, size) {
	const s = document.createElement("canvas");
	s.width = size;
	s.height = size;
	const g = s.getContext("2d");
	if (g === null) return s;
	const grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
	grad.addColorStop(0, "rgba(" + color + ", 1)");
	grad.addColorStop(.35, "rgba(" + color + ", 0.55)");
	grad.addColorStop(1, "rgba(" + color + ", 0)");
	g.fillStyle = grad;
	g.fillRect(0, 0, size, size);
	return s;
}
/** Built-in defaults — effective config = defaults + CSS vars + window overrides. */
const DEFAULT_PLANKTON = {
	count: 90,
	opacity: .32,
	speed: 7e-4,
	baseAngle: -1.28,
	swing: .18,
	swingPeriod: 55,
	flowPulse: .45,
	flowPulsePeriod: 42,
	sizeScale: 1,
	diveCountScale: 1.6,
	diveBrightness: 1.15,
	diveGlow: .22
};
/** Mount the plankton overlay into a conversation column root; returns a handle. */
function mountPlankton(root, options = {}) {
	const count = options.count ?? DEFAULT_PLANKTON.count;
	const opacity = options.opacity ?? DEFAULT_PLANKTON.opacity;
	const baseSpeed = options.speed ?? DEFAULT_PLANKTON.speed;
	const baseAngle = options.baseAngle ?? DEFAULT_PLANKTON.baseAngle;
	const swing = options.swing ?? DEFAULT_PLANKTON.swing;
	const swingPeriod = options.swingPeriod ?? DEFAULT_PLANKTON.swingPeriod;
	const flowPulse = options.flowPulse ?? DEFAULT_PLANKTON.flowPulse;
	const flowPulsePeriod = options.flowPulsePeriod ?? DEFAULT_PLANKTON.flowPulsePeriod;
	const sizeScale = options.sizeScale ?? DEFAULT_PLANKTON.sizeScale;
	const diveCountScale = options.diveCountScale ?? DEFAULT_PLANKTON.diveCountScale;
	const diveBrightness = options.diveBrightness ?? DEFAULT_PLANKTON.diveBrightness;
	const diveGlow = options.diveGlow ?? DEFAULT_PLANKTON.diveGlow;
	const reduced = typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
	const canvas = document.createElement("canvas");
	canvas.dataset.plankton = "";
	canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;";
	if (getComputedStyle(root).position === "static") root.style.position = "relative";
	root.insertBefore(canvas, root.firstChild);
	const ctx = canvas.getContext("2d");
	if (ctx === null) return {
		dispose: () => {
			canvas.remove();
		},
		setMode: () => {}
	};
	let w = 0;
	let h = 0;
	let dpr = 1;
	let glowSprite = null;
	const resize = () => {
		const r = root.getBoundingClientRect();
		dpr = Math.min(2, window.devicePixelRatio || 1);
		w = Math.max(1, Math.round(r.width));
		h = Math.max(1, Math.round(r.height));
		canvas.width = Math.round(w * dpr);
		canvas.height = Math.round(h * dpr);
		rebuildGlow();
	};
	resize();
	const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(resize) : null;
	ro?.observe(root);
	function rebuildGlow() {
		if (glowSprite !== null) {
			glowSprite.remove();
			glowSprite = null;
		}
		const c = document.createElement("canvas");
		c.width = Math.max(1, w);
		c.height = Math.max(1, h);
		const g = c.getContext("2d");
		if (g !== null) {
			const grad = g.createLinearGradient(0, 0, 0, h);
			grad.addColorStop(0, "rgba(230, 238, 250, 0.16)");
			grad.addColorStop(.45, "rgba(148, 178, 255, 0.05)");
			grad.addColorStop(1, "rgba(63, 200, 232, 0)");
			g.fillStyle = grad;
			g.fillRect(0, 0, c.width, c.height);
		}
		glowSprite = c;
	}
	rebuildGlow();
	const sprites = GLOW_COLORS.map((c) => makeSprite(c, 22));
	const rand = (a, b) => a + Math.random() * (b - a);
	const particles = [];
	for (let i = 0; i < count; i++) particles.push({
		x: Math.random(),
		y: Math.random(),
		size: rand(1.6, 9),
		phase: rand(0, Math.PI * 2),
		pulseFreq: rand(.3, 1.1),
		wobbleFreq: rand(.08, .3),
		wobbleSeed: rand(0, Math.PI * 2),
		alpha: rand(.25, 1),
		sprite: Math.floor(Math.random() * sprites.length)
	});
	const diveParticles = [];
	const diveExtra = Math.max(0, Math.round(count * (diveCountScale - 1)));
	const reseedDive = () => {
		diveParticles.length = 0;
		for (let i = 0; i < diveExtra; i++) diveParticles.push({
			x: Math.random(),
			y: rand(1.03, 1.15),
			size: rand(1.3, 4.2),
			phase: rand(0, Math.PI * 2),
			pulseFreq: rand(.5, 1.4),
			wobbleFreq: rand(.1, .32),
			wobbleSeed: rand(0, Math.PI * 2),
			alpha: rand(.55, 1),
			sprite: Math.floor(Math.random() * sprites.length)
		});
	};
	let raf = 0;
	let t = 0;
	let mode = "drift";
	const TWO_PI = Math.PI * 2;
	const setMode = (m) => {
		if (m === "dive" && mode !== "dive") reseedDive();
		mode = m;
		canvas.dataset.mode = m;
	};
	const frame = () => {
		t += .016;
		const diving = mode === "dive";
		const angle = diving ? -1.5 : baseAngle + swing * Math.sin(TWO_PI * t / swingPeriod);
		const tide = diving ? 1 : 1 - flowPulse + flowPulse * (.5 + .5 * Math.sin(TWO_PI * t / flowPulsePeriod + 1.7));
		const flowVx = Math.cos(angle) * baseSpeed * tide;
		const flowVy = Math.sin(angle) * baseSpeed * tide;
		const wobbleK = diving ? 4e-4 : 22e-5;
		ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		ctx.clearRect(0, 0, w, h);
		const bright = diving ? diveBrightness : 1;
		const step = (p) => {
			const surge = diving ? .1 + 2.4 * (.5 + .5 * Math.sin(t * 2 + p.wobbleSeed * 2)) : 1;
			const rushK = diving ? 40 : 1;
			p.x += flowVx * surge * rushK + Math.sin(t * p.wobbleFreq + p.wobbleSeed) * wobbleK;
			p.y += flowVy * surge * rushK + Math.cos(t * p.wobbleFreq * 1.31 + p.wobbleSeed) * (diving ? wobbleK * 1.3 : 18e-5);
			if (p.x < -.06) p.x += 1.12;
			if (p.x > 1.06) p.x -= 1.12;
			if (p.y < -.06) p.y += 1.12;
			if (p.y > 1.06) p.y -= 1.12;
			const pulse = diving ? .35 + .65 * Math.sin(t * p.pulseFreq + p.phase) : .55 + .45 * Math.sin(t * p.pulseFreq + p.phase);
			const a = opacity * p.alpha * pulse * bright;
			if (a < .012) return;
			const sprite = sprites[p.sprite];
			if (sprite === void 0) return;
			const drawSize = p.size * 2.2 * sizeScale;
			ctx.globalAlpha = a;
			ctx.drawImage(sprite, p.x * w - drawSize / 2, p.y * h - drawSize / 2, drawSize, drawSize);
		};
		for (const p of particles) step(p);
		if (diving) for (const p of diveParticles) step(p);
		if (diving && diveGlow > 0 && glowSprite !== null) {
			const glow = diveGlow * (.7 + .3 * (.5 + .5 * Math.sin(t * 2 + 1.1)));
			ctx.globalAlpha = Math.min(1, glow);
			ctx.drawImage(glowSprite, 0, 0, w, h);
		}
		ctx.globalAlpha = 1;
		raf = requestAnimationFrame(frame);
	};
	if (reduced) {
		t = 1.5;
		ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		ctx.clearRect(0, 0, w, h);
		for (const p of particles) {
			const sprite = sprites[p.sprite];
			if (sprite === void 0) continue;
			const drawSize = p.size * 2.2 * sizeScale;
			ctx.globalAlpha = opacity * p.alpha;
			ctx.drawImage(sprite, p.x * w - drawSize / 2, p.y * h - drawSize / 2, drawSize, drawSize);
		}
		ctx.globalAlpha = 1;
	} else raf = requestAnimationFrame(frame);
	return {
		dispose: () => {
			if (raf !== 0) cancelAnimationFrame(raf);
			ro?.disconnect();
			canvas.remove();
		},
		setMode
	};
}

//#endregion
//#region src/client/params-panel.ts
function isDivider(spec) {
	return "divider" in spec;
}
const D2R = Math.PI / 180;
const R2D = 180 / Math.PI;
const SPECS = [
	{
		key: "count",
		label: "粒子数",
		min: 20,
		max: 200,
		step: 5,
		display: (v) => String(Math.round(v))
	},
	{
		key: "opacity",
		label: "透明度",
		min: .05,
		max: .8,
		step: .01,
		display: (v) => v.toFixed(2)
	},
	{
		key: "speed",
		label: "流速",
		min: 1e-4,
		max: .004,
		step: 1e-4,
		display: (v) => v.toFixed(4)
	},
	{
		key: "baseAngle",
		label: "流向",
		min: -175,
		max: -5,
		step: 1,
		fromRange: (v) => v * D2R,
		toRange: (v) => v * R2D,
		display: (v) => Math.round(v * R2D) + "°"
	},
	{
		key: "swing",
		label: "摆动",
		min: 0,
		max: 40,
		step: 1,
		fromRange: (v) => v * D2R,
		toRange: (v) => v * R2D,
		display: (v) => "±" + Math.round(v * R2D) + "°"
	},
	{
		key: "swingPeriod",
		label: "摆动周期",
		min: 10,
		max: 120,
		step: 1,
		display: (v) => Math.round(v) + "s"
	},
	{
		key: "flowPulse",
		label: "流速脉动",
		min: 0,
		max: .9,
		step: .05,
		display: (v) => v.toFixed(2)
	},
	{
		key: "flowPulsePeriod",
		label: "脉动周期",
		min: 10,
		max: 120,
		step: 1,
		display: (v) => Math.round(v) + "s"
	},
	{
		key: "sizeScale",
		label: "粒子大小",
		min: .5,
		max: 2.5,
		step: .1,
		display: (v) => v.toFixed(1) + "×"
	},
	{ divider: "深潜增强" },
	{
		key: "diveCountScale",
		label: "深潜光点",
		min: 1,
		max: 3,
		step: .05,
		display: (v) => v.toFixed(2) + "×"
	},
	{
		key: "diveBrightness",
		label: "深潜亮度",
		min: 1,
		max: 2.5,
		step: .05,
		display: (v) => v.toFixed(2) + "×"
	},
	{
		key: "diveGlow",
		label: "面板辉光",
		min: 0,
		max: 1,
		step: .05,
		display: (v) => v.toFixed(2)
	}
];
function el(tag, style, text) {
	const e = document.createElement(tag);
	e.style.cssText = style;
	if (text !== void 0) e.textContent = text;
	return e;
}
function createParamsPanel(env) {
	const panel = el("div", "position:fixed;left:8px;bottom:8px;width:268px;z-index:10000;box-sizing:border-box;background:rgba(118,133,155,.92);border:1px solid rgba(64,84,110,.5);border-radius:10px;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);padding:10px 12px 12px;color:rgb(36,48,66);font-size:12px;line-height:1.5;box-shadow:0 10px 28px rgba(20,30,45,.35);display:none;max-height:calc(100vh - 24px);overflow-y:auto;");
	document.body.appendChild(panel);
	const header = el("div", "display:flex;align-items:center;gap:8px;margin-bottom:8px;");
	header.appendChild(el("span", "flex:1;font-weight:600;font-size:12px;letter-spacing:.03em;color:rgb(28,40,58)", "浮游生物参数"));
	const closeBtn = el("button", "border:0;background:none;cursor:pointer;color:rgb(58,72,94);font-size:14px;padding:2px 4px;", "✕");
	closeBtn.addEventListener("click", hide);
	header.appendChild(closeBtn);
	panel.appendChild(header);
	const toggleRow = el("div", "display:flex;align-items:center;gap:8px;margin-bottom:10px;padding-bottom:8px;border-bottom:1px solid rgba(64,84,110,.35);");
	const toggle = el("input", "accent-color:rgb(28,70,128);cursor:pointer;");
	toggle.type = "checkbox";
	toggleRow.appendChild(toggle);
	toggleRow.appendChild(el("span", "flex:1;", "启用背景"));
	panel.appendChild(toggleRow);
	const rows = [];
	for (const spec of SPECS) {
		if (isDivider(spec)) {
			panel.appendChild(el("div", "margin:6px 0 7px;padding-top:7px;border-top:1px solid rgba(64,84,110,.35);color:rgb(52,74,104);font-size:11px;letter-spacing:.05em;", spec.divider));
			continue;
		}
		const row = el("div", "display:flex;align-items:center;gap:8px;margin-bottom:7px;");
		row.appendChild(el("label", "flex:none;width:56px;color:rgb(44,58,78);font-size:11px;", spec.label));
		const input = el("input", "flex:1;min-width:0;accent-color:rgb(28,70,128);cursor:pointer;height:14px;");
		input.type = "range";
		input.min = String(spec.min);
		input.max = String(spec.max);
		input.step = String(spec.step);
		const value = el("span", "flex:none;width:58px;text-align:right;color:rgb(44,58,78);font-size:11px;font-variant-numeric:tabular-nums;");
		row.appendChild(input);
		row.appendChild(value);
		panel.appendChild(row);
		rows.push({
			spec,
			input,
			value
		});
	}
	const resetBtn = el("button", "width:100%;margin-top:4px;padding:5px 0;border:1px solid rgba(28,70,128,.55);border-radius:6px;background:rgba(28,70,128,.18);color:rgb(24,56,100);font-size:11px;cursor:pointer;", "恢复默认");
	resetBtn.addEventListener("click", () => {
		env.reset();
		refresh();
	});
	panel.appendChild(resetBtn);
	let visible = false;
	function anchor(rect) {
		const left = Math.min(Math.max(8, rect.left), window.innerWidth - 268 - 8);
		panel.style.left = left + "px";
		panel.style.top = "auto";
		panel.style.bottom = Math.max(8, window.innerHeight - rect.top + 8) + "px";
		panel.style.maxHeight = Math.max(120, Math.round(rect.top - 24)) + "px";
	}
	function show() {
		visible = true;
		panel.style.display = "block";
		refresh();
	}
	function hide() {
		visible = false;
		panel.style.display = "none";
	}
	function refresh() {
		const cfg = env.getConfig();
		toggle.checked = env.getEnabled();
		for (const { spec, input, value } of rows) {
			const sliderVal = spec.toRange ? spec.toRange(cfg[spec.key]) : cfg[spec.key];
			input.value = String(sliderVal);
			value.textContent = spec.display ? spec.display(cfg[spec.key]) : String(sliderVal);
		}
	}
	toggle.addEventListener("change", () => {
		env.setEnabled(toggle.checked);
	});
	for (const { spec, input, value } of rows) input.addEventListener("input", () => {
		const raw = Number(input.value);
		const cfgVal = spec.fromRange ? spec.fromRange(raw) : raw;
		const shown = env.setPlankton({ [spec.key]: cfgVal })[spec.key];
		value.textContent = spec.display ? spec.display(shown) : String(raw);
	});
	return {
		anchor,
		toggle() {
			visible ? hide() : show();
		},
		show,
		hide,
		isVisible: () => visible
	};
}

//#endregion
//#region src/client/icons.ts
/**
* Jellyfish icon for the round toggle button — custom clean slender design:
* a narrow tall bell with four parallel long tentacles (no crown spots, no
* crossing tentacle). Rendered in currentColor (fluorescent cyan).
* Finalised by the user after the in-app picker.
* v0.2.2: bell (伞帽) enlarged ~1/5 (×1.2 in width & height) about the rim
* bottom-centre anchor (12, 13.4) — tentacles unchanged, junction intact.
*/
function customSlenderJellyfishSvg() {
	return "<svg class=\"dsh-jelly\" width=\"18\" height=\"29\" viewBox=\"0 0 24 40\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.3\" stroke-linecap=\"round\" xmlns=\"http://www.w3.org/2000/svg\"><path class=\"jelly-bell\" d=\"M3.6 11.72C3.6 4.76 7.32 0.44 12 0.44s8.4 4.32 8.4 11.28\"/><path class=\"jelly-bell\" d=\"M3.6 11.72c0 .96.72 1.68 1.68 1.68h13.44c.96 0 1.68-.72 1.68-1.68\"/><path class=\"jelly-tentacle-l\" d=\"M6.5 14.6C6.5 21 6.8 27 7.6 33c.25 1.6.4 3.2.5 4.8\"/><path class=\"jelly-tentacle-l2\" d=\"M10 14.6C10 21 10.3 27 11.1 33c.25 1.6.4 3.2.5 4.8\"/><path class=\"jelly-tentacle-r2\" d=\"M14 14.6C14 21 13.7 27 12.9 33c-.25 1.6-.4 3.2-.5 4.8\"/><path class=\"jelly-tentacle-r\" d=\"M17.5 14.6C17.5 21 17.2 27 16.4 33c-.25 1.6-.4 3.2-.5 4.8\"/></svg>";
}

//#endregion
//#region src/client/index.ts
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
const inject = [];
const LS_ENABLED = "dsh.deepsea.plankton.enabled";
const LS_PARAMS = "dsh.deepsea.plankton.params";
const CSS_PARAMS = [
	["count", "--dsh-plankton-count"],
	["opacity", "--dsh-plankton-opacity"],
	["speed", "--dsh-plankton-speed"],
	["baseAngle", "--dsh-plankton-angle"],
	["swing", "--dsh-plankton-swing"],
	["swingPeriod", "--dsh-plankton-swing-period"],
	["flowPulse", "--dsh-plankton-flow-pulse"],
	["flowPulsePeriod", "--dsh-plankton-flow-pulse-period"],
	["sizeScale", "--dsh-plankton-size"],
	["diveCountScale", "--dsh-plankton-dive-count-scale"],
	["diveBrightness", "--dsh-plankton-dive-brightness"],
	["diveGlow", "--dsh-plankton-dive-glow"]
];
function cssNumber(name) {
	try {
		const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
		if (v === "") return void 0;
		const n = Number.parseFloat(v);
		return Number.isFinite(n) ? n : void 0;
	} catch {
		return;
	}
}
function readPlanktonConfig() {
	const fromCss = {};
	for (const [key, cssName] of CSS_PARAMS) {
		const n = cssNumber(cssName);
		if (n !== void 0) fromCss[key] = n;
	}
	const win = window;
	const fromWindow = typeof win.__DSH_DEEPSEA_PLANKTON__ === "object" ? win.__DSH_DEEPSEA_PLANKTON__ : {};
	return {
		...DEFAULT_PLANKTON,
		...fromCss,
		...fromWindow
	};
}
/** Jellyfish button diameter (px) — 60 → 40 → 27 (v0.2.1, ~2/3 of v0.2.0's 40px).
* Keep in sync with positionJelly()'s math and the icon size in icons.ts. */
const BTN_SIZE = 27;
/** The jellyfish button icon — custom clean slender design (narrow tall bell
* + 4 parallel long tentacles; no crown spots, no crossing tentacle).
* Finalised by the user after the in-app picker. */
function currentIconSvg() {
	return customSlenderJellyfishSvg();
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
function createJellyfishButton(title) {
	const btn = document.createElement("button");
	btn.type = "button";
	btn.title = title;
	btn.setAttribute("aria-label", title);
	btn.dataset.dshJelly = "";
	btn.innerHTML = currentIconSvg();
	btn.style.cssText = "position:fixed;z-index:9999;width:" + BTN_SIZE + "px;height:27px;border-radius:50%;display:flex;align-items:center;justify-content:center;line-height:1;padding:0;cursor:pointer;border:0;background:transparent;opacity:.6;transition:opacity .15s;display:none;color:rgb(63,200,232);";
	btn.addEventListener("mouseenter", () => {
		btn.style.opacity = ".95";
	});
	btn.addEventListener("mouseleave", () => {
		btn.style.opacity = ".6";
	});
	document.body.appendChild(btn);
	return btn;
}
/** True while the LLM is generating ("Deep diving..." turn status is live). */
function isDeepDiving() {
	const status = document.querySelector("[role=\"status\"]");
	return status !== null && status.textContent !== null && status.textContent.includes("Deep diving");
}
/**
* Move the "Session log" header button into the sidebar settings area so it
* sits next to 设置 (user request). Runs on every DOM mutation; harmless when
* the button is absent. Kept in place after session switches (button is
* re-rendered in the header by React, then moved again).
*/
function rearrangeSidebar() {
	const settingsArea = document.querySelector(".hHd-Xa_settingsArea");
	const logBtn = document.querySelector(".nL4_yW_sessionLogButton");
	if (settingsArea === null || logBtn === null) return;
	if (logBtn.parentElement === settingsArea) return;
	settingsArea.appendChild(logBtn);
}
/** Mount the plankton overlay on the conversation column when it appears. */
function apply(_ctx) {
	if (typeof document === "undefined") return;
	const win = window;
	if (win.__DSH_DEEPSEA_PLANKTON__ === false) return;
	try {
		const saved = localStorage.getItem(LS_PARAMS);
		if (saved !== null) {
			const parsed = JSON.parse(saved);
			if (parsed !== null && typeof parsed === "object") win.__DSH_DEEPSEA_PLANKTON__ = {
				...typeof win.__DSH_DEEPSEA_PLANKTON__ === "object" ? { ...win.__DSH_DEEPSEA_PLANKTON__ } : {},
				...parsed
			};
		}
	} catch {}
	let dispose = null;
	let enabled = true;
	try {
		enabled = localStorage.getItem(LS_ENABLED) !== "off";
	} catch {}
	const jellyBtn = createJellyfishButton("浮游生物参数");
	let plankton = null;
	let wasDiving = false;
	function mount() {
		if (dispose !== null) return;
		const root = document.querySelector(".wSkVaW_root");
		if (root === null) return;
		plankton = mountPlankton(root, readPlanktonConfig());
		dispose = () => {
			plankton?.dispose();
			plankton = null;
		};
		syncDiveMode();
	}
	function syncDiveMode() {
		const diving = isDeepDiving();
		if (diving !== wasDiving) {
			wasDiving = diving;
			plankton?.setMode(diving ? "dive" : "drift");
		}
	}
	function unmount() {
		if (dispose !== null) {
			dispose();
			dispose = null;
		}
	}
	function applyPlankton(opts) {
		win.__DSH_DEEPSEA_PLANKTON__ = {
			...typeof win.__DSH_DEEPSEA_PLANKTON__ === "object" ? { ...win.__DSH_DEEPSEA_PLANKTON__ } : {},
			...opts
		};
		try {
			localStorage.setItem(LS_PARAMS, JSON.stringify(win.__DSH_DEEPSEA_PLANKTON__));
		} catch {}
		unmount();
		mount();
		return readPlanktonConfig();
	}
	function resetPlankton() {
		win.__DSH_DEEPSEA_PLANKTON__ = {};
		try {
			localStorage.removeItem(LS_PARAMS);
		} catch {}
		unmount();
		mount();
	}
	function updateToggle() {
		jellyBtn.classList.toggle("on", enabled);
		jellyBtn.style.color = enabled ? "rgb(63,200,232)" : "rgba(148,178,255,.35)";
	}
	/** Park the jellyfish just OUTSIDE the input box's left edge (10px gap),
	* vertically centred on the INPUT BOX. The anchor is the composer card (the
	* bordered box wrapping the textarea), so the button centres on the whole
	* input box. Fixed-on-body so no ancestor clips it. Falls back to the
	* composer seat, then the column. */
	function positionJelly() {
		const root = document.querySelector(".wSkVaW_root");
		if (root === null) return;
		let anchor = root.querySelector("textarea, [contenteditable=\"true\"]");
		if (anchor !== null) {
			let el$1 = anchor.parentElement;
			while (el$1 !== null && el$1 !== root && parseFloat(getComputedStyle(el$1).borderTopWidth) === 0) el$1 = el$1.parentElement;
			if (el$1 !== null && el$1 !== root) anchor = el$1;
		}
		if (anchor === null) anchor = root.querySelector(".wSkVaW_composerSeat");
		if (anchor === null) anchor = root;
		const r = anchor.getBoundingClientRect();
		const left = Math.max(4, Math.round(r.left - BTN_SIZE - 10));
		const top = Math.round(r.top + r.height / 2 - BTN_SIZE / 2);
		jellyBtn.style.left = left + "px";
		jellyBtn.style.top = top + "px";
	}
	function sync() {
		rearrangeSidebar();
		syncDiveMode();
		const hasRoot = document.querySelector(".wSkVaW_root") !== null;
		const show = hasRoot ? "flex" : "none";
		jellyBtn.style.display = show;
		if (!hasRoot) panel.hide();
		if (hasRoot && enabled) mount();
		else unmount();
		if (hasRoot) positionJelly();
	}
	const panel = createParamsPanel({
		getConfig: readPlanktonConfig,
		setPlankton: applyPlankton,
		getEnabled: () => enabled,
		setEnabled: (v) => {
			enabled = v;
			try {
				localStorage.setItem(LS_ENABLED, enabled ? "on" : "off");
			} catch {}
			sync();
			updateToggle();
		},
		syncToggle: updateToggle,
		reset: resetPlankton
	});
	jellyBtn.addEventListener("click", () => {
		panel.anchor(jellyBtn.getBoundingClientRect());
		panel.toggle();
	});
	updateToggle();
	sync();
	new MutationObserver(sync).observe(document.body, {
		childList: true,
		subtree: true
	});
	window.addEventListener("resize", () => positionJelly());
	win.__DSH_DEEPSEA__ = {
		setPlankton: applyPlankton,
		getPlankton: readPlanktonConfig
	};
}

//#endregion
exports.DEEP_SEA_CSS = DEEP_SEA_CSS;
exports.apply = apply;
exports.createParamsPanel = createParamsPanel;
exports.inject = inject;
exports.mountPlankton = mountPlankton;
return module.exports; } });
//# sourceMappingURL=client.js.map
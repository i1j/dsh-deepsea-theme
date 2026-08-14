// Self-contained build config（样板：dsh-wide-dock）：插件在 fork 仓库之外，
// 不能 import fork 的 tsdown preset，故镜像其 closure-factory 行为；与 wide-dock
// 不同的是本插件无组件 CSS-modules，只有一张全局深色主题样式表，因此用 raw-css
// 虚拟插件把 deepsea.css 内联为字符串并自注入（不需要 lightningcss transform）。
//
// ⚠️ 双源漂移风险：banner/footer/intro 与 css 虚拟插件为 fork
// packages/client/tsdown.client.ts 的镜像复刻——fork 侧变更时须同步。
import { readFile } from 'node:fs/promises'
import { dirname, resolve as resolvePath } from 'node:path'
import type { UserConfig } from 'tsdown'

/** 插件 client bundle 的 loader 表 externals：本插件零运行时导入（纯 CSS）。 */
const EXTERNALS: string[] = []

/** Virtual-id wrapper：把 .css 文件作为字符串模块提供（tsdown 自身 css 管线按
 * .css 后缀接管，故用 .mjs 虚拟后缀，镜像 fork tsdown.client.ts）。 */
const CSS_VIRTUAL_PREFIX = '\0dsh-css:'
const CSS_VIRTUAL_SUFFIX = '.mjs'

export default [
  // host 半：src/index.ts → lib/index.js（esm, node）
  {
    name: 'dsh-deepsea-theme',
    entry: ['src/index.ts'],
    outDir: 'lib',
    format: ['esm'],
    platform: 'node',
    target: 'es2024',
    dts: false,
    clean: false,
  },
  // client 半：src/client/index.ts → lib/client.js（cjs, browser, closure-factory）
  {
    name: 'dsh-deepsea-theme/client',
    entry: { client: 'src/client/index.ts' },
    outDir: 'lib',
    format: 'cjs',
    platform: 'browser',
    dts: false,
    sourcemap: true,
    clean: false,
    external: EXTERNALS,
    noExternal: (id: string) => (EXTERNALS.includes(id) ? undefined : true),
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV ?? 'production'),
      'import.meta.env.MODE': JSON.stringify(process.env.NODE_ENV ?? 'production'),
      'import.meta.env': JSON.stringify({ MODE: process.env.NODE_ENV ?? 'production' }),
    },
    outputOptions: {
      entryFileNames: 'client.js',
      banner: 'window.__ModuleLoader__.load({ id: "dsh-deepsea-theme", factory: (require) => {',
      footer: 'return module.exports; } });',
      intro: 'var module = { exports: {} }; var exports = module.exports;',
    },
    plugins: [{
      // raw-css 虚拟插件：读 .css → 字符串导出 + <style data-plugin> 幂等注入。
      name: 'dsh-raw-css-inline',
      resolveId(source: string, importer: string | undefined) {
        if (!source.endsWith('.css')) return null
        const abs = importer !== undefined ? resolvePath(dirname(importer), source) : source
        return CSS_VIRTUAL_PREFIX + abs + CSS_VIRTUAL_SUFFIX
      },
      async load(virtualId: string) {
        if (!virtualId.startsWith(CSS_VIRTUAL_PREFIX)) return null
        const fileId = virtualId.slice(CSS_VIRTUAL_PREFIX.length, -CSS_VIRTUAL_SUFFIX.length)
        // 让物理 .css 进入 watch 图（dev 热更用）。
        this.addWatchFile(fileId)
        const css = (await readFile(fileId)).toString()
        return [
          'const css = ' + JSON.stringify(css) + ';',
          'const tagId = ' + JSON.stringify('dsh-deepsea-theme/DeepSeaTheme.css') + ';',
          "if (typeof document !== 'undefined' && document.querySelector('style[data-plugin-css=' + JSON.stringify(tagId) + ']') === null) {",
          "  const tag = document.createElement('style');",
          "  tag.dataset.plugin = " + JSON.stringify('dsh-deepsea-theme') + ';',
          '  tag.dataset.pluginCss = tagId;',
          '  tag.textContent = css;',
          '  document.head.appendChild(tag);',
          '}',
          'export const DEEP_SEA_CSS = css;',
          'export default css;',
        ].join('\n')
      },
    }],
  },
] satisfies UserConfig[]

declare module '*.module.css' {
  const classes: Record<string, string>
  export default classes
}

declare module '*.css' {
  const css: string
  export const DEEP_SEA_CSS: string
  export default css
}

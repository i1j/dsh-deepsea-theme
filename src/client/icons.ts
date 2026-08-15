/**
 * Jellyfish icon for the round toggle button — custom clean slender design:
 * a narrow tall bell with four parallel long tentacles (no crown spots, no
 * crossing tentacle). Rendered in currentColor (fluorescent cyan).
 * Finalised by the user after the in-app picker.
 * v0.2.2: bell (伞帽) enlarged ~1/5 (×1.2 in width & height) about the rim
 * bottom-centre anchor (12, 13.4) — tentacles unchanged, junction intact.
 */
export function customSlenderJellyfishSvg(): string {
  return '<svg class="dsh-jelly" width="18" height="29" viewBox="0 0 24 40" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" xmlns="http://www.w3.org/2000/svg">' +
    '<path class="jelly-bell" d="M3.6 11.72C3.6 4.76 7.32 0.44 12 0.44s8.4 4.32 8.4 11.28"/>' +
    '<path class="jelly-bell" d="M3.6 11.72c0 .96.72 1.68 1.68 1.68h13.44c.96 0 1.68-.72 1.68-1.68"/>' +
    '<path class="jelly-tentacle-l" d="M6.5 14.6C6.5 21 6.8 27 7.6 33c.25 1.6.4 3.2.5 4.8"/>' +
    '<path class="jelly-tentacle-l2" d="M10 14.6C10 21 10.3 27 11.1 33c.25 1.6.4 3.2.5 4.8"/>' +
    '<path class="jelly-tentacle-r2" d="M14 14.6C14 21 13.7 27 12.9 33c-.25 1.6-.4 3.2-.5 4.8"/>' +
    '<path class="jelly-tentacle-r" d="M17.5 14.6C17.5 21 17.2 27 16.4 33c-.25 1.6-.4 3.2-.5 4.8"/>' +
    '</svg>'
}
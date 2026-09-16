/**
 * Returns an 8-digit hex color with the given alpha (0–1).
 * Accepts #RGB or #RRGGBB; falls back to transparent black if invalid.
 */
export function hexWithAlpha(color: string, alpha: number): string {
  const clampedAlpha = Math.min(1, Math.max(0, alpha));
  const alphaHex = Math.round(clampedAlpha * 255)
    .toString(16)
    .padStart(2, "0");

  const hex = color.trim();
  const shortMatch = /^#([0-9a-fA-F]{3})$/.exec(hex);
  if (shortMatch) {
    const [r, g, b] = shortMatch[1].split("");
    return `#${r}${r}${g}${g}${b}${b}${alphaHex}`;
  }

  const longMatch = /^#([0-9a-fA-F]{6})$/.exec(hex);
  if (longMatch) {
    return `#${longMatch[1]}${alphaHex}`;
  }

  return `#000000${alphaHex}`;
}

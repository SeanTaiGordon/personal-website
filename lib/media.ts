export const breakpoints = {
  phone: 479,
  tablet: 767,
  desktop: 992,
} as const;

type Breakpoint = keyof typeof breakpoints;

function maxWidth(name: Breakpoint) {
  // `up("desktop")` is min-width 992px, so "below desktop" is max-width 991px.
  return name === "desktop" ? breakpoints.desktop - 1 : breakpoints[name];
}

export const media = {
  down: (name: Breakpoint) =>
    `@media screen and (max-width: ${maxWidth(name)}px)`,
  up: (name: Extract<Breakpoint, "desktop">) =>
    `@media screen and (min-width: ${breakpoints[name]}px)`,
  reduceMotion: "@media (prefers-reduced-motion: reduce)",
} as const;

export const mq = {
  desktop: `(min-width: ${breakpoints.desktop}px)`,
  reduceMotion: "(prefers-reduced-motion: reduce)",
} as const;

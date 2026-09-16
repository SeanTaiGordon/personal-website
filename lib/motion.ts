export const motion = {
  ease: {
    standard: "ease",
    inOutQuart: "cubic-bezier(0.77, 0, 0.175, 1)",
  },
  nav: {
    hideMs: 500,
    menuMs: 400,
    linkReturnMs: 500,
    textHoverMs: 300,
    arrowFadeMs: 300,
    arrowSlideMs: 500,
    /** Arrow left of the link until hover */
    arrowRestXPx: -10,
    /** Link label shift on desktop hover */
    textHoverXPx: -20,
    scrollHideDeltaPx: 8,
  },
  wipe: {
    durationMs: 250,
    thinHeightPx: 2,
    thickHeightPx: {
      base: 10,
      desktopDown: 7,
      tablet: 5,
      phone: 3,
    },
  },
  fadeIn: {
    opacityMs: 1200,
    moveMs: 1000,
    delayMs: 0,
    offsetYPx: 20,
    minVisibleRatio: 0.15,
  },
  hero: {
    helloOpacityMs: 1500,
    helloMoveMs: 1500,
    helloFromY: "40%",
    enterDelayMs: 500,
    enterMs: 1000,
    nameFromY: "30%",
    pictureFromX: "20%",
    scrollStart: 0.4,
    helloFromXVw: 0,
    helloToXVw: 50,
    nameFromXVw: 20,
    nameToXVw: -90,
    smoothing: 0.18,
  },
  footerCta: {
    opacityMs: 1500,
    /** Wide row so the cluster can travel past either viewport edge */
    rowWidthVw: 180,
    /** Shift that centers the 180vw row in the viewport */
    centerShiftVw: -40,
    xAtLeft: 10,
    xAtRight: -45,
    restingX: -17.5,
    smoothing: 0.2,
  },
  projectCard: {
    hoverMs: 300,
    arrowRestXPx: -10,
    titleHoverXPx: 80,
    titleScrollXPx: 30,
    imageDelayMs: 100,
    imageFollowSmoothing: 0.2,
    scrollStart: 0.3,
    scrollPeak: 0.5,
    scrollEnd: 0.7,
    imageScrollXPx: 30,
    imageRotateFrom: -20,
    imageRotateTo: 20,
    smoothing: 0.18,
  },
  quote: {
    fadeMs: 1500,
    scrollHeightVh: 150,
    trackMinWidthPx: 3000,
    fromX: 40,
    toX: -80,
    smoothing: 0.18,
  },
} as const;

export function mouseTrackTransform(xPercent: number) {
  return `translate3d(${xPercent}%, 0, 0)`;
}

export function lerp(start: number, end: number, t: number) {
  return start + (end - start) * t;
}

/** Map scroll progress 0 -> 1 through keyframes k0 -> k1 */
export function interp(
  progress: number,
  k0: number,
  v0: number,
  k1: number,
  v1: number,
) {
  if (progress <= k0) return v0;
  if (progress >= k1) return v1;
  return lerp(v0, v1, (progress - k0) / (k1 - k0));
}

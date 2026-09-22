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
  contact: {
    wipeDelayMs: 300,
    wipeMs: 800,
    scrollHeightVh: 200,
    trackWidthVh: 350,
    trackMinWidthPx: 3000,
    fromX: 0,
    toX: -90,
    scrollStart: 0.33,
    smoothing: 0.18,
    formBorderMs: 200,
    submitMs: 200,
  },
  pageBg: {
    durationMs: 500,
    scrollOffsetPercent: 20,
  },
  about: {
    gifOpacityMs: 500,
    gifScaleMs: 300,
    gifScale: 0.85,
    humanHoverMs: 300,
    skillRest: 0.2,
    skillPeak: 1,
    skillInStart: 0.36,
    skillPeakAt: 0.5,
    skillOutEnd: 0.64,
    skillSmoothing: 0.18,
    galleryFromYVh: 30,
    galleryFromScale: 0.75,
    galleryEnterEnd: 0.4,
    galleryExitStart: 0.7,
    gallerySmoothing: 0.18,
    galleryMouseSmoothing: 0.2,
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

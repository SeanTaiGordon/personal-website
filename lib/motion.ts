export const motion = {
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
  footerCta: {
    opacityMs: 1500,
    /** Wide row so the cluster can travel past either viewport edge */
    rowWidthVw: 180,
    /** Shift that centers the 180vw row in the viewport */
    centerShiftVw: -40,
    xAtLeft: 20,
    xAtRight: -20,
    restingX: 0,
    smoothing: 0.3,
  },
  projectCard: {
    previewMs: 350,
    arrowMs: 300,
    arrowRestXPx: -10,
    backgroundMs: 350,
  },
} as const;

export function mouseTrackTransform(xPercent: number) {
  const { centerShiftVw } = motion.footerCta;
  return `translate3d(calc(${centerShiftVw}vw + ${xPercent}%), 0, 0)`;
}

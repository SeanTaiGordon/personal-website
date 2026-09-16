"use client";

import { useEffect, useRef, useState } from "react";
import { motion, mq } from "@/lib";

const { scrollHideDeltaPx } = motion.nav;

/** Hides the fixed nav after scrolling down; shows it again on scroll up. */
export function useNavScrollHide(active: boolean) {
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    if (!active) {
      setHidden(false);
      return undefined;
    }

    const motionMq = window.matchMedia(mq.reduceMotion);
    lastScrollY.current = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (motionMq.matches || ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const y = Math.max(0, window.scrollY);
        const delta = y - lastScrollY.current;

        if (y <= 0) {
          setHidden(false);
        } else if (delta > scrollHideDeltaPx) {
          setHidden(true);
        } else if (delta < -scrollHideDeltaPx) {
          setHidden(false);
        }

        lastScrollY.current = y;
        ticking = false;
      });
    };

    const onMotionChange = () => {
      lastScrollY.current = window.scrollY;
      setHidden(false);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    motionMq.addEventListener("change", onMotionChange);
    return () => {
      window.removeEventListener("scroll", onScroll);
      motionMq.removeEventListener("change", onMotionChange);
    };
  }, [active]);

  return hidden;
}

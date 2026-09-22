"use client";

import { useEffect, useState } from "react";

type ScrollDismissThresholds = {
  hideAfterYPx: number;
  showBelowYPx: number;
};

export function useScrollDismiss({
  hideAfterYPx,
  showBelowYPx,
}: ScrollDismissThresholds) {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    let ticking = false;

    const measure = () => {
      const y = Math.max(0, window.scrollY);
      setDismissed((current) => {
        if (y <= showBelowYPx) return false;
        if (y > hideAfterYPx) return true;
        return current;
      });
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        measure();
        ticking = false;
      });
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hideAfterYPx, showBelowYPx]);

  return dismissed;
}

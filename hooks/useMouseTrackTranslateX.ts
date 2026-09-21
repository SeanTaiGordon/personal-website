"use client";

import { useEffect, useRef } from "react";
import { lerp, motion, mouseTrackTransform, mq } from "@/lib";

const { xAtLeft, xAtRight, restingX, smoothing } = motion.footerCta;

/**
 * Horizontally tracks the cursor on desktop, smoothing the footer CTA row.
 * Tracking is disabled under reduced motion; the resting center-shift transform
 * is still applied so the wide row stays on screen.
 */
export function useMouseTrackTranslateX() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return undefined;
    }

    const desktopMq = window.matchMedia(mq.desktop);
    const motionMq = window.matchMedia(mq.reduceMotion);
    let targetX: number = restingX;
    let currentX: number = restingX;
    let rafId = 0;

    const apply = (x: number) => {
      if (!desktopMq.matches) {
        el.style.transform = "";
        return;
      }
      el.style.transform = mouseTrackTransform(motionMq.matches ? restingX : x);
    };

    const stop = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
    };

    const tick = () => {
      const next = currentX + (targetX - currentX) * smoothing;

      if (Math.abs(targetX - next) < 0.01) {
        currentX = targetX;
        apply(targetX);
        rafId = 0;
        return;
      }

      currentX = next;
      apply(next);
      rafId = requestAnimationFrame(tick);
    };

    const onMouseMove = (event: MouseEvent) => {
      if (!desktopMq.matches || motionMq.matches) return;

      const t = Math.min(1, Math.max(0, event.clientX / window.innerWidth));
      targetX = lerp(xAtLeft, xAtRight, t);

      if (!rafId) {
        rafId = requestAnimationFrame(tick);
      }
    };

    const reset = () => {
      targetX = restingX;
      currentX = restingX;
      apply(restingX);
      stop();
    };

    apply(restingX);
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    desktopMq.addEventListener("change", reset);
    motionMq.addEventListener("change", reset);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      desktopMq.removeEventListener("change", reset);
      motionMq.removeEventListener("change", reset);
      stop();
    };
  }, []);

  return ref;
}

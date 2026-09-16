"use client";

import { useEffect, type RefObject } from "react";
import { mq } from "@/lib";

type UseScrollProgressOptions = {
  smoothing?: number;
  disabledMq?: string;
};

/**
 * Callback w/ smoothed 0 - 1 scroll for elem
 */
export function useScrollProgress(
  ref: RefObject<HTMLElement | null>,
  onProgress: (progress: number) => void,
  { smoothing = 0.18, disabledMq }: UseScrollProgressOptions = {},
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return undefined;
    }

    const motionMq = window.matchMedia(mq.reduceMotion);
    const offMq = disabledMq ? window.matchMedia(disabledMq) : null;
    let current = 0;
    let target = 0;
    let rafId = 0;

    const measure = () => {
      if (motionMq.matches || offMq?.matches) {
        target = 0;
        return;
      }

      const rect = el.getBoundingClientRect();
      const viewH = window.innerHeight;
      const total = viewH + el.offsetHeight;
      target = Math.min(1, Math.max(0, (viewH - rect.top) / total));
    };

    const tick = () => {
      measure();
      current += (target - current) * smoothing;

      if (Math.abs(target - current) < 0.001) {
        current = target;
      }

      onProgress(current);

      if (Math.abs(target - current) >= 0.001) {
        rafId = requestAnimationFrame(tick);
      } else {
        rafId = 0;
      }
    };

    const kick = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(tick);
      }
    };

    measure();
    current = target;
    onProgress(current);

    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick);
    motionMq.addEventListener("change", kick);
    offMq?.addEventListener("change", kick);

    return () => {
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", kick);
      motionMq.removeEventListener("change", kick);
      offMq?.removeEventListener("change", kick);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [ref, onProgress, smoothing, disabledMq]);
}

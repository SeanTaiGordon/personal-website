"use client";

import { useEffect, type RefObject } from "react";
import { motion } from "@/lib";

const { scrollOffsetPercent } = motion.pageBg;

const invertSections = new Set<Element>();

function syncPageBackground() {
  const root = document.documentElement;
  if (invertSections.size > 0) {
    root.dataset.pageBg = "black";
  } else {
    delete root.dataset.pageBg;
  }
}

function isInTrigger(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  const viewH = window.innerHeight;
  const inset = viewH * (scrollOffsetPercent / 100);
  return rect.bottom > inset && rect.top < viewH - inset;
}

/**
 * Fades the page (and invert-aware UI) to black while this section
 * occupies the viewport, matching the original scroll-into-view invert.
 */
export function usePageBackgroundInvert(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return undefined;
    }

    let ticking = false;

    const measure = () => {
      if (isInTrigger(el)) {
        invertSections.add(el);
      } else {
        invertSections.delete(el);
      }
      syncPageBackground();
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
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      invertSections.delete(el);
      syncPageBackground();
    };
  }, [ref]);
}

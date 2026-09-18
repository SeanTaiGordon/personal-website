"use client";

import { useEffect, type RefObject } from "react";
import { aboutContent, lerp, motion, mq } from "@/lib";

const REST = 0.5;
const { galleryMouseSmoothing: smoothing } = motion.about;
const { grid, caption, skew } = aboutContent.galleryMouse;

type NodeRef = RefObject<HTMLDivElement | null>;

/**
 * Smoothly tracks the cursor on desktop and offsets gallery shots,
 * matching the original viewport-based mouse parallax.
 */
export function useGalleryMouseParallax({
  gridRef,
  captionRef,
  shotRefs,
}: {
  gridRef: NodeRef;
  captionRef: NodeRef;
  shotRefs: RefObject<(HTMLDivElement | null)[]>;
}) {
  useEffect(() => {
    const desktopMq = window.matchMedia(mq.desktop);
    const motionMq = window.matchMedia(mq.reduceMotion);
    let targetX = REST;
    let targetY = REST;
    let currentX = REST;
    let currentY = REST;
    let rafId = 0;

    const clear = () => {
      const gridNode = gridRef.current;
      const title = captionRef.current;
      if (gridNode) gridNode.style.transform = "";
      if (title) title.style.transform = "";
      const shots = shotRefs.current;
      for (let i = 0; i < shots.length; i += 1) {
        const shotNode = shots[i];
        if (shotNode) shotNode.style.transform = "";
      }
    };

    const apply = (x: number, y: number) => {
      if (!desktopMq.matches || motionMq.matches) {
        clear();
        return;
      }

      const gridNode = gridRef.current;
      if (gridNode) {
        gridNode.style.transform = `translate3d(${lerp(grid.x[0], grid.x[1], x)}%, ${lerp(grid.y[0], grid.y[1], y)}%, 0)`;
      }

      const title = captionRef.current;
      if (title) {
        title.style.transform = `translate3d(${lerp(caption.xVw[0], caption.xVw[1], x)}vw, ${lerp(caption.yVh[0], caption.yVh[1], y)}vh, 0)`;
      }

      const shots = aboutContent.gallery;
      for (let i = 0; i < shots.length; i += 1) {
        const shotNode = shotRefs.current[i];
        const shot = shots[i];
        if (shotNode && shot) {
          const tx = lerp(shot.mouse.x[0], shot.mouse.x[1], x);
          const ty = lerp(shot.mouse.y[0], shot.mouse.y[1], y);
          if ("skew" in shot.mouse) {
            shotNode.style.transform = `translate3d(${tx}%, ${ty}%, 0) skew(${lerp(skew.x[0], skew.x[1], x)}deg, ${lerp(skew.y[0], skew.y[1], y)}deg)`;
          } else {
            shotNode.style.transform = `translate3d(${tx}%, ${ty}%, 0)`;
          }
        }
      }
    };

    const stop = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
    };

    const tick = () => {
      currentX += (targetX - currentX) * smoothing;
      currentY += (targetY - currentY) * smoothing;

      const settled =
        Math.abs(targetX - currentX) < 0.001 &&
        Math.abs(targetY - currentY) < 0.001;
      if (settled) {
        currentX = targetX;
        currentY = targetY;
        apply(currentX, currentY);
        rafId = 0;
        return;
      }

      apply(currentX, currentY);
      rafId = requestAnimationFrame(tick);
    };

    const onMouseMove = (event: MouseEvent) => {
      if (!desktopMq.matches || motionMq.matches) return;
      targetX = Math.min(1, Math.max(0, event.clientX / window.innerWidth));
      targetY = Math.min(1, Math.max(0, event.clientY / window.innerHeight));
      if (!rafId) rafId = requestAnimationFrame(tick);
    };

    const reset = () => {
      targetX = REST;
      targetY = REST;
      currentX = REST;
      currentY = REST;
      apply(REST, REST);
      stop();
    };

    apply(REST, REST);
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    desktopMq.addEventListener("change", reset);
    motionMq.addEventListener("change", reset);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      desktopMq.removeEventListener("change", reset);
      motionMq.removeEventListener("change", reset);
      stop();
      clear();
    };
  }, [captionRef, gridRef, shotRefs]);
}

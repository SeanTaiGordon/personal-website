"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import styled from "styled-components";
import { media, motion, mq, noMotionTransition } from "@/lib";

type FadeInTransition = {
  opacityMs?: number;
  moveMs?: number;
  delayMs?: number;
};

type FadeInProps = {
  children: ReactNode;
  className?: string;
  offsetYPx?: number;
  transition?: FadeInTransition;
  minVisibleRatio?: number;
};

const DEFAULT_TRANSITION = {
  opacityMs: motion.fadeIn.opacityMs,
  moveMs: motion.fadeIn.moveMs,
  delayMs: motion.fadeIn.delayMs,
} as const satisfies Required<FadeInTransition>;

const Wrapper = styled.div<{
  $visible: boolean;
  $offsetYPx: number;
  $opacityMs: number;
  $moveMs: number;
  $delayMs: number;
  $reduceMotion: boolean;
}>`
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: translate3d(
    0,
    ${({ $visible, $offsetYPx, $reduceMotion }) =>
      $visible || $reduceMotion ? "0" : `${$offsetYPx}px`},
    0
  );
  transition: ${({ $reduceMotion, $opacityMs, $moveMs, $delayMs }) =>
    $reduceMotion
      ? "none"
      : `opacity ${$opacityMs}ms ease ${$delayMs}ms, transform ${$moveMs}ms ease ${$delayMs}ms`};

  ${media.reduceMotion} {
    opacity: 1;
    transform: none;
  }

  ${noMotionTransition}
`;

function prefersReducedMotion(): boolean {
  return window.matchMedia(mq.reduceMotion).matches;
}

function isAboveTheFold(node: HTMLElement, minVisibleRatio: number): boolean {
  const rect = node.getBoundingClientRect();
  const viewportHeight =
    window.innerHeight || document.documentElement.clientHeight;

  if (rect.height <= 0) {
    return rect.top < viewportHeight && rect.bottom > 0;
  }

  const visibleHeight =
    Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);

  return visibleHeight / rect.height >= minVisibleRatio;
}

export function FadeIn({
  children,
  className,
  offsetYPx = motion.fadeIn.offsetYPx,
  transition,
  minVisibleRatio = motion.fadeIn.minVisibleRatio,
}: FadeInProps) {
  const { opacityMs, moveMs, delayMs } = {
    ...DEFAULT_TRANSITION,
    ...transition,
  };
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return undefined;
    }

    if (prefersReducedMotion()) {
      setReduceMotion(true);
      setVisible(true);
      return undefined;
    }

    if (isAboveTheFold(node, minVisibleRatio)) {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: minVisibleRatio },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [minVisibleRatio]);

  return (
    <Wrapper
      ref={ref}
      className={className}
      $visible={visible}
      $offsetYPx={offsetYPx}
      $opacityMs={opacityMs}
      $moveMs={moveMs}
      $delayMs={delayMs}
      $reduceMotion={reduceMotion}
    >
      {children}
    </Wrapper>
  );
}

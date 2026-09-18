"use client";

import { type ReactNode } from "react";
import styled, { keyframes } from "styled-components";
import { HorizontalScroller } from "@/components/HorizontalScroller";
import { displayXl, media, motion } from "@/lib";

const {
  wipeDelayMs,
  wipeMs,
  scrollHeightVh,
  trackWidthVh,
  trackMinWidthPx,
  fromX,
  toX,
  scrollStart,
  smoothing,
} = motion.contact;

type WipeTitleProps = {
  children: ReactNode;
  overlay?: ReactNode;
};

type ScrollWipeHeroProps = WipeTitleProps & {
  label: string;
};

const wipeRight = keyframes`
  from {
    transform: translate3d(0, 0, 0);
  }

  to {
    transform: translate3d(100%, 0, 0);
  }
`;

const Stage = styled.div`
  position: relative;
`;

const HeadingFrame = styled.div`
  position: relative;
  z-index: 1;
  overflow: hidden;
  max-width: 100%;
`;

const Wipe = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  background-color: var(--color-white);
  pointer-events: none;
  animation: ${wipeRight} ${wipeMs}ms ${motion.ease.standard} ${wipeDelayMs}ms
    forwards;

  ${media.reduceMotion} {
    display: none;
    animation: none;
  }
`;

const Heading = styled.h1`
  margin: 20px 0 10px;
  ${displayXl}
  white-space: nowrap;

  ${media.down("desktop")} {
    white-space: normal;
  }

  ${media.reduceMotion} {
    white-space: normal;
  }
`;

/** Large title with a right-wipe reveal on load. */
export function WipeTitle({ children, overlay }: WipeTitleProps) {
  return (
    <Stage>
      {overlay}
      <HeadingFrame>
        <Wipe aria-hidden />
        <Heading>{children}</Heading>
      </HeadingFrame>
    </Stage>
  );
}

/** WipeTitle inside a horizontal scroll track. */
export function ScrollWipeHero({
  label,
  children,
  overlay,
}: ScrollWipeHeroProps) {
  return (
    <HorizontalScroller
      label={label}
      heightVh={scrollHeightVh}
      trackWidth={`${trackWidthVh}vh`}
      trackMinWidthPx={trackMinWidthPx}
      fromX={fromX}
      toX={toX}
      scrollStart={scrollStart}
      smoothing={smoothing}
    >
      <WipeTitle overlay={overlay}>{children}</WipeTitle>
    </HorizontalScroller>
  );
}

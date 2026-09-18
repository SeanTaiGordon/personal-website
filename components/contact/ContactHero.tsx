"use client";

import styled, { keyframes } from "styled-components";
import { HorizontalScroller } from "@/components/HorizontalScroller";
import { contactContent, displayXl, media, motion } from "@/lib";

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

const wipeRight = keyframes`
  from {
    transform: translate3d(0, 0, 0);
  }

  to {
    transform: translate3d(100%, 0, 0);
  }
`;

const HeadingFrame = styled.div`
  position: relative;
  z-index: 1;
  overflow: hidden;
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

export function ContactHero() {
  return (
    <HorizontalScroller
      label="Contact"
      heightVh={scrollHeightVh}
      trackWidth={`${trackWidthVh}vh`}
      trackMinWidthPx={trackMinWidthPx}
      fromX={fromX}
      toX={toX}
      scrollStart={scrollStart}
      smoothing={smoothing}
    >
      <HeadingFrame>
        <Wipe aria-hidden />
        <Heading>{contactContent.heading}</Heading>
      </HeadingFrame>
    </HorizontalScroller>
  );
}

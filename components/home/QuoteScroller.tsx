"use client";

import styled from "styled-components";
import { FadeIn } from "@/components/FadeIn";
import { HorizontalScroller } from "@/components/HorizontalScroller";
import { displayXl, homeIntro, media, motion } from "@/lib";

const { fadeMs, scrollHeightVh, trackMinWidthPx, fromX, toX, smoothing } =
  motion.quote;

const opacityOnly = { opacityMs: fadeMs, moveMs: 0 } as const;

const Quote = styled.h2`
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

export function QuoteScroller() {
  return (
    <HorizontalScroller
      label="Quote"
      heightVh={scrollHeightVh}
      trackWidth="200vw"
      trackMinWidthPx={trackMinWidthPx}
      fromX={fromX}
      toX={toX}
      smoothing={smoothing}
      backdrop="grey"
    >
      <FadeIn offsetYPx={0} transition={opacityOnly}>
        <Quote>{homeIntro.quote}</Quote>
      </FadeIn>
    </HorizontalScroller>
  );
}

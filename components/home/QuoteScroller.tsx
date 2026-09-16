"use client";

import { useCallback, useRef } from "react";
import styled from "styled-components";
import { Container } from "@/components/Container";
import { FadeIn } from "@/components/FadeIn";
import { useScrollProgress } from "@/hooks";
import {
  breakpoints,
  displayXl,
  homeIntro,
  interp,
  media,
  motion,
  mq,
} from "@/lib";

const { fadeMs, scrollHeightVh, trackMinWidthPx, fromX, toX, smoothing } =
  motion.quote;

const opacityOnly = { opacityMs: fadeMs, moveMs: 0 } as const;

const Section = styled.section`
  position: relative;
`;

const Scroller = styled.div`
  position: relative;
  width: 100%;
  height: ${scrollHeightVh}vh;

  ${media.down("desktop")} {
    height: auto;
    min-height: 60vh;
  }

  ${media.reduceMotion} {
    height: auto;
    min-height: 60vh;
  }
`;

const Grey = styled.div`
  position: absolute;
  inset: 0;
  z-index: -2;
  background-color: var(--color-background-light);
`;

const Sticky = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 100vh;

  ${media.down("desktop")} {
    position: relative;
    height: auto;
    min-height: 60vh;
  }

  ${media.reduceMotion} {
    position: relative;
    height: auto;
    min-height: 60vh;
  }
`;

const Track = styled.div`
  position: relative;
  width: 200vw;
  min-width: ${trackMinWidthPx}px;
  will-change: transform;
  transform: translate3d(${fromX}%, 0, 0);

  ${media.down("desktop")} {
    width: 100%;
    min-width: 100%;
    transform: none;
    will-change: auto;
  }

  ${media.reduceMotion} {
    width: 100%;
    min-width: 100%;
    transform: none;
    will-change: auto;
  }
`;

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
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const onProgress = useCallback((progress: number) => {
    const track = trackRef.current;
    if (!track) return;
    const disable =
      !window.matchMedia(mq.desktop).matches ||
      window.matchMedia(mq.reduceMotion).matches;
    if (disable) {
      track.style.transform = "";
      return;
    }
    const x = interp(progress, 0, fromX, 1, toX);
    track.style.transform = `translate3d(${x}%, 0, 0)`;
  }, []);

  useScrollProgress(sectionRef, onProgress, {
    smoothing,
    disabledMq: `(max-width: ${breakpoints.desktop - 1}px)`,
  });

  return (
    <Section aria-label="Quote">
      <Scroller ref={sectionRef}>
        <Grey />
        <Sticky>
          <Container>
            <Track ref={trackRef}>
              <FadeIn offsetYPx={0} transition={opacityOnly}>
                <Quote>{homeIntro.quote}</Quote>
              </FadeIn>
            </Track>
          </Container>
        </Sticky>
      </Scroller>
    </Section>
  );
}

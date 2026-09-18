"use client";

import { useCallback, useRef, type ReactNode } from "react";
import styled from "styled-components";
import { Container } from "@/components/Container";
import { useScrollProgress } from "@/hooks";
import { breakpoints, interp, media, mq } from "@/lib";

type HorizontalScrollerProps = {
  label: string;
  children: ReactNode;
  heightVh: number;
  trackWidth: string;
  trackMinWidthPx: number;
  fromX: number;
  toX: number;
  scrollStart?: number;
  smoothing: number;
  backdrop?: "grey";
};

const Section = styled.section`
  position: relative;
`;

const Scroller = styled.div<{ $heightVh: number }>`
  position: relative;
  width: 100%;
  height: ${({ $heightVh }) => $heightVh}vh;

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

const Track = styled.div<{
  $width: string;
  $minWidthPx: number;
  $fromX: number;
}>`
  position: relative;
  width: ${({ $width }) => $width};
  min-width: ${({ $minWidthPx }) => $minWidthPx}px;
  will-change: transform;
  transform: translate3d(${({ $fromX }) => $fromX}%, 0, 0);

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

export function HorizontalScroller({
  label,
  children,
  heightVh,
  trackWidth,
  trackMinWidthPx,
  fromX,
  toX,
  scrollStart = 0,
  smoothing,
  backdrop,
}: HorizontalScrollerProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const onProgress = useCallback(
    (progress: number) => {
      const track = trackRef.current;
      if (!track) return;
      const disable =
        !window.matchMedia(mq.desktop).matches ||
        window.matchMedia(mq.reduceMotion).matches;
      if (disable) {
        track.style.transform = "";
        return;
      }
      const x = interp(progress, scrollStart, fromX, 1, toX);
      track.style.transform = `translate3d(${x}%, 0, 0)`;
    },
    [fromX, scrollStart, toX],
  );

  useScrollProgress(sectionRef, onProgress, {
    smoothing,
    disabledMq: `(max-width: ${breakpoints.desktop - 1}px)`,
  });

  return (
    <Section aria-label={label}>
      <Scroller ref={sectionRef} $heightVh={heightVh}>
        {backdrop === "grey" ? <Grey /> : null}
        <Sticky>
          <Container>
            <Track
              ref={trackRef}
              $width={trackWidth}
              $minWidthPx={trackMinWidthPx}
              $fromX={fromX}
            >
              {children}
            </Track>
          </Container>
        </Sticky>
      </Scroller>
    </Section>
  );
}

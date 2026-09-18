"use client";

import { useCallback, useRef, type ReactNode } from "react";
import styled from "styled-components";
import { FadeIn } from "@/components/FadeIn";
import { useScrollProgress } from "@/hooks";
import { displayLg, interp, media, motion, mq } from "@/lib";

const {
  skillRest,
  skillPeak,
  skillInStart,
  skillPeakAt,
  skillOutEnd,
  skillSmoothing,
} = motion.about;

export function skillOpacity(progress: number) {
  if (progress <= skillInStart) return skillRest;
  if (progress <= skillPeakAt) {
    return interp(progress, skillInStart, skillRest, skillPeakAt, skillPeak);
  }
  if (progress <= skillOutEnd) {
    return interp(progress, skillPeakAt, skillPeak, skillOutEnd, skillRest);
  }
  return skillRest;
}

export const SectionPill = styled.div<{ $invert?: boolean }>`
  display: inline-block;
  margin: 100px 0 10px;
  padding: 5px 10px;
  border-radius: 3px;
  background-color: ${({ $invert }) =>
    $invert ? "var(--color-white)" : "var(--color-black)"};
  color: ${({ $invert }) =>
    $invert ? "var(--color-black)" : "var(--color-white)"};
  font-size: 24px;
  font-weight: 700;
  line-height: 1.2;
  text-transform: uppercase;
`;

export const Panel = styled.div`
  padding: 40px 0;
  opacity: ${skillRest};
  scroll-margin-top: var(--header-height);
`;

export const EntryRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px 30px;
  align-items: start;

  ${media.down("desktop")} {
    grid-template-columns: 1fr;
  }
`;

export const EntryTitle = styled.h2`
  margin: 20px 0 10px;
  ${displayLg}
`;

export const EntryPeriod = styled.span`
  position: relative;
  left: -10px;
  bottom: 40px;
  font-size: 20px;
  font-weight: 600;

  ${media.down("tablet")} {
    left: 0;
    bottom: 30px;
  }

  ${media.down("phone")} {
    bottom: 20px;
  }
`;

export const EntryBody = styled.div`
  margin: 30px 0 10px;
  font-size: 24px;
  font-weight: 400;
  line-height: 1.35;

  p {
    margin: 0 0 1em;

    &:last-child {
      margin-bottom: 0;
    }
  }

  ${media.down("tablet")} {
    font-size: 20px;
  }
`;

type FadePanelProps = {
  id?: string;
  children: ReactNode;
};

export function FadePanel({ id, children }: FadePanelProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onProgress = useCallback((progress: number) => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia(mq.reduceMotion).matches) {
      node.style.opacity = "1";
      return;
    }
    node.style.opacity = String(skillOpacity(progress));
  }, []);

  useScrollProgress(ref, onProgress, { smoothing: skillSmoothing });

  return (
    <Panel ref={ref} id={id}>
      {children}
    </Panel>
  );
}

type EntryPanelProps = {
  id?: string;
  title: string;
  period: string;
  body: readonly string[];
};

export function EntryPanel({ id, title, period, body }: EntryPanelProps) {
  return (
    <FadePanel id={id}>
      <EntryRow>
        <FadeIn offsetYPx={0}>
          <EntryTitle>
            {title} <EntryPeriod>({period})</EntryPeriod>
          </EntryTitle>
        </FadeIn>
        <FadeIn>
          <EntryBody>
            {body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </EntryBody>
        </FadeIn>
      </EntryRow>
    </FadePanel>
  );
}

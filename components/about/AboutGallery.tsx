"use client";

import Image from "next/image";
import { useCallback, useRef, type RefObject } from "react";
import styled, { css } from "styled-components";
import { FadeIn } from "@/components/FadeIn";
import {
  useGalleryMouseParallax,
  usePageBackgroundInvert,
  useScrollProgress,
} from "@/hooks";
import {
  aboutContent,
  breakpoints,
  displayMd,
  interp,
  lerp,
  media,
  motion,
  mq,
  type AboutGalleryOffset,
} from "@/lib";

const {
  galleryFromYVh,
  galleryFromScale,
  galleryEnterEnd,
  galleryExitStart,
  gallerySmoothing,
} = motion.about;

const offsets: Record<AboutGalleryOffset, ReturnType<typeof css>> = {
  one: css`
    left: -10%;
    top: 15%;
  `,
  two: css`
    top: 0;
  `,
  three: css``,
  four: css`
    left: 10%;
    top: 20%;
  `,
  five: css``,
  six: css``,
  seven: css`
    left: -10%;
    top: -20%;
  `,
  eight: css``,
  nine: css``,
  ten: css`
    top: -20%;
  `,
};

const Section = styled.section`
  position: relative;
  min-height: 180vh;
  color: var(--color-white);
  background-color: var(--color-black);

  ${media.down("desktop")} {
    min-height: 0;
  }

  ${media.reduceMotion} {
    min-height: 0;
  }
`;

const Sticky = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  overflow: hidden;
  align-items: center;
  width: 100%;
  height: 100vh;

  ${media.down("desktop")} {
    display: none;
  }

  ${media.reduceMotion} {
    position: relative;
    height: auto;
    min-height: 100vh;
    overflow: visible;
  }
`;

const Track = styled.div`
  width: 100%;
  opacity: 0;
  transform: translate3d(0, ${galleryFromYVh}vh, 0)
    scale3d(${galleryFromScale}, ${galleryFromScale}, 1);
  will-change: transform, opacity;

  ${media.reduceMotion} {
    opacity: 1;
    transform: none;
    will-change: auto;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  column-gap: 30px;
  align-items: center;
  will-change: transform;
`;

const Cell = styled.div<{ $align?: "start" }>`
  grid-column: span 3;
  display: flex;
  flex-direction: column;
  justify-content: ${({ $align }) =>
    $align === "start" ? "flex-start" : "center"};
  align-items: center;
`;

const CaptionCell = styled(Cell)`
  grid-column: span 6;
`;

const ShotWrap = styled.div<{ $offset: AboutGalleryOffset }>`
  position: relative;
  will-change: transform;
  ${({ $offset }) => offsets[$offset]}
`;

const Shot = styled(Image)`
  display: block;
  width: auto;
  height: auto;
  max-width: 25vw;
  max-height: 300px;
`;

const CaptionTrack = styled.div`
  will-change: transform;
`;

const Caption = styled.h3`
  margin: 0;
  padding: 30px 20px;
  ${displayMd}
  text-align: center;
  color: var(--color-white);
`;

const Mobile = styled.div`
  display: none;

  ${media.down("desktop")} {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    padding: 72px var(--page-gutter);
  }
`;

const MobileShot = styled(Image)`
  display: block;
  width: 100%;
  height: auto;
`;

function poseT(progress: number) {
  if (progress <= 0) return 0;
  if (progress < galleryEnterEnd) {
    return interp(progress, 0, 0, galleryEnterEnd, 1);
  }
  if (progress < galleryExitStart) return 1;
  return interp(progress, galleryExitStart, 1, 1, 0);
}

function GalleryGrid({
  gridRef,
  captionRef,
  shotRefs,
}: {
  gridRef: RefObject<HTMLDivElement | null>;
  captionRef: RefObject<HTMLDivElement | null>;
  shotRefs: RefObject<(HTMLDivElement | null)[]>;
}) {
  const shots = aboutContent.gallery;
  const topRow = shots.slice(0, 4);
  const midLeft = shots[4];
  const midRight = shots[5];
  const bottomRow = shots.slice(6);

  const bindShot = (
    shot: (typeof shots)[number],
    index: number,
    align?: "start",
  ) => (
    <Cell key={shot.src} $align={align}>
      <ShotWrap
        $offset={shot.offset}
        ref={(node) => {
          const nodes = shotRefs.current;
          nodes[index] = node;
        }}
      >
        <Shot
          src={shot.src}
          alt=""
          width={shot.width}
          height={shot.height}
          sizes="25vw"
        />
      </ShotWrap>
    </Cell>
  );

  return (
    <Grid ref={gridRef}>
      {topRow.map((shot, index) => bindShot(shot, index))}
      {midLeft ? bindShot(midLeft, 4) : null}
      <CaptionCell>
        <CaptionTrack ref={captionRef}>
          <Caption>{aboutContent.galleryCaption}</Caption>
        </CaptionTrack>
      </CaptionCell>
      {midRight ? bindShot(midRight, 5) : null}
      {bottomRow.map((shot, index) => bindShot(shot, index + 6, "start"))}
    </Grid>
  );
}

export function AboutGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const shotRefs = useRef<(HTMLDivElement | null)[]>([]);

  const onProgress = useCallback((progress: number) => {
    const track = trackRef.current;
    if (!track) return;

    const disable =
      !window.matchMedia(mq.desktop).matches ||
      window.matchMedia(mq.reduceMotion).matches;
    if (disable) {
      track.style.opacity = "";
      track.style.transform = "";
      return;
    }

    const t = poseT(progress);
    const y = lerp(galleryFromYVh, 0, t);
    const scale = lerp(galleryFromScale, 1, t);
    track.style.opacity = String(t);
    track.style.transform = `translate3d(0, ${y}vh, 0) scale3d(${scale}, ${scale}, 1)`;
  }, []);

  useScrollProgress(sectionRef, onProgress, {
    smoothing: gallerySmoothing,
    disabledMq: `(max-width: ${breakpoints.desktop - 1}px)`,
  });

  useGalleryMouseParallax({ gridRef, captionRef, shotRefs });
  usePageBackgroundInvert(sectionRef);

  return (
    <Section ref={sectionRef} aria-label="Front-end projects">
      <Sticky>
        <Track ref={trackRef}>
          <GalleryGrid
            gridRef={gridRef}
            captionRef={captionRef}
            shotRefs={shotRefs}
          />
        </Track>
      </Sticky>

      <Mobile>
        <MobileShot
          src={aboutContent.mobile[0].src}
          alt=""
          width={aboutContent.mobile[0].width}
          height={aboutContent.mobile[0].height}
          sizes="100vw"
        />
        <FadeIn offsetYPx={0}>
          <Caption>{aboutContent.galleryCaption}</Caption>
        </FadeIn>
        <MobileShot
          src={aboutContent.mobile[1].src}
          alt=""
          width={aboutContent.mobile[1].width}
          height={aboutContent.mobile[1].height}
          sizes="100vw"
        />
      </Mobile>
    </Section>
  );
}

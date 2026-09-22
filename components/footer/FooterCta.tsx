"use client";

import styled from "styled-components";
import { FadeIn } from "@/components/FadeIn";
import { WipeUnderline } from "@/components/WipeUnderline";
import { useMouseTrackTranslateX } from "@/hooks";
import { displayXl, media, motion, mouseTrackTransform } from "@/lib";

const { opacityMs, rowWidthVw, restingX } = motion.footerCta;
const opacityOnly = { opacityMs, moveMs: 0 } as const;

const Viewport = styled.div`
  overflow: hidden;
  width: 100%;

  ${media.down("desktop")} {
    padding-right: var(--page-gutter);
    padding-left: var(--page-gutter);
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* Wider than the viewport so the cluster can travel past either edge.
     Combined with the resting center-shift, the visual center sits at 50vw. */
  width: ${rowWidthVw}vw;
  transform: ${mouseTrackTransform(restingX)};
  will-change: transform;

  ${media.down("desktop")} {
    width: auto;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    transform: none;
    will-change: auto;
  }

  ${media.reduceMotion} {
    will-change: auto;
  }
`;

const Prompt = styled.p`
  margin: 20px 10px 10px 0;
  ${displayXl}
  color: var(--color-black-20);
`;

const CtaLink = styled(WipeUnderline)`
  flex: 0 0 auto;
`;

const CtaLabel = styled.span`
  position: relative;
  z-index: 1;
  display: block;
  margin: 20px 0 10px;
  ${displayXl}
  color: var(--page-fg);
`;

const Gap = styled.div`
  width: 30px;
  height: 30px;

  ${media.down("desktop")} {
    display: none;
  }
`;

export function FooterCta() {
  const rowRef = useMouseTrackTranslateX();

  return (
    <Viewport>
      <Row ref={rowRef}>
        <FadeIn offsetYPx={0} transition={opacityOnly}>
          <Prompt>Interested?</Prompt>
        </FadeIn>
        <Gap aria-hidden />
        <FadeIn offsetYPx={0} transition={opacityOnly}>
          <CtaLink href="/contact" thick placeholderTrack>
            <CtaLabel>Write an email</CtaLabel>
          </CtaLink>
        </FadeIn>
      </Row>
    </Viewport>
  );
}

"use client";

import { useRef } from "react";
import styled from "styled-components";
import { Container } from "@/components/Container";
import { FadeIn } from "@/components/FadeIn";
import { EntryPanel, SectionPill } from "@/components/cv/CvPanels";
import { usePageBackgroundInvert } from "@/hooks";
import { cvContent, media } from "@/lib";

const Section = styled.section`
  position: relative;
  color: var(--color-white);
  background-color: var(--color-black);
  min-height: 100vh;

  ${media.down("desktop")} {
    min-height: 0;
  }
`;

export function CvEducation() {
  const sectionRef = useRef<HTMLElement>(null);
  usePageBackgroundInvert(sectionRef);

  return (
    <Section ref={sectionRef}>
      <Container>
        <FadeIn offsetYPx={0}>
          <SectionPill $invert>{cvContent.educationHeading}</SectionPill>
        </FadeIn>
        {cvContent.education.map((entry) => (
          <EntryPanel
            key={entry.title}
            title={entry.title}
            period={entry.period}
            body={entry.body}
          />
        ))}
      </Container>
    </Section>
  );
}

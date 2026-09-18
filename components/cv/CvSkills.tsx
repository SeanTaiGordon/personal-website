"use client";

import styled from "styled-components";
import { Container } from "@/components/Container";
import { FadeIn } from "@/components/FadeIn";
import { FadePanel, SectionPill } from "@/components/cv/CvPanels";
import { cvContent, displayLg, media } from "@/lib";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  align-items: start;

  ${media.down("desktop")} {
    grid-template-columns: 1fr;
  }
`;

const Cell = styled.div<{ $span: number }>`
  grid-column: span ${({ $span }) => $span};

  ${media.down("desktop")} {
    grid-column: span 1;
  }
`;

const Name = styled.h2`
  margin: 20px 0 -5px;
  ${displayLg}
`;

const Years = styled.p`
  margin: 0 0 10px;
  font-size: 24px;
  line-height: 1.35;

  ${media.down("tablet")} {
    font-size: 20px;
  }
`;

export function CvSkills() {
  return (
    <section>
      <Container>
        <FadeIn offsetYPx={0}>
          <SectionPill>{cvContent.skillsHeading}</SectionPill>
        </FadeIn>
        {cvContent.skillRows.map((row) => (
          <FadePanel key={row.map((skill) => skill.name).join("-")}>
            <Grid>
              {row.map((skill) => (
                <Cell key={skill.name} $span={skill.span}>
                  <FadeIn offsetYPx={0}>
                    <Name>{skill.name}</Name>
                    <Years>{skill.years}</Years>
                  </FadeIn>
                </Cell>
              ))}
            </Grid>
          </FadePanel>
        ))}
      </Container>
    </section>
  );
}

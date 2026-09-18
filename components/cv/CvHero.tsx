"use client";

import styled from "styled-components";
import { Container } from "@/components/Container";
import { WipeTitle } from "@/components/WipeTitle";
import { cvContent } from "@/lib";

const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  min-height: 50vh;
`;

const HeroContainer = styled(Container)`
  width: 100%;
`;

export function CvHero() {
  return (
    <Section aria-label="CV">
      <HeroContainer>
        <WipeTitle>{cvContent.heading}</WipeTitle>
      </HeroContainer>
    </Section>
  );
}

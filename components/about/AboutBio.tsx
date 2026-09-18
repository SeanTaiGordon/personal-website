"use client";

import styled from "styled-components";
import { Container } from "@/components/Container";
import { FadeIn } from "@/components/FadeIn";
import { aboutContent, displayMd } from "@/lib";

const Copy = styled.h3`
  margin: 20px 0 10px;
  ${displayMd}
`;

export function AboutBio() {
  return (
    <section>
      <Container>
        {aboutContent.bio.map((paragraph) => (
          <FadeIn key={paragraph}>
            <Copy>{paragraph}</Copy>
          </FadeIn>
        ))}
      </Container>
    </section>
  );
}

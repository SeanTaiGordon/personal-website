"use client";

import styled from "styled-components";
import { Container } from "@/components/Container";
import { FadeIn } from "@/components/FadeIn";
import { WipeUnderline } from "@/components/WipeUnderline";
import { footerContacts, media, primaryNav } from "@/lib";

const Section = styled.section`
  padding-top: 0;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px 32px;

  ${media.down("tablet")} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Links = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px 28px;
`;

const Email = styled(WipeUnderline)`
  ${media.down("tablet")} {
    text-align: left;
  }
`;

const homeLinks = primaryNav.filter(
  (link) => link.href === "/about" || link.href === "/contact",
);

export function IntroLinks() {
  const { linkedIn, email } = footerContacts;

  return (
    <Section>
      <Container>
        <Row>
          <Links>
            <FadeIn>
              <WipeUnderline
                href={linkedIn.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {linkedIn.label}
              </WipeUnderline>
            </FadeIn>
            {homeLinks.map(({ href, label }) => (
              <FadeIn key={href}>
                <WipeUnderline href={href}>{label}</WipeUnderline>
              </FadeIn>
            ))}
          </Links>
          <FadeIn>
            <Email href={email.href}>{email.label}</Email>
          </FadeIn>
        </Row>
      </Container>
    </Section>
  );
}

"use client";

import styled from "styled-components";
import { Container } from "@/components/Container";
import { FadeIn } from "@/components/FadeIn";
import { WipeUnderline } from "@/components/WipeUnderline";
import { footerContacts, footerNav, media } from "@/lib";

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${media.down("tablet")} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const EmailLink = styled(WipeUnderline)`
  text-align: right;

  ${media.down("tablet")} {
    text-align: left;
  }
`;

const FooterNav = styled.nav`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  margin-bottom: 20px;
  padding-top: 20px;
  border-top: 1px solid var(--color-grey);
  text-align: left;

  ${media.down("desktop")} {
    justify-content: flex-start;
    align-items: flex-start;
  }

  ${media.down("tablet")} {
    flex-direction: column;
  }
`;

const NavLink = styled(WipeUnderline)`
  display: block;
  margin: 0 15px 10px 5px;
  color: var(--color-black);
  font-size: 20px;

  ${media.down("tablet")} {
    margin-left: 0;
    padding-right: 5px;
    padding-left: 0;
  }
`;

export function FooterLinks() {
  const { linkedIn, email } = footerContacts;

  return (
    <Container>
      <TopRow>
        <FadeIn>
          <WipeUnderline
            href={linkedIn.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {linkedIn.label}
          </WipeUnderline>
        </FadeIn>
        <FadeIn>
          <EmailLink href={email.href}>{email.label}</EmailLink>
        </FadeIn>
      </TopRow>

      <FooterNav aria-label="Footer">
        {footerNav.map(({ href, label }) => (
          <FadeIn key={href}>
            <NavLink href={href}>{label}</NavLink>
          </FadeIn>
        ))}
      </FooterNav>
    </Container>
  );
}

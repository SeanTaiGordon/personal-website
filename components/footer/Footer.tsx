import { FooterCta } from "./FooterCta";
import { FooterLinks } from "./FooterLinks";
import { FooterShell } from "./FooterShell";

export function Footer() {
  return (
    <FooterShell>
      <FooterCta />
      <FooterLinks />
    </FooterShell>
  );
}

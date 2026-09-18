import type { Metadata } from "next";
import { ContactForm, ContactHero } from "@/components/contact";
import { ResumeStrip } from "@/components/ResumeStrip";

export const metadata: Metadata = {
  title: "Contact — Sean Gordon",
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactForm />
      <ResumeStrip />
    </>
  );
}

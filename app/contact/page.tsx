import { ResumeStrip } from "@/components";
import { ContactForm, ContactHero } from "@/components/contact";
import { pageDescriptions, pageMetadata } from "@/lib";

export const metadata = pageMetadata({
  title: "Contact",
  description: pageDescriptions.contact,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactForm />
      <ResumeStrip />
    </>
  );
}

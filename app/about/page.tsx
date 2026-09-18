import { ResumeStrip } from "@/components";
import {
  AboutBio,
  AboutGallery,
  AboutHero,
  AboutSkills,
} from "@/components/about";
import { pageDescriptions, pageMetadata } from "@/lib";

export const metadata = pageMetadata({
  title: "About",
  description: pageDescriptions.about,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutBio />
      <AboutSkills />
      <AboutGallery />
      <ResumeStrip />
    </>
  );
}

import type { Metadata } from "next";
import {
  AboutBio,
  AboutGallery,
  AboutHero,
  AboutSkills,
} from "@/components/about";
import { ResumeStrip } from "@/components/ResumeStrip";

export const metadata: Metadata = {
  title: "About — Sean Gordon",
};

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

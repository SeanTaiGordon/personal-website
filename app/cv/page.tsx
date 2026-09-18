import type { Metadata } from "next";
import {
  CvEducation,
  CvExperience,
  CvHero,
  CvSkills,
} from "@/components/cv";
import { ResumeStrip } from "@/components/ResumeStrip";

export const metadata: Metadata = {
  title: "CV — Sean Gordon",
};

export default function CvPage() {
  return (
    <>
      <CvHero />
      <CvSkills />
      <CvExperience />
      <CvEducation />
      <ResumeStrip />
    </>
  );
}

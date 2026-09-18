import { ResumeStrip } from "@/components";
import { CvEducation, CvExperience, CvHero, CvSkills } from "@/components/cv";
import { pageDescriptions, pageMetadata } from "@/lib";

export const metadata = pageMetadata({
  title: "CV",
  description: pageDescriptions.cv,
  path: "/cv",
});

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

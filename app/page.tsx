import type { Metadata } from "next";
import { ResumeStrip } from "@/components/ResumeStrip";
import {
  Hero,
  IntroLinks,
  ProjectList,
  QuoteScroller,
} from "@/components/home";

export const metadata: Metadata = {
  title: "Home — Sean Gordon",
};

export default function Home() {
  return (
    <>
      <Hero />
      <IntroLinks />
      <ProjectList />
      <QuoteScroller />
      <ResumeStrip />
    </>
  );
}

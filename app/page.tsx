import type { Metadata } from "next";
import {
  Hero,
  IntroLinks,
  ProjectList,
  QuoteScroller,
  ResumeStrip,
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

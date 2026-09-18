import { ResumeStrip } from "@/components";
import {
  Hero,
  IntroLinks,
  ProjectList,
  QuoteScroller,
} from "@/components/home";
import { pageDescriptions, pageMetadata } from "@/lib";

export const metadata = pageMetadata({
  description: pageDescriptions.home,
  path: "/",
});

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

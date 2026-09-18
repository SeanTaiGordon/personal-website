"use client";

import { Container } from "@/components/Container";
import { FadeIn } from "@/components/FadeIn";
import { EntryPanel, SectionPill } from "@/components/cv/CvPanels";
import { cvContent } from "@/lib";

export function CvExperience() {
  return (
    <section>
      <Container>
        <FadeIn offsetYPx={0}>
          <SectionPill>{cvContent.experienceHeading}</SectionPill>
        </FadeIn>
        {cvContent.experience.map((entry) => (
          <EntryPanel
            key={entry.id}
            id={entry.id}
            title={entry.title}
            period={entry.period}
            body={entry.body}
          />
        ))}
        <FadeIn offsetYPx={0}>
          <SectionPill>{cvContent.personalHeading}</SectionPill>
        </FadeIn>
        {cvContent.personal.map((entry) => (
          <EntryPanel
            key={entry.id}
            id={entry.id}
            title={entry.title}
            period={entry.period}
            body={entry.body}
          />
        ))}
      </Container>
    </section>
  );
}

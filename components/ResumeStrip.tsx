"use client";

import styled from "styled-components";
import { Container } from "@/components/Container";
import { FadeIn } from "@/components/FadeIn";
import { WipeUnderline } from "@/components/WipeUnderline";
import {
  displayMd,
  education,
  experiences,
  homeIntro,
  label,
  media,
  motion,
  twoCol,
  type TimelineEntry,
} from "@/lib";

const fadeInSlow = {
  opacityMs: motion.quote.fadeMs,
  moveMs: 0,
} as const;

const Summary = styled.h3`
  margin: 20px 0 -5px;
  ${displayMd}
`;

const Spacer = styled.div`
  height: 5rem;
`;

const Columns = styled.div`
  ${twoCol}
  gap: 16px;
`;

const Column = styled.div`
  display: grid;
  gap: 16px;
  align-content: start;
`;

const ColumnTitle = styled.h6`
  margin: 10px 0;
  ${label}
`;

const Entry = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  align-items: center;

  ${media.down("tablet")} {
    grid-template-columns: 1fr;
  }
`;

const Detail = styled.p`
  margin: 0 0 10px;
  font-size: 24px;
  line-height: 1.35;

  ${media.down("tablet")} {
    font-size: 20px;
  }
`;

const Org = styled(WipeUnderline)`
  justify-self: start;
  font-size: 40px;
  font-weight: 500;
  line-height: 1.2;

  ${media.down("tablet")} {
    font-size: 30px;
  }

  ${media.down("phone")} {
    font-size: 28px;
  }
`;

function TimelineColumn({
  title,
  entries,
}: {
  title: string;
  entries: readonly TimelineEntry[];
}) {
  return (
    <Column>
      <FadeIn offsetYPx={0} transition={fadeInSlow}>
        <ColumnTitle>{title}</ColumnTitle>
      </FadeIn>
      {entries.map((entry) => (
        <FadeIn
          key={`${entry.period}-${entry.org}`}
          offsetYPx={0}
          transition={fadeInSlow}
        >
          <Entry>
            <Detail>
              {entry.period}
              <br />
              {entry.detail}
            </Detail>
            <Org href={entry.href} target="_blank" rel="noopener noreferrer">
              {entry.org}
            </Org>
          </Entry>
        </FadeIn>
      ))}
    </Column>
  );
}

export function ResumeStrip() {
  return (
    <section>
      <Container>
        <FadeIn offsetYPx={0} transition={fadeInSlow}>
          <Summary>{homeIntro.summary}</Summary>
        </FadeIn>
        <Spacer />
        <Columns>
          <TimelineColumn title="Education" entries={education} />
          <TimelineColumn title="Experiences" entries={experiences} />
        </Columns>
      </Container>
    </section>
  );
}

"use client";

import { useCallback, useRef } from "react";
import styled from "styled-components";
import { Container } from "@/components/Container";
import { FadeIn } from "@/components/FadeIn";
import { useScrollProgress } from "@/hooks";
import { aboutContent, displayLg, interp, media, motion, mq } from "@/lib";

const {
  skillRest,
  skillPeak,
  skillInStart,
  skillPeakAt,
  skillOutEnd,
  skillSmoothing,
} = motion.about;

const Heading = styled.h6`
  margin: 10px 0;
  font-size: 20px;
  font-weight: 700;
  line-height: 1.2;
`;

const Panel = styled.div`
  padding: 40px 0;
  opacity: ${skillRest};
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px 30px;
  align-items: start;

  ${media.down("desktop")} {
    grid-template-columns: 1fr;
  }
`;

const Title = styled.h2`
  margin: 20px 0 10px;
  ${displayLg}
`;

const Index = styled.span`
  position: relative;
  left: -10px;
  bottom: 40px;
  font-size: 20px;
  font-weight: 600;

  ${media.down("tablet")} {
    left: 0;
    bottom: 30px;
  }

  ${media.down("phone")} {
    bottom: 20px;
  }
`;

const Body = styled.p`
  margin: 10px 0;
  font-size: 28px;
  font-weight: 500;
  line-height: 1.3;

  ${media.down("tablet")} {
    font-size: 24px;
  }

  ${media.down("phone")} {
    font-weight: 400;
  }
`;

function skillOpacity(progress: number) {
  if (progress <= skillInStart) return skillRest;
  if (progress <= skillPeakAt) {
    return interp(progress, skillInStart, skillRest, skillPeakAt, skillPeak);
  }
  if (progress <= skillOutEnd) {
    return interp(progress, skillPeakAt, skillPeak, skillOutEnd, skillRest);
  }
  return skillRest;
}

type Skill = (typeof aboutContent.skills)[number];

type SkillPanelProps = {
  n: Skill["n"];
  title: Skill["title"];
  body: Skill["body"];
};

function SkillPanel({ n, title, body }: SkillPanelProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onProgress = useCallback((progress: number) => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia(mq.reduceMotion).matches) {
      node.style.opacity = "1";
      return;
    }
    node.style.opacity = String(skillOpacity(progress));
  }, []);

  useScrollProgress(ref, onProgress, { smoothing: skillSmoothing });

  return (
    <Panel ref={ref}>
      <Row>
        <FadeIn offsetYPx={0}>
          <Title>
            {title} <Index>({n})</Index>
          </Title>
        </FadeIn>
        <FadeIn>
          <Body>{body}</Body>
        </FadeIn>
      </Row>
    </Panel>
  );
}

export function AboutSkills() {
  return (
    <section>
      <Container>
        <FadeIn offsetYPx={0}>
          <Heading>{aboutContent.skillsHeading}</Heading>
        </FadeIn>
        {aboutContent.skills.map((skill) => (
          <SkillPanel
            key={skill.n}
            n={skill.n}
            title={skill.title}
            body={skill.body}
          />
        ))}
      </Container>
    </section>
  );
}

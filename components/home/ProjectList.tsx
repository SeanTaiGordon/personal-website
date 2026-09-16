"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { Container } from "@/components/Container";
import { FadeIn } from "@/components/FadeIn";
import { ProjectCard } from "@/components/ProjectCard";
import { lerp, media, motion, mq, projects } from "@/lib";
import type { Project } from "@/lib/projects";

const { hoverMs, imageDelayMs, imageFollowSmoothing } = motion.projectCard;

const Section = styled.section`
  position: relative;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
`;

const Tint = styled.div<{ $color: string; $on: boolean }>`
  position: fixed;
  inset: 0;
  z-index: -1;
  background-color: ${({ $color }) => $color};
  opacity: ${({ $on }) => ($on ? 1 : 0)};
  pointer-events: none;
  transition: opacity ${hoverMs}ms ease;
`;

const FollowImage = styled.div<{ $on: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  height: 40vh;
  margin-top: -20vh;
  margin-left: -150px;
  opacity: ${({ $on }) => ($on ? 1 : 0)};
  pointer-events: none;
  will-change: transform, opacity;
  transition: opacity ${hoverMs}ms ease ${imageDelayMs}ms;

  ${media.down("desktop")} {
    display: none;
  }

  img {
    display: block;
    height: 40vh;
    width: auto;
    max-width: none;
  }
`;

export function ProjectList() {
  const [hovered, setHovered] = useState<Project | null>(null);
  const [mounted, setMounted] = useState(false);
  const followRef = useRef<HTMLDivElement>(null);
  const visibleRef = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.dataset.projectHover = hovered ? "true" : "";
    return () => {
      delete document.body.dataset.projectHover;
    };
  }, [hovered]);

  useEffect(() => {
    const node = followRef.current;
    if (!node) {
      return undefined;
    }

    const desktopMq = window.matchMedia(mq.desktop);
    const motionMq = window.matchMedia(mq.reduceMotion);
    let targetX = 50;
    let targetY = 50;
    let currentX = 50;
    let currentY = 50;
    let rafId = 0;

    const apply = () => {
      node.style.transform = `translate3d(${currentX}vw, ${currentY}vh, 0)`;
    };

    const tick = () => {
      currentX = lerp(currentX, targetX, imageFollowSmoothing);
      currentY = lerp(currentY, targetY, imageFollowSmoothing);
      apply();
      if (
        Math.abs(targetX - currentX) > 0.05 ||
        Math.abs(targetY - currentY) > 0.05
      ) {
        rafId = requestAnimationFrame(tick);
      } else {
        currentX = targetX;
        currentY = targetY;
        apply();
        rafId = 0;
      }
    };

    const onMove = (event: MouseEvent) => {
      if (!desktopMq.matches || motionMq.matches || !visibleRef.current) {
        return;
      }
      targetX = (event.clientX / window.innerWidth) * 100;
      targetY = (event.clientY / window.innerHeight) * 100;
      if (!rafId) {
        rafId = requestAnimationFrame(tick);
      }
    };

    apply();
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [mounted]);

  visibleRef.current = Boolean(hovered);

  const theater =
    mounted &&
    createPortal(
      <>
        <Tint $color={hovered?.hoverTint ?? "#000"} $on={Boolean(hovered)} />
        <FollowImage ref={followRef} $on={Boolean(hovered)}>
          {hovered ? (
            <Image
              src={hovered.image}
              alt=""
              width={640}
              height={400}
              sizes="40vh"
            />
          ) : null}
        </FollowImage>
      </>,
      document.body,
    );

  return (
    <Section aria-label="Selected work">
      {theater}
      <Container>
        <List>
          {projects.map((project) => (
            <FadeIn key={project.title}>
              <ProjectCard
                project={project}
                onHighlightChange={(active) =>
                  setHovered((current) => {
                    if (active) return project;
                    if (current?.title === project.title) return null;
                    return current;
                  })
                }
              />
            </FadeIn>
          ))}
        </List>
      </Container>
    </Section>
  );
}

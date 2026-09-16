"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef } from "react";
import styled from "styled-components";
import { useScrollProgress } from "@/hooks";
import {
  breakpoints,
  displayLg,
  interp,
  media,
  motion,
  mq,
  noMotionTransition,
} from "@/lib";
import type { Project } from "@/lib/projects";

export type { Project };

type ProjectCardProps = {
  project: Project;
  onHighlightChange?: (hovered: boolean) => void;
};

const {
  hoverMs,
  arrowRestXPx,
  titleHoverXPx,
  titleScrollXPx,
  imageScrollXPx,
  imageRotateFrom,
  imageRotateTo,
  scrollStart,
  scrollPeak,
  scrollEnd,
  smoothing,
} = motion.projectCard;

const Preview = styled(Image)`
  display: none;
  pointer-events: none;

  ${media.down("desktop")} {
    display: block;
    position: absolute;
    top: -15%;
    left: 0;
    bottom: 0;
    z-index: 0;
    height: 130%;
    width: auto;
    max-width: none;
    opacity: var(--project-img-o);
    transform: translate3d(var(--project-img-x), 0, 0)
      rotate(var(--project-img-r));
  }

  ${media.down("phone")} {
    top: 10%;
    height: 80%;
  }

  ${noMotionTransition}
`;

const Arrow = styled(Image)`
  position: absolute;
  top: 50%;
  left: 0;
  z-index: 1;
  width: 59px;
  height: auto;
  margin-top: -20px;
  opacity: 0;
  transform: translate3d(${arrowRestXPx}px, 0, 0);
  transition:
    opacity ${hoverMs}ms ease,
    transform ${hoverMs}ms ease;

  ${media.down("desktop")} {
    width: 40px;
    margin-top: -11px;
    opacity: var(--project-arrow-o);
    transform: translate3d(var(--project-arrow-x), 0, 0);
    transition: none;
  }

  ${noMotionTransition}
`;

const Title = styled.h2`
  position: relative;
  z-index: 1;
  margin: 0;
  ${displayLg}
  color: var(--color-black);
  transform: translate3d(0, 0, 0);
  transition:
    color ${hoverMs}ms ease,
    transform ${hoverMs}ms ease;

  ${media.down("desktop")} {
    color: var(--project-fg);
    transform: translate3d(var(--project-title-x), 0, 0);
    transition: none;
  }

  ${noMotionTransition}
`;

const Category = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
  z-index: 1;
  display: flex;
  font-size: 20px;
  font-weight: 700;
  color: var(--color-black);
  transform: translate3d(0, 0, 0);
  transition:
    color ${hoverMs}ms ease,
    transform ${hoverMs}ms ease;

  ${media.down("desktop")} {
    top: 10px;
    left: 0;
    right: auto;
    color: var(--project-fg);
    transition: none;
  }

  ${media.down("tablet")} {
    top: 30px;
  }

  ${noMotionTransition}
`;

const Card = styled(Link)`
  --project-fg: var(--color-black);
  --project-title-x: 0px;
  --project-arrow-o: 0;
  --project-arrow-x: 0px;
  --project-img-o: 0;
  --project-img-x: 0px;
  --project-img-r: ${imageRotateFrom}deg;

  position: relative;
  display: inline-block;
  max-width: 100%;
  padding: 30px 50px 30px 0;
  color: inherit;
  text-decoration: none;

  ${media.up("desktop")} {
    &:hover,
    &:focus-visible {
      ${Title}, ${Category} {
        color: var(--color-white);
        transform: translate3d(${titleHoverXPx}px, 0, 0);
      }

      ${Arrow} {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }
    }
  }

  ${media.down("desktop")} {
    display: block;
    width: 100%;
    padding-right: 30px;
  }

  ${media.down("tablet")} {
    padding-top: 60px;
    padding-bottom: 50px;
  }
`;

export function ProjectCard({ project, onHighlightChange }: ProjectCardProps) {
  const { title, href, image, category } = project;
  const ref = useRef<HTMLAnchorElement>(null);
  const highlightRef = useRef(false);

  const onProgress = useCallback(
    (progress: number) => {
      const node = ref.current;
      if (!node || window.matchMedia(mq.desktop).matches) {
        return;
      }

      const rising = progress < scrollPeak;
      const titleX = rising
        ? interp(progress, scrollStart, 0, scrollPeak, titleScrollXPx)
        : interp(progress, scrollPeak, titleScrollXPx, scrollEnd, 0);
      const imgX = rising
        ? interp(progress, scrollStart, 0, scrollPeak, imageScrollXPx)
        : interp(progress, scrollPeak, imageScrollXPx, scrollEnd, 0);
      const imgO = rising
        ? interp(progress, scrollStart, 0, scrollPeak, 1)
        : interp(progress, scrollPeak, 1, scrollEnd, 0);
      const imgR = rising
        ? interp(progress, scrollStart, imageRotateFrom, scrollPeak, 0)
        : interp(progress, scrollPeak, 0, scrollEnd, imageRotateTo);
      const arrowX = rising
        ? interp(progress, scrollStart, 0, scrollPeak, arrowRestXPx)
        : interp(progress, scrollPeak, arrowRestXPx, scrollEnd, 0);
      const value = Math.round(
        rising
          ? interp(progress, scrollStart, 0, scrollPeak, 255)
          : interp(progress, scrollPeak, 255, scrollEnd, 0),
      );

      node.style.setProperty("--project-title-x", `${titleX}px`);
      node.style.setProperty("--project-img-x", `${imgX}px`);
      node.style.setProperty("--project-img-o", `${imgO}`);
      node.style.setProperty("--project-img-r", `${imgR}deg`);
      node.style.setProperty("--project-arrow-o", `${imgO}`);
      node.style.setProperty("--project-arrow-x", `${arrowX}px`);
      node.style.setProperty(
        "--project-fg",
        `rgb(${value}, ${value}, ${value})`,
      );

      const active = imgO > 0.5;
      if (active !== highlightRef.current) {
        highlightRef.current = active;
        onHighlightChange?.(active);
      }
    },
    [onHighlightChange],
  );

  useScrollProgress(ref, onProgress, {
    smoothing,
    disabledMq: mq.desktop,
  });

  const notifyDesktopHighlight = (active: boolean) => {
    if (!window.matchMedia(mq.desktop).matches) {
      return;
    }
    onHighlightChange?.(active);
  };

  return (
    <Card
      ref={ref}
      href={href}
      onMouseEnter={() => notifyDesktopHighlight(true)}
      onMouseLeave={() => notifyDesktopHighlight(false)}
      onFocus={() => notifyDesktopHighlight(true)}
      onBlur={() => notifyDesktopHighlight(false)}
    >
      <Preview
        src={image}
        alt=""
        width={640}
        height={400}
        sizes={`(max-width: ${breakpoints.desktop - 1}px) 80vw, 40vw`}
      />
      <Title>{title}</Title>
      <Arrow src="/img/icons/arrow-white.svg" alt="" width={59} height={39} />
      <Category>
        <span>(</span>
        <span>{category}</span>
        <span>)</span>
      </Category>
    </Card>
  );
}

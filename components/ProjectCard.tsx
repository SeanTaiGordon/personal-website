"use client";

import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import {
  breakpoints,
  displayLg,
  hexWithAlpha,
  linkReset,
  media,
  motion,
} from "@/lib";

export type Project = {
  title: string;
  href: string;
  image: string;
  hoverTint: string;
  category: string;
};

type ProjectCardProps = {
  project: Project;
};

const { previewMs, arrowMs, arrowRestXPx, backgroundMs } = motion.projectCard;

const Preview = styled(Image)`
  position: absolute;
  top: -15%;
  left: 0;
  z-index: 0;
  height: 130%;
  width: auto;
  max-width: none;
  opacity: 0;
  object-fit: contain;
  pointer-events: none;
  transition: opacity ${previewMs}ms ease;

  ${media.down("desktop")} {
    opacity: 0.15;
  }

  ${media.down("phone")} {
    top: 10%;
    height: 80%;
  }
`;

const Arrow = styled(Image)`
  position: absolute;
  top: 50%;
  left: 0;
  z-index: 1;
  opacity: 0;
  transform: translate(${arrowRestXPx}px, -50%);
  transition:
    opacity ${arrowMs}ms ease,
    transform ${arrowMs}ms ease;

  ${media.down("desktop")} {
    width: 40px;
    height: auto;
  }
`;

const Card = styled(Link)<{ $hoverTint: string }>`
  position: relative;
  display: block;
  overflow: hidden;
  padding: 30px 50px 30px 0;
  color: inherit;
  ${linkReset}
  transition: background-color ${backgroundMs}ms ease;

  &:hover,
  &:focus-visible {
    background-color: ${({ $hoverTint }) => hexWithAlpha($hoverTint, 0.2)};
  }

  &:hover ${Arrow}, &:focus-visible ${Arrow} {
    opacity: 1;
    transform: translate(0, -50%);
  }

  &:hover ${Preview}, &:focus-visible ${Preview} {
    opacity: 0.2;
  }

  ${media.down("desktop")} {
    width: 100%;
    padding-right: 30px;
  }

  ${media.down("tablet")} {
    padding-top: 60px;
    padding-bottom: 50px;
  }
`;

const Title = styled.h2`
  position: relative;
  z-index: 1;
  margin: 0;
  ${displayLg}
`;

const Category = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
  z-index: 1;
  font-size: 20px;
  font-weight: 700;

  ${media.down("desktop")} {
    top: 10px;
    left: 0;
    right: auto;
  }

  ${media.down("tablet")} {
    top: 30px;
  }
`;

export function ProjectCard({ project }: ProjectCardProps) {
  const { title, href, image, hoverTint, category } = project;

  return (
    <Card href={href} $hoverTint={hoverTint}>
      <Preview
        src={image}
        alt=""
        width={640}
        height={400}
        sizes={`(max-width: ${breakpoints.desktop - 1}px) 80vw, 40vw`}
      />
      <Title>{title}</Title>
      <Arrow src="/img/icons/arrow-right.svg" alt="" width={48} height={40} />
      <Category>({category})</Category>
    </Card>
  );
}

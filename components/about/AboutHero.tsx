"use client";

import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import { WipeHero } from "@/components/WipeHero";
import { aboutContent, media, motion, noMotionTransition } from "@/lib";

const { gifOpacityMs, gifScaleMs, gifScale, humanHoverMs } = motion.about;

const Gif = styled(Image)<{ $on: boolean }>`
  position: absolute;
  z-index: 0;
  left: 390px;
  top: -40%;
  width: 530px;
  height: 200%;
  max-width: 140%;
  object-fit: cover;
  pointer-events: none;
  opacity: ${({ $on }) => ($on ? 1 : 0)};
  transform: scale3d(
    ${({ $on }) => ($on ? 1 : gifScale)},
    ${({ $on }) => ($on ? 1 : gifScale)},
    1
  );
  transition:
    opacity ${gifOpacityMs}ms ease,
    transform ${gifScaleMs}ms ease;

  ${media.down("desktop")} {
    left: 210px;
  }

  ${media.down("tablet")} {
    left: 90px;
    top: -40%;
    width: 400px;
    height: 300px;
    max-width: 100%;
  }

  ${media.down("phone")} {
    left: 50px;
    top: -30%;
    width: 310px;
    height: 230px;
    max-width: 80%;
  }

  ${media.reduceMotion} {
    display: none;
    transition: none;
  }
`;

const Human = styled.span`
  text-decoration: underline;
  cursor: default;
  transition: opacity ${humanHoverMs}ms ease;

  &:hover,
  &:focus-visible {
    opacity: 0.4;
  }

  ${noMotionTransition}
`;

const Shrug = styled.span`
  white-space: nowrap;
`;

export function AboutHero() {
  const [gifOn, setGifOn] = useState(false);
  const { headingBefore, headingHuman, headingAfter, shrug, gif } =
    aboutContent;

  return (
    <WipeHero
      label="About"
      overlay={
        <Gif
          $on={gifOn}
          src={gif.src}
          alt=""
          width={gif.width}
          height={gif.height}
          unoptimized
          aria-hidden
        />
      }
    >
      {headingBefore}
      <Human
        tabIndex={0}
        onMouseEnter={() => setGifOn(true)}
        onMouseLeave={() => setGifOn(false)}
        onFocus={() => setGifOn(true)}
        onBlur={() => setGifOn(false)}
      >
        {headingHuman}
      </Human>
      {headingAfter}
      <br />
      <Shrug>{shrug}</Shrug>
    </WipeHero>
  );
}

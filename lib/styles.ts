import { css } from "styled-components";
import { media } from "@/lib/media";

export const linkReset = css`
  &:hover,
  &:focus-visible {
    text-decoration: none;
  }
`;

export const noMotionTransition = css`
  ${media.reduceMotion} {
    transition: none;
  }
`;

export const twoCol = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px 30px;
  align-items: start;

  ${media.down("desktop")} {
    grid-template-columns: 1fr;
  }
`;

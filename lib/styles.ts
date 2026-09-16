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

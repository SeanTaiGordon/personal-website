import { css } from "styled-components";
import { media } from "@/lib/media";

export const displayHero = css`
  font-size: 350px;
  font-weight: 500;
  line-height: 1;

  ${media.down("desktop")} {
    font-size: 290px;
  }

  ${media.down("tablet")} {
    font-size: 140px;
  }

  ${media.down("phone")} {
    font-size: 120px;
  }
`;

export const displayXl = css`
  font-size: 140px;
  font-weight: 600;
  line-height: 1.2;

  ${media.down("desktop")} {
    font-size: 100px;
  }

  ${media.down("tablet")} {
    font-size: 60px;
  }

  ${media.down("phone")} {
    font-size: 44px;
  }
`;

export const displayLg = css`
  font-size: 80px;
  font-weight: 600;
  line-height: 1.2;

  ${media.down("tablet")} {
    font-size: 50px;
  }

  ${media.down("phone")} {
    font-size: 40px;
  }
`;

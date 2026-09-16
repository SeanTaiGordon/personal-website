"use client";

import type { ReactNode } from "react";
import styled from "styled-components";
import { media } from "@/lib";

const Root = styled.footer`
  margin-top: auto;
  padding: 130px 0 0;
  text-align: center;

  ${media.down("desktop")} {
    padding-top: 100px;
  }

  ${media.down("tablet")} {
    padding-top: 80px;
  }

  ${media.down("phone")} {
    padding-top: 40px;
    text-align: left;
  }
`;

type FooterShellProps = {
  children: ReactNode;
};

/** Client shell so the Footer server component can keep styled-components. */
export function FooterShell({ children }: FooterShellProps) {
  return <Root>{children}</Root>;
}

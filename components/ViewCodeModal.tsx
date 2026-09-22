"use client";

import styled from "styled-components";
import { FadeIn } from "@/components/FadeIn";
import { useScrollDismiss } from "@/hooks";
import { github, linkReset, motion, noMotionTransition } from "@/lib";

const {
  opacityMs,
  moveMs,
  delayMs,
  hideMs,
  offsetYPx,
  hideAfterYPx,
  showBelowYPx,
} = motion.viewCodeModal;

const fadeIn = { opacityMs, moveMs, delayMs } as const;

const Dock = styled.div<{ $dismissed: boolean }>`
  position: fixed;
  z-index: 9;
  right: var(--page-gutter);
  left: var(--page-gutter);
  bottom: max(var(--page-gutter), env(safe-area-inset-bottom, 0px));
  display: flex;
  justify-content: center;
  pointer-events: none;
  opacity: ${({ $dismissed }) => ($dismissed ? 0 : 1)};
  visibility: ${({ $dismissed }) => ($dismissed ? "hidden" : "visible")};
  transform: translate3d(
    0,
    ${({ $dismissed }) => ($dismissed ? `${offsetYPx}px` : "0")},
    0
  );
  transition:
    opacity ${hideMs}ms ease,
    transform ${hideMs}ms ease,
    visibility 0s linear
      ${({ $dismissed }) => ($dismissed ? `${hideMs}ms` : "0s")};

  ${noMotionTransition}
`;

const Card = styled.a<{ $dismissed: boolean }>`
  pointer-events: ${({ $dismissed }) => ($dismissed ? "none" : "auto")};
  display: inline-flex;
  align-items: center;
  gap: 8px;
  max-width: 100%;
  padding: 10px 14px;
  border: 1px solid var(--page-fg-20);
  border-radius: 999px;
  background-color: var(--page-bg);
  color: var(--page-fg);
  font-size: 14px;
  font-weight: 500;
  line-height: 1.2;
  box-shadow: 0 10px 28px var(--page-fg-20);
  ${linkReset}
  transition:
    background-color var(--page-bg-duration) ease,
    color var(--page-bg-duration) ease,
    border-color var(--page-bg-duration) ease,
    box-shadow var(--page-bg-duration) ease;

  &:hover,
  &:focus-visible {
    background-color: var(--page-fg);
    color: var(--page-bg);
    border-color: var(--page-fg);
  }

  &:focus-visible {
    outline: 2px solid var(--page-fg);
    outline-offset: 3px;
  }

  ${noMotionTransition}
`;

const Mark = styled.svg`
  flex: 0 0 auto;
  display: block;
  width: 16px;
  height: 16px;
`;

function GithubMark() {
  return (
    <Mark viewBox="0 0 16 16" aria-hidden>
      <path
        fill="currentColor"
        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"
      />
    </Mark>
  );
}

export function ViewCodeModal() {
  const dismissed = useScrollDismiss({ hideAfterYPx, showBelowYPx });

  return (
    <Dock $dismissed={dismissed} aria-hidden={dismissed} inert={dismissed}>
      <FadeIn offsetYPx={offsetYPx} transition={fadeIn}>
        <Card
          href={github.href}
          target="_blank"
          rel="noopener noreferrer"
          $dismissed={dismissed}
          tabIndex={dismissed ? -1 : undefined}
        >
          <GithubMark />
          {github.label}
        </Card>
      </FadeIn>
    </Dock>
  );
}

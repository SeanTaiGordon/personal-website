"use client";

import Link from "next/link";
import {
  useState,
  type FocusEvent,
  type FocusEventHandler,
  type MouseEvent,
  type MouseEventHandler,
  type ReactNode,
  type TransitionEvent,
} from "react";
import styled, { css } from "styled-components";
import { linkReset, media, motion, noMotionTransition } from "@/lib";

type WipePhase = "rest" | "in" | "out";

const { durationMs, thinHeightPx, thickHeightPx } = motion.wipe;

const thickHeights = `
  height: ${thickHeightPx.base}px;

  ${media.down("desktop")} {
    height: ${thickHeightPx.desktopDown}px;
  }

  ${media.down("tablet")} {
    height: ${thickHeightPx.tablet}px;
  }

  ${media.down("phone")} {
    height: ${thickHeightPx.phone}px;
  }
`;

const PlaceholderTrack = styled.span`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--color-black-20);
  pointer-events: none;
  ${thickHeights}
`;

const Underline = styled.span<{ $phase: WipePhase; $thick?: boolean }>`
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 1;
  width: 100%;
  height: ${({ $thick }) => ($thick ? `${thickHeightPx.base}px` : `${thinHeightPx}px`)};
  background-color: var(--color-black);
  transform: translate3d(
    ${({ $phase }) => {
      if ($phase === "in") return "0";
      if ($phase === "out") return "100%";
      return "-100%";
    }},
    0,
    0
  );
  transition: ${({ $phase }) =>
    $phase === "rest" ? "none" : `transform ${durationMs}ms ease`};
  pointer-events: none;

  ${({ $thick }) => ($thick ? thickHeights : "")}

  ${noMotionTransition}
`;

const linkStyles = css`
  position: relative;
  display: inline-block;
  overflow: hidden;
  padding-bottom: 5px;
  color: var(--color-black);
  ${linkReset}
`;

const Anchor = styled.a`
  ${linkStyles}
`;

const InternalLink = styled(Link)`
  ${linkStyles}
`;

function useWipePhase() {
  const [phase, setPhase] = useState<WipePhase>("rest");

  const onEnter = () => {
    setPhase("in");
  };

  const onLeave = () => {
    setPhase((current) => (current === "in" ? "out" : current));
  };

  const onUnderlineTransitionEnd = (
    event: TransitionEvent<HTMLSpanElement>,
  ) => {
    if (event.propertyName !== "transform") {
      return;
    }
    setPhase((current) => (current === "out" ? "rest" : current));
  };

  return { phase, onEnter, onLeave, onUnderlineTransitionEnd };
}

function WipeBars({
  phase,
  thick,
  placeholderTrack,
  onTransitionEnd,
}: {
  phase: WipePhase;
  thick: boolean;
  placeholderTrack: boolean;
  onTransitionEnd: (event: TransitionEvent<HTMLSpanElement>) => void;
}) {
  return (
    <>
      {placeholderTrack ? <PlaceholderTrack aria-hidden /> : null}
      <Underline
        $phase={phase}
        $thick={thick}
        onTransitionEnd={onTransitionEnd}
        aria-hidden
      />
    </>
  );
}

function isInternalHref(href: string) {
  return href.startsWith("/") && !href.startsWith("//");
}

type WipeUnderlineProps = {
  href: string;
  children: ReactNode;
  className?: string;
  thick?: boolean;
  placeholderTrack?: boolean;
  target?: string;
  rel?: string;
  onMouseEnter?: MouseEventHandler<HTMLAnchorElement>;
  onMouseLeave?: MouseEventHandler<HTMLAnchorElement>;
  onFocus?: FocusEventHandler<HTMLAnchorElement>;
  onBlur?: FocusEventHandler<HTMLAnchorElement>;
};

export function WipeUnderline({
  href,
  children,
  className,
  thick = false,
  placeholderTrack = false,
  target,
  rel,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
}: WipeUnderlineProps) {
  const { phase, onEnter, onLeave, onUnderlineTransitionEnd } = useWipePhase();

  const handleMouseEnter = (event: MouseEvent<HTMLAnchorElement>) => {
    onEnter();
    onMouseEnter?.(event);
  };

  const handleMouseLeave = (event: MouseEvent<HTMLAnchorElement>) => {
    onLeave();
    onMouseLeave?.(event);
  };

  const handleFocus = (event: FocusEvent<HTMLAnchorElement>) => {
    onEnter();
    onFocus?.(event);
  };

  const handleBlur = (event: FocusEvent<HTMLAnchorElement>) => {
    onLeave();
    onBlur?.(event);
  };

  const bars = (
    <WipeBars
      phase={phase}
      thick={thick}
      placeholderTrack={placeholderTrack}
      onTransitionEnd={onUnderlineTransitionEnd}
    />
  );

  if (isInternalHref(href)) {
    return (
      <InternalLink
        href={href}
        className={className}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        {children}
        {bars}
      </InternalLink>
    );
  }

  return (
    <Anchor
      href={href}
      className={className}
      target={target}
      rel={rel}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {children}
      {bars}
    </Anchor>
  );
}

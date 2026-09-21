"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Container } from "@/components/Container";
import { FadeIn } from "@/components/FadeIn";
import { useScrollProgress } from "@/hooks";
import {
  copyLg,
  displayHero,
  homeIntro,
  interp,
  media,
  motion,
  noMotionTransition,
} from "@/lib";

const {
  helloOpacityMs,
  helloMoveMs,
  helloFromY,
  enterDelayMs,
  enterMs,
  nameFromY,
  pictureFromX,
  scrollStart,
  helloFromXVw,
  helloToXVw,
  nameFromXVw,
  nameToXVw,
  smoothing,
} = motion.hero;

const { inOutQuart } = motion.ease;

const Section = styled.section`
  position: relative;
  overflow: hidden;
`;

const HelloScroll = styled.div`
  will-change: transform;
`;

const Hello = styled.p<{ $loaded: boolean }>`
  position: relative;
  top: 80px;
  margin: 20px 0 10px;
  overflow: hidden;
  ${displayHero}
  opacity: ${({ $loaded }) => ($loaded ? 1 : 0)};
  transform: translate3d(
    0,
    ${({ $loaded }) => ($loaded ? "0" : helloFromY)},
    0
  );
  transition:
    opacity ${helloOpacityMs}ms ease,
    transform ${helloMoveMs}ms ease;

  ${media.down("tablet")} {
    top: 0;
    margin-top: 0;
  }

  ${noMotionTransition}
`;

const Stage = styled.div`
  position: relative;

  ${media.down("tablet")} {
    top: -50px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(8, minmax(0, 1fr));
  column-gap: 30px;
  row-gap: 30px;

  ${media.down("tablet")} {
    grid-template-columns: 1fr 5fr 1fr;
    column-gap: 10px;
  }

  ${media.down("phone")} {
    grid-template-columns: 1fr 7fr 1fr;
  }
`;

const TitleBlock = styled.div`
  position: relative;
  grid-column: 2 / 6;

  ${media.down("desktop")} {
    grid-column-end: 7;
  }

  ${media.down("tablet")} {
    grid-column-end: 3;
  }

  ${media.down("phone")} {
    grid-column: 1 / 3;
  }
`;

const NameTrack = styled.div`
  position: absolute;
  left: 0;
  top: 10vh;
  width: 200vw;
  pointer-events: none;
  will-change: transform;
`;

const NameBehind = styled(NameTrack)`
  z-index: 1;
`;

const NameOnPhoto = styled(NameTrack)`
  z-index: 2;
`;

const Name = styled.h1<{ $loaded: boolean; $white?: boolean }>`
  margin: 20px 0 10px;
  overflow: hidden;
  ${displayHero}
  white-space: nowrap;
  color: ${({ $white }) =>
    $white ? "var(--color-white)" : "var(--color-black)"};
  opacity: ${({ $loaded }) => ($loaded ? 1 : 0)};
  transform: translate3d(0, ${({ $loaded }) => ($loaded ? "0" : nameFromY)}, 0);
  transition:
    opacity ${enterMs}ms ${inOutQuart} ${enterDelayMs}ms,
    transform ${enterMs}ms ${inOutQuart} ${enterDelayMs}ms;

  ${media.down("tablet")} {
    margin-top: 0;
  }

  ${noMotionTransition}
`;

const Photo = styled.div`
  position: relative;
  z-index: 2;
  overflow: hidden;
  width: 100%;
  background-color: var(--color-background-light);
`;

const Portrait = styled(Image)<{ $loaded: boolean }>`
  display: block;
  width: 100%;
  height: auto;
  opacity: ${({ $loaded }) => ($loaded ? 1 : 0)};
  transform: translate3d(
    ${({ $loaded }) => ($loaded ? "0" : pictureFromX)},
    0,
    0
  );
  transition:
    opacity ${enterMs}ms ${inOutQuart} ${enterDelayMs}ms,
    transform ${enterMs}ms ${inOutQuart} ${enterDelayMs}ms;

  ${noMotionTransition}
`;

const DescBlock = styled.div`
  z-index: 3;
  grid-column: 6 / 9;
  align-self: end;

  ${media.down("desktop")} {
    grid-column: 1 / -1;
  }
`;

const Description = styled.p`
  margin: 10px 0;
  ${copyLg}
`;

export function Hero() {
  const { hello, name, portrait, description } = homeIntro;
  const sectionRef = useRef<HTMLElement>(null);
  const helloScrollRef = useRef<HTMLDivElement>(null);
  const nameScrollRef = useRef<HTMLDivElement>(null);
  const nameOnPhotoRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let frame2 = 0;
    const frame1 = requestAnimationFrame(() => {
      frame2 = requestAnimationFrame(() => setLoaded(true));
    });
    return () => {
      cancelAnimationFrame(frame1);
      cancelAnimationFrame(frame2);
    };
  }, []);

  const onProgress = useCallback((progress: number) => {
    const helloX = interp(progress, scrollStart, helloFromXVw, 1, helloToXVw);
    const nameX = interp(progress, scrollStart, nameFromXVw, 1, nameToXVw);
    const helloNode = helloScrollRef.current;
    const nameNode = nameScrollRef.current;
    const photoNameNode = nameOnPhotoRef.current;
    if (helloNode) {
      helloNode.style.transform = `translate3d(${helloX}vw, 0, 0)`;
    }
    const nameTransform = `translate3d(${nameX}vw, 0, 0)`;
    if (nameNode) nameNode.style.transform = nameTransform;
    if (photoNameNode) photoNameNode.style.transform = nameTransform;
  }, []);

  useScrollProgress(sectionRef, onProgress, { smoothing });

  return (
    <Section ref={sectionRef}>
      <Container>
        <HelloScroll ref={helloScrollRef}>
          <Hello $loaded={loaded}>{hello}</Hello>
        </HelloScroll>

        <Stage>
          <Grid>
            <TitleBlock>
              <NameBehind ref={nameScrollRef}>
                <Name $loaded={loaded}>{name}</Name>
              </NameBehind>

              <Photo>
                <Portrait
                  $loaded={loaded}
                  src={portrait.src}
                  alt={portrait.alt}
                  width={1000}
                  height={1279}
                  priority
                  sizes="(max-width: 991px) 96vw, 50vw"
                />
                <NameOnPhoto ref={nameOnPhotoRef} aria-hidden>
                  <Name $loaded={loaded} $white as="p">
                    {name}
                  </Name>
                </NameOnPhoto>
              </Photo>
            </TitleBlock>

            <DescBlock>
              <FadeIn>
                <Description>{description}</Description>
              </FadeIn>
            </DescBlock>
          </Grid>
        </Stage>
      </Container>
    </Section>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import styled from "styled-components";
import { Container } from "@/components/Container";
import { useMobileMenuFocusTrap, useNavScrollHide } from "@/hooks";
import {
  linkReset,
  media,
  motion,
  mq,
  noMotionTransition,
  primaryNav,
} from "@/lib";

const {
  hideMs,
  menuMs,
  linkReturnMs,
  textHoverMs,
  arrowFadeMs,
  arrowSlideMs,
  arrowRestXPx,
  textHoverXPx,
} = motion.nav;

const Header = styled.header<{ $hidden: boolean }>`
  position: fixed;
  inset: 0 0 auto;
  z-index: 10;
  padding: var(--header-padding-y) 0;
  background-color: transparent;
  /* Slide out of view when scrolling down. */
  transform: translate3d(0, ${({ $hidden }) => ($hidden ? "-100%" : "0")}, 0);
  transition: transform ${hideMs}ms ease;

  ${noMotionTransition}
`;

const NavBackground = styled.div`
  position: absolute;
  inset: 0;
  z-index: -1;
  background-image: linear-gradient(
    180deg,
    #fff,
    hsla(0, 0%, 100%, 0.88) 21%,
    hsla(0, 0%, 100%, 0) 91%
  );
`;

const NavBar = styled(Container)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 0;
  padding-bottom: 0;
`;

const Brand = styled(Link)`
  position: relative;
  z-index: 2;
  display: block;
  overflow: hidden;
  width: var(--header-brand-size);
  height: var(--header-brand-size);
  padding: 0;
  border: 3px solid var(--color-black);
  border-radius: var(--header-brand-size);
  ${linkReset}
`;

const BrandImage = styled(Image)`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Menu = styled.nav<{ $open: boolean }>`
  z-index: 1;
  display: flex;
  align-items: center;
  padding: 6px 0;

  ${media.down("desktop")} {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 110px var(--page-gutter) var(--page-gutter);
    border-bottom: 2px solid var(--color-black);
    background-color: var(--color-white);
    /* Slide the mobile overlay in from above. */
    transform: translate3d(0, ${({ $open }) => ($open ? "0" : "-100%")}, 0);
    visibility: ${({ $open }) => ($open ? "visible" : "hidden")};
    pointer-events: ${({ $open }) => ($open ? "auto" : "none")};
    transition:
      transform ${menuMs}ms ease,
      visibility ${menuMs}ms ease;

    ${noMotionTransition}
  }
`;

const NavLinkText = styled.span`
  display: inline-block;
  /* Return to rest after hover. */
  transition: transform ${linkReturnMs}ms ease;

  ${noMotionTransition}
`;

const NavArrow = styled(Image)`
  position: absolute;
  top: 50%;
  right: 0;
  bottom: auto;
  left: auto;
  width: 29px;
  height: 16px;
  margin-top: -8px;
  opacity: 0;
  pointer-events: none;
  /* Parked off to the left until hover. */
  transform: translate3d(${arrowRestXPx}px, 0, 0);
  transition:
    opacity ${arrowFadeMs}ms ease,
    transform ${arrowFadeMs}ms ease;

  ${media.down("desktop")} {
    display: none;
  }

  ${noMotionTransition}
`;

const NavLink = styled(Link)`
  position: relative;
  display: inline-block;
  margin-left: 40px;
  padding: 10px 20px;
  color: var(--color-black);
  ${linkReset}

  /* Desktop: text shifts left, arrow slides in. */
  ${media.up("desktop")} {
    &:hover ${NavLinkText}, &:focus-visible ${NavLinkText} {
      transform: translate3d(${textHoverXPx}px, 0, 0);
      transition-duration: ${textHoverMs}ms;
    }

    &:hover ${NavArrow}, &:focus-visible ${NavArrow} {
      opacity: 1;
      transform: translate3d(0, 0, 0);
      transition-duration: ${arrowSlideMs}ms;
    }
  }

  ${media.down("desktop")} {
    margin: 0 0 12px;
    padding: 12px 0;
    font-size: 28px;
    font-weight: 700;
  }
`;

const MenuButton = styled.button`
  position: relative;
  z-index: 2;
  display: none;
  padding: 15px;
  border: 0;
  border-radius: 5px;
  background: transparent;
  cursor: pointer;
  line-height: 1;

  ${media.down("desktop")} {
    display: block;
  }

  &:focus-visible {
    outline: 2px solid var(--color-black);
    outline-offset: 2px;
  }
`;

export function Nav() {
  const pathname = usePathname();
  const menuId = useId();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const hidden = useNavScrollHide(!open);

  useMobileMenuFocusTrap({
    open,
    menuRef,
    menuButtonRef,
    onClose: () => setOpen(false),
  });

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const desktopMq = window.matchMedia(mq.desktop);
    const closeOnDesktop = () => {
      if (desktopMq.matches) setOpen(false);
    };

    closeOnDesktop();
    desktopMq.addEventListener("change", closeOnDesktop);
    return () => desktopMq.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <Header $hidden={hidden}>
      <NavBar>
        <Brand href="/" aria-label="Home">
          <BrandImage
            src="/img/portraits/sean-small.jpeg"
            alt=""
            width={60}
            height={60}
            priority
          />
        </Brand>

        <Menu ref={menuRef} id={menuId} aria-label="Primary" $open={open}>
          {primaryNav.map(({ href, label }) => (
            <NavLink
              key={href}
              href={href}
              aria-current={pathname === href ? "page" : undefined}
            >
              <NavLinkText>{label}</NavLinkText>
              <NavArrow
                src="/img/icons/nav-arrow-black.svg"
                alt=""
                width={29}
                height={16}
              />
            </NavLink>
          ))}
        </Menu>

        <MenuButton
          ref={menuButtonRef}
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((value) => !value)}
        >
          <Image
            src={
              open ? "/img/icons/close-black.svg" : "/img/icons/menu-black.svg"
            }
            alt=""
            width={22}
            height={open ? 22 : 14}
          />
        </MenuButton>
      </NavBar>
      <NavBackground />
    </Header>
  );
}

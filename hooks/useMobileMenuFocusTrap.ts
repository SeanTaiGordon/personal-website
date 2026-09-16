"use client";

import { useEffect, useRef, type RefObject } from "react";

function menuLinks(menu: HTMLElement | null) {
  if (!menu) return [];
  return Array.from(menu.querySelectorAll<HTMLElement>("a[href]"));
}

/** Tab cycles mobile menu - links then buttons. */
function focusableInOpenMenu(
  menu: HTMLElement | null,
  button: HTMLButtonElement | null,
) {
  const links = menuLinks(menu);
  return button ? [...links, button] : links;
}

function trapTab(event: KeyboardEvent, focusable: HTMLElement[]) {
  if (event.key !== "Tab" || focusable.length === 0) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  const active = document.activeElement;

  if (event.shiftKey && active === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && active === last) {
    event.preventDefault();
    first.focus();
  }
}

type MobileMenuFocusTrapArgs = {
  open: boolean;
  menuRef: RefObject<HTMLElement | null>;
  menuButtonRef: RefObject<HTMLButtonElement | null>;
  onClose: () => void;
};

/** Focus first link on open; Escape closes; Tab stays inside the menu. */
export function useMobileMenuFocusTrap({
  open,
  menuRef,
  menuButtonRef,
  onClose,
}: MobileMenuFocusTrapArgs) {
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return undefined;

    const menu = menuRef.current;
    const button = menuButtonRef.current;
    menuLinks(menu)[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        button?.focus();
        return;
      }

      trapTab(event, focusableInOpenMenu(menu, button));
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, menuRef, menuButtonRef]);
}

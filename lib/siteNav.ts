export type SiteLink = {
  href: string;
  label: string;
};

/** Primary header navigation. */
export const primaryNav = [
  { href: "/cv", label: "CV" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const satisfies readonly SiteLink[];

/** Secondary links in the footer. */
export const footerNav = [
  { href: "/about", label: "About Me" },
  { href: "/contact", label: "Contact" },
] as const satisfies readonly SiteLink[];

export const footerContacts = {
  linkedIn: {
    href: "https://www.linkedin.com/in/seantg",
    label: "LinkedIn",
  },
  email: {
    href: "mailto:sean@seangordon.co.uk?subject=Hello",
    label: "sean@seangordon.co.uk",
  },
} as const satisfies Record<string, SiteLink>;

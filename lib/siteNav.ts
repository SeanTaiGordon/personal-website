export type SiteLink = {
  href: string;
  label: string;
};

export const contactEmail = "sean@seangordon.co.uk";

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
    href: `mailto:${contactEmail}?subject=Hello`,
    label: contactEmail,
  },
} as const satisfies Record<string, SiteLink>;

/** Source repository for the site. */
export const github = {
  href: "https://github.com/SeanTaiGordon/personal-website",
  label: "View code on GitHub",
} as const satisfies SiteLink;

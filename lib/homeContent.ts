export const homeIntro = {
  hello: "Hello",
  name: "I'm Sean",
  portrait: {
    src: "/img/portraits/sean.jpg",
    alt: "Sean Gordon",
  },
  description:
    "I'm a Founder & xGoogler living in London, focused on curating instinctive UX/UI experiences for millions of users.",
  summary:
    "I'm a Founder at Ad Scope, am based in London, specialising in Digital Marketing.",
  quote: "People ignore design that ignores people",
} as const;

export type TimelineEntry = {
  period: string;
  detail: string;
  org: string;
  href: string;
};

export const education = [
  {
    period: "2020",
    detail: "MSc AI",
    org: "St Andrews",
    href: "https://www.st-andrews.ac.uk",
  },
  {
    period: "2017",
    detail: "BSc (Hons) Comp Sci",
    org: "St Andrews",
    href: "https://www.st-andrews.ac.uk",
  },
] as const satisfies readonly TimelineEntry[];

export const experiences = [
  {
    period: "Current",
    detail: "Founder & CTO",
    org: "Ad Scope",
    href: "https://www.ad-scope.com",
  },
  {
    period: "3y 8m",
    detail: "Solutions Engineer",
    org: "Google",
    href: "https://www.google.com",
  },
  {
    period: "1y 2m",
    detail: "Software Engineer I",
    org: "Checkout.com",
    href: "https://www.checkout.com",
  },
  {
    period: "4mo",
    detail: "Software Engineering Intern",
    org: "BT",
    href: "https://www.bt.com",
  },
  {
    period: "3mo",
    detail: "Product Engineering Intern",
    org: "Amicable Apps",
    href: "https://www.amicable.io",
  },
  {
    period: "2mo",
    detail: "Front End Engineering Intern",
    org: "GroupM",
    href: "https://www.groupm.com",
  },
] as const satisfies readonly TimelineEntry[];

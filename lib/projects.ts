export type Project = {
  title: string;
  href: string;
  image: string;
  hoverTint: string;
  category: string;
};

export const projects = [
  {
    title: "Google",
    href: "/cv#google",
    image: "/img/projects/google.jpg",
    hoverTint: "#ff7675",
    category: "SE",
  },
  {
    title: "Checkout.com",
    href: "/cv#checkout",
    image: "/img/projects/checkout.jpg",
    hoverTint: "#b0bbbd",
    category: "SWE",
  },
  {
    title: "BT",
    href: "/cv#bt",
    image: "/img/projects/bt.jpg",
    hoverTint: "#e4e4ef",
    category: "SWE",
  },
  {
    title: "Amicable Apps",
    href: "/cv#amicable",
    image: "/img/projects/amicable.jpg",
    hoverTint: "#b0bbbd",
    category: "SWE",
  },
  {
    title: "GroupM",
    href: "/cv#groupm",
    image: "/img/projects/groupm.jpg",
    hoverTint: "#5B5B5B",
    category: "FE",
  },
  {
    title: "Eataro",
    href: "/cv#eataro",
    image: "/img/projects/eataro.jpg",
    hoverTint: "#c0bab4",
    category: "SWE",
  },
] as const satisfies readonly Project[];

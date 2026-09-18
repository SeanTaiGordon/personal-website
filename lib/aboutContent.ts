export const aboutContent = {
  headingBefore: "Just a ",
  headingHuman: "human",
  headingAfter: " who adores front-end.",
  shrug: "¯\\_(ツ)_/¯",
  gif: {
    src: "/img/decorative/human.gif",
    width: 360,
    height: 225,
  },
  bio: [
    "Over the last 6 years, I've been busy writing software for Google, a tech unicorn and I've also developed an AI chatbot for a startup.",
    "My favorite frameworks are React & React Native though I've worked on projects requiring pure JS, TS, CSS, Java and others as well.",
  ],
  skillsHeading: "I know a thing or two on how to engineer",
  skills: [
    {
      n: "01",
      title: "Products",
      body: "I've developed products through their whole lifecycle, from discovery, conceptualisation, wireframes, mockups through to accessibility design, implementation and after-sales support.",
    },
    {
      n: "02",
      title: "Mobile Apps",
      body: "I've developed mobile apps in React Native with components in Swift and Java. Designing intuitive interactions, designing mockups and then producing pixel-perfect implementations is my bread and butter.",
    },
    {
      n: "03",
      title: "Web Apps",
      body: "From whole systems built in React to a chatbot component implemented in JavaScript, I'm experienced in web app design from implementation of login systems to SEO and precise management of loading times, ensuring swift and useful experiences as soon as possible.",
    },
  ],
  galleryCaption: "Here is a selection of my front-end projects.",
  galleryMouse: {
    grid: { x: [5, -5], y: [10, -10] },
    caption: { xVw: [6, -6], yVh: [5, -6] },
    skew: { x: [-2, 2], y: [2, -2] },
  },
  gallery: [
    {
      src: "/img/about/01.jpg",
      width: 800,
      height: 450,
      offset: "one",
      mouse: { x: [20, -10], y: [20, -10], skew: true },
    },
    {
      src: "/img/about/02.jpg",
      width: 500,
      height: 356,
      offset: "two",
      mouse: { x: [10, -10], y: [10, -10] },
    },
    {
      src: "/img/about/03.jpg",
      width: 369,
      height: 800,
      offset: "three",
      mouse: { x: [5, -5], y: [5, -5] },
    },
    {
      src: "/img/about/04.jpg",
      width: 798,
      height: 500,
      offset: "four",
      mouse: { x: [5, -25], y: [5, -5] },
    },
    {
      src: "/img/about/05.jpg",
      width: 500,
      height: 356,
      offset: "five",
      mouse: { x: [15, -10], y: [5, -20] },
    },
    {
      src: "/img/about/06.jpg",
      width: 500,
      height: 281,
      offset: "six",
      mouse: { x: [20, -15], y: [20, -15] },
    },
    {
      src: "/img/about/07.jpg",
      width: 416,
      height: 900,
      offset: "seven",
      mouse: { x: [8, -20], y: [25, -5] },
    },
    {
      src: "/img/about/08.jpg",
      width: 500,
      height: 281,
      offset: "eight",
      mouse: { x: [10, -10], y: [10, -10] },
    },
    {
      src: "/img/about/09.jpg",
      width: 450,
      height: 975,
      offset: "nine",
      mouse: { x: [5, -5], y: [5, -5] },
    },
    {
      src: "/img/about/10.jpg",
      width: 500,
      height: 315,
      offset: "ten",
      mouse: { x: [20, -30], y: [20, -30] },
    },
  ],
  mobile: [
    { src: "/img/about/mobile-1.png", width: 586, height: 1530 },
    { src: "/img/about/mobile-2.png", width: 586, height: 1266 },
  ],
} as const;

export type AboutGalleryOffset =
  (typeof aboutContent.gallery)[number]["offset"];

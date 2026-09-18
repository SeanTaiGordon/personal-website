export const cvContent = {
  heading: "My CV.",
  skillsHeading: "My Skills",
  experienceHeading: "My Experience",
  personalHeading: "Personal Project",
  educationHeading: "My Education",
  skillRows: [
    [
      { name: "React", years: "(6 years)", span: 1 },
      { name: "React Native", years: "(6 years)", span: 2 },
      { name: "HTML", years: "(10 years)", span: 1 },
    ],
    [
      { name: "JavaScript", years: "(9 years)", span: 2 },
      { name: "CSS", years: "(9 years)", span: 1 },
      { name: "Git", years: "(10 years)", span: 1 },
    ],
    [
      { name: "Responsive Design", years: "(5 years)", span: 3 },
      { name: "Node.js", years: "(9 years)", span: 1 },
    ],
    [
      { name: "SASS", years: "(6 years)", span: 1 },
      { name: "Wiz JS", years: "(3 years)", span: 2 },
      { name: "CI/CD", years: "(10 years)", span: 1 },
    ],
  ],
  experience: [
    {
      id: "google",
      title: "Google",
      period: "3.7 years",
      body: ["Keep your eyes peeled. Cool stuff is in the making!"],
    },
    {
      id: "checkout",
      title: "Checkout.com",
      period: "1.2 years",
      body: [
        "Developed both external and internal facing websites for critical merchant onboarding systems.",
        "Led features resulting in a significant reduction for time-to-revenue.",
      ],
    },
    {
      id: "bt",
      title: "BT",
      period: "Summer 2019",
      body: [
        "Developed a React front-end on AWS to monitor, manage and configure the network and its traffic in real time.",
        "Presented the project in front of 25 managers, securing extension to project funding for 2 years.",
        "Led stand-ups, code reviews and design reviews.",
        "Developed software to run on network plane devices via proprietary programming language.",
      ],
    },
    {
      id: "amicable",
      title: "Amicable",
      period: "Summer 2018",
      body: [
        "Developed a deep-learning AI chatbot with a JavaScript frontend, replacing a system that cost over £11k per year.",
        "Reduced 90% cloud costs with scalability up to 1,000 conversations per day at no cost via careful resource usage management on cloud providers.",
        "Accelerated development of new website by 20% throughmanaging the remote team in Poland.",
      ],
    },
    {
      id: "groupm",
      title: "GroupM",
      period: "Summer 2015",
      body: [
        "Developed the front-end for a digital learning platform, sold for £50k to an international bank.",
        "I was hired after completing development on eLearning platform 2 weeks prior to deadline during prior work placement.",
        "Corresponded with content team and design team in order to successfully implement the front-end using CSS & HTML knowledge meeting cross-browser and accessibility requirements.",
      ],
    },
  ],
  personal: [
    {
      id: "eataro",
      title: "Eataro",
      period: "2020-2021",
      body: [
        "Developed a mobile application using React Native with portions of the Material UI component library.",
        "Developed web services using NodeJS, React with a MySQL database in order to create a platform for restaurants and university students to interconnect on a shared platform.",
      ],
    },
  ],
  education: [
    {
      title: "MSc AI",
      period: "2020",
      body: [
        "University of St Andrews, UK.",
        "Distinction.",
        "Modules included User Centred Design and Critical Systems Engineering.",
      ],
    },
    {
      title: "BSc CS",
      period: "2017",
      body: [
        "University of St Andrews, UK.",
        "Awards: Dean's List, St Salvator's Academic Fund",
        "Modules included Web Programming, Advanced Programming Projects and Human Computer Interaction.",
      ],
    },
  ],
} as const;

export type CvSkill = (typeof cvContent.skillRows)[number][number];
export type CvEntry =
  | (typeof cvContent.experience)[number]
  | (typeof cvContent.personal)[number]
  | (typeof cvContent.education)[number];

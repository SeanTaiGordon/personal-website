import type { Metadata } from "next";
import { homeIntro } from "@/lib/homeContent";
import { contactEmail, footerContacts } from "@/lib/siteNav";

const siteUrl = "https://seangordon.co.uk";

export const site = {
  siteName: "Sean Gordon",
  url: siteUrl,
  titleDefault: "Sean Gordon — Founder at Ad Scope, formerly Google",
  descriptionDefault:
    "Sean Gordon is a Founder at Ad Scope, formerly Google, University of St Andrews. Full stack in London focused on AI and instinctive UX/UI.",
  portraitUrl: `${siteUrl}${homeIntro.portrait.src}`,
  linkedIn: footerContacts.linkedIn.href,
  email: contactEmail,
  location: "London, UK",
  jobTitle: "Founder & CTO",
  worksFor: {
    name: "Ad Scope",
    url: "https://www.ad-scope.com",
  },
  alumniOf: {
    name: "University of St Andrews",
    url: "https://www.st-andrews.ac.uk",
  },
  knowsAbout: ["AI", "TypeScript", "UX/UI"],
} as const;

export const pageDescriptions = {
  home: site.descriptionDefault,
  about:
    "About Sean Gordon - Founder at Ad Scope, formerly Google, University of St Andrews. Full-stack engineer in London focused on AI, and UX/UI.",
  cv: "CV of Sean Gordon - over 6 years experience in software engineering, specializing in Node.js, React and Mobile development.",
  contact:
    "Contact Sean Gordon - if you're interested in mobile, web or AI development.",
} as const;

type PageMetadataInput = {
  title?: string;
  description: string;
  path: string;
};

type JsonLdNode = Record<string, unknown>;

export function absoluteUrl(path: string): string {
  if (path === "/") {
    return site.url;
  }

  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}

function documentTitle(title?: string): string {
  return title ? `${title} — ${site.siteName}` : site.titleDefault;
}

const openGraphImages = [
  {
    url: site.portraitUrl,
    alt: site.siteName,
  },
];

export const rootMetadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.titleDefault,
    template: `%s — ${site.siteName}`,
  },
  description: site.descriptionDefault,
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: site.siteName,
    title: site.titleDefault,
    description: site.descriptionDefault,
    url: site.url,
    images: openGraphImages,
  },
};

export function pageMetadata({
  title,
  description,
  path,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const fullTitle = documentTitle(title);

  return {
    title: {
      absolute: fullTitle,
    },
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      locale: "en_GB",
      siteName: site.siteName,
      title: fullTitle,
      description,
      url,
      images: openGraphImages,
    },
  };
}

export function buildSiteJsonLd(): JsonLdNode {
  const personId = `${site.url}/#person`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: site.siteName,
        url: site.url,
        image: site.portraitUrl,
        email: site.email,
        jobTitle: site.jobTitle,
        worksFor: {
          "@type": "Organization",
          name: site.worksFor.name,
          url: site.worksFor.url,
        },
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: site.alumniOf.name,
          url: site.alumniOf.url,
        },
        homeLocation: {
          "@type": "Place",
          name: site.location,
          address: {
            "@type": "PostalAddress",
            addressLocality: "London",
            addressCountry: "GB",
          },
        },
        sameAs: [site.linkedIn],
        knowsAbout: [...site.knowsAbout],
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        name: site.siteName,
        url: site.url,
        description: site.descriptionDefault,
        inLanguage: "en-GB",
        publisher: { "@id": personId },
        author: { "@id": personId },
      },
    ],
  };
}

import {
  AUTHOR_DESCRIPTION,
  AUTHOR_KNOWS_ABOUT,
  AUTHOR_NAME,
  AUTHOR_SAME_AS,
  AUTHOR_TITLE,
  AUTHOR_URL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL
} from "@/lib/site";

export function buildPersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: AUTHOR_NAME,
    description: AUTHOR_DESCRIPTION,
    jobTitle: AUTHOR_TITLE,
    url: AUTHOR_URL,
    sameAs: AUTHOR_SAME_AS,
    knowsAbout: AUTHOR_KNOWS_ABOUT
  };
}

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    founder: {
      "@type": "Person",
      name: AUTHOR_NAME,
      url: AUTHOR_URL
    }
  };
}

export function buildWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL
    },
    about: AUTHOR_KNOWS_ABOUT
  };
}

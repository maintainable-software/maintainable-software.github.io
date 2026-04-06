import type { Post } from "@/lib/posts";
import {
  AUTHOR_DESCRIPTION,
  AUTHOR_KNOWS_ABOUT,
  AUTHOR_NAME,
  AUTHOR_SAME_AS,
  AUTHOR_TITLE,
  AUTHOR_URL,
  ORGANIZATION_ID,
  PERSON_ID,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  WEBSITE_ID,
  toAbsoluteUrl,
} from "@/lib/site";

function buildPersonReference() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: AUTHOR_NAME,
    url: AUTHOR_URL,
  };
}

function buildOrganizationReference() {
  return {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: SITE_NAME,
    url: SITE_URL,
  };
}

export function buildPersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: AUTHOR_NAME,
    description: AUTHOR_DESCRIPTION,
    jobTitle: AUTHOR_TITLE,
    url: AUTHOR_URL,
    sameAs: AUTHOR_SAME_AS,
    knowsAbout: AUTHOR_KNOWS_ABOUT,
    mainEntityOfPage: AUTHOR_URL,
  };
}

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    founder: buildPersonReference(),
  };
}

export function buildWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    publisher: buildOrganizationReference(),
    about: AUTHOR_KNOWS_ABOUT,
    inLanguage: "en",
  };
}

type CollectionItem = {
  name: string;
  url: string;
  description?: string;
};

type CollectionPageOptions = {
  name: string;
  description?: string;
  url: string;
  items: CollectionItem[];
};

export function buildCollectionPageJsonLd({
  name,
  description,
  url,
  items,
}: CollectionPageOptions) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url: toAbsoluteUrl(url),
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: item.url,
        description: item.description,
      })),
    },
  };
}

function getPostDescription(post: Post): string | undefined {
  return (post.description ?? post.excerpt) || undefined;
}

function getPostCanonicalUrl(post: Post): string {
  return toAbsoluteUrl(post.canonical_url ?? `/${post.slug}/`);
}

function getPostImageUrl(post: Post): string | undefined {
  return post.image ? toAbsoluteUrl(post.image) : undefined;
}

export function buildBlogPostingJsonLd(post: Post) {
  const canonicalUrl = getPostCanonicalUrl(post);
  const description = getPostDescription(post);
  const imageUrl = getPostImageUrl(post);

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: buildPersonReference(),
    publisher: buildOrganizationReference(),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    isPartOf: {
      "@id": WEBSITE_ID,
    },
    url: canonicalUrl,
    image: imageUrl ? [imageUrl] : undefined,
    keywords: post.tags,
  };
}

type BreadcrumbItem = {
  name: string;
  path: string;
};

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: toAbsoluteUrl(item.path),
    })),
  };
}

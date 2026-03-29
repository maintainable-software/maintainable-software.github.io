import type { Metadata } from "next";

const SITE_NAME = "maintainable.software";
const SITE_URL = "https://maintainable.software";

type BuildPageMetadataOptions = {
  title: string;
  description: string;
  path: string;
};

function toAbsoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}

export function buildPageMetadata({
  title,
  description,
  path
}: BuildPageMetadataOptions): Metadata {
  const canonicalUrl = toAbsoluteUrl(path);

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      type: "website",
      url: canonicalUrl,
      title,
      description,
      siteName: SITE_NAME
    },
    twitter: {
      card: "summary",
      title,
      description
    }
  };
}

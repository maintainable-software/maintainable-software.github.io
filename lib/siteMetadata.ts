import type { Metadata } from "next";
import { SITE_NAME, toAbsoluteUrl } from "@/lib/site";

type BuildPageMetadataOptions = {
  title: string;
  description: string;
  path: string;
};

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

export function buildNoIndexPageMetadata(
  options: BuildPageMetadataOptions
): Metadata {
  return {
    ...buildPageMetadata(options),
    robots: {
      index: false,
      follow: true,
      googleBot: {
        index: false,
        follow: true
      }
    }
  };
}

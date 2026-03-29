import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";

const SITE_URL = "https://maintainable.software";

const STATIC_ROUTES = ["/", "/about/", "/posts/", "/tags/"] as const;

export const dynamic = "force-static";

function toAbsoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: toAbsoluteUrl(route)
  }));

  const postEntries: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: toAbsoluteUrl(`/${post.slug}/`),
    lastModified: post.updated ?? post.date
  }));

  return [...staticEntries, ...postEntries];
}

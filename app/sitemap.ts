import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { toAbsoluteUrl } from "@/lib/site";

const STATIC_ROUTES = [
  "/",
  "/about/",
  "/me/",
  "/privacy/",
  "/references/",
] as const;

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: toAbsoluteUrl(route),
  }));

  const postEntries: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: toAbsoluteUrl(`/${post.slug}/`),
    lastModified: post.updated ?? post.date,
  }));

  return [...staticEntries, ...postEntries];
}

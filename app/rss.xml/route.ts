import { getAllPosts } from "@/lib/posts";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  toAbsoluteUrl,
} from "@/lib/site";

export const dynamic = "force-static";

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function formatRssDate(dateString: string): string {
  return new Date(dateString).toUTCString();
}

export function GET() {
  const posts = getAllPosts();
  const feedUrl = toAbsoluteUrl("/rss.xml");
  const latestBuildDate =
    posts[0]?.updated ?? posts[0]?.date ?? new Date().toISOString();

  const items = posts
    .map((post) => {
      const url = post.canonical_url ?? toAbsoluteUrl(`/${post.slug}/`);
      const description = post.teaser ?? post.excerpt ?? post.description ?? "";
      const pubDate = formatRssDate(post.updated ?? post.date);

      return [
        "<item>",
        `<title>${escapeXml(post.title)}</title>`,
        `<link>${escapeXml(url)}</link>`,
        `<guid isPermaLink=\"true\">${escapeXml(url)}</guid>`,
        `<pubDate>${escapeXml(pubDate)}</pubDate>`,
        `<description>${escapeXml(description)}</description>`,
        "</item>",
      ].join("");
    })
    .join("");

  const feed = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "<channel>",
    `<title>${escapeXml(SITE_NAME)}</title>`,
    `<link>${escapeXml(SITE_URL)}</link>`,
    `<description>${escapeXml(SITE_DESCRIPTION)}</description>`,
    `<atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />`,
    `<lastBuildDate>${escapeXml(formatRssDate(latestBuildDate))}</lastBuildDate>`,
    items,
    "</channel>",
    "</rss>",
  ].join("");

  return new Response(feed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}

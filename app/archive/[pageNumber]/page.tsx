import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostArchive } from "@/components/PostArchive";
import { getPostsForPage, getTotalPostPages } from "@/lib/postPagination";
import { SITE_NAME } from "@/lib/site";
import { buildNoIndexPageMetadata } from "@/lib/siteMetadata";

type PageParams = {
  pageNumber: string;
};

type PageProps = {
  params: Promise<PageParams>;
};

const description =
  "Older published essays on agentic engineering, software architecture, docs-first product development, and maintainable delivery.";

function parsePageNumber(rawPage: string): number | undefined {
  if (!/^\d+$/.test(rawPage)) {
    return undefined;
  }

  const pageNumber = Number.parseInt(rawPage, 10);

  return Number.isInteger(pageNumber) && pageNumber >= 2
    ? pageNumber
    : undefined;
}

function getArchivePage(rawPage: string) {
  const pageNumber = parsePageNumber(rawPage);

  if (!pageNumber) {
    notFound();
  }

  const totalPages = getTotalPostPages();

  if (pageNumber > totalPages) {
    notFound();
  }

  const posts = getPostsForPage(pageNumber);

  if (posts.length === 0) {
    notFound();
  }

  return {
    pageNumber,
    totalPages,
    posts,
  };
}

export function generateStaticParams() {
  const totalPages = getTotalPostPages();

  return Array.from({ length: Math.max(totalPages - 1, 0) }, (_, index) => ({
    pageNumber: String(index + 2),
  }));
}

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { pageNumber } = getArchivePage((await params).pageNumber);

  return buildNoIndexPageMetadata({
    title: `Post archive page ${pageNumber} | ${SITE_NAME}`,
    description,
    path: `/archive/${pageNumber}/`,
  });
}

export default async function ArchivePage({ params }: PageProps) {
  const { pageNumber, totalPages, posts } = getArchivePage(
    (await params).pageNumber,
  );

  return (
    <PostArchive
      posts={posts}
      currentPage={pageNumber}
      totalPages={totalPages}
    />
  );
}

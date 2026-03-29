import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostArchive } from "@/components/PostArchive";
import { getPostsForPage, getTotalPostPages } from "@/lib/postPagination";
import { buildNoIndexPageMetadata } from "@/lib/siteMetadata";

type PageParams = {
  page: string;
};

type PageProps = {
  params: Promise<PageParams>;
};

function parsePageNumber(rawPage: string): number {
  const pageNumber = Number.parseInt(rawPage, 10);

  if (!Number.isInteger(pageNumber) || pageNumber < 2) {
    notFound();
  }

  return pageNumber;
}

export const dynamicParams = false;

export function generateStaticParams() {
  const totalPages = getTotalPostPages();

  return Array.from({ length: Math.max(totalPages - 1, 0) }, (_, index) => ({
    page: String(index + 2)
  }));
}

export async function generateMetadata({
  params
}: PageProps): Promise<Metadata> {
  const { page } = await params;
  const pageNumber = parsePageNumber(page);

  if (pageNumber > getTotalPostPages()) {
    notFound();
  }

  return buildNoIndexPageMetadata({
    title: `Post archive page ${pageNumber} | maintainable.software`,
    description:
      "Older published essays on agentic engineering, software architecture, docs-first product development, and maintainable delivery.",
    path: `/page/${pageNumber}/`
  });
}

export default async function PostArchivePage({ params }: PageProps) {
  const { page } = await params;
  const pageNumber = parsePageNumber(page);
  const totalPages = getTotalPostPages();

  if (pageNumber > totalPages) {
    notFound();
  }

  const posts = getPostsForPage(pageNumber);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <PostArchive
      posts={posts}
      currentPage={pageNumber}
      totalPages={totalPages}
    />
  );
}

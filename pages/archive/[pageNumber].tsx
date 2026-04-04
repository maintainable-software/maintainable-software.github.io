import Head from "next/head";
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from "next";
import { PostArchive } from "@/components/PostArchive";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import type { Post } from "@/lib/posts";

type PageParams = {
  pageNumber: string;
};

type PageProps = {
  pageNumber: number;
  totalPages: number;
  posts: Post[];
};

function parsePageNumber(rawPage: string): number {
  const pageNumber = Number.parseInt(rawPage, 10);

  if (!Number.isInteger(pageNumber) || pageNumber < 2) {
    throw new Error("Invalid page number");
  }

  return pageNumber;
}

export const getStaticPaths: GetStaticPaths<PageParams> = async () => {
  const { getTotalPostPages } = await import("@/lib/postPagination");
  const totalPages = getTotalPostPages();

  return {
    paths: Array.from({ length: Math.max(totalPages - 1, 0) }, (_, index) => ({
      params: {
        pageNumber: String(index + 2),
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PageProps, PageParams> = async ({
  params,
}) => {
  const { getPostsForPage, getTotalPostPages } =
    await import("@/lib/postPagination");
  const rawPage = params?.pageNumber;

  if (!rawPage) {
    return { notFound: true };
  }

  const pageNumber = parsePageNumber(rawPage);
  const totalPages = getTotalPostPages();

  if (pageNumber > totalPages) {
    return { notFound: true };
  }

  const posts = getPostsForPage(pageNumber);

  if (posts.length === 0) {
    return { notFound: true };
  }

  return {
    props: {
      pageNumber,
      totalPages,
      posts,
    },
  };
};

export default function ArchivePage({
  pageNumber,
  totalPages,
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const canonicalUrl = `${SITE_URL}/archive/${pageNumber}/`;
  const title = `Post archive page ${pageNumber} | ${SITE_NAME}`;
  const description =
    "Older published essays on agentic engineering, software architecture, docs-first product development, and maintainable delivery.";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="noindex,follow" />
        <link rel="canonical" href={canonicalUrl} />
      </Head>

      <PostArchive
        posts={posts}
        currentPage={pageNumber}
        totalPages={totalPages}
      />
    </>
  );
}

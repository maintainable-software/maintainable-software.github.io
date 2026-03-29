import { PostArchive } from "@/components/PostArchive";
import { getTotalPostPages, getPostsForPage } from "@/lib/postPagination";
import { buildPageMetadata } from "@/lib/siteMetadata";

export const metadata = buildPageMetadata({
  title: "maintainable.software | Agentic engineering and maintainable delivery",
  description:
    "Essays on agentic engineering, software architecture, docs-first product development, and maintainable software delivery.",
  path: "/"
});

export default function HomePage() {
  const posts = getPostsForPage(1);
  const totalPages = getTotalPostPages();

  return (
    <PostArchive
      posts={posts}
      currentPage={1}
      totalPages={totalPages}
      showIntro
    />
  );
}

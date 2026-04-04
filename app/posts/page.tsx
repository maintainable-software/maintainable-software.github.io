import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { buildNoIndexPageMetadata } from "@/lib/siteMetadata";

export const metadata = buildNoIndexPageMetadata({
  title: "All posts | maintainable.software",
  description:
    "Browse published essays on agentic engineering, software architecture, docs-first product development, and maintainable delivery.",
  path: "/posts/",
});

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <article className="content-shell page-shell">
      <header className="content-header">
        <h1>All posts</h1>
      </header>

      <div className="content-body">
        <ul>
          {posts.map((post) => (
            <li key={post.slug}>
              {post.date}: <Link href={`/${post.slug}/`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

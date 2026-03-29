import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

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

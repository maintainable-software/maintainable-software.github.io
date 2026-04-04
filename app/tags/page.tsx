import Link from "next/link";
import { getAllTags } from "@/lib/posts";
import { buildNoIndexPageMetadata } from "@/lib/siteMetadata";

export const metadata = buildNoIndexPageMetadata({
  title: "Topics and tags | maintainable.software",
  description:
    "Browse published posts by topic, including agentic engineering, software architecture, docs-first product development, and software design.",
  path: "/tags/",
});

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <article className="content-shell page-shell">
      <header className="content-header">
        <h1>Tags</h1>
      </header>

      <div className="content-body">
        <section className="tag-index">
          <p>Browse posts by topic.</p>

          <div className="tag-jump-list">
            {tags.map(([tag, posts]) => (
              <a href={`#${tag}`} key={tag}>
                {tag} <span>{posts.length}</span>
              </a>
            ))}
          </div>
        </section>

        <section className="tag-groups">
          {tags.map(([tag, posts]) => (
            <article className="tag-block" id={tag} key={tag}>
              <h2>{tag}</h2>
              <ul className="tag-post-list">
                {posts.map((post) => (
                  <li key={post.slug}>
                    <Link href={`/${post.slug}/`}>{post.title}</Link>
                    <small>
                      {new Intl.DateTimeFormat("en", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        timeZone: "Asia/Manila",
                      }).format(new Date(post.date))}
                    </small>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </section>
      </div>
    </article>
  );
}

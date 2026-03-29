import Link from "next/link";
import { formatDisplayDate, getAllPosts } from "@/lib/posts";

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <>
      <section className="intro">
        <div className="intro__body">
          <p className="intro__quote">
            <i>
              "You will never learn anything new [if it&apos;s not] significantly
              different from what you already know"
            </i>
          </p>
          <p className="intro__source">
            Adapted from{" "}
            <a
              href="https://www.youtube.com/watch?v=SxdOUGdseq4"
              target="_blank"
              rel="noopener noreferrer"
            >
              Rich Hickey - Simple made easy
            </a>
          </p>
        </div>
      </section>

      <section className="post-list">
        {posts.map((post) => (
          <article className="post-item" key={post.slug}>
            {post.header_kicker ? (
              <p className="content-header__kicker post-item__kicker">
                {post.header_kicker}
              </p>
            ) : null}
            <h2>
              <Link href={`/${post.slug}/`}>{post.title}</Link>
            </h2>
            <p className="post-item__meta">
              <span>{formatDisplayDate(post.date)}</span>
              <span className="post-item__author">
                <Link href="/me/" rel="author">
                  Jan-Gerke Salomon
                </Link>
              </span>
            </p>
            <p className="post-item__excerpt">{post.excerpt}</p>
          </article>
        ))}
      </section>
    </>
  );
}

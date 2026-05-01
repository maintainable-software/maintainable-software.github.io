import Link from "next/link";
import { formatDisplayDate } from "@/lib/date";
import type { Post } from "@/lib/posts";

type PostArchiveProps = {
  posts: Post[];
  currentPage: number;
  totalPages: number;
  showIntro?: boolean;
};

function getPageHref(page: number): string {
  return page === 1 ? "/" : `/archive/${page}/`;
}

export function PostArchive({
  posts,
  currentPage,
  totalPages,
  showIntro = false,
}: PostArchiveProps) {
  const previousPageHref =
    currentPage > 1 ? getPageHref(currentPage - 1) : undefined;
  const nextPageHref =
    currentPage < totalPages ? getPageHref(currentPage + 1) : undefined;

  return (
    <>
      {showIntro ? (
        <section className="intro">
          <div className="intro__body">
            <p className="intro__quote">
              <i>
                "You will never learn anything new [if it&apos;s not]
                significantly different from what you already know"
              </i>
            </p>
            <p className="intro__source">
              Adapted from{" "}
              <a
                href="https://www.youtube.com/watch?v=SxdOUGdseq4"
                target="_blank"
                rel="noopener"
              >
                Rich Hickey - Simple made easy
              </a>
            </p>
          </div>
        </section>
      ) : null}

      <section className="post-list">
        {posts.map((post) => (
          <article className="post-item" key={post.slug}>
            {post.header_kicker ? (
              <p className="content-header__kicker post-item__kicker">
                {post.header_kicker}
              </p>
            ) : null}
            <h2>
              <Link data-telemetry-link="post-card" href={`/${post.slug}/`}>
                {post.title}
              </Link>
            </h2>
            <p className="post-item__meta">
              <span>{formatDisplayDate(post.date)}</span>
              <span className="post-item__author">
                <Link data-telemetry-link="author" href="/me/" rel="author">
                  Jan-Gerke Salomon
                </Link>
              </span>
            </p>
            <p className="post-item__excerpt">{post.excerpt}</p>
          </article>
        ))}
      </section>

      {totalPages > 1 ? (
        <nav
          className="pagination"
          aria-label="Post archive pagination"
          data-telemetry-area="archive-pagination"
        >
          <p className="pagination__status">
            Page {currentPage} of {totalPages}
          </p>
          <div className="pagination__links">
            {previousPageHref ? (
              <Link className="pagination__link" href={previousPageHref}>
                Newer posts
              </Link>
            ) : (
              <span className="pagination__link pagination__link--disabled">
                Newer posts
              </span>
            )}
            {nextPageHref ? (
              <Link className="pagination__link" href={nextPageHref}>
                Older posts
              </Link>
            ) : (
              <span className="pagination__link pagination__link--disabled">
                Older posts
              </span>
            )}
          </div>
        </nav>
      ) : null}
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownContent } from "@/components/MarkdownContent";
import {
  formatDisplayDate,
  getAllPosts,
  getPostBySlug,
  type Post
} from "@/lib/posts";

const SITE_NAME = "maintainable.software";
const SITE_URL = "https://maintainable.software";
const DEFAULT_AUTHOR = "Jan-Gerke Salomon";
const DEFAULT_AUTHOR_PATH = "/me/";

type PageParams = {
  slug: string;
};

type PageProps = {
  params: Promise<PageParams>;
};

function toAbsoluteUrl(urlOrPath: string): string {
  return new URL(urlOrPath, SITE_URL).toString();
}

function getPostOrNotFound(slug: string): Post {
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return post;
}

function getPostDescription(post: Post): string | undefined {
  return (post.description ?? post.excerpt) || undefined;
}

function getCanonicalUrl(post: Post): string {
  return toAbsoluteUrl(post.canonical_url ?? `/${post.slug}/`);
}

function getAuthorName(post: Post): string {
  return post.author ?? DEFAULT_AUTHOR;
}

function getAuthorUrl(post: Post): string {
  return toAbsoluteUrl(post.author_url ?? DEFAULT_AUTHOR_PATH);
}

function getImageUrl(post: Post): string | undefined {
  return post.image ? toAbsoluteUrl(post.image) : undefined;
}

function getRelatedPosts(post: Post): Post[] {
  const currentTags = new Set(post.tags ?? []);
  const relatedPosts = getAllPosts()
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => ({
      post: candidate,
      sharedTagCount: (candidate.tags ?? []).filter((tag) =>
        currentTags.has(tag)
      ).length
    }))
    .filter(({ sharedTagCount }) => sharedTagCount > 0)
    .sort((a, b) => {
      if (a.sharedTagCount !== b.sharedTagCount) {
        return b.sharedTagCount - a.sharedTagCount;
      }

      return a.post.date < b.post.date ? 1 : -1;
    })
    .map(({ post: relatedPost }) => relatedPost);

  if (relatedPosts.length > 0) {
    return relatedPosts.slice(0, 3);
  }

  return getAllPosts()
    .filter((candidate) => candidate.slug !== post.slug)
    .slice(0, 3);
}

function buildBlogPostingJsonLd(post: Post) {
  const canonicalUrl = getCanonicalUrl(post);
  const description = getPostDescription(post);
  const authorName = getAuthorName(post);
  const authorUrl = getAuthorUrl(post);
  const imageUrl = getImageUrl(post);

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: {
      "@type": "Person",
      name: authorName,
      url: authorUrl
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl
    },
    url: canonicalUrl,
    image: imageUrl ? [imageUrl] : undefined,
    keywords: post.tags
  };
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostOrNotFound(slug);
  const canonicalUrl = getCanonicalUrl(post);
  const description = getPostDescription(post);
  const authorName = getAuthorName(post);
  const authorUrl = getAuthorUrl(post);
  const imageUrl = getImageUrl(post);

  return {
    title: post.title,
    description,
    keywords: post.tags,
    authors: [
      {
        name: authorName,
        url: authorUrl
      }
    ],
    creator: authorName,
    publisher: SITE_NAME,
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      type: "article",
      url: canonicalUrl,
      title: post.title,
      description,
      siteName: SITE_NAME,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [authorName],
      tags: post.tags,
      images: imageUrl
        ? [
            {
              url: imageUrl,
              alt: post.title
            }
          ]
        : undefined
    },
    twitter: {
      card: imageUrl ? "summary_large_image" : "summary",
      title: post.title,
      description,
      images: imageUrl ? [imageUrl] : undefined
    }
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostOrNotFound(slug);
  const authorName = getAuthorName(post);
  const authorUrl = post.author_url ?? DEFAULT_AUTHOR_PATH;
  const postJsonLd = buildBlogPostingJsonLd(post);
  const summary = post.excerpt || getPostDescription(post);
  const relatedPosts = getRelatedPosts(post);

  return (
    <article className="content-shell post-shell post">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(postJsonLd)
        }}
      />

      <header className="content-header post-header">
        {post.header_kicker ? (
          <p className="content-header__kicker">{post.header_kicker}</p>
        ) : null}
        <h1 className="post-title">{post.title}</h1>
        {summary ? <p className="post-summary">{summary}</p> : null}
        <dl className="post-facts">
          <div className="post-fact">
            <dt>Published</dt>
            <dd>
              <time dateTime={post.date}>{formatDisplayDate(post.date)}</time>
            </dd>
          </div>
          {post.updated ? (
            <div className="post-fact">
              <dt>Updated</dt>
              <dd>
                <time dateTime={post.updated}>
                  {formatDisplayDate(post.updated)}
                </time>
              </dd>
            </div>
          ) : null}
          <div className="post-fact">
            <dt>Author</dt>
            <dd>
              <Link href={authorUrl} rel="author">
                {authorName}
              </Link>
            </dd>
          </div>
        </dl>

        {post.tags && post.tags.length > 0 ? (
          <p className="post-tags">
            {post.tags.map((tag) => (
              <Link href={`/tags/#${tag}`} key={tag}>
                {tag}
              </Link>
            ))}
          </p>
        ) : null}
      </header>

      <div className="content-body post-content">
        <MarkdownContent content={post.content} />
      </div>

      {relatedPosts.length > 0 ? (
        <aside className="post-related" aria-labelledby="related-posts-title">
          <h2 id="related-posts-title">Related posts</h2>
          <ul className="post-related__list">
            {relatedPosts.map((relatedPost) => (
              <li className="post-related__item" key={relatedPost.slug}>
                <h3>
                  <Link href={`/${relatedPost.slug}/`}>{relatedPost.title}</Link>
                </h3>
                <p className="post-related__meta">
                  <time dateTime={relatedPost.date}>
                    {formatDisplayDate(relatedPost.date)}
                  </time>
                </p>
                {relatedPost.excerpt ? (
                  <p className="post-related__summary">
                    {relatedPost.excerpt}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        </aside>
      ) : null}
    </article>
  );
}

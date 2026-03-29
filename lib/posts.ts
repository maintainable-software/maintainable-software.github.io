import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content", "posts");

type Frontmatter = {
  title: string;
  date: string | Date;
  updated?: string | Date;
  published?: boolean;
  tags?: string[];
  teaser?: string;
  header_kicker?: string;
  description?: string;
  author?: string;
  author_url?: string;
  canonical_url?: string;
  image?: string;
};

export type Post = Omit<Frontmatter, "date" | "updated"> & {
  date: string;
  updated?: string;
  slug: string;
  content: string;
  excerpt: string;
};

type GetAllPostsOptions = {
  includeDrafts?: boolean;
};

function getSlugFromFilename(filename: string): string {
  return filename.replace(/^\d{4}-\d{2}-\d{2}-/, "").replace(/\.md$/, "");
}

function normalizeDate(date: string | Date): string {
  return date instanceof Date ? date.toISOString().slice(0, 10) : date;
}

function normalizeOptionalDate(date?: string | Date): string | undefined {
  return date ? normalizeDate(date) : undefined;
}

export function getAllPosts(options: GetAllPostsOptions = {}): Post[] {
  const { includeDrafts = false } = options;

  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((fileName) => {
      const filePath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);
      const frontmatter = data as Frontmatter;

      return {
        ...frontmatter,
        date: normalizeDate(frontmatter.date),
        updated: normalizeOptionalDate(frontmatter.updated),
        slug: getSlugFromFilename(fileName),
        content,
        excerpt: frontmatter.teaser ?? ""
      };
    })
    .filter((post) => includeDrafts || post.published === true)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(
  slug: string,
  options: GetAllPostsOptions = {}
): Post | undefined {
  return getAllPosts(options).find((post) => post.slug === slug);
}

export function getAllTags(options: GetAllPostsOptions = {}) {
  const tagMap = new Map<string, Post[]>();

  for (const post of getAllPosts(options)) {
    for (const tag of post.tags ?? []) {
      const current = tagMap.get(tag) ?? [];
      current.push(post);
      tagMap.set(tag, current);
    }
  }

  return [...tagMap.entries()].sort(([a], [b]) => a.localeCompare(b));
}

export function formatDisplayDate(dateString: string) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Manila"
  }).format(new Date(dateString));
}

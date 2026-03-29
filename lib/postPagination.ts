import { getAllPosts } from "@/lib/posts";

export const POSTS_PER_PAGE = 4;

export function getTotalPostPages(): number {
  return Math.ceil(getAllPosts().length / POSTS_PER_PAGE);
}

export function getPostsForPage(pageNumber: number) {
  const posts = getAllPosts();
  const start = (pageNumber - 1) * POSTS_PER_PAGE;

  return posts.slice(start, start + POSTS_PER_PAGE);
}

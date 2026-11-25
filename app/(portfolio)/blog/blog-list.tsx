import Link from "next/link";
import { blogPosts, formatBlogDate } from "./posts";

export function BlogList() {
  const posts = Object.entries(blogPosts).reverse();

  return (
    <>
      <h1 id="screen-title">Blog</h1>
      {posts.length ? (
        <ul className="blog-list">
          {posts.map(([slug, { title, date }]) => (
            <li key={slug}>
              <Link className="corner-panel blog-card" href={`/blog/${slug}`}>
                <strong>{title}</strong>
                <time dateTime={date}>{formatBlogDate(date)}</time>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-panel">No posts yet.</p>
      )}
    </>
  );
}

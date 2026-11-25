import { notFound } from "next/navigation";
import { Suspense } from "react";
import { blogPosts, formatBlogDate } from "../posts";

export default function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  return (
    <Suspense fallback={<p id="screen-title">Loading post…</p>}>
      <BlogPost params={params} />
    </Suspense>
  );
}

async function BlogPost({ params }: Pick<PageProps<"/blog/[slug]">, "params">) {
  const { slug } = await params;
  if (!Object.hasOwn(blogPosts, slug)) notFound();
  const { title, date, Body } = blogPosts[slug];

  return (
    <article className="blog-article">
      <header>
        <time dateTime={date}>{formatBlogDate(date)}</time>
        <h1 id="screen-title">{title}</h1>
      </header>
      <hr />
      <div className="blog-body">
        <Body />
      </div>
    </article>
  );
}

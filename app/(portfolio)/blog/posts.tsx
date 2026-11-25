import type { ComponentType } from "react";
import firstPost from "./posts/first-internship";

type BlogPost = {
  title: string;
  date: string;
  Body: ComponentType;
};

// Each entry's key becomes its article URL, such as `/blog/first-post`.
// Create a file in ./posts, import it here, and add it at the end to put it at the top of the Blog.
export const blogPosts: Record<string, BlogPost> = {
  "test-post": firstPost,
};

const dateFormatter = new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "UTC" });

export function formatBlogDate(date: string) {
  return dateFormatter.format(new Date(`${date}T00:00:00Z`));
}

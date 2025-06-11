import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { PostMetadata } from "./types";

const postsDirectory = path.join(process.cwd(), "posts");

export interface Post extends PostMetadata {
  content: string;
}

export function getAllPosts(): PostMetadata[] {
  // Ensure posts directory exists
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter((name) => name.endsWith(".mdx"))
    .map((name) => {
      const fullPath = path.join(postsDirectory, name);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      const slug = name.replace(/\.mdx$/, "");

      return {
        slug,
        title: data.title || slug,
        date: data.date || "",
        subtitle: data.subtitle,
        tags: data.tags || [],
      } as PostMetadata;
    })
    .sort((a, b) => {
      // Sort by date, newest first
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  return posts;
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || slug,
      date: data.date || "",
      subtitle: data.subtitle,
      tags: data.tags || [],
      content,
    };
  } catch {
    return null;
  }
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((name) => name.endsWith(".mdx"))
    .map((name) => name.replace(/\.mdx$/, ""));
}

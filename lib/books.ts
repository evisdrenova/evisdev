import fs from "fs";
import path from "path";
import matter from "gray-matter";

const booksDirectory = path.join(process.cwd(), "books");

export interface BookMetadata {
  title: string;
  date: string;
  subtitle?: string;
  author: string;
  slug: string;
  tags?: string[];
}

export interface Book extends BookMetadata {
  content: string;
}

export function getAllBooks(): BookMetadata[] {
  if (!fs.existsSync(booksDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(booksDirectory);
  const books = fileNames
    .filter((name) => name.endsWith(".mdx"))
    .map((name) => {
      const fullPath = path.join(booksDirectory, name);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      const slug = name.replace(/\.mdx$/, "");

      return {
        slug,
        title: data.title || slug,
        date: data.date || "",
        subtitle: data.subtitle,
        tags: data.tags || [],
      } as BookMetadata;
    })
    .sort((a, b) => {
      // Sort by date, newest first
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  return books;
}

export function getBooksBySlug(slug: string): Book | null {
  try {
    const fullPath = path.join(booksDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || slug,
      date: data.date || "",
      subtitle: data.subtitle,
      tags: data.tags || [],
      content,
      author: "author",
    };
  } catch {
    return null;
  }
}

export function getBookSlugs(): string[] {
  if (!fs.existsSync(booksDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(booksDirectory);
  return fileNames
    .filter((name) => name.endsWith(".mdx"))
    .map((name) => name.replace(/\.mdx$/, ""));
}

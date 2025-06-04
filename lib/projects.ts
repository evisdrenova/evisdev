import fs from "fs";
import path from "path";
import matter from "gray-matter";

const projectsDirectory = path.join(process.cwd(), "project");

export interface ProjectMetadata {
  name: string;
  date: string;
  tags: string[];
  slug: string;
}

export interface Project extends ProjectMetadata {
  content: string;
}

export function getAllproject(): ProjectMetadata[] {
  // Ensure project directory exists
  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(projectsDirectory);
  const project = fileNames
    .filter((name) => name.endsWith(".mdx"))
    .map((name) => {
      const fullPath = path.join(projectsDirectory, name);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      const slug = name.replace(/\.mdx$/, "");

      return {
        slug,
        name: data.name,
        date: data.date || "",
        tags: data.tags || [],
      } as ProjectMetadata;
    })
    .sort((a, b) => {
      // Sort by date, newest first
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  return project;
}

export function getbookprojectBySlug(slug: string): Project | null {
  try {
    const fullPath = path.join(projectsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      name: data.name,
      date: data.date || "",
      tags: data.tags || [],
      content,
    };
  } catch {
    return null;
  }
}

export function getprojectlugs(): string[] {
  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(projectsDirectory);
  return fileNames
    .filter((name) => name.endsWith(".mdx"))
    .map((name) => name.replace(/\.mdx$/, ""));
}

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { ProjectMetadata } from "./types";

const projectsDirectory = path.join(process.cwd(), "projects");

export interface Project extends ProjectMetadata {
  content: string;
}

export function getAllprojects(): ProjectMetadata[] {
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
        publish: data.publish !== false, // Default to true unless explicitly false
      } as ProjectMetadata;
    })
    .filter((project) => project.publish) // Only include published projects
    .sort((a, b) => {
      // Sort by date, newest first
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  return project;
}

export function getProjectBySlug(slug: string): Project | null {
  try {
    const fullPath = path.join(projectsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      name: data.name,
      date: data.date || "",
      tags: data.tags || [],
      publish: data.publish !== false, // Default to true unless explicitly false
      content,
    };
  } catch {
    return null;
  }
}

export function getProjectslugs(): string[] {
  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(projectsDirectory);
  return fileNames
    .filter((name) => name.endsWith(".mdx"))
    .map((name) => {
      const fullPath = path.join(projectsDirectory, name);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);
      const slug = name.replace(/\.mdx$/, "");
      
      // Only return slug if project is published
      return data.publish !== false ? slug : null;
    })
    .filter((slug): slug is string => slug !== null);
}

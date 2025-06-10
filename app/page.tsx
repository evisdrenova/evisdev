import React from "react";
import { getAllPosts, PostMetadata } from "@/lib/posts";
import Link from "next/link";
import { getAllproject, ProjectMetadata } from "@/lib/projects";
import Header from "@/components/Header";
import BookList from "./Books";

export default function Home() {
  const posts: PostMetadata[] = getAllPosts().slice(0, 6);
  const projects: ProjectMetadata[] = getAllproject().slice(0, 6);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <Header />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <PostList posts={posts} />
          <ProjectList projects={projects} />
          <BookList />
        </div>
      </div>
    </div>
  );
}

function formatDate(dateString: string): string {
  try {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateString;
  }
}

function PostList({ posts }: { posts: PostMetadata[] }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-300 ">
        Posts
      </h2>
      <div className="space-y-6">
        {posts.length === 0 ? (
          <div className="text-gray-500 text-sm">
            No posts yet. Create your first post by adding a .mdx file to the
            /posts directory.
          </div>
        ) : (
          posts.map((post) => (
            <Link
              key={post.slug}
              href={`/posts/${post.slug}`}
              className="block group cursor-pointer"
            >
              <article className="text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 t">
                <div className="flex justify-between items-start mb-2">
                  <div className="text-sm font-medium ransition-colors">
                    {post.title}
                  </div>
                  <time className="text-xs ml-4 flex-shrink-0">
                    {post.date == "current"
                      ? "Currently Reading"
                      : formatDate(post.date)}
                  </time>
                </div>
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {post.tags.map((tag) => (
                      <Tags key={tag} text={tag} />
                    ))}
                  </div>
                )}
              </article>
            </Link>
          ))
        )}
      </div>
      <div className="mt-10">
        {posts.length > 0 && (
          <Link
            href="/posts"
            className="block text-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 text-sm transition-colors"
          >
            View all Posts →
          </Link>
        )}
      </div>
    </div>
  );
}

function ProjectList({ projects }: { projects: ProjectMetadata[] }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-300">
        Projects
      </h2>
      <div className="space-y-6">
        {projects.map((project, index) => (
          <Link
            key={project.slug}
            href={`/project/${project.slug}`}
            className="block group cursor-pointer"
          >
            <article
              key={index}
              className="group cursor-pointer text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 "
            >
              <div className="flex justify-between items-start mb-2">
                <div className="text-sm font-medium transition-colors">
                  {project.name}
                </div>
                <time className="text-xs ml-4 flex-shrink-0">
                  {formatDate(project.date)}
                </time>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Tags key={tag} text={tag} />
                ))}
              </div>
            </article>
          </Link>
        ))}
      </div>
      <div className="mt-10">
        {[projects].length > 0 && (
          <Link
            href="/posts"
            className="block text-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200  text-sm transition-colors"
          >
            View all Projects →
          </Link>
        )}
      </div>
    </div>
  );
}

function Tags({ text }: { text: string }) {
  return (
    <span className="px-1 py-[2px] text-xs bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300  rounded">
      {text}
    </span>
  );
}

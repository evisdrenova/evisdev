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
    <div className="min-h-screen bg-white dark:bg-black">
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
      <h2 className="text-xl font-semibold text-gray-900">Posts</h2>
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
              <article>
                <div className="flex justify-between items-start mb-2">
                  <div className="text-sm font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
                    {post.title}
                  </div>
                  <time className="text-xs text-gray-500 ml-4 flex-shrink-0">
                    {post.date == "current"
                      ? "Currently Reading"
                      : formatDate(post.date)}
                  </time>
                </div>
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                      >
                        {tag}
                      </span>
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
            className="block text-center text-gray-600 hover:text-gray-900 text-sm transition-colors"
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
      <h2 className="text-xl font-semibold text-gray-900">Projects</h2>
      <div className="space-y-6">
        {projects.map((project, index) => (
          <Link
            key={project.slug}
            href={`/project/${project.slug}`}
            className="block group cursor-pointer"
          >
            <article key={index} className="group cursor-pointer">
              <div className="flex justify-between items-start mb-2">
                <div className="text-sm font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
                  {project.name}
                </div>
                <time className="text-xs text-gray-500 ml-4 flex-shrink-0">
                  {formatDate(project.date)}
                </time>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                  >
                    {tag}
                  </span>
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
            className="block text-center text-gray-600 hover:text-gray-900 text-sm transition-colors"
          >
            View all Projects →
          </Link>
        )}
      </div>
    </div>
  );
}

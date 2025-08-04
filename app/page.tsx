import React from "react";
import { getAllPosts } from "@/lib/posts.server";
import { getAllprojects } from "@/lib/projects.server";
import Header from "@/components/Header";
import BookList from "./BookList";
import ProjectList from "./ProjectList";
import { PostList } from "./PostList";
import { PostMetadata, ProjectMetadata } from "@/lib/types";

export default function Home() {
  const posts: PostMetadata[] = getAllPosts();
  const projects: ProjectMetadata[] = getAllprojects();

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

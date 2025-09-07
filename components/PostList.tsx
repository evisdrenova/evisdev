"use client";

import { formatDate } from "@/lib/utils";
import Link from "next/link";
import type { PostMetadata } from "@/lib/types";
import Tags from "@/components/tags";
import posthog from "posthog-js";

export function PostList({ posts }: { posts: PostMetadata[] }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-300 ">
        Posts
      </h2>
      <div className="space-y-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/posts/${post.slug}`}
            className="block group cursor-pointer"
            onClick={() => posthog.capture(post.title)}
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
        ))}
      </div>
    </div>
  );
}

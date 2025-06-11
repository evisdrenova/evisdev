"use client";

import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useState } from "react";
import type { PostMetadata } from "@/lib/types";
import Tags from "@/components/tags";

export function PostList({ posts }: { posts: PostMetadata[] }) {
  const [visibleCount, setVisibleCount] = useState(7);

  const visiblePosts = posts.slice(0, visibleCount);
  const hasMorePosts = visibleCount < posts.length;

  const loadMore = () => {
    setVisibleCount(posts.length);
  };

  const loadLess = () => {
    setVisibleCount(7);
  };
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-300 ">
        Posts
      </h2>
      <div className="space-y-6">
        {visiblePosts.map((post) => (
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
        ))}
      </div>
      <div className="mt-10 flex justify-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200">
        {hasMorePosts ? (
          <button
            onClick={loadMore}
            className="flex flex-row items-center gap-2 text-sm transition-colors cursor-pointer"
          >
            Load more ({posts.length - visibleCount} more){" "}
            <ArrowDown size="16" />
          </button>
        ) : (
          <button
            onClick={loadLess}
            className="flex flex-row items-center gap-2 text-xs transition-colors cursor-pointer"
          >
            <div>Collapse</div> <ArrowUp size="16" />
          </button>
        )}
      </div>
    </div>
  );
}

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { getAllPosts } from "../../lib/posts";

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-4xl mx-auto p-8 font-mono">
      <div className="mb-8">
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-800 transition-colors mb-4 inline-block"
        >
          ← Back to Home
        </Link>
        <h1 className="text-3xl font-bold mb-4">Posts</h1>
        <p className="text-gray-600">
          {posts.length} {posts.length === 1 ? "post" : "posts"}
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No posts yet.</p>
          <p className="text-sm text-gray-400">
            Create your first post by adding a .mdx file to the /posts
            directory.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <article key={post.slug} className="border-b border-gray-200 pb-6">
              <Link
                href={`/posts/${post.slug}`}
                className="group block hover:bg-gray-50 -m-4 p-4 rounded-lg transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h2>
                  <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
                    {post.date}
                  </span>
                </div>

                {post.subtitle && (
                  <p className="text-gray-600 mb-3">{post.subtitle}</p>
                )}

                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

// app/(posts)/[slug]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { compileMDX } from "next-mdx-remote/rsc";
import { getPostBySlug, getPostSlugs } from "@/lib/posts.server";

import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import { mdxComponents } from "@/components/mdxComponents";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} - Evis`,
    description: post.subtitle,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { content } = await compileMDX({
    source: post.content,
    components: mdxComponents,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm, remarkBreaks],
        rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings, rehypeHighlight],
      },
    },
  });

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <div className="max-w-5xl mx-auto p-8">
        <Link
          href="/"
          className="text-gray-700 hover:text-gray-800 dark:text-gray-300 transition-colors text-sm mb-4 inline-block"
        >
          ← Posts
        </Link>
        <header className="my-20">
          <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-gray-100">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US")}
            </time>
          </div>

          {!!post.tags?.length && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </header>
        <div className="prose prose-gray dark:text-gray-100">{content}</div>
      </div>
    </div>
  );
}

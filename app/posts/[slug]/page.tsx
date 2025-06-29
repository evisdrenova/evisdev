import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { compileMDX } from "next-mdx-remote/rsc";
import { useMDXComponents } from "@/mdx-components";
import { getPostBySlug, getPostSlugs } from "@/lib/posts.server";

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PostPageProps) {
  // Await the params since it's now a Promise
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} - Evis`,
    description: post.subtitle,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  // Await the params since it's now a Promise
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const components = useMDXComponents;

  if (!post) {
    notFound();
  }

  // Compile the MDX content
  const { content } = await compileMDX({
    source: post.content,
    components: components,
    options: {
      parseFrontmatter: false, // We already parsed it in getPostBySlug
    },
  });

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <div className="max-w-4xl mx-auto p-8">
        <div className="mb-20">
          <Link
            href="/"
            className="text-gray-700 hover:text-gray-800 dark:text-gray-00 dark:hover:text-gray-300 transition-colors mb-4 inline-block text-sm"
          >
            ← Posts
          </Link>

          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-gray-100">
              {post.title}
            </h1>

            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-GB")}
              </time>
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </header>
        </div>
        <article className="prose prose-gray max-w-none">{content}</article>
      </div>
    </div>
  );
}

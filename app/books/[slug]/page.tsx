import { getPostBySlug, getPostSlugs } from "@/lib/posts";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { compileMDX } from "next-mdx-remote/rsc";

interface PostPageProps {
  params: {
    slug: string;
  };
}

// Define MDX components outside the async function
const mdxComponents = {
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-3xl font-bold mb-6 text-gray-900">{children}</h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-2xl font-bold mb-4 mt-8 text-gray-900">{children}</h2>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-xl font-bold mb-3 mt-6 text-gray-900">{children}</h3>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="mb-4 text-gray-700 leading-relaxed">{children}</p>
  ),
  code: ({ children }: { children: React.ReactNode }) => (
    <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800">
      {children}
    </code>
  ),
  pre: ({ children }: { children: React.ReactNode }) => (
    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-6 font-mono text-sm">
      {children}
    </pre>
  ),
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700">
      {children}
    </ul>
  ),
  ol: ({ children }: { children: React.ReactNode }) => (
    <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700">
      {children}
    </ol>
  ),
  li: ({ children }: { children: React.ReactNode }) => (
    <li className="leading-relaxed">{children}</li>
  ),
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 mb-6">
      {children}
    </blockquote>
  ),
  a: ({ children, href }: { children: React.ReactNode; href?: string }) => (
    <a
      href={href}
      className="text-blue-600 hover:text-blue-800 underline transition-colors"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
  Badge,
};

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PostPageProps) {
  const post = getPostBySlug(params.slug);

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
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  // Compile the MDX content
  const { content } = await compileMDX({
    source: post.content,
    components: mdxComponents,
    options: {
      parseFrontmatter: false, // We already parsed it in getPostBySlug
    },
  });

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="mb-8">
        <Link
          href="/posts"
          className="text-blue-600 hover:text-blue-800 transition-colors mb-4 inline-block font-mono"
        >
          ← Back to Posts
        </Link>

        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gray-900">
            {post.title}
          </h1>
          {post.subtitle && (
            <p className="text-xl text-gray-600 mb-4">{post.subtitle}</p>
          )}

          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            <time dateTime={post.date}>{post.date}</time>
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
  );
}

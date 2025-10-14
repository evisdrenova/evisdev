import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { compileMDX } from "next-mdx-remote/rsc";
import { getPostBySlug, getPostSlugs } from "@/lib/posts.server";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import { mdxComponents } from "@/components/mdxComponents";
import { extractToc } from "@/lib/toc";
import TableOfContents from "@/components/ToC";
import Footer from "@/components/Footer";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import EmailSignup from "@/components/EmailSignUp";
import { remarkInjectCta } from "@/lib/rehype-inject-cta";

type Params = { slug: string };
type PostPageProps = { params: Promise<Params> };

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
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

  const toc = await extractToc(post.content);

  const { content } = await compileMDX({
    source: post.content,
    components: mdxComponents,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm, remarkBreaks, remarkMath, remarkInjectCta],
        rehypePlugins: [
          rehypeSlug,
          [rehypeAutolinkHeadings],
          rehypeHighlight,
          rehypeKatex,
        ],
      },
    },
  });

  return (
    <>
      <div className="min-h-screen w-full bg-white dark:bg-zinc-950 flex justify-center">
        <div className="flex w-full max-w-7xl gap-8 px-4 lg:px-8">
          <aside className="hidden lg:block w-1/5">
            <div className="sticky top-[380px] max-h-[calc(100vh-5rem)] overflow-y-auto pr-2">
              <TableOfContents toc={toc} />
            </div>
          </aside>
          <main className="w-full lg:w-3/5 mx-auto py-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-gray-900 text-sm inline-block mb-6"
            >
              ← Home
            </Link>
            <header className="mb-12 flex flex-col gap-6 h-[250px]">
              <h1 className="text-4xl mt-20 font-bold text-gray-900 dark:text-gray-100 text-center">
                {post.title}
              </h1>
              <div className="flex items-center justify-center gap-4 text-sm text-gray-700">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
              </div>
            </header>

            <article className="prose prose-gray dark:text-gray-100">
              {content}
            </article>
            <div className="flex w-full max-w-2xl px-4 lg:px-8 items-center justify-center mt-40">
              <EmailSignup />
            </div>
          </main>

          <div className="hidden lg:block w-1/5" />
        </div>
      </div>
      <Footer />
    </>
  );
}

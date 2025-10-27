// app/posts/[slug]/page.tsx
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
import fs from "fs";
import path from "path";

type Params = { slug: string };
type PostPageProps = { params: Promise<Params> };

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

function extractFirstSentence(content: string): string {
  const plainText = content
    .replace(/^#+\s+.*$/gm, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_`~]/g, "")
    .replace(/^>\s+/gm, "")
    .replace(/^-\s+/gm, "")
    .replace(/\n+/g, " ")
    .trim();

  const match = plainText.match(/^[^.!?]+[.!?]/);
  const firstSentence = match ? match[0] : plainText.slice(0, 160);

  if (firstSentence.length > 160) {
    return firstSentence.slice(0, 157) + "...";
  }

  return firstSentence;
}

function getOGImagePath(slug: string): string | null {
  const formats = [".png", ".jpg", ".jpeg", ".webp"];
  const ogImagesDir = path.join(process.cwd(), "public", "og-images");

  for (const format of formats) {
    const imagePath = path.join(ogImagesDir, `${slug}${format}`);
    if (fs.existsSync(imagePath)) {
      return `/og-images/${slug}${format}`;
    }
  }

  const defaultImagePath = path.join(ogImagesDir, "default.png");
  if (fs.existsSync(defaultImagePath)) {
    return "/og-images/default.png";
  }

  return null;
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  const description = post.subtitle || extractFirstSentence(post.content);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://evis.dev";
  const postUrl = `${siteUrl}/posts/${slug}`;

  const ogImagePath = getOGImagePath(slug);

  const metadata: Metadata = {
    title: `${post.title} - Evis`,
    description: description,

    openGraph: {
      title: post.title,
      description: description,
      type: "article",
      publishedTime: post.date,
      authors: ["Evis Drenova"],
      url: postUrl,
      siteName: "Evis Drenova",
    },

    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: description,
      creator: "@evisdrenova",
    },

    alternates: {
      canonical: postUrl,
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  };

  if (ogImagePath) {
    const ogImageUrl = `${siteUrl}${ogImagePath}`;

    metadata.openGraph!.images = [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: post.title,
      },
    ];

    metadata.twitter!.images = [ogImageUrl];
  }

  return metadata;
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
            <div className="flex w-full max-w-2xl px-4 lg:px-8 items-center justify-center bg-red mt-40">
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

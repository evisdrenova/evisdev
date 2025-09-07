// src/mdx-components.tsx
import type { MDXComponents } from "mdx/types";
import Image from "next/image";

/**
 * A plain object – **no hooks inside** – that lists all
 * component overrides you want MDX to use.
 */
export const mdxComponents: MDXComponents = {
  // examples — extend to taste
  img: (props) => (
    <Image
      {...props}
      className="rounded-lg border"
      width={800}
      height={600}
      priority
    />
  ),
  a: (props) => (
    <a
      {...props}
      className="text-blue-600 hover:underline dark:text-blue-400"
    />
  ),
  p: (props) => (
    <p
      {...props}
      className="mb-4 leading-relaxed whitespace-pre-wrap"
    />
  ),
  ul: (props) => (
    <ul
      {...props}
      className="list-disc ml-6 mb-4 space-y-2"
    />
  ),
  ol: (props) => (
    <ol
      {...props}
      className="list-decimal ml-6 mb-4 space-y-2"
    />
  ),
  li: (props) => (
    <li
      {...props}
      className="mb-2 leading-relaxed"
    />
  ),
};

import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import Note from "@/components/Note";
import EmailSignup from "@/components/EmailSignUp";

export const mdxComponents: MDXComponents = {
  img: (props) => (
    <Image
      {...props}
      className="rounded-lg border"
      width={800}
      height={600}
      priority
      alt="alt"
    />
  ),
  a: (props) => (
    <a
      {...props}
      className="text-blue-600 hover:underline dark:text-blue-400"
    />
  ),
  p: (props) => (
    <p {...props} className="mb-4 leading-relaxed whitespace-pre-wrap" />
  ),
  ul: (props) => <ul {...props} className="list-disc ml-6 mb-4 space-y-2" />,
  ol: (props) => <ol {...props} className="list-decimal ml-6 mb-4 space-y-2" />,
  li: (props) => <li {...props} className="mb-2 leading-relaxed" />,
  EmailSignup,
  Note,
};

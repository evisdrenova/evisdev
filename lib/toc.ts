import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import { visit } from "unist-util-visit";
import GithubSlugger from "github-slugger";
import type { Root, Heading, PhrasingContent, Text, InlineCode } from "mdast";

export type TocItem = { id: string; title: string; depth: number };

export async function extractToc(markdown: string): Promise<TocItem[]> {
  const tree = unified().use(remarkParse).use(remarkGfm).parse(markdown) as Root;
  const slugs = new GithubSlugger();
  const toc: TocItem[] = [];

  visit(tree, "heading", (node: Heading) => {
    const depth = node.depth;
    if (depth > 3) return;

    const text = (node.children as PhrasingContent[])
      .filter(
        (c): c is Text | InlineCode =>
          c.type === "text" || c.type === "inlineCode"
      )
      .map((c) => c.value)
      .join("")
      .trim();

    if (!text) return;

    const id = slugs.slug(text);
    toc.push({ id, title: text, depth });
  });

  return toc;
}

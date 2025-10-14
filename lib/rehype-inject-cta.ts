import type { Plugin } from "unified";
import type { Root as MdastRoot, Content } from "mdast";
import type { MdxJsxFlowElement } from "mdast-util-mdx";
import { visit } from "unist-util-visit";

export const remarkInjectCta: Plugin<[], MdastRoot> = () => {
    return (tree: MdastRoot) => {
        let inserted = false;

        visit(tree, "heading", (node, index, parent) => {
            if (inserted || !parent || index === undefined) return;

            if (node.depth === 1) {
                const cta: MdxJsxFlowElement = {
                    type: "mdxJsxFlowElement",
                    name: "EmailSignup",
                    attributes: [],
                    children: [],
                };

                (parent.children as Content[]).splice(index, 0, cta);
                inserted = true;
            }
        });
    };
};

"use client";

import { TocItem } from "@/lib/toc";
import { useEffect, useMemo, useState, useCallback } from "react";

export default function TableOfContents({ toc }: { toc: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>();

  const ids = useMemo(() => toc.map((t) => t.id), [toc]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const current = window.location.hash?.replace(/^#/, "");
    if (current && ids.includes(current)) setActiveId(current);
  }, [ids]);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              a.target.getBoundingClientRect().top -
              b.target.getBoundingClientRect().top
          );
        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
        } else {
          const tops = elements
            .map((el) => ({ id: el.id, top: el.getBoundingClientRect().top }))
            .filter((x) => x.top <= 80);
          if (tops.length)
            setActiveId(tops.sort((a, b) => a.top - b.top).pop()!.id);
        }
      },
      {
        root: null,
        rootMargin: "0px 0px -55% 0px",
        threshold: [0, 1],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  // Update active on hash navigation (keyboard, history back, manual edits)
  useEffect(() => {
    const onHash = () => {
      const id = window.location.hash.replace(/^#/, "");
      if (ids.includes(id)) setActiveId(id);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [ids]);

  // Also set active immediately when user clicks a TOC link
  const handleClick = useCallback((id: string) => {
    setActiveId(id);
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <nav aria-label="Table of contents" className="text-sm leading-6">
      <ul className="space-y-2">
        {toc.map(({ id, title, depth }) => (
          <li
            key={id}
            className={depth === 2 ? "ml-4" : depth === 3 ? "ml-8" : ""}
          >
            <a
              href={`#${id}`}
              onClick={() => handleClick(id)}
              className={
                activeId === id
                  ? "font-semibold text-gray-900"
                  : "text-gray-600 hover:text-gray-900"
              }
            >
              {title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

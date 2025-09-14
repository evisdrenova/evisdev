"use client";

import { TocItem } from "@/lib/toc";
import { useEffect, useMemo, useState, useCallback } from "react";

export default function TableOfContents({ toc }: { toc: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>();
  const ids = useMemo(() => toc.map((t) => t.id), [toc]);

  // Helper: compute which heading should be active right now
  const computeActiveNow = useCallback(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (!els.length) return;

    const TOP_OFFSET = 80; // match your scroll-margin-top-ish
    // First heading whose top is at/above the top offset (i.e., the one we’re at)
    const firstOnScreen = els.find(
      (el) => el.getBoundingClientRect().top >= TOP_OFFSET
    );
    if (firstOnScreen) {
      // The active one is either the previous section (just above) or this one if we’re before any
      const idx = els.indexOf(firstOnScreen);
      setActiveId(idx > 0 ? els[idx].id : els[0].id);
      return;
    }
    // If we’re below all headings, pick the last
    setActiveId(els[els.length - 1].id);
  }, [ids]);

  // Initialize from hash or compute
  useEffect(() => {
    if (!ids.length) return;
    const fromHash = window.location.hash?.replace(/^#/, "");
    if (fromHash && ids.includes(fromHash)) {
      setActiveId(fromHash);
    } else {
      // Wait a tick so layout/images settle
      requestAnimationFrame(() => computeActiveNow());
    }
  }, [ids, computeActiveNow]);

  // IntersectionObserver scroll-spy
  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // headings currently intersecting, pick the highest one
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
          computeActiveNow();
        }
      },
      {
        root: null,
        rootMargin: "0px 0px -55% 0px",
        threshold: [0, 1],
      }
    );

    elements.forEach((el) => observer.observe(el));
    window.addEventListener("load", computeActiveNow, { once: true });

    return () => {
      observer.disconnect();
    };
  }, [ids, computeActiveNow]);

  useEffect(() => {
    const onHash = () => {
      const id = window.location.hash.replace(/^#/, "");
      if (ids.includes(id)) setActiveId(id);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [ids]);

  const handleClick = useCallback((e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setActiveId(id);
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
    history.pushState(null, "", `#${id}`);
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
              onClick={(e) => handleClick(e, id)}
              className={"text-gray-600 hover:text-gray-900"}
              //   className={
              //     activeId === id
              //       ? "font-semibold text-gray-900"
              //       : "text-gray-600 hover:text-gray-900"
              //   }
            >
              {title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

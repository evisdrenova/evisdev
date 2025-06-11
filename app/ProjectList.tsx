"use client";

import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { ProjectMetadata } from "@/lib/types";
import Tags from "@/components/tags";

export default function ProjectList({
  projects,
}: {
  projects: ProjectMetadata[];
}) {
  const [visibleCount, setVisibleCount] = useState(4);

  const visibleProjects = projects.slice(0, visibleCount);
  const hasMoreProjects = visibleCount < projects.length;

  const loadMore = () => {
    setVisibleCount(projects.length);
  };

  const loadLess = () => {
    setVisibleCount(4);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-300">
        Projects
      </h2>
      <div className="space-y-6">
        {visibleProjects.map((project, index) => (
          <Link
            key={project.slug}
            href={`/project/${project.slug}`}
            className="block group cursor-pointer"
          >
            <article
              key={index}
              className="group cursor-pointer text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 "
            >
              <div className="flex justify-between items-start mb-2">
                <div className="text-sm font-medium transition-colors">
                  {project.name}
                </div>
                <time className="text-xs ml-4 flex-shrink-0">
                  {formatDate(project.date)}
                </time>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Tags key={tag} text={tag} />
                ))}
              </div>
            </article>
          </Link>
        ))}
      </div>
      <div className="mt-10 flex justify-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200">
        {hasMoreProjects ? (
          <button
            onClick={loadMore}
            className="flex flex-row items-center gap-2 text-sm transition-colors cursor-pointer"
          >
            Load more ({projects.length - visibleCount} more){" "}
            <ArrowDown size="16" />
          </button>
        ) : (
          <button
            onClick={loadLess}
            className="flex flex-row items-center gap-2 text-sm transition-colors cursor-pointer"
          >
            <div>Collapse</div> <ArrowUp size="16" />
          </button>
        )}
      </div>
    </div>
  );
}

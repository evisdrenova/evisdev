"use client";

import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { ProjectMetadata } from "@/lib/types";
import Tags from "@/components/tags";

export default function ProjectList({
  projects,
}: {
  projects: ProjectMetadata[];
}) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-300">
        Projects I&apos;ve worked on
      </h2>
      <div className="space-y-6">
        {projects.map((project, index) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
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
    </div>
  );
}

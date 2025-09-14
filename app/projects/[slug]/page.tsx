import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { compileMDX } from "next-mdx-remote/rsc";
import { useMDXComponents } from "@/mdx-components";
import { getProjectBySlug, getProjectslugs } from "@/lib/projects.server";
import Footer from "@/components/Footer";

interface ProjectsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getProjectslugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: ProjectsPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "project Not Found",
    };
  }

  return {
    title: `${project.name} - Evis`,
  };
}

export default async function projectPage({ params }: ProjectsPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const components = useMDXComponents;

  if (!project) {
    notFound();
  }

  // Compile the MDX content
  const { content } = await compileMDX({
    source: project.content,
    components: components,
    options: {
      parseFrontmatter: false,
    },
  });

  return (
    <>
      <div className="max-w-4xl mx-auto p-8">
        <div className="mb-8">
          <Link
            href="/"
            className="text-gray-700 hover:text-gray-800 dark:text-gray-300 transition-colors text-sm mb-4 inline-block"
          >
            ← Back to projects
          </Link>

          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-2 text-gray-900">
              {project.name}
            </h1>

            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <time dateTime={project.date}>{project.date}</time>
            </div>

            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </header>
        </div>
        <article className="prose prose-gray max-w-none">{content}</article>
      </div>
      <Footer />
    </>
  );
}

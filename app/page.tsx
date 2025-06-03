import React from "react";
import { Mail, Github } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAllPosts } from "@/lib/posts";
import Link from "next/link";
import { FaLinkedin } from "react-icons/fa";

interface Project {
  name: string;
  date: string;
  tags: string[];
}

interface Posts {
  title: string;
  date: string;
  subtitle?: string;
  slug: string;
  tags?: string[];
}

interface Book {
  title: string;
  author: string;
  status: "reading" | "completed";
  date: string;
}

export default function Home() {
  const posts: Posts[] = getAllPosts().slice(0, 6);

  const projects: Project[] = [
    {
      name: "kyswtn.com",
      date: "Feb 26, 2025",
      tags: ["rust", "typescript", "react"],
    },
    {
      name: "vscode-vercel-website",
      date: "Nov 27, 2024",
      tags: ["rust", "typescript", "react"],
    },
    {
      name: "unocss-preset-radix-colors",
      date: "Sep 15, 2024",
      tags: ["rust", "typescript", "react"],
    },
    {
      name: "vscode-vercel",
      date: "Sep 2, 2024",
      tags: ["rust", "typescript", "react"],
    },
    {
      name: "vedk",
      date: "Aug 20, 2024",
      tags: ["rust", "typescript", "react"],
    },
    {
      name: "terraform-provider-porkbun",
      date: "Apr 26, 2024",
      tags: ["rust", "typescript", "react"],
    },
  ];

  const books: Book[] = [
    {
      title: "The Pragmatic Programmer",
      author: "David Thomas",
      status: "completed",
      date: "Dec 15, 2024",
    },
    {
      title: "Clean Code",
      author: "Robert C. Martin",
      status: "reading",
      date: "Jan 10, 2025",
    },
    {
      title: "System Design Interview",
      author: "Alex Xu",
      status: "reading",
      date: "Nov 5, 2024",
    },
    {
      title: "Designing Data-Intensive Applications",
      author: "Martin Kleppmann",
      status: "completed",
      date: "Oct 12, 2024",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header Section */}
        <header className="mb-16">
          <div className="flex items-start gap-6">
            <Avatar className="w-20 h-20">
              <AvatarImage
                src="Circlevis.png"
                alt="evis"
                className="border border-gray-800 rounded-full"
              />
              <AvatarFallback>Ed</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Evis</h1>
              <p className="text-gray-600 mb-3">Always building</p>
              <p className="text-gray-700 mb-4">
                I like to build and learn stuff.
              </p>
              <div className="flex gap-4">
                <Github className="w-5 h-5 text-gray-600 hover:text-gray-900 cursor-pointer transition-colors" />
                <div className="w-5 h-5 flex items-center justify-center cursor-pointer group">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4 text-gray-600 group-hover:text-black transition-colors fill-current"
                    aria-label="X (formerly Twitter)"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </div>
                <FaLinkedin className="w-5 h-5 text-gray-600 hover:text-black cursor-pointer transition-colors" />
                <Mail className="w-5 h-5 text-gray-600 hover:text-gray-900 cursor-pointer transition-colors" />
              </div>
            </div>
          </div>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Posts</h2>
            <div className="space-y-6">
              {posts.length === 0 ? (
                <div className="text-gray-500 text-sm">
                  No posts yet. Create your first post by adding a .mdx file to
                  the /posts directory.
                </div>
              ) : (
                posts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/posts/${post.slug}`}
                    className="block group cursor-pointer"
                  >
                    <article>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
                          {post.title}
                        </h3>
                        <time className="text-sm text-gray-500 ml-4 flex-shrink-0">
                          {post.date}
                        </time>
                      </div>
                      {post.subtitle && (
                        <p className="text-gray-600 text-sm">{post.subtitle}</p>
                      )}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </article>
                  </Link>
                ))
              )}
            </div>
            {posts.length > 0 && (
              <Link
                href="/posts"
                className="block text-center text-gray-600 hover:text-gray-900 text-sm transition-colors"
              >
                View all posts →
              </Link>
            )}
          </div>
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Projects</h2>
            <div className="space-y-6">
              {projects.map((project, index) => (
                <article key={index} className="group cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
                      {project.name}
                    </h3>
                    <time className="text-sm text-gray-500 ml-4 flex-shrink-0">
                      {project.date}
                    </time>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Books</h2>
            <div className="space-y-6">
              {books.map((book, index) => (
                <article key={index} className="group cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
                      {book.title}
                    </h3>
                    <time className="text-sm text-gray-500 ml-4 flex-shrink-0">
                      {book.date}
                    </time>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-gray-600 text-sm">{book.author}</p>
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        book.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {book.status}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

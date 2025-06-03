import React from "react";
import { Mail, ExternalLink } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaGithub, FaLinkedin } from "react-icons/fa";

interface Project {
  name: string;
  date: string;
  link: string;
}

interface Posts {
  title: string;
  date: string;
  subtitle?: string;
  link?: string;
}

export default function Home() {
  const posts: Posts[] = [
    {
      title: "Comprehensive Rust by Google",
      date: "Mar 15, 2025",
    },
    {
      title: "Using Nix for Everything",
      date: "Oct 10, 2024",
    },
    {
      title: "Next.js Conf 2024 Cursor Animation",
      date: "Oct 3, 2024",
    },
    {
      title: "Nix maintainer demographics",
      date: "Oct 2, 2024",
    },
    {
      title: "Visual Studio Code Extension Development Kit",
      date: "Oct 1, 2024",
    },
  ];

  const projects = [
    {
      name: "kyswtn.com",
      date: "Feb 26, 2025",
      link: "",
    },
    {
      name: "vscode-vercel-website",
      date: "Nov 27, 2024",
      link: "",
    },
    {
      name: "unocss-preset-radix-colors",
      date: "Sep 15, 2024",
      link: "",
    },
    {
      name: "vscode-vercel",
      date: "Sep 2, 2024",
      link: "",
    },
    {
      name: "vedk",
      date: "Aug 20, 2024",
      link: "",
    },
    {
      name: "terraform-provider-porkbun",
      date: "Apr 26, 2024",
      link: "",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto p-8  font-mono">
      <div className="flex items-start gap-6 mb-8">
        <Avatar className="w-18 h-18">
          <AvatarImage
            src="Circlevis.png"
            alt="evis"
            className="border border-gray-800 rounded-full"
          />
          <AvatarFallback>Ed</AvatarFallback>
        </Avatar>
        <Header />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols12 gap-12">
        <div>
          <h2 className="text-xl font-bold mb-6">Posts</h2>
          <PostList posts={posts} />
        </div>
        <div>
          <h2 className="text-xl font-bold mb-6">Projects</h2>
          <ProjectList projects={projects} />
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="flex-1">
      <h1 className="text-2xl font-bold mb-1">Evis</h1>
      <p className="text-gray-600 mb-4">Always building</p>
      <p className="text-gray-600 mb-4">
        I like to build stuff and i like to learn stuff.
      </p>
      <div className="mb-6">
        <SocialLinks />
      </div>
    </div>
  );
}

function SocialLinks() {
  return (
    <div className="flex gap-4 mb-6">
      <FaGithub className="w-5 h-5 text-gray-600 hover:text-black cursor-pointer transition-colors" />
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
      <Mail className="w-5 h-5 text-gray-600 hover:text-black cursor-pointer transition-colors" />
    </div>
  );
}

function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <div className="space-y-3">
      {projects.map((project, index) => (
        <div
          key={index}
          className="flex justify-between items-center group cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <span className="text-gray-900 group-hover:text-blue-600 transition-colors">
              {project.name}
            </span>
            <ExternalLink className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="text-sm text-gray-500">{project.date}</span>
        </div>
      ))}
    </div>
  );
}

function PostList({ posts }: { posts: Posts[] }) {
  return (
    <div className="space-y-4">
      {posts.map((post, index) => (
        <div
          key={index}
          className="flex justify-between items-start group cursor-pointer"
        >
          <div className="flex-1">
            <h3 className="text-gray-900 group-hover:text-blue-600 transition-colors">
              {post.title}
            </h3>
            {post.subtitle && (
              <p className="text-sm text-gray-500">{post.subtitle}</p>
            )}
          </div>
          <span className="text-sm text-gray-500 ml-4 whitespace-nowrap">
            {post.date}
          </span>
        </div>
      ))}
    </div>
  );
}

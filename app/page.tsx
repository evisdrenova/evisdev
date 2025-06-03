import React from "react";
import { Mail, Twitter, Github, Rss, ExternalLink } from "lucide-react";

const Portfolio = () => {
  const posts = [
    {
      title: "Comprehensive Rust by Google",
      subtitle: "study notes",
      date: "Mar 15, 2025",
      isStudyNotes: true,
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
    },
    {
      name: "vscode-vercel-website",
      date: "Nov 27, 2024",
    },
    {
      name: "unocss-preset-radix-colors",
      date: "Sep 15, 2024",
    },
    {
      name: "vscode-vercel",
      date: "Sep 2, 2024",
    },
    {
      name: "vedk",
      date: "Aug 20, 2024",
    },
    {
      name: "terraform-provider-porkbun",
      date: "Apr 26, 2024",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white border-4 border-black rounded-lg shadow-2xl font-mono">
      {/* Header Section */}
      <div className="flex items-start gap-6 mb-8">
        {/* Avatar */}
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center border-2 border-gray-300">
          <div className="w-12 h-12 bg-gray-800 rounded-full relative">
            {/* Simple avatar illustration */}
            <div className="absolute top-2 left-3 w-6 h-4 bg-white rounded-full"></div>
            <div className="absolute top-6 left-2 w-8 h-6 bg-white rounded-b-full"></div>
          </div>
        </div>

        {/* Name and Title */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-1">Kyaw</h1>
          <p className="text-gray-600 mb-4">Software Engineer</p>

          {/* About Section */}
          <div className="mb-6">
            <p className="text-gray-700 leading-relaxed">
              Perhaps you want to learn more about me?
            </p>
          </div>

          {/* Social Links */}
          <div className="flex gap-4 mb-6">
            <Mail className="w-5 h-5 text-gray-600 hover:text-black cursor-pointer" />
            <div className="w-5 h-5 bg-gray-600 hover:bg-black cursor-pointer"></div>
            <Twitter className="w-5 h-5 text-gray-600 hover:text-black cursor-pointer" />
            <Github className="w-5 h-5 text-gray-600 hover:text-black cursor-pointer" />
            <Rss className="w-5 h-5 text-gray-600 hover:text-black cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Posts Section */}
        <div>
          <h2 className="text-xl font-bold mb-6">Posts</h2>
          <div className="space-y-4">
            {posts.map((post, index) => (
              <div
                key={index}
                className="flex justify-between items-start group cursor-pointer"
              >
                <div className="flex-1">
                  <h3 className="text-gray-900 group-hover:text-blue-600 transition-colors">
                    {post.title}
                    {post.isStudyNotes && (
                      <span className="text-xs text-orange-500 italic ml-2">
                        study notes
                      </span>
                    )}
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

          <div className="mt-6 text-sm text-gray-600">
            See /micro for more frequent updates. 🌿
          </div>
        </div>

        {/* Projects Section */}
        <div>
          <h2 className="text-xl font-bold mb-6">Projects</h2>

          {/* Project Screenshots */}
          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-4">
              A few screengrabs from some of my recent <em>personal</em> works.
            </p>

            {/* Mock project screenshots */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-lg p-4 h-24 border relative">
                <div className="absolute inset-2 bg-white rounded opacity-80"></div>
                <div className="absolute top-3 left-3 w-8 h-8 bg-green-500 rounded"></div>
                <div className="absolute top-3 right-3 w-6 h-6 bg-blue-500 rounded transform rotate-45"></div>
              </div>
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg p-4 h-24 border relative">
                <div className="absolute inset-2 bg-white rounded opacity-80"></div>
                <div className="absolute top-2 left-2 right-2 h-2 bg-gray-300 rounded"></div>
                <div className="absolute top-6 left-2 right-6 h-1 bg-gray-200 rounded"></div>
                <div className="absolute top-8 left-2 right-4 h-1 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>

          {/* Project List */}
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
        </div>
      </div>
    </div>
  );
};

export default Portfolio;

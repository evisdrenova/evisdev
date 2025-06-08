"use client";
import React, { useState } from "react";
import Link from "next/link";

export interface BookMetadata {
  title: string;
  rating: number;
  author: string;
  comment?: string;
}

const books: BookMetadata[] = [
  {
    title: "The Art of Computer Programming",
    rating: 9.5,
    author: "Donald E. Knuth",
    comment:
      "The bible of computer science. Dense but incredibly comprehensive. Every programmer should at least attempt to read volume 1.",
  },
  {
    title: "Ask Your Developer",
    rating: 7.2,
    author: "Jeff Lawson",
    comment:
      "Good insights on developer culture and building tech teams. Some repetitive points but valuable for non-technical leaders.",
  },
  {
    title: "Build a Large Language Model (From Scratch)",
    rating: 8.8,
    author: "Sebastian Raschka",
    comment:
      "Excellent hands-on approach to understanding LLMs. Clear explanations and practical code examples make complex concepts accessible.",
  },
  {
    title: "Death's End",
    rating: 8.1,
    author: "Liu Cixin",
    comment:
      "Ambitious conclusion to the trilogy with mind-bending concepts. Sometimes gets lost in its own scope but delivers emotional payoff.",
  },
  {
    title: "Designing Data-Intensive Applications",
    rating: 9.3,
    author: "Martin Kleppmann",
    comment:
      "Essential reading for any backend engineer. Incredibly thorough coverage of distributed systems with practical real-world examples.",
  },
  {
    title: "Founders at Work",
    rating: 8.4,
    author: "Jessica Livingston",
    comment:
      "Fascinating collection of startup origin stories. Shows the messy reality behind successful companies and common founder challenges.",
  },
  {
    title: "Going Infinite",
    rating: 7.8,
    author: "Michael Lewis",
    comment:
      "Lewis's signature storytelling applied to the FTX collapse. Engaging narrative but sometimes feels too sympathetic to SBF.",
  },
  {
    title: "Misbehaving",
    rating: 8.2,
    author: "Richard H. Thaler",
    comment:
      "Great introduction to behavioral economics. Thaler's personal journey makes economic theory surprisingly engaging and accessible.",
  },
  {
    title: "The Rust Programming Language",
    rating: 9.1,
    author: "Steve Klabnik and Carol Nichols",
    comment:
      "The definitive Rust guide. Excellent progression from basics to advanced concepts. Makes Rust's ownership model finally click.",
  },
  {
    title: "Sandworm",
    rating: 8.6,
    author: "Andy Greenberg",
    comment:
      "Terrifying look at state-sponsored cyberwarfare. Reads like a thriller but grounded in real events and technical detail.",
  },
  {
    title: "The Fund",
    rating: 7.5,
    author: "Rob Copeland",
    comment:
      "Inside look at Bridgewater's toxic culture. Well-researched exposé but gets repetitive in its criticism of Dalio's methods.",
  },
  {
    title: "The God Equation",
    rating: 6.9,
    author: "Michio Kaku",
    comment:
      "Accessible overview of physics' biggest questions. Good for general audiences but lacks depth for anyone with physics background.",
  },
  {
    title: "The Dark Forest",
    rating: 9.0,
    author: "Liu Cixin",
    comment:
      "Best book in the trilogy. The dark forest theory is genuinely chilling and the Wallfacer concept is brilliantly executed.",
  },
  {
    title: "The NVIDIA Way",
    rating: 8.3,
    author: "Tae Kim",
    comment:
      "Timely look at Jensen Huang's leadership and NVIDIA's AI dominance. Good business insights though somewhat hagiographic.",
  },
  {
    title: "The Three-Body Problem",
    rating: 8.7,
    author: "Liu Cixin",
    comment:
      "Groundbreaking hard sci-fi that changed how I think about first contact. Cultural Revolution backdrop adds unique weight to the story.",
  },
  {
    title: "Why Machines Learn",
    rating: 8.9,
    author: "Anil Ananthaswamy",
    comment:
      "Best explanation of machine learning mathematics I've read. Makes complex concepts intuitive without sacrificing rigor.",
  },
];

interface PopoverProps {
  children: React.ReactNode;
  content: string;
  isVisible: boolean;
}

function Popover({ children, content, isVisible }: PopoverProps) {
  return (
    <div className="relative">
      {children}
      {isVisible && (
        <div className="absolute left-full top-0 ml-4 z-50 w-72 p-3 bg-white border border-black rounded shadow-sm">
          <div className="text-sm text-gray-900 leading-relaxed">{content}</div>
        </div>
      )}
    </div>
  );
}

export default function BookList() {
  const [hoveredBook, setHoveredBook] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Books</h2>
      <div className="space-y-4">
        {books.map((book: BookMetadata, index) => (
          <div key={book.title} className="block group cursor-pointer">
            <article key={index} className="group cursor-pointer">
              <Popover
                content={book.comment || "No comment available."}
                isVisible={hoveredBook === book.title}
              >
                <div
                  className="flex justify-between items-start mb-2"
                  onMouseEnter={() => setHoveredBook(book.title)}
                  onMouseLeave={() => setHoveredBook(null)}
                >
                  <div className="text-sm font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
                    {book.title}
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-gray-900 min-w-[2rem]">
                        {book.rating.toFixed(1)} / 10
                      </span>
                    </div>
                  </div>
                </div>
              </Popover>
            </article>
          </div>
        ))}
      </div>
      <div className="mt-10">
        {books.length > 0 && (
          <Link
            href="/posts"
            className="block text-center text-gray-600 hover:text-gray-900 text-sm transition-colors"
          >
            View all Books →
          </Link>
        )}
      </div>
    </div>
  );
}

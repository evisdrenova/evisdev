"use client";
import { ArrowDown, ArrowUp } from "lucide-react";
import React, { useState } from "react";
export interface BookMetadata {
  title: string;
  rating: number;
  author: string;
  comment?: string;
}

const books: BookMetadata[] = [
  {
    title: "The Rust Programming Language",
    rating: 9.1,
    author: "Steve Klabnik and Carol Nichols",
    comment:
      "Definitive Rust guide. Covers basics all of the way to advanced concepts. Makes Rust's ownership model finally click.",
  },
  {
    title: "Build a Large Language Model (From Scratch)",
    rating: 8.8,
    author: "Sebastian Raschka",
    comment:
      "Excellent hands-on approach to understanding LLMs. Clear explanations and practical code examples make complex concepts accessible.",
  },
  {
    title: "Why Machines Learn",
    rating: 9.5,
    author: "Anil Ananthaswamy",
    comment:
      "Best explanation of machine learning mathematics I've read. Makes complex concepts intuitive without sacrificing rigor.",
  },
  {
    title: "Designing Data-Intensive Applications",
    rating: 9.0,
    author: "Martin Kleppmann",
    comment:
      "Classic read for any engineer - not just backend. Thorough coverage of distributed systems with practical real-world examples.",
  },
  {
    title: "The NVIDIA Way",
    rating: 8.7,
    author: "Tae Kim",
    comment: "Great cover of the NVIDIA story and Jensen's leadership.",
  },
  {
    title: "The Art of Computer Programming",
    rating: 9.8,
    author: "Donald E. Knuth",
    comment:
      "Amazing and a must read for every engineer. Dense but incredibly comprehensive.",
  },
  {
    title: "Misbehaving",
    rating: 8.6,
    author: "Richard H. Thaler",
    comment:
      "Great introduction to behavioral economics. Very cool to take a class with him in real life. ",
  },
  {
    title: "Sandworm",
    rating: 8.1,
    author: "Andy Greenberg",
    comment:
      "Reads like a thriller but grounded in real events and technical detail. A little dense at times.",
  },
  {
    title: "The Fund",
    rating: 8.1,
    author: "Rob Copeland",
    comment: "Well-researched inside look at Bridgewater and Dalio.",
  },
  {
    title: "Founders at Work",
    rating: 8.0,
    author: "Jessica Livingston",
    comment:
      "I love startup origin stories. Fun to read. Wish there was an updated version. ",
  },
  {
    title: "Going Infinite",
    rating: 7.6,
    author: "Michael Lewis",
    comment:
      "I think I've read every Michael Lewis book and this one is a class Lewis read. Engaging narrative.",
  },
  {
    title: "The God Equation",
    rating: 7.2,
    author: "Michio Kaku",
    comment: "Pretty good but I wish it was more in-depth and not so general.",
  },
  {
    title: "Death's End",
    rating: 7.4,
    author: "Liu Cixin",
    comment: "An okay read. I think it time traveled a little too much",
  },
  {
    title: "The Dark Forest",
    rating: 9.3,
    author: "Liu Cixin",
    comment: "Best book in the trilogy by far.",
  },
  {
    title: "The Three-Body Problem",
    rating: 8.7,
    author: "Liu Cixin",
    comment: "Overall, enjoyed this read although it is a little dry at times.",
  },
  {
    title: "Ask Your Developer",
    rating: 7.2,
    author: "Jeff Lawson",
    comment:
      "Good insights on developer culture and building tech teams. Some repetitive points but valuable for non-technical leaders.",
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
  const [visibleCount, setVisibleCount] = useState(7);

  const visibleBooks = books.slice(0, visibleCount);
  const hasMoreBooks = visibleCount < books.length;

  const loadMore = () => {
    setVisibleCount(books.length);
  };

  const loadLess = () => {
    setVisibleCount(7);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Books</h2>
      <div className="space-y-4">
        {visibleBooks.map((book: BookMetadata, index) => (
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
      <div className="mt-10 flex justify-center">
        {hasMoreBooks ? (
          <button
            onClick={loadMore}
            className="flex flex-row items-center gap-2 text-gray-600 hover:text-gray-900 text-sm transition-colors cursor-pointer"
          >
            Load more ({books.length - visibleCount} more){" "}
            <ArrowDown size="16" />
          </button>
        ) : (
          <button
            onClick={loadLess}
            className="flex flex-row items-center gap-2 text-gray-600 hover:text-gray-900 text-sm transition-colors cursor-pointer"
          >
            <div>Collapse</div> <ArrowUp size="16" />
          </button>
        )}
      </div>
    </div>
  );
}

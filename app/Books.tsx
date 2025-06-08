import React from "react";
import Link from "next/link";

export interface BookMetadata {
  title: string;
  rating: number;
  author: string;
}

const books: BookMetadata[] = [
  {
    title: "The Art of Computer Programming",
    rating: 9.5,
    author: "Donald E. Knuth",
  },
  {
    title: "Ask Your Developer",
    rating: 7.2,
    author: "Jeff Lawson",
  },
  {
    title: "Build a Large Language Model (From Scratch)",
    rating: 8.8,
    author: "Sebastian Raschka",
  },
  {
    title: "Death's End",
    rating: 8.1,
    author: "Liu Cixin",
  },
  {
    title: "Designing Data-Intensive Applications",
    rating: 9.3,
    author: "Martin Kleppmann",
  },
  {
    title: "Founders at Work",
    rating: 8.4,
    author: "Jessica Livingston",
  },
  {
    title: "Going Infinite",
    rating: 7.8,
    author: "Michael Lewis",
  },
  {
    title: "Misbehaving",
    rating: 8.2,
    author: "Richard H. Thaler",
  },
  {
    title: "The Rust Programming Language",
    rating: 9.1,
    author: "Steve Klabnik and Carol Nichols",
  },
  {
    title: "Sandworm",
    rating: 8.6,
    author: "Andy Greenberg",
  },
  {
    title: "The Fund",
    rating: 7.5,
    author: "Rob Copeland",
  },
  {
    title: "The God Equation",
    rating: 6.9,
    author: "Michio Kaku",
  },
  {
    title: "The Dark Forest",
    rating: 9.0,
    author: "Liu Cixin",
  },
  {
    title: "The NVIDIA Way",
    rating: 8.3,
    author: "Tae Kim",
  },
  {
    title: "The Three-Body Problem",
    rating: 8.7,
    author: "Liu Cixin",
  },
  {
    title: "Why Machines Learn",
    rating: 8.9,
    author: "Anil Ananthaswamy",
  },
];

export default function BookList() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Books</h2>
      <div className="space-y-4">
        {books.map((book: BookMetadata, index) => (
          <div key={book.title} className="block group cursor-pointer">
            <article key={index} className="group cursor-pointer">
              <div className="flex justify-between items-start mb-2">
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

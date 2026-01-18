"use client";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Image from "next/image";

export default function Header() {
  return (
    <div className="mb-16">
      <div className="flex flex-col sm:flex-row items-start gap-6">
        <div>
          <Image
            src="/header_image.jpg"
            alt="evis"
            className="border border-gray-800 rounded-full"
            width="130"
            height="180"
          />
        </div>
        <div className="flex-1 ">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:mb-0 mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-300 sm:mb-2">
              Evis Drenova
            </h1>
            <div className="flex gap-4">
              <Link href="https://github.com/evisdrenova" target="_blank">
                <FaGithub className="w-5 h-5 text-gray-900 dark:text-gray-200 cursor-pointer transition-colors" />
              </Link>
              <Link href="https://x.com/evisdrenova" target="_blank">
                <div className="w-5 h-5 flex items-center justify-center cursor-pointer group">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4  text-gray-900 dark:text-gray-200 transition-colors fill-current"
                    aria-label="X (formerly Twitter)"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </div>
              </Link>
              <Link
                href="https://www.linkedin.com/in/evisdrenova"
                target="_blank"
              >
                <FaLinkedin className="w-5 h-5 text-gray-900 dark:text-gray-200  cursor-pointer transition-colors" />
              </Link>
            </div>
          </div>
          <p className="text-gray-600 text-sm dark:text-gray-400 mb-5 w-full sm:w-[70%] ">
            <span>
              Hey, I&apos;m Evis. I like to write code and learn new
              things.{" "}
            </span>
            <br />
            <br />
            <span>
              I previously co-founded Neosync, an open source data security
              company that specialized in synthetic data. Neosync was acquired
              by Grow Therapy, a leading behavorial healthtech backed by
              Sequoia.
            </span>
            <br />
            <br />
            <span>
              I&apos;m focused on exploring topics in artificial intelligence,
              brain computer interfaces and privacy engineering.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

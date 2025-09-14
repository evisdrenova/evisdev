import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="">
      <div className="h-[300px] flex justify-center mb-20">
        <div className="flex gap-4 items-end">
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
          <Link href="https://www.linkedin.com/in/evisdrenova" target="_blank">
            <FaLinkedin className="w-5 h-5 text-gray-900 dark:text-gray-200  cursor-pointer transition-colors" />
          </Link>
        </div>
      </div>
    </div>
  );
}

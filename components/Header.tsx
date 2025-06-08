import { Github } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { FaLinkedin } from "react-icons/fa";

export default function Header() {
  return (
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
          <div className="flex flex-row items-center gap-2 justify-between">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Evis</h1>
            <ThemeToggle />
          </div>
          <p className="text-gray-600 mb-3">Always building and learning</p>
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
          </div>
        </div>
      </div>
    </header>
  );
}

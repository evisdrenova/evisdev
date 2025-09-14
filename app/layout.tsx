import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import localFont from "next/font/local";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Evis Drenova",
  description:
    "I like to build and learn stuff. Explore my posts, projects, and reading list.",
  keywords: [
    "developer",
    "software engineer",
    "rust",
    "typescript",
    "react",
    "blog",
    "projects",
  ],
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }],
    apple: { url: "/apple-touch-icon.png" },
  },
  creator: "Evis",
  publisher: "Evis",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const iowan = localFont({
  src: [
    {
      path: "../public/fonts/bitstream-iowan-old-style-bt-586c36a8d7712.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/bitstream-iowan-old-style-italic-bt-586c3740dc396.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/bitstream-iowan-old-style-bold-bt-586c371d8d669.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/bitstream-iowan-old-style-bold-italic-bt-586c37701cb62.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../public/fonts/bitstream-iowan-old-style-black-bt-586c36e930225.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../public/fonts/bitstream-iowan-old-style-black-italic-bt-586c378f12ca1.ttf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-iowan",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${iowan.variable}`}>
      <body suppressHydrationWarning={true}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

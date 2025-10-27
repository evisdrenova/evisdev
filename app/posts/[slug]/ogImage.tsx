import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/posts.server";

export const runtime = "edge";

export const alt = "Blog Post";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

type Params = { slug: string };

export default async function Image({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 128,
            background: "white",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Post Not Found
        </div>
      ),
      {
        ...size,
      }
    );
  }

  const fontData = await fetch(
    new URL(
      "../../../public/fonts/bitstream-iowan-old-style-bold-bt-586c371d8d669.ttf",
      import.meta.url
    )
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(to bottom right, #ffffff, #f3f4f6)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            gap: "24px",
          }}
        >
          <h1
            style={{
              fontSize: 72,
              fontWeight: "bold",
              color: "#111827",
              textAlign: "center",
              lineHeight: 1.2,
              maxWidth: "900px",
            }}
          >
            {post.title}
          </h1>
          <div
            style={{
              fontSize: 24,
              color: "#374151",
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <time>
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </time>
          </div>
          {post.subtitle && (
            <p
              style={{
                fontSize: 32,
                color: "#6b7280",
                textAlign: "center",
                marginTop: "20px",
                maxWidth: "800px",
              }}
            >
              {post.subtitle}
            </p>
          )}
          <div
            style={{
              position: "absolute",
              bottom: "40px",
              fontSize: 28,
              color: "#9ca3af",
            }}
          >
            Evis Drenova
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Iowan",
          data: fontData,
          style: "normal",
          weight: 700,
        },
      ],
    }
  );
}

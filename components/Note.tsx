import { ReactNode } from "react";

interface NoteProps {
  children: ReactNode;
}

export default function Note({ children }: NoteProps) {
  return (
    <div
      style={{
        border: "2px solid #EBEBEB",
        padding: "1rem",
        margin: "1.5rem 0",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
        lineHeight: "1.6",
      }}
      className="note-container"
    >
      {children}
    </div>
  );
}

"use client";

import { useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css"; // gaya default Quill

export default function RichTextEditor({ value, onChange }) {
  const { quill, quillRef } = useQuill({
    theme: "snow",
    modules: {
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image", "blockquote", "code-block"],
        [{ align: [] }],
        ["clean"],
      ],
    },
    placeholder: "Tulis isi berita di sini...",
  });

  // Sinkronisasi data editor ke state parent
  useEffect(() => {
    if (quill) {
      quill.root.innerHTML = value || "";
      quill.on("text-change", () => {
        onChange(quill.root.innerHTML);
      });
    }
  }, [quill]);

  return (
    <div
      className="border border-black rounded-lg min-h-[200px] bg-white"
      ref={quillRef}
    />
  );
}

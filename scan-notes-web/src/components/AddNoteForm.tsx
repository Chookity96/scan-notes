import { useEffect, useState } from "react";
import type { Note } from "../types";

interface AddNoteFormProps {
  onAdd: (note: Note) => void;
  selectedScanId: number;
}

export default function AddNoteForm({
  onAdd,
  selectedScanId,
}: Readonly<AddNoteFormProps>) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    setTitle("");
    setContent("");
  }, [selectedScanId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    onAdd({ title, content });
    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 mt-4">
      <h3 className="font-semibold">Add New Note</h3>
      <input
        type="text"
        placeholder="Title"
        className="w-full p-2 rounded text-gray-950 dark:text-gray-50 placeholder:text-gray-800 placeholder:dark:text-gray-400  bg-gray-300 dark:bg-gray-800 outline-none"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Content"
        className="w-full p-2 rounded text-gray-950 dark:text-gray-50 placeholder:text-gray-800 placeholder:dark:text-gray-400 bg-gray-300 dark:bg-gray-800 outline-none"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button
        type="submit"
        className="bg-blue-700 text-white rounded hover:bg-blue-600 px-4 py-1"
      >
        Add Note
      </button>
    </form>
  );
}

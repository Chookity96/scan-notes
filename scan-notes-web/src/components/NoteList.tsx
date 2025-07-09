import type { Note } from "../types";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: Readonly<NoteListProps>) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Notes</h3>
      {notes.length === 0 && <p>No notes yet.</p>}
      {notes.map((note, index) => (
        <div
          key={index}
          className="border border-gray-200 dark:border-gray-600 p-2 rounded bg-gray-300 dark:bg-gray-800 shadow"
        >
          <strong>{note.title}</strong>
          <p>{note.content}</p>
        </div>
      ))}
    </div>
  );
}

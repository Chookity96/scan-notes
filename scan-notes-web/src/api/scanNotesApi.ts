import type { Note, Scan } from "../types";

const BASE_URL = "http://localhost:7075";

export const getScans = async (): Promise<Scan[]> => {
  const res = await fetch(`${BASE_URL}/scans`);
  if (!res.ok) throw new Error("Failed to fetch scans");

  return res.json();
};

export const getNotesByScanId = async (scanId: number): Promise<Note[]> => {
  const res = await fetch(`${BASE_URL}/scans/${scanId}/notes`);
  if (!res.ok) throw new Error(`Failed to fetch notes for scan id: ${scanId}`);

  return res.json();
};

export const addNoteByScanId = async (
  scanId: number,
  note: Note
): Promise<void> => {
  const res = await fetch(`${BASE_URL}/scans/${scanId}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });

  if (!res.ok) throw new Error("Failed to add note, please try again.");
};

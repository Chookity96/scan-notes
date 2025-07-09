import { useEffect } from "react";
import type { Note } from "../types";
import ScanList from "../components/ScanList";
import NoteList from "../components/NoteList";
import AddNoteForm from "../components/AddNoteForm";
import Header from "../components/Header";
import { useAppDispatch, useAppSelector } from "../store/rootTypes";
import { noteSelector, scanSelector } from "../store/selector";
import { fetchScans } from "../store/scanSlice";
import { addNote, fetchNotes } from "../store/noteSlice";

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { scans, selectedScanId } = useAppSelector(scanSelector);
  const {
    notes,
    loading: loadingNotes,
    error: errorNotes,
  } = useAppSelector(noteSelector);

  useEffect(() => {
    dispatch(fetchScans());
  }, [dispatch]);

  useEffect(() => {
    if (selectedScanId !== null) {
      dispatch(fetchNotes(selectedScanId));
    }
  }, [selectedScanId]);

  const handleAddNote = async (note: Note) => {
    if (selectedScanId === null) return;
    await dispatch(addNote({ scanId: selectedScanId, note }));
  };
  const selectedScan = scans.find((s) => s.id === selectedScanId);

  const currentNotes =
    selectedScanId !== null ? notes[selectedScanId] || [] : [];

  return (
    <>
      <Header />
      <div className="flex h-[calc(85vh)] border-gray-100 dark:border-gray-800 bg-blue-100 dark:bg-gray-950 rounded-lg">
        <ScanList scans={scans} selectedId={selectedScanId} />
        <main className="flex-1 p-6 space-y-6 overflow-auto">
          {selectedScanId !== null && selectedScan ? (
            <>
              <h2 className="text-2xl font-bold">Scan #{selectedScan.id}</h2>
              <div className="space-y-2 font-semibold">
                <p className="text-gray-800 dark:text-gray-300">
                  Name: {selectedScan.patientName}
                </p>
                <p className="text-gray-800 dark:text-gray-300">
                  Date: {new Date(selectedScan.date).toLocaleDateString()}
                </p>
                <p className="text-gray-800 dark:text-gray-300">
                  Type: {selectedScan.type}
                </p>
              </div>

              {loadingNotes ? (
                <p>Loading notes...</p>
              ) : (
                <NoteList notes={currentNotes} />
              )}
              {errorNotes && <p className="text-red-500">{errorNotes}</p>}
              <AddNoteForm
                onAdd={handleAddNote}
                selectedScanId={selectedScanId}
              />
            </>
          ) : (
            <p>Select a scan to view notes.</p>
          )}
        </main>
      </div>
    </>
  );
}

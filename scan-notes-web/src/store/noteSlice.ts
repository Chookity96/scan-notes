import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addNoteByScanId, getNotesByScanId } from "../api/scanNotesApi";
import type { Note } from "../types";

interface NoteState {
  loading: boolean;
  error: string | null;
  notes: Record<number, Note[]>;
}

const initialState: NoteState = {
  loading: false,
  error: null,
  notes: {},
};

export const fetchNotes = createAsyncThunk(
  "note/fetchNotes",
  async (scanId: number) => {
    const notes = await getNotesByScanId(scanId);
    return { scanId, notes };
  }
);

export const addNote = createAsyncThunk(
  "note/addNote",
  async ({ scanId, note }: { scanId: number; note: Note }) => {
    await addNoteByScanId(scanId, note);
    return { scanId, note };
  }
);

const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.loading = false;
        const { scanId, notes } = action.payload;
        state.notes[scanId] = notes;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || `Failed to fetch notes for scan id:`;
      })
      .addCase(addNote.fulfilled, (state, action) => {
        const { scanId, note } = action.payload;
        if (!state.notes[scanId]) state.notes[scanId] = [];
        state.notes[scanId].push(note);
      });
  },
});

export const { actions: noteActions } = noteSlice;
export default noteSlice.reducer;

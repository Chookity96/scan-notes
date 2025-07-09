import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { getScans } from "../api/scanNotesApi";
import type { Scan } from "../types";

interface ScanState {
  selectedScanId: number | null;
  loading: boolean;
  error: string | null;
  scans: Scan[];
}

const initialState: ScanState = {
  selectedScanId: null,
  loading: false,
  error: null,
  scans: [],
};

export const fetchScans = createAsyncThunk("scan/fetchScans", async () => {
  const response = await getScans();
  return response;
});

const scanSlice = createSlice({
  name: "scan",
  initialState,
  reducers: {
    setSelectedScanId: (state, action: PayloadAction<number | null>) => {
      state.selectedScanId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchScans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchScans.fulfilled, (state, action) => {
        state.loading = false;
        state.scans = action.payload;
      })
      .addCase(fetchScans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch scans";
      });
  },
});

export const { actions: scanActions } = scanSlice;
export default scanSlice.reducer;

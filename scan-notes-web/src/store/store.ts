import { configureStore } from "@reduxjs/toolkit";
import scanReducer from "./scanSlice";
import noteReducer from "./noteSlice";

export const store = configureStore({
  reducer: {
    scan: scanReducer,
    note: noteReducer,
  },
});

import type { RootState } from "./rootTypes";

const scanSelector = (state: RootState) => state.scan;
const noteSelector = (state: RootState) => state.note;

export { scanSelector, noteSelector };

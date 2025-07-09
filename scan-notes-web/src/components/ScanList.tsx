import { useAppDispatch } from "../store/rootTypes";
import { scanActions } from "../store/scanSlice";
import type { Scan } from "../types";

interface Props {
  scans: Scan[];
  selectedId: number | null;
}

export default function ScanList({ scans, selectedId }: Readonly<Props>) {
  const dispatch = useAppDispatch();
  return (
    <aside className="w-64 border-r border-r-black dark:border-r-white p-4">
      <h2 className="font-bold text-lg mb-2">Patient Scans</h2>
      {scans.length === 0 && (
        <p className="whitespace-pre-wrap">
          {"No scans found. \nPlease contact system admin."}
        </p>
      )}
      <ul className="space-y-2">
        {scans.map((scan) => (
          <li key={scan.id}>
            <button
              onClick={() => dispatch(scanActions.setSelectedScanId(scan.id))}
              className={`w-full text-left font-semibold p-2 rounded  ${
                selectedId === scan.id
                  ? "border bg-gray-300 border-gray-200 dark:bg-gray-800 dark:border-gray-600"
                  : "hover:bg-gray-300 dark:hover:bg-gray-800"
              }`}
            >
              Scan #{scan.id} — {new Date(scan.date).toLocaleDateString()}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

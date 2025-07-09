import { Moon, NotebookTabsIcon, Sun } from "lucide-react";
import useDarkMode from "../hooks/useDarkMode";

const Header = () => {
  const { isDark, toggleDarkMode } = useDarkMode();
  return (
    <div
      className={`px-4 pb-2 flex items-center justify-between bg-blue-50 dark:bg-gray-800`}
    >
      <div className="flex items-center gap-1">
        <NotebookTabsIcon className="w-7 h-7 text-black dark:text-white" />
        <h1 className="text-2xl font-semibold dark:text-white">ScanNotes</h1>
      </div>
      <button
        onClick={toggleDarkMode}
        className="p-2 rounded-full bg-transparent text-black dark:text-white hover:bg-gray-200 hover:dark:bg-gray-700 transition-all"
        aria-label="Toggle Dark Mode"
      >
        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>
    </div>
  );
};

export default Header;

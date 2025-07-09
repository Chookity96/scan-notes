import { useEffect, useState } from "react";

export default function useDarkMode() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const html = document.documentElement;

    // Get from localStorage if available
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      html.classList.add("dark");
      setIsDark(true);
    }

    if (storedTheme === "light") {
      html.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  const toggleDarkMode = () => {
    const html = document.documentElement;

    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  return { isDark, toggleDarkMode };
}

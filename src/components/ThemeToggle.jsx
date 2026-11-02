import { useCallback, useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

// The pre-paint script in index.html has already set data-theme by the time
// this mounts; read back from the DOM rather than recomputing, so the two
// can't disagree.
function currentTheme() {
  if (typeof document === "undefined") return "light";
  return document.documentElement.getAttribute("data-theme") === "dark"
    ? "dark"
    : "light";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState(currentTheme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.setAttribute("data-theme", "dark");
    else root.removeAttribute("data-theme");

    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "dark" ? "#141312" : "#ffffff");

    try {
      localStorage.setItem("theme", theme);
    } catch {
      // Private windows can refuse storage; the theme still applies for
      // this visit, it just won't be remembered.
    }
  }, [theme]);

  const toggle = useCallback(
    () => setTheme((t) => (t === "dark" ? "light" : "dark")),
    []
  );

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      data-testid="theme-toggle"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="text-ink/70 transition-colors duration-300 hover:text-ink"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}

"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeSwitch() {
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <button onClick={toggleTheme} className="btn btn-ghost btn-circle">
      {resolvedTheme === "dark" ? (
        <Sun className="w-5 h-5 text-orange-400" suppressHydrationWarning />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </button>
  );
}

"use client";

import { useTheme } from "@/shared/theme/ThemeProvider";

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "다크 모드 켜짐" : "다크 모드 꺼짐"}
      onClick={toggleTheme}
      className={`relative w-12 h-7 rounded-full transition-colors duration-200 ${
        isDark ? "bg-primary" : "bg-line"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow-sm transition-transform duration-200 ${
          isDark ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

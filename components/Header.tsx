"use client";

import { useTheme } from "./ThemeProvider";
import { MoonIcon, SunIcon } from "./Icons";

export function Header() {
  const { theme, toggleTheme, mounted } = useTheme();

  return (
    <header className="flex w-full items-center justify-between">
      <h1 className="text-[26px] font-bold leading-none text-[var(--logo-color)]">
        devfinder
      </h1>
      {mounted ? (
        <button
          onClick={toggleTheme}
          className="flex items-center gap-3 md:gap-4 group"
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          <span className="text-[13px] font-bold uppercase leading-[1.4] tracking-[2.5px] text-[var(--toggle-text)] group-hover:text-[var(--text-primary)]">
            {theme === "light" ? "Dark" : "Light"}
          </span>
          {theme === "light" ? (
            <MoonIcon className="w-5 h-5 text-[var(--toggle-icon)] group-hover:text-[var(--text-primary)]" />
          ) : (
            <SunIcon className="w-5 h-5 text-[var(--toggle-icon)] group-hover:text-[var(--text-primary)]" />
          )}
        </button>
      ) : (
        <div className="flex items-center gap-3 md:gap-4">
          <span className="text-[13px] font-bold uppercase leading-[1.4] tracking-[2.5px] text-[var(--toggle-text)]">
            Dark
          </span>
          <MoonIcon className="w-5 h-5 text-[var(--toggle-icon)]" />
        </div>
      )}
    </header>
  );
}

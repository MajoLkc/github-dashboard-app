"use client";

import { useState } from "react";
import { SearchIcon } from "./Icons";

interface SearchBarProps {
  onSearch: (username: string) => void;
  isLoading: boolean;
  error: string | null;
}

export function SearchBar({ onSearch, isLoading, error }: SearchBarProps) {
  const [username, setUsername] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onSearch(username.trim());
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-[60px] md:h-[69px] w-full items-center justify-between gap-2 rounded-[15px] bg-[var(--card-bg)] px-2.5 py-2 md:pl-6 md:pr-3 shadow-[var(--shadow)]"
    >
      <div className="flex flex-1 items-center gap-2 md:gap-5">
        <SearchIcon className="h-5 w-5 md:h-6 md:w-6 shrink-0 text-[var(--search-icon)]" />
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Search GitHub username..."
          className="flex-1 bg-transparent text-[13px] md:text-[18px] leading-[1.4] text-[var(--text-primary)] placeholder:text-[var(--search-placeholder)] outline-none caret-[var(--blue-500)]"
        />
      </div>
      {error && (
        <span className="hidden md:block text-[15px] font-bold text-[var(--red-500)] mr-4">
          No results
        </span>
      )}
      <button
        type="submit"
        disabled={isLoading}
        className="flex h-[46px] md:h-[50px] items-center justify-center rounded-[10px] bg-[var(--blue-500)] px-4 md:px-6 text-[14px] md:text-[16px] font-bold leading-[1.5] text-white hover:bg-[var(--blue-300)] transition-colors disabled:opacity-70"
      >
        {isLoading ? "..." : "Search"}
      </button>
    </form>
  );
}

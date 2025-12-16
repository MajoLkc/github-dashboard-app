"use client";

import { useState, useEffect } from "react";
import { Header, SearchBar, UserProfile, ErrorState } from "@/components";
import { GitHubUser } from "@/types/github";

async function fetchGitHubUser(username: string): Promise<GitHubUser> {
  const response = await fetch(`https://api.github.com/users/${username}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "User not found");
  }

  return response.json();
}

export default function Home() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Load default user on mount
  useEffect(() => {
    handleSearch("octocat");
  }, []);

  const handleSearch = async (username: string) => {
    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const userData = await fetchGitHubUser(username);
      setUser(userData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] font-[family-name:var(--font-space-mono)]">
      <main className="mx-auto flex min-h-screen max-w-[730px] flex-col gap-6 md:gap-9 px-4 md:px-6 py-8 md:py-[130px] lg:px-0">
        <Header />
        <SearchBar
          onSearch={handleSearch}
          isLoading={isLoading}
          error={error}
        />
        {isLoading && (
          <div className="w-full rounded-[15px] bg-[var(--card-bg)] p-6 md:p-10 lg:p-12 shadow-[var(--shadow)]">
            <div className="flex items-center justify-center py-16">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--blue-500)] border-t-transparent"></div>
            </div>
          </div>
        )}
        {!isLoading && error && hasSearched && <ErrorState error={error} />}
        {!isLoading && user && <UserProfile user={user} />}
      </main>
    </div>
  );
}

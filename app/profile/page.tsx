"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components";
import { useAuth } from "@/contexts/AuthContext";
import { GitHubUser } from "@/types/github";

interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
}

async function fetchGitHubUser(username: string): Promise<GitHubUser> {
  const response = await fetch(`https://api.github.com/users/${username}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "User not found");
  }

  return response.json();
}

async function fetchUserRepos(username: string): Promise<GitHubRepo[]> {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=10`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch repositories");
  }

  return response.json();
}

export default function ProfilePage() {
  const router = useRouter();
  const { user: authUser, isLoading: authLoading } = useAuth();
  const [profileData, setProfileData] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !authUser) {
      router.push("/");
    }
  }, [authUser, authLoading, router]);

  useEffect(() => {
    if (authUser?.login) {
      Promise.all([
        fetchGitHubUser(authUser.login),
        fetchUserRepos(authUser.login),
      ])
        .then(([userData, reposData]) => {
          setProfileData(userData);
          setRepos(reposData);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
  }, [authUser]);

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-[var(--background)] font-[family-name:var(--font-space-mono)]">
        <main className="mx-auto flex min-h-screen max-w-[730px] flex-col gap-6 md:gap-9 px-4 md:px-6 py-8 md:py-[130px] lg:px-0">
          <Header />
          <div className="w-full rounded-[15px] bg-[var(--card-bg)] p-6 md:p-10 lg:p-12 shadow-[var(--shadow)]">
            <div className="flex items-center justify-center py-16">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--blue-500)] border-t-transparent"></div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!authUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[var(--background)] font-[family-name:var(--font-space-mono)]">
      <main className="mx-auto flex min-h-screen max-w-[730px] flex-col gap-6 md:gap-9 px-4 md:px-6 py-8 md:py-[130px] lg:px-0">
        <Header />
        <div className="w-full rounded-[15px] bg-[var(--card-bg)] p-6 md:p-10 lg:p-12 shadow-[var(--shadow)]">
          <div className="flex flex-col md:flex-row gap-6 md:gap-10">
            <div className="flex-shrink-0">
              <img
                src={authUser.avatar_url}
                alt={authUser.login}
                className="w-[70px] h-[70px] md:w-[117px] md:h-[117px] rounded-full"
              />
            </div>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 md:gap-0">
                <div>
                  <h1 className="text-[16px] md:text-[26px] font-bold text-[var(--text-primary)]">
                    {profileData?.name || authUser.name || authUser.login}
                  </h1>
                  <p className="text-[13px] md:text-[16px] text-[var(--blue-500)]">
                    @{authUser.login}
                  </p>
                </div>
                {profileData?.created_at && (
                  <p className="text-[13px] md:text-[15px] text-[var(--text-secondary)]">
                    Joined{" "}
                    {new Date(profileData.created_at).toLocaleDateString(
                      "en-GB",
                      {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </p>
                )}
              </div>

              {profileData?.bio && (
                <p className="mt-5 text-[13px] md:text-[15px] leading-[25px] text-[var(--text-secondary)]">
                  {profileData.bio}
                </p>
              )}

              {profileData && (
                <div className="mt-6 md:mt-8 grid grid-cols-3 gap-4 rounded-[10px] bg-[var(--background)] px-4 md:px-8 py-4 md:py-[18px]">
                  <div className="text-center md:text-left">
                    <p className="text-[11px] md:text-[13px] text-[var(--text-secondary)]">
                      Repos
                    </p>
                    <p className="text-[16px] md:text-[22px] font-bold text-[var(--text-primary)]">
                      {profileData.public_repos}
                    </p>
                  </div>
                  <div className="text-center md:text-left">
                    <p className="text-[11px] md:text-[13px] text-[var(--text-secondary)]">
                      Followers
                    </p>
                    <p className="text-[16px] md:text-[22px] font-bold text-[var(--text-primary)]">
                      {profileData.followers}
                    </p>
                  </div>
                  <div className="text-center md:text-left">
                    <p className="text-[11px] md:text-[13px] text-[var(--text-secondary)]">
                      Following
                    </p>
                    <p className="text-[16px] md:text-[22px] font-bold text-[var(--text-primary)]">
                      {profileData.following}
                    </p>
                  </div>
                </div>
              )}

              {profileData && (
                <div className="mt-6 md:mt-[30px] grid grid-cols-1 md:grid-cols-2 gap-4">
                  {profileData.location && (
                    <div className="flex items-center gap-4 text-[var(--text-secondary)]">
                      <svg
                        className="w-5 h-5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-[13px] md:text-[15px]">
                        {profileData.location}
                      </span>
                    </div>
                  )}
                  {profileData.blog && (
                    <div className="flex items-center gap-4 text-[var(--text-secondary)]">
                      <svg
                        className="w-5 h-5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" />
                      </svg>
                      <a
                        href={
                          profileData.blog.startsWith("http")
                            ? profileData.blog
                            : `https://${profileData.blog}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[13px] md:text-[15px] hover:underline truncate"
                      >
                        {profileData.blog}
                      </a>
                    </div>
                  )}
                  {profileData.twitter_username && (
                    <div className="flex items-center gap-4 text-[var(--text-secondary)]">
                      <svg
                        className="w-5 h-5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                      <a
                        href={`https://twitter.com/${profileData.twitter_username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[13px] md:text-[15px] hover:underline"
                      >
                        @{profileData.twitter_username}
                      </a>
                    </div>
                  )}
                  {profileData.company && (
                    <div className="flex items-center gap-4 text-[var(--text-secondary)]">
                      <svg
                        className="w-5 h-5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-[13px] md:text-[15px]">
                        {profileData.company}
                      </span>
                    </div>
                  )}
                  {authUser.email && (
                    <div className="flex items-center gap-4 text-[var(--text-secondary)]">
                      <svg
                        className="w-5 h-5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      <a
                        href={`mailto:${authUser.email}`}
                        className="text-[13px] md:text-[15px] hover:underline"
                      >
                        {authUser.email}
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {repos.length > 0 && (
          <div className="w-full rounded-[15px] bg-[var(--card-bg)] p-6 md:p-10 lg:p-12 shadow-[var(--shadow)]">
            <h2 className="text-[16px] md:text-[20px] font-bold text-[var(--text-primary)] mb-6">
              Top Repositories
            </h2>
            <div className="flex flex-col gap-4">
              {repos.map((repo) => (
                <div
                  key={repo.id}
                  className="p-4 rounded-[10px] bg-[var(--background)] border border-[var(--border-color)]"
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex items-start justify-between gap-4">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[14px] md:text-[16px] font-bold text-[var(--blue-500)] hover:underline break-all"
                      >
                        {repo.name}
                      </a>
                      <div className="flex items-center gap-1 flex-shrink-0 text-[var(--text-secondary)]">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-[12px] md:text-[13px]">
                          {repo.stargazers_count}
                        </span>
                      </div>
                    </div>
                    {repo.description && (
                      <p className="text-[12px] md:text-[13px] text-[var(--text-secondary)] line-clamp-2">
                        {repo.description}
                      </p>
                    )}
                    <div className="flex items-center gap-4 mt-1 text-[11px] md:text-[12px] text-[var(--text-secondary)]">
                      {repo.language && (
                        <div className="flex items-center gap-1">
                          <span className="w-3 h-3 rounded-full bg-[var(--blue-500)]"></span>
                          <span>{repo.language}</span>
                        </div>
                      )}
                      <span>
                        Updated{" "}
                        {new Date(repo.updated_at).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

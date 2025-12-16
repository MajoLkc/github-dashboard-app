"use client";

import Image from "next/image";
import { GitHubUser } from "@/types/github";
import {
  LocationIcon,
  TwitterIcon,
  WebsiteIcon,
  CompanyIcon,
} from "./Icons";

interface UserProfileProps {
  user: GitHubUser;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();
  return `Joined ${day} ${month} ${year}`;
}

interface LinkItemProps {
  icon: React.ReactNode;
  value: string | null;
  href?: string;
  isAvailable: boolean;
}

function LinkItem({ icon, value, href, isAvailable }: LinkItemProps) {
  const content = (
    <div
      className={`flex items-center gap-4 ${
        !isAvailable ? "opacity-50" : ""
      }`}
    >
      <span className="w-5 shrink-0 text-[var(--text-secondary)]">{icon}</span>
      <span
        className={`text-[13px] md:text-[15px] leading-[1.5] text-[var(--text-secondary)] ${
          href && isAvailable ? "hover:underline" : ""
        }`}
      >
        {isAvailable ? value : "Not Available"}
      </span>
    </div>
  );

  if (href && isAvailable) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return content;
}

export function UserProfile({ user }: UserProfileProps) {
  const blogUrl =
    user.blog && !user.blog.startsWith("http")
      ? `https://${user.blog}`
      : user.blog;

  const twitterUrl = user.twitter_username
    ? `https://twitter.com/${user.twitter_username}`
    : null;

  return (
    <div className="w-full rounded-[15px] bg-[var(--card-bg)] p-6 md:p-10 lg:p-12 shadow-[var(--shadow)]">
      {/* Mobile Layout */}
      <div className="flex flex-col gap-6 lg:hidden">
        {/* Header with Avatar */}
        <div className="flex items-start gap-5">
          <Image
            src={user.avatar_url}
            alt={`${user.login}'s avatar`}
            width={117}
            height={117}
            className="rounded-full w-[70px] h-[70px] md:w-[117px] md:h-[117px] object-cover shrink-0"
          />
          <div className="flex flex-1 flex-col gap-1">
            <h1 className="text-[16px] md:text-[26px] font-bold leading-[1.2] text-[var(--text-primary)]">
              {user.name || user.login}
            </h1>
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] md:text-[16px] leading-[1.5] text-[var(--link-color)] hover:underline"
            >
              @{user.login}
            </a>
            <p className="text-[13px] md:text-[15px] leading-[1.5] text-[var(--text-secondary)] mt-1 md:hidden">
              {formatDate(user.created_at)}
            </p>
          </div>
          <p className="hidden md:block text-[15px] leading-[1.5] text-[var(--text-secondary)]">
            {formatDate(user.created_at)}
          </p>
        </div>

        {/* Bio */}
        <p
          className={`text-[13px] md:text-[15px] leading-[1.5] text-[var(--text-secondary)] ${
            !user.bio ? "opacity-75" : ""
          }`}
        >
          {user.bio || "This profile has no bio"}
        </p>

        {/* Stats */}
        <div className="flex flex-col md:flex-row gap-4 md:justify-between rounded-[10px] bg-[var(--stats-bg)] px-5 py-4 md:px-8">
          <div className="flex flex-col gap-1">
            <span className="text-[11px] md:text-[13px] leading-[1.5] text-[var(--text-secondary)]">
              Repos
            </span>
            <span className="text-[16px] md:text-[22px] font-bold leading-[1.4] text-[var(--text-primary)]">
              {user.public_repos}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[11px] md:text-[13px] leading-[1.5] text-[var(--text-secondary)]">
              Followers
            </span>
            <span className="text-[16px] md:text-[22px] font-bold leading-[1.4] text-[var(--text-primary)]">
              {user.followers}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[11px] md:text-[13px] leading-[1.5] text-[var(--text-secondary)]">
              Following
            </span>
            <span className="text-[16px] md:text-[22px] font-bold leading-[1.4] text-[var(--text-primary)]">
              {user.following}
            </span>
          </div>
        </div>

        {/* Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <LinkItem
            icon={<LocationIcon className="w-[14px] h-5" />}
            value={user.location}
            isAvailable={!!user.location}
          />
          <LinkItem
            icon={<TwitterIcon className="w-5 h-[18px]" />}
            value={user.twitter_username ? `@${user.twitter_username}` : null}
            href={twitterUrl || undefined}
            isAvailable={!!user.twitter_username}
          />
          <LinkItem
            icon={<WebsiteIcon className="w-5 h-5" />}
            value={user.blog || null}
            href={blogUrl || undefined}
            isAvailable={!!user.blog}
          />
          <LinkItem
            icon={<CompanyIcon className="w-5 h-5" />}
            value={user.company}
            isAvailable={!!user.company}
          />
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex gap-8">
        <Image
          src={user.avatar_url}
          alt={`${user.login}'s avatar`}
          width={117}
          height={117}
          className="rounded-full w-[117px] h-[117px] object-cover shrink-0"
        />
        <div className="flex flex-1 flex-col gap-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-0.5">
              <h1 className="text-[26px] font-bold leading-[1.2] text-[var(--text-primary)]">
                {user.name || user.login}
              </h1>
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[16px] leading-[1.5] text-[var(--link-color)] hover:underline"
              >
                @{user.login}
              </a>
            </div>
            <p className="text-[15px] leading-[1.5] text-[var(--text-secondary)]">
              {formatDate(user.created_at)}
            </p>
          </div>

          {/* Bio */}
          <p
            className={`text-[15px] leading-[1.5] text-[var(--text-secondary)] ${
              !user.bio ? "opacity-75" : ""
            }`}
          >
            {user.bio || "This profile has no bio"}
          </p>

          {/* Stats */}
          <div className="flex justify-between rounded-[10px] bg-[var(--stats-bg)] px-8 py-4">
            <div className="flex flex-1 flex-col gap-1">
              <span className="text-[13px] leading-[1.5] text-[var(--text-secondary)]">
                Repos
              </span>
              <span className="text-[22px] font-bold leading-[1.4] text-[var(--text-primary)]">
                {user.public_repos}
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-1">
              <span className="text-[13px] leading-[1.5] text-[var(--text-secondary)]">
                Followers
              </span>
              <span className="text-[22px] font-bold leading-[1.4] text-[var(--text-primary)]">
                {user.followers}
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-1">
              <span className="text-[13px] leading-[1.5] text-[var(--text-secondary)]">
                Following
              </span>
              <span className="text-[22px] font-bold leading-[1.4] text-[var(--text-primary)]">
                {user.following}
              </span>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            <LinkItem
              icon={<LocationIcon className="w-[14px] h-5" />}
              value={user.location}
              isAvailable={!!user.location}
            />
            <LinkItem
              icon={<TwitterIcon className="w-5 h-[18px]" />}
              value={user.twitter_username ? `@${user.twitter_username}` : null}
              href={twitterUrl || undefined}
              isAvailable={!!user.twitter_username}
            />
            <LinkItem
              icon={<WebsiteIcon className="w-5 h-5" />}
              value={user.blog || null}
              href={blogUrl || undefined}
              isAvailable={!!user.blog}
            />
            <LinkItem
              icon={<CompanyIcon className="w-5 h-5" />}
              value={user.company}
              isAvailable={!!user.company}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

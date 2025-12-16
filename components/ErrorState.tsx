"use client";

interface ErrorStateProps {
  error: string;
}

export function ErrorState({ error }: ErrorStateProps) {
  return (
    <div className="w-full rounded-[15px] bg-[var(--card-bg)] p-6 md:p-10 lg:p-12 shadow-[var(--shadow)]">
      <div className="flex flex-col gap-4 items-center text-center py-8">
        <h2 className="text-[22px] md:text-[26px] font-bold leading-[1.2] text-[var(--text-primary)]">
          No results found!
        </h2>
        <p className="text-[13px] md:text-[15px] leading-[1.5] text-[var(--text-secondary)] max-w-md">
          {error === "Not Found"
            ? "We couldn't find the user you were looking for. Please double check the username and try again."
            : error}
        </p>
      </div>
    </div>
  );
}

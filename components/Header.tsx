"use client"

import { useState } from "react"
import Link from "next/link"
import { useTheme } from "./ThemeProvider"
import { MoonIcon, SunIcon, UserIcon } from "./Icons"
import { LoginModal } from "./LoginModal"
import { useAuth } from "@/contexts/AuthContext"

export function Header() {
  const { theme, toggleTheme, mounted } = useTheme()
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const { user, logout, isLoading: authLoading } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <>
      <header className="flex w-full items-center justify-between">
        <Link href="/">
          <h1 className="text-[26px] font-bold leading-none text-[var(--logo-color)]">
            devfinder
          </h1>
        </Link>
        <div className="flex items-center gap-4 md:gap-6">
          {!authLoading && (
            <>
              {user ? (
                <div className="flex items-center gap-3 md:gap-4">
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                  >
                    <img
                      src={user.avatar_url}
                      alt={user.login}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="hidden md:block text-[13px] font-bold text-[var(--text-primary)]">
                      {user.login}
                    </span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 md:gap-3 group"
                    aria-label="Logout"
                  >
                    <span className="text-[13px] font-bold uppercase leading-[1.4] tracking-[2.5px] text-[var(--toggle-text)] group-hover:text-[var(--text-primary)]">
                      Logout
                    </span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="flex items-center gap-2 md:gap-3 group"
                  aria-label="Open login modal"
                >
                  <span className="text-[13px] font-bold uppercase leading-[1.4] tracking-[2.5px] text-[var(--toggle-text)] group-hover:text-[var(--text-primary)]">
                    Login
                  </span>
                  <UserIcon className="w-5 h-5 text-[var(--toggle-icon)] group-hover:text-[var(--text-primary)]" />
                </button>
              )}
            </>
          )}
          {mounted ? (
            <button
              onClick={toggleTheme}
              className="flex items-center gap-3 md:gap-4 group"
              aria-label={`Switch to ${
                theme === "light" ? "dark" : "light"
              } mode`}
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
        </div>
      </header>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  )
}

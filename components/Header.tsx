"use client"

import { useState, ReactNode } from "react"
import Link from "next/link"
import Image from "next/image"
import { useTheme } from "./ThemeProvider"
import { MoonIcon, SunIcon, UserIcon, LogoutIcon } from "./Icons"
import { LoginModal } from "./LoginModal"
import { useAuth } from "@/contexts/AuthContext"

interface AuthButtonProps {
  onClick: () => void
  label: string
  ariaLabel: string
  icon?: ReactNode
}

function AuthButton({ onClick, label, ariaLabel, icon }: AuthButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 md:gap-3 group cursor-pointer"
      aria-label={ariaLabel}
    >
      <span className="text-[13px] font-bold uppercase leading-[1.4] tracking-[2.5px] text-[var(--toggle-text)] group-hover:text-[var(--text-primary)]">
        {label}
      </span>
      {icon}
    </button>
  )
}

export function Header() {
  const { theme, toggleTheme, mounted } = useTheme()
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const { user, logout, isLoading: authLoading } = useAuth()

  const handleLogout = () => {
    logout()
  }

  const handleLogin = () => {
    setIsLoginModalOpen(true)
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
                    <Image
                      src={user.avatar_url}
                      alt={user.login}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <span className="hidden md:block text-[13px] font-bold text-[var(--text-primary)]">
                      {user.login}
                    </span>
                  </Link>
                  <AuthButton
                    onClick={handleLogout}
                    label="Logout"
                    ariaLabel="Logout"
                    icon={
                      <LogoutIcon className="w-5 h-5 text-[var(--toggle-icon)] group-hover:text-[var(--text-primary)]" />
                    }
                  />
                </div>
              ) : (
                <AuthButton
                  onClick={handleLogin}
                  label="Login"
                  ariaLabel="Open login modal"
                  icon={
                    <UserIcon className="w-5 h-5 text-[var(--toggle-icon)] group-hover:text-[var(--text-primary)]" />
                  }
                />
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

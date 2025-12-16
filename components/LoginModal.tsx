"use client"

import { useEffect, useRef } from "react"
import { useAuth } from "@/contexts/AuthContext"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const { login, error, setError } = useAuth()

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const handleClose = () => {
    setError(null)
    onClose()
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      handleClose()
    }
  }

  const handleGitHubLogin = () => {
    login()
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className="w-full max-w-md mx-4 bg-[var(--card-bg)] rounded-2xl shadow-xl p-6 md:p-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            Login
          </h2>
          <button
            onClick={handleClose}
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            aria-label="Close modal"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 5L5 15M5 5L15 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <p className="text-[var(--text-secondary)] text-sm mb-6">
          Sign in with your GitHub account to access additional features.
        </p>

        <button
          onClick={handleGitHubLogin}
          className="w-full h-[46px] md:h-[50px] flex items-center justify-center gap-3 rounded-[10px] bg-[var(--neutral-900)] dark:bg-[var(--neutral-0)] px-4 md:px-6 text-[14px] md:text-[16px] font-bold leading-[1.5] text-white dark:text-[var(--neutral-900)] hover:opacity-90 transition-opacity"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0110 4.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.137 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z"
            />
          </svg>
          Continue with GitHub
        </button>

        {error && (
          <p className="mt-4 text-sm text-red-500 text-center">{error}</p>
        )}
      </div>
    </div>
  )
}

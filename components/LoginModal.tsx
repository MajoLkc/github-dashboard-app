"use client"

import { useState, useEffect, useRef } from "react"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

interface FormErrors {
  email?: string
  password?: string
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState({ email: false, password: false })
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
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
  }, [isOpen, onClose])

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!email.trim()) {
      newErrors.email = "Email is required"
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!password.trim()) {
      newErrors.password = "Password is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setTouched({ email: true, password: true })

    if (validateForm()) {
      console.log("Login submitted:", { email, password })
      handleClose()
    }
  }

  const handleClose = () => {
    setEmail("")
    setPassword("")
    setErrors({})
    setTouched({ email: false, password: false })
    onClose()
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      handleClose()
    }
  }

  const handleBlur = (field: "email" | "password") => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    validateForm()
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

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[var(--text-secondary)] mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => handleBlur("email")}
              className={`w-full px-4 py-3 rounded-lg bg-[var(--bg)] border ${
                touched.email && errors.email
                  ? "border-red-500"
                  : "border-transparent"
              } text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all`}
              placeholder="Enter your email"
            />
            {touched.email && errors.email && (
              <p className="mt-2 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[var(--text-secondary)] mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => handleBlur("password")}
              className={`w-full px-4 py-3 rounded-lg bg-[var(--bg)] border ${
                touched.password && errors.password
                  ? "border-red-500"
                  : "border-transparent"
              } text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all`}
              placeholder="Enter your password"
            />
            {touched.password && errors.password && (
              <p className="mt-2 text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full h-[46px] md:h-[50px] items-center rounded-[10px] bg-[var(--blue-500)] px-4 md:px-6 text-[14px] md:text-[16px] font-bold leading-[1.5] text-white hover:bg-[var(--blue-300)] transition-colors disabled:opacity-70"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

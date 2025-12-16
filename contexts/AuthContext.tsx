"use client"

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react"

interface GitHubUser {
  id: number
  login: string
  name: string | null
  avatar_url: string
  email: string | null
}

interface AuthContextType {
  user: GitHubUser | null
  isLoading: boolean
  error: string | null
  notification: string | null
  login: () => void
  logout: () => void
  setError: (error: string | null) => void
  setNotification: (notification: string | null) => void
  clearNotification: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<GitHubUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [notification, setNotification] = useState<string | null>(null)

  useEffect(() => {
    checkAuth()
  }, [])

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const authError = urlParams.get("auth_error")
    const authSuccess = urlParams.get("auth_success")

    if (authError) {
      setError(decodeURIComponent(authError))
      window.history.replaceState({}, "", window.location.pathname)
    }

    if (authSuccess === "true") {
      setNotification("You were logged in successfully")
      window.history.replaceState({}, "", window.location.pathname)
      checkAuth()
    }
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth/me")
      if (response.ok) {
        const userData = await response.json()
        setUser(userData)
      } else {
        setUser(null)
      }
    } catch {
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  const login = () => {
    window.location.href = "/api/auth/github"
  }

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      setUser(null)
      setNotification("You have been logged out")
    } catch {
      setError("Failed to logout")
    }
  }

  const clearNotification = useCallback(() => {
    setNotification(null)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        notification,
        login,
        logout,
        setError,
        setNotification,
        clearNotification,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

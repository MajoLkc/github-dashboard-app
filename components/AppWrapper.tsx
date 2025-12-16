"use client"

import { ReactNode } from "react"
import { AuthProvider, useAuth } from "@/contexts/AuthContext"
import { Toast } from "./Toast"

function ToastContainer() {
  const { notification, clearNotification } = useAuth()

  if (!notification) return null

  return <Toast message={notification} type="success" onClose={clearNotification} />
}

export function AppWrapper({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <ToastContainer />
      {children}
    </AuthProvider>
  )
}

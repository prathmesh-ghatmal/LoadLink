"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { User, UserRole } from "@/lib/data"
import { getStoredAuth, setStoredAuth, type AuthState } from "@/lib/auth"

interface AuthContextType extends AuthState {
  login: (user: User) => void
  logout: () => void
  updateUser: (user: User) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    role: "guest",
  })

  useEffect(() => {
    const stored = getStoredAuth()
    setAuthState(stored)
  }, [])

  const login = (user: User) => {
    const newState = {
      user,
      isAuthenticated: true,
      role: user.role,
    }
    setAuthState(newState)
    setStoredAuth(user)
  }

  const logout = () => {
    const newState = {
      user: null,
      isAuthenticated: false,
      role: "guest" as UserRole,
    }
    setAuthState(newState)
    setStoredAuth(null)
  }

  const updateUser = (user: User) => {
    const newState = {
      user,
      isAuthenticated: true,
      role: user.role,
    }
    setAuthState(newState)
    setStoredAuth(user)
  }

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout,
        updateUser,
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

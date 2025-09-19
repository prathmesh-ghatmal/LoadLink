"use client"

import type { User, UserRole } from "./data"
import { users } from "./data"

// Simple auth context for demo purposes
export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  role: UserRole
}

// Mock authentication functions
export const mockLogin = (email: string, password: string): User | null => {
  // In a real app, this would validate credentials
  const user = users.find((u) => u.email === email)
  if (user && password === "password") {
    return user
  }
  return null
}

export const mockRegister = (userData: {
  name: string
  email: string
  role: UserRole
  phone: string
}): User => {
  // In a real app, this would create a new user
  const newUser: User = {
    id: Date.now().toString(),
    ...userData,
    rating: 0,
    reviewCount: 0,
    joinedDate: new Date().toISOString().split("T")[0],
  }
  users.push(newUser)
  return newUser
}

export const getStoredAuth = (): AuthState => {
  if (typeof window === "undefined") {
    return { user: null, isAuthenticated: false, role: "guest" }
  }

  const stored = localStorage.getItem("loadlink-auth")
  if (stored) {
    const parsed = JSON.parse(stored)
    return {
      user: parsed.user,
      isAuthenticated: true,
      role: parsed.user.role,
    }
  }

  return { user: null, isAuthenticated: false, role: "guest" }
}

export const setStoredAuth = (user: User | null) => {
  if (typeof window === "undefined") return

  if (user) {
    localStorage.setItem("loadlink-auth", JSON.stringify({ user }))
  } else {
    localStorage.removeItem("loadlink-auth")
  }
}

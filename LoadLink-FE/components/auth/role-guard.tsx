"use client"

import type React from "react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import type { UserRole } from "@/lib/data"

interface RoleGuardProps {
  children: React.ReactNode
  allowedRoles: UserRole[]
  redirectTo?: string
  fallback?: React.ReactNode
}

export function RoleGuard({
  children,
  allowedRoles,
  redirectTo = "/",
  fallback = <div>Loading...</div>,
}: RoleGuardProps) {
  const { user, isAuthenticated, role, loading } = useAuth()
  if (loading) return <>{fallback}</>
 
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    if (!allowedRoles.includes(role)) {
      router.push(redirectTo)
      return
    }
  }, [isAuthenticated, role, allowedRoles, redirectTo, router])

  if (!isAuthenticated || !allowedRoles.includes(role)) {
    return <>{fallback}</>
  }

  return <>{children}</>
}

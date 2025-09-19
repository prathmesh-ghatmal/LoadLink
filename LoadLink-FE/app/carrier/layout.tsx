"use client"

import type React from "react"
import { RoleGuard } from "@/components/auth/role-guard"
import { CarrierSidebar } from "@/components/carrier/carrier-sidebar"
import { Header } from "@/components/common/header"

export default function CarrierLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RoleGuard
      allowedRoles={["carrier"]}
      redirectTo="/unauthorized"
      fallback={<div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>}
    >
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex">
          <CarrierSidebar />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </RoleGuard>
  )
}

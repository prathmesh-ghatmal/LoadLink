"use client"

import type React from "react"
import { RoleGuard } from "@/components/auth/role-guard"
import { ShipperSidebar } from "@/components/shipper/shipper-sidebar"
import { Header } from "@/components/common/header"

export default function ShipperLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RoleGuard
      allowedRoles={["shipper"]}
      redirectTo="/unauthorized"
      fallback={<div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>}
    >
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex">
          <ShipperSidebar />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </RoleGuard>
  )
}

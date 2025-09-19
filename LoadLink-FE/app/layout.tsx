import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/contexts/auth-context"
import { PageTransition } from "@/components/ui/page-transition"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "LoadLink - Find Loads, Find Trucks",
  description: "The premier logistics marketplace connecting shippers and carriers",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>
          <AuthProvider>
            <PageTransition>{children}</PageTransition>
          </AuthProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}

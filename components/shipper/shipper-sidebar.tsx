"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Search, Package, Star, User } from "lucide-react"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/shipper/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Search Trips",
    href: "/shipper/search",
    icon: Search,
  },
  {
    title: "My Bookings",
    href: "/shipper/bookings",
    icon: Package,
  },
  {
    title: "Reviews",
    href: "/shipper/reviews",
    icon: Star,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: User,
  },
]

export function ShipperSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-card border-r border-border h-full">
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-8">
          <Package className="h-6 w-6 text-primary" />
          <span className="text-lg font-semibold">Shipper Portal</span>
        </div>

        <nav className="space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted",
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.title}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

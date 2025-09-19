"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { Truck, Package, User, LogOut, LayoutDashboard } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const { user, isAuthenticated, logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  const getDashboardLink = () => {
    if (!user) return "/"
    return user.role === "shipper" ? "/shipper/dashboard" : "/carrier/dashboard"
  }

  const getRoleIcon = () => {
    if (!user) return <User className="h-4 w-4" />
    return user.role === "shipper" ? <Package className="h-4 w-4" /> : <Truck className="h-4 w-4" />
  }

  const getRoleColor = () => {
    if (!user) return ""
    return user.role === "shipper" ? "text-primary" : "text-secondary"
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <Truck className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold text-foreground">LoadLink</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
         
          {isAuthenticated && user && (
            <>
              {user.role === "shipper" && (
                <>
                  <Link href="/shipper/search" className="text-sm font-medium hover:text-primary transition-colors">
                    Search Trips
                  </Link>
                  <Link href="/shipper/bookings" className="text-sm font-medium hover:text-primary transition-colors">
                    My Bookings
                  </Link>
                </>
              )}
              {user.role === "carrier" && (
                <>
                  <Link href="/carrier/trips" className="text-sm font-medium hover:text-secondary transition-colors">
                    My Trips
                  </Link>
                  <Link href="/carrier/vehicles" className="text-sm font-medium hover:text-secondary transition-colors">
                    Vehicles
                  </Link>
                </>
              )}
            </>
          )}
        </nav>

        <div className="flex items-center space-x-4">
          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <div className={getRoleColor()}>{getRoleIcon()}</div>
                  <span>{user.name}</span>
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={getDashboardLink()} className="flex items-center">
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {user.role === "shipper" && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/shipper/search">
                        <Package className="h-4 w-4 mr-2" />
                        Search Trips
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/shipper/bookings">
                        <Package className="h-4 w-4 mr-2" />
                        My Bookings
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
                {user.role === "carrier" && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/carrier/create-trip">
                        <Truck className="h-4 w-4 mr-2" />
                        Create Trip
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/carrier/vehicles">
                        <Truck className="h-4 w-4 mr-2" />
                        Manage Vehicles
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="ghost" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Get Started</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

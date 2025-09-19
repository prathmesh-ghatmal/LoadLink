import Link from "next/link"
import { Truck, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-sidebar text-sidebar-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Truck className="h-6 w-6 text-sidebar-accent" />
              <span className="text-xl font-bold">LoadLink</span>
            </div>
            <p className="text-sm text-sidebar-foreground/80">
              Connecting shippers and carriers for efficient logistics solutions across the nation.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">For Shippers</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/shipper/search" className="hover:text-sidebar-accent transition-colors">
                  Find Carriers
                </Link>
              </li>
              <li>
                <Link href="/shipper/bookings" className="hover:text-sidebar-accent transition-colors">
                  Track Shipments
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-sidebar-accent transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">For Carriers</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/carrier/trips" className="hover:text-sidebar-accent transition-colors">
                  Post Trips
                </Link>
              </li>
              <li>
                <Link href="/carrier/earnings" className="hover:text-sidebar-accent transition-colors">
                  Track Earnings
                </Link>
              </li>
              <li>
                <Link href="/carrier/vehicles" className="hover:text-sidebar-accent transition-colors">
                  Manage Fleet
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>1-800-LOADLINK</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>support@loadlink.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Dallas, TX</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-sidebar-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-sidebar-foreground/60">© 2024 LoadLink. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-sm hover:text-sidebar-accent transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm hover:text-sidebar-accent transition-colors">
              Terms of Service
            </Link>
            <Link href="/support" className="text-sm hover:text-sidebar-accent transition-colors">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

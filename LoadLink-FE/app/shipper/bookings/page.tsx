"use client"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookingCard } from "@/components/shipper/booking-card"
import { useAuth } from "@/contexts/auth-context"
import { bookings } from "@/lib/data"

export default function ShipperBookingsPage() {
  const { user } = useAuth()
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const userBookings = bookings.filter((b) => b.shipperId === user?.id)

  const pendingBookings = userBookings.filter((b) => b.status === "pending")
  const acceptedBookings = userBookings.filter((b) => b.status === "accepted")
  const fulfilledBookings = userBookings.filter((b) => b.status === "fulfilled")
  const paidBookings = userBookings.filter((b) => b.status === "paid")
  const completedBookings = userBookings.filter((b) => b.status === "completed")

  const handleReview = (bookingId: string) => {
    window.location.href = `/shipper/reviews/new?bookingId=${bookingId}`
  }

  const handleCancel = (bookingId: string) => {
    // In a real app, this would make an API call
    console.log("Cancel booking:", bookingId)
  }

  const handleRefresh = () => {
    setRefreshTrigger((prev) => prev + 1)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">My Bookings</h1>
        <p className="text-muted-foreground">Track and manage your shipments.</p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="all">All ({userBookings.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({pendingBookings.length})</TabsTrigger>
          <TabsTrigger value="accepted">Active ({acceptedBookings.length})</TabsTrigger>
          <TabsTrigger value="fulfilled">Fulfilled ({fulfilledBookings.length})</TabsTrigger>
          <TabsTrigger value="paid">Paid ({paidBookings.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedBookings.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {userBookings.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {userBookings.map((booking) => (
                <BookingCard
                  key={`${booking.id}-${refreshTrigger}`}
                  booking={booking}
                  onReview={handleReview}
                  onCancel={handleCancel}
                  onRefresh={handleRefresh}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No bookings found.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {pendingBookings.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {pendingBookings.map((booking) => (
                <BookingCard
                  key={`${booking.id}-${refreshTrigger}`}
                  booking={booking}
                  onCancel={handleCancel}
                  onRefresh={handleRefresh}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No pending bookings.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="accepted" className="space-y-4">
          {acceptedBookings.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {acceptedBookings.map((booking) => (
                <BookingCard key={`${booking.id}-${refreshTrigger}`} booking={booking} onRefresh={handleRefresh} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No active bookings.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="fulfilled" className="space-y-4">
          {fulfilledBookings.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {fulfilledBookings.map((booking) => (
                <BookingCard key={`${booking.id}-${refreshTrigger}`} booking={booking} onRefresh={handleRefresh} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No fulfilled bookings awaiting payment.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="paid" className="space-y-4">
          {paidBookings.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {paidBookings.map((booking) => (
                <BookingCard key={`${booking.id}-${refreshTrigger}`} booking={booking} onRefresh={handleRefresh} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No paid bookings.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedBookings.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {completedBookings.map((booking) => (
                <BookingCard
                  key={`${booking.id}-${refreshTrigger}`}
                  booking={booking}
                  onReview={handleReview}
                  onRefresh={handleRefresh}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No completed bookings.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

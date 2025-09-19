"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/contexts/auth-context"
import { bookings, trips, users, payments } from "@/lib/data"
import { DollarSign, TrendingUp, Calendar, Package } from "lucide-react"

export default function CarrierEarningsPage() {
  const { user } = useAuth()
  const userTrips = trips.filter((t) => t.carrierId === user?.id)

  const userPayments = payments.filter((p) => p.toUserId === user?.id)
  const userBookings = bookings.filter((b) => {
    const trip = trips.find((t) => t.id === b.tripId)
    return trip?.carrierId === user?.id
  })

  const totalEarnings = userPayments.reduce((sum, p) => sum + p.amount, 0)
  const thisMonthEarnings = userPayments
    .filter((p) => {
      const paymentDate = new Date(p.completedDate || p.createdDate)
      const now = new Date()
      return paymentDate.getMonth() === now.getMonth() && paymentDate.getFullYear() === now.getFullYear()
    })
    .reduce((sum, p) => sum + p.amount, 0)

  const completedBookings = userBookings.filter((b) => b.status === "paid" || b.status === "completed")
  const avgEarningsPerTrip = completedBookings.length > 0 ? totalEarnings / completedBookings.length : 0

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Earnings</h1>
        <p className="text-muted-foreground">Track your income and completed trips.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalEarnings.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${thisMonthEarnings.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Trips</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedBookings.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg per Trip</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${avgEarningsPerTrip.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      {/* Earnings History */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Earnings</CardTitle>
          <CardDescription>Your completed trips and payments</CardDescription>
        </CardHeader>
        <CardContent>
          {userPayments.length > 0 ? (
            <div className="space-y-4">
              {userPayments.slice(0, 20).map((payment) => {
                const booking = bookings.find((b) => b.id === payment.bookingId)
                const trip = booking ? trips.find((t) => t.id === booking.tripId) : null
                const shipper = booking ? users.find((u) => u.id === booking.shipperId) : null

                if (!booking || !trip || !shipper) return null

                return (
                  <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">
                        {trip.origin} → {trip.destination}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {booking.loadSize.toLocaleString()} kg • Shipper: {shipper.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Received on {new Date(payment.completedDate || payment.createdDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-accent">${payment.amount.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">${trip.pricePerKg}/kg</p>
                      <p className="text-xs text-green-600 capitalize">{payment.status}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No earnings yet.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { Booking } from "@/lib/data"
import { trips, users, dataActions, reviews } from "@/lib/data"
import { ReviewForm } from "@/components/ui/review-form"
import { MapPin, Calendar, Weight, DollarSign, CreditCard } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

interface BookingCardProps {
  booking: Booking
  onReview?: (bookingId: string) => void
  onCancel?: (bookingId: string) => void
  onRefresh?: () => void
}

export function BookingCard({ booking, onReview, onCancel, onRefresh }: BookingCardProps) {
  const { user } = useAuth()
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)

  const trip = trips.find((t) => t.id === booking.tripId)
  const carrier = trip ? users.find((u) => u.id === trip.carrierId) : null

  if (!trip || !carrier) return null

  const existingReview = reviews.find((r) => r.fromUserId === user?.id && r.bookingId === booking.id)
  const canReview = booking.status === "paid" && !existingReview

  const handlePayNow = async () => {
    if (confirm(`Confirm payment of $${booking.totalPrice.toLocaleString()} for this booking?`)) {
      setIsProcessingPayment(true)

      // Simulate payment processing
      setTimeout(() => {
        dataActions.processPayment(booking.id)
        setIsProcessingPayment(false)
        onRefresh?.()
      }, 2000)
    }
  }

  const handleReviewSubmit = () => {
    setShowReviewForm(false)
    onRefresh?.()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "accepted":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "fulfilled":
        return "bg-blue-100 text-blue-800"
      case "paid":
        return "bg-purple-100 text-purple-800"
      case "completed":
        return "bg-emerald-100 text-emerald-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <>
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Booking #{booking.id}</CardTitle>
            <Badge className={getStatusColor(booking.status)}>
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">{trip.origin}</span>
            </div>
            <div className="text-sm text-muted-foreground">→</div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">{trip.destination}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{new Date(trip.departureDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Weight className="h-4 w-4 text-muted-foreground" />
              <span>{booking.loadSize.toLocaleString()} kg</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="font-semibold">${booking.totalPrice.toLocaleString()}</span>
            </div>
            <span className="text-sm text-muted-foreground">Carrier: {carrier.name}</span>
          </div>

          {booking.notes && <p className="text-sm text-muted-foreground bg-muted p-2 rounded">{booking.notes}</p>}

          {booking.fulfilledDate && (
            <div className="bg-green-50 border border-green-200 p-3 rounded">
              <p className="text-sm text-green-800">
                <strong>Fulfilled on:</strong> {new Date(booking.fulfilledDate).toLocaleDateString()}
              </p>
              {booking.paidDate && (
                <p className="text-sm text-green-800">
                  <strong>Paid on:</strong> {new Date(booking.paidDate).toLocaleDateString()}
                </p>
              )}
            </div>
          )}

          <div className="flex space-x-2 pt-2">
            {booking.status === "fulfilled" && (
              <Button size="sm" onClick={handlePayNow} disabled={isProcessingPayment} className="flex-1">
                <CreditCard className="h-4 w-4 mr-2" />
                {isProcessingPayment ? "Processing..." : "Pay Now"}
              </Button>
            )}

            {canReview && (
              <Button size="sm" variant="outline" onClick={() => setShowReviewForm(true)} className="flex-1">
                Review Carrier
              </Button>
            )}

            {booking.status === "completed" && onReview && (
              <Button size="sm" onClick={() => onReview(booking.id)}>
                Leave Review
              </Button>
            )}

            {booking.status === "pending" && onCancel && (
              <Button size="sm" variant="outline" onClick={() => onCancel(booking.id)}>
                Cancel
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={showReviewForm} onOpenChange={setShowReviewForm}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Review Carrier</DialogTitle>
          </DialogHeader>
          <ReviewForm
            fromUserId={user?.id || ""}
            toUserId={carrier.id}
            toUserName={carrier.name}
            bookingId={booking.id}
            userRole="shipper"
            onSubmit={handleReviewSubmit}
            onCancel={() => setShowReviewForm(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}

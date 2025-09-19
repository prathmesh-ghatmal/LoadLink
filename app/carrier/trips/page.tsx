"use client"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { TripManagementCard } from "@/components/carrier/trip-management-card"
import { useAuth } from "@/contexts/auth-context"
import { trips, dataActions } from "@/lib/data"
import { Plus } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CarrierTripsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const userTrips = trips.filter((t) => t.carrierId === user?.id)

  const activeTrips = userTrips.filter((t) => t.status === "active")
  const pastTrips = userTrips.filter((t) => t.status === "completed")
  const cancelledTrips = userTrips.filter((t) => t.status === "cancelled")

  const handleViewBookings = (tripId: string) => {
    router.push(`/carrier/trip/${tripId}/bookings`)
  }

  const handleEditTrip = (tripId: string) => {
    router.push(`/carrier/edit-trip/${tripId}`)
  }

  const handleCancelTrip = (tripId: string) => {
    if (confirm("Are you sure you want to cancel this trip? This action cannot be undone.")) {
      dataActions.updateTrip(tripId, { status: "cancelled" })
      setRefreshTrigger((prev) => prev + 1)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Trips</h1>
          <p className="text-muted-foreground">Manage your trips and track bookings.</p>
        </div>
        <Button asChild>
          <Link href="/carrier/create-trip">
            <Plus className="h-4 w-4 mr-2" />
            Create Trip
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="active">Active ({activeTrips.length})</TabsTrigger>
          <TabsTrigger value="past">Past ({pastTrips.length})</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled ({cancelledTrips.length})</TabsTrigger>
          <TabsTrigger value="all">All ({userTrips.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {activeTrips.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {activeTrips.map((trip) => (
                <TripManagementCard
                  key={`${trip.id}-${refreshTrigger}`}
                  trip={trip}
                  onViewBookings={handleViewBookings}
                  onEdit={handleEditTrip}
                  onCancel={handleCancelTrip}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No active trips.</p>
              <Button asChild>
                <Link href="/carrier/create-trip">Create Your First Trip</Link>
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {pastTrips.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {pastTrips.map((trip) => (
                <TripManagementCard key={trip.id} trip={trip} onViewBookings={handleViewBookings} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No completed trips yet.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="cancelled" className="space-y-4">
          {cancelledTrips.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {cancelledTrips.map((trip) => (
                <TripManagementCard key={trip.id} trip={trip} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No cancelled trips.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {userTrips.map((trip) => (
              <TripManagementCard
                key={trip.id}
                trip={trip}
                onViewBookings={handleViewBookings}
                onEdit={trip.status === "active" ? handleEditTrip : undefined}
                onCancel={trip.status === "active" ? handleCancelTrip : undefined}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

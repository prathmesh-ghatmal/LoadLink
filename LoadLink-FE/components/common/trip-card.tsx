"use client"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Trip } from "@/lib/data"
import { users, vehicles } from "@/lib/data"
import { MapPin, Calendar, Star, Weight } from "lucide-react"
import { TripOut } from "@/services/trips"
import { tr } from "date-fns/locale"
import { useEffect, useState } from "react"
import { getUserByIdApi, UserOut } from "@/services/user"
import { getVehicleByIdApi, VehicleOut } from "@/services/vehicles"

interface TripCardProps {
  trip: TripOut
  showBookButton?: boolean
  onBook?: (tripId: string) => void
}

export function TripCard({ trip, showBookButton = true, onBook }: TripCardProps) {
 const [carrier, setCarrier] = useState<UserOut | null>(null);
 const [vehicle, setVehicle] = useState<VehicleOut | null>(null);
  useEffect(() => {
    // Fetch carrier
    getUserByIdApi(trip.carrier_id)
      .then(setCarrier)
      .catch((err) => console.error("Failed to fetch carrier:", err));

    // Fetch vehicle
    getVehicleByIdApi(trip.vehicle_id)
      .then(setVehicle)
      .catch((err) => console.error("Failed to fetch vehicle:", err));
  }, [trip.carrier_id, trip.vehicle_id]);

  if (!carrier || !vehicle) {
    console.log("khali hai")
    return null}

  return (
    <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10 transition-transform duration-300 group-hover:scale-110">
              <AvatarImage src={carrier.avatar || "/placeholder.svg"} alt={carrier.name} />
              <AvatarFallback>{carrier.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{carrier.name}</h3>
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm text-muted-foreground">
                  {carrier.rating} ({carrier.review_count} reviews)
                </span>
              </div>
            </div>
          </div>
          <Badge variant="secondary" className="capitalize transition-colors duration-300 group-hover:bg-secondary/80">
            {vehicle.type}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-muted-foreground transition-colors duration-300 group-hover:text-primary" />
            <span className="text-sm font-medium">{trip.origin}</span>
          </div>
          <div className="text-sm text-muted-foreground">→</div>
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-muted-foreground transition-colors duration-300 group-hover:text-primary" />
            <span className="text-sm font-medium">{trip.destination}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{new Date(trip.departure_date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Weight className="h-4 w-4 text-muted-foreground" />
            <span>{trip.available_capacity.toLocaleString()} kg available</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="text-lg font-bold text-accent transition-colors duration-300 group-hover:text-accent/80">
            ${trip.price_per_kg}/kg
          </div>
          {showBookButton && onBook && (
            <Button
              onClick={() => onBook(trip.id)}
              size="sm"
              className="transform hover:scale-105 transition-all duration-200"
            >
              Book Now
            </Button>
          )}
        </div>

        {trip.description && <p className="text-sm text-muted-foreground">{trip.description}</p>}
      </CardContent>
    </Card>
  )
}

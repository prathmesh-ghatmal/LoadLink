"use client"
import { useState } from "react"
import { Header } from "@/components/common/header"
import { Footer } from "@/components/common/footer"
import { SearchForm } from "@/components/common/search-form"
import { TripCard } from "@/components/common/trip-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { trips } from "@/lib/data"
import { Filter } from "lucide-react"

export default function TripsPage() {
  const [filteredTrips, setFilteredTrips] = useState(trips)
  const [vehicleFilter, setVehicleFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("date")

  const handleSearch = (searchData: { origin: string; destination: string; date: string }) => {
    let filtered = trips

    if (searchData.origin) {
      filtered = filtered.filter((trip) => trip.origin.toLowerCase().includes(searchData.origin.toLowerCase()))
    }

    if (searchData.destination) {
      filtered = filtered.filter((trip) =>
        trip.destination.toLowerCase().includes(searchData.destination.toLowerCase()),
      )
    }

    if (searchData.date) {
      filtered = filtered.filter((trip) => trip.departureDate >= searchData.date)
    }

    setFilteredTrips(filtered)
  }

  const handleVehicleFilter = (value: string) => {
    setVehicleFilter(value)
    if (value === "all") {
      setFilteredTrips(trips)
    } else {
      // Filter by vehicle type - would need to join with vehicles data
      setFilteredTrips(trips)
    }
  }

  const handleSort = (value: string) => {
    setSortBy(value)
    const sorted = [...filteredTrips].sort((a, b) => {
      switch (value) {
        case "price-low":
          return a.pricePerKg - b.pricePerKg
        case "price-high":
          return b.pricePerKg - a.pricePerKg
        case "date":
          return new Date(a.departureDate).getTime() - new Date(b.departureDate).getTime()
        default:
          return 0
      }
    })
    setFilteredTrips(sorted)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">Browse Available Trips</h1>
          <SearchForm onSearch={handleSearch} />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Filter className="h-5 w-5" />
                  <span>Filters</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Vehicle Type</label>
                  <Select value={vehicleFilter} onValueChange={handleVehicleFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="truck">Truck</SelectItem>
                      <SelectItem value="van">Van</SelectItem>
                      <SelectItem value="trailer">Trailer</SelectItem>
                      <SelectItem value="container">Container</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Sort By</label>
                  <Select value={sortBy} onValueChange={handleSort}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="date">Departure Date</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Trips Grid */}
          <div className="flex-1">
            <div className="mb-4 flex justify-between items-center">
              <p className="text-muted-foreground">{filteredTrips.length} trips found</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredTrips.map((trip) => (
                <TripCard
                  key={trip.id}
                  trip={trip}
                  onBook={(tripId) => {
                    // Handle booking - would redirect to login or booking page
                    console.log("Book trip:", tripId)
                  }}
                />
              ))}
            </div>

            {filteredTrips.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No trips found matching your criteria.</p>
                <Button onClick={() => setFilteredTrips(trips)}>Clear Filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

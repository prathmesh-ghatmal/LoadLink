"use client"
import { useState, useEffect } from "react"
import type React from "react"
import { useRouter, useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/contexts/auth-context"
import {  dataActions } from "@/lib/data"
import { ArrowRight, MapPin, Calendar, DollarSign, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { de } from "date-fns/locale"
import { getTripByIdApi, TripOut } from "@/services/trips"
import { getMyVehiclesApi, VehicleOut } from "@/services/vehicles"
import { get } from "http"
import { updateTripApi } from "../../../../services/trips"

export default function EditTripPage() {
  const { user } = useAuth()
 
  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">You must be logged in to edit a trip.</p>
        <Button asChild>
          <Link href="/login">Go to Login</Link>
        </Button>
      </div>
    )
  }
  console.log("kay roa")
  
  const router = useRouter()
  const params = useParams()
  const tripId = params.id as string

  const [currentTrip, setCurrentTrip] = useState<TripOut | null>(null);
  const [vehicles, setVehicles] = useState<VehicleOut[]>([]);
  const [loading, setLoading] = useState(true)  
  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const trip = await getTripByIdApi(tripId);
        const vehicleResponse = await getMyVehiclesApi();
        setVehicles(vehicleResponse);
        if (trip.carrier_id !== user?.id) {
          router.push("/carrier/trips"); // not authorized
        } else {
          setCurrentTrip(trip);
          setFormData({
            vehicle_id: trip.vehicle_id,
            origin: trip.origin,
            destination: trip.destination,
            departure_date: trip.departure_date.split("T")[0], // format for <input type="date">
            arrival_date: trip.arrival_date.split("T")[0],
            price_per_kg: trip.price_per_kg.toString(),
            description: trip.description || "",
          });
          setLoading(false);
        }
      } catch (err) {
        console.error("Failed to fetch trip", err);
        router.push("/carrier/trips");
      }
    };

    fetchTrip();
  }, [tripId, user?.id, router]);

  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    vehicle_id: "",
    origin: "",
    destination: "",
    departure_date: "",
    arrival_date: "",
    price_per_kg: "",
    description: "",
  });
  

  const userVehicles = vehicles.filter((v) => v.carrier_id === user?.id && v.is_active)
  const selectedVehicle = vehicles.find((v) => v.id === formData.vehicle_id)
  // const currentTrip = trips.find((t) => t.id === tripId)

  // useEffect(() => {
  //   if (currentTrip && currentTrip.carrier_id === user?.id) {
  //     setFormData({
  //       vehicle_id: currentTrip.vehicle_id,
  //       origin: currentTrip.origin,
  //       destination: currentTrip.destination,
  //       departure_date: currentTrip.departure_date,
  //       arrival_date: currentTrip.arrival_date,
  //       price_per_kg: currentTrip.price_per_kg.toString(),
  //       description: currentTrip.description || "",
  //     })
  //     setLoading(false)
  //   } else if (!currentTrip) {
  //     // Trip not found, redirect back
  //     router.push("/carrier/trips")
  //   } else if (currentTrip.carrier_id !== user?.id) {
  //     // Not authorized to edit this trip
  //     router.push("/carrier/trips")
  //   }
  // }, [currentTrip, user?.id, router])

const handleNext = () => {
  setTimeout(() => {
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  }, 0);
};

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!selectedVehicle || !currentTrip) {
    console.log("rada rada");
    return;
  }

  console.log("Submitting update for step", currentStep);

  const updatedTrip = {
    vehicle_id: formData.vehicle_id,
    origin: formData.origin,
    destination: formData.destination,
    departure_date: formData.departure_date,
    arrival_date: formData.arrival_date,
    price_per_kg: Number.parseFloat(formData.price_per_kg),
    available_capacity:
      selectedVehicle.capacity -
      (currentTrip.total_capacity - currentTrip.available_capacity),
    total_capacity: selectedVehicle.capacity,
    description: formData.description,
  };

  try {
    await updateTripApi(tripId, updatedTrip);
    router.push("/carrier/trips");
  } catch (error) {
    console.error("Failed to update trip:", error);
  }
};


  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.vehicle_id !== ""
      case 2:
        return formData.origin && formData.destination && formData.departure_date && formData.arrival_date
      case 3:
        return formData.price_per_kg !== ""
      default:
        return false
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading trip details...</p>
        </div>
      </div>
    )
  }

  if (!currentTrip) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">Trip not found.</p>
        <Button asChild>
          <Link href="/carrier/trips">Back to Trips</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/carrier/trips">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Trips
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Edit Trip #{tripId}
          </h1>
          <p className="text-muted-foreground">
            Update your trip details and pricing.
          </p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center space-x-4 mb-8">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step <= currentStep
                  ? "bg-secondary text-secondary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {step}
            </div>
            {step < 3 && (
              <ArrowRight className="h-4 w-4 mx-2 text-muted-foreground" />
            )}
          </div>
        ))}
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>
            {currentStep === 1 && "Select Vehicle"}
            {currentStep === 2 && "Route & Schedule"}
            {currentStep === 3 && "Pricing & Details"}
          </CardTitle>
          <CardDescription>
            {currentStep === 1 &&
              "Choose which vehicle you'll use for this trip"}
            {currentStep === 2 &&
              "Update your origin, destination, and travel dates"}
            {currentStep === 3 && "Update your pricing and trip details"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            {/* Step 1: Vehicle Selection */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Select Vehicle</Label>
                  {userVehicles.length > 0 ? (
                    <div className="grid gap-3">
                      {userVehicles.map((vehicle) => (
                        <div
                          key={vehicle.id}
                          className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                            formData.vehicle_id === vehicle.id
                              ? "border-secondary bg-secondary/10"
                              : "border-border hover:border-secondary/50"
                          }`}
                          onClick={() =>
                            setFormData({ ...formData, vehicle_id: vehicle.id })
                          }
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium capitalize">
                                {vehicle.type}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {vehicle.license_plate}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">
                                {vehicle.capacity.toLocaleString()} kg
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Capacity
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground mb-4">
                        No vehicles available.
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => router.push("/carrier/vehicles")}
                      >
                        Add Vehicle First
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 2: Route & Schedule */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="origin"
                      className="flex items-center space-x-2"
                    >
                      <MapPin className="h-4 w-4" />
                      <span>Origin</span>
                    </Label>
                    <Input
                      id="origin"
                      placeholder="Starting city"
                      value={formData.origin}
                      onChange={(e) =>
                        setFormData({ ...formData, origin: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="destination"
                      className="flex items-center space-x-2"
                    >
                      <MapPin className="h-4 w-4" />
                      <span>Destination</span>
                    </Label>
                    <Input
                      id="destination"
                      placeholder="Destination city"
                      value={formData.destination}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          destination: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="departureDate"
                      className="flex items-center space-x-2"
                    >
                      <Calendar className="h-4 w-4" />
                      <span>Departure Date</span>
                    </Label>
                    <Input
                      id="departureDate"
                      type="date"
                      value={formData.departure_date}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          departure_date: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="arrivalDate"
                      className="flex items-center space-x-2"
                    >
                      <Calendar className="h-4 w-4" />
                      <span>Arrival Date</span>
                    </Label>
                    <Input
                      id="arrivalDate"
                      type="date"
                      value={formData.arrival_date}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          arrival_date: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Pricing & Details */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="pricePerKg"
                    className="flex items-center space-x-2"
                  >
                    <DollarSign className="h-4 w-4" />
                    <span>Price per kg ($)</span>
                  </Label>
                  <Input
                    id="pricePerKg"
                    type="number"
                    step="0.01"
                    placeholder="Enter price per kg"
                    value={formData.price_per_kg}
                    onChange={(e) =>
                      setFormData({ ...formData, price_per_kg: e.target.value })
                    }
                    required
                  />
                </div>

                {selectedVehicle && currentTrip && (
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Available Capacity:
                      </span>
                      <span className="font-medium">
                        {currentTrip.available_capacity.toLocaleString()} kg
                      </span>
                    </div>
                    {formData.price_per_kg && (
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm text-muted-foreground">
                          Potential Earnings (Available):
                        </span>
                        <span className="font-medium text-accent">
                          $
                          {(
                            currentTrip.available_capacity *
                            Number.parseFloat(formData.price_per_kg)
                          ).toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    placeholder="Add any special notes about this trip..."
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={3}
                  />
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
              >
                Back
              </Button>

              {currentStep < 3 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  disabled={!canProceed()}
                >
                  Next
                </Button>
              ) : (
                <Button type="submit" disabled={!canProceed()}>
                  Update Trip
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

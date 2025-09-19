"use client"
import { useEffect, useState } from "react"
import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { VehicleCard } from "@/components/carrier/vehicle-card"
import { useAuth } from "@/contexts/auth-context"
import { vehicles, dataActions } from "@/lib/data"
import { Plus, Truck } from "lucide-react"
import { createVehicleApi, deleteVehicleApi, getMyVehiclesApi, updateVehicleApi ,VehicleOut} from "../../../services/vehicles"


export default function CarrierVehiclesPage() {
  const { user } = useAuth()
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingVehicle, setEditingVehicle] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    type: "",
    capacity: "",
    license_plate: "",
    rc_number: "",
  });
  const [vehicles, setVehicles] = useState<VehicleOut[]>([])
  
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  useEffect(() => {
    const fetchVehicles = async () => {
      if (!user) return;
      const myVehicles = await getMyVehiclesApi();
      setVehicles(myVehicles);
    };
    fetchVehicles();
  }, []);

  const userVehicles = vehicles.filter((v) => v.carrier_id === user?.id)
  
  const handleEdit = (vehicleId: string) => {
    const vehicle = vehicles.find((v) => v.id === vehicleId)
    if (vehicle) {
      setFormData({
        type: vehicle.type,
        capacity: vehicle.capacity.toString(),
        license_plate: vehicle.license_plate,
        rc_number: vehicle.rc_number,
      });
      setEditingVehicle(vehicleId)
      setShowAddForm(true)
    }
  }

  const handleDelete = async (vehicleId: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await deleteVehicleApi(vehicleId);
      setVehicles((prev) => prev.filter((v) => v.id !== vehicleId));
    } catch (err) {
      console.error(err);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) return;

    try {
      if (editingVehicle) {
        const updated = await updateVehicleApi(editingVehicle, {
          type: formData.type as any,
          capacity: parseInt(formData.capacity),
          license_plate: formData.license_plate,
          rc_number: formData.rc_number,
        });
        setVehicles((prev) =>
          prev.map((v) => (v.id === updated.id ? updated : v))
        );
        setEditingVehicle(null);
      } else {
        const newVehicle = await createVehicleApi({
          type: formData.type as any,
          capacity: parseInt(formData.capacity),
          license_plate: formData.license_plate,
          rc_number: formData.rc_number,
        });
        setVehicles((prev) => [...prev, newVehicle]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setFormData({ type: "", capacity: "", license_plate: "", rc_number: "" });
      setShowAddForm(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingVehicle(null)
    setFormData({ type: "", capacity: "", license_plate: "", rc_number: "" });
    setShowAddForm(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Vehicles</h1>
          <p className="text-muted-foreground">
            Manage your fleet and add new vehicles.
          </p>
        </div>
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Vehicle
        </Button>
      </div>

      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingVehicle ? "Edit Vehicle" : "Add New Vehicle"}
            </CardTitle>
            <CardDescription>
              {editingVehicle
                ? "Update vehicle information"
                : "Register a new vehicle to your fleet"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Vehicle Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) =>
                      setFormData({ ...formData, type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select vehicle type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="truck">Truck</SelectItem>
                      <SelectItem value="van">Van</SelectItem>
                      <SelectItem value="trailer">Trailer</SelectItem>
                      <SelectItem value="container">Container</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="capacity">Capacity (kg)</Label>
                  <Input
                    id="capacity"
                    type="number"
                    placeholder="Enter capacity in kg"
                    value={formData.capacity}
                    onChange={(e) =>
                      setFormData({ ...formData, capacity: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="licensePlate">License Plate</Label>
                  <Input
                    id="licensePlate"
                    placeholder="Enter license plate"
                    value={formData.license_plate}
                    onChange={(e) =>
                      setFormData({ ...formData, license_plate: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rcNumber">RC Number</Label>
                  <Input
                    id="rc_number"
                    placeholder="Enter RC number"
                    value={formData.rc_number}
                    onChange={(e) =>
                      setFormData({ ...formData, rc_number: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="flex space-x-2">
                <Button type="submit">
                  {editingVehicle ? "Update Vehicle" : "Add Vehicle"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {userVehicles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userVehicles.map((vehicle) => (
            <VehicleCard
              key={`${vehicle.id}-${refreshTrigger}`}
              vehicle={vehicle}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Truck className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground mb-4">
            No vehicles registered yet.
          </p>
          <Button onClick={() => setShowAddForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Vehicle
          </Button>
        </div>
      )}
    </div>
  );
}

"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Vehicle } from "@/lib/data"
import { Truck, Weight, FileText, Edit, Trash2 } from "lucide-react"

interface VehicleCardProps {
  vehicle: Vehicle
  onEdit?: (vehicleId: string) => void
  onDelete?: (vehicleId: string) => void
}

export function VehicleCard({ vehicle, onEdit, onDelete }: VehicleCardProps) {
  const getVehicleIcon = (type: string) => {
    return <Truck className="h-8 w-8 text-secondary" />
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {getVehicleIcon(vehicle.type)}
            <div>
              <CardTitle className="text-lg capitalize">
                {vehicle.type}
              </CardTitle>
              <Badge variant={vehicle.is_active ? "default" : "secondary"}>
                {vehicle.is_active ? "Active" : "Inactive"}
              </Badge>
            </div>
          </div>
          <div className="flex space-x-2">
            {onEdit && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => onEdit(vehicle.id)}
              >
                <Edit className="h-4 w-4" />
              </Button>
            )}
            {onDelete && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => onDelete(vehicle.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Weight className="h-4 w-4 text-muted-foreground" />
            <span>{vehicle.capacity.toLocaleString()} kg capacity</span>
          </div>
          <div className="flex items-center space-x-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <span>{vehicle.license_plate}</span>
          </div>
        </div>

        <div className="text-sm text-muted-foreground">
          <p>RC Number: {vehicle.rc_number}</p>
        </div>
      </CardContent>
    </Card>
  );
}

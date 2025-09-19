"use client";

import api from "../lib/api";

// Vehicle types
export interface VehicleCreate {
  type: "truck" | "van" | "trailer" | "container";
  capacity: number;
  license_plate: string;
  rc_number: string;
}

export interface VehicleOut extends VehicleCreate {
  id: string;
  carrier_id: string;
  is_active: boolean;
}

// ------------------
// API calls
// ------------------
export const createVehicleApi = async (
  vehicleData: VehicleCreate
): Promise<VehicleOut> => {
  const res = await api.post("/vehicles/", vehicleData);
  return res.data;
};

export const getMyVehiclesApi = async (): Promise<VehicleOut[]> => {
  const res = await api.get("/vehicles/");
  return res.data;
};

export const updateVehicleApi = async (
  vehicleId: string,
  vehicleData: Partial<VehicleCreate>
): Promise<VehicleOut> => {
  const res = await api.put(`/vehicles/${vehicleId}`, vehicleData);
  return res.data;
};

export const deleteVehicleApi = async (vehicleId: string): Promise<void> => {
  await api.delete(`/vehicles/${vehicleId}`);
};


// Get vehicle by ID
export const getVehicleByIdApi = async (vehicleId: string): Promise<VehicleOut> => {
  const res = await api.get(`/vehicles/${vehicleId}`);
  return res.data;
};

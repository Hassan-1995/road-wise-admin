// api/maintenance-log.ts
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export type VehicleMaintenanceInfo = {
  id: number;
  vehicleId: string;
  makeModel: string;
  registrationNumber: string;
  status: string;
  currentLocation: string;
  latitude: string;
  longitude: string;
  assignedDriverId: number;
  createdAt: string; // ISO date string
  maintenanceDate: string; // ISO date string
  liters?: string | null;
  serviceType?: string | null;
  repairType?: string | null;
  costRs: string;
  odometerKm: string;
  location: string;
  notes: string;
  name: string;
};

export const getAllVehiclesMaintenanceInfo = async (): Promise<
  VehicleMaintenanceInfo[]
> => {
  const response = await axios.get<VehicleMaintenanceInfo[]>(
    `${BASE_URL}/api/vehicle-maintenance`
  );
  return response.data;
};

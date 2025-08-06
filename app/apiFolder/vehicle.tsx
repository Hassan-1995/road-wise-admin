// api/driver.ts
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export type Vehicle = {
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
};

export const getAllVehiclesInfo = async (): Promise<Vehicle[]> => {
  const response = await axios.get<Vehicle[]>(`${BASE_URL}/api/vehicle`);
  return response.data;
};

export const getVehicleByID = async (vehicleID: number): Promise<Vehicle> => {
  const response = await axios.get<Vehicle[]>(
    `${BASE_URL}/api/vehicle/id/${vehicleID}`
  );
  return response.data[0];
};

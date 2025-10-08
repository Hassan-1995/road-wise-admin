// api/driver.ts
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export type Vehicle = {
  id: number;
  vehicleId: string;
  makeModel: string;
  registrationNumber: string;
  referenceNumber?: string;
  status: string;
  currentLocation: string;
  latitude: string;
  longitude: string;
  assignedDriverId: number;
  createdAt: string; // ISO date string
};

export const getAllVehiclesInfo = async (
  role: string,
  id: number
): Promise<Vehicle[]> => {
  const response = await axios.get<Vehicle[]>(
    `${BASE_URL}/api/vehicles/${role}/${id}`
  );
  return response.data;
};

export const getVehicleByID = async (vehicleID: number): Promise<Vehicle> => {
  const response = await axios.get<Vehicle[]>(
    `${BASE_URL}/api/vehicle/id/${vehicleID}`
  );
  return response.data[0];
};

export const addVehicle = async (
  newVehicle: Partial<Vehicle>
): Promise<Vehicle> => {
  const response = await axios.post<Vehicle[]>(
    `${BASE_URL}/api/vehicle/add`,
    newVehicle
  );
  return response.data[0];
};

export const updateVehicleByID = async (
  vehicleID: number,
  updatedVehicle: Partial<Vehicle>
): Promise<Vehicle> => {
  const response = await axios.put(
    `${BASE_URL}/api/vehicle/id/${vehicleID}`,
    updatedVehicle
  );
  return response.data;
};

export const deleteVehicleByID = async (
  vehicleID: number
): Promise<Vehicle> => {
  const response = await axios.delete<Vehicle[]>(
    `${BASE_URL}/api/vehicle/delete/id/${vehicleID}`
  );
  return response.data[0];
};

export const updateAssignedDriver = async (
  vehicleID: number,
  assignedDriverId: number
): Promise<Vehicle> => {
  const response = await axios.put<Vehicle>(
    `${BASE_URL}/api/vehicle/id/${vehicleID}/assign-driver`,
    { assignedDriverId }
  );
  return response.data;
};

// api/trip.ts
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export type Trip = {
  id?: number; // id is not required in creating a trip but must for getting a trip
  driverId: number;
  vehicleId: number;
  startTime?: string;
  endTime?: string;
  distanceKm?: number;
  notes?: string;
  status?: string;
  // Optional fields
  userId?: number;
  name?: string;
  makeModel?: string;
  registrationNumber?: string;
  storeId?: number;
  storeName?: string;
};

export const createTrip = async (
  trip: Trip
): Promise<{ success: boolean; insertId: number }> => {
  const response = await axios.post(`${BASE_URL}/api/trip/new`, trip);
  return response.data;
};

export const getTripsByDriverID = async (driverID: number): Promise<Trip[]> => {
  const response = await axios.get<Trip[]>(
    `${BASE_URL}/api/trip/driver/id/${driverID}`
  );
  return response.data;
};

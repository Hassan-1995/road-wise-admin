// api/trip.ts
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export type Trip = {
  driverId: number;
  vehicleId: number;
  startTime?: string;
  endTime?: string;
  distanceKm?: number;
  notes?: string;
  status?: string;
};

export const createTrip = async (
  trip: Trip
): Promise<{ success: boolean; insertId: number }> => {
  const response = await axios.post(`${BASE_URL}/api/trip/new`, trip);
  return response.data;
};

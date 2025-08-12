// api/path.ts
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export interface OptimisedPath {
  tripId: number;
  optimisedPath: string | null;
  distanceKm: number | null;
  durationMinutes: number | null;
  startTime: string;
  endTime: string | null;
  status: string;
}

export const getOptimisedPathByTripId = async (
  tripId: number
): Promise<OptimisedPath> => {
  const response = await axios.get<OptimisedPath>(
    `${BASE_URL}/api/get-optimised-path/trip/${tripId}`
  );
  return response.data;
};

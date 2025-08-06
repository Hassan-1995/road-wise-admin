// api/liver-tracker.ts
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export type LiveTracker = {
  id: number;
  latitude: string;
  longitude: string;
  status: string;
  recordedAt: string;
  driverName: string;
  makeModel: string;
  registrationNumber: string;
};

export const getDriverLivePosition = async (): Promise<LiveTracker[]> => {
  const response = await axios.get<LiveTracker[]>(
    `${BASE_URL}/api/driver-live-position`
  );
  return response.data;
};

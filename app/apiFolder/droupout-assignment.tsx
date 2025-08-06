// api/dropout-assignment.ts
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export type DropoutAssignment = {
  driverId: number;
  storeId: number;
  assignedAt?: string;
  status?: string;
  tripId: number;
  storename?: string;
};

export const assignDropoffs = async (
  assignment: DropoutAssignment
): Promise<{ success: boolean; insertId: number }> => {
  const response = await axios.post(
    `${BASE_URL}/api/dropout-assignment/new`,
    assignment
  );
  return response.data;
};

export const getDropoffsByTripID = async (
  tripID: number
): Promise<DropoutAssignment[]> => {
  const response = await axios.get<DropoutAssignment[]>(
    `${BASE_URL}/api/dropout-assignment/trip/${tripID}`
  );
  return response.data;
};

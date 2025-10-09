// api/driver.ts
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export interface Driver {
  id?: number;
  userId?: number;
  adminId?: number;
  name: string;
  contactNumber: string;
  email: string;
  password?: string;
  cnicNumber: string;
  gender: string;
  residenceArea: string;
  licenseNumber: string;
  parentReference?: string;
  referenceNumber?: string;
  status?: string;
  dateOfBirth: string;
  createdAt?: string;
  updatedAt?: string;
}
export const getAllDriversInfo = async (
  role: string,
  id: number
): Promise<Driver[]> => {
  const response = await axios.get<Driver[]>(
    `${BASE_URL}/api/drivers/${role}/${id}`
  );
  return response.data;
};

export const getDriverById = async (driverID: number): Promise<Driver> => {
  const response = await axios.get(`${BASE_URL}/api/driver/id/${driverID}`);
  return response.data.driver;
};

export const updateDriverById = async (
  driverId: number,
  data: Partial<Driver>
): Promise<Driver> => {
  const response = await axios.put<Driver>(
    `${BASE_URL}/api/driver/update/id/${driverId}`,
    data
  );
  return response.data;
};

export const addNewDriver = async (
  data: Omit<Driver, "id" | "userId" | "status">
): Promise<{ success: boolean; message: string; driverId?: number }> => {
  const response = await axios.post(`${BASE_URL}/api/driver/add`, data);
  return response.data;
};

export const deleteDriverById = async (
  driverId: number
): Promise<{ success: boolean; message: string }> => {
  const response = await axios.delete(
    `${BASE_URL}/api/driver/delete/id/${driverId}`
  );
  return response.data;
};

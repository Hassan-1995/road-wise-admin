// api/driver.ts
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export type Driver = {
  id: number;
  userId: number;
  cnicNumber: string;
  gender: string;
  residenceArea: string;
  licenseNumber: string;
  dateOfBirth: string; // ISO string format
  createdAt: string; // ISO string format
  name: string;
  phone: string;
  email: string;
};

export const getAllDriversInfo = async (): Promise<Driver[]> => {
  const response = await axios.get<Driver[]>(`${BASE_URL}/api/driver`);
  return response.data;
};

export const getDriverById = async (id: number): Promise<Driver> => {
  const response = await axios.get<Driver[]>(`${BASE_URL}/api/driver/id/${id}`);
  return response.data[0];
};

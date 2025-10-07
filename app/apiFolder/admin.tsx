import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export type SubAdmin = {
  id: number;
  adminId: number;
  parentReference: string;
  referenceNumber: string;
  name: string;
  contactNumber: string;
  employeeNumber: string;
  email?: string;
  sub_admin_userID?: number;
  createdAt: string; // ISO date string from DB
  updatedAt: string; // ISO date string from DB
};

export type CreateSubAdminInput = {
  id: number;
  subAdminId?: number;
  name: string;
  email: string;
  phone: string;
  password: string;
  employeeNumber: string;
};

export const getSubAdminByAdminID = async (
  adminId: number
): Promise<SubAdmin[]> => {
  const response = await axios.get<SubAdmin[]>(
    `${BASE_URL}/api/sub-admin/admin-id/${adminId}`
  );
  return response.data;
};

export const getSubAdminBySubAdminID = async (
  subAdminId: number
): Promise<SubAdmin[]> => {
  const response = await axios.get<SubAdmin[]>(
    `${BASE_URL}/api/sub-admin/sub-admin-id/${subAdminId}`
  );
  return response.data;
};

export const createSubAdmin = async (
  subAdminData: CreateSubAdminInput
): Promise<SubAdmin> => {
  const response = await axios.post<SubAdmin>(
    `${BASE_URL}/api/new-user/sub-admin`,
    subAdminData
  );
  return response.data;
};

export const updateSubAdmin = async (
  subAdminData: CreateSubAdminInput
): Promise<SubAdmin> => {
  const response = await axios.put<SubAdmin>(
    `${BASE_URL}/api/update-user/sub-admin`,
    subAdminData
  );
  return response.data;
};

export const deleteSubAdminByID = async (
  subAdminId: number
): Promise<SubAdmin[]> => {
  const response = await axios.delete<SubAdmin[]>(
    `${BASE_URL}/api/delete-user/sub-admin/id/${subAdminId}`
  );
  return response.data;
};

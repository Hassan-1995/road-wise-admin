// api/store.ts
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export type Store = {
  id: number;
  storeName: string;
  address: string;
  latitude: string;
  longitude: string;
  createdAt: string; // or `Date` if you plan to parse it
};

export const getAllStoresInfo = async (): Promise<Store[]> => {
  const response = await axios.get<Store[]>(`${BASE_URL}/api/store`);
  return response.data;
};

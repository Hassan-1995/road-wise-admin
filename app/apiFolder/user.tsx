// api/user.ts
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

type LoginResponse = {
  message: string;
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    phone: string;
    role: string;
  };
};

export const loginUser = async (data: {
  email: string;
  password: string;
}): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(
      //   `${BASE_URL}/api/new-user/admin`,
      `${BASE_URL}/api/login-user/driver`,
      data
    );

    return response.data;
  } catch (error) {
    console.error("Error in loginUser:", error);
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

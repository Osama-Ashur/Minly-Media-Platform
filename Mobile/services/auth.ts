import api from "./api";
import { saveToken } from "./expo-secure-store";

interface User {
  _id: string;
  email: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

export const handleLogin = async (
  email: string,
  password: string
): Promise<User> => {
  const response = await api.post("/auth/login", { email, password });

  if (!response.data?.token) {
    throw new Error("No token received");
  }

  await saveToken(response.data?.token);
  return response.data?.data?.user;
};

export const handleRegister = async (
  username: string,
  email: string,
  password: string
): Promise<User> => {
  const response = await api.post("/auth/register", {
    username,
    email,
    password,
  });

  if (!response.data?.token) {
    throw new Error("No token received");
  }

  await saveToken(response.data?.token);
  return response.data?.data?.user;
};

export const getCurrentUser = async (): Promise<User> => {
  const response = await api.get("/auth/me");
  return response.data?.data?.user;
};

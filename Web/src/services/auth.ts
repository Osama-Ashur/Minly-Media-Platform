import api from "./api";

interface User {
  _id: string;
  email: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

export const login = async (email: string, password: string): Promise<User> => {
  const response = await api.post("/auth/login", { email, password });
  localStorage.setItem("token", response.data?.token);

  return response.data?.data?.user;
};

export const register = async (
  email: string,
  username: string,
  password: string
): Promise<User> => {
  const response = await api.post("/auth/register", {
    email,
    username,
    password,
  });
  localStorage.setItem("token", response.data?.token);
  return response.data?.data?.user;
};

export const getCurrentUser = async (): Promise<User> => {
  const response = await api.get("/auth/me");
  localStorage.setItem("token", response.data?.token);
  return response.data?.data?.user;
};

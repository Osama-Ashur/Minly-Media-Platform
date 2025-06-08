import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { getCurrentUser, login, register } from "../services/auth";

interface AuthContextType {
  user: {
    _id: string;
    email: string;
    username: string;
    createdAt: string;
    updatedAt: string;
  } | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    username: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(null as AuthContextType["user"] | null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const initAuth = async () => {
      try {
        if (localStorage.getItem("token")) {
          const userData = await getCurrentUser();
          setUser(userData);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    const userData = await login(email, password);
    setUser(userData);
    setLoading(false);
  };

  const handleRegister = async (
    email: string,
    username: string,
    password: string
  ) => {
    setLoading(true);
    const userData = await register(email, username, password);
    setUser(userData);
    setLoading(false);
  };

  const handleLogout = () => {
    setLoading(true);
    localStorage.removeItem("token");
    setUser(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

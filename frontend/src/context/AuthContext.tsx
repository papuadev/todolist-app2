import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type User = {
  username: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
};

// Tetap gunakan Huruf Kapital (AuthContext)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isAuthenticated = user !== null;

  async function login(username: string, password: string): Promise<void> {
    setIsLoading(true);
    setError(null);
    try {
      // Simulasi API call
      await new Promise((res) => setTimeout(res, 800));

      if (username === "admin" && password === "admin123") {
        setUser({ username });
      } else {
        setError("Username atau password salah.");
      }
    } catch (e) {
      setError("Terjadi kesalahan sistem.");
    } finally {
      // Ini menjamin loading berhenti apa pun yang terjadi
      setIsLoading(false);
    }
  }

  function logout(): void {
    setUser(null);
  }

  function clearError(): void {
    setError(null);
  }

  // Bungkus nilai dalam objek yang sesuai dengan AuthContextType
  const value: AuthContextType = {
    isAuthenticated,
    user,
    isLoading,
    error,
    login,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth harus dipakai di dalam AuthProvider");
  }
  return ctx;
}

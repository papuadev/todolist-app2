import { create } from "zustand";
import { persist } from "zustand/middleware";

// Tipe data user yang sedang login
interface User {
  username: string;
}

// Shape dari seluruh store
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
}

// Simulasi data user (nanti bisa diganti API call)
const MOCK_USERS = [
  { username: "admin", password: "admin123" },
  { username: "user1", password: "password1" },
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Action: login
      login: async (username, password) => {
        set({ isLoading: true, error: null });

        const APP_ID = "4C3C6A87-FB00-4B28-A52C-285FFA4FDE06";
        const REST_KEY = "5E0DC19F-886B-48AA-B11A-C7E517341F11";
        const TABLE_NAME = "user-auth";

        const url = `https://api.backendless.com/${APP_ID}/${REST_KEY}/data/${TABLE_NAME}?where=username%3D%27${username}%27%20AND%20password%3D%27${password}%27`;
        try {
          const res = await fetch(url, {
            method: "GET",
          });
          const result = await res.json();
          console.log(result);
          if (result.length === 0)
            throw new Error("Username atau password salah");

          set({ user: result[0], isAuthenticated: true, error: null });
          return true; // Berhasil
        } catch (err: any) {
          console.log(err);
          set({ error: err.message });
          return false; // Gagal
        } finally {
          set({ isLoading: false });
        }
      },

      // Action: logout
      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          error: null,
        });
      },

      // Action: hapus pesan error
      clearError: () => set({ error: null }),
    }),
    {
      name: "auth-storage", // key di localStorage
      // Hanya simpan field yang perlu persist (jangan simpan isLoading/error)
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);

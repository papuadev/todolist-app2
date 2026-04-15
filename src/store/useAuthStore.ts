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
  login: (username: string, password: string) => Promise<void>;
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

        // Simulasi network delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        const found = MOCK_USERS.find(
          (u) => u.username === username && u.password === password
        );

        if (found) {
          set({
            user: { username: found.username },
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } else {
          set({
            isLoading: false,
            error: "Username atau password salah",
          });
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
    }
  )
);
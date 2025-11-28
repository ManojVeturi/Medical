import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AuthUser {
  id: string;
  email: string;
  role: "patient" | "doctor";
  fullName: string;
}

export interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  login: (email: string, password: string, role: string) => Promise<void>;
  register: (email: string, password: string, role: string, fullName: string, specialty?: string, phone?: string) => Promise<void>;
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      login: async (email: string, password: string, role: string) => {
        set({ isLoading: true });
        try {
          const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });
          if (!res.ok) throw new Error("Login failed");
          const data = await res.json();
          set({ user: { id: data.user.id, email: data.user.email, role: data.user.role, fullName: data.user.fullName } });
        } finally {
          set({ isLoading: false });
        }
      },
      register: async (email: string, password: string, role: string, fullName: string, specialty?: string, phone?: string) => {
        set({ isLoading: true });
        try {
          const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password, role, fullName, specialty, phone }),
          });
          if (!res.ok) throw new Error("Registration failed");
          const data = await res.json();
          set({ user: { id: data.user.id, email: data.user.email, role: data.user.role, fullName: data.user.fullName } });
        } finally {
          set({ isLoading: false });
        }
      },
      logout: () => set({ user: null }),
    }),
    {
      name: "auth-store",
    }
  )
);

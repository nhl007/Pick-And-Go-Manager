import * as SecureStore from "expo-secure-store";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { User } from "@/types/auth.types";

type AuthState = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;

  isHydrated: boolean;

  setAuth: (user: User, token: string) => void;
  logout: () => void;
  setHydrated: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      isHydrated: false,

      setAuth: (user, token) => set({ user, token, isAuthenticated: true }),
      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
      },
      setHydrated: () => set({ isHydrated: true }),
    }),
    {
      name: "auth-storage",

      storage: {
        getItem: async (key) => {
          const value = await SecureStore.getItemAsync(key);
          return value ? JSON.parse(value) : null;
        },
        setItem: async (key, value) => {
          await SecureStore.setItemAsync(key, JSON.stringify(value));
        },
        removeItem: async (key) => {
          await SecureStore.deleteItemAsync(key);
        },
      },

      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    },
  ),
);

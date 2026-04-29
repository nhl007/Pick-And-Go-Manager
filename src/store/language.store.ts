import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { DEFAULT_LANGUAGE, type SupportedLanguage } from "@/localization/resources";

type LanguageState = {
  language: SupportedLanguage;
  isHydrated: boolean;
  hasUserSelectedLanguage: boolean;
  setLanguage: (language: SupportedLanguage) => void;
  setLanguageFromDevice: (language: SupportedLanguage) => void;
  setHydrated: () => void;
};

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: DEFAULT_LANGUAGE,
      isHydrated: false,
      hasUserSelectedLanguage: false,
      setLanguage: (language) => set({ language, hasUserSelectedLanguage: true }),
      setLanguageFromDevice: (language) => set({ language }),
      setHydrated: () => set({ isHydrated: true }),
    }),
    {
      name: "language-storage",
      storage: {
        getItem: async (key) => {
          const value = await AsyncStorage.getItem(key);
          return value ? JSON.parse(value) : null;
        },
        setItem: async (key, value) => {
          await AsyncStorage.setItem(key, JSON.stringify(value));
        },
        removeItem: async (key) => {
          await AsyncStorage.removeItem(key);
        },
      },
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    },
  ),
);

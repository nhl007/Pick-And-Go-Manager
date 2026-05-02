import {
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from "@expo-google-fonts/inter";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import Providers from "@/components/Providers";
import i18n, { i18nInitPromise } from "@/localization/i18n";
import { useAuthStore } from "@/store/auth.store";
import { useLanguageStore } from "@/store/language.store";

void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [i18nReady, setI18nReady] = useState(() => i18n.isInitialized);

  const [fontsLoaded, error] = useFonts({
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });

  const authHydrated = useAuthStore((s) => s.isHydrated);
  const languageHydrated = useLanguageStore((s) => s.isHydrated);

  useEffect(() => {
    void i18nInitPromise.then(() => {
      setI18nReady(true);
    });
  }, []);

  useEffect(() => {
    if ((fontsLoaded || error) && authHydrated && languageHydrated && i18nReady) {
      void SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error, authHydrated, languageHydrated, i18nReady]);

  if (!fontsLoaded || !authHydrated || !languageHydrated || !i18nReady) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Providers>
        <Stack screenOptions={{ headerShown: false }} />
      </Providers>
    </GestureHandlerRootView>
  );
}

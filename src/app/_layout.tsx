import "@/localization/i18n";

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
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import Providers from "@/components/Providers";
import { useAuthStore } from "@/store/auth.store";
import { useLanguageStore } from "@/store/language.store";

void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
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
    if ((fontsLoaded || error) && authHydrated && languageHydrated) {
      void SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error, authHydrated, languageHydrated]);

  if (!fontsLoaded || !authHydrated || !languageHydrated) {
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

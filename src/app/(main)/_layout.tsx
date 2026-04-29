import { Stack } from "expo-router";
import React from "react";
import { StatusBar } from "react-native";

export default function MainLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="(modals)"
          options={{
            headerShown: false,
            presentation: "transparentModal",
          }}
        />
        <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
    </>
  );
}

import { Tabs } from "expo-router";
import React from "react";

// import { FloatingTabBar } from "@/components/navigation/FloatingTabBar";

export default function AppTabs() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        sceneStyle: { flex: 1 },
        tabBarStyle: {
          position: "absolute",
          height: 0,
          borderTopWidth: 0,
          backgroundColor: "transparent",
          elevation: 0,
        },
      }}
      // tabBar={(props) => <FloatingTabBar {...props} />}
    >
      <Tabs.Screen name="intelligence" options={{ title: "Intelligence" }} />
      <Tabs.Screen name="concierge" options={{ title: "Concierge" }} />

      <Tabs.Screen name="settings" options={{ title: "Settings" }} />
    </Tabs>
  );
}

import { Tabs } from "expo-router";
import React from "react";
import { View } from "react-native";

import AppBackground from "@/components/AppBackground";
import { topNavBarHeight, TopNavTabBar } from "@/components/navigation/TopNavTabBar";

export default function AppTabs() {
  return (
    <View style={{ flex: 1 }}>
      <AppBackground />
      <View style={{ flex: 1 }}>
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            sceneStyle: {
              flex: 1,
              paddingTop: topNavBarHeight + 20,
              backgroundColor: "transparent",
            },
            tabBarStyle: {
              display: "none",
            },
          }}
          tabBar={(props) => <TopNavTabBar {...props} />}
        >
          <Tabs.Screen name="intelligence" options={{ title: "Intelligence" }} />
          <Tabs.Screen name="finance" options={{ title: "Finance" }} />
          <Tabs.Screen name="control" options={{ title: "Live Control Hub" }} />
          <Tabs.Screen name="media" options={{ title: "Media Hub" }} />
          <Tabs.Screen
            name="staff-and-privileges"
            options={{ title: "Staff & Privileges" }}
          />
          <Tabs.Screen name="concierge" options={{ title: "Concierge" }} />
          <Tabs.Screen
            name="marketing-and-growth"
            options={{ title: "Marketing & Growth Hub" }}
          />
          <Tabs.Screen
            name="tier-and-quality"
            options={{ title: "Tier & Quality Hub" }}
          />

          <Tabs.Screen name="settings" options={{ title: "Settings" }} />
        </Tabs>
      </View>
    </View>
  );
}

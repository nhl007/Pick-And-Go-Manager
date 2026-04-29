import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React, { useCallback } from "react";
import {
  Image,
  ImageSourcePropType,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

import { COLORS, FONT_FAMILIES } from "@/constants/styles";

/** Outer pill vertical padding (Figma 4) ×2 + inner row (56, same as scanner). */
const TAB_BAR_ROW_HEIGHT = 56;
const TAB_BAR_OUTER_PADDING = 4;

type TabName = "explore" | "bookings" | "favorite" | "profile";

const TAB_META: Record<
  TabName,
  { label: string; inactive: ImageSourcePropType; active: ImageSourcePropType }
> = {
  explore: {
    label: "Explore",
    inactive: require("@/assets/icons/tab-explore-inactive.png"),
    active: require("@/assets/icons/tab-explore-active.png"),
  },
  bookings: {
    label: "Bookings",
    inactive: require("@/assets/icons/tab-bookings-inactive.png"),
    active: require("@/assets/icons/tab-bookings-active.png"),
  },
  favorite: {
    label: "Favorite",
    inactive: require("@/assets/icons/tab-favorite-inactive.png"),
    active: require("@/assets/icons/tab-favorite-active.png"),
  },
  profile: {
    label: "Profile",
    inactive: require("@/assets/icons/tab-profile-inactive.png"),
    active: require("@/assets/icons/tab-profile-active.png"),
  },
};

export function FloatingTabBar({
  state,
  descriptors,
  navigation,
  insets,
}: BottomTabBarProps) {
  const { width: windowWidth } = useWindowDimensions();
  /** Fixed width for the bar so active vs inactive never resizes the chrome (Figma: inset floating pill). */
  const tabBarWidth = Math.min(windowWidth - 40, 400);

  const onScannerPress = useCallback(() => {
    // Hook to scan / QR route when available.
  }, []);

  const bottomPad = Math.max(insets.bottom, 10) + 10;

  return (
    <View
      pointerEvents="box-none"
      style={[styles.screenAttach, { paddingBottom: bottomPad }]}
    >
      <View style={[styles.shadowHost, { width: tabBarWidth }]}>
        <View style={styles.pillClip}>
          <View style={styles.pillTint} pointerEvents="none" />
          <View style={styles.pillOuterPad}>
            <View style={styles.pillInner}>
              {state.routes.map((route) => {
                const name = route.name as TabName;
                const meta = TAB_META[name];
                if (!meta) {
                  return null;
                }
                const focused = state.routes[state.index]?.key === route.key;
                const { options } = descriptors[route.key];
                const label = options.title ?? meta.label;

                const onPress = () => {
                  const event = navigation.emit({
                    type: "tabPress",
                    target: route.key,
                    canPreventDefault: true,
                  });
                  if (!focused && !event.defaultPrevented) {
                    navigation.navigate(route.name, route.params);
                  }
                };

                return (
                  <Pressable
                    key={route.key}
                    accessibilityLabel={options.tabBarAccessibilityLabel ?? label}
                    accessibilityRole="button"
                    accessibilityState={{ selected: focused }}
                    hitSlop={6}
                    onPress={onPress}
                    style={({ pressed }) => [
                      styles.tabPressable,
                      pressed && styles.pressed,
                    ]}
                  >
                    {focused ? (
                      <View style={styles.activePill}>
                        <Image
                          resizeMode="contain"
                          source={meta.active}
                          style={styles.tabIcon}
                        />
                        <Text
                          ellipsizeMode="tail"
                          numberOfLines={1}
                          style={styles.activeLabel}
                        >
                          {label}
                        </Text>
                      </View>
                    ) : (
                      <View style={styles.inactiveSlot}>
                        <Image
                          resizeMode="contain"
                          source={meta.inactive}
                          style={styles.tabIcon}
                        />
                      </View>
                    )}
                  </Pressable>
                );
              })}
              <Pressable
                accessibilityLabel="Scanner"
                accessibilityRole="button"
                hitSlop={8}
                onPress={onScannerPress}
                style={({ pressed }) => [
                  styles.scannerPressable,
                  pressed && styles.pressed,
                ]}
              >
                <View style={styles.scannerCircle}>
                  <Image
                    resizeMode="contain"
                    source={require("@/assets/icons/tab-scanner.png")}
                    style={styles.scannerIcon}
                  />
                </View>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenAttach: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    elevation: 100,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  shadowHost: {
    alignSelf: "center",
    borderRadius: 38,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 18,
  },
  pillClip: {
    borderRadius: 38,
    borderWidth: 1,
    borderColor: COLORS.white,
    overflow: "hidden",
    backgroundColor: COLORS.tabBarSurface,
  },
  pillTint: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Platform.OS === "ios" ? "rgba(0,0,0,0.72)" : COLORS.tabBarSurface,
  },
  pillOuterPad: {
    padding: TAB_BAR_OUTER_PADDING,
  },
  pillInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: TAB_BAR_ROW_HEIGHT,
    width: "100%",
  },
  tabPressable: {
    height: TAB_BAR_ROW_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.88,
  },
  activePill: {
    flexDirection: "row",
    alignItems: "center",
    height: TAB_BAR_ROW_HEIGHT,
    paddingHorizontal: 16,
    gap: 5,
    backgroundColor: COLORS.tabBarActivePill,
    borderRadius: TAB_BAR_ROW_HEIGHT / 2,
  },
  activeLabel: {
    flexShrink: 1,
    fontFamily: FONT_FAMILIES.medium,
    fontSize: 12,
    color: COLORS.tabBarLabelActive,
  },
  inactiveSlot: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  tabIcon: {
    width: 24,
    height: 24,
    flexShrink: 0,
  },
  scannerPressable: {
    width: TAB_BAR_ROW_HEIGHT,
    height: TAB_BAR_ROW_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },
  scannerCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },
  scannerIcon: {
    width: 24,
    height: 24,
  },
});

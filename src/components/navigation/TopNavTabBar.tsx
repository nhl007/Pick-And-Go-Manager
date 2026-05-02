import { Ionicons } from "@expo/vector-icons";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import type { NavigationState } from "@react-navigation/native";
import { router } from "expo-router";
import React, { memo, useCallback, useMemo } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { FadeIn, FadeOut, LinearTransition } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { COLORS, FONT_FAMILIES } from "@/constants/styles";

import { UiText } from "../ui/UiText";

type IoniconName = React.ComponentProps<typeof Ionicons>["name"];

type TabDef = { routeName: string; label: string; icon: IoniconName };

const NAV_TABS: TabDef[] = [
  { routeName: "intelligence", label: "Live intelligence.", icon: "pulse-outline" },
  { routeName: "finance", label: "Finance", icon: "wallet-outline" },
  { routeName: "control", label: "Live Control Hub", icon: "options-outline" },
  { routeName: "media", label: "Media Hub", icon: "videocam-outline" },
  {
    routeName: "staff-and-privileges",
    label: "Staff & Privileges",
    icon: "people-outline",
  },
  { routeName: "concierge", label: "Concierge", icon: "headset-outline" },
  {
    routeName: "marketing-and-growth",
    label: "Marketing & Growth Hub",
    icon: "trending-up-outline",
  },
  { routeName: "tier-and-quality", label: "Tier & Quality Hub", icon: "trophy-outline" },
  { routeName: "settings", label: "Settings", icon: "settings-outline" },
];

const TOP_NAV_MIN_HEIGHT = 80;
const HIT_SLOP = 6;
const LABEL_FADE_IN_MS = 180;
const LABEL_FADE_OUT_MS = 120;

const pillLayoutTransition = LinearTransition.springify()
  .damping(18)
  .stiffness(220)
  .mass(0.6);

function buildRoutesByName(routes: NavigationState["routes"]) {
  const map = new Map<string, (typeof routes)[number]>();
  for (const r of routes) {
    map.set(r.name, r);
  }
  return map;
}

type NavPillProps = {
  tab: TabDef;
  focused: boolean;
  label: string;
  routeKey?: string;
  tabBarAccessibilityLabel?: string;
  navigation: BottomTabBarProps["navigation"];
};

const NavPill = memo(function NavPill({
  tab,
  focused,
  label,
  routeKey,
  tabBarAccessibilityLabel,
  navigation,
}: NavPillProps) {
  const onPress = useCallback(() => {
    if (!routeKey || focused) {
      return;
    }
    const event = navigation.emit({
      type: "tabPress",
      target: routeKey,
      canPreventDefault: true,
    });
    if (!event.defaultPrevented) {
      navigation.navigate(tab.routeName as never);
    }
  }, [navigation, routeKey, focused, tab.routeName]);

  return (
    <Pressable
      accessibilityLabel={tabBarAccessibilityLabel ?? label}
      accessibilityRole="tab"
      accessibilityState={{ selected: focused }}
      hitSlop={HIT_SLOP}
      onPress={onPress}
      style={({ pressed }) => [pressed && styles.pressed]}
    >
      <Animated.View
        layout={pillLayoutTransition}
        style={[styles.pill, focused && styles.pillActive, styles.pillInnerRow]}
      >
        <Ionicons
          name={tab.icon}
          size={16}
          color={focused ? COLORS.tabBarLabelActive : COLORS.tabBarLabelInactive}
        />
        {focused ? (
          <Animated.Text
            entering={FadeIn.duration(LABEL_FADE_IN_MS)}
            exiting={FadeOut.duration(LABEL_FADE_OUT_MS)}
            numberOfLines={1}
            style={[styles.pillLabel, styles.pillLabelActive]}
          >
            {label}
          </Animated.Text>
        ) : null}
      </Animated.View>
    </Pressable>
  );
});

type IconToolbarProps = {
  onSearch: () => void;
  onNotifications: () => void;
};

const IconToolbar = memo(function IconToolbar({
  onSearch,
  onNotifications,
}: IconToolbarProps) {
  return (
    <View style={styles.iconButtons}>
      <Pressable
        accessibilityRole="button"
        hitSlop={HIT_SLOP}
        onPress={onSearch}
        style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
      >
        <Ionicons
          name="search-outline"
          strokeWidth={2}
          size={18}
          color={COLORS.textSecondary}
        />
      </Pressable>
      <Pressable
        accessibilityRole="button"
        hitSlop={HIT_SLOP}
        onPress={onNotifications}
        style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
      >
        <Ionicons
          name="notifications-outline"
          strokeWidth={2}
          size={18}
          color={COLORS.textSecondary}
        />
        <View style={styles.notificationDot} />
      </Pressable>
    </View>
  );
});

type ProfileToolbarProps = {
  onOpenSettings: () => void;
};

const ProfileToolbar = memo(function ProfileToolbar({
  onOpenSettings,
}: ProfileToolbarProps) {
  return (
    <View style={styles.profileChipContainer}>
      <Pressable
        accessibilityRole="button"
        hitSlop={HIT_SLOP}
        onPress={onOpenSettings}
        style={({ pressed }) => [styles.profileChip, pressed && styles.pressed]}
      >
        <View style={styles.avatar}>
          <Image
            source={require("@/assets/images/avatar.png")}
            style={styles.avatarImage}
          />
        </View>
        <UiText size="sm" font="semiBold" color="textSecondary">
          John Mark
        </UiText>
      </Pressable>
      <Pressable
        accessibilityRole="button"
        hitSlop={HIT_SLOP}
        onPress={onOpenSettings}
        style={({ pressed }) => [styles.medalButton, pressed && styles.pressed]}
      >
        <Text style={styles.medalText}>🥇</Text>
      </Pressable>
    </View>
  );
});

function BrandSection() {
  return (
    <View style={styles.brand}>
      <Image source={require("@/assets/images/logo.png")} style={styles.logo} />
      <View>
        <UiText size="sm" font="black">
          BRANCH MANAGER
        </UiText>
        <UiText size="xs" font="bold" color="textSecondary">
          DASHBOARD
        </UiText>
      </View>
    </View>
  );
}

function TopNavTabBarComponent({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const currentRoute = state.routes[state.index]?.name;

  const routesByName = useMemo(() => buildRoutesByName(state.routes), [state.routes]);

  const settingsRoute = useMemo(
    () => state.routes.find((r) => r.name === "settings"),
    [state.routes],
  );

  const navigateToSettings = useCallback(() => {
    if (settingsRoute) {
      navigation.navigate(settingsRoute.name, settingsRoute.params);
    }
  }, [navigation, settingsRoute]);

  const openSearch = useCallback(() => {
    router.push("/(main)/search");
  }, []);

  const openNotifications = useCallback(() => {
    router.push("/(main)/notification");
  }, []);

  return (
    <View style={[styles.attachTop, { paddingTop: insets.top }]}>
      <View style={styles.outerShell}>
        <BrandSection />

        <View style={styles.navCenter}>
          <View style={[styles.pillsContent, styles.pillsRow]}>
            {NAV_TABS.map((tab) => {
              const route = routesByName.get(tab.routeName);
              const focused = currentRoute === tab.routeName;
              const descriptor = route ? descriptors[route.key] : undefined;
              const label = descriptor?.options.title ?? tab.label;

              return (
                <NavPill
                  key={tab.routeName}
                  focused={focused}
                  label={label}
                  navigation={navigation}
                  routeKey={route?.key}
                  tab={tab}
                  tabBarAccessibilityLabel={descriptor?.options.tabBarAccessibilityLabel}
                />
              );
            })}
          </View>
        </View>

        <View style={styles.navRight}>
          <IconToolbar onNotifications={openNotifications} onSearch={openSearch} />
          <ProfileToolbar onOpenSettings={navigateToSettings} />
        </View>
      </View>
    </View>
  );
}

export const TopNavTabBar = memo(TopNavTabBarComponent);

export const topNavBarHeight = TOP_NAV_MIN_HEIGHT;

const styles = StyleSheet.create({
  attachTop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    alignItems: "center",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: COLORS.tabBarIconInactive,
  },
  outerShell: {
    width: "100%",
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  brand: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  logo: {
    width: 40,
    height: 40,
    objectFit: "contain",
  },
  navCenter: {
    flexGrow: 0,
    flexShrink: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 4,
    backgroundColor: COLORS.black,
    borderRadius: 999,
    alignSelf: "center",
  },
  pillsContent: {
    alignItems: "center",
    gap: 8,
    paddingRight: 4,
    height: 28,
  },
  pillsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    flexGrow: 0,
    alignSelf: "center",
  },
  pillInnerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  pill: {
    height: 28,
    maxHeight: 28,
    borderRadius: 999,
    paddingHorizontal: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  pillActive: {
    backgroundColor: COLORS.tabBarActivePill,
  },
  pillLabel: {
    fontFamily: FONT_FAMILIES.medium,
    fontSize: 12,
  },
  pillLabelActive: {
    color: COLORS.tabBarLabelActive,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.28)",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    backgroundColor: COLORS.whiteSecondary,
  },
  iconButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  notificationDot: {
    position: "absolute",
    top: 7,
    right: 8,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: COLORS.error,
  },
  navRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  profileChip: {
    borderWidth: 1,
    borderColor: COLORS.white,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingRight: 10,
    paddingLeft: 6,
    backgroundColor: COLORS.tabBarIconInactive,
    borderRadius: 999,
  },
  avatar: {
    borderRadius: 999,
  },
  avatarImage: {
    width: 36,
    height: 36,
    objectFit: "contain",
    borderRadius: 999,
  },
  profileChipContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  medalButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.22)",
    alignItems: "center",
    justifyContent: "center",
  },
  medalText: {
    fontSize: 18,
  },
  pressed: {
    opacity: 0.9,
  },
});

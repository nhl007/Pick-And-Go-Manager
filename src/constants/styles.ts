import { Platform } from "react-native";

export const COLORS = {
  primary: "#4F46E5",
  secondary: "#22C55E",

  white: "#FFFFFF",
  whiteSecondary: "#F8F8F8",
  whiteeTrtiary: "#FFFFFF1A",

  black: "#000000",
  blackSecondary: "rgba(0, 0, 0, 0.7)",
  blackTertiary: "rgba(0, 0, 0, 0.05)",

  gray: "#141C24",

  background: "#F5F5F5",
  backgroundSecondary: "#EEEEEE",

  textPrimary: "#111827",
  textSecondary: "#6B7280",

  border: "#E5E7EB",
  error: "#EF4444",
  cancel: "#FF4242",

  tabBarSurface: "#000000",
  tabBarActivePill: "#FFFFFF",
  tabBarIconInactive: "#FFFFFF",
  tabBarIconActive: "#000000",
  tabBarLabelInactive: "#FFFFFF",
  tabBarLabelActive: "#000000",
  tabBarShadow: "rgba(0, 0, 0, 0.12)",

  financeAccent: "#CA8A04",
  financeOrange: "#EA580C",
  financeRose: "#F43F5E",
};

export const FONT_FAMILIES = {
  light: "Inter_300Light",
  regular: "Inter_400Regular",
  medium: "Inter_500Medium",
  semiBold: "Inter_600SemiBold",
  bold: "Inter_700Bold",
};

export const FONT_SIZE = {
  xs: 12,
  sm: 14,
  base: 16,
  md: 18,
  lg: 20,
  xl: 24,
  xxl: 28,
  xxxl: 32,
  xxxxl: 40,
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
};

export const RADIUS = {
  xs: 6,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 999,
};

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;

import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

import { COLORS, RADIUS } from "@/constants/styles";

export type UiButtonProps = {
  onPress: () => void;
  loading?: boolean;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link" | "error";
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
  height?: number;
  width?: number;
  blur?: boolean;
  blurIntensity?: number;
  iconStyle?: StyleProp<ImageStyle>;
  icon?: ImageSourcePropType;
  iconSize?: number;
  backgroundColor?: keyof typeof COLORS;
  gap?: number;
  radius?: keyof typeof RADIUS | number;
};

export const UiButton = ({
  onPress,
  loading,
  variant = "primary",
  style,
  children,
  height = 40,
  width,
  icon,
  iconSize,
  backgroundColor,
  gap = 8,
  iconStyle,
  blur = false,
  blurIntensity = 40,
  radius = "sm",
}: UiButtonProps) => {
  const widthStyle = width ?? "100%";

  return (
    <TouchableOpacity
      style={[
        styles.button,
        styles[variant],
        {
          height,
          width: widthStyle,
          gap,
          backgroundColor,
          borderRadius: typeof radius === "number" ? radius : RADIUS[radius],
        },
        style,
      ]}
      onPress={onPress}
      disabled={loading}
    >
      {loading && <ActivityIndicator color="#fff" />}
      {icon && (
        <Image source={icon} style={[iconStyle, { width: iconSize, height: iconSize }]} />
      )}
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
  },
  primary: {
    backgroundColor: COLORS.backgroundSecondary,
    borderWidth: 1,
    borderColor: COLORS.white,
  },
  secondary: {
    backgroundColor: COLORS.secondary,
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  error: {
    backgroundColor: COLORS.error,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  ghost: {
    backgroundColor: "transparent",
    borderWidth: 0,
  },
  link: {
    backgroundColor: "transparent",
    borderWidth: 0,
  },
});

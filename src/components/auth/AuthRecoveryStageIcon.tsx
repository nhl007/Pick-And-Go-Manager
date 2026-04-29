import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { StyleSheet, View } from "react-native";

import { COLORS, RADIUS, SPACING } from "@/constants/styles";

export type AuthRecoveryStageIconVariant = "key" | "mail" | "lock" | "success";

type AuthRecoveryStageIconProps = {
  variant: AuthRecoveryStageIconVariant;
};

const ICON_MAP: Record<AuthRecoveryStageIconVariant, keyof typeof Ionicons.glyphMap> = {
  key: "key-outline",
  mail: "mail-outline",
  lock: "lock-closed-outline",
  success: "checkmark",
};

export function AuthRecoveryStageIcon({ variant }: AuthRecoveryStageIconProps) {
  const name = ICON_MAP[variant];
  const size = variant === "success" ? 36 : 28;

  return (
    <View style={[styles.wrap, variant === "success" && styles.wrapSuccess]}>
      <Ionicons name={name} size={size} color={COLORS.white} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: 64,
    height: 64,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.black,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: SPACING.md,
  },
  wrapSuccess: {
    backgroundColor: COLORS.secondary,
    borderColor: COLORS.secondary,
  },
});

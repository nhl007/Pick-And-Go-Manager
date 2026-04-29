import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { ActivityIndicator, Pressable, StyleSheet, View } from "react-native";

import { UiText } from "@/components/ui/UiText";
import { COLORS, RADIUS, SPACING } from "@/constants/styles";

type TrailingIcon = "arrow" | "check";

type AuthRecoveryPrimaryButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  trailingIcon?: TrailingIcon;
};

export function AuthRecoveryPrimaryButton({
  label,
  onPress,
  disabled,
  loading,
  trailingIcon = "arrow",
}: AuthRecoveryPrimaryButtonProps) {
  const iconName = trailingIcon === "check" ? "checkmark" : "chevron-forward";

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled ?? loading}
      style={[styles.button, (disabled ?? loading) && styles.buttonDisabled]}
    >
      {loading ? (
        <ActivityIndicator color={COLORS.white} />
      ) : (
        <View style={styles.content}>
          <UiText size="md" font="semiBold" color="white">
            {label}
          </UiText>
          <Ionicons name={iconName} size={20} color={COLORS.white} />
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: SPACING.md,
    minHeight: 52,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.gray,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SPACING.md,
  },
  buttonDisabled: {
    opacity: 0.65,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },
});

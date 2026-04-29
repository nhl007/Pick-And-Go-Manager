import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import { COLORS, RADIUS, SPACING } from "@/constants/styles";

type AuthRecoveryCardProps = {
  children: React.ReactNode;
  onClose?: () => void;
  showClose?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function AuthRecoveryCard({
  children,
  onClose,
  showClose = true,
  style,
}: AuthRecoveryCardProps) {
  return (
    <View style={[styles.card, style]}>
      {showClose && onClose ? (
        <Pressable
          accessibilityRole="button"
          onPress={onClose}
          style={({ pressed }) => [styles.close, pressed && styles.closePressed]}
          hitSlop={12}
        >
          <Ionicons name="close" size={18} color={COLORS.textSecondary} />
        </Pressable>
      ) : null}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignSelf: "center",
    width: "100%",
    maxWidth: 520,
    borderRadius: RADIUS.xl,
    backgroundColor: COLORS.white,
    padding: SPACING.xl,
    paddingTop: SPACING.xxl,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: COLORS.black,
    shadowOpacity: 0.08,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  close: {
    position: "absolute",
    right: SPACING.md,
    top: SPACING.md,
    width: 36,
    height: 36,
    borderRadius: RADIUS.full,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.whiteSecondary,
    borderWidth: 1,
    borderColor: COLORS.border,
    zIndex: 2,
  },
  closePressed: {
    opacity: 0.85,
  },
});

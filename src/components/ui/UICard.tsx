import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import { COLORS, RADIUS, SPACING } from "@/constants/styles";

type UICardProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export const UICard = ({ children, style }: UICardProps) => {
  return <View style={[styles.card, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    gap: SPACING.sm,
    flex: 1,
  },
});

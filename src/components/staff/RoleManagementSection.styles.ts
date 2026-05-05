import { StyleSheet } from "react-native";

import { COLORS, RADIUS, SPACING } from "@/constants/styles";

export const roleManagementSectionStyles = StyleSheet.create({
  cardsRow: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "stretch",
    gap: SPACING.md,
    width: "100%",
  },
  restrictedBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
    backgroundColor: "rgba(244, 63, 94, 0.10)",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(244, 63, 94, 0.30)",
  },
  restrictedBadgeTxt: {
    fontFamily: "Inter_700Bold",
    fontSize: 10,
    color: COLORS.financeRose,
  },
});

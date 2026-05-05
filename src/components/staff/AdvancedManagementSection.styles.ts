import { StyleSheet } from "react-native";

import { SPACING } from "@/constants/styles";

export const advancedManagementSectionStyles = StyleSheet.create({
  cardsRow: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "stretch",
    gap: SPACING.md,
    width: "100%",
  },
});

import { StyleSheet } from "react-native";

import { COLORS, RADIUS, SPACING } from "@/constants/styles";

export const burnoutRotateModalStyles = StyleSheet.create({
  bodyPad: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.md,
    gap: SPACING.md,
  },

  /* Header */
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  headerIconWrap: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.black,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  headerCol: {
    flex: 1,
    minWidth: 0,
    gap: 2,
  },
  headerTitle: {
    fontFamily: "Inter_900Black",
    fontSize: 22,
    letterSpacing: -0.4,
    color: COLORS.portalInk,
  },
  headerSubtitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
    color: COLORS.ink3,
  },

  /* Employee Card */
  employeeCard: {
    borderRadius: RADIUS.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
    backgroundColor: "rgba(244, 63, 94, 0.08)",
    padding: SPACING.md,
  },
  employeeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
  },
  employeeIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
  },
  employeeBody: {
    flex: 1,
    minWidth: 0,
    gap: 2,
  },
  employeeName: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 13,
    color: COLORS.portalInk,
  },
  employeeMeta: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 10,
    color: COLORS.ink4,
  },
  fatigueRiskBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
    backgroundColor: "rgba(244, 63, 94, 0.15)",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(244, 63, 94, 0.30)",
  },
  fatigueRiskTxt: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 9,
    letterSpacing: 0.8,
    color: COLORS.financeRose,
    textTransform: "uppercase",
  },

  /* Section */
  section: {
    gap: SPACING.sm,
  },
  sectionLabel: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 11,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    color: COLORS.portalInk,
  },

  /* Station Select */
  stationSelect: {
    minHeight: 48,
  },

  /* Duration Options */
  durationOptionsRow: {
    flexDirection: "row",
    gap: SPACING.sm,
  },
  durationOption: {
    flex: 1,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.sm,
    borderRadius: RADIUS.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  durationOptionActive: {
    backgroundColor: COLORS.portalInk,
    borderColor: COLORS.portalInk,
  },
  durationLabel: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 13,
    color: COLORS.portalInk,
  },
  durationLabelActive: {
    color: COLORS.white,
  },
  durationSub: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 10,
    color: COLORS.ink3,
  },
  durationSubActive: {
    color: "rgba(255, 255, 255, 0.8)",
  },

  /* Info Box */
  infoBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: SPACING.sm,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
    borderRadius: RADIUS.md,
  },
  infoTxt: {
    flex: 1,
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    color: COLORS.ink3,
    lineHeight: 16,
  },

  /* Footer */
  footerRow: {
    flexDirection: "row",
    gap: SPACING.sm,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.hairline,
    backgroundColor: COLORS.white,
  },
  cancelBtn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: RADIUS.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
    backgroundColor: COLORS.white,
  },
  cancelBtnTxt: {
    fontFamily: "Inter_700Bold",
    fontSize: 13,
    color: COLORS.portalInk,
  },
  confirmBtn: {
    flex: 1.4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 14,
    borderRadius: RADIUS.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.portalInk,
  },
  confirmBtnTxt: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 13,
    color: COLORS.black,
  },
});

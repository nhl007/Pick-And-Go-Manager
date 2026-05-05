import { StyleSheet } from "react-native";

import { COLORS, RADIUS, SPACING } from "@/constants/styles";

export const actionConfirmationModalStyles = StyleSheet.create({
  body: {
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.md,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.lg,
  },
  iconWrap: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: COLORS.portalInk,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  title: {
    fontFamily: "Inter_900Black",
    fontSize: 18,
    color: COLORS.portalInk,
    letterSpacing: -0.3,
    textAlign: "center",
  },
  bodyTxt: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 13,
    color: COLORS.ink3,
    textAlign: "center",
    lineHeight: 19,
    paddingHorizontal: SPACING.sm,
  },
  bodyBold: {
    fontFamily: "Inter_800ExtraBold",
    color: COLORS.portalInk,
  },
  refBox: {
    width: "100%",
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    backgroundColor: COLORS.whiteSecondary,
    borderRadius: RADIUS.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: SPACING.sm,
  },
  refLbl: {
    fontFamily: "Inter_700Bold",
    fontSize: 10,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    color: COLORS.ink4,
  },
  refVal: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 12,
    color: COLORS.portalInk,
    fontVariant: ["tabular-nums"],
  },
  doneBtn: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
    backgroundColor: COLORS.white,
  },
  doneBtnTxt: {
    fontFamily: "Inter_700Bold",
    fontSize: 14,
    color: COLORS.portalInk,
  },
});

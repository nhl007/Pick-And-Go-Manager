import { StyleSheet } from "react-native";

import { COLORS, RADIUS, SPACING } from "@/constants/styles";

export const controlStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "transparent",
  },
  scrollContent: {
    paddingBottom: SPACING.xxl,
  },
  heroDisplay: {
    alignItems: "center",
    marginTop: SPACING.sm,
    marginBottom: 4,
  },
  heroNumber: {
    fontFamily: "Inter_900Black",
    fontSize: 72,
    fontVariant: ["tabular-nums"],
    color: COLORS.portalInk,
  },
  metaMid: {
    flex: 1.4,
    alignItems: "center",
    gap: 4,
    minWidth: 200,
  },
  metaMidRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    flexWrap: "wrap",
  },
  metaMidText: {
    flexShrink: 1,
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
    color: COLORS.ink3,
    textAlign: "center",
    lineHeight: 18,
  },
  metaMidStrong: {
    fontFamily: "Inter_800ExtraBold",
    color: COLORS.neonOrange,
  },
  metaMidInk: {
    fontFamily: "Inter_800ExtraBold",
    color: COLORS.portalInk,
  },
  metaMidSmall: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    color: COLORS.ink4,
    textAlign: "center",
  },
  sectionHeadRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: SPACING.sm,
    marginTop: SPACING.lg,
    marginBottom: 10,
    flexWrap: "wrap",
  },
  sectionHeadRowTight: {
    marginTop: SPACING.md,
  },
  sectionTitle: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 15,
    letterSpacing: -0.3,
    color: COLORS.portalInk,
  },
  sectionCaption: {
    flex: 1,
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    color: COLORS.ink4,
    minWidth: 160,
  },
  rowRtl: {
    flexDirection: "row-reverse",
  },
  g3: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    alignItems: "stretch",
  },
  g3Item: {
    flexGrow: 1,
    flexBasis: "31%",
    minWidth: 260,
  },
  g2: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    alignItems: "stretch",
  },
  g2Half: {
    flexGrow: 1,
    flexBasis: "48%",
    minWidth: 280,
  },
  g2Full: {
    width: "100%",
    minWidth: 280,
  },
  panel: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: 18,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  panelTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 10,
    letterSpacing: 1,
    textTransform: "uppercase",
    color: COLORS.ink4,
    marginBottom: SPACING.sm,
  },
});

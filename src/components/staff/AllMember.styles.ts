import { StyleSheet } from "react-native";

import { COLORS, RADIUS, SPACING } from "@/constants/styles";

/** Column proportions — keep these in sync between header and rows. */
const COL = {
  member: 2.5,
  location: 1.6,
  status: 1.6,
  shift: 1,
  perf: 1.5,
};

/** All Staff modal list — colocated with `AllMember.tsx`. */
export const allMemberStyles = StyleSheet.create({
  /* ─────────── Stat boxes (unchanged) ─────────── */
  statBoxesRow: {
    flexDirection: "row",
    flexWrap: "nowrap",
    gap: 10,
    marginBottom: SPACING.md,
  },
  statMiniBox: {
    flex: 1,
    minWidth: 0,
    backgroundColor: COLORS.whiteSecondary,
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.sm,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
  },
  statMiniLbl: {
    fontFamily: "Inter_700Bold",
    fontSize: 9,
    letterSpacing: 1,
    color: COLORS.ink5,
    marginBottom: 4,
  },
  statMiniVal: {
    fontFamily: "Inter_900Black",
    fontSize: 22,
    color: COLORS.portalInk,
    fontVariant: ["tabular-nums"],
  },

  /* ─────────── Search + filters (unchanged) ─────────── */
  searchRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.sm,
    alignItems: "stretch",
    marginBottom: SPACING.sm,
  },
  searchBox: {
    flex: 0,
    flexBasis: "50%",
    minWidth: "50%",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 10,
    borderRadius: RADIUS.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
    backgroundColor: COLORS.whiteSecondary,
  },
  searchInput: {
    flex: 1,
    fontFamily: "Inter_600SemiBold",
    fontSize: 13,
    color: COLORS.portalInk,
    paddingVertical: 0,
  },
  filterPillsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    flexShrink: 0,
    alignItems: "center",
  },
  filterPill: {
    paddingVertical: 8,
    paddingHorizontal: SPACING.lg,
    borderRadius: RADIUS.full,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
    backgroundColor: COLORS.white,
  },
  filterPillActive: {
    backgroundColor: COLORS.portalInk,
    borderColor: COLORS.portalInk,
  },
  filterPillTxt: {
    fontFamily: "Inter_700Bold",
    fontSize: 11,
    color: COLORS.ink3,
  },
  filterPillTxtActive: {
    color: COLORS.white,
  },

  /* ─────────── NEW: column header row ─────────── */
  tableHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    paddingHorizontal: SPACING.sm,
    paddingTop: SPACING.sm,
    paddingBottom: 10,
    marginTop: 4,
    marginBottom: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.hairline,
  },
  tableHeaderTxt: {
    fontFamily: "Inter_700Bold",
    fontSize: 9,
    letterSpacing: 1.4,
    textTransform: "uppercase",
    color: COLORS.ink5,
  },

  /* ─────────── Column flex distributions (shared between header + body) ─────────── */
  colMember: { flex: COL.member, minWidth: 0 },
  colLocation: { flex: COL.location, minWidth: 0 },
  colStatus: { flex: COL.status, minWidth: 0 },
  colShift: { flex: COL.shift, minWidth: 0 },
  colPerf: { flex: COL.perf, minWidth: 0 },

  /* ─────────── CHANGED: row card is now a horizontal row ─────────── */
  staffRowCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    borderRadius: RADIUS.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 10,
    marginBottom: 8,
    backgroundColor: COLORS.white,
  },
  rowRtl: {
    flexDirection: "row-reverse",
  },

  /* ─────────── Cell layouts inside the row ─────────── */
  cellMember: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },
  cellLeft: {
    alignItems: "flex-start",
    justifyContent: "center",
  },

  /* ─────────── Member cell (avatar + name + role) ─────────── */
  rowRoleIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.whiteSecondary,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  memberTextCol: {
    flex: 1,
    minWidth: 0,
    gap: 2,
  },
  rowMemberName: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 13,
    color: COLORS.portalInk,
    flexShrink: 1,
  },
  rowMemberRole: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 10,
    color: COLORS.ink4,
  },

  /* ─────────── Soft yellow pill (Location + Status) ─────────── */
  badgeSoft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
    backgroundColor: "rgba(255, 229, 0, 0.22)",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(239,159,39,0.2)",
    maxWidth: "100%",
  },
  badgeSoftTxt: {
    fontFamily: "Inter_700Bold",
    fontSize: 10,
    color: COLORS.portalInk,
    flexShrink: 1,
  },

  /* ─────────── Shift time cell ─────────── */
  shiftTimeTxt: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 13,
    color: COLORS.portalInk,
    fontVariant: ["tabular-nums"],
  },

  /* ─────────── Performance cell ─────────── */
  perfWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flexWrap: "wrap",
  },
  perfNumber: {
    fontFamily: "Inter_900Black",
    fontSize: 14,
    color: COLORS.portalInk,
    fontVariant: ["tabular-nums"],
  },
  perfUnit: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    color: COLORS.ink4,
  },
  /** Filled orange "TOP" pill — matches image 1 (white text on orange). */
  topPillFilled: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.neonOrange,
  },
  topPillFilledTxt: {
    fontFamily: "Inter_900Black",
    fontSize: 8,
    letterSpacing: 0.8,
    color: COLORS.white,
  },
  adminDash: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
    color: COLORS.ink4,
  },
});